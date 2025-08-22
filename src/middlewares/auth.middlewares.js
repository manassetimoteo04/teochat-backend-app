import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env.js";
import { User } from "../models/user.model.js";
export const authorize = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    token = cookie.token || token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = { id: user._id };
    req.company = decoded.companyId;
    req.role = decoded.role;

    next();
  } catch (error) {
    next(error);
  }
};
