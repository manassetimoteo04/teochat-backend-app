import { model, Schema, Types } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "O nome do projecto é obrigatório"],
    },
    description: String,
    tasks: [],
    tags: [],
    teamId: {
      type: Types.ObjectId,
      ref: "Team",
    },
    startDate: Date,
    endDate: Date,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    photo: "String",
  },
  { timestamps: true }
);

const Project = new model("Project", projectSchema);
export default Project;
