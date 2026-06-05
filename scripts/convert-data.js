import fs from 'fs';
import path from 'path';

const workspaceDir = 'C:/Users/hadi9/.gemini/antigravity/scratch/arab-pharmacists-de';
const dartDataDir = path.join(workspaceDir, 'b1_app/lib/data');
const tsDataDir = path.join(workspaceDir, 'src/data');

const filesToConvert = [
  { dart: 'vocab_data.dart', ts: 'vocabulary.ts', variableName: 'vocabCategories' },
  { dart: 'schreiben_data.dart', ts: 'schreiben.ts', variableName: 'schreibenModels' },
  { dart: 'grammatik_data.dart', ts: 'grammar.ts', variableNames: ['commonMistakes', 'trennbareVerben', 'grammarLessons', 'satzbau'] },
  { dart: 'b2_data.dart', ts: 'b2.ts', variableName: 'telcB2Models' },
  { dart: 'lesen_data.dart', ts: 'lesen.ts', variableName: 'lesenModels' },
  { dart: 'hoeren_data.dart', ts: 'hoeren.ts', variableName: 'hoerenModels' },
  { dart: 'sprachbausteine_data.dart', ts: 'sprachbausteine.ts', variableName: 'pruefungsFragen' }
];

function cleanAndParse(filePath, varNameOrNames) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace final Dart definitions and imports
  let cleaned = content
    .replace(/import\s+['"][^'"]+['"];/g, '') // Remove Dart imports
    .replace(/final\s+List<Map<String, dynamic>>/g, 'var')
    .replace(/final\s+List<Map<String, String>>/g, 'var')
    .replace(/final\s+List<String>/g, 'var')
    .replace(/final\s+Map<String, dynamic>/g, 'var')
    .replace(/final\s+/g, 'var ');

  // Handle triple quotes
  cleaned = cleaned.replace(/'''([\s\S]*?)'''/g, (_, p1) => {
    // Escape backticks if any
    return '`' + p1.replace(/`/g, '\\`') + '`';
  });
  cleaned = cleaned.replace(/"""([\s\S]*?)"""/g, (_, p1) => {
    return '`' + p1.replace(/`/g, '\\`') + '`';
  });

  // Evaluate the Javascript code to extract variables
  try {
    const names = Array.isArray(varNameOrNames) ? varNameOrNames : [varNameOrNames];
    
    // We append code to assign variables to sandbox
    let assignments = '\nconst sandbox = {};\n';
    names.forEach(name => {
      assignments += `if (typeof ${name} !== 'undefined') sandbox.${name} = ${name};\n`;
    });
    
    const contextEvaluator = new Function(cleaned + assignments + 'return sandbox;');
    const result = contextEvaluator();
    return result;
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err);
    // Fallback: extract substring between brackets if single variable
    if (typeof varNameOrNames === 'string') {
      const startIdx = content.indexOf('[');
      const endIdx = content.lastIndexOf(']');
      if (startIdx !== -1 && endIdx !== -1) {
        const arrayStr = content.substring(startIdx, endIdx + 1);
        try {
          // Replace simple single quotes and newlines
          const sanitized = arrayStr
            .replace(/'/g, '"')
            .replace(/\\n/g, '\\n');
          return { [varNameOrNames]: JSON.parse(sanitized) };
        } catch (jsonErr) {
          console.error(`JSON parse fallback failed for ${filePath}`);
        }
      }
    }
    throw err;
  }
}

function run() {
  console.log('Starting data conversion...');

  // Ensure output directory exists
  if (!fs.existsSync(tsDataDir)) {
    fs.mkdirSync(tsDataDir, { recursive: true });
  }

  filesToConvert.forEach(item => {
    const dartPath = path.join(dartDataDir, item.dart);
    const tsPath = path.join(tsDataDir, item.ts);

    if (!fs.existsSync(dartPath)) {
      console.warn(`Dart file not found: ${dartPath}`);
      return;
    }

    console.log(`Converting ${item.dart} -> ${item.ts}...`);
    const varNames = item.variableNames || item.variableName;
    const parsedData = cleanAndParse(dartPath, varNames);

    let tsContent = `// Automatically generated from B1 Flutter data - v52\n\n`;
    const names = Array.isArray(varNames) ? varNames : [varNames];

    names.forEach(name => {
      if (parsedData[name]) {
        tsContent += `export const ${name} = ${JSON.stringify(parsedData[name], null, 2)};\n\n`;
      } else {
        console.warn(`Variable ${name} not found in ${item.dart}`);
      }
    });

    fs.writeFileSync(tsPath, tsContent, 'utf-8');
    console.log(`Successfully wrote ${item.ts}`);
  });

  // Convert deutsch-sprechen-app data.js to speakingColloquial.ts
  const sprechenDataPath = 'C:/Users/hadi9/.gemini/antigravity/scratch/deutsch-sprechen-app/data.js';
  const sprechenTsPath = path.join(tsDataDir, 'speakingColloquial.ts');

  if (fs.existsSync(sprechenDataPath)) {
    console.log(`Converting deutsch-sprechen-app data.js to speakingColloquial.ts...`);
    let content = fs.readFileSync(sprechenDataPath, 'utf-8');
    
    // Evaluate data.js - mock window to avoid ReferenceError
    const contextEvaluator = new Function('const window = {};\n' + content + '\nreturn CONVERSATION_DATA;');
    try {
      const conversationData = contextEvaluator();
      
      let tsContent = `// Automatically generated from deutsch-sprechen-app/data.js\n\n`;
      tsContent += `export const speakingColloquialData = ${JSON.stringify(conversationData, null, 2)};\n`;
      
      fs.writeFileSync(sprechenTsPath, tsContent, 'utf-8');
      console.log('Successfully wrote speakingColloquial.ts');
    } catch (err) {
      console.error('Error parsing speaking-app data.js:', err);
    }
  } else {
    console.warn(`Speaking app data.js not found at: ${sprechenDataPath}`);
  }

  console.log('Data conversion finished!');
}

run();
