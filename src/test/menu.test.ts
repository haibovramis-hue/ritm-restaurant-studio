import { describe, expect, it } from "vitest";
import { MENU, SIGNATURE_IDS, findItem } from "@/lib/menu";

const price = (lvName: string) => MENU.flatMap((c) => c.items).find((x) => x.name.lv === lvName)?.price;

describe("official menu (Nov 2026)", () => {
  it("has exactly 13 categories in the official order", () => {
    expect(MENU.map((c) => c.name.lv)).toEqual(["Aukstās uzkodas", "Karstās uzkodas", "Salāti", "Zupas", "Karstie gaļas ēdieni", "Karstie zivju ēdieni", "Grilētie ēdieni", "Pastas", "Pankūkas", "Plates", "Piedevas", "Mērces", "Deserti"]);
  });
  it("has the official dish counts per category", () => {
    expect(MENU.map((c) => c.items.length)).toEqual([13, 9, 9, 5, 12, 4, 10, 2, 5, 5, 10, 7, 5]);
  });
  it("uses official prices", () => {
    expect(price("Grilēta gaļas plate ar kartupeļiem (4 pers.)")).toBe("49,00 €");
    expect(price("Steiks \"Zelta Pakavs\"")).toBe("24,00 €");
    expect(price("Laša tartars ar avokado")).toBe("11,80 €");
    expect(price("Maize")).toBe("1,50 €");
    expect(price("Ķiploku mērce")).toBe("2,50 €");
  });
  it("every dish has a price and every signature dish exists", () => {
    expect(MENU.flatMap((c) => c.items).every((x) => /^\d+,\d\d €$/.test(x.price))).toBe(true);
    expect(SIGNATURE_IDS.every((id) => findItem(id))).toBe(true);
  });
});
