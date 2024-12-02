import express from "express";
import { createUser } from "../services/user/create.user.js";
import { udpateUser } from "../services/user/update.user.js";
import { findUser } from "../services/user/find.user.js";
import { getPreSignedUrl } from "../services/user/s3Url.user.js";

const router = express.Router();

router.post("/create", createUser);
router.put("/update", udpateUser);
router.get("/find", findUser);
router.get("/s3-presigned-url", getPreSignedUrl)
export default router;
