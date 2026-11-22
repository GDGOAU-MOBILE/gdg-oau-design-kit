#!/usr/bin/env node
// Installs the GDGOAU design kit as an agent skill.
//   npx github:GDGOAU-MOBILE/gdg-oau-design-kit            -> ~/.claude/skills/gdg-oau-design-kit
//   npx github:GDGOAU-MOBILE/gdg-oau-design-kit --project  -> ./.claude/skills/gdg-oau-design-kit
//   npx github:GDGOAU-MOBILE/gdg-oau-design-kit --dir PATH -> PATH/gdg-oau-design-kit
const fs = require("fs");
const os = require("os");
const path = require("path");

const NAME = "gdg-oau-design-kit";
const ROOT = path.resolve(__dirname, "..");
const INCLUDE = ["SKILL.md", "AGENTS.md", "README.md", "LICENSE", "NOTICE.md", "references", "tokens", "assets", "templates"];
const SKIP = new Set(["node_modules", ".DS_Store", ".git"]);

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

if (has("--help") || has("-h")) {
  console.log(`GDGOAU design kit installer

Usage:
  npx github:GDGOAU-MOBILE/${NAME} [options]

Options:
  (none)        Install for your user: ~/.claude/skills/${NAME}
  --project     Install into this project: ./.claude/skills/${NAME}
  --dir PATH    Install into PATH/${NAME} (for other agents' skill folders)
  --dry-run     Show what would be copied, copy nothing
  -h, --help    Show this help

Existing files are overwritten with the new version. Files you added are kept.`);
  process.exit(0);
}

let base;
if (val("--dir")) base = path.resolve(val("--dir"));
else if (has("--project")) base = path.resolve(process.cwd(), ".claude", "skills");
else base = path.join(os.homedir(), ".claude", "skills");
const dest = path.join(base, NAME);
const dry = has("--dry-run");

let count = 0;
function copy(src, dst) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    if (!dry) fs.mkdirSync(dst, { recursive: true });
    for (const e of fs.readdirSync(src)) {
      if (SKIP.has(e) || e.endsWith(".pptx") || e.endsWith(".pdf")) continue;
      copy(path.join(src, e), path.join(dst, e));
    }
  } else {
    if (!dry) fs.copyFileSync(src, dst);
    count++;
  }
}

if (!dry) fs.mkdirSync(dest, { recursive: true });
for (const item of INCLUDE) {
  const src = path.join(ROOT, item);
  if (fs.existsSync(src)) copy(src, path.join(dest, item));
}

const version = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
console.log(`${dry ? "Would install" : "Installed"} GDGOAU design kit v${version} (${count} files)`);
console.log(`  -> ${dest}`);
if (!dry) {
  console.log(`
Next:
  1. Restart your agent (Claude Code picks up skills on start).
  2. Ask for something GDGOAU, for example: "Make a GDGOAU pitch deck for <company>".
  3. For decks, install the generator once:
       cd "${path.join(dest, "templates", "pitch-deck")}" && npm install
`);
}
