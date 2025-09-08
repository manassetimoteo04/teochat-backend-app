import invitationContainer from "../container/invitation-container.js";

export default function invitationsJobs(agenda) {
  agenda.define("sendInvitation", async (job) => {
    const { emails } = job.attrs.data;
    await invitationContainer.sendInvitation.execute({ emails });
  });
}
