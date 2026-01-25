import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "sent",
    },
    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
  },
  { timestamps: true },
);

export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
