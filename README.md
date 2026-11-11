# ETERNA — Photography Portfolio (Next.js + Strapi)

A mobile-first, photography-led portfolio for **ETERNA** — wedding, event & product photography.
Built with Next.js (App Router) + Strapi. Fixed templates only (no site-builder), per the design handoff.

- Live site: `eterna.jinno.id`
- Design spec: `roles/ui-ux-designer/eterna-design-system.md`
- CMS content model mapping: design spec §5

---

## 1. Quick start

```bash
cd eterna-web
npm install        # installs Next.js 14 + fonts + sharp
npm run dev        # dev server at http://localhost:3000
```

The app runs on **local demo data** out of the box (no Strapi required) so the templates show up
immediately. Pages:

| Route | Page |
|-------|------|
| `/` | Homepage (hero, about, categories, gallery strip, CTA) |
| `/services` | Services (4 cards) |
| `/gallery` | Gallery with category filters + "Show more" |
| `/contact` | Contact (form → WhatsApp, direct phone/email) |
| `/about` | About (intro photo, bio, mini gallery, quote) |

### Production build

```bash
npm run build      # type-check + optimize (static pages pre-rendered)
npm run start      # serve the production build at http://localhost:3000
```

---

## 2. Connecting Strapi

The frontend is a **fixed-template site**: Strapi feeds content, nothing more. To switch from demo
data to the live CMS:

1. Configure the Strapi host in `.env.local` (copy `.env.example`):

   ```bash
   echo 'NEXT_PUBLIC_STRAPI_URL=https://yoursite.com' > .env.local
   ```

2. Run `npm run dev`.
3. The app tries the Strapi REST API; on any failure it falls back to the local demo data and logs
   a warning. Remove `NEXT_PUBLIC_STRAPI_URL` to go back to demo data.

### Strapi content model → site usage

| Strapi collection | Site usage |
|-------------------|------------|
| `Settings` | Brand / footer / hero image |
| `Categories` | Gallery filters + nav |
| `Projects` | Gallery grid |
| `Services` | Services page |
| `Testimonials` | About / homepage quote |
| `About` | About page (bio + quote) |
| `Contact` | Contact page (phone, email, address, WhatsApp) |

Routes are the default Strapi REST routes (`api/<collection>`). `Settings`/`About`/`Contact` are
single-record calls; everything else is a collection call (`?populate=*`, `sort=-createdAt`).
Adjust `STRAPI_ROUTES` in `src/lib/data.js` if your Strapi namespacing differs.

> `unwrap(payload)` in `src/lib/data.js` tolerates both raw payloads and Strapi's normalised
> `{ data: ... }` shape, so it works with Strapi v4/v5.

---

## 3. Project structure

```
eterna-web/
├── public/
│   ├── images/          # demo images (hero, about, gallery, category cards)
│   ├── favicon.svg / favicon-32.png / apple-touch-icon.png
│   └── ...
├── src/
│   ├── app/                       # Next.js App Router routes
│   │   ├── layout.tsx             # root layout + metadata
│   │   ├── page.tsx               # homepage
│   │   ├── services/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── contact/page.tsx
│   │   └── about/page.tsx
│   ├── components/
│   │   ├── Hero.jsx               # full-bleed hero with CTA
│   │   ├── Categories.jsx         # filter chips + category cards
│   │   ├── GalleryStrip.jsx       # homepage strip (double-tap open)
│   │   ├── GalleryShell.jsx       # gallery: filters + load-more + grid (client)
│   │   ├── Lightbox.jsx           # full-screen viewer (keyboard/swipe/click)
│   │   ├── ContactForm.jsx        # minimal form → wa.me
│   │   ├── TestimonialBlock.jsx
│   │   ├── Header.jsx / Footer.jsx / Layout.jsx
│   │   └── ...
│   ├── lib/
│   │   ├── data.js                # Strapi client + local seed + payload helpers
│   │   └── utils.js
│   └── app/globals.css            # design tokens, base styles, all components
├── next.config.js                 # image optimization (AVIF/WebP), remotePatterns
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 4. Design system (summary)

Tokens are in `src/app/globals.css` under `:root`.

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#fafafa` | page background |
| `--bg-soft` | `#ffffff` | cards, sections |
| `--ink` | `#0f0f0f` | headings/body |
| `--ink-deep` | `#111111` | hero dark text |
| `--ink-soft` | `#3f3a34` | meta, captions |
| `--muted` | `#9ca3af` | tertiary labels |
| `--line` | `#e4e0d8` | borders |
| `--accent` | `#1c1917` | primary actions, serif accents |
| `--thermal` | `#8a7f74` | "story" text |

- **Typography**: Cormorant Garamond (serif headings) + Inter (sans body). Self-hosted via
  `@fontsource` (imported in `globals.css`).
- **Spacing**: 8pt scale (`4/8/12/16/24/32/48/64/96/128` px). Sections use 64–128 px.
- **Motion**: reveal-on-scroll (`IntersectionObserver`, staggered, `prefers-reduced-motion` aware),
  image/card lift & scale, lightbox fade + crossfade, hero "draws". All `transition` Respect
  `prefers-reduced-motion`.
- **Mobile-first breakpoints**: ≤600 px (1-col, stacked), 601–1024 px (2-col), ≥1025 px (3-col
  gallery, side-by-side cards, hero full-width).

---

## 5. Image optimisation

- `next/image` with `width` / `height` / `sizes` on every photo; `loading="lazy"` on below-fold,
  `decoding="async"`, `resize` + `fill` for uniform cells.
- `next.config.js` enables **AVIF + WebP** via `formats` and allows the Strapi host via
  `remotePatterns`. Verified: requesting a photo with `Accept: image/avif` returns an AVIF asset.
- Local demo images live in `public/images/` (JPEG) and serve through `_next/image` with width
  descriptors. In production, upload photos to Strapi → they flow through the Image Optimization
  API as AVIF/WebP.

---

## 6. Notes & caveats

- **Demo mode**: without `NEXT_PUBLIC_STRAPI_URL`, the app renders local seed data. The data model
  mirrors Strapi so development/unfetching is identical.
- **Fixed templates**: no page-builder, no layout editing — matches the handoff contract.
- **Contact form**: no backend — submits open a WhatsApp chat (`wa.me`), exactly like the design.
- **Strapi for the editor**: this repo is the *frontend only*. The Strapi admin layout/UX is covered
  by the design spec (`eterna-design-system.md` §3).
