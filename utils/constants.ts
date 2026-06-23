import { isDev } from "./helpers";

export const PricingPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional use",
    price: 9,
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    priceId: isDev 
      ? "price_1Rgsy9QiHVtlu1dtHYkH6MVn" 
      : process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "Markdown Export",
    ],
    priceId: isDev 
      ? "price_1Rgsy9QiHVtlu1dtFRhKBc6w" 
      : process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "",
  },
];
