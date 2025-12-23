import { Schema } from "mongoose";
import { appDb } from "../configs/dbConnection.config.js";

const authSchema = Schema(
  {
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    googleId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Auth = appDb.model("auth", authSchema, "auth");
export default Auth;
