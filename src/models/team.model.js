import { model, Schema, Types } from "mongoose";

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "O nome da equipa é obrigatório"],
      trim: true,
    },
    description: String,
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    tags: [String],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    photo: {
      type: "String",
      default: "",
    },
    teamLider: {
      type: Types.ObjectId,
      ref: "User",
    },
    agendaId: {
      type: Types.ObjectId,
      ref: "Agenda",
    },
  },
  { timestamps: true }
);

const Team = model("Team", teamSchema);
export default Team;
