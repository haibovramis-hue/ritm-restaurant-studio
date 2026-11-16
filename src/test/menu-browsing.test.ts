import { describe, expect, it } from 'vitest';
import { selectedCategory, searchMenu } from '@/lib/menu-browsing';

describe('category-only menu browsing', () => {
  it('defaults to the first official category', () => {
    expect(selectedCategory()?.id).toBe('cold');
    expect(selectedCategory('unknown')?.id).toBe('cold');
  });
  it('opens only the five official soups from a soups deep-link', () => {
    const category = selectedCategory('soups');
    expect(category?.id).toBe('soups');
    expect(category?.items).toHaveLength(5);
  });
  it('searches across categories and retains category groups', () => {
    const groups = searchMenu('ar', 'lv');
    expect(groups.length).toBeGreaterThan(1);
    expect(groups.every((group) => group.items.every((item) => [item.name.lv, item.desc.lv].some((text) => text.toLowerCase().includes('ar'))))).toBe(true);
  });
  it('searches only the selected language', () => {
    expect(searchMenu('Солянка', 'ru').flatMap((group) => group.items).map((item) => item.id)).toEqual(['solyanka']);
    expect(searchMenu('Солянка', 'lv')).toEqual([]);
    expect(searchMenu('Solyanka', 'en').flatMap((group) => group.items).map((item) => item.id)).toEqual(['solyanka']);
  });
});
