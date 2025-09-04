import mongoose from "mongoose";
import { TeamEntity } from "../../domain/entities/teams.entity.js";
import { ITeamsRepository } from "../../domain/interface/team.repository.js";
import Team from "../models/team.model.js";

export class TeamsMongoRepository extends ITeamsRepository {
  async create(data) {
    const team = await Team.create(data);
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
    const team = await Team.findById(id).populate([
      {
        path: "teamLider",
        select: "name email avatar",
      },
      {
        path: "createdBy",
        select: "name email avatar",
      },
    ]);

    if (!team) return null;
    return new TeamEntity({
      id: team._id.toString(),
      companyId: team.companyId.toString(),
      tags: team.tags,
      photo: team.photo,
      name: team.name,
      description: team.description,
      members: team.members,
      createdBy: {
        name: team.createdBy.name,
        email: team.createdBy.email,
        avatar: team.createdBy.avatar,
        id: team.createdBy._id,
      },

      teamLider: team.teamLider
        ? {
            name: team.teamLider.name,
            email: team.teamLider.email,
            avatar: team.teamLider.avatar,
            id: team.teamLider._id,
          }
        : undefined,
    });
  }

  async findMembers(id) {
    const team = await Team.findById(id)
      .populate({
        path: "members",
        select: "name email avatar",
      })
      .select("members");
    if (!team) return null;
    const members = team.members.map((t) => {
      return { id: t._id, name: t.name, avatar: t.avatar, email: t.email };
    });
    return new TeamEntity({
      id: team._id.toString(),
      members,
    });
  }

  async findByUserId({ userId, companyId }) {
    const teams = await Team.find({ companyId, members: { $in: [userId] } });
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
  async removeMember(id, memberId) {
    const team = await Team.findByIdAndUpdate(
      id,
      { $pull: { members: new mongoose.Types.ObjectId(memberId) } },
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
  async removeLider(id) {
    const team = await Team.findById(id);
    team.teamLider = undefined;
    await team.save();
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
