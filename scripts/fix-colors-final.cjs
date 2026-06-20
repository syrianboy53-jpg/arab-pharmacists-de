const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
let totalFixed = 0;

for (const file of files) {
  const fp = path.join(pagesDir, file);
  let c = fs.readFileSync(fp, 'utf-8');
  const orig = c;

  // 1. border-white/XX without dark: prefix → add adaptive
  // Match standalone border-white/XX that are NOT preceded by dark:
  c = c.replace(/(?<![a-z]:)border-white\/(\d+)/g, (match, num, offset) => {
    // Check if preceded by "dark:" 
    const before = c.substring(Math.max(0, offset - 6), offset);
    if (before.includes('dark:')) return match;
    return `border-gray-200 dark:border-white/${num}`;
  });

  // 2. bg-slate-950 variants
  c = c.replace(/bg-slate-950\/\d+/g, 'bg-gray-100 dark:bg-[#1a1a2e]');
  c = c.replace(/bg-slate-950/g, 'bg-gray-100 dark:bg-[#1a1a2e]');
  c = c.replace(/bg-slate-900\/\d+/g, 'bg-gray-50 dark:bg-white/5');
  c = c.replace(/bg-slate-800\/\d+/g, 'bg-gray-50 dark:bg-white/5');

  // 3. text-gold, bg-gold
  c = c.replace(/text-gold/g, 'text-amber-600 dark:text-amber-400');
  c = c.replace(/bg-gold\/(\d+)/g, 'bg-amber-100 dark:bg-amber-900/$1');
  c = c.replace(/bg-gold/g, 'bg-amber-500');
  c = c.replace(/border-gold\/(\d+)/g, 'border-amber-200 dark:border-amber-700/$1');
  c = c.replace(/border-gold/g, 'border-amber-300');

  // 4. hover:bg-white dark:bg-XXX → hover:bg-gray-50 dark:hover:bg-XXX
  c = c.replace(/hover:bg-white dark:bg-\[#1a1a2e\]\/(\d+)/g, 'hover:bg-gray-50 dark:hover:bg-white/$1');
  c = c.replace(/hover:bg-white dark:hover:bg-\[#1a1a2e\]/g, 'hover:bg-gray-50 dark:hover:bg-white/5');

  // Clean duplicates (multiple passes)
  for (let i = 0; i < 5; i++) {
    c = c.replace(/border-gray-200 dark:border-gray-200 dark:/g, 'border-gray-200 dark:');
    c = c.replace(/border-gray-200 border-gray-200/g, 'border-gray-200');
    c = c.replace(/dark:bg-\[#1a1a2e\] dark:bg-\[#1a1a2e\]/g, 'dark:bg-[#1a1a2e]');
    c = c.replace(/dark:bg-white\/5 dark:bg-white\/5/g, 'dark:bg-white/5');
    c = c.replace(/dark:text-amber-400 dark:text-amber-400/g, 'dark:text-amber-400');
    c = c.replace(/dark:border-amber-700\/\d+ dark:border-amber-700\/(\d+)/g, 'dark:border-amber-700/$1');
    // Fix "border border-gray-200 dark:border-white/XX border-gray-200 dark:border-white/XX"
    c = c.replace(/(border-gray-200 dark:border-white\/\d+)\s+border-gray-200 dark:border-white\/\d+/g, '$1');
  }

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    totalFixed++;
    console.log(`✅ ${file}`);
  }
}

console.log(`\nDone! Fixed ${totalFixed} files.`);
