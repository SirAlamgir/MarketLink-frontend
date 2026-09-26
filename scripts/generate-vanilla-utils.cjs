// generate-vanilla-utils.cjs
// This script extracts Tailwind utilities used in the React components
// and appends the equivalent vanilla CSS rules to src/styles.css.

const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

const COMPONENTS_GLOB = 'src/components/**/*.jsx';
const TAILWIND_GLOB = 'node_modules/.pnpm/**/tailwind.css';
const OUT_CSS = path.join('src', 'styles.css');

function collectClasses() {
  const files = fg.sync(COMPONENTS_GLOB, { cwd: process.cwd() });
  const set = new Set();
  const regex = /className\s*=\s*{?['"]([^'\"]+)['"]}?/g;
  files.forEach(f => {
    const txt = fs.readFileSync(f, 'utf8');
    let m;
    while ((m = regex.exec(txt)) !== null) {
      m[1].split(/\s+/).forEach(cls => { if (cls) set.add(cls); });
    }
  });
  return set;
}

function locateTailwind() {
  const candidates = fg.sync(TAILWIND_GLOB, { cwd: process.cwd(), absolute: true });
  if (!candidates.length) { console.error('Tailwind CSS not found'); process.exit(1); }
  return candidates[0];
}

function main() {
  const classes = collectClasses();
  if (!classes.size) { console.log('No Tailwind classes found'); return; }
  const tailwindPath = locateTailwind();
  const css = fs.readFileSync(tailwindPath, 'utf8');
  const ruleMap = new Map();
  const ruleRe = /\.([-_A-Za-z0-9\\:]+)([^\{]*)\{([^\}]*)\}/g;
  let r;
  while ((r = ruleRe.exec(css)) !== null) {
    const sel = `.${r[1]}`;
    if (!ruleMap.has(sel)) ruleMap.set(sel, r[3].trim());
  }
  const out = [];
  classes.forEach(cls => {
    const esc = cls.replace(/:/g, '\\:');
    const sel = `.${esc}`;
    const body = ruleMap.get(sel);
    if (body) out.push(`${sel}{${body}}`);
  });
  if (out.length) {
    const header = '\n/* ==== Auto‑generated Tailwind utilities ==== */\n';
    fs.appendFileSync(OUT_CSS, header + out.join('\n'));
    console.log(`Added ${out.length} utilities to ${OUT_CSS}`);
  }
}

main();
