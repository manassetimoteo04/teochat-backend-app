import { CompanyEntity } from "../../domain/entities/company.entity.js";
import Company from "../models/company.model.js";

export class CompanyMongoRepository {
  async create(data) {
    const doc = new Company(data);
    const saved = await doc.save();
    return new CompanyEntity({
      id: saved._id.toString(),
      name: saved.name,
      ownerName: saved.ownerName,
      members: saved.members,
      industry: saved.industry,
      createdBy: saved.createdBy,
      logo: saved.logo,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    });
  }
  async findById(id) {
    const doc = await Company.findById(id);
    if (!doc) return null;
    return new CompanyEntity({
      id: doc._id.toString(),
      name: doc.name,
      ownerName: doc.ownerName,
      members: doc.members,
      industry: doc.industry,
      createdBy: doc.createdBy,
      logo: doc.logo,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
  async addMember(companyId, userId) {
    const doc = await Company.findByIdAndUpdate(companyId, {
      $addToSet: { members: userId },
    });

    return new CompanyEntity({
      id: doc._id.toString(),
      name: doc.name,
      ownerName: doc.ownerName,
      members: doc.members,
      industry: doc.industry,
      createdBy: doc.createdBy,
      logo: doc.logo,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
  async update(id, updateData) {
    const doc = await Company.findById(id);
    if (!doc) return null;
    doc.set(updateData);
    await doc.save();

    return new CompanyEntity({
      id: doc._id.toString(),
      name: doc.name,
      ownerName: doc.ownerName,
      members: doc.members,
      industry: doc.industry,
      createdBy: doc.createdBy,
      logo: doc.logo,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
