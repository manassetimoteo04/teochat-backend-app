import channelContianer from "../../../channels/infra/containers/channel.contianer.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export function registerTeamssSubscribers() {
  eventBus.on("TeamCreatedEvent", async (event) => {
    const { id, createdBy } = event.payload;
    await channelContianer.createChannel.execute({
      teamId: id,
      name: "Geral",
      description: "Canal geral da equipa",
      createdBy,
    });
  });
}
