import express from "express";
import acceptPayment from "../services/stripe/accept.payment.js";
import getSessionStatus from "../services/stripe/sessionstatus.payment.js";

const paymentRouter = express.Router();
paymentRouter.post("/create-checkout-session", acceptPayment);
paymentRouter.get("/session-status", getSessionStatus);

export default paymentRouter;
