import { ChannelNotFoundError } from "../../../shared/infrastructure/errors/error.messages";

export default class GetChannelByIdUseCase {
  constructor(channelRepository) {
    this.channelRepository = channelRepository;
  }

  async execute(id) {
    const channel = await this.channelRepository.findById(id);
    if (!channel) {
      throw new ChannelNotFoundError();
    }

    return channel;
  }
}
