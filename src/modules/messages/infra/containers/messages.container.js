import ChannelRepositoryMongo from "../../../channels/infra/repo/channel.mongo.repo.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { ListChannelMessagesUseCase } from "../../usecases/list-message-by-channel-usecase/index.js";
import { SendMessageUseCase } from "../../usecases/send-message-usecase/index.js";
import { MessageMongoRepository } from "../repo/messages.mongo.repo.js";

const channelRepository = new ChannelRepositoryMongo();
const messageRepository = new MessageMongoRepository();
const listMessages = new ListChannelMessagesUseCase(messageRepository);
const sendMessage = new SendMessageUseCase({
  channelRepository,
  messageRepository,
  eventBus,
});

export default { sendMessage, listMessages };
