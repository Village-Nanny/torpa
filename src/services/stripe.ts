import { loadStripe, Stripe } from '@stripe/stripe-js';
import config from '../lib/config';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(config.stripe.publishableKey);
  }
  return stripePromise;
};

export { getStripe };
