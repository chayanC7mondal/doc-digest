import { PricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getuserUploadCount } from "./summaries";

export async function getPriceIdforActiveUser(email: string) {
  const sql = await getDbConnection();

  const query =
    await sql` SELECT price_id FROM users where LOWER(email)= LOWER(${email}) AND status= 'active'`;
  
  // console.log("getPriceIdforActiveUser - Email:", email);
  // console.log("getPriceIdforActiveUser - Query result:", query);
  // console.log("getPriceIdforActiveUser - PriceId:", query?.[0]?.price_id);
  
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
    const normalizedEmail = email.toLowerCase();
    
    // Check if user already exists (case-insensitive)
    const existingUser = await sql`SELECT * FROM users WHERE LOWER(email) = ${normalizedEmail}`;
    
    if (existingUser.length === 0) {
      // Create new user with normalized email
      await sql`
        INSERT INTO users (email, full_name, customer_id, status)
        VALUES (${normalizedEmail}, ${fullName || null}, ${userId}, 'inactive')
      `;
      // console.log("User synced to database:", normalizedEmail);
    } else {
      // console.log("User already exists in database:", normalizedEmail);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error syncing user to database:", error);
    return { success: false, error };
  }
}
