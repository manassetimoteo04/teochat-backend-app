import { Router } from "express";
import { findUserCompanies } from "../controllers/findUserCompanies/find-user-companies.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
const usersRoute = Router();

usersRoute.get("/companies", authorize, findUserCompanies);

export default usersRoute;
