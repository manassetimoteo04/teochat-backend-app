import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    agenda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agenda",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    location: String,
    type: {
      type: String,
      enum: ["presential", "video-call"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "canceled", "finished"],
      required: true,
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", EventSchema);
export default Event;
