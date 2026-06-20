const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let c = fs.readFileSync(filePath, 'utf-8');
  const original = c;

  // Fix hardcoded "text-white" that should be adaptive
  // text-white in card titles/labels (NOT inside gradients or colored backgrounds)
  // Only replace text-white that's used as main text color, not inside colored backgrounds
  c = c.replace(/className="([^"]*?)text-white([^"]*?)"/g, (match, before, after) => {
    // Keep text-white if it's inside a gradient/colored bg context
    if (before.includes('bg-gradient') || before.includes('from-[') || before.includes('bg-[#') || 
        before.includes('bg-green') || before.includes('bg-red') || before.includes('bg-blue') ||
        before.includes('bg-emerald') || before.includes('bg-violet') || before.includes('bg-amber') ||
        before.includes('bg-purple') || before.includes('text-white/') ||
        after.includes('bg-gradient') || after.includes('from-[')) {
      return match;
    }
    // Replace text-white with adaptive color
    return `className="${before}text-gray-900 dark:text-white${after}"`;
  });

  // Fix text-ink-soft  
  c = c.replace(/\btext-ink-soft\b/g, 'text-gray-600 dark:text-gray-400');

  // Fix text-ink (not text-ink-soft)
  c = c.replace(/\btext-ink(?!-)\b/g, 'text-gray-900 dark:text-white');

  // Fix bg-slate-950/20 and bg-slate-900/40 (dark-only colors)
  c = c.replace(/bg-slate-950\/20/g, 'bg-gray-100 dark:bg-white/5');
  c = c.replace(/bg-slate-900\/40/g, 'bg-gray-50 dark:bg-white/5');
  c = c.replace(/bg-slate-900\/30/g, 'bg-gray-50 dark:bg-white/5');

  // Fix border-white/5 in non-dark context (these are invisible in light mode)
  // Replace standalone "border border-white/5" with proper adaptive version
  c = c.replace(/border border-white\/5/g, 'border border-gray-200 dark:border-white/5');
  c = c.replace(/border-t border-white\/5/g, 'border-t border-gray-200 dark:border-white/5');
  c = c.replace(/border-b border-white\/5/g, 'border-b border-gray-200 dark:border-white/5');

  // Clean up duplicates
  c = c.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
  c = c.replace(/dark:text-gray-400 dark:text-gray-400/g, 'dark:text-gray-400');
  c = c.replace(/dark:border-white\/5 dark:border-white\/5/g, 'dark:border-white/5');
  c = c.replace(/border-gray-200 dark:border-white\/5 dark:border-white\/5/g, 'border-gray-200 dark:border-white/5');
  c = c.replace(/border-gray-200 dark:border-white\/10 dark:border-white\/5/g, 'border-gray-200 dark:border-white/5');

  if (c !== original) {
    fs.writeFileSync(filePath, c);
    console.log(`✅ ${file}`);
    totalChanges++;
  }
}

console.log(`\nDone! Fixed ${totalChanges} files.`);
