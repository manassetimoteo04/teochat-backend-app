import { ChannelAlreadyExistsError } from "../../../shared/infrastructure/errors/error.messages";
import ChannelEntity from "../../domain/entities/channel.entity";

export default class CreateChannelUseCase {
  constructor(channelRepository) {
    this.channelRepository = channelRepository;
  }

  async execute({ teamId, name, description, createdBy }) {
    const exists = await this.channelRepository.findByNameAndTeam(name, teamId);
    if (exists) {
      throw new ChannelAlreadyExistsError();
    }
    const channel = new ChannelEntity({
      teamId,
      name,
      description,
      createdBy,
    });

    return this.channelRepository.create(channel);
  }
}
