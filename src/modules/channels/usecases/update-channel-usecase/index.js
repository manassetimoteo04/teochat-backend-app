export default class UpdateChannelUseCase {
  constructor(channelRepository) {
    this.channelRepository = channelRepository;
  }

  async execute(channelId, updateData) {
    return await this.channelRepository.update(channelId, updateData);
  }
}
