import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
//TODO: Change to oncified call to stripe implementation:
// import getStripe from '@/app/utils/get-stripejs'; 


const formatAmountForStripe = (amount: number): number => {
  // Because Stripe requires the amount to be in a currency's
  // smallest unit (e.g., cents)
  return Math.round(amount * 100);
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const POST = async (req: NextRequest) => {
  // const stripe = await getStripe();
  const origin = req.headers.get('host');
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'subscribe' as Stripe.Checkout.SessionCreateParams.SubmitType,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro Subscription',
          },
          unit_amount: formatAmountForStripe(10), // In dollars shorthand
          recurring: {
            interval: 'month',
            interval_count: 1
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Failed to generate checkout session. Stripe API key missing" }, { status: 500 })
  }

  try {
    const checkoutSession =
      await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error: any) {
    console.log("Error in checkout session: ", error);
    return NextResponse.json({ error: "Failed to generate checkout session." }, { status: 400 })
  }
};

