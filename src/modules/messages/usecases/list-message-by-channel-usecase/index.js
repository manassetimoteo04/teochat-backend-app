export class ListChannelMessagesUseCase {
  constructor(messageRepository, channelAccessService) {
    this.messageRepository = messageRepository;
    this.channelAccessService = channelAccessService;
  }

  async execute({ channelId, limit, cursor, type, userId }) {
    if (userId) {
      await this.channelAccessService.execute({ channelId, userId });
    }

    return await this.messageRepository.findByChannel({
      channelId,
      limit,
      cursor,
      type,
    });
  }
}
