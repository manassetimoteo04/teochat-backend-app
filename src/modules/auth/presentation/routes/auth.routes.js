import { Router } from "express";
import { signInUser } from "../controllers/signIn/sign-in.controller.js";
import { signUpUser } from "../controllers/signUp/sign-up.controller.js";

const authRouter = Router();

authRouter.post("/sign-in", signInUser);
authRouter.post("/sign-up", signUpUser);

export default authRouter;
