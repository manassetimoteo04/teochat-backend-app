import channelContianer from "../../../infra/containers/channel.contianer";

export async function listChannelByTeamController(req, res, next) {
  try {
    const { teamId } = req.params;
    const data = await channelContianer.listChannelByTeam.execute(teamId);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
