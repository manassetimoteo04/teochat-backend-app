import { UserEntity } from "../../domain/entities/user.entity.js";
import IUserRepository from "../../domain/interface/user.repository.js";
import { User } from "../models/user.model.js";

export default class UserMongoRepository extends IUserRepository {
  async create(user) {
    const doc = new User(user);
    const saved = await doc.save();

    return new UserEntity({
      id: saved._id.toString(),
      name: saved.name,
      email: saved.email,
      password: saved.password,
    });
  }

  async findByEmail(email) {
    const doc = await User.findOne({ email }).lean();
    if (!doc) return null;
    return new UserEntity({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      isConfirmed: doc.isConfirmed,
      password: doc.password,
    });
  }

  async findById(id) {
    const doc = await User.findById(id);
    if (!doc) return null;
    return new UserEntity({
      id: doc._id.toString(),
      name: doc.name,
      confirmCode: doc.confirmCode,
      confirmExpiresIn: doc.confirmExpiresIn,
      isConfirmed: doc.isConfirmed,
      companies: doc.companies,
      avatar: doc.avatar,
      email: doc.email,
      password: doc.password,
    });
  }
  async findCompanies(id) {
    const doc = await User.findById(id).populate({
      path: "companies.companyId",
      select: "name description createdAt logo",
    });
    if (!doc) return null;
    return new UserEntity({
      id: doc._id.toString(),
      companies: doc.companies.map((com) => {
        const object = {};
        Object.keys(com.companyId._doc).forEach((key) => {
          if (key === "_id") return (object.id = com.companyId._doc[key]);
          object[key] = com.companyId._doc[key];
        });

        return {
          role: com._doc.role,
          joined: com._doc.joined,
          companyId: object,
        };
      }),
    });
  }

  async update(id, updateData) {
    const user = await User.findById(id);
    user.set(updateData);
    await user.save();

    return new UserEntity({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      isConfirmed: user.isConfirmed,
    });
  }
  async addCompany(userId, companyId, role) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { companies: { companyId, role } },
    });
  }
}
