import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type Lang = "lv" | "ru" | "en";
export type L = { lv: string; ru: string; en: string };
export const tr = (lv: string, ru: string, en: string): L => ({ lv, ru, en });

export const LANG_KEY = "zp-lang";
export const isLang = (x: unknown): x is Lang => x === "lv" || x === "ru" || x === "en";

/** Single source of truth: the stored choice. Never throws (private mode, blocked storage). */
export function readStoredLang(storage: Pick<Storage, "getItem"> | undefined = typeof localStorage === "undefined" ? undefined : localStorage): Lang | null {
  try { const s = storage?.getItem(LANG_KEY); return isLang(s) ? s : null; } catch { return null; }
}
export function writeStoredLang(lang: Lang, storage: Pick<Storage, "setItem"> | undefined = typeof localStorage === "undefined" ? undefined : localStorage) {
  try { storage?.setItem(LANG_KEY, lang); } catch { /* ignore */ }
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; l: (x: L) => string }>({ lang: "lv", setLang: () => {}, l: (x) => x.lv });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("lv");
  const hydrated = useRef(false);
  // Hydrate from storage once, before anything is persisted, so a fresh mount can never overwrite the saved choice with the default.
  useEffect(() => {
    const s = readStoredLang();
    if (s) setLangState(s);
    hydrated.current = true;
    const onStorage = (e: StorageEvent) => { if (e.key === LANG_KEY && isLang(e.newValue)) setLangState(e.newValue); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (x: Lang) => { setLangState(x); writeStoredLang(x); };
  return <Ctx.Provider value={{ lang, setLang, l: (x) => x[lang] }}>{children}</Ctx.Provider>;
}
export const useI18n = () => useContext(Ctx);
