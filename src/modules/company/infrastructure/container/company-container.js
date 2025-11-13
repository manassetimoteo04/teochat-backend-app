import { InvitationMongoRepository } from "../../../invitation/infrastructure/repositories/invitation-mongo.repository.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CreateCompanyService } from "../../usecases/create/create-company.service.js";
import { DeleteCompanyService } from "../../usecases/delete/delete-company.service.js";
import { FindCompanyByIdService } from "../../usecases/findById/find-by-id.service.js";
import { FindCurrentCompanyService } from "../../usecases/findCurrentCompany/find-current-company.service.js";
import { FindCompanyMembersService } from "../../usecases/findMembers/find-company-members.service.js";
import { FindRecentMembersService } from "../../usecases/findRecentMembers/find-recent-members.service.js";
import { UpdateCompanyService } from "../../usecases/update/update-company.service.js";
import { CompanyMongoRepository } from "../repositories/company.mongo.repository.js";

const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const invitationRepo = new InvitationMongoRepository();

const createCompany = new CreateCompanyService({
  userRepo,
  companyRepo,
  invitationRepo,
  eventBus,
});
const deleteCompany = new DeleteCompanyService({ companyRepo });
const findCompany = new FindCompanyByIdService({ companyRepo });
const findMembers = new FindCompanyMembersService({ companyRepo, userRepo });
const findCurrentCompany = new FindCurrentCompanyService({
  userRepo,
  companyRepo,
});
const findRecentMembers = new FindRecentMembersService({
  companyRepo,
  userRepo,
});
const updateCompany = new UpdateCompanyService({ companyRepo });

export default {
  createCompany,
  deleteCompany,
  findCompany,
  findMembers,
  findCurrentCompany,
  findRecentMembers,
  updateCompany,
};
