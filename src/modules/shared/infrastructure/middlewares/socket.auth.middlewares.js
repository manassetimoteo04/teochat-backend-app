import cookie from "cookie";
import { JwtService } from "../../../auth/infrastructure/jwt.service";
import { JWT_SECRET } from "../../../../configs/env";
import userContainer from "../../../user/infrastructure/container/user-container";
const jwtService = new JwtService(JWT_SECRET);

export async function socketAuthorize(socket, next) {
  try {
    let token = socket.handshake.auth?.token;

    if (!token && socket.handshake.headers.cookie) {
      const cookies = cookie.parse(socket.handshake.headers.cookie);
      token = cookies.token || cookies.access_token;
    }
    if (!token) {
      return next(new Error("Token não encontrado"));
    }
    token = token.replace(/^"|"$/g, "").trim();

    const decoded = jwtService.verifyToken(token);
    const user = await userContainer.findUserById.execute(decoded);
    console.log(user);
    socket.user = {
      name: user.name,
      email: user.email,
      id: user.id,
      avatar: user.avatar,
    };
    next();
  } catch (err) {
    console.error("ERROR SOCKET AUTH:", err.message);
    next(new Error("Token inválido"));
  }
}
