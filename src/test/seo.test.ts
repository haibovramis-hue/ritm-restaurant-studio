import { describe, expect, it } from "vitest";
import { MENU } from "@/lib/menu";
import { menuSchema, pageHead, SITE_URL } from "@/lib/seo";

describe("public page identity", () => {
  it("self-references all six public pages on the published origin", () => {
    for (const path of ["/", "/menu", "/banquets", "/sauna", "/events", "/gallery"]) {
      const head = pageHead(path, "Zelta Pakavs", "Rīga");
      expect(head.links[0]?.href).toBe(`${SITE_URL}${path}`);
      expect(head.meta.find((tag) => tag.property === "og:url")?.content).toBe(`${SITE_URL}${path}`);
    }
  });
  it("exports exactly the 13 verified categories and their EUR prices", () => {
    const schema = menuSchema();
    expect(schema.hasMenuSection).toHaveLength(13);
    expect(schema.hasMenuSection[0]?.hasMenuItem[0]?.offers).toEqual({ "@type": "Offer", price: "7.00", priceCurrency: "EUR" });
    expect(schema.hasMenuSection.flatMap((section) => section.hasMenuItem).map((item) => item.name)).toEqual(MENU.flatMap((section) => section.items.map((item) => item.name.lv)));
  });
});