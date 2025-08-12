import mongoose from "mongoose";
import CompanyServices from "../services/company.services.js";

export const createNewCompany = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const services = new CompanyServices(req);
    const { company } = await services.createCompany();
    await session.commitTransaction();
    res.status(201).json({ success: true, data: company });
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
export const addCompanyMember = async (req, res, next) => {
  try {
    const services = new CompanyServices(req);
    const { members } = await services.addCompanyMember();

    res.status(200).json({
      succes: true,
      results: members.length,
      data: members,
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
