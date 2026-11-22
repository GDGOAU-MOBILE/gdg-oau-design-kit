# Pitch deck generator

Builds a GDGOAU partner pitch (PowerPoint, 16:9) from one JSON file. The design system lives in
`build.js`; every word, number and partner detail lives in the config.

## Use it

```bash
npm install
cp -R sample ../../partners/acme      # one folder per partner, outside the kit if you prefer
# edit ../../partners/acme/deck.config.json and drop in the partner's logo
node build.js ../../partners/acme/deck.config.json
```

The deck is written next to the config. Then export it to PDF with Google Sans installed
(see `references/pdf.md`) and check every slide.

## The config

| Key | What goes in it |
|---|---|
| `output` | File name of the PPTX |
| `organiser` | `name` and `short` for GDG on Campus OAU |
| `partner` | `name`, `short`, `color` (hex, no #), `tint`, `light`, `logo` (path relative to the config), optional `leader` and `product` |
| `event` | `name`, `date`, `dateShort`, `time`, `venue`, `students`, `companies` |
| `contact` | `name`, `role`, `lines` (label/value pairs; no personal phone numbers in shared files) |
| `slides` | Text for each slide: `cover`, `gap`, `event`, `room`, `why`, `invitation`, `product`, `benefits`, `ask`, `budget`, `close` |

Titles are arrays of runs: `[["Why "], ["{partner.name}", "partner"], [" fits this day"]]`. The second item
picks the colour of that run: `link`, `partner`, `red`, `blue`, `light` (product slide) or a hex value.

Placeholders like `{partner.name}`, `{event.students}`, `{leader.short}` and `{product.name}` are filled in
everywhere.

Optional slides:

- Leave out `partner.leader` or `slides.invitation` to drop the invitation slide.
- Leave out `partner.product` or `slides.product` to drop the product slide.
- Leave out `slides.budget` to drop the budget slide.

Icons are Material Design names from `react-icons/md`, for example `MdSchool`, `MdMic`, `MdWork`.

## Checks built in

- The build fails if the budget lines do not add up to 100.
- It warns when a title is longer than 42 characters (it will probably wrap).
- It fails on an unknown icon name.

Everything else (facts, tone, the partner's-eye review) is on you and the skill. Read
`references/slides.md` and `references/review.md` before you send anything.
