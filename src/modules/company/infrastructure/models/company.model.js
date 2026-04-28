import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome da empresa é obrigatório"],
    },
    ownerName: {
      type: String,
      required: [true, "O nome da responsável é obrigatório"],
    },
    description: {
      type: String,
    },
    industry: [String],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    logo: String,
    logoAsset: {
      secureUrl: String,
      publicId: String,
      resourceType: String,
      bytes: Number,
      width: Number,
      height: Number,
      format: String,
      originalFileName: String,
      mimeType: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;
