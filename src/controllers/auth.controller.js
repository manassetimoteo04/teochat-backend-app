import mongoose from "mongoose";
import { JWT_COOKIE_EXPIRES_IN } from "../configs/env.js";
import AuthServices from "../services/auth.services.js";
import sendEmail from "../utils/send.email.js";
import { generateEmailTemplate } from "../utils/helpers/generate.emails.js";
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const auth = new AuthServices(req);
    const { token, user, confirmCode } = await auth.signUp();
    await session.commitTransaction();
    session.endSession();
    const email = {
      to: user[0].email,
      subject: "Verificação da Conta TeoChat",
      html: generateEmailTemplate({
        templateType: "verification",
        companyName: "TeoChat",
        footerNote: "Não compartilhe este código com ninguém",
        userData: { code: confirmCode },
      }),
    };
    sendEmail(email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24,
    });
    res.status(201).json({
      success: true,
      message: "Conta criada com successo",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const auth = new AuthServices(req);

    const { token, user } = await auth.signIn();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24, // 1 dia
    });

    res.status(200).json({
      success: true,
      token,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
