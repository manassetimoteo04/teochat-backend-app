import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { CreateTeamService } from "../../usecases/create/create-project.service.js";
import { FindProjectByIdService } from "../../usecases/findById/find-by-id.service.js";
import { ProjectMongoRepository } from "../repositories/projects-mongo.repository.js";

const projectRepo = new ProjectMongoRepository();
const teamRepo = new TeamsMongoRepository();
const userRepo = new UserMongoRepository();
const createProject = new CreateTeamService({
  projectRepo,
  teamRepo,
  userRepo,
});
const findProject = new FindProjectByIdService({ projectRepo });

export default { createProject, findProject };
