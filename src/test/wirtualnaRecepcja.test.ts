import { describe, it, expect } from "vitest";
import { calculator, computeLoss, PACKAGE_COST } from "@/content/wirtualnaRecepcjaPLCopy";

describe("wirtualna recepcja calculator", () => {
  it("Stomatologia default shows 21 600 zł loss and 12× ROI", () => {
    const r = computeLoss(calculator.presets[0].v);
    expect(r.lossText.replace(/\s/g, " ")).toBe("21 600");
    expect(r.roiText).toBe("12×");
  });
  it("ROI is measured against the 1 240 zł package", () => {
    expect(PACKAGE_COST).toBe(1240);
  });
});
