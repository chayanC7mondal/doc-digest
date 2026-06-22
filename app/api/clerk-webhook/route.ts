import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { syncUserToDatabase } from "@/lib/user";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.text();
    const sig = req.headers.get("clerk-signature");

    // Verify webhook signature
    // Note: You should verify the signature in production
    // For now, we'll process the event

    const event = JSON.parse(payload);

    console.log("Clerk webhook received:", event.type);

    switch (event.type) {
      case "user.created":
        const { id, email_addresses, first_name, last_name } = event.data;
        const primaryEmail = email_addresses.find((email: any) => email.id === event.data.primary_email_address_id);
        
        if (primaryEmail) {
          const fullName = [first_name, last_name].filter(Boolean).join(" ") || null;
          await syncUserToDatabase({
            email: primaryEmail.email_address,
            fullName,
            userId: id,
          });
          console.log("User synced to database after Clerk signup:", primaryEmail.email_address);
        }
        break;

      case "user.updated":
        // Handle user updates if needed
        console.log("User updated in Clerk:", event.data.id);
        break;

      default:
        console.log(`Unhandled Clerk event type: ${event.type}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error processing Clerk webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed", details: error },
      { status: 400 }
    );
  }
};
