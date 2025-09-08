import { EventMongoRepository } from "../../../infrastructure/repositories/event-mongo.repository.js";
import { CreateEventService } from "../../../usecases/create/create-event.service.js";
const eventRepo = new EventMongoRepository();
const createEv = new CreateEventService({ eventRepo });
export async function createEvent(req, res, next) {
  try {
    const data = await createEv.execute({
      createdBy: req.user.id,
      ...req.body,
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
