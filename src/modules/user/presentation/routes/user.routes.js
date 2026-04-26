import { Router } from "express";
import { findUserCompanies } from "../controllers/findUserCompanies/find-user-companies.controller.js";
import { getProfile } from "../controllers/getProfile/get-profile.controller.js";
import { updatePassword } from "../controllers/updatePassword/update-password.controller.js";
import { updateProfile } from "../controllers/updateProfile/update-profile.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
const usersRoute = Router();

usersRoute.get("/me", authorize, getProfile);
usersRoute.patch("/me", authorize, updateProfile);
usersRoute.patch("/me/password", authorize, updatePassword);
usersRoute.get("/companies", authorize, findUserCompanies);

export default usersRoute;
