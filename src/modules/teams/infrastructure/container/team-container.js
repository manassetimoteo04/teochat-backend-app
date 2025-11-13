import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { TeamsMongoRepository } from "../repositories/team-mongo.repository.js";

import { FindTeamByCompanyIdService } from "../../usecases/findByCompanyId/find-by-company-id.service.js";
import { FindTeamByUserIdService } from "../../usecases/findByUserId/find-by-user-id.service.js";
import { FindTeamMembersService } from "../../usecases/findMembers/find-members.service.js";
import { FindTeamByIdService } from "../../usecases/findById/find-by-id.service.js";
import { RemoveTeamLiderService } from "../../usecases/removeLider/remove-team-lider.service.js";
import { RemoveTeamMemberService } from "../../usecases/removeMembers/remove-team-members.service.js";
import { SetTeamLiderService } from "../../usecases/setLider/set-team-lider.service.js";
import { updateTeamService } from "../../usecases/update/update-team.service.js";
import { AddTeamMembersService } from "../../usecases/addMembers/add-team-members.service.js";
import { CreateTeamService } from "../../usecases/create/create-team.service.js";
import { DeleteTeamService } from "../../usecases/delete/delete-team.service.js";

const teamRepo = new TeamsMongoRepository();
const companyRepo = new CompanyMongoRepository();
const userRepo = new UserMongoRepository();

const addTeamMember = new AddTeamMembersService({ teamRepo, companyRepo });
const createTeam = new CreateTeamService({
  companyRepo,
  userRepo,
  teamRepo,
});
const deleteTeam = new DeleteTeamService({ teamRepo, companyRepo });
const findTeamsByCompany = new FindTeamByCompanyIdService({
  userRepo,
  companyRepo,
  teamRepo,
});
const findTeamsByUserId = new FindTeamByUserIdService({
  userRepo,
  companyRepo,
  teamRepo,
});
const findTeamMembers = new FindTeamMembersService({ teamRepo, userRepo });
const findTeam = new FindTeamByIdService({
  companyRepo,
  userRepo,
  teamRepo,
});
const removeTeamLider = new RemoveTeamLiderService({ teamRepo, companyRepo });
const removeTeamMember = new RemoveTeamMemberService({ teamRepo, companyRepo });
const setTeamLider = new SetTeamLiderService({
  teamRepo,
  companyRepo,
  userRepo,
});
const updateTeam = new updateTeamService({ teamRepo, companyRepo });

export default {
  addTeamMember,
  createTeam,
  deleteTeam,
  findTeamsByCompany,
  findTeamsByUserId,
  findTeamMembers,
  findTeam,
  removeTeamLider,
  removeTeamMember,
  setTeamLider,
  updateTeam,
};
