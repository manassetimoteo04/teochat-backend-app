import channelContianer from "../../../channels/infra/containers/channel.contianer";
import { eventBus } from "../../../shared/infrastructure/events/event-bus";

export function registerMessageSubscribers() {
  eventBus.on("MessageSentEvent", async (event) => {
    const { message, channelId } = event.payload;
    await channelContianer.updateChannel.execute(channelId, message);
  });
}
