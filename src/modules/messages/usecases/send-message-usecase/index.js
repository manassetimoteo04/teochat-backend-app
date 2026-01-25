import { MessageSentSent } from "../../domain/events/message-sent-event";

export class SendMessageUseCase {
  constructor({ messageRepository, channelRepository, eventBus }) {
    this.messageRepository = messageRepository;
    this.channelRepository = channelRepository;
    this.eventBus = eventBus;
  }

  async execute({ channelId, senderId, content, type = "text" }) {
    const channelExists = await this.channelRepository.findById(channelId);
    if (!channelExists) {
      throw new Error("CHANNEL_NOT_FOUND");
    }

    const message = await this.messageRepository.create({
      channelId,
      senderId,
      content,
      type,
    });
    const payload = {
      sent: message.senderId.id,
      name: message.senderId.name,
      date: message.createdAt,
      content: message.content,
      type: message.type,
    };
    const event = new MessageSentSent({ message: payload, channelId });
    this.eventBus.emit(event.name, event);
    return message;
  }
}
