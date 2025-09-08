import agenda from "../../../../configs/agenda.js";

import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export function registerEventsSubscribers() {
  eventBus.on("EventCreated", async (event) => {
    const { eventId, reminderTime } = event.payload;
    await agenda.schedule(reminderTime, "sendEventReminders", {
      eventId,
    });
  });
  eventBus.on("EventCanceled", async (event) => {
    const { eventId } = event.payload;
    await agenda.cancel({ "data.eventId": eventId });
  });
  eventBus.on("EventUpdated", async (event) => {
    const { eventId, reminderTime } = event.payload;
    await agenda.cancel({ "data.eventId": eventId });
    await agenda.schedule(reminderTime, "sendEventReminders", {
      eventId,
    });
  });
}
