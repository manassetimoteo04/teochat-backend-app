import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../configs/env.js";

export default function (data) {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}
