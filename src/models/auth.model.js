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
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = appDb.model("Auth", authSchema, "auth");
export default Auth;
