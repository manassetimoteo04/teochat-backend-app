import { Model, Schema, Types } from "mongoose";

const messageSchema = Schema(
  {
    teamId: {
      type: Types.ObjectId,
      ref: "Team",
    },
    content: {
      type: String,
    },
    contentType: {
      type: String,
      required: [true, "O tipo de mensagem é obrigatório"],
      enum: ["text", "audio", "image", "video", "file", "document"],
      default: "text",
    },
    senderId: {
      type: Types.ObjectId,
      ref: "User",
    },
    fileUrl: {
      type: String,
    },
    answerRef: {
      type: Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamp: true }
);

const Message = Model("Message", messageSchema);
export default Message;
