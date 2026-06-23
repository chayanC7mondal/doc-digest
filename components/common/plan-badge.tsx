import { getPriceIdforActiveUser } from "@/lib/user";
import { PricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PlanBadge() {
  const user = await currentUser();

  if (!user?.id) return null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await getPriceIdforActiveUser(email);
    console.log("PlanBadge - Email:", email);
    console.log("PlanBadge - PriceId from DB:", priceId);
  }

  let planName = "Buy a Plan";

  const plan = PricingPlans.find((plan) => plan.priceId === priceId);

  console.log("PlanBadge - Available plans:", PricingPlans.map(p => ({ id: p.id, priceId: p.priceId })));
  console.log("PlanBadge - Matched plan:", plan);

  if (plan) {
    planName = plan.name;
  }

  console.log("PlanBadge - Final plan name:", planName);

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        !priceId && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
}
