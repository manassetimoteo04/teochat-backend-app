import ChannelRepositoryMongo from "../../../channels/infra/repo/channel.mongo.repo";
import { eventBus } from "../../../shared/infrastructure/events/event-bus";
import { ListChannelMessagesUseCase } from "../../usecases/list-message-by-channel-usecase";
import { SendMessageUseCase } from "../../usecases/send-message-usecase";
import { MessageMongoRepository } from "../repo/messages.mongo.repo";

const channelRepository = new ChannelRepositoryMongo();
const messageRepository = new MessageMongoRepository();
const listMessages = new ListChannelMessagesUseCase(messageRepository);
const sendMessage = new SendMessageUseCase({
  channelRepository,
  messageRepository,
  eventBus,
});

export default { sendMessage, listMessages };
