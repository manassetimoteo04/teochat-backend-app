import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O Usuário deve conter um nome"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "O usuário deve conter um email"],
    },
    password: {
      type: String,
      required: [true, "O usuário deve conter uma senha"],
    },
    companies: [
      {
        companyId: {
          type: String,
          ref: "Company",
        },
        role: {
          type: String,
          enum: ["admin", "super_admin", "member"],
          default: "member",
        },
        joined: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmCode: {
      type: String,
      default: undefined,
    },
    confirmExpiresIn: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
