import eventContainer from "../../../infrastructure/container/event-container.js";

export async function cancelEvent(req, res, next) {
  try {
    const data = await eventContainer.cancelEvent.execute({
      eventId: req.params.id,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
