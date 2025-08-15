import EventServices from "../services/events.services.js";

export async function getEvent(req, res, next) {
  try {
    const services = new EventServices(req);
    const events = await services.getEvent();

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
}
export async function createEvent(req, res, next) {
  try {
    const services = new EventServices(req);
    const events = await services.createEvent();

    res.status(201).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
}
export async function updateEvent(req, res, next) {
  try {
    const services = new EventServices(req);
    const events = await services.updateEvent();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
}
export async function deleteEvent(req, res, next) {
  try {
    const services = new EventServices(req);
    await services.deleteEvent();

    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
}
