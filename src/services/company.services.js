import jwt from "jsonwebtoken";
import Company from "../models/company.model.js";
import Services from "./services.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/send.email.js";
import { generateEmailTemplate } from "../utils/helpers/generate.emails.js";
import { JWT_SECRET } from "../configs/env.js";

class CompanyServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async createCompany() {
    const { name, industry, description, invitation } = this.req.body;
    const company = await Company.create([
      {
        name,
        ownerName: "Manasse Timóteo",
        industry: industry.split(","),
        description,
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

    const enviteEmails = invitation.split(",");
    for (const emailItem of enviteEmails) {
      const token = this.generateTokens({
        email: emailItem,
        companyId: company[0]._id,
      });
      const actionLink = `http://localhost:5173/companies/join/${token}`;
      const email = {
        to: emailItem,
        subject: `Convite para empresa ${company[0].name} no TeoChat`,
        html: generateEmailTemplate({
          companyName: company[0].name,
          actionLink,
          secondaryContent: "Este convite expira em 5 dias",
        }),
      };
      console.log(`Enviando convite para ${emailItem}`);
      await sendEmail(email);
    }
    const token = this.generateTokens({
      user: this.req.user.id,
      companyId: company[0]._id,
    });
    return { company, token };
  }
  async getCompanies() {
    const user = await User.findById(this.req.user.id).populate({
      path: "companies.companyId",
      select: "name description createdAt logo",
    });
    return {
      companies: user.companies.map((com) => ({
        role: com.role,
        joinedAt: com.joined,
        company: com.companyId,
      })),
    };
  }
  async getCompany() {
    const company = await Company.findById(this.req.params.id);
    if (!company) {
      const error = new Error("Nenhuma empresa foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
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
  async getCompanyMembers() {
    const company = await Company.findById(this.req.params.id).populate(
      "members"
    );
    if (!company) {
      const error = new Error("Nenhuma empresa foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }

    const isMember = company.members.some((id) =>
      this.req.user.id.equals(id._id)
    );

    if (!isMember) {
      const error = new Error(
        "Não podes executar está acção, não és membro desta empresa"
      );
      error.statusCode = 401;
      throw error;
    }

    const members = company.members.map((mem) => {
      return {
        ...mem._doc,
        role: mem.companies.find((f) => f.companyId === this.req.params.id)
          ?.role,
        companies: undefined,
        password: undefined,
      };
    });
    return { members: members };
  }
  async inviteCompanyMember() {
    this.restrictedActions(["admin", "super_admin"], this.req.user.role);
    const company = await Company.findById(this.req.companyId).populate(
      "members"
    );
    if (!company) {
      const error = new Error("Nenhuma empresa foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }

    const isMember = company.members.some((id) =>
      this.req.user.id.equals(id._id)
    );
    if (!isMember) {
      const error = new Error(
        "Não podes executar está acção, não és membro desta empresa"
      );
      error.statusCode = 401;
      throw error;
    }
    const { emails } = this.req.body;
    const enviteEmails = emails.split(",");
    for (const emailItem of enviteEmails) {
      const token = this.generateTokens({
        email: emailItem,
        companyId: this.req.companyId,
      });
      const actionLink = `http://localhost:5173/companies/join/${token}`;
      const email = {
        to: emailItem,
        subject: `Convite para empresa ${company[0].name} no TeoChat`,
        html: generateEmailTemplate({
          companyName: company[0].name,
          actionLink,
          secondaryContent: "Este convite expira em 5 dias",
        }),
      };
      console.log(`Enviando convite para ${emailItem}`);
      await sendEmail(email);
    }
  }
  async checkInviteToken() {
    const decoded = jwt.verify(this.req.params.inviteToken, JWT_SECRET);
    const user = await User.findById(this.req.user.id);
    if (!user) {
      const error = new Error("Usuário foi encontrada");
      error.statusCode = 404;
      throw error;
    }
    if (user.email !== decoded.email) {
      const error = new Error(
        "Este convite somente é válido para o destinatário"
      );
      error.statusCode = 401;
      throw error;
    }
    if (
      user?.companies?.some((com) => com?.companyId?.equals(decoded.companyId))
    ) {
      const error = new Error("O para está empresa já foi aceite");
      error.statusCode = 401;
      throw error;
    }
    const company = await Company.findById(decoded.companyId).select(
      "-members"
    );
    return { company };
  }
  async updateCompany() {
    const company = await Company.findById(this.req.params.id);
    if (!company) {
      const error = new Error("Nenhuma empresa foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
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
    if (!isCompany) {
      const error = new Error("Nenhuma empresa foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
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
