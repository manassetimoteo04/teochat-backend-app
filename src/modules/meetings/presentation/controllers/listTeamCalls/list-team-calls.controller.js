import meetingContainer from "../../../infrastructure/container/meeting-container.js";

export async function listTeamCalls(req, res, next) {
  try {
    const data = await meetingContainer.listTeamCalls.execute({
      teamId: req.params.teamId,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
