import { EventMongoRepository } from "../../../infrastructure/repositories/event-mongo.repository.js";
import { CancelEventService } from "../../../usecases/cancel/cancel-event.service.js";
const eventRepo = new EventMongoRepository();
const cancelEv = new CancelEventService({ eventRepo });
export async function cancelEvent(req, res, next) {
  try {
    const data = await cancelEv.execute({
      eventId: req.params.id,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
