import { describe, expect, it } from "vitest";
import { MVA_OFFER } from "../content/mvaOffer";
import { getPackagesContent } from "../content/packagesCopy";

describe("Full MVA commercial terms", () => {
  it("includes 90 build days and 30 launch-support days", () => {
    expect(MVA_OFFER.buildDays).toBe(90);
    expect(MVA_OFFER.launchSupportDays).toBe(30);
    expect(MVA_OFFER.months).toBe(4);
  });
  it("bills 1500 USD monthly and 6000 USD total", () => {
    expect(MVA_OFFER.monthlyUsd).toBe(1500);
    expect(MVA_OFFER.totalUsd).toBe(6000);
    expect(MVA_OFFER.monthlyUsd * MVA_OFFER.months).toBe(MVA_OFFER.totalUsd);
  });
  for (const lang of ["en", "pl"] as const) {
    it(`offers the same USD amounts in ${lang} packages`, () => {
      const full = getPackagesContent(lang === "pl", `/${lang}`).packages.find(pkg => pkg.name === "Full MVA");
      expect(Number(full?.priceMonthly?.replace(/[^\d]/g, ""))).toBe(1500);
      expect(Number(full?.priceTotal?.match(/\$([\d,]+)/)?.[1].replace(/,/g, ""))).toBe(6000);
    });
  }
});