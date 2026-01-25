import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      default: "general",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //
    lastMessage: {
      sent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      content: {
        type: String,
      },
      type: {
        type: String,
      },
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
ChannelSchema.index({ teamId: 1, name: 1 }, { unique: true });
const Channel = mongoose.model("Channel", ChannelSchema);
export default Channel;
