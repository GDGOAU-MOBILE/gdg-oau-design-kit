# Components

Exact specs. Slide sizes are inches on a 10 × 5.625 in canvas. Web sizes are in `tokens/tokens.css`.
Every component uses an ink outline. If you cannot see the outline, it is wrong.

## Card (the house motif)

- White rounded rectangle, radius 0.14 in, outline 2 pt `#202124`.
- Hard shadow: the same rounded rectangle drawn first, offset +0.10 in on x and y, filled with one core
  colour (or the partner accent when the card is about the partner), outline 2 pt `#202124`.
- Inner padding 0.18 to 0.25 in.
- Cards in a row share the same width, height and top edge.
- Rotate shadow colours across a row: blue, red, yellow, green. One card in the row may use the partner
  accent instead.
- A card without a shadow is allowed for wide info strips (details, payment terms, organiser).

Web: `.gdg-card` in `templates/web/index.html`.

## Pill

- Fully rounded rectangle, height 0.30 to 0.42 in, outline 1.5 pt ink.
- Fill: `#E8F6FA` with ink text for facts (date, venue, chips); a core colour or partner accent with white
  bold text for roles ("Patron of the Day", "Keynote speaker").
- Text 9.5 to 12 pt bold, centred.

## Sticker

A pill rotated 5 to 6 degrees that overlaps a card's top edge. Yellow with ink text ("Our ask",
"Top 3 win") or the partner accent with white text ("For <Partner>"). One sticker per slide at most.

## Numbered dot

- Circle 0.38 to 0.42 in, outline 1.5 pt ink, filled in step order: blue, red, yellow, green.
- White bold number, ink on yellow.
- Used for real sequences only (steps, ranked items). Not for decoration and not for chapter numbers.

## Icon dot

- Circle 0.40 to 0.60 in, core colour fill, 1.5 pt ink outline.
- Material Design icon inside at about 56% of the diameter, white (ink on yellow).
- Icons come from Material Design (react-icons/md or Material Symbols). One icon style per piece.

## Stat card

- Card with the number at 34 to 40 pt bold in a core colour, a bold label underneath (13 pt), and a muted
  detail line (10.5 pt).
- Three or four across. Numbers must come from a source.

## Mono label (kicker)

Uppercase, Roboto Mono Medium, 9 to 10 pt, letter spacing 1 pt, `#5F6368` (or `#1A73E8` when it labels a
highlighted block). Use sparingly: one per block. Never stack two labels.

## Dark code bar

Rounded rectangle filled `#202124`, text in mono, white, with a green `$` prompt. Only for real commands
or genuinely technical content. Never as a decorative tagline.

## Highlight row

Inside a schedule or list, the row about the partner gets a tint of the partner accent as fill, a 1.25 pt
partner-accent outline, and bold text in the accent.

## Chart

Native, editable charts (PowerPoint `addChart`, or SVG on the web). Single series in `#4285F4`, data
labels on, gridlines off, value axis hidden, category labels 8.5 to 9 pt ink. Sit charts inside a card.

## Full-bleed cover

Official pattern image across the whole slide, a large white card on top (shadow in ink), logos top left,
mono kicker, 36 pt two-line title, a one-line subtitle, fact pills, and an illustration on the right.

## Closing slide

Pink pattern full bleed, white card, "Let's build this together" (or a similar invitation), three
numbered steps written as offers, and a contact box in `#E8F6FA`.
