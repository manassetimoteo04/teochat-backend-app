import { InvalidMessagePayloadError } from "../../../shared/infrastructure/errors/error.messages.js";
import { MessageSentSent } from "../../domain/events/message-sent-event/index.js";
import { buildChannelLastMessage } from "../../shared/message-presenters.js";

export class SendMessageUseCase {
  constructor({ messageRepository, channelRepository, channelAccessService, eventBus }) {
    this.messageRepository = messageRepository;
    this.channelRepository = channelRepository;
    this.channelAccessService = channelAccessService;
    this.eventBus = eventBus;
  }

  async execute({ channelId, senderId, content, type = "text", attachment = null }) {
    const { channel } = await this.channelAccessService.execute({
      channelId,
      userId: senderId,
    });

    const trimmedContent = typeof content === "string" ? content.trim() : "";
    const resolvedType = attachment ? attachment.kind : type;

    if (!trimmedContent && !attachment) {
      throw new InvalidMessagePayloadError("A mensagem precisa de texto ou anexo.");
    }

    const message = await this.messageRepository.create({
      channelId,
      senderId,
      content: trimmedContent,
      type: resolvedType,
      attachment,
    });
    const payload = {
      sent: message.senderId.id,
      senderId: message.senderId.id,
      name: message.senderId.name,
      date: message.createdAt,
      content: message.content,
      type: message.type,
      attachment: message.attachment,
    };
    const event = new MessageSentSent({ message: payload, channelId });
    await this.channelRepository.update(channelId, buildChannelLastMessage(message));
    this.eventBus.emit(event.name, event);
    message.channel = channel;
    return message;
  }
}
