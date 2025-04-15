import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { headers } from 'next/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * This handler processes Stripe webhook events to update subscription statuses
 * in your database when a payment succeeds, fails, or a subscription is updated.
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-03-31.basil', // Latest API version
    });

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: unknown) {
    console.error(`Webhook signature verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        // Payment is successful and the subscription is created
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', checkoutSession.id);
        
        // TODO: Implement your database logic here
        // await updateSubscriptionStatus(checkoutSession.customer as string, 'active');
        break;

      case 'invoice.payment_succeeded':
        // Continue to provision the subscription as payments succeed
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment succeeded:', invoice.id);
        
        // TODO: Implement your database logic here
        // await updateSubscriptionInvoiceStatus(invoice.subscription as string, 'paid');
        break;

      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', failedInvoice.id);
        
        // TODO: Implement your database logic here
        // await updateSubscriptionInvoiceStatus(failedInvoice.subscription as string, 'failed');
        break;

      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);
        
        // TODO: Implement your database logic here
        // await updateSubscriptionData(subscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', deletedSubscription.id);
        
        // TODO: Implement your database logic here
        // await cancelSubscription(deletedSubscription.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(`Error processing webhook: ${error}`);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 