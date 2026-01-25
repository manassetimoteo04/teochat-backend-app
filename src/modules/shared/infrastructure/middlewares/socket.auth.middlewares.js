import cookie from "cookie";
import { JwtService } from "../../../auth/infrastructure/jwt.service";
import { JWT_SECRET } from "../../../../configs/env";
import userContainer from "../../../user/infrastructure/container/user-container";
const jwtService = new JwtService(JWT_SECRET);

export async function socketAuthorize(socket, next) {
  try {
    const header = socket.handshake.headers.cookie;

    if (!header) {
      return next(new Error("Cookie não enviado"));
    }

    const cookies = cookie.parse(header);
    console.log("SOCKER HEADER", cookies);
    const token = cookies.token;

    if (!token) {
      return next(new Error("Token ausente no cookie"));
    }

    const decoded = jwtService.verifyToken(token);
    const user = await userContainer.findUserById.execute(decoded);
    console.log(user);
    socket.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    next();
  } catch (err) {
    console.error("SOCKET AUTH ERROR:", err.message);
    next(new Error("Token inválido"));
  }
}
