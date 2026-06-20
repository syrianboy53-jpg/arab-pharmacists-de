const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let c = fs.readFileSync(filePath, 'utf-8');
  const original = c;

  // ── bg-white without dark ──
  // Match bg-white that is NOT already followed by dark:bg somewhere in the same className
  c = c.replace(/\bbg-white\b(?![\s"]*dark:bg)/g, 'bg-white dark:bg-[#1a1a2e]');

  // ── bg-gray-50 without dark ──
  c = c.replace(/\bbg-gray-50\b(?![\s"]*dark:bg)/g, 'bg-gray-50 dark:bg-white/5');

  // ── border-gray-200 without dark ──
  c = c.replace(/\bborder-gray-200\b(?![\s"]*dark:border)/g, 'border-gray-200 dark:border-white/10');

  // ── border-gray-100 without dark ──
  c = c.replace(/\bborder-gray-100\b(?![\s"]*dark:border)/g, 'border-gray-100 dark:border-white/5');

  // ── text-gray-700 without dark ──
  c = c.replace(/\btext-gray-700\b(?![\s"]*dark:text)/g, 'text-gray-700 dark:text-gray-300');

  // ── text-gray-800 without dark ──
  c = c.replace(/\btext-gray-800\b(?![\s"]*dark:text)/g, 'text-gray-800 dark:text-gray-200');

  // ── text-gray-900 without dark ──
  c = c.replace(/\btext-gray-900\b(?![\s"]*dark:text)/g, 'text-gray-900 dark:text-white');

  // ── text-gray-600 without dark ──
  c = c.replace(/\btext-gray-600\b(?![\s"]*dark:text)/g, 'text-gray-600 dark:text-gray-400');

  // ── text-gray-500 without dark ──
  c = c.replace(/\btext-gray-500\b(?![\s"]*dark:text)/g, 'text-gray-500 dark:text-gray-400');

  // ── standalone className="font-bold" → add text color ──
  c = c.replace(/className="font-bold(?! text)"/g, 'className="font-bold text-gray-800 dark:text-gray-200"');

  // ── hover:bg-gray-50 without dark ──
  c = c.replace(/\bhover:bg-gray-50\b(?![\s"]*dark:hover)/g, 'hover:bg-gray-50 dark:hover:bg-white/5');

  // ── hover:bg-gray-100 without dark ──
  c = c.replace(/\bhover:bg-gray-100\b(?![\s"]*dark:hover)/g, 'hover:bg-gray-100 dark:hover:bg-white/10');

  // ── border-b without dark ──
  c = c.replace(/\bborder-b\b(?![\s"]*dark:border| border)/g, 'border-b dark:border-white/10');

  // ── border-t without dark ──
  c = c.replace(/\bborder-t\b(?![\s"]*dark:border| border)/g, 'border-t dark:border-white/10');

  // ── bg-gray-100 without dark ──
  c = c.replace(/\bbg-gray-100\b(?![\s"]*dark:bg)/g, 'bg-gray-100 dark:bg-white/10');

  // ── Clean up duplicate dark entries (run multiple times) ──
  for (let i = 0; i < 3; i++) {
    c = c.replace(/dark:bg-\[#1a1a2e\]\s+dark:bg-\[#1a1a2e\]/g, 'dark:bg-[#1a1a2e]');
    c = c.replace(/dark:bg-white\/5\s+dark:bg-white\/5/g, 'dark:bg-white/5');
    c = c.replace(/dark:bg-white\/10\s+dark:bg-white\/10/g, 'dark:bg-white/10');
    c = c.replace(/dark:border-white\/5\s+dark:border-white\/5/g, 'dark:border-white/5');
    c = c.replace(/dark:border-white\/10\s+dark:border-white\/10/g, 'dark:border-white/10');
    c = c.replace(/dark:text-gray-300\s+dark:text-gray-300/g, 'dark:text-gray-300');
    c = c.replace(/dark:text-gray-200\s+dark:text-gray-200/g, 'dark:text-gray-200');
    c = c.replace(/dark:text-gray-400\s+dark:text-gray-400/g, 'dark:text-gray-400');
    c = c.replace(/dark:text-white\s+dark:text-white/g, 'dark:text-white');
    c = c.replace(/dark:hover:bg-white\/5\s+dark:hover:bg-white\/5/g, 'dark:hover:bg-white/5');
    c = c.replace(/dark:hover:bg-white\/10\s+dark:hover:bg-white\/10/g, 'dark:hover:bg-white/10');
  }

  if (c !== original) {
    fs.writeFileSync(filePath, c);
    console.log(`✅ ${file}`);
    totalChanges++;
  }
}

console.log(`\nDone! Fixed ${totalChanges} files.`);
