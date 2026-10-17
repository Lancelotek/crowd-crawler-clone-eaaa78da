export const playbookCopy = {
  withdrawalConsent: "I want instant access to the PDF and understand that I lose my 14-day right of withdrawal once the download starts. The 30-day money-back guarantee still applies.",
  proof: "46+ CAMPAIGNS · $1.2M+ RAISED · EU & US FOUNDERS",
  title: "STOP LAUNCHING TO STRANGERS.",
  sub: "The MVA Playbook shows you how to build a paying audience before day one - your ICP, the ad angle that sells, and $1-3 pre-payments from people who commit before you launch.",
  cta: "Get the MVA Playbook for $7",
  micro: "Instant PDF download · 30-day money-back guarantee",
  results: ["$332K raised - Woolet", "$207K raised - Chernobylite", "$184K raised - Swimmo"],
  resultsNote: "Every one of them started with an audience that committed before launch.",
  problemTitle: "COLD TRAFFIC IS THE MOST EXPENSIVE WAY TO FIND OUT NOBODY'S WAITING",
  problems: ["You launch on day one with zero buyers in the room", "The platform algorithm buries you after 48 hours of silence", "Your ad spend pays for strangers to say \"not now\"", "Your wishlist and email list never turn into payments"],
  mechanismTitle: "THE MINIMUM VIABLE AUDIENCE",
  mechanismIntro: "Before your campaign goes live, your product already has a community that committed three times:",
  commitments: ["Left an email", "Joined the VIP group", "Pre-paid $1-3 for early access"],
  systemTitle: "THE 3-STEP MVA SYSTEM",
  steps: [
    { title: "Step 1 - Build your ICP", body: "who buys your product or service, what they fear, where they spend time." },
    { title: "Step 2 - Test ad angles", body: "run several angles side by side and keep the ones that sell." },
    { title: "Step 3 - Optimize for sales from day one", body: "run conversion campaigns for real purchases, even at $1. Meta learns from buyers, not browsers." },
  ],
  insideTitle: "WHAT YOU GET IN THE PLAYBOOK",
  inside: ["Why cold-traffic launches lose before they start", "The MVA model: email, VIP group, $1-3 pre-payment", "Step 1: ICP template with examples for hardware, games, SaaS and eCommerce", "Step 2: How to pick 3-5 ad angles and spot the winner", "Step 3: Conversion campaigns at $1 - why a purchase trains the algorithm better than a lead", "The VIP reservation page: how the $1-3 pre-payment works", "Case studies: Woolet, Chernobylite, Swimmo, Gamedec", "The MVA launch-readiness checklist"],
  objectionTitle: '"I DON\'T HAVE AN AUDIENCE YET."',
  objectionBody: "That's exactly the point. MVA is how you build one - before you spend a cent on launch day.",
  categoryTitle: '"DOES THIS WORK IN MY CATEGORY?"',
  categories: [
    { title: "Hardware", body: "pre-orders before tooling." },
    { title: "Games", body: "paying backers, not empty wishlists." },
    { title: "SaaS", body: "paid early access before public launch." },
    { title: "eCommerce", body: "buyers ready before stock lands." },
  ],
  guaranteeTitle: "30-DAY MONEY-BACK GUARANTEE.",
  guaranteeBody: "Read it, use it. Not satisfied within 30 days? Email us and we refund your $7. No questions.",
  faqs: [
    { q: "What exactly do I get?", a: "A PDF playbook delivered instantly by email, plus any add-ons you select." },
    { q: "I'm not a marketer. Can I use this?", a: "Yes. Every step comes with a template you fill in." },
    { q: "Does this work for services, not only products?", a: "Yes. The same 3 steps apply to services and SaaS." },
    { q: "How is this different from a launch agency?", a: "The playbook gives you the system to run yourself. When you want us to run it with you, that's our MVA implementation." },
    { q: "Is there a guarantee?", a: "30 days, full refund, no questions." },
  ],
  thankTitle: "YOUR PLAYBOOK IS ON ITS WAY.",
  thankBody: "Check your inbox in the next few minutes. You just did what the MVA asks your buyers to do - you paid before you got anything. That's the system working.",
  upsellTitle: "WANT US TO BUILD YOUR MVA STRATEGY WITH YOU?",
  upsellBody: "A 1-hour strategic audit of your product or service, then we build your MVA strategy: ICP, the angles to test, and your pre-payment plan. Limited to 8 audits per month. The $147 counts toward an MVA implementation signed within 14 days.",
  upsellCta: "Add the strategic audit - $147",
  decline: "No thanks, I'll start with the playbook",
};

export const PLAYBOOK_PRODUCTS = {
  playbook: { id: "playbook", name: "MVA Playbook (PDF)", price: 7 },
  icp: { id: "icp", name: "ICP Builder Prompts", price: 17, description: "AI prompts that turn your product description into a full ICP: pains, desires, objections, where to find them." },
  angles: { id: "angles", name: "Angle Testing Kit", price: 27, description: "30 ad angles from real campaigns + a test template with decision thresholds." },
  vip: { id: "vip", name: "VIP Reservation Page Template", price: 37, description: "Ready $1-3 reservation page (copy + layout) + 5-email VIP sequence." },
  bundle: { id: "bundle", name: "All three add-ons", price: 47, description: "(instead of $81)" },
  audit: { id: "audit", name: "Strategic audit", price: 147 },
} as const;

export type AddOnId = "icp" | "angles" | "vip" | "bundle";
export type PlaybookItem = { id: string; name: string; price: number };
export const ADD_ON_IDS: AddOnId[] = ["icp", "angles", "vip", "bundle"];
export function toggleAddOn(selected: AddOnId[], id: AddOnId, checked: boolean): AddOnId[] {
  if (!checked) return selected.filter((item) => item !== id);
  if (id === "bundle") return ["bundle"];
  return [...selected.filter((item) => item !== "bundle" && item !== id), id];
}
export const orderItems = (selected: AddOnId[]): PlaybookItem[] => [PLAYBOOK_PRODUCTS.playbook, ...selected.map((id) => PLAYBOOK_PRODUCTS[id])];
export const orderTotal = (items: PlaybookItem[]) => items.reduce((total, item) => total + item.price, 0);
export const checkoutPayLabel = (total: number, hasAddOns: boolean) => `Pay $${total} and get the ${hasAddOns ? "PDFs" : "PDF"}`;
