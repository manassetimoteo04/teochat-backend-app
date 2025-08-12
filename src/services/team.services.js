import Agenda from "../models/agenda.model.js";
import Team from "../models/team.model.js";
import Services from "./services.js";

class TeamServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async createTeam() {
    this.restrictedActions(["admin", "super_admin"], this.req.user?.role);
    const team = await Team.create({
      ...this.req.body,
      companyId: this.req.company,
      members: [this.req.user.id],
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
    this.restrictedActions(["super_admin", "admin"], this.req.user?.role);
    const teams = await Team.find({ companyId: this.req.params.companyId });
    return { teams };
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
    this.restrictedActions(["super_admin", "admin"], this.req.user?.role);
    const team = await Team.findByIdAndUpdate(
      this.req.params.id,
      {
        $addToSet: { members: this.req.params.userId },
      },
      { new: true }
    );
    await Agenda.findByIdAndUpdate(team.agendaId, {
      $addToSet: { users: this.req.params.userId },
    });
    return { team };
  }
}
export default TeamServices;
