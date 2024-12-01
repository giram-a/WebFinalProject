import express from "express";
import acceptPayment from "../services/stripe/accept.payment.js";

const paymentRouter = express.Router();
paymentRouter.post("/create-checkout-session", acceptPayment);

export default paymentRouter;
