import { Schema } from "mongoose";
import { appDb } from "../configs/dbConnection.config.js";

const authSchema = Schema(
  {
    fullName: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    googleId: { type: String, default: null },
    twoFactorSecret: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = appDb.model("auth", authSchema, "auth");
export default Auth;
