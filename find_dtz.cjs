const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-dtz-CzCuJbSn.js', 'utf8');

const sIdx = orig.indexOf('[{id:`dtz-schreiben-1`');
console.log('Schreiben:', sIdx !== -1 ? orig.slice(sIdx - 10, sIdx + 30) : 'not found');

const spIdx = orig.indexOf('[{id:`dtz-sprechen-1`');
console.log('Sprechen:', spIdx !== -1 ? orig.slice(spIdx - 10, spIdx + 30) : 'not found');

const bIdx = orig.indexOf('[{title:`👨‍👩‍👧 العائلة (Familie)`');
console.log('Bild:', bIdx !== -1 ? orig.slice(bIdx - 10, bIdx + 30) : 'not found');
