export const MVA_OFFER = {
  months: 4,
  buildDays: 90,
  launchSupportDays: 30,
  monthlyUsd: 1500,
  totalUsd: 6000,
  monthlyPln: 6000,
  totalPln: 24000,
} as const;

export const mvaOfferCopy = {
  en: {
    duration: "4 months: 90 days of build + 30 days of launch support",
    billing: "$1,500/month · $6,000 total · VAT for EU clients",
    monthlyPrice: "$1,500",
    totalPrice: "$6,000 total · VAT for EU clients",
    investmentAmount: "$1,500/month",
    investmentNote: "($6,000 total over 4 months · VAT for EU clients)",
  },
  pl: {
    duration: "4 miesiące: 90 dni budowy + 30 dni wsparcia startu",
    billing: "6 000 PLN netto/mies. · 24 000 PLN netto łącznie · + VAT",
    monthlyPrice: "6 000 PLN netto",
    totalPrice: "24 000 PLN netto łącznie · + VAT",
    investmentAmount: "6 000 PLN / mies.",
    investmentNote: "(24 000 PLN netto łącznie za 4 miesiące)",
  },
};