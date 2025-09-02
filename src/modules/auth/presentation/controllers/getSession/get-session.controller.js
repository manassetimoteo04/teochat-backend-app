import UserMongoRepository from "../../../../user/infrastructure/repositories/user.mongo.repository.js";
import { GetSessionService } from "../../../usecases/getSession/get-session.service.js";

const userRepo = new UserMongoRepository();

const session = new GetSessionService({
  userRepo,
});
export async function getSession(req, res, next) {
  try {
    const user = await session.execute({ userId: req.user.id });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}
