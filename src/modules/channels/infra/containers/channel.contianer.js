import ArchiveChannelUseCase from "../../usecases/achive-channel-usecase/index.js";
import CreateChannelUseCase from "../../usecases/create-channel-usecase/index.js";
import GetChannelByIdUseCase from "../../usecases/get-channel-by-id-usecase/index.js";
import ListChannelsByTeamUseCase from "../../usecases/list-channel-by-team-id-usecase/index.js";
import ListChannelsByTeamIdsUseCase from "../../usecases/list-channel-by-team-ids-usecase/index.js";
import UpdateChannelUseCase from "../../usecases/update-channel-usecase/index.js";
import ChannelRepositoryMongo from "../repo/channel.mongo.repo.js";

const repo = new ChannelRepositoryMongo();
const createChannel = new CreateChannelUseCase(repo);
const listChannelByTeam = new ListChannelsByTeamUseCase(repo);
const getChannelById = new GetChannelByIdUseCase(repo);
const archiveChannel = new ArchiveChannelUseCase(repo);
const updateChannel = new UpdateChannelUseCase(repo);
const listChannelByTeamIds = new ListChannelsByTeamIdsUseCase(repo);
export default {
  createChannel,
  listChannelByTeam,
  getChannelById,
  archiveChannel,
  updateChannel,
  listChannelByTeamIds,
};
