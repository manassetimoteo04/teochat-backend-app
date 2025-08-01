import mongoose from "mongoose";
import Company from "../models/company.model.js";
import restrictToRole from "../utils/restrictToRole.js";
import { User } from "../models/user.model.js";

export const createCompany = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const company = await Company.create([
      { ...req.body, createdBy: req.user.id, members: [req.user.id] },
    ]);
    const newCompany = {
      companyId: company[0]._id,
      role: "super_admin",
    };
    await User.findByIdAndUpdate(req.user.id, {
      $push: { companies: newCompany },
    });
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
    const user = await User.findById(req.user.id);
    const companyIds = user.companies.map((com) => com.companyId);
    const companies = await Company.find({
      _id: { $in: companyIds },
    });
    res
      .status(200)
      .json({ results: companies.length, success: true, data: companies });
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    const isMember = company.members.some((id) => req.user.id.equals(id));

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

    res.status(200).json({
      succes: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    const isMember = company.members.some((id) => req.user.id.equals(id));

    if (!isMember) {
      const error = new Error(
        "Não podes executar está acção, não és membro desta empresa"
      );
      error.statusCode = 401;
      throw error;
    }
    console.log(["super_admin admin"], req.user.role);
    restrictToRole(["super_admin"], req.user.role);
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!updatedCompany) {
      const error = new Error("Nenhuma empresa encontrada");
      error.statusCode = 404;
      throw error;
    }

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
    const isCompany = await Company.findById(req.params.id);
    const isMember = isCompany.members.some((id) => req.user.id.equals(id));

    if (!isMember) {
      const error = new Error(
        "Não podes executar está acção, não és membro desta empresa"
      );
      error.statusCode = 401;
      throw error;
    }
    restrictToRole(["super_admin admin"], req.user.role);

    const company = await Company.findById(req.params.id, req.body);
    if (!company) {
      const error = new Error("Nenhuma empresa encontrada");
      error.statusCode = 404;
      throw error;
    }
    await Company.findByIdAndDelete(req.params.id);
    res.status(204).json({
      succes: true,
    });
  } catch (error) {
    next(error);
  }
};
