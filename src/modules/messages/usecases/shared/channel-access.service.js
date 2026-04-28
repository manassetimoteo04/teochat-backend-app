import { CompanyDeactivatedError, CompanyNotFoundError, MessageChannelAccessError, UserNotFoundError } from "../../../shared/infrastructure/errors/error.messages.js";

export class ChannelAccessService {
  constructor({ channelRepository, teamRepo, companyRepo, userRepo }) {
    this.channelRepository = channelRepository;
    this.teamRepo = teamRepo;
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
  }

  async execute({ channelId, userId }) {
    const [channel, user] = await Promise.all([
      this.channelRepository.findById(channelId),
      this.userRepo.findById(userId),
    ]);

    if (!channel) {
      throw new MessageChannelAccessError("O canal informado não existe.");
    }

    if (!user) throw new UserNotFoundError();

    const team = await this.teamRepo.findById(channel.teamId);
    if (!team || !team.isMember(userId)) {
      throw new MessageChannelAccessError();
    }

    const company = await this.companyRepo.findById(team.companyId);
    if (!company) throw new CompanyNotFoundError();
    if (!company.isActive) throw new CompanyDeactivatedError();
    if (!company.isMember(userId)) throw new MessageChannelAccessError();

    return { channel, team, company, user };
  }
}
