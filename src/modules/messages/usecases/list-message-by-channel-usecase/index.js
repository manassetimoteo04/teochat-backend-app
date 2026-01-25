export class ListChannelMessagesUseCase {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute({ channelId, limit, cursor, type }) {
    return await this.messageRepository.findByChannel({
      channelId,
      limit,
      cursor,
      type,
    });
  }
}
