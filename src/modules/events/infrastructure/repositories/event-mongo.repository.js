import { EventEntity } from "../../domain/entities/events.entities.js";
import { IEventRepository } from "../../domain/interface/event.repository.js";
import Event from "../models/events.model.js";

export class EventMongoRepository extends IEventRepository {
  async findById(id) {
    const event = await Event.findById(id);
    if (!event) return null;
    return new EventEntity({
      id: event._id.toString(),
      teamId: event.teamId,
      title: event.title,
      description: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      location: event.location,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });
  }
  async create(eventData) {
    const event = await Event.create(eventData);

    return new EventEntity({
      id: event._id.toString(),
      teamId: event.teamId,
      title: event.title,
      status: event.status,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      location: event.location,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });
  }
  async update(id, eventData) {
    const event = await Event.findByIdAndUpdate(id, eventData);
    if (!event) return null;

    return new EventEntity({
      id: event._id.toString(),
      teamId: event.teamId,
      title: event.title,
      status: event.status,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      location: event.location,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });
  }
  async delete(id) {
    await Event.findByIdAndDelete(id);
    return true;
  }
  async findByTime({ teamId, startTime, endTime, id }) {
    const event = await Event.findOne({
      teamId,
      _id: { $ne: id },
      $or: [
        {
          startTime: { $lt: startTime },
          endTime: { $gt: endTime },
        },
      ],
    });
    if (!event) return null;
    return new EventEntity({
      id: event._id.toString(),
      teamId: event.teamId,
      title: event.title,
      status: event.status,
      description: event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      location: event.location,
      createdBy: event.createdBy,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });
  }
  async findByTeamId(teamId) {
    const events = await Event.find({
      teamId,
    });
    return events.map(
      (event) =>
        new EventEntity({
          id: event._id.toString(),
          teamId: event.teamId,
          title: event.title,
          status: event.status,
          description: event.description,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          type: event.type,
          location: event.location,
          createdBy: event.createdBy,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
        })
    );
  }
}
