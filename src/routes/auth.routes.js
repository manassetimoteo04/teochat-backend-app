import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("/me", signIn);
authRouter.patch("/me", signIn);

export default authRouter;
