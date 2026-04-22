import { addMinutes } from "date-fns";
import { BASE_URL } from "../../../../configs/env.js";
import { instantCallStartedTemplate } from "../../../shared/helpers/generate-email-templates.js";
import {
  CompanyNotFoundError,
  EventTimeConflictError,
  NotCompanyMemberError,
  NotTeamCompanyError,
  NotTeamMemberError,
  TeamNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages.js";

export class CreateInstantCallService {
  constructor({
    companyRepo,
    teamRepo,
    eventRepo,
    meetingCallRepo,
    userRepo,
    createNotificationService,
    emailService,
  }) {
    this.companyRepo = companyRepo;
    this.teamRepo = teamRepo;
    this.eventRepo = eventRepo;
    this.meetingCallRepo = meetingCallRepo;
    this.userRepo = userRepo;
    this.createNotificationService = createNotificationService;
    this.emailService = emailService;
  }

  async execute({
    userId,
    companyId,
    teamId,
    title,
    description,
    durationInMinutes,
  }) {
    const company = await this.companyRepo.findById(companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isMember(userId)) throw new NotCompanyMemberError();

    const team = await this.teamRepo.findMembers(teamId);
    if (!team) throw new TeamNotFoundError();
    if (String(team.companyId) !== String(companyId))
      throw new NotTeamCompanyError();

    const memberIds = (team.members || []).map((member) =>
      member.id.toString(),
    );
    if (!memberIds.some((memberId) => memberId === userId)) {
      throw new NotTeamMemberError();
    }

    const actor = await this.userRepo.findById(userId);
    const now = new Date();
    const safeDuration = Math.max(Number(durationInMinutes) || 60, 5);
    const endTime = addMinutes(now, safeDuration);

    const conflict = await this.eventRepo.findByTime({
      teamId,
      date: now,
      startTime: now,
      endTime,
    });
    if (conflict) throw new EventTimeConflictError();

    const normalizedTitle =
      String(title || "").trim() || `Chamada instantânea - ${team.name}`;
    const normalizedDescription =
      String(description || "").trim() ||
      `${actor?.name || "Um membro da equipa"} iniciou uma chamada instantânea.`;

    const createdEvent = await this.eventRepo.create({
      teamId,
      companyId,
      createdBy: userId,
      title: normalizedTitle,
      description: normalizedDescription,
      date: now,
      startTime: now,
      endTime,
      type: "video-call",
      status: "active",
    });

    const callId = `instant-${createdEvent.id}`;
    const meetingCall = await this.meetingCallRepo.createIfNotExists({
      eventId: createdEvent.id,
      teamId,
      companyId,
      callId,
      allowedMembers: memberIds,
      startTime: now,
      endTime,
      status: "started",
    });

    const updatedEvent = await this.eventRepo.update(createdEvent.id, {
      callId: meetingCall._id,
    });

    const action = {
      kind: "navigate",
      label: "Entrar na chamada",
      path: `/companies/${companyId}/events/${createdEvent.id}`,
      apiPath: `/api/v1/events/${companyId}/${createdEvent.id}`,
      method: "GET",
    };

    await this.createNotificationService.executeMany(
      memberIds.map((memberId) => ({
        userId: memberId,
        type: "instant_call_started",
        category: "meetings",
        title: "Chamada instantânea iniciada",
        message: `${normalizedTitle} começou agora para a equipa ${team.name}.`,
        action,
        actor: actor
          ? {
              id: actor.id,
              name: actor.name,
              avatar: actor.avatar,
            }
          : null,
        entity: {
          id: createdEvent.id,
          kind: "event",
        },
        metadata: {
          companyId,
          teamId,
          teamName: team.name,
          eventId: createdEvent.id,
          callId,
          startTime: now,
          endTime,
          source: "instant_call_started",
        },
      })),
    );

    const callLink = BASE_URL || undefined;
    await Promise.allSettled(
      (team.members || [])
        .filter((member) => member?.email)
        .map((member) =>
          this.emailService({
            to: member.email,
            subject: `${normalizedTitle} começou agora`,
            html: instantCallStartedTemplate({
              teamName: team.name,
              companyName: company.name,
              callTitle: normalizedTitle,
              startedBy: actor?.name,
              startTime: now,
              callLink,
            }),
          }),
        ),
    );

    return {
      event: createdEvent,
      meetingCall: {
        id: meetingCall._id?.toString?.() || meetingCall.id,
        eventId: createdEvent.id,
        teamId,
        companyId,
        callId: meetingCall._id,
        status: meetingCall.status,
        allowedMembers: meetingCall.allowedMembers,
        startTime: meetingCall.startTime,
        endTime: meetingCall.endTime,
      },
    };
  }
}
