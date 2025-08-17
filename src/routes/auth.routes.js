import { Router } from "express";
import {
  signIn,
  signUp,
  verifyAccount,
} from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/verify-account", authorize, verifyAccount);
authRouter.get("/me", signIn);
authRouter.patch("/me", signIn);

export default authRouter;
