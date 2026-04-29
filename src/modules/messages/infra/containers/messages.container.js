import ChannelRepositoryMongo from "../../../channels/infra/repo/channel.mongo.repo.js";
import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { CloudinaryAssetService } from "../../../shared/services/cloudinary-asset.service.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import { ListChannelMessagesUseCase } from "../../usecases/list-message-by-channel-usecase/index.js";
import { SendMessageUseCase } from "../../usecases/send-message-usecase/index.js";
import { ChannelAccessService } from "../../usecases/shared/channel-access.service.js";
import { MessageMongoRepository } from "../repo/messages.mongo.repo.js";

const channelRepository = new ChannelRepositoryMongo();
const messageRepository = new MessageMongoRepository();
const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const userRepo = new UserMongoRepository();
const assetService = new CloudinaryAssetService();
const channelAccessService = new ChannelAccessService({
  channelRepository,
  teamRepo,
  companyRepo,
  userRepo,
});
const listMessages = new ListChannelMessagesUseCase(
  messageRepository,
  channelAccessService,
);

const sendMessage = new SendMessageUseCase({
  channelRepository,
  messageRepository,
  channelAccessService,
  assetService,
  eventBus,
});

export default { sendMessage, listMessages, assetService };
