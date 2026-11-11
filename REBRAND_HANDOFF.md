# LocalPulseHub rebrand — handoff brief for Claude Code

This brief tells the Claude running inside VS Code how to bring the new LocalPulseHub brand from this design preview (`qaki/rebranding`) into the real app (`qaki/localpulsehub`).

---

## Part A — For you (the founder): setup, once

1. Put both repos side by side, for example:
   ```
   Projects/
   ├── localpulsehub/   ← your real app (already on your computer)
   └── rebranding/      ← this design preview
   ```
   To get this folder: open a terminal in `Projects/` and run
   `git clone https://github.com/qaki/rebranding.git`
2. In VS Code: install the **Claude Code** extension and sign in.
3. Open the `localpulsehub` folder in VS Code and start Claude Code.
4. Give it access to the design folder by typing: `/add-dir ../rebranding`
5. Paste the starter prompt below.
6. Run `npm run dev` in a second terminal and open http://localhost:3000. Claude will tell you which pages to check after each phase.
7. You only say **"approved"** when you're happy with what you see. Until then nothing is committed or pushed.

### Starter prompt (copy everything in the box)

```
Read ../rebranding/REBRAND_HANDOFF.md fully, then AGENTS.md, then follow the brief.

Hard rules for this whole session:
- First create and switch to a new local branch called `rebrand`. Work only there.
- NEVER run git commit, git push, git merge, or anything that changes GitHub or Vercel until I write the exact word "approved" for that specific phase. Even then, commit only; push only when I separately say "push".
- Do not change any copy, SEO, metadata, JSON-LD, URLs, routes, server actions, database code, Paddle, Supabase or email-sending logic. This is a visual rebrand only. If something looks like it needs a text change, ask me first.
- Work phase by phase as the brief says. At the end of each phase: run `npm run lint && npm run build`, then stop and give me the list of localhost URLs to check. Wait for my feedback.
```

---

## Part B — For Claude Code: the brief

### B1. What this is

LocalPulseHub (localpulsehub.com) is a SaaS for small US local businesses: it gets them more Google reviews (QR codes, email requests, WhatsApp requests) and answers every review with AI. The founder rebranded it. The approved look lives as static HTML in `../rebranding/`:

| Preview file | Real app route(s) it styles |
|---|---|
| `index.html` | `/` (app/page.tsx + components/sections/*) |
| `pricing.html` | `/pricing` |
| `blog.html` | `/blog` (and the look of the 3 articles) |
| `login.html` | `/login` (and forgot/reset password, verify-email) |
| `signup.html` | `/signup` |
| `assets/site.css`, `assets/site.js` | shared styles + motion used by the 4 sub-pages |
| `fonts/` | Anton + Archivo woff2 (SIL OFL) — reference only, see B3 |

**Source-of-truth rule:**
- The **preview** decides how things look and move.
- The **real app** decides what things say and do: text, links, SEO, forms, data, logic, the industries mega-menu, the real live demo/simulator, founding-offer switches (`FOUNDING_OFFER_ACTIVE`), auth flows.
- The preview simplified some things (fake forms, fewer nav items, static demo). Never copy those simplifications into the app. Restyle the real thing.
- If the app has text/element that the preview doesn't show, keep it and style it in the new system. Ask the founder before removing any text.

Read `AGENTS.md` before coding. It's Next.js 16 (App Router, `proxy.ts` not middleware), React 19, Tailwind v4 (`@theme` in `app/globals.css`), Framer Motion, Lucide icons. Read the relevant guide in `node_modules/next/dist/docs/` before using any Next API you're not sure about.

### B2. Brand decisions (already approved — don't re-debate)

- **Personality:** the Hero with warmth. The underdog local business climbing past bigger competitors on Google. Hopeful, confident, plain-spoken. Not corporate, not cute.
- **Mood:** "The Climb" — a pulse/heartbeat line that turns into a rising arrow.

### B3. Design tokens

**Colors**

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0B1B3A` | Main brand color. Hero, nav, dark sections, footer, headings on white, primary dark buttons |
| `deep` | `#071230` | Darker navy for depth (cards on navy, gradients, waves) |
| `lime` | `#C8F135` | Actions and highlights: primary buttons, logo tile, key words/hooks on navy, the pulse line |
| `signal` | `#FF6B2C` | ONLY for 1-star alerts / danger moments (e.g. the "Protect" story, 1-star badges). Never decoration |
| `ink` | `#2C3A55` | Body text on white |
| `muted` | `#4A5B7A` | Secondary text on white |
| `line` | `#D5DCE6` | Borders and dividers on white |
| `mist` | `#EEF2F7` | Alternate light section background |
| white | `#FFFFFF` | Content sections |
| on-navy text | `#DCE4F2` (body), `#FFFFFF` (headings), `#8FA3C7` (muted/waves) | |

**Hard color rules**
- Lime is never text on white (fails contrast). On white, lime appears only as a **button background with navy text**.
- On navy, lime text is fine (headline hooks, links).
- Buttons: primary = lime bg + navy text; secondary on white = navy bg + white text; on navy = outline white or lime.
- Remove the old emerald (`#10b981` / `brand-*`) and slate-based look. Don't blindly remap `brand-*` to lime: many `brand-600/700` usages are text on white, which would become lime-on-white. Add new tokens, then convert usages file by file, and grep for leftover `brand-` and `emerald`/`slate-` classes at the end of each phase.
- The deprecated `ink-*` palette (dark Protect block, CTA card) gets replaced by navy/deep.

Suggested `@theme` additions in `app/globals.css`:
```css
--color-navy: #0B1B3A;
--color-deep: #071230;
--color-lime: #C8F135;
--color-signal: #FF6B2C;
--color-ink: #2C3A55;      /* note: name clashes with the old ink-* scale — remove that scale or name this --color-body */
--color-muted-text: #4A5B7A;
--color-line: #D5DCE6;
--color-mist: #EEF2F7;
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```
Also update the semantic tokens (`--color-primary`, `--color-ring`, `--color-border`, shadows: the emerald `shadow-glow` should go; use a soft navy shadow instead).

**Typography**
- **Anton** — display only: H1/H2/H3, big numbers (prices, stats), the wordmark. Uppercase, single weight (400). Line-height ~0.95–1.0, slight positive letter-spacing is fine at small sizes. Never for body, labels, buttons or anything under ~20px.
- **Archivo** — everything else: body (16–18px, line-height 1.6), UI, buttons (600–700), labels, nav (600). Weights used: 400, 500, 600, 700, 800.
- Replaces Inter (body) and Space Grotesk (display). Keep JetBrains Mono only if code/mono text still uses it.
- Load with `next/font/google` (`Anton` with `weight: "400"`, `Archivo` with the weights above, `display: "swap"`), expose as CSS variables and map `--font-display` and `--font-sans` to them in `@theme`. The woff2 files in `../rebranding/fonts/` are just the reference; next/font self-hosts automatically.
- Look at how the preview sizes headings with `clamp()` and copy those scales. The hero H1 must not dominate a 1440×900 screen — the founder already complained once that it was too big.

**Logo**
- **Use the final files in `../rebranding/logo/`** (see its README): `logo-mark.svg` (app icon), `logo-full-on-navy.svg` / `logo-full-on-white.svg` (full logo, letters already outlined), `favicon.ico`, `icon-*.png`. Copy them into `public/` / `app/` as needed. Don't redraw them.
- Mark: a rising arrow, three exact 45° strokes + right-angle head. SVG (viewBox 32×32):
  `<path d="M5.5 22.5L12.5 15.5L16.5 19.5L26.5 9.5M19.5 9.5H26.5V16.5" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>` (favicon 16/32px: 3.0)
  
- **App icon / favicon / nav mark:** lime rounded square (radius ≈ 24% of size) with the arrow in navy.
- **On navy:** lime tile + white Anton wordmark "LocalPulseHub" (one word, no colored "Pulse").
- **On white (docs, emails, light surfaces):** navy arrow, navy wordmark, no tile needed.
- Update `components/logo.tsx` (remove the emerald gradient + pulse-ring animation), `app/favicon.ico`, `app/icon.*`/`apple-icon.*` if present, `components/og-image.tsx` (navy bg, lime tile mark, white Anton headline "More Google reviews. Every one answered." — keep the existing text), and the `logo` file referenced in JSON-LD (`/icon.png`).

**Waves (background texture)**
- Navy sections carry soft horizontal waves in a lighter navy (stroke `#8FA3C7`-ish at low opacity, or `#13264D`-ish fills). See `waves` markup in `index.html` / `pricing.html`. They drift horizontally on scroll (see motion).

**Spacing / shape**
- Container max-width 1240px, side padding 28px (20px on mobile).
- Radius: 8px buttons, 10–16px cards, pills fully round.
- Sections: generous vertical padding (preview uses ~96–128px desktop, ~64–72px mobile).
- No eyebrow labels above headings in new work (the preview has none). If an existing `Eyebrow` contains text, ask before removing it.

### B4. Motion system (same feel as the preview)

All motion must respect `prefers-reduced-motion: reduce` (show final state, no movement). Easing: `cubic-bezier(0.16, 1, 0.3, 1)` everywhere unless noted. Motion must never block reading or clicking. Use Framer Motion (`whileInView`, `viewport={{ once: true, margin: "0px 0px -12% 0px" }}`) or a tiny client hook with IntersectionObserver — keep marketing pages statically renderable (they use `revalidate = 3600`; don't add `cookies()`/dynamic APIs).

Reveal types used in the preview (CSS in `index.html`, search `data-r=`):

| Name | From → to | Timing | Where |
|---|---|---|---|
| `rise` | opacity 0, y +26px → visible | 0.7s, stagger via `--d` | most blocks, cards, list items |
| `mask` | clip-path inset(0 0 100% 0) + y 0.35em → open | 0.95s | big Anton headings (observe the PARENT, clipped elements don't intersect reliably) |
| `pop` | scale 0.3, opacity 0 → 1 | 0.55s, +0.2s delay | stars, check icons, badges |
| `drop` | y −34px, scale .96 → in | 0.5–0.6s, .35s delay | notifications/alerts in mockups |
| `card` | translate(60px,90px) rotate(−18°) → rotate(−3°) | 1s | the tossed card in features |
| `chat` | typing dots 1.8s, then answer fades up at 1.9s | | the AI-search ChatGPT mockup |
| `table` | LocalPulseHub column wipes in | | comparison table |
| `draw` | SVG stroke draws from 0 to full | 1.6s `cubic-bezier(.6,0,.2,1)` | pulse lines (observe the SECTION) |

Scroll-linked:
- **Waves drift:** each wave layer gets `translateX(-(viewportHeight - sectionTop) * 0.04)px` while visible, updated in one `requestAnimationFrame` per scroll (passive listener).
- **Climb rail:** a thin fixed rail on the right (desktop only) that fills lime as the page scrolls (`.climb` in index.html).
- **Sticky CTA:** on long pages, a small bar with the founding CTA appears after the hero has scrolled away and hides while the founding section or footer is on screen (see end of `index.html` script and `assets/site.js`). Respect `FOUNDING_OFFER_ACTIVE` and the spots-left state; when the offer is off, use the trial CTA.

Micro-interactions: `.press` buttons scale to 0.97 on active, links underline on hover, focus rings visible (lime on navy, navy on white, 2px offset).

### B5. The hero phone (the most important piece)

The hero shows a phone that loops through the **3 ways LocalPulseHub gets reviews**, each ending on a 5-star Google review. All markup/CSS is in `index.html` — search for `hs-` classes (`hs-phone`, `hs-scene`, `hs-msg`, `hs-g`, `gs1`–`gs5`, `hs-pill`, `hs-pause`, `hs-scanline`). Port it as one client component (e.g. `components/sections/hero-phone.tsx`).

- **Loop:** 15s total, 3 scenes × 5s, pure CSS keyframes. Each scene's animations get fixed delay offsets (`.hs-d0/1/2 { animation-delay: … !important }` — the `!important` is needed because shorthand animation resets delays).
- **Scene 1 — Email (dentist):** inbox notification → email opens:
  subject "How was your experience at the dentist?", body "Hi there, thank you for your appointment at the dentist. How did we do? It takes about 30 seconds and it means a lot to our team:", link "Tap here to share your feedback" → Google review sheet, stars fill 1→5 → posted.
- **Scene 2 — WhatsApp (plumber):** chat bubble "Plumber: Thanks for choosing us! How was it? Tap to tell us (10 sec):" + link `localpulsehub.com/review/r/7Kd2` → Google review sheet → 5 stars.
- **Scene 3 — QR code (restaurant):** table card "Scan to review us" → camera scan line → banner "localpulsehub.com/review  Open" → Google review sheet → 5 stars.
- These lines mirror the app's real request templates — no company names, ever (generic "dentist", "plumber", "restaurant").
- **Tabs:** three small pills under the phone reading only `Email`, `WhatsApp`, `QR code` (compact, with an invisible larger hit area via `::after` ≥ 44px). The active pill follows the loop. Clicking a pill jumps all animations inside the phone to time `T = 0.8 + 5n` seconds (n = 0,1,2) using `phoneEl.getAnimations({ subtree: true })` and setting `currentTime`, so the chosen example replays from its start.
- **Pause button** (icon + accessible label "Pause animation"/"Play animation"): toggles a class that sets `animation-play-state: paused`. Also auto-pause on hover, on keyboard focus inside the phone, and when the phone is off-screen (IntersectionObserver).
- Reduced motion: show scene 1's final state (5-star posted), tabs switch statically between final states.

### B6. The pulse line + arrow (must be geometrically perfect)

The founder rejected earlier versions as "amateur". The current one is approved. Rules:
- Flat baseline, then three 45° segments: up `a`, down `a/2`, up `1.6a`; ends in a right-angle arrowhead.
- Drawn in **real pixel space**: the SVG `viewBox` is set from JS to the box's actual `W × H` (no `preserveAspectRatio` stretching, no `vector-effect: non-scaling-stroke` — that combination breaks the draw animation).
- It must never sit behind the phone and never be cropped.

Exact geometry (port this as-is, e.g. `components/pulse-line.tsx` with a `ResizeObserver` + `document.fonts.ready` re-measure):
```js
function geom(W, H, xs, a) {
  const by = H - 30, h = Math.max(12, Math.round(a * 0.34));
  xs = Math.max(0, Math.round(xs));
  const x1 = xs + a,       y1 = by - a;
  const x2 = x1 + a / 2,   y2 = y1 + a / 2;
  const x3 = x2 + 1.6 * a, y3 = y2 - 1.6 * a;
  return {
    line: `M0 ${by} H${xs} L${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`,
    head: `M${x3 - h} ${y3} H${x3} V${y3 + h}`,
  };
}
```
Placement:
- **Hero (side-by-side layout):** measure the right edge of the hero text column (all text-node rects + links/buttons) and the phone's left edge. `gap = phone.left - text.right`; `a = clamp(26, (gap - 40) / 3.1, 56)`; `xs = (text.right - box.left) + (gap - 3.1a) / 2`. So the climb sits centered in the gap.
- **Hero stacked (mobile, phone below text):** `a = 56`, `xs = W - 28 - 3.1a`.
- **Final CTA section:** `a = clamp(34, W * 0.04, 56)`, `xs = min(W * 0.62, W - 28 - 3.1a - 20)`.
- **Sub-page bands (pricing/blog/login):** same geometry, placed via `data-x`/`data-a` (see `.pulse-plain` in `assets/site.js`).
- Stroke: lime, ~3px, round caps/joins. Draws in with the `draw` reveal; an optional faint "beat" pass travels along it.

### B7. Page-by-page phases

Do one phase at a time. After each: lint + build, list URLs for the founder, stop and wait.

**Phase 0 — read & plan (no code changes)**
Read AGENTS.md, the Next docs you need, and all files in `../rebranding/`. Open each preview HTML in the browser (or read it) next to the matching app page. Reply with a short plan listing which files you'll touch per phase. Create the `rebrand` branch.

**Phase 1 — foundations**
Tokens in `app/globals.css`, fonts in `app/layout.tsx`, `Logo`/`LogoMark`, favicon/icons/OG image, shared buttons and motion wrappers in `components/motion/`. Check: `/` still works (it'll look half-done — that's expected).

**Phase 2 — homepage** (`app/page.tsx`, `components/sections/*`) in page order:
navbar (keep the real Product mega-menu/Resources dropdowns, hash-link behavior and mobile accordions — restyle them navy), hero (+ hero phone + pulse), testimonials band, simulator ("See how it works" — keep it a real working demo, restyle), features (Collect / Protect — Protect uses `signal` for the 1-star moment), ai-search (chat reveal), comparison (LPH column navy, table reveal), founding (live counter stays), pricing cards, FAQ (answers must stay in the HTML, CSS-hidden — SEO requirement), CTA (navy + pulse), footer. Check `/` at 1440, 1280, 768 and 390 wide.

**Phase 3 — marketing sub-pages**
`/pricing` (match `pricing.html`: navy band + pulse, plans, review-requests note, comparison, FAQ, sticky CTA), `/blog` (match `blog.html`: featured newest post with the "Competitor #1 vs Your business — Climbing" cover, list rows), the 3 blog articles (Read mode: white, comfortable measure ~68ch, Anton H1/H2, Archivo body, quote boxes/tables restyled), `/tools/google-review-reply-generator`, `/about`, `/contact`, `/privacy`, `/terms`, `/refund`.

**Phase 4 — auth**
`/login` (match `login.html`: split screen, navy art panel with waves + pulse, form on white), `/signup` (match `signup.html`, keep the founding note logic, the required consent checkbox and server action), `/forgot-password`, `/reset-password`, `/verify-email`, `/email-action`, `/auth/confirm` interstitial. Forms keep all real validation/actions; just restyle. Inputs: 48px tall, `line` border, navy focus ring, error text in a readable red (not `signal` — orange is reserved).

**Phase 5 — onboarding**
`/onboarding/billing`, `/onboarding/setup`, `/onboarding/verify-phone`. Calmer than marketing (Operate mode): white surfaces, navy headings, lime primary buttons, a simple step indicator.

**Phase 6 — app (dashboard, settings, billing, paywall)**
Operate mode = restraint: readability and scan speed beat expression. Navy sidebar with the logo, white content area, navy/ink text, lime only for primary actions and the active nav marker, `signal` only for 1-star/alert states. Minimal motion (fades ≤200ms, no scroll reveals). Keep every interaction identical.

**Phase 7 — ask the founder first**
- `/review/*` (the customer-facing gate) is shown to the business's customers. Ask whether it should carry LocalPulseHub styling or stay neutral.
- Email templates (`lib/email.ts`): review-request emails must stay deliberately plain (see AGENTS.md decision log — Gmail Promotions tab). Ask before touching any email.

**Phase 8 — docs**
Update the "Design system" section of `AGENTS.md` to the new brand and add a decision-log entry (date, what changed). Only after the founder approves.

### B8. Quality bar before saying a phase is done

- `npm run lint && npm run build` pass; `npm run test` still passes.
- No horizontal scroll at 390px. Tap targets ≥ 44px. Visible focus states. Text contrast ≥ 4.5:1 (lime is never text on white).
- No layout shift from fonts (next/font handles it) or from the hero phone (reserve its size).
- Reduced motion checked (emulate it in DevTools).
- `git diff --stat` reviewed: only styling/markup/component files changed; no copy, metadata, routes or logic changes. List anything that looks like a text change and explain it.
- Then stop and give the founder the URLs to check. Don't commit until they write "approved".
