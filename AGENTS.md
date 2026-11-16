<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- All UI text is written as tr(lv, ru, en) triplets in src/lib/copy.ts, src/lib/copy-pages.ts and src/lib/menu.ts; components render with useI18n().l(x) — a missing translation can't compile.
- Phone/WhatsApp numbers and links live only in src/lib/config.ts — owner changes them in one place.
- Every photo is imported via src/lib/images.ts (IMG); real photos in src/assets/real/ (warm-graded, cropped), generated stand-ins in src/assets/photos/ — swap in one place.
- The homepage hero uses art-directed picture/srcset crops without parallax enlargement, and its sharing image is derived from the same master photo to preserve sharpness and visual consistency.
- Build page sections with the shared PhotoBlock (full-bleed photo, short headline, one line, one action) so every page stays photo → promise → action; the homepage is the hero plus at most six blocks, with full events, gallery, reviews and story on /events and /gallery, and table booking in one root-level bottom sheet opened by every "book" button or /#booking.
- Photos are imported with vite-imagetools WebP queries ending in &imagetools so every image ships as WebP without changing call sites.
- Keep the homepage menu to signature photos and category deep-links; /menu?c= selects one category, while localized search groups matches across the unchanged official menu.
- Use the shared translated capacity copy for combined indoor-and-terrace statements to prevent contradictory claims across pages.
- Owner-editable placeholders (prices, hall sizes, packages, FAQ answers) use EditableInput/EditableText, stored in localStorage — demo only, no backend.
- Keep order quantities in a root-level BasketProvider with effect-only localStorage persistence; derive totals and WhatsApp messages from the official menu in integer cents so navigation preserves orders without duplicating prices.
- Riga-time date helpers (today, next open slot, DD.MM.YYYY WhatsApp format, localized event dates) live in src/lib/dates.ts so every form and message formats dates the same way.

- Leaf route SEO uses the shared pageHead helper with the public origin and existing share image; menu structured data derives from MENU without duplicating prices.
- Maintain public/sitemap.xml alongside public route changes; omit lastmod without authoritative page-specific timestamps.
- Public calendars render read-only copy; direct hero contact links remain independent of required form fields.
