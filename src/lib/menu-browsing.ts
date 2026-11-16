import { MENU, type MenuCat } from './menu';
import type { Lang } from './i18n';

export function selectedCategory(id?: string): MenuCat | undefined {
  return MENU.find((category) => category.id === id) ?? MENU[0];
}

export function searchMenu(query: string, lang: Lang): MenuCat[] {
  const term = query.trim().toLocaleLowerCase(lang);
  if (!term) return [];
  return MENU.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      [item.name[lang], item.desc[lang]].some((text) => text.toLocaleLowerCase(lang).includes(term))),
  })).filter((category) => category.items.length > 0);
}
