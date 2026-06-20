const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

// Target the core pages with most issues
const targetFiles = [
  'LesenPage.tsx', 'SchreibenPage.tsx', 'HoerenPage.tsx', 
  'GrammarPage.tsx', 'SprechenPage.tsx', 'VocabularyPage.tsx',
  'SatzbauPage.tsx', 'B2Page.tsx', 'DrillPage.tsx',
  'EinstufungPage.tsx', 'ExamSimulationPage.tsx', 'ChatSimulatorPage.tsx',
  'SlangPage.tsx', 'FehlerPage.tsx', 'FlashcardsPage.tsx',
  'SynonymsPage.tsx', 'PronunciationLabPage.tsx', 'BriefCorrectorPage.tsx',
  'LebenPage.tsx', 'SprachbausteinePage.tsx', 'AdminDashboardPage.tsx'
];

let totalChanges = 0;

for (const file of targetFiles) {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let c = fs.readFileSync(filePath, 'utf-8');
  const original = c;

  // Strategy: Replace ALL text-white with text-gray-900 dark:text-white
  // EXCEPT when it's inside a colored background container (same className)
  
  // Colored bg patterns that justify text-white
  const coloredBgPatterns = [
    'bg-gradient', 'from-\\[', 'bg-\\[#', 'bg-green', 'bg-red', 'bg-blue',
    'bg-emerald', 'bg-violet', 'bg-amber', 'bg-purple', 'bg-orange',
    'bg-indigo', 'bg-teal', 'bg-cyan', 'bg-rose', 'bg-pink', 'bg-yellow',
    'bg-\\[#00b894', 'bg-\\[#e84393', 'bg-\\[#0984e3', 'bg-\\[#6c5ce7',
    'bg-\\[#1e3a5f', 'bg-\\[#0f2940', 'bg-\\[#fdcb6e', 'bg-\\[#e17055'
  ];
  const coloredBgRegex = new RegExp(coloredBgPatterns.join('|'));

  // Replace text-white in className strings
  c = c.replace(/className="([^"]*)"/g, (match, classes) => {
    if (!classes.includes('text-white')) return match;
    // Skip if already has dark:text-white (already adaptive)  
    if (classes.includes('text-gray-900 dark:text-white')) return match;
    // Skip if bg is colored (white text is correct on colored bg)
    if (coloredBgRegex.test(classes)) return match;
    // Skip text-white/ (opacity variants like text-white/80)
    // Replace text-white with adaptive
    const newClasses = classes.replace(/\btext-white\b(?!\/)/g, 'text-gray-900 dark:text-white');
    return `className="${newClasses}"`;
  });

  // Also fix template literal classNames
  c = c.replace(/className=\{`([^`]*)`\}/g, (match, classes) => {
    if (!classes.includes('text-white')) return match;
    if (classes.includes('text-gray-900 dark:text-white')) return match;
    if (coloredBgRegex.test(classes)) return match;
    const newClasses = classes.replace(/\btext-white\b(?!\/)/g, 'text-gray-900 dark:text-white');
    return `className={\`${newClasses}\`}`;
  });

  // Fix text-muted → text-gray-500 dark:text-gray-400
  c = c.replace(/\btext-muted\b/g, 'text-gray-500 dark:text-gray-400');

  // Fix remaining text-gold → text-amber-600 dark:text-amber-400
  c = c.replace(/\btext-gold\b/g, 'text-amber-600 dark:text-amber-400');

  // Fix bg-bg / bg-bg-light (custom theme vars)
  c = c.replace(/\bbg-bg\b(?!-)/g, 'bg-gray-100 dark:bg-[#0f0f1a]');
  c = c.replace(/\bbg-bg-light\b/g, 'bg-gray-50 dark:bg-white/5');

  // Fix hover:text-green → hover:text-[#00b894]
  c = c.replace(/\bhover:text-green\b(?!-)/g, 'hover:text-[#00b894]');

  // Fix text-green used alone → text-[#00b894]  
  c = c.replace(/\btext-green\b(?![-/])/g, 'text-[#00b894]');

  // Fix bg-green/10 → bg-[#00b894]/10
  c = c.replace(/\bbg-green\/(\d+)/g, 'bg-[#00b894]/$1');
  
  // Fix border-green → border-[#00b894]
  c = c.replace(/\bborder-green\b(?![-/])/g, 'border-[#00b894]');
  c = c.replace(/\bborder-green\/(\d+)/g, 'border-[#00b894]/$1');

  // Fix bg-red/10 → bg-red-500/10
  c = c.replace(/\bbg-red\b(?![-/])/g, 'bg-red-500');
  c = c.replace(/\bbg-red\/(\d+)/g, 'bg-red-500/$1');
  c = c.replace(/\btext-red\b(?![-/])/g, 'text-red-500');
  c = c.replace(/\bborder-red\b(?![-/])/g, 'border-red-500');
  c = c.replace(/\bborder-red\/(\d+)/g, 'border-red-500/$1');

  // Clean duplicates
  for (let i = 0; i < 3; i++) {
    c = c.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
    c = c.replace(/dark:text-gray-400 dark:text-gray-400/g, 'dark:text-gray-400');
    c = c.replace(/text-gray-900 dark:text-white text-gray-900 dark:text-white/g, 'text-gray-900 dark:text-white');
  }

  if (c !== original) {
    fs.writeFileSync(filePath, c);
    
    // Count remaining text-white (should only be in colored containers)
    const remaining = (c.match(/text-white(?!\/)/g) || []).length;
    const darkWhite = (c.match(/dark:text-white/g) || []).length;
    console.log(`✅ ${file} (remaining text-white: ${remaining - darkWhite}, adaptive: ${darkWhite})`);
    totalChanges++;
  }
}

console.log(`\nDone! Fixed ${totalChanges} files.`);
