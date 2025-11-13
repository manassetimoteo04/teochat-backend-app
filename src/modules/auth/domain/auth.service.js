import bcrypt from "bcrypt";

export class AuthService {
  async comparePasswords(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}
