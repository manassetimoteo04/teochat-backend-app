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
    avatar: {
      type: String,
      default: "/default-user.jpg",
    },
    // avatarAsset: {
    //   secureUrl: String,
    //   publicId: String,
    //   resourceType: String,
    //   bytes: Number,
    //   width: Number,
    //   height: Number,
    //   format: String,
    //   originalFileName: String,
    //   mimeType: String,
    // },
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
    isActive: {
      type: Boolean,
      default: true,
    },
    confirmCode: {
      type: String,
      default: undefined,
    },
    confirmExpiresIn: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
