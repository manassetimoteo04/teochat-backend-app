import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import Services from "./services.js";

class AuthServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async signUp() {
    const { password, email, name } = this.req.body;
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
    const user = await User.create([{ name, email, password: hashed }]);
    const token = this.generateTokens({
      user: user[0]._id,
      company: "688ce99dd0cf6dbdcf8c9030",
    });
    return { user, token };
  }

  async signIn() {
    const { password, email } = this.req.body;

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

    const token = this.generateTokens({
      user: user._id,
      company: "688ce99dd0cf6dbdcf8c9030",
    });
    return { token, user };
  }
}

export default AuthServices;
