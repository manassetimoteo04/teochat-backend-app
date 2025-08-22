import mongoose from "mongoose";
import CompanyServices from "../services/company.services.js";
import { JWT_COOKIE_EXPIRES_IN } from "../configs/env.js";

export const createNewCompany = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const services = new CompanyServices(req);
    const { company, token } = await services.createCompany();
    await session.commitTransaction();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24,
    });
    res.status(201).json({ success: true, data: { company, token } });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    const { companies } = await services.getCompanies();
    res
      .status(200)
      .json({ results: companies.length, success: true, data: companies });
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    const { company } = await services.getCompany();

    res.status(200).json({
      succes: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};
export const getCompanyMembers = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    const { members } = await services.getCompanyMembers();

    res.status(200).json({
      succes: true,
      data: members,
    });
  } catch (error) {
    next(error);
  }
};
export const inviteCompanyMember = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    await services.inviteCompanyMember();

    res.status(200).json({
      succes: true,
    });
  } catch (error) {
    next(error);
  }
};
export const checkInviteToken = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    const { company } = await services.checkInviteToken();

    res.status(200).json({
      succes: true,
      data: { allowed: true, company },
    });
  } catch (error) {
    next(error);
  }
};
export const acceptInvite = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    const { company, token } = await services.acceptInvite();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      success: true,
      data: { token, company },
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    const { updatedCompany } = await services.updateCompany();
    res.status(201).json({
      succes: true,
      data: updatedCompany,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    await services.deleteCompany();

    res.status(204).json({
      succes: true,
    });
  } catch (error) {
    next(error);
  }
};
