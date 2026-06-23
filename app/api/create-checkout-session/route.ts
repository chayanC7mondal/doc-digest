import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  try {
    console.log("Creating checkout session...");
    
    const { priceId } = await req.json();

    console.log("Price ID received:", priceId);

    if (!priceId) {
      console.error("Price ID is missing");
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    console.log("Stripe secret key present:", !!process.env.STRIPE_SECRET_KEY);
    console.log("NODE_ENV:", process.env.NODE_ENV);

    const baseUrl = process.env.NODE_ENV === "development" 
      ? "http://localhost:3000" 
      : process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";

    console.log("Base URL:", baseUrl);
    console.log("Success URL:", `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
    });

    console.log("Checkout session created successfully:", session.id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
};
