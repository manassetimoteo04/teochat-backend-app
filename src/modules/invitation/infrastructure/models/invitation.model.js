import { model, Schema, Types } from "mongoose";

const invitationSchema = new Schema(
  {
    destination: {
      type: String,
    },
    expiresIn: Date,
    company: {
      type: Types.ObjectId,
      ref: "Company",
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Invitation = new model("Invitation", invitationSchema);
