import express from "express";

import sendMail from "../services/email/send.mail.js";

const router = express.Router();

router.post("/send", sendMail);

export default router;
