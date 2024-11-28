import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { database } from "./database/database.js";

dotenv.config();

const app = express();

app.use(express.json());
// app.use(cookieParser());
app.use(cors());

app.listen(process.env.PORT, () => {
  database.connectToDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});
