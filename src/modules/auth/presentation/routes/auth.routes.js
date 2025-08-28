import { Router } from "express";
import { signInUser } from "../controllers/signIn/sign-in.controller.js";
import { signUpUser } from "../controllers/signUp/sign-up.controller.js";
import { confirmUserAccount } from "../controllers/confirmAccount/confirm-account.controller.js";

const authRouter = Router();

authRouter.post("/sign-in", signInUser);
authRouter.post("/sign-up", signUpUser);
authRouter.post("/verify-account", confirmUserAccount);

export default authRouter;
