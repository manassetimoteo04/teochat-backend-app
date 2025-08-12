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
    members: [Types.ObjectId],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    teamLider: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

const Team = model("Team", teamSchema);
export default Team;
