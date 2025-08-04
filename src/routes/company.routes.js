import { Router } from "express";
import {
  createNewCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const companyRoute = Router();

companyRoute.get("/", authorize, getCompanies);
companyRoute.get("/:id", authorize, getCompany);
companyRoute.post("/", authorize, createNewCompany);
companyRoute.patch("/:id", authorize, updateCompany);
companyRoute.delete("/:id", authorize, deleteCompany);

export default companyRoute;
