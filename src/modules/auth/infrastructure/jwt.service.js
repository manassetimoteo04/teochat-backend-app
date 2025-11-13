import jwt from "jsonwebtoken";

export class JwtService {
  constructor(secret, expiresIn) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateAccessToken(payload) {
    console.log(payload);
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
}
