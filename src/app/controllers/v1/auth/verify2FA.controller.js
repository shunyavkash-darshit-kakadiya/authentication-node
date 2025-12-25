import speakeasy from "speakeasy";
import Auth from "../../../../models/auth.model.js";

const verify2FA = async (req, res) => {
  try {
    const { otp } = req.body;
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

    return res
      .status(200)
      .json({ message: "2FA enabled successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export default verify2FA;
