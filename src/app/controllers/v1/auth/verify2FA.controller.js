import speakeasy from "speakeasy";
import Auth from "../../../../models/auth.model.js";
import { generateToken } from "../../../../utils/token.util.js";
import { APP_JWT_SECRET } from "../../../../configs/environment.config.js";
import { setCookie } from "../../../../utils/setCookie.util.js";
import { createActiveDevice } from "../../../../services/activeDevices/activeDevice.service.js";

const verify2FA = async (req, res) => {
  try {
    const { otp, deviceInfo } = req.body;
    const { _id } = req.user;

    const account = await Auth.findById(_id).select("+twoFactorSecret");

    const isVerified = speakeasy.totp.verify({
      secret: account.twoFactorSecret,
      encoding: "base32",
      token: otp,
      window: 1,
    });

    if (!isVerified) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    account.twoFactorEnabled = true;
    await account.save();

    //generate auth token
    const authToken = generateToken(
      { _id: account._id, email: account.email },
      APP_JWT_SECRET,
      "15d"
    );

    //set cookie
    setCookie(res, "authToken", authToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    // Save active session info for provide force logout for particular device
    if (deviceInfo) {
      await createActiveDevice({
        AuthId: account._id,
        ...deviceInfo,
      });
    }

    return res
      .status(200)
      .json({ message: "2FA enabled successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export default verify2FA;
