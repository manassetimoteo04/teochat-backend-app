import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import generateTokens from "../utils/generateTokens.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { password, email, name, companies } = req.body;

    if (!password || !email || !name) {
      const error = new Error(
        "Por favor providencie todos os campos, nome, email e senha"
      );
      error.statusCode = 400;
      throw error;
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("Já existe uma conta cadastrada com este email.");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create([
      { name, email, password: hashed, companies },
    ]);
    const token = generateTokens({ user: user[0]._id });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "Conta criada com successo",
      data: {
        token,
        user: user[0],
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
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Nenhuma usuário encontrado");
      error.statusCode = 404;
      throw error;
    }
    const isPassordValid = await bcrypt.compare(password, user.password);
    if (!isPassordValid) {
      const error = new Error("Senha incorreta");
      error.statusCode = 401;
      throw error;
    }

    const token = generateTokens({ user: user._id });
    res.status(200).json({
      success: true,
      token,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
