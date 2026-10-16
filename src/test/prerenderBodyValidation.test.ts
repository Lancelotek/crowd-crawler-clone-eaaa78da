import { describe, expect, it } from "vitest";
import { assertSitemapBodyWords, mainWordCount } from "../seo/bodyValidation";

const route = (words: number) => ({ path: "/en/example", body: `<nav>${"outside ".repeat(500)}</nav><main>${"word ".repeat(words)}</main><footer>outside</footer>` });
describe("250-word sitemap main-content rule", () => {
  it("rejects 249 words and identifies the offending route", () => {
    expect(() => assertSitemapBodyWords([route(249)], new Set(["/en/example"]))).toThrow("/en/example: 249/250");
  });
  it("accepts exactly 250 words", () => {
    expect(() => assertSitemapBodyWords([route(250)], new Set(["/en/example"]))).not.toThrow();
  });
  it("counts only main content, excluding scripts and navigation", () => {
    expect(mainWordCount('<nav>one two</nav><main>real &amp; content<script>hidden code</script></main><footer>three</footer>')).toBe(3);
  });
  it("excludes noindex and non-sitemap routes", () => {
    expect(() => assertSitemapBodyWords([{ ...route(1), robots: "noindex,follow" }, { ...route(1), path: "/outside" }], new Set(["/en/example"]))).not.toThrow();
  });
});