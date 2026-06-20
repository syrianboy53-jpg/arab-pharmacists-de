const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Fix dark backgrounds: gray-800 -> [#1a1a2e]
  content = content.replace(/dark:bg-gray-800/g, 'dark:bg-[#1a1a2e]');
  content = content.replace(/dark:bg-gray-900/g, 'dark:bg-[#0f0f1a]');
  
  // Fix dark borders: gray-700 -> white/5
  content = content.replace(/dark:border-gray-700/g, 'dark:border-white/5');
  content = content.replace(/dark:border-gray-600/g, 'dark:border-white/10');
  
  // Fix text colors that might be invisible
  // h1 tags without dark mode text
  content = content.replace(/className="text-2xl font-bold flex items-center gap-2"/g, 
    'className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-white"');

  // Fix bg-white without dark mode
  content = content.replace(/bg-white rounded-2xl/g, 'bg-white dark:bg-[#1a1a2e] rounded-2xl');
  content = content.replace(/bg-white rounded-xl/g, 'bg-white dark:bg-[#1a1a2e] rounded-xl');
  
  // Fix border-gray-100 without dark
  content = content.replace(/border-gray-100(?! dark)/g, 'border-gray-200 dark:border-white/5');

  // Fix font-bold without explicit text color on h2/h3
  content = content.replace(/className="font-bold mb-3"/g, 'className="font-bold mb-3 text-gray-800 dark:text-gray-200"');
  content = content.replace(/className="font-bold mb-2"/g, 'className="font-bold mb-2 text-gray-800 dark:text-gray-200"');
  content = content.replace(/className="text-xl font-bold mb-2"/g, 'className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200"');
  content = content.replace(/className="text-xl font-bold mb-1"/g, 'className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-200"');

  // Fix plain "text-sm text-gray-500" without dark variant
  content = content.replace(/text-gray-500(?!" )/g, (match, offset) => {
    const after = content.substring(offset + match.length, offset + match.length + 20);
    if (after.includes('dark:') || after.includes('text-gray-4')) return match;
    return 'text-gray-500 dark:text-gray-400';
  });
  
  // Fix bg-gray-100 without dark
  content = content.replace(/bg-gray-100 dark:bg-gray-700/g, 'bg-gray-100 dark:bg-white/10');

  // Remove duplicate dark: entries
  content = content.replace(/dark:bg-\[#1a1a2e\] dark:bg-\[#1a1a2e\]/g, 'dark:bg-[#1a1a2e]');
  content = content.replace(/dark:border-white\/5 dark:border-white\/5/g, 'dark:border-white/5');
  content = content.replace(/dark:text-gray-400 dark:text-gray-400/g, 'dark:text-gray-400');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    const changes = content.split('\n').length - original.split('\n').length;
    console.log(`✅ Fixed: ${file}`);
    totalChanges++;
  }
}

console.log(`\nDone! Fixed ${totalChanges} files.`);
