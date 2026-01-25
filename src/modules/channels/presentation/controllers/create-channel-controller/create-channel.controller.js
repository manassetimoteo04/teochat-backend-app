import channelContianer from "../../../infra/containers/channel.contianer";

export async function createChannelController(req, res, next) {
  try {
    const { name, description, teamId } = req.body;

    const data = await channelContianer.createChannel.execute({
      teamId,
      name,
      description,
      createdBy: req.user.id,
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
