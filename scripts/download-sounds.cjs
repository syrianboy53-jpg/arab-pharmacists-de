const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../b1_app/assets/audio');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Using Wikimedia Commons / Public domain sounds
const sounds = {
  'correct.mp3': 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ding_sound_effect.ogg',
  'wrong.mp3': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Buzzer_sound_effect.ogg',
  'tada.mp3': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Tada_sound_effect.ogg'
};

Object.entries(sounds).forEach(([filename, url]) => {
  const dest = path.join(dir, filename);
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
