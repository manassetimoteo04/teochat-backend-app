import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import notificationContainer from "../container/notification-container.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";

const userRepo = new UserMongoRepository();

function buildInvitationAction({ companyId, invitationId }) {
  return {
    kind: "navigate",
    label: "Ver convite",
    path: `/companies/${companyId}/invitations`,
    apiPath: `/api/v1/invitations/${invitationId}`,
    method: "GET",
  };
}

function buildTeamAction({ companyId, teamId }) {
  return {
    kind: "navigate",
    label: "Abrir equipa",
    path: `/companies/${companyId}/teams/${teamId}`,
    apiPath: `/api/v1/teams/${teamId}/${companyId}`,
    method: "GET",
  };
}

function buildEventAction({ companyId, teamId, eventId }) {
  return {
    kind: "navigate",
    label: "Ver evento",
    path: `/companies/${companyId}/events/${eventId}`,
    apiPath: `/api/v1/events/${companyId}/${eventId}`,
    method: "GET",
  };
}

function buildTaskAction({ companyId, teamId, projectId }) {
  return {
    kind: "navigate",
    label: "Ver tarefa",
    path: `/companies/${companyId}/teams/${teamId}/projects/${projectId}`,
    apiPath: `/api/v1/tasks/${projectId}/projects`,
    method: "GET",
  };
}

export function registerNotificationsSubscribers() {
  eventBus.on("InvitationCreated", async (event) => {
    const notifications = [];

    for (const invitation of event.payload || []) {
      const targetUser = await userRepo.findByEmail(invitation.destination);
      if (!targetUser) continue;

      notifications.push({
        userId: targetUser.id,
        type: "company_invite",
        category: "account",
        title: "Novo convite para empresa",
        message: `${invitation.companyName} convidou-te para entrares na empresa.`,
        action: buildInvitationAction(invitation),
        actor: invitation.createdBy || null,
        entity: {
          id: invitation.invitationId,
          kind: "invitation",
        },
        metadata: {
          companyId: invitation.companyId,
          companyName: invitation.companyName,
          invitationId: invitation.invitationId,
          destination: invitation.destination,
          source: "invitation_created",
        },
      });
    }

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("TeamMembersAdded", async (event) => {
    const notifications = (event.payload.memberIds || []).map((memberId) => ({
      userId: memberId,
      type: "team_member_added",
      category: "account",
      title: "Foste adicionado a uma equipa",
      message: `Agora fazes parte da equipa ${event.payload.teamName}.`,
      action: buildTeamAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.teamId,
        kind: "team",
      },
      metadata: {
        companyId: event.payload.companyId,
        companyName: event.payload.companyName,
        teamId: event.payload.teamId,
        teamName: event.payload.teamName,
        source: "team_member_added",
      },
    }));

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("TeamLeaderAssigned", async (event) => {
    await notificationContainer.createNotification.execute({
      userId: event.payload.memberId,
      type: "team_leader_promoted",
      category: "account",
      title: "Foste promovido a lider",
      message: `Agora és o lider da equipa ${event.payload.teamName}.`,
      action: buildTeamAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.teamId,
        kind: "team",
      },
      metadata: {
        companyId: event.payload.companyId,
        companyName: event.payload.companyName,
        teamId: event.payload.teamId,
        teamName: event.payload.teamName,
        source: "team_leader_assigned",
      },
    });
  });

  eventBus.on("EventCreated", async (event) => {
    const notifications = (event.payload.memberIds || []).map((memberId) => ({
      userId: memberId,
      type: "event_created",
      category: "events",
      title: "Novo evento na tua equipa",
      message: `${event.payload.title} foi agendado para a equipa ${event.payload.teamName}.`,
      action: buildEventAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.eventId,
        kind: "event",
      },
      metadata: {
        ...event.payload,
        source: "event_created",
      },
    }));

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("EventUpdated", async (event) => {
    const notifications = (event.payload.memberIds || []).map((memberId) => ({
      userId: memberId,
      type: "event_updated",
      category: "events",
      title: "Evento atualizado",
      message: `${event.payload.title} recebeu uma atualização.`,
      action: buildEventAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.eventId,
        kind: "event",
      },
      metadata: {
        ...event.payload,
        source: "event_updated",
      },
    }));

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("EventCanceled", async (event) => {
    const notifications = (event.payload.memberIds || []).map((memberId) => ({
      userId: memberId,
      type: "event_canceled",
      category: "events",
      title: "Evento cancelado",
      message: `${event.payload.title} foi cancelado.`,
      action: buildEventAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.eventId,
        kind: "event",
      },
      metadata: {
        ...event.payload,
        source: "event_canceled",
      },
    }));

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("EventReminderTriggered", async (event) => {
    const notifications = (event.payload.memberIds || []).map((memberId) => ({
      userId: memberId,
      type: "event_upcoming",
      category: "events",
      title: "Evento a aproximar-se",
      message: `${event.payload.title} começa em breve.`,
      action: buildEventAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.eventId,
        kind: "event",
      },
      metadata: {
        ...event.payload,
        source: "event_reminder",
      },
    }));

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("TaskCreated", async (event) => {
    if (!event.payload.assignedTo?.id || event.payload.assignedTo.id === event.payload.actor?.id) {
      return;
    }

    await notificationContainer.createNotification.execute({
      userId: event.payload.assignedTo.id,
      type: "task_created",
      category: "tasks",
      title: "Nova tarefa criada",
      message: `${event.payload.title} foi criada e atribuida a ti.`,
      action: buildTaskAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.taskId,
        kind: "task",
      },
      metadata: {
        ...event.payload,
        source: "task_created",
      },
    });
  });

  eventBus.on("TaskAssigned", async (event) => {
    if (!event.payload.assigneeId) return;

    await notificationContainer.createNotification.execute({
      userId: event.payload.assigneeId,
      type: "task_assigned",
      category: "tasks",
      title: "Nova atribuicao de tarefa",
      message:
        event.payload.previousAssigneeId && event.payload.previousAssigneeId !== event.payload.assigneeId
          ? `${event.payload.title} foi reatribuida para ti.`
          : `${event.payload.title} foi atribuida para ti.`,
      action: buildTaskAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.taskId,
        kind: "task",
      },
      metadata: {
        ...event.payload,
        source: "task_assigned",
      },
    });
  });

  eventBus.on("TaskUpdated", async (event) => {
    const recipients = new Set();

    if (event.payload.assignedTo?.id && event.payload.assignedTo.id !== event.payload.actor?.id) {
      recipients.add(event.payload.assignedTo.id);
    }

    if (event.payload.createdBy?.id && event.payload.createdBy.id !== event.payload.actor?.id) {
      recipients.add(event.payload.createdBy.id);
    }

    const notifications = [...recipients].map((userId) => ({
      userId,
      type: "task_updated",
      category: "tasks",
      title: "Tarefa atualizada",
      message: `${event.payload.title} recebeu uma atualização.`,
      action: buildTaskAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.taskId,
        kind: "task",
      },
      metadata: {
        ...event.payload,
        source: "task_updated",
      },
    }));

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("TaskCompleted", async (event) => {
    if (!event.payload.createdBy?.id || event.payload.createdBy.id === event.payload.actor?.id) {
      return;
    }

    await notificationContainer.createNotification.execute({
      userId: event.payload.createdBy.id,
      type: "task_completed",
      category: "tasks",
      title: "Tarefa concluida",
      message: `${event.payload.title} foi marcada como concluida.`,
      action: buildTaskAction(event.payload),
      actor: event.payload.actor || null,
      entity: {
        id: event.payload.taskId,
        kind: "task",
      },
      metadata: {
        ...event.payload,
        source: "task_completed",
      },
    });
  });

  eventBus.on("TaskDueReminder", async (event) => {
    const notifications = [];

    if (event.payload.assignedTo?.id) {
      notifications.push({
        userId: event.payload.assignedTo.id,
        type: "task_due_soon",
        category: "tasks",
        title: "Prazo da tarefa a aproximar-se",
        message: `${event.payload.title} vence em breve.`,
        action: buildTaskAction(event.payload),
        actor: event.payload.createdBy || null,
        entity: {
          id: event.payload.taskId,
          kind: "task",
        },
        metadata: {
          ...event.payload,
          source: "task_due_soon",
        },
      });
    }

    if (
      event.payload.createdBy?.id &&
      event.payload.createdBy.id !== event.payload.assignedTo?.id
    ) {
      notifications.push({
        userId: event.payload.createdBy.id,
        type: "task_due_soon",
        category: "tasks",
        title: "Prazo da tarefa a aproximar-se",
        message: `${event.payload.title} vence em breve.`,
        action: buildTaskAction(event.payload),
        actor: event.payload.assignedTo || null,
        entity: {
          id: event.payload.taskId,
          kind: "task",
        },
        metadata: {
          ...event.payload,
          source: "task_due_soon",
        },
      });
    }

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });
}
