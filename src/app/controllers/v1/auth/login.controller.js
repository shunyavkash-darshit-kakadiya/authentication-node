import Auth from "../../../../models/auth.model.js";
import { comparePwd } from "../../../../utils/password.util.js";
import { generateToken } from "../../../../utils/token.util.js";
import { APP_JWT_SECRET } from "../../../../configs/environment.config.js";
import { setCookie } from "../../../../utils/setCookie.util.js";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await comparePwd(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.twoFactorEnabled) {
      return res.status(200).json({
        message: "2FA required",
        success: true,
        data: {
          require2FA: true,
          accountId: user._id,
          twoFactorEnabled: user.twoFactorEnabled,
        },
      });
    }

    //generate token
    const token = generateToken(
      {
        _id: user._id,
        email: user.email,
      },
      APP_JWT_SECRET
    );

    //set cookie
    setCookie(res, "authToken", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        accountId: user._id,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export default loginController;
