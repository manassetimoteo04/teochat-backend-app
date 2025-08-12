import { Router } from "express";
import {
  addCompanyMember,
  createNewCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  getCompanyMembers,
  updateCompany,
} from "../controllers/company.controller.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const companyRoute = Router();

companyRoute.get("/", authorize, getCompanies);
companyRoute.get("/:id", authorize, getCompany);
companyRoute.get("/:id/members", authorize, getCompanyMembers);
companyRoute.patch("/:id/members", authorize, addCompanyMember);
companyRoute.post("/", authorize, createNewCompany);
companyRoute.patch("/:id", authorize, updateCompany);
companyRoute.delete("/:id", authorize, deleteCompany);

export default companyRoute;
