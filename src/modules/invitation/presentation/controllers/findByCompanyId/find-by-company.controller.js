import { CompanyMongoRepository } from "../../../../company/infrastructure/repositories/company.mongo.repository.js";
import { InvitationMongoRepository } from "../../../infrastructure/repositories/invitation-mongo.repository.js";
import { FindInvitationByCompanyIdService } from "../../../usecases/findByCompanyId/find-invitation-by-company-id.service.js";

const invitationRepo = new InvitationMongoRepository();
const companyRepo = new CompanyMongoRepository();
const findByCompany = new FindInvitationByCompanyIdService({
  invitationRepo,
  companyRepo,
});
export async function findInvitationByCompany(req, res, next) {
  try {
    const invitations = await findByCompany.execute({
      companyId: req.params.id,
      userId: req.body.userId,
    });

    res.status(200).json({ success: true, data: invitations });
  } catch (error) {
    next(error);
  }
}
