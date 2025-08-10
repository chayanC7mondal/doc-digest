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
