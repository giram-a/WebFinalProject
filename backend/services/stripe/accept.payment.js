// This is your test secret API key.
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

let YOUR_DOMAIN = "http://localhost:5173";

let stripe = Stripe(process.env.STRIPE_SK);

const acceptPayment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1QRI2IIyYZPjikYsAv8xs52S",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${YOUR_DOMAIN}/jobseeker/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
};

export default acceptPayment;
