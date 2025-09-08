import { TeamsMongoRepository } from "../../../teams/infrastructure/repositories/team-mongo.repository.js";
import { CancelEventService } from "../../usecases/cancel/cancel-event.service.js";
import { CreateEventService } from "../../usecases/create/create-event.service.js";
import { FindEventService } from "../../usecases/findById/find-event.service.js";
import { FindEventByTeamIdService } from "../../usecases/findByTeamId/find-event-by-team-id.service.js";
import { UpdateEventService } from "../../usecases/update/update-event.service.js";
import { EventMongoRepository } from "../repositories/event-mongo.repository.js";

const eventRepo = new EventMongoRepository();
const teamRepo = new TeamsMongoRepository();

const createEvent = new CreateEventService({ eventRepo });
const updateEvent = new UpdateEventService({ eventRepo });
const findEvent = new FindEventService({ eventRepo });
const findByTeam = new FindEventByTeamIdService({ eventRepo, teamRepo });
const cancelEvent = new CancelEventService({ eventRepo });

export default { updateEvent, findEvent, findByTeam, createEvent, cancelEvent };
