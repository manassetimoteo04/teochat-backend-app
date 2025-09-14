import invitationContainer from "../../../invitation/infrastructure/container/invitation-container.js";

import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export function registerCompanySubscribers() {
  eventBus.on("CompanyCreated", async (event) => {
    const { companyId, userId, emails } = event.payload;
    await invitationContainer.createInvitation.execute({
      companyId,
      userId,
      emails,
    });
  });
}
