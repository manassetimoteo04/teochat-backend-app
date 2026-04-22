import meetingContainer from "../../../infrastructure/container/meeting-container.js";

export async function createInstantCall(req, res, next) {
  try {
    const data = await meetingContainer.createInstantCall.execute({
      userId: req.user.id,
      companyId: req.body.companyId,
      teamId: req.params.teamId,
      title: req.body.title,
      description: req.body.description,
      durationInMinutes: req.body.durationInMinutes,
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
