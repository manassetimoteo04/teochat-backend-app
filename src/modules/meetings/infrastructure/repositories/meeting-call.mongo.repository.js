import MeetingCall from "../models/meeting-call.model.js";

export class MeetingCallMongoRepository {
  async createIfNotExists({
    eventId,
    teamId,
    companyId,
    allowedMembers,
    startTime,
    endTime,
    status = "started",
  }) {
    return MeetingCall.findOneAndUpdate(
      { eventId },
      {
        $setOnInsert: {
          eventId,
          teamId,
          companyId,
          allowedMembers,
          status,
          startTime,
          endTime,
        },
      },
      { new: true, upsert: true },
    );
  }

  async updateStatusByEventIds(eventIds, status) {
    if (!eventIds || eventIds.length === 0) return { modifiedCount: 0 };
    console.log("modifiento status para eventos: ", eventIds, status);
    return await MeetingCall.updateMany(
      { eventId: { $in: eventIds } },
      { $set: { status } },
    );
  }

  async findByTeamId(teamId) {
    const calls = await MeetingCall.find({ teamId }).populate({
      path: "eventId",
      select: "title description startTime endTime date type status",
    });

    const now = Date.now();
    const updates = [];

    const data = calls.map((call) => {
      let duration = call.duration;
      const event = call.eventId;

      if (
        event?.endTime &&
        new Date(event.endTime).getTime() <= now &&
        (duration === null || duration === undefined)
      ) {
        const start = new Date(event.startTime).getTime();
        const end = new Date(event.endTime).getTime();
        duration = Math.max(0, Math.round((end - start) / 60000));
        updates.push({
          id: call._id,
          duration,
        });
      }

      return {
        id: call._id,
        eventId: event?._id || call.eventId,
        teamId: call.teamId,
        companyId: call.companyId,
        status: call.status,
        allowedMembers: call.allowedMembers,
        duration,
        startTime: call.startTime || event?.startTime,
        endTime: call.endTime || event?.endTime,
        event,
        createdAt: call.createdAt,
        updatedAt: call.updatedAt,
      };
    });

    if (updates.length > 0) {
      await Promise.all(
        updates.map((item) =>
          MeetingCall.updateOne(
            { _id: item.id },
            { $set: { duration: item.duration } },
          ),
        ),
      );
    }

    return data;
  }
}
