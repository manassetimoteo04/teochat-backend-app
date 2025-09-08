import { EventEntity } from "../../domain/entities/events.entities.js";
import { IEventRepository } from "../../domain/interface/event.repository.js";
import Event from "../models/events.model.js";

export class EventMongoRepository extends IEventRepository {
  async findById(id) {
    const event = await Event.findById(id).populate([
      { path: "teamId", select: "name photo tags" },
      { path: "createdBy", select: "name avatar" },
    ]);
    if (!event) return null;
    return new EventEntity({
      id: event._id.toString(),
      teamId: {
        id: event.teamId._id,
        name: event.teamId.name,
        photo: event.teamId.photo,
        tags: event.teamId.tags,
      },
      createdBy: {
        id: event.createdBy._id,
        name: event.createdBy.name,
        avatar: event.createdBy.avatar,
      },
      status: event.status,
      title: event.title,
      description: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type,
      location: event.location,
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
  async findByTime({ teamId, date, startTime, endTime, id }) {
    const event = await Event.findOne({
      teamId,
      date,
      _id: { $ne: id },
      $and: [{ startTime: { $lt: endTime } }, { endTime: { $gt: startTime } }],
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
    }).populate({ path: "teamId", select: "name " });
    return events.map(
      (event) =>
        new EventEntity({
          id: event._id.toString(),
          teamId: { id: event.teamId.id, name: event.teamId.name },
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
