import messagesContainer from "../../../infra/containers/messages.container.js";
import { getSocketServer } from "../../../../shared/utils/send.notifications.js";
import { buildChannelRealtimePayload } from "../../../shared/message-presenters.js";

export async function sendMessageController(req, res, next) {
  let attachment = null;

  try {
    attachment = req.file
      ? await messagesContainer.assetService.uploadMessageAttachment({
          channelId: req.params.channelId,
          file: req.file,
        })
      : null;

    const message = await messagesContainer.sendMessage.execute({
      channelId: req.params.channelId,
      senderId: req.user.id,
      content: req.body.content,
      type: req.body.type,
      attachment,
    });

    const io = getSocketServer();
    const updatedChannel = buildChannelRealtimePayload(message.channel, message);

    io?.to(req.params.channelId).emit("message:new", message);
    io?.to(req.params.channelId).emit("channel:new-msg", updatedChannel);

    res.status(201).json({
      success: true,
      data: {
        message,
        channel: updatedChannel,
      },
    });
  } catch (error) {
    if (attachment?.publicId) {
      await messagesContainer.assetService.deleteAsset({
        publicId: attachment.publicId,
        resourceType: attachment.resourceType,
      });
    }
    next(error);
  }
}
