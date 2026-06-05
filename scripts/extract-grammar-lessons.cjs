const fs = require('fs');
const path = require('path');

const grammatikDataPath = path.join(__dirname, '../b1_app/lib/data/grammatik_data.dart');
const outputJsonPath = path.join(__dirname, '../src/data/grammarLessons.json');

console.log('Reading:', grammatikDataPath);
if (!fs.existsSync(grammatikDataPath)) {
  console.error('File not found:', grammatikDataPath);
  process.exit(1);
}

const content = fs.readFileSync(grammatikDataPath, 'utf8');

// Find where grammarLessons starts
const startKeyword = 'final List<Map<String, dynamic>> grammarLessons =';
const startIndex = content.indexOf(startKeyword);

if (startIndex === -1) {
  console.error('Could not find grammarLessons in the file.');
  process.exit(1);
}

// Extract the array string
let arrayStr = content.substring(startIndex + startKeyword.length).trim();

// Clean Dart-specific types and syntax to make it valid JSON
// Replace raw strings r'''...''' or r"""..."""
arrayStr = arrayStr.replace(/r'''([\s\S]*?)'''/g, (_, p1) => {
  return JSON.stringify(p1);
});
arrayStr = arrayStr.replace(/r"""([\s\S]*?)"""/g, (_, p1) => {
  return JSON.stringify(p1);
});

// Remove trailing semicolon
if (arrayStr.endsWith(';')) {
  arrayStr = arrayStr.substring(0, arrayStr.length - 1);
}

// Convert Dart single-quoted maps/keys/values to JSON double quotes
let jsArrayStr = arrayStr
  .replace(/[\r\n]/g, ' ')
  .replace(/final\s+/g, '')
  .replace(/List<[^>]+>/g, '')
  .replace(/Map<[^>]+>/g, '');

// Evaluate inside a sandbox
try {
  const parsed = new Function('return ' + jsArrayStr)();
  console.log(`Successfully parsed ${parsed.length} grammar lessons.`);
  fs.writeFileSync(outputJsonPath, JSON.stringify(parsed, null, 2), 'utf8');
  console.log('Saved to:', outputJsonPath);
} catch (err) {
  console.error('Failed to parse grammarLessons array:', err);
  fs.writeFileSync(path.join(__dirname, 'debug_raw_array.txt'), jsArrayStr, 'utf8');
}
