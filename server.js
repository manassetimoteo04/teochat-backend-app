import app from "./src/app.js";
import http from "http";
import { BASE_URL, PORT } from "./src/configs/env.js";
import connectToDatabase from "./src/database/mongodb.js";
const server = http.createServer(app);
server.listen(PORT, async () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
  await connectToDatabase();
});
