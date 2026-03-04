import meetingContainer from "../../../infrastructure/container/meeting-container.js";

export async function generateStreamToken(req, res, next) {
  try {
    const data = await meetingContainer.generateStreamToken.execute({
      userId: req.user.id,
      companyId: req.body.companyId,
      teamId: req.body.teamId,
      callId: req.body.callId,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
