# Slides

Canvas: 16:9, 10 × 5.625 in. Deliver PPTX (editable) and PDF (fonts embedded) unless told otherwise.
Maximum 12 slides for a pitch. Shorter is better.

## Story for a partner pitch

A pitch is one argument. Each slide answers the question the previous one raised. The order and the
titles carry the flow; do not add connector bars, chapter numbers or "next" text.

| # | Slide | The question it answers | Background |
|---|---|---|---|
| 1 | Cover | Who is this from, for whom, about what? | Yellow pattern + white card |
| 2 | The gap | Why does this event need to exist? | Blue |
| 3 | The event | What happens on the day? | Blue |
| 4 | Who is in the room | How big is it, and can GDGOAU deliver? | Yellow |
| 5 | Why this partner | Why them, specifically? (three researched reasons) | Blue |
| 6 | The invitation | (Only with a personal link) a respectful invitation to a leader | Blue |
| 7 | The product moment | (Only with a product) how the day features it, voluntarily for students | Dark `#1E1E1E` |
| 8 | What the partner gets | Benefits, honestly worded | Blue |
| 9 | What it takes | The ask and alternatives, plus how payment works | Blue |
| 10 | Where the money goes | The budget split from the source document | Blue |
| 11 | Let's build this together | Three steps written as offers, and the contact | Pink pattern + white card |

Drop slides 6 and 7 when they do not apply. Never pad to reach a count.

## Slide frame

- Content slides: pastel background, GDG mark top right (x 8.88, y 0.40, 0.62 × 0.33 in), partner mark to
  its left when there is a partner.
- Title at y 0.85 in, 28 pt bold, one highlighted phrase. Subtitle at y 1.47 in, 13 pt muted.
- Content from y 2.0 in to at most y 4.75 in.
- No footer, no page numbers, no slide-wide stripes.

## Layout patterns that work

- Two cards facing each other with an icon dot between (the gap).
- Illustration card on the left, three numbered rows on the right, chips underneath (the event).
- Three stat cards over the organiser strip with two notched photos (who is in the room).
- Three equal cards with icon dots (why this partner).
- Schedule card with the partner's row highlighted, pills and a paragraph on the right (invitation).
- Four step cards on a dark slide with the product's app icon by the title (product moment).
- One large card holding six icon rows in two columns (benefits).
- Three option cards with a sticker on the recommended one, and a payment strip below (the ask).
- Chart card on the left, total and receipts cards on the right (money).

## Brand elements on slides

Cards alone look flat. Every deck uses: an official pattern on the cover and closing, real GDGOAU photos in
notched frames at least once, and one small motif on two or three content slides (never more than one per
slide). See "Using motifs" in `brand.md`.

## Build

Use `templates/pitch-deck/` for partner pitches: copy `sample/`, fill in `deck.config.json` and the
partner's logo, run `npm install` then `node build.js path/to/deck.config.json`. See the template README.

For other decks, build with pptxgenjs (or python-pptx) following `components.md` exactly.

## QA (MUST)

1. Export to PDF with Google Sans installed (see `pdf.md`), then to images at 100 to 110 dpi.
2. Look at every slide at full size. Check: text overflow, a title wrapping to two lines, a card heading
   wrapping into its body, collisions with the logo row, empty bands at the bottom, misaligned rows.
3. Extract all text and run the checks in `writing.md`.
4. Run `review.md`.
5. Re-render after every fix.
