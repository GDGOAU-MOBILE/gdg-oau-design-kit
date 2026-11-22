#!/usr/bin/env node
// GDGOAU partner pitch deck generator.
// Usage: node build.js path/to/deck.config.json
// Every word, number and partner detail lives in the config. This file only holds the design system.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const RDS = require("react-dom/server");
const md = require("react-icons/md");

const cfgPath = path.resolve(process.argv[2] || path.join(__dirname, "sample", "deck.config.json"));
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const cfgDir = path.dirname(cfgPath);
const KIT = path.resolve(__dirname, "..", "..");
const brand = (f) => path.join(KIT, "assets", "brand", f);
const campus = (f) => path.join(KIT, "assets", "campus", f);
const local = (f) => path.resolve(cfgDir, f);

const C = {
  ink: "202124", grey: "5F6368", white: "FFFFFF",
  blue: "4285F4", red: "EA4335", yellow: "FBBC04", green: "34A853",
  link: "1A73E8", bgBlue: "C4ECF6", bgYellow: "FFE7A5", chip: "E8F6FA", dark: "1E1E1E",
};
const STEP = [C.blue, C.red, C.yellow, C.green];
const FONT = "Google Sans";
const MONO = "Roboto Mono Medium";

const partner = cfg.partner;
const P = partner.color;
const ev = cfg.event;
const S = cfg.slides;
const colorOf = (name) => (name === "partner" ? P : C[name] || name);
const fill = (str) => String(str).replace(/\{(\w+)\.(\w+)\}/g, (_, a, b) => {
  const src = { partner, event: ev, leader: partner.leader || {}, product: partner.product || {} }[a];
  return src && src[b] !== undefined ? src[b] : `{${a}.${b}}`;
});
// Title parts: [["text"], ["highlight", "link" | "partner" | hex]]
const parts = (arr, base = C.ink) => arr.map(([t, col]) => ({ text: fill(t), options: { color: col ? colorOf(col) : base } }));

async function icon(name, color) {
  if (!md[name]) throw new Error(`Unknown Material icon "${name}" (use react-icons/md names, e.g. MdSchool)`);
  const svg = RDS.renderToStaticMarkup(React.createElement(md[name], { color: "#" + color, size: 256 }));
  return "image/png;base64," + (await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer()).toString("base64");
}
async function imgRatio(file) { const m = await sharp(file).metadata(); return m.width / m.height; }

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = fill(cfg.title || `${ev.name}: a proposal for ${partner.name}`);
  pres.author = cfg.organiser.name;
  pres.company = cfg.organiser.name.replace(/&/g, "&amp;");
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

  const logoFile = partner.logo ? local(partner.logo) : null;
  const logoR = logoFile ? await imgRatio(logoFile) : 1;
  const header = [{ image: { path: brand("gdg-mark.png"), x: 8.88, y: 0.4, w: 0.62, h: 0.33 } }];
  if (logoFile) header.push({ image: { path: logoFile, x: 8.8 - 0.31 * logoR - 0.04, y: 0.41, w: 0.31 * logoR, h: 0.31 } });
  pres.defineSlideMaster({ title: "Content blue", background: { color: C.bgBlue }, objects: header });
  pres.defineSlideMaster({ title: "Content yellow", background: { color: C.bgYellow }, objects: header });
  pres.defineSlideMaster({ title: "Content dark", background: { color: C.dark }, objects: header });
  pres.defineSlideMaster({ title: "Full bleed", background: { color: C.white }, objects: [] });

  // ---------- components (see references/components.md) ----------
  const T = (s, text, o) => s.addText(typeof text === "string" ? fill(text) : text, { fontFace: FONT, color: C.ink, margin: 0, valign: "top", isTextBox: true, ...o });
  const card = (s, x, y, w, h, shadow, name, bg = C.white, r = 0.14) => {
    if (shadow) s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.1, y: y + 0.1, w, h, rectRadius: r, fill: { color: shadow }, line: { color: C.ink, width: 2 }, objectName: "Shadow " + name });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: r, fill: { color: bg }, line: { color: C.ink, width: 2 }, objectName: "Card " + name });
  };
  const pill = (s, x, y, w, h, text, bg, color = C.white, o = {}) => {
    const rot = o.rotate ? { rotate: o.rotate } : {};
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: { color: bg }, line: { color: C.ink, width: 1.5 }, objectName: "Pill " + text, ...rot });
    T(s, text, { x, y, w, h, fontSize: o.size || 11, bold: true, color, align: "center", valign: "middle", ...rot });
  };
  const dot = (s, x, y, d, bg, lbl, size = 12) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { color: C.ink, width: 1.5 } });
    if (lbl !== undefined) T(s, String(lbl), { x, y, w: d, h: d, fontSize: size, bold: true, color: bg === C.yellow ? C.ink : C.white, align: "center", valign: "middle" });
  };
  const iconDot = async (s, x, y, d, bg, name) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { color: C.ink, width: 1.5 } });
    const pad = d * 0.22;
    s.addImage({ data: await icon(name, bg === C.yellow ? C.ink : C.white), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
  };
  const title = (s, arr, o = {}) => {
    const len = parts(arr).map((r) => r.text).join("").length;
    if (len > 42) console.warn(`warning: title "${parts(arr).map((r) => r.text).join("")}" is ${len} characters and may wrap; keep titles to 42 or fewer.`);
    return T(s, parts(arr, o.color || C.ink), { x: 0.5, y: 0.85, w: 7.7, h: 0.6, fontSize: 28, bold: true, valign: "middle", ...o });
  };
  const sub = (s, text, o = {}) => T(s, text, { x: 0.5, y: 1.47, w: 8.6, h: 0.32, fontSize: 13, color: C.grey, ...o });
  const label = (s, text, o) => T(s, text, { fontFace: MONO, fontSize: 9, color: C.grey, charSpacing: 1, ...o });
  const hallR = 640 / 436;

  let s;
  // ================= Cover =================
  pres.addSection({ title: "Cover" });
  s = pres.addSlide({ masterName: "Full bleed", sectionTitle: "Cover" });
  s.addImage({ path: brand("pattern-yellow.png"), x: 0, y: 0, w: 10, h: 5.625, altText: "GDG brand pattern" });
  card(s, 0.9, 0.7, 8.2, 4.15, C.ink, "Cover");
  s.addImage({ path: brand("gdg-mark.png"), x: 1.3, y: 1.02, w: 0.55, h: 0.31, altText: "Google Developer Groups mark" });
  T(s, cfg.organiser.short, { x: 1.95, y: 1.02, w: 1.9, h: 0.31, fontSize: 11.5, bold: true, valign: "middle" });
  T(s, "×", { x: 3.85, y: 1.02, w: 0.3, h: 0.31, fontSize: 13, color: C.grey, align: "center", valign: "middle" });
  if (logoFile) s.addImage({ path: logoFile, x: 4.2, y: 1.02, w: 0.31 * logoR, h: 0.31, altText: partner.name + " logo" });
  T(s, partner.name, { x: 4.2 + (logoFile ? 0.31 * logoR + 0.12 : 0), y: 1.02, w: 2.2, h: 0.31, fontSize: 11.5, bold: true, color: P, valign: "middle" });
  label(s, "A PROPOSAL FOR " + partner.name.toUpperCase(), { x: 1.3, y: 1.65, w: 4.4, h: 0.22, color: C.link, fontSize: 10 });
  T(s, S.cover.title, { x: 1.3, y: 1.92, w: 4.6, h: 1.25, fontSize: 36, bold: true, valign: "middle", lineSpacingMultiple: 0.95 });
  T(s, parts(S.cover.subtitle), { x: 1.3, y: 3.22, w: 4.6, h: 0.4, fontSize: 16, valign: "middle" });
  let px = 1.3;
  for (const [t, w] of S.cover.pills) { pill(s, px, 3.9, w, 0.4, t, C.chip, C.ink, { size: 11 }); px += w + 0.15; }
  s.addImage({ path: campus("oau-gate.png"), x: 5.95, y: 1.95, w: 2.85, h: 2.85 / hallR, altText: "Line drawing of BOOA at OAU" });
  pill(s, 7.0, 0.52, 1.85, 0.42, "For " + (partner.stickerName || partner.name), P, C.white, { size: 12, rotate: 6 });

  // ================= The gap =================
  pres.addSection({ title: "The gap" });
  s = pres.addSlide({ masterName: "Content blue", sectionTitle: "The gap" });
  title(s, S.gap.title); sub(s, S.gap.subtitle);
  const chipRow = (x, items) => { let cx = x; items.forEach(([t, w]) => { pill(s, cx, 3.95, w, 0.32, t, C.chip, C.ink, { size: 9.5 }); cx += w + 0.1; }); };
  for (const [i, side] of S.gap.sides.entries()) {
    const x = i === 0 ? 0.5 : 5.45, col = i === 0 ? C.blue : C.green;
    card(s, x, 2.0, 3.95, 2.55, col, side.heading);
    await iconDot(s, x + 0.25, 2.2, 0.55, col, side.icon);
    T(s, side.heading, { x: x + 0.95, y: 2.25, w: 2.8, h: 0.45, fontSize: 18, bold: true, valign: "middle" });
    T(s, side.body, { x: x + 0.25, y: 2.9, w: 3.45, h: 0.6, fontSize: 12, color: C.grey });
    label(s, side.label, { x: x + 0.25, y: 3.68, w: 3, h: 0.2, fontSize: 8.5 });
    chipRow(x + 0.25, side.chips);
  }
  await iconDot(s, 4.6, 2.9, 0.7, C.yellow, "MdSwapHoriz");

  // ================= The event =================
  pres.addSection({ title: "The event" });
  s = pres.addSlide({ masterName: "Content blue", sectionTitle: "The event" });
  title(s, S.event.title); sub(s, S.event.subtitle);
  card(s, 0.5, 2.0, 3.6, 2.65, C.yellow, "Venue");
  s.addImage({ path: campus("oau-gate.png"), x: 0.72, y: 2.25, w: 3.16, h: 3.16 / hallR, altText: "Line drawing of BOOA at OAU" });
  label(s, S.event.label, { x: 4.45, y: 2.0, w: 5, h: 0.2 });
  S.event.items.forEach(([h, b], i) => {
    const y = 2.3 + i * 0.66;
    dot(s, 4.45, y, 0.38, STEP[i % 4], i + 1, 12);
    T(s, h, { x: 4.98, y: y - 0.02, w: 4.5, h: 0.26, fontSize: 13, bold: true, valign: "middle" });
    T(s, b, { x: 4.98, y: y + 0.24, w: 4.5, h: 0.36, fontSize: 10, color: C.grey });
  });
  if (S.event.also && S.event.also.length) {
    label(s, "ALSO ON", { x: 4.45, y: 4.33, w: 1, h: 0.3, valign: "middle" });
    let cx = 5.25;
    S.event.also.forEach(([t, w]) => { pill(s, cx, 4.33, w, 0.3, t, C.white, C.ink, { size: 9.5 }); cx += w + 0.08; });
  }

  // ================= Who is in the room =================
  s = pres.addSlide({ masterName: "Content yellow", sectionTitle: "The event" });
  title(s, S.room.title); sub(s, S.room.subtitle);
  S.room.stats.forEach(([n, l, d], i) => {
    const x = 0.5 + i * 3.07, col = [C.blue, C.red, C.green][i];
    card(s, x, 2.0, 2.82, 1.4, col, "Stat " + l);
    T(s, n, { x: x + 0.22, y: 2.08, w: 2.4, h: 0.62, fontSize: 34, bold: true, color: col, valign: "middle" });
    T(s, l, { x: x + 0.22, y: 2.72, w: 2.4, h: 0.28, fontSize: 13, bold: true });
    T(s, d, { x: x + 0.22, y: 3.02, w: 2.45, h: 0.28, fontSize: 10.5, color: C.grey });
  });
  card(s, 0.5, 3.72, 8.95, 1.0, null, "Organiser");
  s.addImage({ path: brand("gdg-mark.png"), x: 0.75, y: 3.9, w: 0.55, h: 0.31, altText: "Google Developer Groups mark" });
  label(s, S.room.organiserLabel, { x: 1.45, y: 3.9, w: 3, h: 0.3, valign: "middle", color: C.link });
  T(s, S.room.organiserText, { x: 0.75, y: 4.25, w: 8.5, h: 0.42, fontSize: 10.5, color: C.grey });

  // ================= Why this partner =================
  pres.addSection({ title: "Why " + partner.short });
  s = pres.addSlide({ masterName: "Content blue", sectionTitle: "Why " + partner.short });
  title(s, S.why.title); sub(s, S.why.subtitle);
  for (const [i, [h, b, ic, col]] of S.why.cards.entries()) {
    const x = 0.5 + i * 3.07, c = colorOf(col);
    card(s, x, 2.0, 2.82, 2.6, c, h);
    await iconDot(s, x + 0.22, 2.2, 0.6, c, ic);
    T(s, h, { x: x + 0.22, y: 2.95, w: 2.4, h: 0.6, fontSize: 15, bold: true });
    T(s, b, { x: x + 0.22, y: 3.6, w: 2.4, h: 0.9, fontSize: 11, color: C.grey });
  }
  if (S.why.sources) s.addNotes(fill(S.why.sources));

  // ================= Invitation (optional) =================
  if (S.invitation && partner.leader) {
    s = pres.addSlide({ masterName: "Content blue", sectionTitle: "Why " + partner.short });
    title(s, S.invitation.title); sub(s, S.invitation.subtitle);
    card(s, 0.5, 2.0, 4.7, 2.65, C.blue, "Schedule");
    S.invitation.schedule.forEach(([t, n, hi], i) => {
      const y = 2.35 + i * 0.5;
      if (hi) s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.62, y: y - 0.06, w: 4.46, h: 0.56, rectRadius: 0.08, fill: { color: partner.tint }, line: { color: P, width: 1.25 } });
      T(s, t, { x: 0.78, y, w: 0.7, h: 0.44, fontFace: MONO, fontSize: 10, color: hi ? P : C.grey, valign: "middle" });
      T(s, n, { x: 1.5, y, w: 3.5, h: 0.44, fontSize: 11, bold: !!hi, color: hi ? P : C.ink, valign: "middle" });
    });
    let rx = 5.6;
    S.invitation.roles.forEach(([t, w, col]) => { pill(s, rx, 2.0, w, 0.4, t, colorOf(col), C.white, { size: 11.5 }); rx += w + 0.15; });
    T(s, S.invitation.body, { x: 5.6, y: 2.65, w: 3.9, h: 1.2, fontSize: 13.5, lineSpacingMultiple: 1.1 });
    if (S.invitation.notes) s.addNotes(fill(S.invitation.notes));
  }

  // ================= Product moment (optional) =================
  if (S.product && partner.product) {
    s = pres.addSlide({ masterName: "Content dark", sectionTitle: "Why " + partner.short });
    title(s, S.product.title.map(([t, c]) => [t, c === "light" ? partner.light : c]), { color: C.white });
    sub(s, S.product.subtitle, { color: "BDC1C6" });
    if (partner.product.icon) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.66, y: 0.98, w: 0.74, h: 0.74, rectRadius: 0.15, fill: { color: C.white }, line: { color: C.white, width: 2 } });
      s.addImage({ path: local(partner.product.icon), x: 8.68, y: 1.0, w: 0.7, h: 0.7, altText: partner.product.name + " app icon" });
    }
    for (const [i, [h, b, ic]] of S.product.steps.entries()) {
      const x = 0.5 + i * 2.3;
      card(s, x, 2.0, 2.05, 2.35, P, h);
      dot(s, x + 0.18, 2.18, 0.42, P, i + 1, 13);
      s.addImage({ data: await icon(ic, P), x: x + 1.5, y: 2.2, w: 0.38, h: 0.38 });
      T(s, h, { x: x + 0.18, y: 2.75, w: 1.8, h: 0.3, fontSize: 13, bold: true });
      T(s, b, { x: x + 0.18, y: 3.12, w: 1.75, h: 1.15, fontSize: 10.5, color: C.grey });
    }
    if (S.product.notes) s.addNotes(fill(S.product.notes));
  }

  // ================= Benefits =================
  pres.addSection({ title: "The ask" });
  s = pres.addSlide({ masterName: "Content blue", sectionTitle: "The ask" });
  title(s, S.benefits.title); sub(s, S.benefits.subtitle);
  card(s, 0.5, 2.0, 9.0, 2.65, P, "Benefits");
  for (const [i, [h, b, ic, col]] of S.benefits.items.entries()) {
    const x = 0.75 + (i % 2) * 4.4, y = 2.18 + Math.floor(i / 2) * 0.8;
    await iconDot(s, x, y + 0.03, 0.46, colorOf(col), ic);
    T(s, h, { x: x + 0.62, y, w: 3.6, h: 0.28, fontSize: 12.5, bold: true });
    T(s, b, { x: x + 0.62, y: y + 0.3, w: 3.6, h: 0.42, fontSize: 10, color: C.grey });
  }

  // ================= The ask =================
  s = pres.addSlide({ masterName: "Content blue", sectionTitle: "The ask" });
  title(s, S.ask.title); sub(s, S.ask.subtitle);
  S.ask.options.forEach(([k, v, d, col], i) => {
    const x = 0.5 + i * 3.07;
    card(s, x, 2.0, 2.82, 1.62, colorOf(col), k);
    label(s, k, { x: x + 0.22, y: 2.15, w: 2.4, h: 0.22, color: i === 0 ? P : C.grey });
    T(s, v, { x: x + 0.22, y: 2.4, w: 2.45, h: 0.5, fontSize: 24, bold: true, valign: "middle" });
    T(s, d, { x: x + 0.22, y: 2.95, w: 2.45, h: 0.6, fontSize: 10, color: C.grey });
  });
  if (S.ask.sticker) pill(s, 1.95, 1.82, 1.25, 0.32, S.ask.sticker, C.yellow, C.ink, { size: 10.5, rotate: 5 });
  if (S.ask.payment) {
    card(s, 0.5, 3.92, 8.95, 0.8, null, "Payment");
    label(s, "HOW PAYMENT WORKS", { x: 0.75, y: 4.02, w: 3, h: 0.2, color: C.link });
    T(s, S.ask.payment, { x: 0.75, y: 4.25, w: 8.5, h: 0.42, fontSize: 10, color: C.grey });
  }
  if (S.ask.notes) s.addNotes(fill(S.ask.notes));

  // ================= Where the money goes =================
  if (S.budget) {
    s = pres.addSlide({ masterName: "Content blue", sectionTitle: "The ask" });
    title(s, S.budget.title); sub(s, S.budget.subtitle);
    card(s, 0.5, 2.0, 5.95, 2.75, C.blue, "Budget chart");
    const cats = S.budget.lines.map((l) => l[0]).reverse(), vals = S.budget.lines.map((l) => l[1]).reverse();
    const sum = vals.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 100) > 0.01) throw new Error(`Budget lines add up to ${sum}%, not 100%. Fix the config.`);
    s.addChart(pres.charts.BAR, [{ name: "Share of budget", labels: cats, values: vals }], {
      x: 0.62, y: 2.08, w: 5.72, h: 2.6, barDir: "bar", barGapWidthPct: 40, chartColors: [C.blue],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"', dataLabelColor: C.ink, dataLabelFontSize: 9, dataLabelFontFace: "+mn-lt", dataLabelFontBold: true,
      catAxisLabelColor: C.ink, catAxisLabelFontSize: 8.5, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
      valAxisHidden: true, valAxisMaxVal: Math.ceil(Math.max(...vals) * 1.2), valAxisMinVal: 0, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, showTitle: false,
    });
    card(s, 6.8, 2.0, 2.7, 1.25, C.yellow, "Total");
    label(s, "ESTIMATED BUDGET", { x: 7.0, y: 2.14, w: 2.3, h: 0.22 });
    T(s, S.budget.total, { x: 7.0, y: 2.5, w: 2.4, h: 0.55, fontSize: 24, bold: true, valign: "middle" });
    card(s, 6.8, 3.5, 2.7, 1.25, C.green, "Receipts");
    await iconDot(s, 7.0, 3.64, 0.4, C.green, "MdReceiptLong");
    T(s, "Fully documented", { x: 7.5, y: 3.64, w: 1.9, h: 0.4, fontSize: 12.5, bold: true, valign: "middle" });
    T(s, S.budget.receipts, { x: 7.0, y: 4.12, w: 2.35, h: 0.55, fontSize: 10, color: C.grey });
    if (S.budget.notes) s.addNotes(fill(S.budget.notes));
  }

  // ================= Close =================
  pres.addSection({ title: "Next steps" });
  s = pres.addSlide({ masterName: "Full bleed", sectionTitle: "Next steps" });
  s.addImage({ path: brand("pattern-pink.png"), x: 0, y: 0, w: 10, h: 5.625, altText: "GDG brand pattern" });
  card(s, 0.85, 0.6, 8.3, 4.4, C.ink, "Close");
  T(s, parts(S.close.title), { x: 1.2, y: 0.85, w: 6.3, h: 0.6, fontSize: 30, bold: true, valign: "middle" });
  s.addImage({ path: brand("gdg-mark.png"), x: 7.75, y: 0.97, w: 0.62, h: 0.33, altText: "Google Developer Groups mark" });
  if (logoFile) s.addImage({ path: logoFile, x: 8.45, y: 0.98, w: 0.31 * logoR, h: 0.31, altText: partner.name + " logo" });
  S.close.steps.forEach(([h, b], i) => {
    const x = 1.2 + i * 2.6;
    dot(s, x, 1.75, 0.42, [C.blue, C.red, C.green][i], i + 1, 13);
    T(s, h, { x: x + 0.55, y: 1.75, w: 1.95, h: 0.42, fontSize: 13, bold: true, valign: "middle" });
    T(s, b, { x, y: 2.28, w: 2.35, h: 0.9, fontSize: 10, color: C.grey });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.2, y: 3.3, w: 7.6, h: 1.4, rectRadius: 0.1, fill: { color: C.chip }, line: { color: C.ink, width: 1.5 } });
  label(s, "CONTACT", { x: 1.45, y: 3.45, w: 2, h: 0.22 });
  T(s, cfg.contact.name, { x: 1.45, y: 3.72, w: 3.4, h: 0.32, fontSize: 15, bold: true });
  T(s, cfg.contact.role, { x: 1.45, y: 4.05, w: 3.4, h: 0.28, fontSize: 11, color: C.link });
  cfg.contact.lines.forEach(([k, v], i) => {
    const y = 3.5 + i * 0.37;
    T(s, k, { x: 4.9, y, w: 0.7, h: 0.3, fontFace: MONO, fontSize: 9.5, color: C.grey, valign: "middle" });
    T(s, v, { x: 5.6, y, w: 3.1, h: 0.3, fontSize: 11.5, bold: true, valign: "middle" });
  });

  const out = path.resolve(cfgDir, cfg.output);
  await pres.writeFile({ fileName: out });
  console.log("wrote", out);
})().catch((e) => { console.error(e.message || e); process.exit(1); });
