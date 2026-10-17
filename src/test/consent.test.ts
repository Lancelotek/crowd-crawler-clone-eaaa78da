// @vitest-environment node
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { describe, expect, it } from "vitest";

const source = readFileSync("index.html", "utf8").match(/<script>([\s\S]*?)<\/script>/)?.[1];
function runConsent(initial: string | null) {
  if (!source) throw new Error("Missing consent initializer");
  const tags: { src: string }[] = [];
  const stored = new Map<string, string>();
  if (initial) stored.set("cookie-consent", initial);
  const window: Record<string, any> = {};
  const context = vm.createContext({ window,
    localStorage: { getItem: (key: string) => stored.get(key) ?? null, setItem: (key: string, value: string) => stored.set(key, value) },
    document: { createElement: () => ({}), head: { appendChild: (tag: { src: string }) => tags.push(tag) } },
  });
  vm.runInContext(source, context);
  const commands = () => window.dataLayer.filter((v: any) => v[0]).map((v: any) => Array.from(v));
  return { window, tags, commands, context };
}
describe("Consent before measurement", () => {
  const denied = { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  const granted = { ad_storage: "granted", analytics_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" };
  it("defaults all four permissions to denied with 500ms wait before tags", () => {
    const r = runConsent(null);
    expect(r.commands()[0]).toEqual(["consent", "default", { ...denied, wait_for_update: 500 }]);
    expect(r.tags).toEqual([]);
    vm.runInContext("gtag('event','purchase',{value:7})", r.context);
    expect(r.commands()).toHaveLength(1);
  });
  it("never loads tags for returning declined visitors or rejection", () => {
    const r = runConsent("declined");
    r.window.setJay23Consent("declined");
    expect(r.tags).toEqual([]);
    expect(r.commands()[1]).toEqual(["consent", "update", denied]);
  });
  it("grants returning accepted visitors before either config", () => {
    const r = runConsent("accepted");
    expect(r.commands()[1]).toEqual(["consent", "update", granted]);
    expect(r.commands().slice(4)).toEqual([["config", "G-HTY7ZLKH38"], ["config", "AW-1030433666"]]);
    expect(r.tags.map(tag => tag.src)).toEqual([
      "https://www.googletagmanager.com/gtag/js?id=G-HTY7ZLKH38",
      "https://www.googletagmanager.com/gtm.js?id=GTM-TQGLDXJL",
    ]);
  });
  it("acceptance grants then loads each loader only once", () => {
    const r = runConsent(null);
    r.window.setJay23Consent("accepted");
    r.window.setJay23Consent("accepted");
    expect(r.commands()[1]).toEqual(["consent", "update", granted]);
    expect(r.tags).toHaveLength(2);
  });
});