import speakeasy from "speakeasy";
import qrcode from "qrcode";
import Auth from "../../../../models/auth.model.js";
import { verifyToken } from "../../../../utils/token.util.js";
import { APP_JWT_SECRET } from "../../../../configs/environment.config.js";

const generate2FA = async (req, res) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token, APP_JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    // console.log("decoded====>", decoded);

    const { _id, email } = decoded;

    const secret = speakeasy.generateSecret({
      name: `Auth System (${email})`,
    });

    const otpauthUrl = `otpauth://totp/Auth%20System:%20(${email})?secret=${secret.base32}`;

    const qrCode = await qrcode.toDataURL(otpauthUrl);

    await Auth.findByIdAndUpdate(_id, {
      twoFactorSecret: secret.base32,
    });

    return res.status(200).json({
      success: true,
      message: "2FA secret generated",
      data: {
        secret: secret.base32,
        qrCode,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default generate2FA;
