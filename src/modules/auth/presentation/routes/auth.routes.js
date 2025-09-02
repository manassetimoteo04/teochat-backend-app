import { Router } from "express";
import { signInUser } from "../controllers/signIn/sign-in.controller.js";
import { signUpUser } from "../controllers/signUp/sign-up.controller.js";
import { confirmUserAccount } from "../controllers/confirmAccount/confirm-account.controller.js";
import { authorize } from "../../../shared/infrastructure/middlewares/auth.middlewares.js";
import { requestConfirmCode } from "../controllers/requestConfirmCode/request-confirm-code.controller.js";
import { getSession } from "../controllers/getSession/get-session.controller.js";

const authRouter = Router();

authRouter.post("/sign-in", signInUser);
authRouter.post("/sign-up", signUpUser);
authRouter.post("/verify-account", authorize, confirmUserAccount);
authRouter.post("/verify-account/resend-code", authorize, requestConfirmCode);
authRouter.get("/session", authorize, getSession);
export default authRouter;
