# Baran Afzar — Living Implementation Plan

> This file is the single source of truth for the build. Every milestone, task,
> rule and status lives here. It is updated as work progresses and **deleted
> only when every task below is complete**.

---

## 0. Operating rules (mandatory)

### Work rules
- Always answer the user in **English**.
- Do not ask for permission to continue. Execute until every task is done.
- Update this file's checklists **immediately after** each task/milestone.
- Keep unfinished tasks visible here until they are finished; never silently drop one.
- If a deviation from the approved plan is required, write it under
  **§8 Deviations** before continuing.

### Git rules
- Single branch: `main`. Remote: `origin` = `https://github.com/Liwyd/baran-afzar.git`.
- Before any change: `git status` — never overwrite or discard unrelated changes.
- Small, logically grouped commits. Meaningful messages (imperative, English).
- **Commit and push after each validated milestone**, not at the end.
- Before every push: run `pnpm check` (typecheck + lint + tests), review the diff,
  confirm no secrets, no `.env`, no uploads, no build output are staged.
- Never force-push, never rewrite shared history, never destructive git commands.
- If a push fails: report the exact error. Never claim success that did not happen.
- `.gitignore` must cover: `node_modules/`, `dist/`, `.env*`, `data/`, `*.log`,
  `test-results/`, `.astro/`.

### Plan-update rules
- A task is marked `[x]` only when it is actually done and verified.
- Milestone complete ⇒ checkbox `[x]`, then commit, then push.
- At the very end (all tasks `[x]`): `git rm PLAN.md`, commit, push.

---

## 1. Approved decisions (from Phase 1 Q&A)

| Topic | Decision |
|---|---|
| Locales | English at `/`, Persian (RTL) at `/fa`, language switch in header + footer, hreflang |
| Contact | Slim contact band above footer (design language: hairline + mono label + admin-configured email + mailto) |
| Member bio/LinkedIn/GitHub | Card stays pixel-faithful at rest; `Profile ↗` targets an admin-configurable external URL; a mono `+` disclosure in each card expands bio + LinkedIn + GitHub |
| Fonts | Inter (Latin) + JetBrains Mono (labels) + Vazirmatn (Persian), self-hosted woff2, tuned against the SVGs |
| Hosting | Single Linux VPS + Caddy (auto-HTTPS) + systemd; data dir on persistent disk; documented backups |
| Admin bootstrap | CLI on the server (`scripts/admin.mjs create|reset`), scrypt hash into SQLite. No credential in env/git |
| Architecture | Astro 5 SSR (`@astrojs/node` standalone) + TypeScript + SQLite (`better-sqlite3`) + zero-JS server-rendered admin behind Caddy |
| Persistence | `BARAN_DATA_DIR` (default `./data` locally, `/var/lib/baran-afzar` in prod): `app.db` + `resumes/<uuid>.pdf` |
| Content updates | Admin write bumps `content_version` → in-process HTML cache invalidates → public pages reflect instantly, no rebuild |

---

## 2. Design reference (verified by rendering `ui/*.svg`)

| File | Frame |
|---|---|
| `ui/1.svg` | Persian desktop 1440×2147 |
| `ui/2.svg` | English desktop 1440×2031 |
| `ui/3.svg` | Persian mobile 390×2630 |
| `ui/4.svg` | English mobile 390×2709 (= Figma node-id 2-2593) |

Palette: bg `#F8F8F4` · ink `#191C20` · muted `#646970` · blue `#183FBA` ·
hairline `#D8DBD8` · band `#EEEFEA`. Gutter 80px desktop / 24px mobile, content 1280px.
Landmarks (EN desktop): header rule y=104 · CTA 209×48 @ (80,505) · blue rule y=617 ·
approach cols 400px @ x=80/520/960, y=646 · band y=730 h=414 · capability rows h=95 @
x=496 w=864 · people divider x=719.5, cards w=599.5 @ y=1326 · footer blue rule y=1890.
All text in the SVGs is outlined; no font metadata exists.

---

## 3. Milestones

### M0 — Bootstrap
- [x] `.gitignore`, `package.json`, `tsconfig.json`, `astro.config.mjs`, `.env.example`
- [x] Install deps (`astro`, `@astrojs/node`, `better-sqlite3`, fontsource fonts, vitest, zod)
- [x] `pnpm dev` boots; `pnpm build` produces `dist/`
- [x] First commit + push (creates the first refs on the empty remote)

### M1 — EN landing, pixel pass
- [ ] Extract logo lockup (EN/FA) + mark + icons from `ui/*.svg` into `src/assets/`
- [ ] Design tokens + global CSS (`tokens.css`, `global.css`), focus-visible, reduced-motion
- [ ] Base layout: header (logo, nav, lang switch), skip link, semantic landmarks
- [ ] Hero: eyebrow `00`, 2-line display headline, sub, blue CTA, caret bars + intro
- [ ] Approach row `01/02/03`
- [ ] Capabilities band (3 hairline rows)
- [ ] People section with 2 cards + disclosure + "links added soon" note
- [ ] Contact band
- [ ] Quote + footer (logo, tagline, lang switch, back to top)
- [ ] Responsive: 1440 and 390 layouts match `ui/2.svg` / `ui/4.svg` by overlay diff
- [ ] Hover/focus states, caret blink animation, `prefers-reduced-motion`

### M2 — FA locale + SEO
- [ ] `/fa` RTL page matching `ui/1.svg` / `ui/3.svg`
- [ ] i18n dictionaries `src/i18n/{en,fa}.ts` (static copy only)
- [ ] Language switch preserves state; `dir="rtl"` + `lang` attributes
- [ ] Per-locale `<title>`, description, canonical, hreflang, Open Graph, favicon
- [ ] `robots.txt` + `sitemap.xml`
- [ ] Heading hierarchy + landmark audit (both locales)

### M3 — Content from DB
- [ ] SQLite schema + migration runner + seed with the design's copy
- [ ] `content_version` cache invalidation; member/settings repositories
- [ ] Member cards bound to DB; résumé/profile links rendered only when configured
- [ ] Disclosure shows bio + LinkedIn + GitHub from DB
- [ ] Contact band email from DB
- [ ] Public `/resume/[slug]` download route (attachment, nosniff, sandbox CSP)

### M4 — Auth
- [ ] `ADMIN_PATH` env; internal rewrite to `/admin/*`; literal `/admin` → 404
- [ ] scrypt password hashing/verification (`crypto.scrypt`, timing-safe)
- [ ] Sessions table + `__Host-ba_sid` cookie (Secure/HttpOnly/SameSite=Lax), rotation
- [ ] Login rate limiting (per-IP + per-account), uniform errors, pruning
- [ ] CSRF tokens + Origin check on every mutation
- [ ] Security headers middleware (CSP, XCTO, Referrer-Policy, Permissions-Policy, frame-ancestors)
- [ ] `scripts/admin.mjs create|reset` (scrypt into SQLite, no secret in env/git)

### M5 — Dashboard
- [ ] Sign-in / sign-out with flash feedback (PRG)
- [ ] Edit per member: name (EN/FA), title (EN/FA), bio (EN/FA), profile URL, LinkedIn, GitHub
- [ ] Résumé upload (≤5 MB, `%PDF-` magic bytes, UUID storage name), replace, delete
- [ ] Validation errors rendered inline; success/error flash messages
- [ ] Every mutation behind auth + CSRF (verified by tests)

### M6 — Tests + quality
- [ ] Vitest unit: KDF, validators, rate limiter, session expiry, i18n parity, storage naming
- [ ] Vitest integration: boot built server on temp data dir over HTTP
      (public render, 401/404 on unauthenticated admin, 429 after N logins,
      cookie flags, CSRF 403, profile update visible without rebuild,
      non-PDF/oversized upload rejected, traversal-safe storage, delete → 404,
      sign-out invalidates)
- [ ] `astro check` + ESLint clean
- [ ] Lighthouse ≥95 perf / 100 a11y / ≥98 SEO (mobile emulation), CLS <0.02, axe clean
- [ ] Keyboard-only walkthrough + reduced-motion verified

### M7 — Deployment + docs
- [ ] `docs/ENV.md` (all env vars, examples)
- [ ] `docs/DEPLOY.md` (VPS setup, Caddy, systemd, DNS/HTTPS, deploy steps)
- [ ] `docs/BACKUP.md` (backup + restore procedures)
- [ ] `scripts/backup.sh`
- [ ] `public/og.png` generated from the design
- [ ] Production smoke checklist
- [ ] Final commit + push; **delete this file** (`git rm PLAN.md`) and push

---

## 4. Security plan (summary)

Auth boundary enforced server-side on every admin route (GET and POST).
scrypt (N=2¹⁵, r=8, p=1, 64-byte key, per-user salt, `timingSafeEqual`).
32-byte random session token, SHA-256 stored, `__Host-ba_sid` cookie,
12h idle / 7d absolute expiry, rotation on login, delete on logout.
Rate limit: 5 failures / 15 min per IP+account → 429 with uniform message.
CSRF: per-session token + Origin/Sec-Fetch-Site check on all mutations.
Uploads: ≤5 MB, `.pdf` extension, `%PDF-` magic bytes, `crypto.randomUUID().pdf`
storage name (user filename never enters a path), sanitized original name only in
`Content-Disposition`; download served with `attachment`, `X-Content-Type-Options:
nosniff`, `Content-Security-Policy: sandbox`, ETag.
Input: zod schemas, https-URL validation (no credentials, ≤200 chars), length caps,
parameterized SQL only, Astro auto-escaping (no `set:html` on user data).
Headers: CSP / XCTO / Referrer-Policy / Permissions-Policy / frame-ancestors at app
level; HSTS + compression at Caddy.
Secrets: `.env` gitignored + `0600` systemd EnvironmentFile; CLI is the only way to
set a password. Known **WARNING**: the hidden admin path is discretion, not security —
documented in `docs/ENV.md`.

---

## 5. Testing & performance targets

`pnpm check` = `astro check` + `eslint` + `vitest run`. Public JS = 0 KB.
HTML < 20 KB gz, CSS < 20 KB gz, fonts < 120 KB woff2, total first load < 250 KB.
Lighthouse mobile ≥95/100/≥98, CLS <0.02, axe clean, keyboard-only operable,
`prefers-reduced-motion` honored.

---

## 6. Directory structure (target)

```
src/
├─ pages/  index.astro · fa/index.astro · resume/[slug].ts ·
│          admin/{index,sign-in}.astro · robots.txt.ts · sitemap.xml.ts
├─ layouts/Base.astro
├─ components/  Header · Hero · Approach · Capabilities · People ·
│               MemberCard · Contact · Quote · Footer · LangSwitch
├─ i18n/{en,fa}.ts
├─ lib/  env · db · members · settings · auth · sessions · csrf ·
│        rate-limit · validate · storage · cache
├─ styles/{tokens.css,global.css}
└─ assets/{logo-en.svg,logo-fa.svg,mark.svg,icons/}
scripts/{admin.mjs,backup.sh}
tests/{unit,integration}/
public/{favicon.svg,og.png}
docs/{ENV.md,DEPLOY.md,BACKUP.md}
ui/*.svg   (reference designs — never modified)
```

---

## 7. Git cadence

| When | Action |
|---|---|
| M0 done | commit + push |
| M1 done | commit + push |
| M2 done | commit + push |
| M3 done | commit + push |
| M4 done | commit + push |
| M5 done | commit + push |
| M6 done | commit + push |
| M7 done | commit + push |
| All done | `git rm PLAN.md`, commit, push |

---

## 8. Deviations

_(none yet — record any architectural or visual deviation here before continuing)_

---

## 9. Status

**Current milestone: M1 — EN landing, pixel pass**
Last updated: M0 complete (commit `450752d`, pushed to `origin/main`).
Notes: pinned `astro@7.4.1` (7.4.2 requires Node ≥22.23.4, machine has 22.23.1);
`@astrojs/check` added so `pnpm build` stays non-interactive; Astro telemetry disabled;
native builds approved via `pnpm approve-builds --all`.
