const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-lesen-D_1VaT8K.js', 'utf8');

const start = orig.indexOf('var e=') + 6;
const end = orig.indexOf(';export{e as t}');

const eStr = orig.slice(start, end);
// eStr is an array literal string. To parse it without a bundler, we can use a trick:
const e = eval('(' + eStr + ')');

console.log(JSON.stringify(e[0].parts[1], null, 2));
