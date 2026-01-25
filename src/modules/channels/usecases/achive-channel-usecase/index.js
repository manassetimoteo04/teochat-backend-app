import {
  ChannelArchivedError,
  ChannelNotFoundError,
} from "../../../shared/infrastructure/errors/error.messages";

export default class ArchiveChannelUseCase {
  constructor(channelRepository) {
    this.channelRepository = channelRepository;
  }

  async execute(channelId) {
    const channel = await this.channelRepository.findById(channelId);

    if (!channel) {
      throw new ChannelNotFoundError();
    }

    if (channel.isArchived) {
      throw new ChannelArchivedError();
    }

    return this.channelRepository.archive(channelId);
  }
}
