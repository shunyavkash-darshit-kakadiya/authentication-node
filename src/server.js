import express from "express";
import cors from "cors";
import { PORT } from "./configs/environment.config.js";
import { appDb } from "./configs/dbConnection.config.js";
import { cookieParser } from "./middleware/cookieParser.middleware.js";
import appRouter from "./app/app.route.js";

const app = express();
app.use(express.json());

// const corsOptions = {
//   origin: ["http://localhost:4000", "http://192.168.29.95:4000"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

const allowedOrigins = [
  "http://localhost:4000",
  "http://192.168.1.3:4000",  
  "https://eff5b936af65.ngrok-free.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(new Error("CORS blocked"));
    },
    credentials: true,
  })
);

app.use(cookieParser);

//routes define
app.use(appRouter);

//404 Route Handler
app.use((req, res) => {
  res.status(404).send(`404 - Route Not Found ==> ${req.originalUrl}`);
});

//start the server
app.listen(PORT || 1101, () => {
  console.log(`Server is running on port ${PORT || 1101}`);
});
