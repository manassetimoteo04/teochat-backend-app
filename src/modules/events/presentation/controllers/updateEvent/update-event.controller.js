import eventContainer from "../../../infrastructure/container/event-container.js";

export async function updateEvent(req, res, next) {
  try {
    const data = await eventContainer.updateEvent.execute({
      eventId: req.params.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
