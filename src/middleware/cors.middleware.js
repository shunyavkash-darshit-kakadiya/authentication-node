import cors from "cors";

const allowedOrigins = [
  "http://localhost:4000",
  "https://470026d33835.ngrok-free.app",
];

const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, origin);
    }
    return callback(new Error("CORS blocked"));
  },
  credentials: true,
});

export default corsMiddleware;
