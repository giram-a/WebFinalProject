
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';

import { useCallback } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const CheckoutForm = () => {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-checkout-session`, {
      method: "POST",
    });
    const data = await res.json();
    return data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
