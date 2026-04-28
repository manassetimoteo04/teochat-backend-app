import messagesContainer from "../../../infra/containers/messages.container.js";

export async function listChannelMessagesController(req, res, next) {
  try {
    const data = await messagesContainer.listMessages.execute({
      channelId: req.params.channelId,
      limit: Number(req.query.limit),
      cursor: req.query.cursor,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
