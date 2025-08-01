import dotenv from "dotenv";

dotenv.config();

export const { PORT, DB_URI, JWT_SECRET, BASE_URL } = process.env;
