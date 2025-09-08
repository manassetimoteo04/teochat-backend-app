import { EventMongoRepository } from "../../../infrastructure/repositories/event-mongo.repository.js";
import { UpdateEventService } from "../../../usecases/update/update-event.service.js";
const eventRepo = new EventMongoRepository();
const updateEv = new UpdateEventService({ eventRepo });
export async function updateEvent(req, res, next) {
  try {
    const data = await updateEv.execute({
      eventId: req.params.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
