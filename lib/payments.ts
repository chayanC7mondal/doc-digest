import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleCheckoutSessionCompleted({
  session,
}: {
  session: Stripe.Checkout.Session;
}) {
  console.log("Checkout session completed", session);
}

async function createOrUpdateUser({
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const sql = await getDbConnection();
    const email = "";
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length == 0) {
      await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (error) {
    console.log("Error creating or updating user", error);
  }
}
