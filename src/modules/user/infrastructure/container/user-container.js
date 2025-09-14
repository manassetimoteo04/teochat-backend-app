import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import { CreateUserService } from "../../usecases/createUser/create-user.service";
import { FindUserByIdService } from "../../usecases/findUser/find-one-user.service.js";
import { FindUserByEmailService } from "../../usecases/findUserByEmail/find-user-by-email.service.js";
import { FindUserCompaniesService } from "../../usecases/findUserCompanies/find-user-companies.service.js";
import UserMongoRepository from "../repositories/user.mongo.repository.js";
const userRepo = new UserMongoRepository();
const createUser = new CreateUserService(userRepo, eventBus);
const findUserById = new FindUserByIdService(userRepo);
const findUserByEmail = new FindUserByEmailService(userRepo);
const findUserCompanies = new FindUserCompaniesService({ userRepo });
export default {
  createUser,
  findUserById,
  findUserByEmail,
  findUserCompanies,
};
