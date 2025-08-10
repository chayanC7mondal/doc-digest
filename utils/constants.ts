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
    paymentLink: isDev
      ? "https://buy.stripe.com/test_28E6oJ2Do4Q78dbaojdfG00"
      : "",
    priceId: isDev ? "price_1Rgsy9QiHVtlu1dtHYkH6MVn" : "",
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
    paymentLink: isDev
      ? "https://buy.stripe.com/test_5kQ4gBgue3M39hf9kfdfG01"
      : "",
    priceId: isDev ? "price_1Rgsy9QiHVtlu1dtFRhKBc6w" : "",
  },
];
