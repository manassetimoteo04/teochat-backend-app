import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    agendaId: {
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
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", EventSchema);
export default Event;
