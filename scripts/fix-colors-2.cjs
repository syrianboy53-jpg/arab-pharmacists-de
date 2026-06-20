const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let c = fs.readFileSync(filePath, 'utf-8');
  const original = c;

  // Fix the broken pattern: dark:bg-white dark:bg-[#1a1a2e]/5 -> dark:bg-white/5
  c = c.replace(/dark:bg-white dark:bg-\[#1a1a2e\]\/5/g, 'dark:bg-white/5');
  c = c.replace(/dark:bg-white dark:bg-\[#1a1a2e\]\/10/g, 'dark:bg-white/10');
  
  // Fix: dark:border-white dark:border-white/10/10 -> dark:border-white/10
  c = c.replace(/dark:border-white dark:border-white\/10\/10/g, 'dark:border-white/10');
  c = c.replace(/dark:border-white dark:border-white\/5\/5/g, 'dark:border-white/5');

  // Fix any remaining broken dark:text-gray-XXX dark:text-gray-XXX/YYY
  c = c.replace(/dark:text-gray-400 dark:text-gray-400/g, 'dark:text-gray-400');
  c = c.replace(/dark:text-gray-300 dark:text-gray-300/g, 'dark:text-gray-300');
  c = c.replace(/dark:text-gray-200 dark:text-gray-200/g, 'dark:text-gray-200');
  c = c.replace(/dark:text-white dark:text-white/g, 'dark:text-white');

  // Fix any remaining duplicates
  c = c.replace(/dark:bg-\[#1a1a2e\] dark:bg-\[#1a1a2e\]/g, 'dark:bg-[#1a1a2e]');
  c = c.replace(/dark:bg-white\/5 dark:bg-white\/5/g, 'dark:bg-white/5');
  c = c.replace(/dark:bg-white\/10 dark:bg-white\/10/g, 'dark:bg-white/10');
  c = c.replace(/dark:border-white\/5 dark:border-white\/5/g, 'dark:border-white/5');
  c = c.replace(/dark:border-white\/10 dark:border-white\/10/g, 'dark:border-white/10');
  c = c.replace(/dark:hover:bg-white\/5 dark:hover:bg-white\/5/g, 'dark:hover:bg-white/5');
  c = c.replace(/dark:hover:bg-white\/10 dark:hover:bg-white\/10/g, 'dark:hover:bg-white/10');

  if (c !== original) {
    fs.writeFileSync(filePath, c);
    console.log(`✅ ${file}`);
    totalChanges++;
  }
}

console.log(`\nDone! Fixed ${totalChanges} files.`);
