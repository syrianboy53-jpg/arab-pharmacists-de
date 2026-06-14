const fs = require('fs');
const path = require('path');
const vm = require('vm');

const webDataDir = path.join(__dirname, '..', 'src', 'data');
const appDataDir = path.join(__dirname, '..', 'b1_app', 'lib', 'data');

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

  // Backup manual additions from existing app files BEFORE processing
  let manualAdditions = '';
  if (fs.existsSync(appPath)) {
    const original = fs.readFileSync(appPath, 'utf8');
    if (m.app === 'b2_data.dart') {
      const startIdx = original.indexOf('final List<Map<String, dynamic>> b2Essays');
      if (startIdx !== -1) manualAdditions = original.substring(startIdx);
    } else if (m.app === 'grammatik_data.dart') {
      const startIdx = original.indexOf('final List<Map<String, dynamic>> satzbau');
      if (startIdx !== -1) manualAdditions = original.substring(startIdx);
    } else if (m.app === 'schreiben_data.dart') {
      const startIdx = original.indexOf('final List<Map<String, dynamic>> schreibenTemplates');
      if (startIdx !== -1) {
        // Cut before schreibenLetters mapping since it's re-added later
        const endIdx = original.indexOf('final List<Map<String, dynamic>> schreibenLetters');
        manualAdditions = endIdx !== -1 ? original.substring(startIdx, endIdx) : original.substring(startIdx);
      }
    }
  }

  console.log(`Processing: ${m.web} -> ${m.app}`);

  let content = fs.readFileSync(webPath, 'utf8');

  // Strip TypeScript interfaces
  content = content.replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\}/g, '');

  // Strip type annotations from variable declarations:
  content = content.replace(/export\s+const\s+(\w+):\s*\w+(?:\[\])?\s*=/g, 'export const $1 =');
  content = content.replace(/export\s+const\s+(\w+):\s*Array<[^>]+>\s*=/g, 'export const $1 =');

  // Replace export const with var
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
    dartContent += `final ${v.type} ${v.name} = ${v.type.startsWith('List') ? 'List<Map<String, dynamic>>.from' : 'Map<String, dynamic>.from'}(json.decode(r'''${jsonString}'''));\n\n`;
  });

  fs.writeFileSync(appPath, dartContent, 'utf8');

  // Custom additions to preserve app-only data
  if (manualAdditions) {
    fs.appendFileSync(appPath, '\n' + manualAdditions, 'utf8');
    console.log(`Appended manual additions to ${m.app}`);
  }

  if (m.app === 'schreiben_data.dart') {
    const mapLetters = `
final List<Map<String, dynamic>> schreibenLetters = schreibenModels.expand((model) {
  final tasks = model['tasks'] as List<dynamic>? ?? [];
  return tasks.map((t) {
    final task = t as Map<String, dynamic>;
    return {
      'titleDe': task['typeDe'] as String? ?? '',
      'promptAr': task['promptAr'] as String? ?? '',
      'points': task['requirements'] as List<dynamic>? ?? [],
      'sampleAnswer': task['sampleAnswer'] as String? ?? '',
    };
  });
}).toList();
`;
    fs.appendFileSync(appPath, '\n' + mapLetters, 'utf8');
    console.log('Appended mapped schreibenLetters to schreiben_data.dart');
  } else if (m.app === 'leben_data.dart') {
    const classDef = `
class LebenData {
  static List<Question> get allQuestions {
    return lebenQuestions.map((q) {
      final id = q['id'] as int;
      String cat = 'Politik';
      if (id > 30 && id <= 50) {
        cat = 'Recht';
      } else if (id > 50 && id <= 65) {
        cat = 'Geschichte';
      } else if (id > 65 && id <= 80) {
        cat = 'Gesellschaft';
      } else if (id > 80 && id <= 90) {
        cat = 'Arbeit';
      } else if (id > 90) {
        cat = 'Kultur';
      }

      final opts = List<String>.from(q['options'] as List);
      return Question(
        id: id,
        question: q['question'] as String,
        questionAr: q['questionAr'] as String,
        options: opts,
        optionsAr: List<String>.filled(opts.length, ''),
        correctIndex: q['correct'] as int,
        category: cat,
      );
    }).toList();
  }

  static List<String> get categories {
    return allQuestions.map((q) => q.category ?? '').toSet().where((c) => c.isNotEmpty).toList();
  }

  static List<Question> getByCategory(String category) {
    return allQuestions.where((q) => q.category == category).toList();
  }
}
`;
    let content = fs.readFileSync(appPath, 'utf8');
    content = content.replace("import 'dart:convert';", "import 'dart:convert';\nimport '../models/question.dart';");
    fs.writeFileSync(appPath, content + classDef, 'utf8');
    console.log('Appended LebenData class helper to leben_data.dart');
  }

  console.log(`Successfully wrote ${m.app}`);
});

console.log('Sync finished!');
