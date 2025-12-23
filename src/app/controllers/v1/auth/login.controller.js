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

    //generate token
    const token = generateToken(
      {
        id: user._id,
      },
      APP_JWT_SECRET
    );

    //set cookie
    setCookie(res, "authToken", token);

    res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Internal Server Error" , success: false });
  }
};

export default loginController;
