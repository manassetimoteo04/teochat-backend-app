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
    market: [String],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    logo: String,
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;
