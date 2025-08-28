import IUserRepository from "../../domain/repositories/user.repository.js";
import { User } from "../models/user.model.js";

export default class UserMongoRepository extends IUserRepository {
  async create(userData) {
    const user = await User.create(userData);
    return user.toObject();
  }

  async findByEmail(email) {
    return await User.findOne({ email }).lean();
  }

  async findById(id) {
    return await User.findById(id).lean();
  }

  async update(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).lean();
  }
}
