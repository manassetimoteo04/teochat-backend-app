import { Router } from "express";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares";
import { listChannelMessagesController } from "../controllers/list-channel-messages";

const messageRouter = Router();

messageRouter.get(
  "/:channelId/channel",
  authorize,
  listChannelMessagesController,
);

export default messageRouter;
