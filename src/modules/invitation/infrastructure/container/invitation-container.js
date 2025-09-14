import { CompanyMongoRepository } from "../../../company/infrastructure/repositories/company.mongo.repository.js";
import { generateEmailTemplate } from "../../../shared/helpers/generate-email-templates.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { AcceptInvitationService } from "../../usecases/accept/accept-invitation.service.js";
import { CancelInvitationService } from "../../usecases/cancel/cancel-invitation.service.js";
import { CreateInvitationService } from "../../usecases/create/create-invitation.service.js";
import { FindInvitationByCompanyIdService } from "../../usecases/findByCompanyId/find-invitation-by-company-id.service.js";
import { FindInvitationByIdService } from "../../usecases/findById/find-invitation-by-id.service.js";
import { SendInvitationService } from "../../usecases/sendInvitation/send-invitation.service.js";
import { InvitationMongoRepository } from "../repositories/invitation-mongo.repository.js";

const invitationRepo = new InvitationMongoRepository();
const userRepo = new UserMongoRepository();
const companyRepo = new CompanyMongoRepository();

const createInvitation = new CreateInvitationService({
  invitationRepo,
  userRepo,
  companyRepo,
  eventBus,
});

const acceptInvitation = new AcceptInvitationService({
  userRepo,
  companyRepo,
  invitationRepo,
});

const cancelInvitation = new CancelInvitationService({
  invitationRepo,
  companyRepo,
  userRepo,
});

const findByCompany = new FindInvitationByCompanyIdService({
  invitationRepo,
  companyRepo,
});

const findInvitation = new FindInvitationByIdService({
  invitationRepo,
  userRepo,
});
const sendInvitation = new SendInvitationService({
  invitationRepo,
  userRepo,
  emailService: sendEmail,
  generateTemplates: generateEmailTemplate,
});

export default {
  createInvitation,
  acceptInvitation,
  cancelInvitation,
  findByCompany,
  findInvitation,
  sendInvitation,
};
