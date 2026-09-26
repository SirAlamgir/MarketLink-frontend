// scripts/generate-vanilla-utils.js
/**
 * Auto‑generate vanilla CSS utilities from Tailwind.
 * Steps:
 * 1️⃣ Scan all component files for className strings.
 * 2️⃣ Collect unique class names.
 * 3️⃣ Load Tailwind's compiled CSS (generated in node_modules).
 * 4️⃣ Extract each rule and append it to src/styles.css.
 * 5️⃣ Log the count of added rules.
 */

const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

const COMPONENTS_GLOB = 'src/components/**/*.jsx';
const TAILWIND_GLOB = 'node_modules/**/*.css'; // we'll pick the first tailwind.css file
const OUT_CSS = path.resolve('src', 'styles.css');

function getClassSet() {
  const files = fg.sync(COMPONENTS_GLOB, { cwd: process.cwd() });
  const classSet = new Set();
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // match className="..." or className={"..."}
    const regex = /className\s*=\s*{?['"]([^'"`]+)['"]}?/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      match[1]
        .split(/\s+/)
        .filter(Boolean)
        .forEach(cls => classSet.add(cls));
    }
  });
  return classSet;
}

function findTailwindCSS() {
  const candidates = fg.sync(TAILWIND_GLOB, { cwd: process.cwd(), absolute: true })
    .filter(p => /tailwind.*\.css$/i.test(p));
  if (candidates.length === 0) {
    console.error('❌ Tailwind CSS file not found. Ensure the project has been built.');
    process.exit(1);
  }
  return candidates[0];
}

function extractRules(classSet, tailwindCSS) {
  const rules = [];
  classSet.forEach(cls => {
    // Escape special chars for regex (e.g., :, /, .)
    const esc = cls.replace(/([.:\/])/g, '\\$1');
    const re = new RegExp(`\\.${esc}([^\{]*)\{([^\}]*)\}`, 'g');
    let m;
    while ((m = re.exec(tailwindCSS)) !== null) {
      rules.push(`.${cls}${m[1]}{${m[2]}}`);
    }
  });
  return rules;
}

function main() {
  const classSet = getClassSet();
  if (classSet.size === 0) {
    console.log('⚠️ No Tailwind classes detected.');
    return;
  }
  const tailwindPath = findTailwindCSS();
  const tailwindCSS = fs.readFileSync(tailwindPath, 'utf8');
  const rules = extractRules(classSet, tailwindCSS);
  if (rules.length === 0) {
    console.log('⚠️ No matching rules extracted.');
    return;
  }
  // Ensure a marker comment exists
  const marker = '\n/* ==== Auto‑generated Tailwind utilities ==== */\n';
  fs.appendFileSync(OUT_CSS, marker + rules.join('\n'));
  console.log(`✅ Added ${rules.length} utility definitions to ${OUT_CSS}`);
}

main();
