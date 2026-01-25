import { Router } from "express";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares";
import { createChannelController } from "../controllers/create-channel-controller/create-channel.controller";
import { getChannelByIdController } from "../controllers/get-channel-by-id/get-channel-by-id.controller";
import { listChannelByTeamController } from "../controllers/list-channel-by-team/list-channel-by-team.controller";
import { archiveChannelController } from "../controllers/archive-channel/archive-channel.controller";

const channelRouter = Router();

channelRouter.post("/", authorize, createChannelController);
channelRouter.get("/:teamId/team", authorize, listChannelByTeamController);
channelRouter.get("/:id", authorize, getChannelByIdController);
channelRouter.put("/:id/archive", authorize, archiveChannelController);

export default channelRouter;
