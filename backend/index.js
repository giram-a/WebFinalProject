import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { database } from "./database/database.js";
import CompanyRouter from "./routes/Company.router.js";
import jobRoute from "./routes/jobs.route.js";
import AddUserMetaData from "./routes/auth.route.js";
import UserRoute from './routes/user.route.js'
import { clerkMiddleware, verifyToken } from '@clerk/express'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

async function verifySessionToken(token) {
  try {
    const verifiedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    return verifiedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

async function authMiddleware(req, res, next) {
  // add any route in if, to ignore this middleware for that route
  // if (req.path === '/login') {
  //   return next();
  // }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  const verifiedToken = await verifySessionToken(token);

  if (!verifiedToken) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = verifiedToken;
  next();
}

app.use(authMiddleware);

app.use("/company", CompanyRouter);
app.use("/addUserMetadata", AddUserMetaData);
app.use("/job", jobRoute)
app.use("/user", UserRoute)

app.listen(process.env.PORT, () => {
  database.connectToDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});
