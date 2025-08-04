import mongoose from "mongoose";
import restrictToRole from "../utils/restrictToRole.js";
import Team from "../models/team.model.js";
import TeamServices from "../services/team.services.js";

export const createTeam = async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const services = new TeamServices(req);
    const { team } = await services.createTeam();
    session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, data: team });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getCompanyTeams = async (req, res, next) => {
  try {
    const services = new TeamServices(req);
    const { teams } = await services.getCompanyTeams();
    res.status(200).json({ success: true, results: teams.length, data: teams });
  } catch (error) {
    next(error);
  }
};

export const getUserTeams = async (req, res, next) => {
  try {
    const services = new TeamServices(req);
    const { teams } = await services.getUserTeams();
    res.status(200).json({ success: true, results: teams.length, data: teams });
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const services = new TeamServices(req);
    const { team } = await services.updateTeam();
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};
export const deteleTeam = async (req, res, next) => {
  try {
    const services = new TeamServices(req);
    await services.deteleTeam();
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const addTeamMember = async (req, res, next) => {
  try {
    const services = new TeamServices(req);
    const { team } = await services.addTeamMember();
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};
