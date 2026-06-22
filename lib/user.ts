import { PricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getuserUploadCount } from "./summaries";

export async function getPriceIdforActiveUser(email: string) {
  const sql = await getDbConnection();

  const query =
    await sql` SELECT price_id FROM users where email= ${email} AND status= 'active'`;
  return query?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getuserUploadCount(userId);

  const priceId = await getPriceIdforActiveUser(userId);

  const ispro =
    PricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";

  const uploadLimit: number = ispro ? 1000 : 5;

  return { hasReachedUploadLimit: uploadCount >= uploadLimit, uploadLimit };
}

export async function syncUserToDatabase({
  email,
  fullName,
  userId,
}: {
  email: string;
  fullName?: string | null;
  userId: string;
}) {
  try {
    const sql = await getDbConnection();
    
    // Check if user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    if (existingUser.length === 0) {
      // Create new user
      await sql`
        INSERT INTO users (email, full_name, customer_id, status)
        VALUES (${email}, ${fullName || null}, ${userId}, 'inactive')
      `;
      console.log("User synced to database:", email);
    } else {
      console.log("User already exists in database:", email);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error syncing user to database:", error);
    return { success: false, error };
  }
}
