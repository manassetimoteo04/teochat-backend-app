import eventContainer from "../../../infrastructure/container/event-container.js";

export async function findEventByTeam(req, res, next) {
  try {
    const data = await eventContainer.findByTeam.execute({
      teamId: req.params.teamId,
      query: req.query.query,
      range: req.query.range,
      timezone: req.query.timezone,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
