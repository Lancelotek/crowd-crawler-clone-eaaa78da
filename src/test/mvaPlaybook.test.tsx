import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { checkoutPayLabel, ADD_ON_IDS, orderItems, orderTotal, toggleAddOn } from "@/content/mvaPlaybook";
import PlaybookCheckout from "@/components/playbook/PlaybookCheckout";
import { getRouteMeta } from "@/seo/routeMeta";
import { toPrerenderRoute } from "@/seo/prerenderRoutes";
import { startCheckout, getConfirmedPlaybookOrder, trackConfirmedPlaybookPurchase } from "@/lib/playbookCheckout";

vi.mock("sonner", () => ({ toast: vi.fn() }));
beforeEach(() => { cleanup(); window.dataLayer = []; sessionStorage.clear(); localStorage.setItem("cookie-consent", "accepted"); });

describe("MVA Playbook orders", () => {
  it("has exact base and add-on totals", () => {
    expect(orderTotal(orderItems([]))).toBe(7);
    expect(ADD_ON_IDS.map((id) => orderTotal(orderItems([id])))).toEqual([24, 34, 44, 54]);
    expect(orderTotal(orderItems(["icp", "angles", "vip"]))).toBe(88);
  });
  it("makes bundle and individual selections mutually exclusive", () => {
    expect(toggleAddOn(["icp", "angles"], "bundle", true)).toEqual(["bundle"]);
    expect(toggleAddOn(["bundle"], "vip", true)).toEqual(["vip"]);
    expect(toggleAddOn(["icp"], "icp", false)).toEqual([]);
  });
  it("updates the visible total and selections", () => {
    render(<MemoryRouter><PlaybookCheckout /></MemoryRouter>);
    fireEvent.click(screen.getByRole("checkbox", { name: "ICP Builder Prompts" }));
    expect(screen.getByLabelText("Order total").textContent).toBe("$24");
    fireEvent.click(screen.getByRole("checkbox", { name: "All three add-ons" }));
    expect(screen.getByLabelText("Order total").textContent).toBe("$54");
    expect(screen.getByRole("checkbox", { name: "ICP Builder Prompts" })).toHaveAttribute("data-state", "unchecked");
  });
  it("requires unticked instant-access acknowledgement before checkout", () => {
    render(<MemoryRouter><PlaybookCheckout /></MemoryRouter>);
    const pay = screen.getByRole("button", { name: checkoutPayLabel(7, false) });
    const acknowledgement = screen.getByRole("checkbox", { name: "Instant PDF access acknowledgement" });
    expect(acknowledgement).toHaveAttribute("data-state", "unchecked");
    expect(pay).toBeDisabled();
    fireEvent.click(pay);
    expect(window.dataLayer).toHaveLength(0);
    fireEvent.click(acknowledgement);
    expect(pay).toBeEnabled();
    fireEvent.click(acknowledgement);
    expect(pay).toBeDisabled();
  });
  it("computes payable amounts for PDF and PDF add-ons", () => {
    expect(checkoutPayLabel(orderTotal(orderItems([])), false)).toBe("Pay $7 and get the PDF");
    expect(checkoutPayLabel(orderTotal(orderItems(["bundle"])), true)).toBe("Pay $54 and get the PDFs");
  });
  it("tracks checkout but never invents a paid order", async () => {
    await startCheckout(orderItems(["bundle"]));
    expect(window.dataLayer[0]).toMatchObject({ event: "begin_checkout", value: 54, currency: "USD" });
    expect(await getConfirmedPlaybookOrder()).toBeNull();
    expect(window.dataLayer.some((event) => event.event === "purchase")).toBe(false);
  });
  it("emits a confirmed purchase only once", () => {
    const order = { transactionId: "verified-test-order", total: 34, items: orderItems(["angles"]) };
    trackConfirmedPlaybookPurchase(order);
    trackConfirmedPlaybookPurchase(order);
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toMatchObject({ event: "purchase", value: 34, currency: "USD", transaction_id: "verified-test-order" });
  });
});

describe("standalone page prerendering", () => {
  it.each(["/en/mva-playbook", "/en/mva-playbook/thank-you"])("keeps %s standalone", (path) => {
    const meta = getRouteMeta(path);
    expect(meta).toBeDefined();
    if (!meta) return;
    const route = toPrerenderRoute(meta);
    const doc = new DOMParser().parseFromString(route.body, "text/html");
    expect(doc.querySelectorAll("h1")).toHaveLength(1);
    expect(doc.querySelectorAll("nav, footer")).toHaveLength(0);
    expect(route.canonical).toBe(`https://jay23.com${path}`);
    expect(route.title.length).toBeLessThanOrEqual(60);
    expect(route.description.length).toBeLessThanOrEqual(158);
    expect(route.robots).toBe(path.endsWith("thank-you") ? "noindex,follow" : undefined);
    expect(route.alternates).toBeUndefined();
  });
});