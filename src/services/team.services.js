import Agenda from "../models/agenda.model.js";
import Team from "../models/team.model.js";
import Company from "../models/company.model.js";
import Services from "./services.js";

class TeamServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async createTeam() {
    this.restrictedActions(["admin", "super_admin"], this.req.role);
    const { members, description, tags, name, photo } = this.req.body;
    const team = await Team.create({
      companyId: this.req.company,
      tags: tags.split(","),
      photo,
      name,
      description,
      members: [this.req.user.id, ...members],
      createdBy: this.req.user.id,
    });
    const agenda = await Agenda.create({
      name: `${team.name} - Agenda`,
      teamId: team._id,
      users: team.members,
    });
    team.agendaId = agenda._id;
    await team.save();
    return { team: { team, agenda } };
  }
  async getCompanyTeams() {
    this.restrictedActions(["super_admin", "admin"], this.req.role);
    const company = await Company.findById(this.req.params.companyId);
    if (!company) {
      const error = new Error("Nenhuma empresa foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
    const isMember = company?.members?.some((com) =>
      com.equals(this.req.user.id)
    );
    if (!isMember) {
      const error = new Error(
        "Não podes executar esta acção, não és membro desta empresa"
      );
      error.statusCode = 404;
      throw error;
    }
    const teams = await Team.find({ companyId: this.req.params.companyId });
    return { teams };
  }
  async getTeam() {
    const team = await Team.findById(this.req.params.id).populate(
      "createdBy teamLider"
    );
    if (!team) {
      const error = new Error("Nenhum team com este id foi encontrado");
      error.statusCode = 404;
      throw error;
    }
    const isMember = team?.members?.some((com) => com.equals(this.req.user.id));
    if (
      !isMember &&
      (this.req.role !== "admin" || this.req.role !== "super_admin")
    ) {
      const error = new Error(
        "Não podes executar esta acção, não és membro deste team"
      );
      error.statusCode = 403;
      throw error;
    }
    team.createdBy.password = undefined;
    team.createdBy.isConfirmed = undefined;
    team.createdBy.companies = undefined;
    team.createdBy.createdAt = undefined;
    team.createdBy.updatedAt = undefined;
    return { team };
  }
  async getTeamParticipants() {
    const team = await Team.findById(this.req.params.id).populate("members");
    if (!team) {
      const error = new Error("Nenhum team com este id foi encontrado");
      error.statusCode = 404;
      throw error;
    }
    const isMember = team?.members?.some((com) => com.equals(this.req.user.id));
    if (
      !isMember &&
      (this.req.role !== "admin" || this.req.role !== "super_admin")
    ) {
      const error = new Error(
        "Não podes executar esta acção, não és membro deste team"
      );
      error.statusCode = 403;
      throw error;
    }
    const participants = team.members.map((t) => ({
      ...t._doc,
      password: undefined,
      isConfirmed: undefined,
      companies: undefined,
    }));

    return { participants };
  }
  async getUserTeams() {
    const teams = await Team.find({ members: { $in: [this.req.params.id] } });
    return { teams };
  }
  async updateTeam() {
    this.restrictedActions(["super_admin", "admin"], this.req.user?.role);
    const team = await Team.findByIdAndUpdate(
      this.req.params.id,
      { ...this.req.body },
      { new: true }
    );
    return { team };
  }
  async deteleTeam() {
    this.restrictedActions(["super_admin", "admin"], this.req.user?.role);
    await Team.findByIdAndDelete(this.req.params.id);
  }
  async addTeamMember() {
    this.restrictedActions(["super_admin", "admin"], this.req.role);
    const { members } = this.req.body;
    const team = await Team.findByIdAndUpdate(
      this.req.params.id,
      {
        $addToSet: { members: { $each: members } },
      },
      { new: true }
    );
    await Agenda.findByIdAndUpdate(team.agendaId, {
      $addToSet: { users: { $each: members } },
    });
    return { team };
  }
}
export default TeamServices;
