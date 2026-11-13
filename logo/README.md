# LocalPulseHub logo kit

**Icon source of truth:** Figma file "LocalPulseHub — Favicon" (https://www.figma.com/design/y8AuflOF5f3zJCnpDHgtfx). `logo-mark.svg` and `logo-mark-small.svg` are exported from it; the PNG sizes and `favicon.ico` are rendered from those SVGs.

All logos are pure vectors (SVG). The arrow has three exact 45° strokes and a right-angle head, drawn on a 32×32 grid with a 2.6 stroke (3.4 in the 16/32px favicons so they stay crisp). The "LOCALPULSEHUB" letters are Anton turned into shapes, so no font is needed.

| File | What it is | Use it for |
|---|---|---|
| `logo-mark.svg` (`logo-mark-small.svg` for 16–32px) | **Logo mark / app icon**: lime square + navy arrow | favicon, app icon, social profile pictures |
| `logo-full-on-navy.svg` | **Full logo** (transparent), white text | website header, navy backgrounds |
| `logo-full-on-white.svg` | **Full logo** (transparent), navy text | documents, invoices, emails, white backgrounds |
| `logo-full-navy-bg.svg/.png` | Full logo with navy background + padding | sharing, banners |
| `logo-full-on-navy-small.svg`, `logo-full-on-white-small.svg` | **Full logo for small sizes** (3.0 arrow) | website header, footer, dashboard sidebar — anywhere the square is under ~48px |
| `logo-full-white-bg.svg/.png` | Full logo with white background + padding | sharing, documents |
| `logo-arrow-navy.svg`, `logo-arrow-lime.svg` | Arrow alone, no square | small accents, watermarks |
| `icon-16…1024.png`, `favicon.ico` | App icon PNG exports | favicon (16/32/48), Apple touch icon (180), PWA (192/512), app stores (1024) |

Colors: navy `#0B1B3A`, lime `#C8F135`.
**Size rule:** when the lime square is smaller than ~48px (headers, sidebars, favicons) use the `-small` full-logo files (3.0 arrow; the favicon uses 3.4); bigger than that, use the regular 2.6 files. Always let the arrow fill the square the way the SVGs draw it — never shrink it inside the square.

Rules: keep space around the logo equal to at least half the square's width; don't stretch, recolor, or add effects.
To edit in Figma or Canva: drag the SVG in, it stays editable as vectors.
