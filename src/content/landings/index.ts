/**
 * Registry of every SEO service landing, keyed by its canonical path.
 *
 * One copy of the copy: the React template renders it, routeMeta derives the
 * head metadata from it, and the build-time prerenderer derives the no-JS body
 * fallback from it.
 */
import type { SeoLandingContent } from "./types";
import kickstarterAgency from "./kickstarter-agency";
import kickstarterMarketingAgency from "./kickstarter-marketing-agency";
import crowdfundingAgency from "./crowdfunding-agency";
import productLaunchAgency from "./product-launch-agency";
import launchboomAlternative from "./launchboom-alternative";
import jellopAlternative from "./jellop-alternative";
import agency2Alternative from "./agency2-alternative";
import tiktokShopAgency from "./tiktok-shop-agency";
import tiktokShopAgencyPl from "./tiktok-shop-agency-pl";

export const LANDINGS: SeoLandingContent[] = [
  kickstarterAgency,
  kickstarterMarketingAgency,
  crowdfundingAgency,
  productLaunchAgency,
  launchboomAlternative,
  jellopAlternative,
  agency2Alternative,
  tiktokShopAgency,
  tiktokShopAgencyPl,
];

export const LANDING_CONTENT: Record<string, SeoLandingContent> = Object.fromEntries(
  LANDINGS.map((c) => [c.canonical, c]),
);

export type { SeoLandingContent };
