import { Message } from "../../domain/entities/message.entity.js";
import { MessageRepository } from "../../domain/interface/messsage.repository.interface.js";
import { MessageModel } from "../models/messages.model.js";

export class MessageMongoRepository extends MessageRepository {
  toEntity(doc) {
    if (!doc) return null;

    return new Message({
      id: doc._id.toString(),
      channelId: doc.channelId.toString(),
      status: doc.status,
      senderId: doc.senderId?._id
        ? {
            id: doc.senderId._id.toString(),
            name: doc.senderId.name,
            email: doc.senderId.email,
            avatar: doc.senderId.avatar,
      }
        : doc.senderId.toString(),
      content: doc.content,
      type: doc.type,
      attachment: doc.attachment || null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async create({ channelId, senderId, content, type, attachment }) {
    const doc = await MessageModel.create({
      channelId,
      senderId,
      content,
      type,
      attachment,
    });

    await doc.populate("senderId", "name email avatar");
    return this.toEntity(doc);
  }

  async findById(id) {
    const doc = await MessageModel.findById(id).populate(
      "senderId",
      "name email avatar",
    );

    return this.toEntity(doc);
  }

  async findByChannel({ channelId, limit = 10, cursor, type }) {
    const filter = {
      channelId,
      ...(type && { type }),
      ...(cursor && { createdAt: { $lt: new Date(cursor) } }),
    };

    const docs = await MessageModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit + 1)
      .populate("senderId", "name email avatar")
      .lean();

    const hasMore = docs.length > limit;
    const messages = hasMore ? docs.slice(0, limit) : docs;

    return {
      messages: messages.map((doc) => this.toEntity(doc)),
      nextCursor: messages[messages.length - 1]?.createdAt ?? null,
      hasMore,
    };
  }

  async updateContent(id, content) {
    const doc = await MessageModel.findByIdAndUpdate(
      id,
      { content },
      { new: true },
    ).populate("senderId", "name email avatar");

    return this.toEntity(doc);
  }
}
