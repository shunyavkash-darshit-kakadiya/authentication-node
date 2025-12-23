import Auth from "../../../../models/auth.model.js";
import { generateToken } from "../../../../utils/token.util.js";
import { APP_JWT_SECRET } from "../../../../configs/environment.config.js";
import { setCookie } from "../../../../utils/setCookie.util.js";

const googleLoginController = async (req, res) => {
  try {
    console.log("Google Login Request Body");
  } catch (error) {
    console.error("Error in googleLoginController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default googleLoginController;
