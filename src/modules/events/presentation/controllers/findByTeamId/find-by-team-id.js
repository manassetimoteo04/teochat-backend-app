import eventContainer from "../../../infrastructure/container/event-container.js";

export async function findEventByTeam(req, res, next) {
  try {
    const data = await eventContainer.findByTeam.execute({
      teamId: req.params.teamId,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
