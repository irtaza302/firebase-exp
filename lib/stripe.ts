import { Stripe } from 'stripe';

/**
 * Initialize and return a Stripe instance
 */
export function getStripeInstance(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('Stripe secret key is not defined in environment variables');
  }
  
  return new Stripe(secretKey, {
    apiVersion: '2025-03-31.basil', // Latest API version
  });
}

/**
 * Create a Stripe checkout session for subscription
 */
export async function createCheckoutSession({
  priceId,
  customerId,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripeInstance();
  
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  };
  
  // If customerId exists, add it to the params
  if (customerId) {
    params.customer = customerId;
  }
  
  return stripe.checkout.sessions.create(params);
}

/**
 * Create a Stripe billing portal session
 */
export async function createBillingPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  const stripe = getStripeInstance();
  
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
} 