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
    },
    members: [String],
    logo: String,
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;
