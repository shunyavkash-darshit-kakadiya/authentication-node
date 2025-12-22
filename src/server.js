import express from "express";
import { PORT } from './configs/environment.config.js';

const app = express();
const Port = PORT || 1101;

//start the server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
