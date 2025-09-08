import agenda from "../../../../configs/agenda.js";

import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export function registerEventsSubscribers() {
  eventBus.on("EventCreated", async (event) => {
    const { eventId } = event.payload;
    const reminderTime = new Date(Date.now() * 60 * 1000);
    await agenda.now("sendEventReminders", {
      eventId,
    });
  });
}
