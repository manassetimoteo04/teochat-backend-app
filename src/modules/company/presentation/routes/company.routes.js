import { Router } from "express";
import { createCompany } from "../controllers/createCompany/create-company.controller.js";
import { findCompany } from "../controllers/findCompany/find-company.controller.js";
import { updateCompany } from "../controllers/updateCompany/update-company.controller.js";
import { deleteCompany } from "../controllers/deleteCompany/delete-company.controller.js";
import { findCompanyMembers } from "../controllers/findCompanyMembers/find-company-members.controller.js";

const companyRoute = Router();
companyRoute.post("/", createCompany);
companyRoute.get("/:id", findCompany);
companyRoute.get("/:id/members", findCompanyMembers);
companyRoute.put("/:id", updateCompany);
companyRoute.delete("/:id", deleteCompany);
export default companyRoute;
