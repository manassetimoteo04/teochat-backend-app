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
      default: "",
    },
    status: {
      type: String,
      default: "sent",
    },
    type: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    attachment: {
      kind: {
        type: String,
        enum: ["image", "file"],
      },
      fileName: String,
      fileSize: Number,
      mimeType: String,
      secureUrl: String,
      publicId: String,
      resourceType: String,
      format: String,
      width: Number,
      height: Number,
    },
  },
  { timestamps: true },
);

export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
