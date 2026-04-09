import Event from "../../../events/infrastructure/models/events.model.js";

export class CreateUpcomingCallsService {
  constructor({ meetingCallRepo }) {
    this.meetingCallRepo = meetingCallRepo;
  }

  async execute() {
    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

    const upcoming = await Event.find({
      type: "video-call",
      status: "pending",
      startTime: { $gte: now, $lte: inOneHour },
    }).select("_id");

    if (upcoming.length) {
      const upcomingIds = upcoming.map((e) => e._id);
      await this.meetingCallRepo.updateStatusByEventIds(upcomingIds, "started");
    }

    const finished = await Event.find({
      type: "video-call",
      status: "active",
      endTime: { $lte: now },
    }).select("_id");

    if (finished.length) {
      const finishedIds = finished.map((e) => e._id);
      await this.meetingCallRepo.updateStatusByEventIds(
        finishedIds,
        "finished",
      );
    }
  }
}
