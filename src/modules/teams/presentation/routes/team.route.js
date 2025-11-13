import { Router } from "express";
import { createTeam } from "../controllers/createTeam/create-team.controller.js";
import { findTeam } from "../controllers/findTeamById/find-team.controller.js";
import { findTeamByCompany } from "../controllers/findByCompanyId/find-team-by-company.controller.js";
import { findTeamByUserId } from "../controllers/findByUserId/find-team-by-user-id.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { findTeamMembers } from "../controllers/findMembers/find-team-members.controller.js";
import { addTeamMember } from "../controllers/addTeamMember/add-team-member.controller.js";
import { removeTeamMember } from "../controllers/removeTeamMember/remove-team-member.controller.js";
import { setTeamLider } from "../controllers/setTeamLider/set-team-lider.controller.js";
import { removeTeamLider } from "../controllers/removeTeamLider/remove-team-lider.controller.js";
import { updateTeam } from "../controllers/updateTeam/update-team.controller.js";
import { deleteTeam } from "../controllers/deleteTeam/delete-team.controller.js";

const teamRoutes = Router();

teamRoutes.get("/company/:companyId", authorize, findTeamByCompany);
teamRoutes.post("/:companyId", authorize, createTeam);
teamRoutes.put("/:id/:companyId", authorize, updateTeam);
teamRoutes.get("/:id/:companyId", authorize, findTeam);
teamRoutes.delete("/:id/:companyId", authorize, deleteTeam);
teamRoutes.get("/:id/members/:companyId", authorize, findTeamMembers);
teamRoutes.put("/:id/members/:companyId/", authorize, addTeamMember);
teamRoutes.put("/:id/lider/:companyId/", authorize, setTeamLider);
teamRoutes.delete("/:id/lider/:companyId/", authorize, removeTeamLider);
teamRoutes.delete(
  "/:id/members/:companyId/:memberId",
  authorize,
  removeTeamMember
);
teamRoutes.get("/:id", findTeam);
teamRoutes.get("/user/:companyId", findTeamByUserId);

export default teamRoutes;
