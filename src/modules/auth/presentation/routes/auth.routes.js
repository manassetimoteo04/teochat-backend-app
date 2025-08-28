import { Router } from "express";
import { signInUser } from "../controllers/signIn/sign-in.controller.js";

const authRouter = Router();

authRouter.post("/sign-in", signInUser);

export default authRouter;
