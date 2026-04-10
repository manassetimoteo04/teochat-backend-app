export class CreateUpcomingCallsService {
  constructor({ meetingCallRepo, eventRepo }) {
    this.meetingCallRepo = meetingCallRepo;
    this.eventRepo = eventRepo;
  }

  async execute() {
    try {
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

      const toStart = await this.eventRepo.find({
        type: "video-call",
        status: "pending",
        startTime: { $gte: now, $lte: oneHourFromNow },
      });

      if (toStart.length) {
        const ids = toStart.map((event) => event.id);

        await this.meetingCallRepo.updateStatusByEventIds(ids, "started");
        await this.eventRepo.updateMany(ids, { status: "active" });
      }

      const toFinish = await this.eventRepo.find({
        type: "video-call",
        status: "active",
        endTime: { $lte: now },
      });
      if (toFinish.length) {
        const ids = toFinish.map((event) => event.id);

        await this.meetingCallRepo.updateStatusByEventIds(ids, "finished");
        await this.eventRepo.updateMany(ids, { status: "finished" });
      }
    } catch (error) {
      console.error("Error in CreateUpcomingCallsService:", error);
    }
  }
}
