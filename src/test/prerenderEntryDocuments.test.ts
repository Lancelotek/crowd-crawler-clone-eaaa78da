import { describe, expect, it } from "vitest";
import { renderEntryDocuments, getPrerenderRoute, renderPrerenderedHtml } from "../seo/prerenderRoutes";

const shell = '<!doctype html><html lang="en"><head><title>Template</title></head><body><div id="root"></div><script src="/app.js"></script></body></html>';

describe("production entry documents", () => {
  it("writes an indexable EN homepage to dist/index.html with the EN canonical", () => {
    const output = renderEntryDocuments(shell);
    const root = new DOMParser().parseFromString(output["index.html"], "text/html");
    expect(root.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "").not.toContain("noindex");
    expect(root.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://jay23.com/en");
  });

  it("keeps dist/404.html noindex,nofollow", () => {
    const output = renderEntryDocuments(shell);
    const doc = new DOMParser().parseFromString(output["404.html"], "text/html");
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex,nofollow");
  });

  it("adds an instant root redirect and preserves the EN homepage body and alternates", () => {
    const home = getPrerenderRoute("/en");
    if (!home) throw new Error("Missing EN homepage");
    const root = new DOMParser().parseFromString(renderEntryDocuments(shell)["index.html"], "text/html");
    const en = new DOMParser().parseFromString(renderPrerenderedHtml(shell, home), "text/html");
    expect(root.querySelector('meta[http-equiv="refresh"]')).toBeNull();
    const redirect = [...root.querySelectorAll("head script")].map(s => s.textContent ?? "").find(s => s.includes("location.replace"));
    expect(redirect).toContain('location.pathname!=="/"');
    expect(redirect).toContain('"pl"');
    expect(root.body.innerHTML).toBe(en.body.innerHTML);
    const alternates = [...root.querySelectorAll('link[hreflang]')].map(el => [el.getAttribute("hreflang"), el.getAttribute("href")]);
    expect(alternates).toEqual([
      ["en", "https://jay23.com/en"],
      ["pl", "https://jay23.com/pl"],
      ["x-default", "https://jay23.com/en"],
    ]);
  });
});