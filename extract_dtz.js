const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-dtz-CzCuJbSn.js', 'utf8');

// The file exports many things. We can parse the file safely by executing it in a sandbox or by using a regex.
// Wait, the file uses `export { ... }` which is ES module syntax. 
// We can just import it!
import('file:///' + process.cwd().replace(/\\/g, '/') + '/public/assets/data-dtz-CzCuJbSn.js').then(m => {
  console.log('n (Schreiben) first:', JSON.stringify(m.n[0], null, 2));
  console.log('i (Sprechen) first:', JSON.stringify(m.i[0], null, 2));
  console.log('o (Bildbeschreibung) first:', JSON.stringify(m.o[0], null, 2));
}).catch(console.error);
