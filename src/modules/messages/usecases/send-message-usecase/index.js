import { InvalidMessagePayloadError } from "../../../shared/infrastructure/errors/error.messages.js";
import { MessageSentSent } from "../../domain/events/message-sent-event/index.js";
import { buildChannelLastMessage } from "../../shared/message-presenters.js";

export class SendMessageUseCase {
  constructor({
    messageRepository,
    assetService,
    channelRepository,
    channelAccessService,
    eventBus,
  }) {
    this.messageRepository = messageRepository;
    this.channelRepository = channelRepository;
    this.channelAccessService = channelAccessService;
    this.eventBus = eventBus;
    this.assetService = assetService;
  }

  async execute({ channelId, senderId, content, type = "text", files = [] }) {
    const { channel } = await this.channelAccessService.execute({
      channelId,
      userId: senderId,
    });

    const trimmedContent = typeof content === "string" ? content.trim() : "";
    const hasContent = trimmedContent.length > 0;
    const hasFiles = Array.isArray(files) && files.length > 0;

    if (!hasContent && !hasFiles) {
      throw new InvalidMessagePayloadError(
        "A mensagem precisa de texto ou anexo.",
      );
    }
    console.log(files);
    const uploadedFiles = hasFiles
      ? await Promise.all(
          files.map((f) =>
            this.assetService.uploadMessageAttachment({
              channelId,
              file: {
                buffer: f.buffer,
                mimetype: f.mimeType, // ← mapeias mimeType → mimetype
                originalname: f.name,
                size: f.size,
              },
            }),
          ),
        )
      : [];
    console.log(uploadedFiles);
    const resolvedType =
      hasFiles && hasContent ? "mixed" : hasFiles ? "file" : "text";
    const filesToSend = uploadedFiles.map((f) => ({
      url: f.secureUrl,
      name: f.fileName,
      size: f.fileSize,
      mimeType: f.mimeType,
    }));
    const message = await this.messageRepository.create({
      channelId,
      senderId,
      content: trimmedContent,
      type: resolvedType,
      files: filesToSend, // [{ url, name, size, mimeType }]
    });

    const payload = {
      sent: message.senderId.id,
      senderId: message.senderId.id,
      name: message.senderId.name,
      date: message.createdAt,
      content: message.content,
      type: message.type,
      files: message.files ?? [],
    };

    const event = new MessageSentSent({ message: payload, channelId });

    await this.channelRepository.update(
      channelId,
      buildChannelLastMessage(message),
    );

    this.eventBus.emit(event.name, event);
    message.channel = channel;
    return message;
  }
}
