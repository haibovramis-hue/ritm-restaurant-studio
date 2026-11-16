import { describe, expect, it } from "vitest";
import { LANG_KEY, readStoredLang, writeStoredLang } from "@/lib/i18n";

const memory = (init: Record<string, string> = {}) => {
  const data = { ...init };
  return { getItem: (k: string) => data[k] ?? null, setItem: (k: string, v: string) => { data[k] = v; }, data };
};

describe("language persistence", () => {
  it("reads a valid stored language", () => {
    expect(readStoredLang(memory({ [LANG_KEY]: "ru" }))).toBe("ru");
    expect(readStoredLang(memory({ [LANG_KEY]: "en" }))).toBe("en");
  });
  it("ignores unknown values and empty storage", () => {
    expect(readStoredLang(memory({ [LANG_KEY]: "de" }))).toBeNull();
    expect(readStoredLang(memory())).toBeNull();
  });
  it("survives storage that throws", () => {
    const broken = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(readStoredLang(broken)).toBeNull();
    expect(() => writeStoredLang("ru", broken)).not.toThrow();
  });
  it("round-trips a choice", () => {
    const m = memory();
    writeStoredLang("en", m);
    expect(readStoredLang(m)).toBe("en");
  });
});
