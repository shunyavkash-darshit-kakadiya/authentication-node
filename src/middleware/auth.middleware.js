import { verifyToken } from '../utils/token.util.js';
import { APP_JWT_SECRET } from '../configs/environment.config.js';
import Auth from '../models/auth.model.js';

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized', data: { logout: true } });
    }

    let decoded;
    try {
      decoded = verifyToken(token, APP_JWT_SECRET);
      if (!decoded || !decoded._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token' });
      }
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    req.user = { _id: decoded._id, email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message, data: { logout: true } });
  }
};

export default AuthMiddleware;