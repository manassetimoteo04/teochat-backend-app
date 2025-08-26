import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import Services from "./services.js";
import Company from "../models/company.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env.js";

class AuthServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async signUp() {
    const { password, email, name, avatar } = this.req.body;
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
    const code = await this.generateVerification();

    const confirmCode = code;
    const confirmExpiresIn = Date.now() + 10 * 60 * 1000;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create([
      { name, email, password: hashed, confirmCode, confirmExpiresIn, avatar },
    ]);
    const token = this.generateTokens({
      user: user[0]._id,
    });
    return { user, token, confirmCode };
  }

  async signIn() {
    const { password, email } = this.req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Email ou palavra-passe errada");
      error.statusCode = 404;
      throw error;
    }
    const isPassordValid = await bcrypt.compare(password, user.password);
    if (!isPassordValid) {
      const error = new Error("Email ou palavra-passe errada");
      error.statusCode = 401;
      throw error;
    }

    user.password = undefined;
    const token = this.generateTokens({
      user: user._id,
    });
    return { token, user };
  }

  async verifyAccount({ code, user: id }) {
    const user = await User.findById(id);
    if (user.confirmCode !== code) {
      const error = new Error(
        "Código inválido por favor, verifique o código no email ou solicite outro"
      );
      error.statusCode = 401;
      throw error;
    }
    const codeExpired = new Date(user.confirmExpiresIn) < new Date();
    if (codeExpired) {
      const error = new Error("Código expirado por favor, solicite outro");
      error.statusCode = 401;
      throw error;
    }

    user.isConfirmed = true;
    user.confirmCode = undefined;
    user.confirmExpiresIn = undefined;
    await user.save();
    return { user };
  }
  async resendVerificationCode({ user: id }) {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error("Nenhum usuário encontrado com este ID");
      error.statusCode = 404;
      throw error;
    }
    const code = await this.generateVerification();
    const confirmExpiresIn = Date.now() + 10 * 60 * 1000;
    user.confirmCode = code;
    user.confirmExpiresIn = confirmExpiresIn;
    await user.save();
    return { user, code };
  }
  async selectCompany({ companyId }) {
    const user = await User.findById(this.req.user.id).select(
      "-password -isConfirmed"
    );
    if (!user) {
      const error = new Error("Email ou palavra-passe errada");
      error.statusCode = 404;
      throw error;
    }
    const company = await Company.findById(companyId);
    const isMember = company.members.some((id) => this.req.user.id.equals(id));

    if (!isMember) {
      const error = new Error(
        "Não podes seleciona esta empresa, não és membro"
      );
      error.statusCode = 401;
      throw error;
    }
    const role = user?.companies
      .filter((com) => com.companyId === companyId)
      .at(0)?.role;
    const token = this.generateTokens({
      user: user._id,
      companyId,
      role,
    });

    return { token, user };
  }
  async getSession({ token, userId }) {
    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user).select(
      "-password -isConfirmed"
    );

    const company = await Company.findById(decoded?.companyId);
    if (!user) {
      const error = new Error("Usuário desta sessão não foi encontrado");
      error.statusCode = 404;
      throw error;
    }
    const isMember = company?.members?.some((id) => id.equals(userId));
    if (company && !isMember) {
      const error = new Error(
        "Não podes seleciona esta empresa, não és membro"
      );
      error.statusCode = 401;
      throw error;
    }
    const role = user?.companies
      ?.filter((com) => com?.companyId === decoded?.companyId)
      .at(0)?.role;
    user.companies = undefined;
    if (company) company.members = undefined;

    return {
      user,
      company: company ? company : undefined,
      role: role ? role : undefined,
    };
  }
}

export default AuthServices;
