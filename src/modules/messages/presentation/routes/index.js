import { Router } from "express";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { MESSAGE_ATTACHMENT_MIME_TYPES, UPLOAD_LIMITS } from "../../../shared/constants/upload.constants.js";
import { createSingleUploadMiddleware } from "../../../shared/infrastructure/middlewares/upload.middlewares.js";
import { listChannelMessagesController } from "../controllers/list-channel-messages/index.js";
import { sendMessageController } from "../controllers/send-message/send-message.controller.js";

const messageRouter = Router();

messageRouter.get(
  "/:channelId/channel",
  authorize,
  listChannelMessagesController,
);
messageRouter.post(
  "/:channelId/channel",
  authorize,
  createSingleUploadMiddleware({
    fieldName: "attachment",
    allowedMimeTypes: MESSAGE_ATTACHMENT_MIME_TYPES,
    maxFileSize: UPLOAD_LIMITS.messageAttachment,
  }),
  sendMessageController,
);

export default messageRouter;
