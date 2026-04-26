import { AuthService } from "../../../auth/domain/auth.service.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { CreateUserService } from "../../usecases/createUser/create-user.service.js";
import { FindUserByIdService } from "../../usecases/findUser/find-one-user.service.js";
import { FindUserByEmailService } from "../../usecases/findUserByEmail/find-user-by-email.service.js";
import { FindUserCompaniesService } from "../../usecases/findUserCompanies/find-user-companies.service.js";
import { UpdatePasswordService } from "../../usecases/updatePassword/update-password.service.js";
import { UpdateProfileService } from "../../usecases/updateProfile/update-profile.service.js";
import UserMongoRepository from "../repositories/user.mongo.repository.js";

const userRepo = new UserMongoRepository();
const authService = new AuthService();
const createUser = new CreateUserService(userRepo, eventBus);
const findUserById = new FindUserByIdService(userRepo);
const findUserByEmail = new FindUserByEmailService(userRepo);
const findUserCompanies = new FindUserCompaniesService({ userRepo });
const updateProfile = new UpdateProfileService({ userRepo });
const updatePassword = new UpdatePasswordService({ userRepo, authService });
export default {
  createUser,
  findUserById,
  findUserByEmail,
  findUserCompanies,
  updateProfile,
  updatePassword,
};
