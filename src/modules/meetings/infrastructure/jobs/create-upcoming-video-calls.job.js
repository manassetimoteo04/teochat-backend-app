import meetingContainer from "../container/meeting-container.js";

export const CREATE_UPCOMING_VIDEO_CALLS_JOB = "createUpcomingVideoCalls";

export default function createUpcomingVideoCallsJob(agenda) {
  agenda.define(CREATE_UPCOMING_VIDEO_CALLS_JOB, async () => {
    await meetingContainer.createUpcomingCalls.execute();
  });
}
