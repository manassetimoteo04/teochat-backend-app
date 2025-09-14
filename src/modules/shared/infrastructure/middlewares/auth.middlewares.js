import { FindUserByIdService } from "../../../user/usecases/findUser/find-one-user.service.js";
import UserMongoRepository from "../../../user/infrastructure/repositories/user.mongo.repository.js";
import { JWT_SECRET } from "../../../../configs/env.js";
import { JwtService } from "../../../auth/infrastructure/jwt.service.js";
const userRepo = new UserMongoRepository();
const findUser = new FindUserByIdService(userRepo);
const jwtService = new JwtService(JWT_SECRET);
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
    const decoded = jwtService.verifyToken(token);
    const user = await findUser.execute({ id: decoded.id });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = { id: user.id };
    next();
  } catch (error) {
    next(error);
  }
};
