import mongoose from "mongoose";

const AgendaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Agenda = mongoose.model("Agenda", AgendaSchema);
export default Agenda;
