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
    if (path.extname(src) === '.apk') {
      console.log(`Skipping APK file: ${path.basename(src)} (handled by page function)...`);
      return;
    }
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
// Disabled: Vite now compiles and injects script hashes directly into dist/app/index.html using the root index.html template.
/*
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
*/

// Copy _redirects to dist/_redirects so Cloudflare Pages reads it
const redirectsSrc = path.resolve('public/_redirects');
const redirectsDest = path.resolve('dist/_redirects');
console.log(`Copying redirects from ${redirectsSrc} to ${redirectsDest}...`);
if (fs.existsSync(redirectsSrc)) {
  fs.copyFileSync(redirectsSrc, redirectsDest);
  console.log('Redirects file copied successfully.');
} else {
  console.log('No redirects file to copy.');
}

// Copy ads.txt to dist/ads.txt so AdSense can find it at the root domain
const adsSrc = path.resolve('public/ads.txt');
const adsDest = path.resolve('dist/ads.txt');
console.log(`Copying ads.txt from ${adsSrc} to ${adsDest}...`);
if (fs.existsSync(adsSrc)) {
  fs.copyFileSync(adsSrc, adsDest);
  console.log('ads.txt file copied successfully.');
} else {
  // If public/ads.txt doesn't exist, try landing/ads.txt
  const landingAdsSrc = path.resolve('landing/ads.txt');
  if (fs.existsSync(landingAdsSrc)) {
    fs.copyFileSync(landingAdsSrc, adsDest);
    console.log('ads.txt file copied successfully from landing.');
  } else {
    console.log('No ads.txt file to copy.');
  }
}

// Copy legal compliance and guides pages from public/ to root dist/
const legalFolders = ['impressum', 'datenschutz', 'privacy', 'agb', 'ueber-uns', 'leitfaden'];
for (const folder of legalFolders) {
  const src = path.resolve('public', folder);
  const dest = path.resolve('dist', folder);
  if (fs.existsSync(src)) {
    console.log(`Copying ${folder} to ${dest}...`);
    copyRecursiveSync(src, dest);
  }
}

// Copy the legal sub-app bundle assets from public/assets to root dist/assets
const legalAssets = ['index-jxGr3yiO.js', 'index-BfhUiy1k.css'];
for (const asset of legalAssets) {
  const src = path.resolve('public/assets', asset);
  const dest = path.resolve('dist/assets', asset);
  if (fs.existsSync(src)) {
    console.log(`Copying asset ${asset} to ${dest}...`);
    // Ensure parent dir exists
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// Copy robots.txt to root dist/ so it is served at the domain root
const robotsSrc = path.resolve('public/robots.txt');
const robotsDest = path.resolve('dist/robots.txt');
if (fs.existsSync(robotsSrc)) {
  fs.copyFileSync(robotsSrc, robotsDest);
  console.log('robots.txt copied to root dist.');
}

// Copy sitemap.xml to root dist/ so it is served at the domain root
const sitemapSrc = path.resolve('public/sitemap.xml');
const sitemapDest = path.resolve('dist/sitemap.xml');
if (fs.existsSync(sitemapSrc)) {
  fs.copyFileSync(sitemapSrc, sitemapDest);
  console.log('sitemap.xml copied to root dist.');
}



