import mongoose from "mongoose";
import Company from "../models/company.model.js";

export const createCompany = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const company = await Company.create([req.body]);
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
    const companies = await Company.find();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      const error = new Error("Nenhuma empresa encontrada");
      error.statusCode = 404;
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
    const company = await Company.findByIdAndUpdate(req.params.id, req.body);
    if (!company) {
      const error = new Error("Nenhuma empresa encontrada");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({
      succes: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};
