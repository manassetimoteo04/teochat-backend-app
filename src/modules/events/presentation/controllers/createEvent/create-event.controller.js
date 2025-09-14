import eventContainer from "../../../infrastructure/container/event-container.js";

export async function createEvent(req, res, next) {
  try {
    const data = await eventContainer.createEvent.execute({
      createdBy: req.user.id,
      ...req.body,
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
