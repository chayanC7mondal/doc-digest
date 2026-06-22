import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  console.log("Received Stripe webhook");
  console.log("Payload length:", payload.length);
  console.log("Signature present:", !!sig);

  if (!payload || payload.length === 0) {
    console.error("Empty webhook payload received");
    return NextResponse.json(
      { error: "No webhook payload was provided" },
      { status: 400 }
    );
  }

  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);
    console.log("Webhook verified successfully, event type:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session completed");
        const sessionId = event.data.object.id;

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted({ session, stripe });

        break;

      case "customer.subscription.deleted":
        console.log("Checkout subscription deleted");

        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });
        console.log(subscription);

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook verification failed", details: err },
      { status: 400 },
    );
  }

  return NextResponse.json({
    status: "success",
  });
};
