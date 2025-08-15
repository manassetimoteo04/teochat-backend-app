import http from "http";
import app from "./src/app.js";
import { BASE_URL, PORT } from "./src/configs/env.js";
import connectToDatabase from "./src/database/mongodb.js";
import sendEventReminders from "./src/jobs/sendEventReminders.js";
import agenda from "./src/jobs/index.js";

const server = http.createServer(app);
(async () => {
  sendEventReminders(agenda);
  await agenda.start();
})();
server.listen(PORT, async () => {
  console.log(`Servidor rondando: ${BASE_URL} 🚀`);
  await connectToDatabase();
});
