import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../configs/env.js";

class Services {
  restrictedActions(roles, role) {
    if (roles.some((r) => r === role)) return;
    else {
      const error = new Error("Não tens permissão para executar está acção");
      error.statusCode = 401;
      throw error;
    }
  }
  generateTokens(data) {
    return jwt.sign(data, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
  async generateVerification() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}

export default Services;
