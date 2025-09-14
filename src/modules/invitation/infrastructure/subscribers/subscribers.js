import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import agenda from "../../../../configs/agenda.js";
export function registerInvitationSubscribers() {
  eventBus.on("InvitationCreated", async (event) => {
    const emails = event.payload;
    await agenda.now("sendInvitation", { emails });
  });
}
