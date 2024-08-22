import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const formatAmountForStripe = (amount: number): number => {
  // Because Stripe requires the amount to be in a currency's
  // smallest unit (e.g., cents)
  return Math.round(amount * 100);
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const POST = async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  if (!origin) {
    return NextResponse.json(
      { error: "Failed to generate checkout session. Origin header missing" },
      { status: 400 }
    )
  }

  const { endPoint } = await req.json();

  let amount: number;
  let productName: string;

  switch (endPoint) {
    case 'basic':
      amount = 5;
      productName = 'Basic Subscription';
      break;
    case 'pro':
      amount = 10;
      productName = 'Pro Subscription';
      break;
    default:
      return NextResponse.json(
        { error: "Invalid subscription type" },
        { status: 400 }
      );
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
          },
          unit_amount: formatAmountForStripe(amount),
          recurring: {
            interval: 'month',
            interval_count: 1
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}`,
  };
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Failed to generate checkout session. Stripe API key missing" },
      { status: 500 }
    )
  }

  try {
    const checkoutSession =
      await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error: any) {
    console.log("Error in checkout session: ", error);
    return NextResponse.json(
      { error: "Failed to generate checkout session." },
      { status: 400 }
    )
  }
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get('session_id');

  try {
    if (!session_id) {
      throw new Error('Session ID is required');
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession);
  } catch (error: any) {
    console.error('Error retrieving checkout sesison: ', error);
    return NextResponse.json(
      {error: {message: error.message } }, 
      { status: 500 });
  };
};
