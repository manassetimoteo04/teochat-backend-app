import { EventEntity } from "../../domain/entities/events.entities.js";
import { IEventRepository } from "../../domain/interface/event.repository.js";
import Event from "../models/events.model.js";

export class EventMongoRepository extends IEventRepository {
  async find(filter = {}) {
    const events = await Event.find(filter);

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
          companyId: event.companyId,
        }),
    );
  }
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
      companyId: event.companyId,
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
      companyId: event.companyId,
    });
  }
  async update(id, eventData) {
    const event = await Event.findByIdAndUpdate(id, eventData, { new: true });
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
      companyId: event.companyId,
    });
  }

  async updateMany(filterIds, updateData) {
    const result = await Event.updateMany(
      { _id: { $in: filterIds } },
      { $set: updateData },
    );
    return result.modifiedCount;
  }
  async updateStatusByIds(ids, updateData) {
    if (!ids || ids.length === 0) return 0;
    return this.updateMany(ids, updateData);
  }
  async delete(id) {
    await Event.findByIdAndDelete(id);
    return true;
  }
  async findByTime({ teamId, date, startTime, endTime, id }) {
    const event = await Event.findOne({
      teamId,
      date,
      status: { $ne: "canceled" },
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
      companyId: event.companyId,
    });
  }
  async findByTeamId(teamId, options = {}) {
    const filter = { teamId };
    const { query, dateRange } = options;

    if (typeof query === "string" && query.trim() !== "") {
      const safeQuery = escapeRegex(query.trim());
      filter.$or = [
        { title: { $regex: safeQuery, $options: "i" } },
        { description: { $regex: safeQuery, $options: "i" } },
      ];
    }

    if (dateRange?.startUtc && dateRange?.endUtc) {
      filter.date = { $gte: dateRange.startUtc, $lte: dateRange.endUtc };
    }

    const events = await Event.find(filter).populate({
      path: "teamId",
      select: "name ",
    });
    return events.map(
      (event) =>
        new EventEntity({
          id: event._id.toString(),
          teamId: { id: event?.teamId?.id, name: event?.teamId?.name },
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
          companyId: event.companyId,
        }),
    );
  }
  async findByCompanyId(companyId) {
    const events = await Event.find({
      companyId,
    }).populate({ path: "teamId", select: "name" });

    return events.map(
      (event) =>
        new EventEntity({
          id: event._id.toString(),
          teamId: { id: event?.teamId?._id, name: event?.teamId?.name },
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
          companyId: event.companyId,
        }),
    );
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
