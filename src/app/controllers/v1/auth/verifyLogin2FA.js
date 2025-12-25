import Auth from "../../../../models/auth.model.js";
import speakeasy from "speakeasy";
import { generateToken } from "../../../../utils/token.util.js";
import { setCookie } from "../../../../utils/setCookie.util.js";
import { APP_JWT_SECRET } from "../../../../configs/environment.config.js";

const verifyLogin2FA = async (req, res) => {
  try {
    const { otp, accountId } = req.body;

    if (!otp || !accountId) {
      return res.status(400).json({
        message: "2FA OTP and accountId are required",
        success: false,
      });
    }

    let account = await Auth.findById(accountId).select("+twoFactorSecret");
    account = account.toObject();
    delete account.password;

    if (!account) {
      return res
        .status(404)
        .json({ message: "Auth not found", success: false });
    }

    const isVerified = speakeasy.totp.verify({
      secret: account.twoFactorSecret,
      encoding: "base32",
      token: otp.trim(),
      window: 1,
    });

    if (!isVerified) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
    //generate admin token
    const adminToken = generateToken({ id: account._id }, APP_JWT_SECRET);

    //set cookie
    setCookie(res, "adminToken", adminToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "2FA login successful",
      success: true,
      data: account,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export default verifyLogin2FA;
