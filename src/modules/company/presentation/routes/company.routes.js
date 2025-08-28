import { Router } from "express";
import { createCompany } from "../controllers/createCompany/create-company.controller.js";
import { findCompany } from "../controllers/findCompany/find-company.controller.js";

const companyRoute = Router();
companyRoute.post("/", createCompany);
companyRoute.get("/:id", findCompany);
export default companyRoute;
