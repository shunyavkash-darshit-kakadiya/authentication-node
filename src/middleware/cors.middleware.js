import cors from "cors";

const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (
      origin.startsWith("http://localhost") ||
      origin.startsWith("http://192.168.") ||
      origin.endsWith(".ngrok-free.app")
    ) {
      return callback(null, origin);
    }

    return callback(new Error("CORS blocked"));
  },
  credentials: true,
});

export default corsMiddleware;
