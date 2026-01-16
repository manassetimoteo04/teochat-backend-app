import http from "http";
import app from "./src/app.js";
import { PORT } from "./src/configs/env.js";
import connectToDatabase from "./src/database/mongodb.js";

const server = http.createServer(app);

server.listen(PORT || 5000, async () => {
  console.log(
    `\x1b[32m%s\x1b[0m`,
    `🚀 Servidor rodando em http://localhost:${PORT}`
  );

  await connectToDatabase();
});
