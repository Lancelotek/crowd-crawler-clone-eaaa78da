import * as ecommerce from "../content/ecommercePrelaunchCopy";
import * as ecommercePl from "../content/ecommercePrelaunchPLCopy";
import * as saas from "../content/saasPrelaunchCopy";
import * as saasPl from "../content/saasPrelaunchPLCopy";
import { copy as gamefound } from "../content/gamefoundCopy";
import { COPY as founder } from "../content/founderInfluencerCopy";
import { COPY as click2pack } from "../content/click2PackCopy";
import { PAGE_COPY as packagesProse, getPackagesContent } from "../content/packagesCopy";
import { PAGE_COPY as guide } from "../content/prelaunchPlaybookCopy";
import { PAGE_COPY as quiz } from "../content/quizCopy";
import { PAGE_COPY as privacy } from "../content/privacyPolicyCopy";
import { PAGE_COPY as terms } from "../content/termsOfServiceCopy";
import { PAGE_COPY as impressum } from "../content/impressumCopy";

type Lang = "en" | "pl";
type Copy = typeof quiz;
const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const paragraph = (value: string) => `<p>${escape(value)}</p>`;
const prose = (copy: Copy, lang: Lang) => copy.blocks[lang].map(block => {
  const text = block.parts.map(part => "text" in part ? copy.text[part.text] : part.literal).join("");
  return `<${block.tag}>${escape(text)}</${block.tag}>`;
}).join("");

/** Only already-visible content: never include metadata, errors, success states or URLs. */
const dataBody = (value: unknown, key = ""): string => {
  if (/^(seo|meta|og|icon|nav|footer|.*Error|.*Ph$|success|micro|submit|consent|email|invalid|.*Slug|.*Link)/i.test(key)) return "";
  if (typeof value === "string") {
    if (/^(https?:|\/|#)/.test(value)) return "";
    const tag = /^(h2|.*Title|.*Heading|s\dh|brandH|.*h3)$/.test(key) ? "h2" : "p";
    return `<${tag}>${escape(value)}</${tag}>`;
  }
  if (Array.isArray(value)) return value.map(item => dataBody(item)).join("");
  if (value && typeof value === "object") return Object.entries(value).map(([k, v]) => dataBody(v, k)).join("");
  return "";
};

export const sharedPageBody = (slug: string, lang: Lang): string | undefined => {
  let body: string | undefined;
  switch (slug) {
    case "/ecommerce-prelaunch-agency": body = prose(ecommerce.PAGE_COPY, "en") + dataBody({ reasons: ecommerce.reasons, phases: ecommerce.phases, deliverables: ecommerce.deliverables, comparison: ecommerce.comparison, faqs: ecommerce.faqs }); break;
    case "/agencja-prelaunch-ecommerce": body = prose(ecommercePl.PAGE_COPY, "pl") + dataBody({ reasons: ecommercePl.reasons, phases: ecommercePl.phases, deliverables: ecommercePl.deliverables, comparison: ecommercePl.comparison, faqs: ecommercePl.faqs }); break;
    case "/saas-prelaunch-marketing-agency": body = prose(saas.PAGE_COPY, "en") + dataBody({ reasons: saas.reasons, phases: saas.phases, deliverables: saas.deliverables, comparison: saas.comparison, faqs: saas.faqs }); break;
    case "/agencja-prelaunch-saas": body = prose(saasPl.PAGE_COPY, "pl") + dataBody({ reasons: saasPl.reasons, phases: saasPl.phases, deliverables: saasPl.deliverables, comparison: saasPl.comparison, faqs: saasPl.faqs }); break;
    case "/packages": body = prose(packagesProse, lang) + dataBody(getPackagesContent(lang === "pl", `/${lang}`)); break;
    case "/prelaunch-marketing-playbook": body = prose(guide, "en"); break;
    case "/quiz": body = prose(quiz, lang); break;
    case "/privacy-policy": body = prose(privacy, lang); break;
    case "/terms-of-service": body = prose(terms, lang); break;
    case "/impressum": body = prose(impressum, lang); break;
    case "/gamefound": {
      const c = gamefound[lang];
      body = `<h1>${escape(`${c.h1Lead} ${c.h1Accent} ${c.h1Tail}`)}</h1>` + dataBody(c);
      break;
    }
    case "/founder-influencer": body = `<h1>${escape(founder[lang].h1)}</h1>` + dataBody(founder[lang]); break;
    case "/click2pack": body = `<h1>${escape(click2pack[lang].hero.h1)}</h1>` + dataBody(click2pack[lang]); break;
  }
  return body;
};