import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { database } from "./database/database.js";
import CompanyRouter from "./routes/Company.router.js";
import AddUserRoute from "./routes/auth.route.js";
import { clerkMiddleware } from "@clerk/express";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
// app.use(clerkMiddleware());
app.use("/company", CompanyRouter);
app.use("/addUser", AddUserRoute);

app.listen(process.env.PORT, () => {
  database.connectToDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});
