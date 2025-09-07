import { EventMongoRepository } from "../../../infrastructure/repositories/event-mongo.repository.js";
import { FindEventService } from "../../../usecases/findById/find-event.service.js";
const eventRepo = new EventMongoRepository();
const findEv = new FindEventService({ eventRepo });
export async function findEvent(req, res, next) {
  try {
    const data = await findEv.execute({ eventId: req.params.id });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
