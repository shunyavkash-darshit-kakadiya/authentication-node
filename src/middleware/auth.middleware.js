import { verifyToken } from "../utils/token.util.js";
import { APP_JWT_SECRET } from "../configs/environment.config.js";
import { getActiveDevice } from "../services/activeDevices/activeDevice.service.js";

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    const visitorId = req.headers["x-visitor-id"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: { forceLogout: true },
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token, APP_JWT_SECRET);
      if (!decoded || !decoded._id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid or expired token",
          data: { forceLogout: true },
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        data: { forceLogout: true },
      });
    }

    // Check if device session exists in DB (for force logout feature)
    if (visitorId) {
      const activeDevice = await getActiveDevice(decoded._id, visitorId);
      if (!activeDevice) {
        // Device session deleted = Force logout
        res.clearCookie("authToken", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        return res.status(401).json({
          success: false,
          message:
            "Session expired. You have been logged out from another device.",
          data: { forceLogout: true },
        });
      }
    }

    req.user = { _id: decoded._id, email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
      data: { forceLogout: true },
    });
  }
};

export default AuthMiddleware;
