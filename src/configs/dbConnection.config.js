import mongoose from "mongoose";
import { APP_DB_URI } from "../configs/environment.config.js";

const appDb = mongoose.createConnection(APP_DB_URI);

appDb.on("connected", () => {
  console.log("MongoDB connected successfully");
});

export { appDb };
