import { Router } from "express";
import { findUserCompanies } from "../controllers/findUserCompanies/find-user-companies.controller.js";
const usersRoute = Router();

usersRoute.get("/:id/companies", findUserCompanies);

export default usersRoute;
