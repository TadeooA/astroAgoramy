# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `astroAgoramy/` (the inner directory where `package.json` lives):

```bash
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview the production build
```

There are no tests or linting scripts configured.

## Architecture

**Astro 6 static site** — all pages are prerendered at build time. No SSR adapter.

### Tech stack
- **Astro 6** + **React 19** (via `@astrojs/react`) for interactive islands
- **Tailwind CSS v4** via `@tailwindcss/vite` (Vite plugin, NOT `@astrojs/tailwind`)
- **SCSS** via `sass-embedded` for global styles
- Site deploys to GitHub Pages at `agoramy.com`

### Tailwind v4 setup — important
Config lives in `src/styles/tailwind.css` (not `tailwind.config.mjs`, which is a leftover and ignored). The vite plugin is registered in `astro.config.mjs` under `vite.plugins`.

SCSS files that use `@apply` must have this at the top of the style block that imports them (see `Layout.astro`):
```astro
<style is:global lang="scss">
  @reference "../styles/tailwind.css";
  @import '../styles/global.scss';
</style>
```
Without `@reference`, Tailwind v4 cannot resolve custom utilities like `font-body` inside SCSS `@apply` calls.

`!important` with `@apply` in SCSS: use plain CSS properties with `!important` — the `#{!important}` SCSS syntax and the `!` prefix both fail in v4 inside SCSS.

### Layout and routing
- `src/layouts/Layout.astro` — the single shared layout (Navbar + slot + Footer). All pages use it except `src/pages/SassModernPage.astro`.
- Pages live under `src/pages/` and map directly to routes. Subdirectory `index.astro` files create clean URLs (e.g. `src/pages/pricing/index.astro` → `/pricing`).
- Dynamic blog routes: `src/pages/blog/[slug].astro` uses `getStaticPaths()` sourced from `src/components/Blog/data.ts`.

### Component conventions
- `.astro` components for layout/markup-heavy sections (Hero, Features, Footer, etc.)
- `.tsx` React components only where client-side interactivity is needed (Swiper sliders, accordions, countdown, form with Turnstile, subscription form)
- React components that need hydration use `client:load` or `client:visible` directives on the import site

### Blog system
Content is hardcoded in `src/components/Blog/data.ts` as `post1`, `post2`, `post3` arrays of type `Post`. Adding a new post means adding to one of those arrays with a unique `slug`. The slug is what `getStaticPaths()` uses to generate the route.

### Forms and spam protection
Forms post to `https://app.agoramy.com/api/landing/{contact,newsletter}` via `src/lib/landingApi.ts` (CORS only allows `agoramy.com` / `www.agoramy.com`, so submissions fail from localhost). Responses: 2xx `{success,message}`, 422 `{message,errors:{field:[...]}}`, 429 rate limit.

Spam protection is server-side: every form must include the `Honeypot` component (`src/components/Common/Honeypot.tsx`, field `website`, hidden via off-screen CSS) and send `_ts` = `Date.now()` captured on mount. Submissions faster than 3 s or with `website` filled get a fake success and are discarded, so test by filling forms by hand.

### Business sign-up (`/registro`) — hidden, not published yet
`src/components/Register/RegisterForm.tsx` + `CodeBoxes.tsx` implement the tenant sign-up with email code (contract: backend repo `docs/landing/API-FORMULARIOS.md` §3): form → `POST /api/register/code` → six code boxes → `register/code/check` → `POST /api/register` with the full form + `code`. The trap field here is `_hp_field` (not `website`).

The page lives in `src/routes/registro.astro`, **outside** `src/pages`, and is injected by the `registroOculto` integration in `astro.config.mjs` only in `npm run dev` or when building with `REGISTRO_PUBLICO=true`. A normal build ships neither the page nor the API calls. To publish: set that env in `.github/workflows/deploy.yml` (or move the file into `src/pages`), point the «Comenzar Ahora» CTAs in `src/components/Pricing/plans.ts` to `/registro`, and tell the backend to turn on `TENANT_REQUIRE_REGISTRATION_CODE`. The trial-terms version shown next to the checkbox is the `TERMS_VERSION` constant in `RegisterForm.tsx`, a copy of `App\Support\TrialTerms::VERSION`: bump it whenever the backend does.

`Turnstile.tsx` and the Turnstile script in `Layout.astro` are legacy and no longer used by any form.

### Global styles chain
```
Layout.astro <style lang="scss">
  └── src/styles/global.scss
        ├── style.scss       ← custom SCSS, imports custom/ partials
        └── icons.scss
```
`src/styles/tailwind.css` is imported separately in the Layout.astro frontmatter (`import '../styles/tailwind.css'`) and is the Tailwind v4 entry point.

### Assets
Images live under `src/assets/images/` with subdirectories by section (`blog/`, `hero/`, `features/`, etc.). Webp format is preferred (note the `w` suffix pattern e.g. `hero1w.webp`). Import images in frontmatter and use `.src` to get the URL.

### Two product lines
The site covers two distinct products:
1. **Agoramy POS** — pharmacy point-of-sale system for Mexico
2. **Agoramy / IAHub** — SaaS CRM/automation platform with WhatsApp Business API integration

Privacy/terms page at `/privacy` covers both via main document + Apéndice A.
