import { TeamsMongoRepository } from "../../../../teams/infrastructure/repositories/team-mongo.repository.js";
import { EventMongoRepository } from "../../../infrastructure/repositories/event-mongo.repository.js";
import { FindEventByTeamIdService } from "../../../usecases/findByTeamId/find-event-by-team-id.service.js";
const eventRepo = new EventMongoRepository();
const teamRepo = new TeamsMongoRepository();
const findEv = new FindEventByTeamIdService({ eventRepo, teamRepo });
export async function findEventByTeam(req, res, next) {
  try {
    const data = await findEv.execute({ teamId: req.params.teamId });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
