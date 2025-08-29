import { TeamEntity } from "../../domain/entities/teams.entity";
import Team from "../models/team.model";

export class TeamsMongoRepository {
  async create({ data }) {
    const team = await Team.create({
      data,
    });

    return new TeamEntity({
      id: team._id.toString(),
      companyId: team.companyId.toString(),
      tags: team.tags,
      photo: team.photo,
      name: team.name,
      description: team.description,
      members: team.members,
      createdBy: team.createdBy.toString(),
    });
  }
  async findByCompanyId(id) {
    const teams = await Team.find({ companyId: id });
    return teams.map(
      (team) =>
        new TeamEntity({
          id: team._id.toString(),
          companyId: team.companyId.toString(),
          tags: team.tags,
          photo: team.photo,
          name: team.name,
          description: team.description,
          members: team.members,
          createdBy: team.createdBy.toString(),
        })
    );
  }

  async findById(id) {
    const team = await Team.findById(id).populate(
      {
        path: "teamLider",
        select: "name email avatar",
      },
      {
        path: "createdBy",
        select: "name email avatar",
      }
    );

    if (!team) return null;
    return new TeamEntity({
      id: team._id.toString(),
      companyId: team.companyId.toString(),
      tags: team.tags,
      photo: team.photo,
      name: team.name,
      description: team.description,
      members: team.members,
      createdBy: team.createdBy,
      teamLider: team.teamLider,
    });
  }

  async findMembers() {
    const team = await Team.findById(this.req.params.id)
      .populate({
        path: "members",
        select: "name email avatar",
      })
      .select("members");
    if (!team) return null;

    return new TeamEntity({
      id: team._id.toString(),
      members: team.members,
    });
  }

  async findByUserId(userId) {
    const teams = await Team.find({ members: { $in: [userId] } });
    return teams.map(
      (team) =>
        new TeamEntity({
          id: team._id.toString(),
          companyId: team.companyId.toString(),
          tags: team.tags,
          photo: team.photo,
          name: team.name,
          description: team.description,
          members: team.members,
          createdBy: team.createdBy.toString(),
        })
    );
  }

  async update(id, updateData) {
    const team = await Team.findByIdAndUpdate(id, updateData, { new: true });
    if (!team) return null;
    return new TeamEntity({
      id: team._id.toString(),
      companyId: team.companyId.toString(),
      tags: team.tags,
      photo: team.photo,
      name: team.name,
      description: team.description,
      members: team.members,
      createdBy: team.createdBy.toString(),
    });
  }

  async addMember(id, membersData = []) {
    const team = await Team.findByIdAndUpdate(
      id,
      {
        $addToSet: { members: { $each: membersData } },
      },
      { new: true }
    );
    if (!team) return null;
    return new TeamEntity({
      id: team._id.toString(),
      companyId: team.companyId.toString(),
      tags: team.tags,
      photo: team.photo,
      name: team.name,
      description: team.description,
      members: team.members,
      createdBy: team.createdBy.toString(),
    });
  }

  async setLider(id, liderId) {
    const team = await Team.findByIdAndUpdate(
      id,
      {
        teamLider: liderId,
      },
      { new: true }
    );
    if (!team) return null;
    return new TeamEntity({
      id: team._id.toString(),
      companyId: team.companyId.toString(),
      tags: team.tags,
      photo: team.photo,
      name: team.name,
      description: team.description,
      members: team.members,
      createdBy: team.createdBy.toString(),
    });
  }
  async delete(id) {
    await Team.findByIdAndDelete(id);
  }
}
