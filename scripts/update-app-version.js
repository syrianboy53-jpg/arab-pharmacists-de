import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
  const versionArg = process.argv[2];
  if (!versionArg) {
    console.error("Usage: node scripts/update-app-version.js <new_version_number>");
    process.exit(1);
  }

  const newVersion = parseInt(versionArg, 10);
  if (isNaN(newVersion) || newVersion <= 0) {
    console.error("Error: Please provide a valid positive integer version number.");
    process.exit(1);
  }

  console.log(`Starting version update to version: ${newVersion}`);

  // 1. Load database URL from .dev.vars
  let dbUrl = '';
  try {
    const devVarsContent = await fs.readFile(path.join(rootDir, '.dev.vars'), 'utf8');
    const match = devVarsContent.match(/NEON_DATABASE_URL="([^"]+)"/);
    if (match) {
      dbUrl = match[1];
      console.log("Loaded database URL from .dev.vars");
    }
  } catch (err) {
    console.warn("Warning: Could not read .dev.vars, using default connection string fallback.", err.message);
  }

  if (!dbUrl) {
    dbUrl = 'postgres://neondb_owner:npg_zs3ra7bgeyGq@ep-spring-leaf-al0a55ug.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require';
  }

  // 2. Update b1_app/pubspec.yaml
  const pubspecPath = path.join(rootDir, 'b1_app', 'pubspec.yaml');
  let pubspecContent = await fs.readFile(pubspecPath, 'utf8');
  const pubspecRegex = /version:\s+(\d+\.\d+\.\d+)\+(\d+)/;
  if (!pubspecRegex.test(pubspecContent)) {
    throw new Error("Could not find version pattern in pubspec.yaml");
  }
  const pubspecMatch = pubspecContent.match(pubspecRegex);
  const semanticVersion = pubspecMatch[1];
  pubspecContent = pubspecContent.replace(pubspecRegex, `version: ${semanticVersion}+${newVersion}`);
  await fs.writeFile(pubspecPath, pubspecContent, 'utf8');
  console.log(`[✔] Updated pubspec.yaml to version: ${semanticVersion}+${newVersion}`);

  // 3. Update b1_app/lib/providers/app_provider.dart
  const appProviderPath = path.join(rootDir, 'b1_app', 'lib', 'providers', 'app_provider.dart');
  let providerContent = await fs.readFile(appProviderPath, 'utf8');
  const providerRegex = /static\s+const\s+int\s+appVersion\s+=\s+(\d+);/;
  if (!providerRegex.test(providerContent)) {
    throw new Error("Could not find appVersion constant in app_provider.dart");
  }
  providerContent = providerContent.replace(providerRegex, `static const int appVersion = ${newVersion};`);
  await fs.writeFile(appProviderPath, providerContent, 'utf8');
  console.log(`[✔] Updated app_provider.dart static const int appVersion = ${newVersion}`);

  // 4. Update functions/config.ts fallback
  const configPath = path.join(rootDir, 'functions', 'config.ts');
  let configContent = await fs.readFile(configPath, 'utf8');
  const configRegex = /\bapk_version:\s*['"]\d+['"]/g;
  if (!configRegex.test(configContent)) {
    throw new Error("Could not find apk_version keys in functions/config.ts");
  }
  configContent = configContent.replace(configRegex, `apk_version: '${newVersion}'`);
  await fs.writeFile(configPath, configContent, 'utf8');
  console.log(`[✔] Updated functions/config.ts fallbacks to apk_version: '${newVersion}'`);

  // 4.5. Update landing/index.html version text
  const landingIndexPath = path.join(rootDir, 'landing', 'index.html');
  try {
    let landingContent = await fs.readFile(landingIndexPath, 'utf8');
    // Find (إصدار \d+) in landing/index.html
    const landingVersionRegex = /\(إصدار\s+\d+\)/g;
    if (landingVersionRegex.test(landingContent)) {
      landingContent = landingContent.replace(landingVersionRegex, `(إصدار ${newVersion})`);
      await fs.writeFile(landingIndexPath, landingContent, 'utf8');
      console.log(`[✔] Updated landing/index.html download link version text to (إصدار ${newVersion})`);
    } else {
      console.warn("[⚠️] Warning: Could not find version text (إصدار X) in landing/index.html to replace.");
    }
  } catch (err) {
    console.warn(`[⚠️] Warning: Could not update landing/index.html version text: ${err.message}`);
  }

  // 5. Connect to Neon database and update configuration tables
  console.log("Connecting to database and updating remote configurations...");
  const host = dbUrl.split('@')[1].split('/')[0];
  const dbEndpoint = `https://${host}/sql`;

  async function queryDb(sql, params = []) {
    const res = await fetch(dbEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': dbUrl,
      },
      body: JSON.stringify({ query: sql, params }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Neon DB query failed: ${text}`);
    }
    return res.json();
  }

  // Copy b1-deutsch.apk to b1-deutsch-v{newVersion}.apk to prevent raw.githubusercontent caching
  const apkDir = path.join(rootDir, 'landing', 'apk');
  const srcApk = path.join(apkDir, 'b1-deutsch.apk');
  const destApk = path.join(apkDir, `b1-deutsch-v${newVersion}.apk`);

  try {
    await fs.copyFile(srcApk, destApk);
    console.log(`[✔] Copied APK to version-specific path: ${destApk}`);
  } catch (err) {
    // Try copying from root as fallback
    try {
      const rootApk = path.join(rootDir, 'b1-deutsch.apk');
      await fs.copyFile(rootApk, destApk);
      console.log(`[✔] Copied APK from root to version-specific path: ${destApk}`);
    } catch (fallbackErr) {
      console.warn(`[⚠️] Warning: Could not create versioned APK file: ${fallbackErr.message}`);
    }
  }

  // Update apk_version
  await queryDb("UPDATE config SET value = $1 WHERE key = 'apk_version'", [newVersion.toString()]);
  console.log(`[✔] Neon Database: Updated 'apk_version' to '${newVersion}'`);

  // Update apk_url
  await queryDb("UPDATE config SET value = 'https://www.b1-syrer.de/b1-deutsch.apk' WHERE key = 'apk_url'");
  console.log(`[✔] Neon Database: Ensured 'apk_url' is set to custom redirection`);

  // Update apk_raw_url
  const newApkRawUrl = `https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/b1-deutsch-v${newVersion}.apk`;
  await queryDb("UPDATE config SET value = $1 WHERE key = 'apk_raw_url'", [newApkRawUrl]);
  console.log(`[✔] Neon Database: Updated 'apk_raw_url' to '${newApkRawUrl}'`);

  // Update dynamic announcement
  const announcementText = `تنبيه: يتوفر تحديث جديد وهام جداً للتطبيق (إصدار ${newVersion}) يحل مشكلة تكرار إشعار التحديث نهائياً، ويحتوي على قسم التدريب العشوائي والشامل على القواعد (قاعدة بيانات تدريب القواعد) مع نظام تتبع التقدم وعلامات إتمام الدروس (+25 XP عند إكمال التدريب). يرجى تنزيل التحديث الآن.`;
  await queryDb("UPDATE config SET value = $1 WHERE key = 'announcement'", [announcementText]);
  console.log(`[✔] Neon Database: Updated 'announcement' text referencing version ${newVersion}`);

  // Fetch updated config values to verify
  const verifyRes = await queryDb("SELECT key, value FROM config WHERE key IN ('apk_version', 'apk_url', 'apk_raw_url', 'announcement')");
  console.log("Database Verification Output:", verifyRes.rows);

  console.log(`\n🎉 Success! Version ${newVersion} has been fully applied to code files, functions fallback, and remote database configuration.`);
}

run().catch(err => {
  console.error("❌ Version update failed:", err.message);
  process.exit(1);
});
