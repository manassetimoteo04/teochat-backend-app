import { InvitationEntity } from "../../domain/entities/invitation.entity.js";
import { IInvitationRepository } from "../../domain/interface/invitation.repository.js";
import { Invitation } from "../models/invitation.model.js";

export class InvitationMongoRepository extends IInvitationRepository {
  async findById(id) {
    const invitation = await Invitation.findById(id);
    if (!invitation) return null;
    return new InvitationEntity({
      id: invitation._id,
      destination: invitation.destination,
      expiresIn: invitation.expiresIn,
      createdBy: invitation.createdBy,
      company: invitation.company,
      accepted: invitation.accepted,
      canceled: invitation.canceled,
      createdAt: invitation.createdAt,
      updatedAt: invitation.updatedAt,
    });
  }
  async findByCompanyId(companyId) {
    const invitations = await Invitation.find({ company: companyId });
    return invitations.map(
      (inv) =>
        new InvitationEntity({
          id: inv._id,
          destination: inv.destination,
          expiresIn: inv.expiresIn,
          createdBy: inv.createdBy,
          company: inv.company,
          accepted: inv.accepted,
          canceled: inv.canceled,
          createdAt: inv.createdAt,
          updatedAt: inv.updatedAt,
        })
    );
  }

  async accept(id) {
    const doc = await Invitation.findByIdAndUpdate(id, {
      accepted: true,
    });
    if (!doc) return null;
    return new InvitationEntity({
      id: doc._id,
      destination: doc.destination,
      expiresIn: doc.expiresIn,
      createdBy: doc.createdBy,
      company: doc.company,
      accepted: doc.accepted,
      canceled: doc.canceled,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
  async cancel(id) {
    const doc = await Invitation.findByIdAndUpdate(id, {
      canceled: true,
    });
    if (!doc) return null;
    return new InvitationEntity({
      id: doc._id,
      destination: doc.destination,
      expiresIn: doc.expiresIn,
      createdBy: doc.createdBy,
      company: doc.company,
      accepted: doc.accepted,
      canceled: doc.canceled,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
  async create(data) {
    const doc = new Invitation(data);
    await doc.save();
    return new InvitationEntity({
      id: doc._id,
      destination: doc.destination,
      expiresIn: doc.expiresIn,
      createdBy: doc.createdBy,
      company: doc.company,
      accepted: doc.accepted,
      canceled: doc.canceled,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
