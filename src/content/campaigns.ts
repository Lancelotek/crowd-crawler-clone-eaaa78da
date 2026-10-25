import caseWoolet from "@/assets/case-woolet.webp";
import caseChernobylite from "@/assets/case-chernobylite.webp";
import caseSwimmo from "@/assets/case-swimmo.webp";
import caseGamedec from "@/assets/case-gamedec.webp";
import caseSherly from "@/assets/case-sherly.webp";
import caseCitywood from "@/assets/case-citywood.webp";
import casePureshape from "@/assets/case-pureshape.webp";
import caseNapospy from "@/assets/case-napospy.webp";

export type Campaign = {
  name: string;
  image: string;
  /** Total raised in USD */
  raised: number;
  category: { en: string; pl: string };
  desc: { en: string; pl: string };
};

/** Client and own campaigns shown on the homepage, largest first. */
export const CAMPAIGNS: Campaign[] = [
  {
    name: "Woolet",
    image: caseWoolet,
    raised: 332694,
    category: { en: "Hardware", pl: "Hardware" },
    desc: { en: "Smart wallet. Strategy, A/B testing and the campaign site.", pl: "Inteligentny portfel. Strategia, testy A/B i strona kampanii." },
  },
  {
    name: "Chernobylite",
    image: caseChernobylite,
    raised: 206671,
    category: { en: "Game", pl: "Gra" },
    desc: { en: "Open-world survival horror with a non-linear story.", pl: "Survival horror z otwartym światem i nieliniową fabułą." },
  },
  {
    name: "Swimmo",
    image: caseSwimmo,
    raised: 184305,
    category: { en: "Hardware", pl: "Hardware" },
    desc: { en: "Swimming smartwatch. Social, paid ads and email, end to end.", pl: "Smartwatch dla pływaków. Social, płatne reklamy i email od A do Z." },
  },
  {
    name: "Gamedec",
    image: caseGamedec,
    raised: 171163,
    category: { en: "Game", pl: "Gra" },
    desc: { en: "Cyberpunk RPG. Funded in 36 hours on Kickstarter.", pl: "Cyberpunkowy RPG. Ufundowany w 36 godzin na Kickstarterze." },
  },
  {
    name: "Sher.ly",
    image: caseSherly,
    raised: 154106,
    category: { en: "Hardware", pl: "Hardware" },
    desc: { en: "Branding, website, crowdfunding and sales optimisation.", pl: "Branding, strona, crowdfunding i optymalizacja sprzedaży." },
  },
  {
    name: "Citywood",
    image: caseCitywood,
    raised: 121279,
    category: { en: "Design", pl: "Design" },
    desc: { en: "Laser-cut 3D wooden city maps.", pl: "Wycinane laserowo drewniane mapy miast 3D." },
  },
  {
    name: "PureShape",
    image: casePureshape,
    raised: 27075,
    category: { en: "Accessory", pl: "Akcesoria" },
    desc: { en: "Mousepad built for the Apple Magic Mouse.", pl: "Podkładka zaprojektowana pod Apple Magic Mouse." },
  },
  {
    name: "NapoSpy",
    image: caseNapospy,
    raised: 7248,
    category: { en: "Hardware", pl: "Hardware" },
    desc: { en: "Leather gloves with tracking and a remote buzzer.", pl: "Skórzane rękawiczki z lokalizatorem i zdalnym brzęczykiem." },
  },
];

export const formatUsd = (n: number, lang: "en" | "pl") =>
  lang === "pl" ? `$${n.toLocaleString("pl-PL").replace(/ /g, " ")}` : `$${n.toLocaleString("en-US")}`;
