import jwt from "jsonwebtoken";

export class JwtService {
  constructor(secret) {
    this.secret = secret;
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: "15m" });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: "7d" });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
}
