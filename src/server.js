import express from "express";
import { PORT } from "./configs/environment.config.js";
import { appDb } from "./configs/dbConnection.config.js";

const app = express();
const Port = PORT || 1101;

//404 Route Handler
app.use((req, res) => {
  res.status(404).send(`404 - Route Not Found ==> ${req.originalUrl}`);
});

//start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
