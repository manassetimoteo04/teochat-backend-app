import { InvitationMongoRepository } from "../../../invitation/infrastructure/repositories/invitation-mongo.repository.js";
import notificationContainer from "../../../notifications/infrastructure/container/notification-container.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { CloudinaryAssetService } from "../../../shared/services/cloudinary-asset.service.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CreateCompanyService } from "../../usecases/create/create-company.service.js";
import { DeactivateCompanyService } from "../../usecases/deactivate/deactivate-company.service.js";
import { DeleteCompanyService } from "../../usecases/delete/delete-company.service.js";
import { FindCompanyByIdService } from "../../usecases/findById/find-by-id.service.js";
import { FindCurrentCompanyService } from "../../usecases/findCurrentCompany/find-current-company.service.js";
import { FindCompanyMembersService } from "../../usecases/findMembers/find-company-members.service.js";
import { FindRecentMembersService } from "../../usecases/findRecentMembers/find-recent-members.service.js";
import { PromoteMemberToAdminService } from "../../usecases/promoteMember/promote-member-to-admin.service.js";
import { RemoveCompanyMemberService } from "../../usecases/removeMember/remove-company-member.service.js";
import { UpdateCompanyService } from "../../usecases/update/update-company.service.js";
import { UpdateCompanySettingsService } from "../../usecases/updateSettings/update-company-settings.service.js";
import { CompanyMongoRepository } from "../repositories/company.mongo.repository.js";

const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();
const invitationRepo = new InvitationMongoRepository();
const assetService = new CloudinaryAssetService();

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
const updateCompanySettings = new UpdateCompanySettingsService({
  companyRepo,
  userRepo,
  assetService,
});
const deactivateCompany = new DeactivateCompanyService({
  companyRepo,
  userRepo,
});
const promoteMemberToAdmin = new PromoteMemberToAdminService({
  companyRepo,
  userRepo,
  notificationService: notificationContainer.createNotification,
  emailService: sendEmail,
});
const removeCompanyMember = new RemoveCompanyMemberService({
  companyRepo,
  userRepo,
  notificationService: notificationContainer.createNotification,
  emailService: sendEmail,
});

export default {
  createCompany,
  deleteCompany,
  findCompany,
  findMembers,
  findCurrentCompany,
  findRecentMembers,
  updateCompany,
  updateCompanySettings,
  deactivateCompany,
  promoteMemberToAdmin,
  removeCompanyMember,
};
