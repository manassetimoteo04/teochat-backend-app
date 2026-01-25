import ArchiveChannelUseCase from "../../usecases/achive-channel-usecase";
import CreateChannelUseCase from "../../usecases/create-channel-usecase";
import GetChannelByIdUseCase from "../../usecases/get-channel-by-id-usecase";
import ListChannelsByTeamUseCase from "../../usecases/list-channel-by-team-id-usecase";
import ListChannelsByTeamIdsUseCase from "../../usecases/list-channel-by-team-ids-usecase";
import UpdateChannelUseCase from "../../usecases/update-channel-usecase";
import ChannelRepositoryMongo from "../repo/channel.mongo.repo";

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
