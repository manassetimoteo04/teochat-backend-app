import channelContianer from "../../../infra/containers/channel.contianer";

export async function getChannelByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const data = await channelContianer.getChannelById.execute(id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
