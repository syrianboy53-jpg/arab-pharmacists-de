const fs = require('fs');
const path = require('path');
const vm = require('vm');

const webDataDir = 'C:\\Users\\hadi9\\.gemini\\antigravity\\scratch\\arab-pharmacists-de\\src\\data';
const appDataDir = 'C:\\Users\\hadi9\\.gemini\\antigravity\\scratch\\arab-pharmacists-de\\b1_app\\lib\\data';

console.log('Syncing data from Web (TS) to App (Dart):');
console.log('-----------------------------------------');

const mappings = [
  { web: 'vocabulary.ts', app: 'vocab_data.dart', vars: [{ name: 'vocabCategories', type: 'List<Map<String, dynamic>>' }] },
  { web: 'grammar.ts', app: 'grammatik_data.dart', vars: [{ name: 'commonMistakes', type: 'List<Map<String, dynamic>>' }, { name: 'trennbareVerben', type: 'List<Map<String, dynamic>>' }] },
  { web: 'lesen.ts', app: 'lesen_data.dart', vars: [{ name: 'lesenModels', type: 'List<Map<String, dynamic>>' }] },
  { web: 'hoeren.ts', app: 'hoeren_data.dart', vars: [{ name: 'hoerenModels', type: 'List<Map<String, dynamic>>' }] },
  { web: 'schreiben.ts', app: 'schreiben_data.dart', vars: [{ name: 'schreibenModels', type: 'List<Map<String, dynamic>>' }] },
  { web: 'speakingColloquial.ts', app: 'speaking_colloquial_data.dart', vars: [{ name: 'speakingColloquialData', type: 'Map<String, dynamic>' }] },
  { web: 'sprachbausteine.ts', app: 'sprachbausteine_data.dart', vars: [{ name: 'pruefungsFragen', type: 'List<Map<String, dynamic>>' }] },
  { web: 'b2.ts', app: 'b2_data.dart', vars: [{ name: 'telcB2Models', type: 'List<Map<String, dynamic>>' }] },
  { web: 'leben.ts', app: 'leben_data.dart', vars: [{ name: 'lebenQuestions', type: 'List<Map<String, dynamic>>' }] }
];

mappings.forEach(m => {
  const webPath = path.join(webDataDir, m.web);
  const appPath = path.join(appDataDir, m.app);

  if (!fs.existsSync(webPath)) {
    console.log(`Web file not found: ${webPath}`);
    return;
  }

  console.log(`Processing: ${m.web} -> ${m.app}`);

  const content = fs.readFileSync(webPath, 'utf8');
  // Strip export const and replace with var assignments so we can run them in vm
  const cleanScript = content.replace(/export\s+const\s+(\w+)/g, 'var $1');

  const sandbox = {};
  try {
    vm.runInNewContext(cleanScript, sandbox);
  } catch (err) {
    console.error(`Error executing script ${m.web} in VM:`, err);
    return;
  }

  let dartContent = `// Automatically generated from Web data (${m.web}) on ${new Date().toISOString()}\n`;
  dartContent += `import 'dart:convert';\n\n`;

  m.vars.forEach(v => {
    const val = sandbox[v.name];
    if (val === undefined) {
      console.error(`Variable ${v.name} not found in evaluated script of ${m.web}`);
      return;
    }

    const jsonString = JSON.stringify(val);
    // Escape backslashes and single quotes correctly for Dart raw triple quotes r'''...'''
    // Since we use raw string, we don't have to escape standard backslashes! 
    // We only need to make sure we don't have triple quotes in the jsonString (which won't happen naturally in JSON).
    dartContent += `final ${v.type} ${v.name} = ${v.type.startsWith('List') ? 'List<Map<String, dynamic>>.from' : 'Map<String, dynamic>.from'}(json.decode(r'''${jsonString}'''));\n\n`;
  });

  fs.writeFileSync(appPath, dartContent, 'utf8');
  console.log(`Successfully wrote ${m.app}`);
});

console.log('Sync finished!');
