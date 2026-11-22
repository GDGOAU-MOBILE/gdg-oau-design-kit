# Web

Import `tokens/tokens.css` (or copy its custom properties) and build from the component classes in
`templates/web/index.html`. Never hard-code a colour, radius or shadow that a token already covers.

## Layout

- Max content width 1120px, side gutter 16px on phones and 24px from 768px up.
- Section padding 72px top and bottom on desktop, 48px on phones.
- 8px spacing grid. Card padding 24px. Gaps 16px (phones) and 24px (desktop).
- No horizontal scroll at 360px wide.

## Type

- gdgoau.com currently uses **Figtree** (600 to 800) for headings, **Plus Jakarta Sans** for body text and
  **Google Sans Mono** for labels. Match the live site when you work in its repo. New standalone pages may
  use Google Sans via `var(--font-sans)`.
- `font-family: var(--font-sans)` for everything; `var(--font-mono)` for labels and code.
- Load Google Sans from Google Fonts (`family=Google+Sans:wght@400;500;700`) and Google Sans Code or Roboto
  Mono for labels.
- Headings sentence case, one highlighted phrase in `var(--link)`.

## What the live site does (copy these patterns)

- Notched photo frames with the GDG mark in the top-left notch, sitting next to a star and a filled pill.
- Mono kicker pills ("WHAT WE DO", "EVENTS") with a pastel fill and an ink outline, above section titles.
- Section titles with a full stop on the site ("Learn it. Build it. Share it."): allowed on the web only.
- Notched panel cards (`assets/motifs/panel.svg` shape) holding one motif in the notch (arches, slashes,
  arrow, globe).
- A dark band with a thin arrow and outlined slashes between sections.
- Community cards slightly rotated and pinned with a coloured tab.
- Round yellow arrow buttons with ink outlines for carousels.

## Components

`.gdg-card` (outline + hard offset shadow), `.gdg-pill`, `.gdg-sticker`, `.gdg-dot`, `.gdg-label`,
`.gdg-codebar`, `.gdg-section--blue|yellow|pink|green|dark`. See the template for markup.

## Interaction

- Cards lift on hover: translate(-2px, -2px) and the shadow grows to 8px. 150ms ease-out.
- Respect `prefers-reduced-motion`: no movement.
- Remove the mobile tap highlight on interactive cards (`-webkit-tap-highlight-color: transparent`), but
  keep a visible `:focus-visible` outline (3px `var(--link)`).
- Buttons are pills: filled `var(--ink)` with white text (primary), white with ink outline (secondary).

## Accessibility

- Contrast AA at minimum. Body text never lighter than `var(--ink-muted)` on white or pastel.
- Every image has alt text; decorative patterns use `alt=""`.
- Hit targets at least 44 × 44px.

## Dark mode

Pages are light by default. If a page supports dark mode, the background becomes `#1E1E1E`, cards stay
white with ink outlines, and pastel sections become `#202124` with the core colours as accents.
