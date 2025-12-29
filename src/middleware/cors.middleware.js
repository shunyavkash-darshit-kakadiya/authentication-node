import cors from 'cors';

const allowedOrigins = [
    "http://localhost:4000",
    "http://192.168.1.3:4000",
    "https://eff5b936af65.ngrok-free.app",
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