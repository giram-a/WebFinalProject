import express from "express";
import { createUser } from "../services/user/create.user.js";
import { udpateUser } from "../services/user/update.user.js";
import { findUser } from "../services/user/find.user.js";

const router = express.Router();

router.post("/create", createUser);
router.put("/update", udpateUser);
router.get("/find", findUser);
export default router;
