import { verifyToken } from "../utils/token.util.js";
import { APP_JWT_SECRET } from "../configs/environment.config.js";
import { getActiveDevice } from "../services/activeDevices/activeDevice.service.js";
import Auth from "../models/auth.model.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const AuthMiddleware = async (req, res, next) => {
  try {
    /* Token */
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        data: { forceLogout: true },
      });
    }

    /* Verify JWT */
    let decoded;
    try {
      decoded = verifyToken(token, APP_JWT_SECRET);
    } catch {
      res.clearCookie("authToken", cookieOptions);
      return res.status(401).json({
        success: false,
        message: "Session expired",
        data: { forceLogout: true },
      });
    }

    /* STRICT device validation */
    const visitorId = req.headers["x-visitor-id"];

    if (visitorId) {
      const activeDevice = await getActiveDevice(decoded._id, visitorId);

      if (!activeDevice) {
        const user = await Auth.findById(decoded._id);
        if (user.twoFactorEnabled) {
          res.clearCookie("authToken", cookieOptions);
          return res.status(401).json({
            success: false,
            message: "You have been logged out from another device",
            data: { forceLogout: true },
          });
        }
      }
    }

    /* Attach user */
    req.user = {
      _id: decoded._id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("AuthMiddleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      data: { forceLogout: true },
    });
  }
};

export default AuthMiddleware;