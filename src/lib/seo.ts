import { MENU } from "./menu";
import { priceCents } from "./basket";

/** Single place to change when the site gets its own domain. */
export const SITE_URL = "https://zelta-table-and-sauna.lovable.app";
export const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;

export function pageHead(path: string, title: string, description: string) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:url", content: url }, { property: "og:type", content: "website" },
      { property: "og:image", content: SHARE_IMAGE },
      { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function menuSchema() {
  return {
    "@context": "https://schema.org", "@type": "Menu", name: "Zelta Pakavs — Ēdienkarte",
    url: `${SITE_URL}/menu`, inLanguage: "lv", provider: { "@id": `${SITE_URL}/#restaurant` },
    hasMenuSection: MENU.map((category) => ({
      "@type": "MenuSection", name: category.name.lv,
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem", name: item.name.lv,
        ...(item.desc.lv ? { description: item.desc.lv } : {}),
        offers: { "@type": "Offer", price: (priceCents(item.price) / 100).toFixed(2), priceCurrency: "EUR" },
      })),
    })),
  };
}