import eventContainer from "../../../infrastructure/container/event-container.js";

export async function findEvent(req, res, next) {
  try {
    const data = await eventContainer.findEvent.execute({
      eventId: req.params.id,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
