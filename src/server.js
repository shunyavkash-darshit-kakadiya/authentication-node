import express from "express";
import { PORT } from "./configs/environment.config.js";
import { appDb } from "./configs/dbConnection.config.js";
import appRouter from "./app/app.route.js";

const app = express();
app.use(express.json());

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
