import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      default: "account",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
      index: true,
    },
    action: {
      label: String,
      path: String,
      apiPath: String,
      method: {
        type: String,
        default: "GET",
      },
      kind: String,
    },
    actor: {
      id: String,
      name: String,
      avatar: String,
    },
    entity: {
      id: String,
      kind: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

NotificationSchema.index({ userId: 1, status: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
