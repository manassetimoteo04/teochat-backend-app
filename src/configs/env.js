import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  DB_URI,
  JWT_SECRET,
  BASE_URL,
  JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
} = process.env;
