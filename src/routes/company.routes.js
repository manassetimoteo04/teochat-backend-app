import { Router } from "express";
import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const companyRoute = Router();

companyRoute.get("/", getCompanies);
companyRoute.get("/:id", getCompany);
companyRoute.post("/", createCompany);
companyRoute.put("/:id", updateCompany);

export default companyRoute;
