import Auth from "../../../../models/auth.model.js";
import { generateToken } from "../../../../utils/token.util.js";
import { APP_JWT_SECRET } from "../../../../configs/environment.config.js";
import { setCookie } from "../../../../utils/setCookie.util.js";

const googleLoginController = async (req, res) => {
  try {
    const { name, email, googleId } = req.body;
    let user = await Auth.findOne({ email });

    if (!user) {
      user = new Auth({
        fullName: name,
        email,
        googleId,
      });
      await user.save();
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
    setCookie(res, "authToken", token);

    res.status(200).json({ message: "Google Login successful", success: true });
  } catch (error) {
    console.error("Error in googleLoginController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default googleLoginController;
