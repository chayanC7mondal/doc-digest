import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getDbConnection } from "@/lib/db";
import { syncUserToDatabase } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  try {
    const { sessionId } = await req.json();

    // If sessionId is provided, sync from Stripe session (after payment)
    if (sessionId) {
      console.log("Syncing user for session:", sessionId);

      // Retrieve the Stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });

      console.log("Session retrieved:", session.id);

      const customerId = session.customer as string;
      const customer = await stripe.customers.retrieve(customerId);
      const priceId = session.line_items?.data[0]?.price?.id;

      if ("email" in customer && priceId) {
        const { email, name } = customer;
        const sql = await getDbConnection();

        // Sync user to database
        await syncUserToDatabase({
          email: email as string,
          fullName: name as string,
          userId: customerId,
        });

        // Update user with payment info
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        
        if (user.length > 0) {
          await sql`
            UPDATE users 
            SET customer_id = ${customerId}, 
                price_id = ${priceId}, 
                status = 'active' 
            WHERE email = ${email}
          `;
          console.log("User updated with payment info");

          // Create payment record
          const { amount_total, id, status } = session;
          await sql`
            INSERT INTO payments(amount, status, stripe_payment_id, price_id, user_email)
            VALUES(${amount_total}, ${status}, ${id}, ${priceId}, ${email})
          `;
          console.log("Payment record created");
        }

        // Revalidate paths to update UI
        revalidatePath("/dashboard");
        revalidatePath("/");

        return NextResponse.json({
          success: true,
          message: "User synced successfully",
        });
      }

      return NextResponse.json(
        { error: "Failed to retrieve customer information" },
        { status: 400 }
      );
    }

    // Manual sync from Clerk (no sessionId)
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // Sync user to database
    await syncUserToDatabase({
      email,
      fullName: user.fullName || null,
      userId: user.id,
    });

    // Revalidate paths to update UI
    revalidatePath("/dashboard");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "User synced successfully",
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Failed to sync user", details: error },
      { status: 500 }
    );
  }
};
