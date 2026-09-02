/**
 * Guards the one invariant that matters: the head a crawler gets from the
 * prerendered HTML and the head a browser ends up with after hydration must be
 * identical. Both are derived from ROUTE_META, and this test proves it.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { ROUTE_META } from "@/seo/routeMeta";
import { buildHeadTags, toPrerenderRoute } from "@/seo/prerenderRoutes";

type Head = {
  title: string;
  description: string;
  canonical: string;
  hreflang: string[];
  robots: string;
};

const prerenderedHead = (path: string): Head => {
  const meta = ROUTE_META.find((m) => m.path === path)!;
  const html = `<html><head>${buildHeadTags(toPrerenderRoute(meta))}</head><body></body></html>`;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return readHead(doc);
};

const readHead = (doc: Document): Head => ({
  title: doc.title,
  description:
    doc.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
  canonical: doc.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
  hreflang: [...doc.head.querySelectorAll('link[rel="alternate"][hreflang]')]
    .map((el) => `${el.getAttribute("hreflang")}=${el.getAttribute("href")}`)
    .sort(),
  robots: doc.head.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
});

const runtimeHead = (path: string): Head => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <SEOHead title="ignored" description="ignored" canonical={path} />
    </MemoryRouter>,
  );
  return readHead(document);
};

describe("prerendered head === hydrated head", () => {
  beforeEach(() => {
    cleanup();
    document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
    document.title = "";
  });

  it.each(ROUTE_META.map((m) => m.path))("%s", (path) => {
    const expected = prerenderedHead(path);
    const actual = runtimeHead(path);
    expect(actual.title).toBe(expected.title);
    expect(actual.description).toBe(expected.description);
    expect(actual.canonical).toBe(expected.canonical);
    expect(actual.hreflang).toEqual(expected.hreflang);
    expect(actual.robots).toBe(expected.robots);
  });

  it("keeps every title ≤ 60 and description ≤ 158 chars", () => {
    for (const meta of ROUTE_META) {
      if (meta.homepage) continue; // brand title + sitewide description are intentional
      const head = prerenderedHead(meta.path);
      expect(head.title.length, `${meta.path} title`).toBeLessThanOrEqual(60);
      expect(head.description.length, `${meta.path} description`).toBeLessThanOrEqual(158);
    }
  });
});
