import Stripe from "stripe";
import { configDotenv } from "dotenv";

configDotenv();

let stripe = Stripe(process.env.STRIPE_SK);

const getSessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.json({
    status: session.status,
    customer_email: session.customer_details.email,
  });
};

export default getSessionStatus;
