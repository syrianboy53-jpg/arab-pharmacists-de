const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let c = fs.readFileSync(filePath, 'utf-8');
  const original = c;

  // Fix bg-slate-XXX dark-only backgrounds
  c = c.replace(/bg-slate-950\/80/g, 'bg-gray-100 dark:bg-[#1a1a2e]');
  c = c.replace(/bg-slate-950\/60/g, 'bg-gray-100 dark:bg-[#1a1a2e]');
  c = c.replace(/bg-slate-900\/60/g, 'bg-gray-50 dark:bg-white/5');
  c = c.replace(/bg-slate-900\/50/g, 'bg-gray-50 dark:bg-white/5');
  c = c.replace(/bg-slate-800\/50/g, 'bg-gray-50 dark:bg-white/5');
  c = c.replace(/bg-slate-800\/40/g, 'bg-gray-50 dark:bg-white/5');
  c = c.replace(/bg-slate-800/g, 'bg-gray-100 dark:bg-white/10');
  c = c.replace(/bg-slate-700/g, 'bg-gray-200 dark:bg-white/10');

  // Fix standalone border-white/10 or border-white/5 (invisible in light mode)
  // Only when NOT preceded by dark:
  c = c.replace(/(?<!dark:)border border-white\/10/g, 'border border-gray-200 dark:border-white/10');
  c = c.replace(/(?<!dark:)border border-white\/5/g, 'border border-gray-200 dark:border-white/5');

  // Fix focus:border-green
  c = c.replace(/focus:border-green\b(?![-/])/g, 'focus:border-[#00b894]');
  
  // Fix hover:bg-green/10
  c = c.replace(/hover:bg-green\/(\d+)/g, 'hover:bg-[#00b894]/$1');
  
  // Fix bg-green without dark (buttons)
  c = c.replace(/\bbg-green\b(?![-/])/g, 'bg-[#00b894]');
  
  // Fix hover:bg-green-600
  c = c.replace(/hover:bg-green-600/g, 'hover:bg-[#00a884]');
  c = c.replace(/hover:bg-green-deep/g, 'hover:bg-[#00a884]');

  // Fix text-green-deep
  c = c.replace(/text-green-deep/g, 'text-[#065F46]');
  c = c.replace(/text-green-dark/g, 'text-[#094F28]');

  // Fix hover:text-green
  c = c.replace(/hover:text-green\b(?![-/])/g, 'hover:text-[#00b894]');

  // Fix remaining standalone text-green 
  c = c.replace(/\btext-green\b(?![-/])/g, 'text-[#00b894]');

  // Fix bg-green-deep, bg-green-dark
  c = c.replace(/bg-green-deep/g, 'bg-[#062719]');
  c = c.replace(/bg-green-dark/g, 'bg-[#094F28]');

  // Fix placeholder-white/30 
  c = c.replace(/placeholder-white\/30/g, 'placeholder-gray-400 dark:placeholder-white/30');
  c = c.replace(/placeholder-white\/50/g, 'placeholder-gray-400 dark:placeholder-white/50');

  // Fix text-white/XX (opacity variants used as soft text — should be adaptive)
  c = c.replace(/(?<!dark:)\btext-white\/80\b/g, 'text-gray-600 dark:text-white/80');
  c = c.replace(/(?<!dark:)\btext-white\/70\b/g, 'text-gray-500 dark:text-white/70');
  c = c.replace(/(?<!dark:)\btext-white\/60\b/g, 'text-gray-500 dark:text-white/60');
  c = c.replace(/(?<!dark:)\btext-white\/50\b/g, 'text-gray-400 dark:text-white/50');
  c = c.replace(/(?<!dark:)\btext-white\/40\b/g, 'text-gray-400 dark:text-white/40');

  // Clean duplicates
  for (let i = 0; i < 3; i++) {
    c = c.replace(/dark:bg-\[#1a1a2e\] dark:bg-\[#1a1a2e\]/g, 'dark:bg-[#1a1a2e]');
    c = c.replace(/dark:bg-white\/5 dark:bg-white\/5/g, 'dark:bg-white/5');
    c = c.replace(/dark:border-white\/10 dark:border-white\/10/g, 'dark:border-white/10');
    c = c.replace(/dark:border-white\/5 dark:border-white\/5/g, 'dark:border-white/5');
    c = c.replace(/border-gray-200 dark:border-white\/10 dark:border-white\/10/g, 'border-gray-200 dark:border-white/10');
    c = c.replace(/border-gray-200 dark:border-white\/5 dark:border-white\/5/g, 'border-gray-200 dark:border-white/5');
    c = c.replace(/dark:text-white\/80 dark:text-white\/80/g, 'dark:text-white/80');
    c = c.replace(/dark:placeholder-white\/30 dark:placeholder-white\/30/g, 'dark:placeholder-white/30');
  }

  if (c !== original) {
    fs.writeFileSync(filePath, c);
    console.log(`✅ ${file}`);
    totalChanges++;
  }
}

console.log(`\nDone! Fixed ${totalChanges} files.`);
