const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const newVersion = parseInt(args[0], 10);

if (isNaN(newVersion) || newVersion <= 0) {
  console.error("❌ Error: Please provide a valid positive integer version number.");
  console.error("Usage: node scripts/build-apk.cjs <new_version_number>");
  console.error("Example: node scripts/build-apk.cjs 73");
  process.exit(1);
}

console.log(`\n🚀 Starting Automated APK Build Pipeline for Version ${newVersion}...\n`);

try {
  // Step 1: Sync Web Data to Flutter App
  console.log('🔄 Step 1: Syncing latest web data to Flutter app...');
  execSync('node scripts/sync_web_to_app_data.cjs', { stdio: 'inherit' });
  console.log('✅ Data sync complete!\n');

  // Step 2: Update App Version in Code and Database
  console.log(`🔄 Step 2: Bumping app version to ${newVersion} in Dart code and DB...`);
  // This must be done BEFORE building Flutter!
  execSync(`node scripts/update-app-version.js ${newVersion}`, { stdio: 'inherit' });
  console.log('✅ Version bump complete!\n');

  // Step 3: Build the Flutter APK
  console.log('🔄 Step 3: Building Flutter APK (This may take a few minutes)...');
  execSync('flutter build apk --release', { cwd: 'b1_app', stdio: 'inherit' });
  console.log('✅ Flutter build complete!\n');

  // Step 4: Copy the built APK to the landing directory
  console.log('🔄 Step 4: Copying APKs to landing/apk/ directory...');
  const sourceApk = path.join('b1_app', 'build', 'app', 'outputs', 'flutter-apk', 'app-release.apk');
  const destApk = path.join('landing', 'apk', 'b1-deutsch.apk');
  const destVersionedApk = path.join('landing', 'apk', `b1-deutsch-v${newVersion}.apk`);

  if (!fs.existsSync(sourceApk)) {
    throw new Error(`APK not found at ${sourceApk}`);
  }

  // Delete older versioned APKs if they exist to save space (keep the main one)
  const apkDir = path.join('landing', 'apk');
  if (fs.existsSync(apkDir)) {
    const files = fs.readdirSync(apkDir);
    for (const file of files) {
      if (file.startsWith('b1-deutsch-v') && file.endsWith('.apk')) {
        fs.unlinkSync(path.join(apkDir, file));
        console.log(`   Deleted old versioned APK: ${file}`);
      }
    }
  }

  fs.copyFileSync(sourceApk, destApk);
  fs.copyFileSync(sourceApk, destVersionedApk);
  console.log(`✅ APK successfully copied to:`);
  console.log(`   - ${destApk}`);
  console.log(`   - ${destVersionedApk}\n`);

  console.log('🎉 Pipeline Finished Successfully!');
  console.log('======================================================');
  console.log('📦 Next Steps to deploy:');
  console.log('1. git add .');
  console.log(`2. git commit -m "build: release Android APK v${newVersion}"`);
  console.log('3. npm run build');
  console.log('4. npx wrangler pages deploy dist --project-name=b1-syrer --commit-dirty=true');
  console.log('5. git push');
  console.log('======================================================');

} catch (error) {
  console.error('\n❌ PIPELINE FAILED!');
  console.error(error.message);
  process.exit(1);
}
