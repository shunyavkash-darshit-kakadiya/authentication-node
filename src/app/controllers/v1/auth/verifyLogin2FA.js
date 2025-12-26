import Auth from "../../../../models/auth.model.js";
import speakeasy from "speakeasy";
import { generateToken } from "../../../../utils/token.util.js";
import { setCookie } from "../../../../utils/setCookie.util.js";
import { APP_JWT_SECRET } from "../../../../configs/environment.config.js";
import { createActiveDevice } from "../../../../services/activeDevices/activeDevice.service.js";

const verifyLogin2FA = async (req, res) => {
  try {
    const { otp, accountId, deviceInfo } = req.body;

    if (!otp || !accountId) {
      return res.status(400).json({
        success: false,
        message: "2FA OTP and accountId are required",
      });
    }

    let account = await Auth.findById(accountId).select("+twoFactorSecret");
    account = account.toObject();
    delete account.password;

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Auth not found",
      });
    }

    const isVerified = speakeasy.totp.verify({
      secret: account.twoFactorSecret,
      encoding: "base32",
      token: otp.trim(),
      window: 1,
    });

    if (!isVerified) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

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

    return res.status(200).json({
      success: true,
      message: "2FA login success",
      data: {
        user: account,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default verifyLogin2FA;
