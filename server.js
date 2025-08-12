import app from "./src/app.js";
import { BASE_URL, PORT } from "./src/configs/env.js";
import connectToDatabase from "./src/database/mongodb.js";

app.listen(PORT, async () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
  await connectToDatabase();
});
