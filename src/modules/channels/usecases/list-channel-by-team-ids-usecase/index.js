export default class ListChannelsByTeamIdsUseCase {
  constructor(channelRepository) {
    this.channelRepository = channelRepository;
  }

  async execute(teamIds) {
    return this.channelRepository.findByTeamIds(teamIds);
  }
}
