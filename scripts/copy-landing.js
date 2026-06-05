import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('landing');
const destDir = path.resolve('dist');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    // Ensure parent dir exists
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log(`Copying landing page files from ${srcDir} to ${destDir}...`);
if (fs.existsSync(srcDir)) {
  copyRecursiveSync(srcDir, destDir);
  console.log('Landing page files copied successfully.');
} else {
  console.error(`Error: Source directory ${srcDir} does not exist!`);
  process.exit(1);
}

// Copy the restored React app index.html to dist/app/index.html
const restoredAppIndexSrc = path.resolve('public/index.html');
const restoredAppIndexDest = path.resolve('dist/app/index.html');
console.log(`Copying restored app entry from ${restoredAppIndexSrc} to ${restoredAppIndexDest}...`);
if (fs.existsSync(restoredAppIndexSrc)) {
  fs.copyFileSync(restoredAppIndexSrc, restoredAppIndexDest);
  console.log('Restored React app index.html copied successfully.');
} else {
  console.error(`Error: Restored app index file ${restoredAppIndexSrc} does not exist!`);
  process.exit(1);
}

