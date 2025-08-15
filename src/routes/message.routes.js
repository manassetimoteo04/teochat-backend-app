import { Router } from "express";
import { authorize } from "../middlewares/auth.middlewares.js";
import {
  createMessages,
  deleteMessage,
  getTeamMessages,
  updatedMessage,
} from "../controllers/message.controller.js";
const messageRoutes = Router();
messageRoutes.get("/:teamId/teams", authorize, getTeamMessages);
messageRoutes.post("/", authorize, createMessages);
messageRoutes.patch("/:id", authorize, updatedMessage);
messageRoutes.delete("/:id", authorize, deleteMessage);
export default messageRoutes;
