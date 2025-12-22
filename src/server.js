import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1101;

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
