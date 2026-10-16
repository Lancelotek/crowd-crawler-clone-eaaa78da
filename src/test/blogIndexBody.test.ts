import { describe, expect, it } from "vitest";
import { blogIndexBody } from "../seo/fallbackBody";

describe("published blog index data", () => {
  it("renders linked titles and excerpts newest first in the supplied language", () => {
    const body = blogIndexBody([
      { slug: "older", title: "Older", excerpt: "First excerpt", published_at: "2026-01-01" },
      { slug: "newer", title: "Newer", excerpt: "Second excerpt", published_at: "2026-10-01" },
    ], "pl");
    const doc = new DOMParser().parseFromString(body, "text/html");
    expect([...doc.querySelectorAll("main article a")].map(a => a.getAttribute("href"))).toEqual(["/pl/blog/newer", "/pl/blog/older"]);
    expect([...doc.querySelectorAll("main article p")].map(p => p.textContent)).toEqual(["Second excerpt", "First excerpt"]);
  });
});