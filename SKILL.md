---
name: gdg-oau-design-kit
description: |
  The official design and writing system of GDG on Campus OAU (GDGOAU). Use it for anything GDGOAU makes
  that people will see: slide decks, sponsor and partner pitches, PDFs and proposals, websites and landing
  pages, social posts, flyers, banners and event materials. It covers the brand colours, typography,
  spacing, components, assets, the story structure for pitches, the humanizer writing rules and a
  partner's-eye review. Trigger on "GDGOAU", "GDG OAU", "GDG on Campus OAU", "our design", "our slides",
  "pitch deck for <company>", "sponsor deck", "partnership proposal" or any request to make something
  in the GDGOAU style.
license: MIT
metadata:
  version: "1.1.0"
  owner: GDGOAU-MOBILE
---

# GDGOAU design kit

This skill is strict on purpose. GDGOAU's materials go to banks, companies, schools and students, so every
piece has to look like it came from one team and read like a person wrote it. Follow every MUST below.
When a rule here conflicts with a general habit or another skill's default, this skill wins, unless the
user overrides it in this conversation.

## Files in this skill

| File | Read it when |
|---|---|
| `references/brand.md` | Always, before you design anything. Colours, type, spacing, logo rules, motifs. |
| `references/components.md` | Before you place any element. Exact specs for cards, pills, dots, stat cards, code bars, stickers. |
| `references/writing.md` | Before you write any word. House voice, the respectful-ask rule, banned patterns. |
| `references/humanizer.md` | Before you finish any text. The full humanizer (vendored, MIT). |
| `references/slides.md` | For decks, including sponsor pitches. Story structure, slide layouts, QA. |
| `references/pdf.md` | For proposals, reports and anything printed or exported to PDF. |
| `references/web.md` | For websites, landing pages and web components. |
| `references/social.md` | For flyers, social posts, banners and badges. |
| `references/review.md` | Before you deliver. The partner's-eye review. |
| `references/questions.md` | At the start. The intake questions you must ask. |
| `tokens/tokens.css`, `tokens/tokens.json` | The design tokens. Use them; never retype values. |
| `assets/` | Official brand art (patterns, banners, badges), website motifs, real GDGOAU photos and campus art. See `brand.md` for what each file is for and the motif rules. |
| `templates/pitch-deck/` | A config-driven PowerPoint generator for partner pitches. |
| `templates/web/` | A starter page wired to the tokens and components. |

## The workflow (MUST, in this order)

1. **Ask before you make.** Run the intake in `references/questions.md`. Use your question tool if you have
   one (for example AskUserQuestion), otherwise ask in plain text and wait. Do not start designing until
   the required answers are in. If the user has already answered something in the conversation, do not ask
   it again.
2. **Collect the facts.** Pull numbers, dates, names, prices and terms only from what the user gave you
   (documents, chats, links). Write down where each fact came from. Never invent a number, a quote, a
   partner, a statistic or a person's title. If two sources disagree, stop and ask which one wins.
3. **Research the reader** when the piece is for a named company or person: their products, their public
   programmes, their leaders' public profiles. Use only what reputable sources state, and keep the source
   links in speaker notes or a sources list. Confirm any personal detail (such as where a leader studied)
   with at least one named source.
4. **Plan the story before the layout.** For pitches, use the structure in `slides.md`. Show the user the
   plan (one line per slide or section) when the piece is longer than five pages or slides.
5. **Build with the system.** Tokens from `tokens/`, components from `components.md`, assets from `assets/`.
   No off-palette colours except one partner accent (see `brand.md`).
6. **Write, then humanize.** Draft the text, then run every line through `humanizer.md` and `writing.md`.
7. **Render and look.** Export to images (or open the page) and inspect every page at full size. Fix
   overflow, wrapping, collisions and empty gaps. Re-render after each fix.
8. **Review as the reader.** Run `review.md`: read the whole thing as the partner, the student or the
   lecturer who receives it, find what would annoy, confuse or embarrass them, and fix it.
9. **Deliver** in the format asked for (PPTX and PDF for decks unless told otherwise), plus a short list of
   facts the team still has to confirm.

## Hard rules (MUST NOT)

These come from real feedback on GDGOAU decks. Each one has cost a review round before.

- No chapter trackers or numbering such as "01 THE GAP / 02 THE FAIR". It reads as AI-made.
- No "NEXT →" bars, arrows-as-decoration or "Here is what comes next" connector strips.
- No accent lines under titles and no coloured stripes down the side of cards or slides.
- No flat decks. Every deck uses an official pattern on the cover and closing, real GDGOAU photos in notched
  frames at least once, and one small motif on two or three content slides (never more than one per slide).
- No captions that repeat what the page already says (for example a venue label under a venue drawing when
  the venue is already in a pill).
- No commands to the partner. Ask, invite, offer: "We would be honoured to…", "If you would like…",
  "With your support…". Never "Your team sets up…", "Your staff open accounts…", "Confirm by…".
- No familiar or blunt references to senior people ("your MD", "he will"). Use their title and name,
  and conditional wording until they accept ("If Mrs Example accepts our invitation…").
- Never present an invitation as confirmed. Label it "Proposed".
- No overpromising. "Sign-ups from 800+ students", not "800+ new customers".
- Never make sign-up, purchase or data sharing a condition of attending. Say it stays the student's choice.
- Never collect or show bank details, account numbers or personal phone numbers in public materials.
- Numbers must agree everywhere. If a cost appears twice it must match; if a budget split exists, every
  line item you mention must fit inside it.
- No em dashes or en dashes in prose. No "not X but Y", no triads for rhythm, no "Let's dive in".
- No emojis in materials unless the user asks.
- No partner trademarks inside this kit. Partner logos live in the partner's own
  folder and are used only in that partner's materials.

## Deliverable checklist

Before you say you are done, confirm each of these and report anything you could not check:

- [ ] Every intake question answered or explicitly waived by the user.
- [ ] Every fact traced to a source the user gave or a named public source.
- [ ] Only tokens and the one partner accent used for colour; Google Sans and the mono face for type.
- [ ] Rendered and inspected at full size; no overflow, clipped text, collisions or orphaned words.
- [ ] Humanizer pass done; no dashes, no banned patterns, no AI tells.
- [ ] Partner's-eye review done and fixes applied.
- [ ] PPTX and PDF (or the requested formats) delivered, with fonts embedded in the PDF.
- [ ] A short list of open items for the team to confirm.
