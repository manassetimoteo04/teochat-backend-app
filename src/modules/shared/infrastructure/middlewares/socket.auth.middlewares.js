import cookie from "cookie";
import { JwtService } from "../../../auth/infrastructure/jwt.service.js";
import { JWT_SECRET } from "../../../../configs/env.js";
import userContainer from "../../../user/infrastructure/container/user-container.js";
const jwtService = new JwtService(JWT_SECRET);

export async function socketAuthorize(socket, next) {
  try {
    const header = socket.handshake.headers.cookie || "";
    const cookies = header ? cookie.parse(header) : {};
    const bearer = socket.handshake.headers.authorization;
    const bearerToken =
      bearer && bearer.startsWith("Bearer ") ? bearer.split(" ")[1] : null;
    const token =
      socket.handshake.auth?.token || socket.handshake.query?.token || cookies.token || bearerToken;

    if (!token) {
      const error = new Error("Token ausente");
      error.data = { code: "UNAUTHORIZED" };
      return next(error);
    }

    const decoded = jwtService.verifyToken(token.replace(/^"|"$/g, "").trim());
    const user = await userContainer.findUserById.execute({ id: decoded.id });
    if (!user) {
      const error = new Error("Usuário inválido");
      error.data = { code: "UNAUTHORIZED" };
      return next(error);
    }

    socket.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    next();
  } catch (err) {
    console.error("SOCKET AUTH ERROR:", err.message);
    const error = new Error("Token inválido");
    error.data = { code: "UNAUTHORIZED" };
    next(error);
  }
}
