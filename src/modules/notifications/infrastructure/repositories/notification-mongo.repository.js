import { NotificationEntity } from "../../domain/entities/notification.entity.js";
import Notification from "../models/notification.model.js";

function toEntity(doc) {
  if (!doc) return null;
  return new NotificationEntity({
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    type: doc.type,
    category: doc.category,
    title: doc.title,
    message: doc.message,
    status: doc.status,
    action: doc.action || null,
    actor: doc.actor || null,
    entity: doc.entity || null,
    metadata: doc.metadata || {},
    readAt: doc.readAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}

export class NotificationMongoRepository {
  async create(data) {
    const doc = await Notification.create(data);
    return toEntity(doc);
  }

  async createMany(items = []) {
    if (!items.length) return [];
    const docs = await Notification.insertMany(items);
    return docs.map(toEntity);
  }

  async findByUserId(userId, { page = 1, limit = 20, status } = {}) {
    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
    const filter = { userId };

    if (status && ["read", "unread"].includes(status)) {
      filter.status = status;
    }

    const [items, total, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),
      Notification.countDocuments(filter),
      Notification.countDocuments({ userId, status: "unread" }),
    ]);

    return {
      items: items.map(toEntity),
      total,
      unreadCount,
      page: safePage,
      limit: safeLimit,
      pages: Math.ceil(total / safeLimit) || 1,
    };
  }

  async countUnread(userId) {
    return Notification.countDocuments({ userId, status: "unread" });
  }

  async markAsRead({ id, userId }) {
    const doc = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { status: "read", readAt: new Date() },
      { new: true },
    );
    return toEntity(doc);
  }

  async markAllAsRead(userId) {
    const result = await Notification.updateMany(
      { userId, status: "unread" },
      { status: "read", readAt: new Date() },
    );
    return result.modifiedCount || 0;
  }

  async deleteOne({ id, userId }) {
    const doc = await Notification.findOneAndDelete({ _id: id, userId });
    return toEntity(doc);
  }

  async deleteAll(userId) {
    const result = await Notification.deleteMany({ userId });
    return result.deletedCount || 0;
  }
}
