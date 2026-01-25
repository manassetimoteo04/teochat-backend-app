export default class ListChannelsByTeamUseCase {
  constructor(channelRepository) {
    this.channelRepository = channelRepository;
  }

  async execute(teamId) {
    return this.channelRepository.findByTeam(teamId);
  }
}
