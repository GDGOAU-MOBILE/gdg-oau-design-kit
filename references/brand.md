# Brand

GDGOAU follows the Google Developer Groups On Campus brand guidelines
(goo.gle/on-campus-brand-guide) with a few house decisions on top. Where the two differ, this file wins
for GDGOAU work.

## Name

| Use | Write |
|---|---|
| Full name | Google Developer Groups on Campus Obafemi Awolowo University |
| Short name | GDG on Campus OAU |
| House short form (decks, socials) | GDGOAU |
| Hashtag | #GDGOnCampus |
| Organiser title | GDG on Campus Organizer, or the role (Club Lead, Programme Lead) |

Never call the group just "GDG". Never write "GDG OAU Chapter" or "GDSC OAU" (the old name).

## Colour

One colour dominates each surface. Supporting colours carry meaning (step numbers, card shadows).
A partner accent may appear only on the partner's own items (their name, their highlight row, their card
shadow). Never more than one partner accent per piece.

### Core (Google)

| Token | Hex | Use |
|---|---|---|
| `--gdg-blue` | `#4285F4` | Step 1, links in illustrations, the default card shadow |
| `--gdg-red` | `#EA4335` | Step 2, warm highlights |
| `--gdg-yellow` | `#FBBC04` | Step 3, stickers ("Our ask", "Top 3 win") |
| `--gdg-green` | `#34A853` | Step 4, "done", money and receipts |

The brand guide lists Yellow 600 as `#F9AB00`. GDGOAU's decks use `#FBBC04`. Use `#FBBC04` on screens.

### Text and ink

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#202124` | Body text, outlines, dark bars |
| `--ink-muted` | `#5F6368` | Secondary text, labels |
| `--link` | `#1A73E8` | The highlighted word in a title, mono labels, links |
| `--black-02` | `#1E1E1E` | Dark slide background |
| `--white` | `#FFFFFF` | Cards |
| `--off-white` | `#F0F0F0` | Neutral page background |

### Backgrounds (pastels)

| Token | Hex | Use |
|---|---|---|
| `--bg-blue` | `#C4ECF6` | Default content background |
| `--bg-yellow` | `#FFE7A5` | Numbers and "at a glance" slides, section breaks |
| `--bg-pink` | `#F8D8D8` | Closing slides, celebration |
| `--bg-green` | `#CCF6C5` | Success, results, recaps |
| `--chip` | `#E8F6FA` | Pills on white cards, contact boxes |

### Halftones (illustration only)

`#57CAFF` blue, `#5CDB6D` green, `#FFD427` yellow, `#FF7DAF` red. Use them inside illustrations and
patterns, never for text.

### Accessibility

Body text is `--ink` or `--ink-muted` on white or a pastel. White text only on `--ink`, `--black-02`, the
four core colours or a dark partner accent. Never put yellow text on a pastel. Highlighted title words use
`--link` (or the partner accent when the word is the partner's name).

## Typography

| Role | Font | Weight | Size (slides, 16:9 at 10 in wide) | Size (web) |
|---|---|---|---|---|
| Display / cover title | Google Sans | Bold | 36 pt | clamp(40px, 6vw, 72px) |
| Slide / section title | Google Sans | Bold | 28 pt | clamp(28px, 4vw, 44px) |
| Card heading | Google Sans | Bold | 13 to 18 pt | 18 to 22px |
| Body | Google Sans | Regular | 10 to 13.5 pt (never below 10) | 16 to 18px |
| Subtitle | Google Sans | Regular, `--ink-muted` | 13 pt | 18 to 20px |
| Label / kicker | Roboto Mono Medium (or Google Sans Mono) | Regular, uppercase, letter spacing 1 pt | 9 to 10 pt | 12 to 13px |
| Numbers in stat cards | Google Sans | Bold, core colour | 34 to 40 pt | 48 to 64px |

Rules:

- Titles are sentence case and never end with a full stop. One phrase in the title may be coloured
  `--link` (or the partner accent); never more than one.
- Mono is for short labels, times, commands and code. Never for paragraphs. Never for prices (Roboto Mono
  lacks the ₦ glyph).
- Left-align body text. Centre only cover titles and pill text.
- Google Sans is free on Google Fonts under the OFL. Install it before exporting a PDF, or the PDF will
  fall back to another font. See `pdf.md`.

## Spacing and shape (16:9 slides, 10 in × 5.625 in)

| Token | Value | Use |
|---|---|---|
| Outer margin | 0.5 in | Left, right and top of content |
| Title top | 0.85 in | Title box top edge |
| Subtitle top | 1.47 in | Directly under the title |
| Content top | 2.0 in | First card row |
| Content bottom | 4.75 in max | Last card edge, shadow included |
| Gap between cards | 0.25 in (columns of 3: 3.07 in pitch for 2.82 in cards) | |
| Card corner radius | 0.14 in | |
| Card outline | 2 pt `--ink` | |
| Card shadow | Same shape, offset 0.10 in right and 0.10 in down, filled with a core colour, 2 pt `--ink` outline | |
| Pill height | 0.30 to 0.42 in, fully rounded, 1.5 pt outline | |
| Dot (step number) | 0.38 to 0.42 in circle, 1.5 pt outline, white bold number (ink on yellow) | |

Web equivalents live in `tokens/tokens.css` (8px base grid, 24px card radius, 6px hard shadow).

## Logo

- Use `assets/brand/gdg-mark.png` (small) or `assets/brand/gdg-mark-large.png` (print and covers).
- Pair the mark with "GDG on Campus OAU" set in Google Sans Bold, or with the chapter lockup from the
  official guide when you have it.
- Clear space around the mark: at least the height of one of its chevrons.
- Do not recolour, outline, rotate, stretch or add effects to the mark.
- Content slides carry the GDG mark top right at x 8.88 in, y 0.40 in, 0.62 × 0.33 in. A partner mark,
  when present, sits to its left at the same height.

## Motifs and assets

| File | What it is | Use it for |
|---|---|---|
| `assets/brand/pattern-yellow.png` / `-blue` / `-pink` | Official GDG element patterns, 16:9 | Full-bleed behind a white cover or closing card |
| `assets/brand/frame-blue.png` / `-yellow` / `-pink` | Notched white frame with arrows and globe | Section breaks and "Part 2" slides |
| `assets/brand/elements.png` | Official line icons: asterisk, dots, arrow, brace, globe, slashes | Reference for drawing motifs, stickers |
| `assets/brand/sticker.png` | GDG die-cut sticker | Covers, swag mockups |
| `assets/brand/arrow-hand.png` | Hand-drawn arrow | Pointing at one thing, once per piece |
| `assets/campus/oau-gate.png` | Line drawing of BOOA, OAU | Campus and venue moments |

House motif: white cards with a thick ink outline and a hard offset shadow in a core colour. Repeat it
everywhere. Do not mix in soft drop shadows, gradients or glassmorphism.

## Partner accent

When a piece is for a partner, take one accent from their logo (for example a bank's brand colour), plus a
light tint of it for highlight rows. Use it for: their name in titles, their sticker on the cover, the
shadow of cards about them, and highlight rows that mention them. Everything else stays GDG.
