import { Router } from "express";
import { findUserCompanies } from "../controllers/findUserCompanies/find-user-companies.controller.js";
import { getProfile } from "../controllers/getProfile/get-profile.controller.js";
import { updatePassword } from "../controllers/updatePassword/update-password.controller.js";
import { updateProfile } from "../controllers/updateProfile/update-profile.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { createSingleUploadMiddleware } from "../../../shared/infrastructure/middlewares/upload.middlewares.js";
import { IMAGE_MIME_TYPES, UPLOAD_LIMITS } from "../../../shared/constants/upload.constants.js";
const usersRoute = Router();

usersRoute.get("/me", authorize, getProfile);
usersRoute.patch(
  "/me",
  authorize,
  createSingleUploadMiddleware({
    fieldName: "avatar",
    allowedMimeTypes: IMAGE_MIME_TYPES,
    maxFileSize: UPLOAD_LIMITS.avatar,
  }),
  updateProfile,
);
usersRoute.patch("/me/password", authorize, updatePassword);
usersRoute.get("/companies", authorize, findUserCompanies);

export default usersRoute;
