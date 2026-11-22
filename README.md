<p align="center">
  <img src="assets/brand/gdg-mark-large.png" alt="Google Developer Groups mark" width="140" />
</p>

<h1 align="center">GDGOAU design kit</h1>

<p align="center">
  The design and writing system of <strong>GDG on Campus Obafemi Awolowo University</strong>, packaged as an
  agent skill. Give it to Claude Code (or any agent that reads skills) and everything it makes for GDGOAU
  (slides, sponsor pitches, PDFs, websites, social posts) looks like one team made it and reads like a
  person wrote it.
</p>

<p align="center">
  <img src="docs/previews/slide-01.png" alt="Sample pitch deck cover built with the kit" width="720" />
</p>

---

## Contents

- [Install](#install)
- [What the skill does](#what-the-skill-does)
- [Brand at a glance](#brand-at-a-glance)
- [Components](#components)
- [Writing rules and the humanizer](#writing-rules-and-the-humanizer)
- [Pitch deck template](#pitch-deck-template)
- [Web starter](#web-starter)
- [Assets](#assets)
- [Repository layout](#repository-layout)
- [Contributing](#contributing)
- [Credits and licenses](#credits-and-licenses)

## Install

You need Node.js 18 or newer.

**For you, in every project (recommended):**

```bash
npx github:GDGOAU-MOBILE/gdg-oau-design-kit
```

This copies the skill to `~/.claude/skills/gdg-oau-design-kit`. Restart Claude Code and it is available.

**Only for the current project** (commit it so your team gets it too):

```bash
npx github:GDGOAU-MOBILE/gdg-oau-design-kit --project
```

**For another agent** that reads skills from a different folder:

```bash
npx github:GDGOAU-MOBILE/gdg-oau-design-kit --dir path/to/skills
```

Run the same command again to update. Use `--dry-run` to see what would be copied, and `--help` for all
options. If you prefer, clone the repo and copy the folder into your skills directory by hand.

**Then try it:**

> Make a GDGOAU pitch deck for Acme Bank for our Career Fair. Here is our proposal PDF and the chat.

## What the skill does

The skill is deliberately strict. Every rule exists because a real GDGOAU deck needed a review round to fix
it.

1. **Asks before it makes.** It runs an intake: what you are making, who reads it, the source documents, the
   partner, the ask, the deadline. It will not start designing on guesses.
2. **Uses only sourced facts.** Numbers, dates, prices and names come from your documents or named public
   sources. When two sources disagree it stops and asks.
3. **Researches the partner** (their products, programmes, leaders' public profiles) and keeps the sources
   in the speaker notes.
4. **Plans the story first.** Partner pitches follow a fixed argument: the gap, the event, who is in the
   room, why this partner, the invitation, the product moment, benefits, the ask, where the money goes, and
   the close.
5. **Builds with the system.** Tokens, components and official assets only.
6. **Humanizes every line** with the full humanizer plus GDGOAU's house rules.
7. **Renders and inspects** every page at full size and fixes overflow and collisions.
8. **Reviews as the reader.** It reads the piece as the partner's sponsorship manager, finance lead and
   compliance officer, and fixes anything that could annoy or worry them.
9. **Delivers PPTX and PDF** (fonts embedded) with a list of facts still to confirm.

Some of the hard rules it enforces:

- No "01 / 02 / 03" chapter trackers, no "NEXT →" bars, no accent lines under titles.
- No commands to partners. It asks, invites and offers.
- Senior people get their title and surname, and invitations are labelled "Proposed" until accepted.
- No overpromising, and partner sign-ups are always the student's choice.
- Numbers must agree across every page.
- No dashes, no "not X but Y", no triads for rhythm, no emojis in partner materials.

## Brand at a glance

### Colour

| | Token | Hex | Use |
|---|---|---|---|
| <img src="docs/swatches/gdg-blue.png" width="24" /> | `--gdg-blue` | `#4285F4` | Step 1, default card shadow |
| <img src="docs/swatches/gdg-red.png" width="24" /> | `--gdg-red` | `#EA4335` | Step 2 |
| <img src="docs/swatches/gdg-yellow.png" width="24" /> | `--gdg-yellow` | `#FBBC04` | Step 3, stickers |
| <img src="docs/swatches/gdg-green.png" width="24" /> | `--gdg-green` | `#34A853` | Step 4, money and receipts |
| <img src="docs/swatches/ink.png" width="24" /> | `--ink` | `#202124` | Text, outlines, dark bars |
| <img src="docs/swatches/ink-muted.png" width="24" /> | `--ink-muted` | `#5F6368` | Secondary text, labels |
| <img src="docs/swatches/link.png" width="24" /> | `--link` | `#1A73E8` | The highlighted word in a title |
| <img src="docs/swatches/black-02.png" width="24" /> | `--black-02` | `#1E1E1E` | Dark slides |
| <img src="docs/swatches/bg-blue.png" width="24" /> | `--bg-blue` | `#C4ECF6` | Default content background |
| <img src="docs/swatches/bg-yellow.png" width="24" /> | `--bg-yellow` | `#FFE7A5` | Numbers, section breaks |
| <img src="docs/swatches/bg-pink.png" width="24" /> | `--bg-pink` | `#F8D8D8` | Closing slides |
| <img src="docs/swatches/bg-green.png" width="24" /> | `--bg-green` | `#CCF6C5` | Results, recaps |
| <img src="docs/swatches/chip.png" width="24" /> | `--chip` | `#E8F6FA` | Pills, contact boxes |
| <img src="docs/swatches/off-white.png" width="24" /> | `--off-white` | `#F0F0F0` | Neutral page background |

One partner accent is allowed per piece, only on items about that partner.

### Typography

| Role | Font | Slides | Web |
|---|---|---|---|
| Cover title | Google Sans Bold | 36 pt | clamp(40px, 6vw, 72px) |
| Title | Google Sans Bold | 28 pt | clamp(28px, 4vw, 44px) |
| Body | Google Sans Regular | 10 to 13.5 pt | 16 to 18px |
| Label | Roboto Mono Medium, uppercase | 9 to 10 pt | 12px |

Titles are sentence case, never end in a full stop, and colour one phrase only.

### Spacing (16:9 slides)

Margins 0.5 in. Title at 0.85 in, subtitle at 1.47 in, content from 2.0 in to 4.75 in. Cards have a 0.14 in
radius, a 2 pt ink outline and a hard 0.10 in offset shadow in a core colour. The web uses an 8px grid,
24px card radius and a 6px hard shadow. Full values: [`tokens/tokens.json`](tokens/tokens.json) and
[`tokens/tokens.css`](tokens/tokens.css).

## Components

<p align="center">
  <img src="docs/previews/slide-03.png" alt="Event slide: illustration card, numbered rows and chips" width="49%" />
  <img src="docs/previews/slide-05.png" alt="Why-this-partner slide: three cards with icon dots" width="49%" />
</p>
<p align="center">
  <img src="docs/previews/slide-07.png" alt="Product slide on a dark background with step cards" width="49%" />
  <img src="docs/previews/slide-09.png" alt="The ask: three option cards with a sticker and a payment strip" width="49%" />
</p>

| Component | Spec |
|---|---|
| Card | White, 2 pt ink outline, hard offset shadow in a core colour |
| Pill | Fully rounded, 1.5 pt outline, chip fill for facts, colour fill for roles |
| Sticker | A pill rotated 5 to 6 degrees, overlapping a card edge, one per slide |
| Numbered dot | Circle in step order blue, red, yellow, green, for real sequences only |
| Icon dot | Core colour circle with a white Material icon |
| Stat card | Big coloured number, bold label, muted detail |
| Mono label | Uppercase kicker, one per block |
| Highlight row | Partner tint fill and partner outline in a schedule |
| Chart | Native, editable, single series in blue, labels on, gridlines off |

Details: [`references/components.md`](references/components.md).

## Writing rules and the humanizer

Every word goes through two layers:

1. **[The humanizer](references/humanizer.md)** by [blader](https://github.com/blader/humanizer), vendored in
   full (MIT). It removes the patterns that make text read as AI-written: staged contrasts, one-line
   closers, forced triads, dashes, inflated claims, sales language and more.
2. **[GDGOAU house rules](references/writing.md)** on top: plain and specific voice, British/Nigerian
   spelling, naira formatting, the respectful-ask rule, honesty rules and a list of banned words.

The respectful-ask rule in one table:

| Never | Write instead |
|---|---|
| Confirm by 18 December. | Partners who confirm by 18 December get first choice of booth position. |
| Your team sets up its booth. | If you would like a booth, we would share the details with the agreement. |
| Your MD opens the day. | If Mrs Example accepts our invitation, her keynote would open the day. |

## Pitch deck template

A config-driven generator for partner pitches: one JSON file per partner, no code changes.

```bash
cd ~/.claude/skills/gdg-oau-design-kit/templates/pitch-deck
npm install
node build.js sample/deck.config.json
```

It writes an editable PowerPoint with native charts, sections and speaker notes. It fails if the budget does
not add up to 100% and warns when a title will probably wrap. See the
[template README](templates/pitch-deck/README.md) for the config reference.

The sample partner, Northwind Bank, is fictional:

<p align="center">
  <img src="docs/previews/slide-02.png" alt="The gap slide" width="32%" />
  <img src="docs/previews/slide-04.png" alt="Who is in the room slide" width="32%" />
  <img src="docs/previews/slide-06.png" alt="Invitation slide" width="32%" />
</p>
<p align="center">
  <img src="docs/previews/slide-08.png" alt="Benefits slide" width="32%" />
  <img src="docs/previews/slide-10.png" alt="Where the money goes slide" width="32%" />
  <img src="docs/previews/slide-11.png" alt="Closing slide" width="32%" />
</p>

To export a PDF with the right fonts, follow [`references/pdf.md`](references/pdf.md).

## Web starter

[`templates/web/index.html`](templates/web/index.html) is a single page wired to `tokens/tokens.css`, with
cards, pills, stickers, numbered dots and a code bar, hover and focus states, and reduced-motion support.
Rules for pages live in [`references/web.md`](references/web.md).

## Assets

Everything below comes from the official GDG On Campus brand guide or from gdgoau.com.

### Patterns, banners and badges (brand guide)

<p align="center">
  <img src="assets/brand/pattern-blue.png" alt="Blue brand pattern" width="32%" />
  <img src="assets/brand/pattern-yellow.png" alt="Yellow brand pattern" width="32%" />
  <img src="assets/brand/pattern-pink.png" alt="Pink brand pattern" width="32%" />
</p>
<p align="center">
  <img src="assets/brand/banners/banner-blue.png" alt="Blue banner" width="24%" />
  <img src="assets/brand/banners/banner-pink.png" alt="Pink banner" width="24%" />
  <img src="assets/brand/banners/banner-green.png" alt="Green banner" width="24%" />
  <img src="assets/brand/banners/banner-yellow.png" alt="Yellow banner" width="24%" />
</p>
<p align="center">
  <img src="assets/brand/banners/strip-blue.png" alt="Blue strip" width="32%" />
  <img src="assets/brand/banners/strip-pink.png" alt="Pink strip" width="32%" />
  <img src="assets/brand/banners/strip-yellow.png" alt="Yellow strip" width="32%" />
</p>
<p align="center">
  <img src="assets/brand/element-art-blue.png" alt="Element art" width="30%" />
  <img src="assets/brand/badges/badge-globe.png" alt="Globe badge" width="18%" />
  <img src="assets/brand/badges/badge-quote.png" alt="Quote badge" width="18%" />
  <img src="assets/brand/badges/badge-people.png" alt="People badge" width="18%" />
</p>

### Motifs (gdgoau.com)

Vector SVGs from the website, drawn from the GDG Figma UI kit: star, arches, slashes, globe, three circles,
brace, arrows, pill, panel and the notched photo frame.

<p align="center"><img src="docs/motifs.png" alt="Website motifs" width="720" /></p>

### Real photos in the notched frame

<p align="center"><img src="docs/photos.png" alt="GDGOAU photos in notched frames" width="600" /></p>

| Folder | What is in it |
|---|---|
| `assets/brand/` | GDG mark (small and large), patterns, frames, elements sheet, sticker, hand-drawn arrow |
| `assets/brand/banners/` | Wide banners and thin strips in four colours |
| `assets/brand/badges/` | Round profile badges: globe, quote, people |
| `assets/motifs/` | Website SVG motifs, PNG versions of star/arches/slashes/globe, `frame-window.svg` |
| `assets/photos/` | GDGOAU event photos (`class`, `team`, `code`) and notched-frame versions |
| `assets/campus/oau-gate.png` | Line drawing of an OAU landmark |

How to use them (one motif per slide, notched frames for photos, patterns only behind cards) is in
[`references/brand.md`](references/brand.md#using-motifs-strict). Partner logos never go in this repo.

## Repository layout

```
gdg-oau-design-kit/
├── SKILL.md                 # the skill: workflow, hard rules, checklist
├── AGENTS.md                # pointer for agents that read AGENTS.md
├── references/
│   ├── brand.md             # colour, type, spacing, logo, motifs, asset rules
│   ├── components.md        # exact component specs
│   ├── writing.md           # house voice and rules
│   ├── humanizer.md         # vendored humanizer (MIT)
│   ├── questions.md         # intake questions
│   ├── slides.md            # deck story and layouts
│   ├── pdf.md               # fonts and document specs
│   ├── web.md               # pages and components
│   ├── social.md            # posts, flyers, banners
│   └── review.md            # partner's-eye review
├── tokens/                  # tokens.css and tokens.json
├── assets/                  # brand, motifs, photos and campus art
├── templates/
│   ├── pitch-deck/          # config-driven PPTX generator
│   └── web/                 # starter page
├── docs/                    # README images
└── bin/install.js           # the npx installer
```

## Contributing

1. Open an issue or a pull request against `main`.
2. When a review round finds a new problem, add the rule to `SKILL.md` (hard rules) or the matching
   reference, with the reason.
3. Re-render `docs/previews/` from the sample config if you change the template.
4. Never commit partner logos, budgets, phone numbers or other private details.

## Credits and licenses

- GDGOAU code and text: [MIT](LICENSE).
- Humanizer: © 2025 Siqi Chen, MIT, from [blader/humanizer](https://github.com/blader/humanizer).
- Google Developer Groups marks and patterns belong to Google and are used under the GDG On Campus brand
  guidelines. See [NOTICE.md](NOTICE.md).
- Google Sans and Roboto Mono are not bundled; get them from Google Fonts (SIL Open Font License).

Made by GDG on Campus OAU.
