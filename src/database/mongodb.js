import mongoose from "mongoose";
import { DB_URI } from "../configs/env.js";

if (!DB_URI) {
  throw new Error(
    `Please define de MONGODB_URI environment variable inside env.<development/production>.local`
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Failed to connect to the database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;
