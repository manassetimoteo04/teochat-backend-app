import Company from "../models/company.model.js";
import { User } from "../models/user.model.js";
import Services from "./services.js";

class CompanyServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async createCompany() {
    const company = await Company.create([
      {
        ...this.req.body,
        createdBy: this.req.user.id,
        members: [this.req.user.id],
      },
    ]);
    const newCompany = {
      companyId: company[0]._id,
      role: "super_admin",
    };
    await User.findByIdAndUpdate(this.req.user.id, {
      $push: { companies: newCompany },
    });
    return { company };
  }
  async getCompanies() {
    const user = await User.findById(this.req.user.id);
    const companyIds = user.companies.map((com) => com.companyId);
    const companies = await Company.find({
      _id: { $in: companyIds },
    });
    return { companies };
  }
  async getCompany() {
    const company = await Company.findById(this.req.params.id);
    const isMember = company.members.some((id) => this.req.user.id.equals(id));

    if (!company) {
      const error = new Error("Nenhuma empresa encontrada");
      error.statusCode = 404;
      throw error;
    }
    if (!isMember) {
      const error = new Error(
        "Não podes executar está acção, não és membro desta empresa"
      );
      error.statusCode = 401;
      throw error;
    }
    return { company };
  }

  async updateCompany() {
    const company = await Company.findById(this.req.params.id);
    const isMember = company.members.some((id) => this.req.user.id.equals(id));

    if (!isMember) {
      const error = new Error(
        "Não podes executar está acção, não és membro desta empresa"
      );
      error.statusCode = 401;
      throw error;
    }
    this.restrictedActions(["super_admin"], this.req.user.role);
    const updatedCompany = await Company.findByIdAndUpdate(
      this.req.params.id,
      this.req.body,
      { new: true }
    );

    if (!updatedCompany) {
      const error = new Error("Nenhuma empresa encontrada");
      error.statusCode = 404;
      throw error;
    }
    return { updatedCompany };
  }
  async deleteCompany() {
    const isCompany = await Company.findById(this.req.params.id);
    const isMember = isCompany.members.some((id) =>
      this.req.user.id.equals(id)
    );

    if (!isMember) {
      const error = new Error(
        "Não podes executar está acção, não és membro desta empresa"
      );
      error.statusCode = 401;
      throw error;
    }
    this.restrictedActions(["super_admin"], this.req.user.role);

    const company = await Company.findById(this.req.params.id, this.req.body);
    if (!company) {
      const error = new Error("Nenhuma empresa encontrada");
      error.statusCode = 404;
      throw error;
    }
    await Company.findByIdAndDelete(this.req.params.id);
  }
}
export default CompanyServices;
