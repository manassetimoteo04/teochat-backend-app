import { Router } from "express";
import {
  acceptInvite,
  checkInviteToken,
  createNewCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  getCompanyMembers,
  inviteCompanyMember,
  updateCompany,
} from "../controllers/company.controller.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const companyRoute = Router();

companyRoute.get("/", authorize, getCompanies);
companyRoute.get("/:id", authorize, getCompany);
companyRoute.get("/:id/members", authorize, getCompanyMembers);
companyRoute.post("/invite-member/", authorize, inviteCompanyMember);
companyRoute.get("/check-invite/:inviteToken", authorize, checkInviteToken);
companyRoute.put("/accept-invite/", authorize, acceptInvite);
companyRoute.post("/", authorize, createNewCompany);
companyRoute.patch("/:id", authorize, updateCompany);
companyRoute.delete("/:id", authorize, deleteCompany);

export default companyRoute;
