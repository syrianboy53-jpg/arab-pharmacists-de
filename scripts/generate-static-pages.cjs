const fs = require('fs');
const path = require('path');
const vm = require('vm');

const webDataDir = path.join(__dirname, '../src/data');
const landingDir = path.join(__dirname, '../landing');

function evaluateTSFile(filePath) {
  console.log(`Evaluating file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  // Strip export const and typescript type declarations safely
  const cleanScript = content
    .replace(/export\s+const\s+(\w+)(:\s*[\w\<\>\[\]]+)?\s*=/g, 'var $1 =')
    .replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\}/g, '');

  const sandbox = {};
  vm.runInNewContext(cleanScript, sandbox);
  return sandbox;
}

// 1. Load data
const grammarLessons = require('../src/data/grammarLessons.json');
const vocabData = evaluateTSFile(path.join(webDataDir, 'vocabulary.ts')).vocabCategories;
const schreibenData = evaluateTSFile(path.join(webDataDir, 'schreiben.ts')).schreibenModels;
const speakingData = evaluateTSFile(path.join(webDataDir, 'speakingColloquial.ts')).speakingColloquialData;
const lebenData = evaluateTSFile(path.join(webDataDir, 'leben.ts')).lebenQuestions;

console.log(`Loaded:
- ${grammarLessons.length} grammar lessons
- ${vocabData.length} vocabulary categories
- ${schreibenData.length} writing models
- ${speakingData.categories.length} speaking categories
- ${lebenData.length} Leben in Deutschland questions`);

const commonHead = (title, description, canonicalUrl) => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${title} — B1 Deutsch للسوريين 🇸🇾</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://www.b1-syrer.de/brand/hero.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://www.b1-syrer.de/brand/hero.png">
  <link rel="icon" type="image/png" href="../brand/icon.png">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874998894873805" crossorigin="anonymous"></script>
  <style>
    :root {
      --green: #58cc02;
      --green-dark: #46a302;
      --blue: #1cb0f6;
      --blue-dark: #1899d6;
      --red: #ff4b4b;
      --red-dark: #ea2b2b;
      --gold: #ffc800;
      --bg-light: #ffffff;
      --card-bg: #ffffff;
      --text-main: #3c3c3c;
      --text-muted: #777777;
      --border-color: #e5e5e5;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, sans-serif;
      background: var(--bg-light);
      color: var(--text-main);
      line-height: 1.8;
      direction: rtl;
    }
    a { color: inherit; text-decoration: none; }
    .container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
    
    /* Navigation */
    .nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #ffffff;
      border-bottom: 2px solid var(--border-color);
      color: var(--text-main);
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      max-width: 1140px;
      margin: 0 auto;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 900;
      font-size: 20px;
      color: var(--green);
    }
    .brand img {
      width: 36px;
      height: 36px;
      border-radius: 12px;
    }
    .nav-links {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    .nav-links a {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-muted);
      transition: color 0.2s;
    }
    .nav-links a:hover {
      color: var(--blue);
    }
    .nav-cta {
      background: var(--blue);
      color: white !important;
      padding: 10px 16px;
      border-radius: 12px;
      border-bottom: 3px solid var(--blue-dark);
      font-size: 14px !important;
      font-weight: 800;
    }
    .nav-cta:hover { transform: translateY(2px); border-bottom-width: 1px; margin-top: 2px; }
    
    /* Hero Section */
    .hero-sec {
      background: var(--bg-light);
      color: var(--text-main);
      padding: 50px 0;
      text-align: center;
      border-bottom: 2px solid var(--border-color);
    }
    .hero-sec h1 {
      font-size: clamp(28px, 5vw, 42px);
      font-weight: 900;
      margin-bottom: 12px;
      color: var(--blue);
    }
    .hero-sec p {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto;
    }

    /* Main CTA Button */
    .cta-container {
      margin: 30px 0;
      text-align: center;
    }
    .app-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--green);
      color: white;
      font-weight: 900;
      font-size: 20px;
      padding: 18px 40px;
      border-radius: 20px;
      border-bottom: 4px solid var(--green-dark);
      transition: transform 0.1s;
    }
    .app-cta-btn:active {
      transform: translateY(4px);
      border-bottom-width: 0px;
      margin-top: 4px;
    }
    
    /* Layout grid */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin: 40px 0;
    }
    
    /* Content Cards (Duolingo Style) */
    .card {
      background: var(--card-bg);
      border: 2px solid var(--border-color);
      border-bottom-width: 4px;
      border-radius: 20px;
      padding: 24px;
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
    .card-title {
      font-size: 22px;
      font-weight: 900;
      color: var(--text-main);
      margin-bottom: 16px;
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 12px;
    }

    /* German / Arabic strict layout */
    .german-block {
      background: #f7f7f7;
      border: 2px solid var(--border-color);
      padding: 16px;
      border-radius: 16px;
      font-family: 'Inter', system-ui;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-main);
      text-align: left;
      direction: ltr;
      margin: 12px 0;
    }
    .arabic-block {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-muted);
      margin: 8px 0;
      text-align: right;
      direction: rtl;
    }
    
    /* Sidebar / Navigation block */
    .sidebar-card {
      background: #f7f7f7;
      border: 2px solid var(--border-color);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .sidebar-card h3 {
      color: var(--blue);
      margin-bottom: 12px;
      font-weight: 900;
    }
    
    /* Footer */
    .footer {
      background: var(--border-color);
      color: var(--text-muted);
      padding: 40px 0;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      margin-top: 60px;
    }
    .footer a {
      color: var(--blue);
      margin: 0 10px;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    
    /* Responsiveness */
    @media (max-width: 768px) {
      .nav-links { display: none; } /* Hide link bar on mobile for simplicity, keeping brand and CTA button */
    }
  </style>
`;

const commonHeaderHTML = `
  <nav class="nav">
    <div class="nav-inner">
      <a href="../" class="brand">
        <img src="../brand/logo.png" alt="B1-Syrer Logo" class="brand-logo">
        <span class="brand-text">B1-Syrer</span>
      </a>
      <div class="nav-links">
        <a href="../">الرئيسية</a>
        <a href="../grammatik/">القواعد</a>
        <a href="../wortschatz/">المفردات</a>
        <a href="../schreiben/">نماذج كتابة</a>
        <a href="../redemittel/">الشفهي</a>
        <a href="../leben-in-deutschland/">الحياة في ألمانيا</a>
      </div>
      <a href="../#download" class="nav-cta">📥 تحميل APK</a>
    </div>
  </nav>
`;

const commonFooterHTML = `
  <footer class="footer">
    <p>B1 Deutsch للسوريين — تطبيق مجاني تماماً لمساعدة اللاجئين في ألمانيا.</p>
    <p style="margin-top:10px;">
      <a href="../impressum/">الناشر (Impressum)</a> | 
      <a href="../datenschutz/">خصوصية البيانات (Datenschutz)</a> | 
      <a href="../agb/">الشروط والأحكام (AGB)</a>
    </p>
    <p style="margin-top:15px; font-size:13px; font-weight:800; color:var(--text-muted);">© 2026 صنع بحب من فادي الحلواني من الحسكة.</p>
  </footer>
`;

// ----------------------------------------
// GENERATE PAGE: GRAMMATIK
// ----------------------------------------
function generateGrammatikPage() {
  const dir = path.join(landingDir, 'grammatik');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let lessonsHTML = '';
  grammarLessons.forEach(l => {
    let examplesHTML = '';
    if (l.examples && l.examples.length > 0) {
      examplesHTML += '<div style="margin-top: 20px; font-weight:900; color:var(--blue); font-size:18px;">💡 أمثلة توضيحية (Beispiele):</div>';
      l.examples.forEach(ex => {
        examplesHTML += `
          <div style="display:flex; flex-direction:column; background:#f7f7f7; border:2px solid var(--border-color); border-radius:16px; padding: 16px; margin-top:12px;">
            <div style="font-family:'Inter', sans-serif; font-weight:700; font-size:16px; color:var(--text-main);" dir="ltr">${ex.de || ex.wrong}</div>
            <div style="font-weight:600; color:var(--text-muted); text-align:right; margin-top:4px;" dir="rtl">${ex.ar}</div>
          </div>
        `;
      });
    }

    lessonsHTML += `
      <article class="card">
        <h2 class="card-title" style="display:flex; flex-direction:column; gap:4px; border-bottom:2px solid var(--border-color); padding-bottom:12px;">
          <span dir="ltr" style="color:var(--green); font-family:'Inter', sans-serif;">${l.title}</span>
          <span dir="rtl" style="color:var(--text-main); font-size:20px;">${l.titleAr}</span>
        </h2>
        <div class="arabic-block" style="white-space: pre-wrap; font-size: 16px; margin: 15px 0; color:var(--text-main); line-height: 2;">${l.explanation}</div>
        ${examplesHTML}
      </article>
    `;
  });

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      ${commonHead(
        'شرح قواعد اللغة الألمانية B1 باللغة العربية',
        'شرح كامل لـ 14 درساً من قواعد الألماني B1 (غوته، تيلك، DTZ) مع أمثلة مترجمة للعربية وتمارين تفاعلية. شرح الأكوزاتيف، الداتيف، الجمل الجانبية، والمزيد.',
        'https://www.b1-syrer.de/grammatik/'
      )}
    </head>
    <body>
      ${commonHeaderHTML}
      
      <header class="hero-sec">
        <div class="container">
          <h1>📐 قواعد اللغة الألمانية B1 بالتفصيل بالعربي</h1>
          <p>أكثر من 14 درساً مبسطاً يشرح أهم وأصعب قواعد مستوى B1 الألماني لتجتاز اختبار القواعد والـ Sprachbausteine بسهولة.</p>
        </div>
      </header>
      
      <main class="container">
        <div class="cta-container">
          <a href="../app/#/grammar" class="app-cta-btn">🌐 جرب اختبارات القواعد التفاعلية في التطبيق الآن</a>
        </div>
        
        <div class="content-grid">
          ${lessonsHTML}
        </div>
        
        <div class="cta-container">
          <a href="../app/#/grammar" class="app-cta-btn">🎮 ابدأ حل تمارين القواعد (مثل دولينجو)</a>
        </div>
      </main>
      
      ${commonFooterHTML}
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(dir, 'index.html'), fullHTML.trim(), 'utf8');
  console.log('Generated: grammatik/index.html');
}

// ----------------------------------------
// GENERATE PAGE: WORTSCHATZ
// ----------------------------------------
function generateWortschatzPage() {
  const dir = path.join(landingDir, 'wortschatz');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let vocabHTML = '';
  vocabData.forEach(cat => {
    let wordsHTML = '';
    cat.words.slice(0, 12).forEach(w => {
      wordsHTML += `
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-color); padding: 8px 0;">
          <span style="font-weight:700; color:var(--green-dark); font-family:'Inter';" dir="ltr">${w.de}</span>
          <span style="color:var(--text-muted);">${w.ar}</span>
        </div>
        ${w.example ? `<div style="font-size:12px; color:var(--text-muted); font-family:'Inter'; text-align:left; margin-bottom:10px;" dir="ltr"><em>Bsp: ${w.example}</em></div>` : ''}
      `;
    });

    vocabHTML += `
      <div class="card">
        <h2 class="card-title">${cat.titleAr} — ${cat.titleDe}</h2>
        <div style="margin-top: 15px;">
          ${wordsHTML}
        </div>
        <p style="margin-top: 15px; font-size:13px; font-style:italic; text-align:center;">
          <a href="../app/#/vocabulary" style="color:var(--green); font-weight:700;">+ عرض كل كلمات هذا القسم بالتطبيق التفاعلي</a>
        </p>
      </div>
    `;
  });

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      ${commonHead(
        'أهم كلمات ومفردات الألماني B1 مترجمة للعربية',
        'مفردات وكلمات مستوى B1 الألماني مقسمة حسب مجالات الحياة اليومية: الصحة، العمل، الجوب سنتر، السكن، التسوق، مع أمثلة وطريقة النطق الصحيح.',
        'https://www.b1-syrer.de/wortschatz/'
      )}
    </head>
    <body>
      ${commonHeaderHTML}
      
      <header class="hero-sec">
        <div class="container">
          <h1>📚 مفردات وكلمات الألماني B1 مترجمة بالعربي</h1>
          <p>أكثر من 350 كلمة أساسية لمستوى B1 مقسمة في 19 مجالاً حياتياً لمساعدتك في التحدث والكتابة اليومية واجتياز الامتحان.</p>
        </div>
      </header>
      
      <main class="container">
        <div class="cta-container">
          <a href="../app/#/vocabulary" class="app-cta-btn">🌐 افتح قاموس الكلمات التفاعلي ونطقها الصوتي</a>
        </div>
        
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:24px; margin: 40px 0;">
          ${vocabHTML}
        </div>
        
        <div class="cta-container">
          <a href="../app/#/vocabulary" class="app-cta-btn">🚀 احفظ واختبر نفسك بكلمات B1 كاملة</a>
        </div>
      </main>
      
      ${commonFooterHTML}
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(dir, 'index.html'), fullHTML.trim(), 'utf8');
  console.log('Generated: wortschatz/index.html');
}

// ----------------------------------------
// GENERATE PAGE: SCHREIBEN
// ----------------------------------------
function generateSchreibenPage() {
  const dir = path.join(landingDir, 'schreiben');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let teil1Tasks = [];
  let teil2Tasks = [];
  let teil3Tasks = [];
  
  schreibenData.forEach(model => {
    (model.tasks || model.parts || []).forEach(t => {
      // Create a unified object
      const taskObj = {
        modelTitle: model.title,
        modelDesc: model.description,
        ...t
      };
      if (t.taskNumber === 1 || (t.typeDe && t.typeDe.includes('Informelle'))) {
        teil1Tasks.push(taskObj);
      } else if (t.taskNumber === 2 || (t.typeDe && t.typeDe.includes('Forum'))) {
        teil2Tasks.push(taskObj);
      } else if (t.taskNumber === 3 || (t.typeDe && t.typeDe.includes('Formelle'))) {
        teil3Tasks.push(taskObj);
      } else {
        teil1Tasks.push(taskObj); // fallback
      }
    });
  });

  const renderTasks = (tasksList, categoryTitle, icon, color) => {
    if (tasksList.length === 0) return '';
    let categoryHTML = `
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 26px; font-weight: 900; color: var(--${color}); margin-bottom: 20px; border-bottom: 3px solid var(--${color}); padding-bottom: 10px;">
          ${icon} ${categoryTitle}
        </h2>
    `;
    
    tasksList.forEach(t => {
      let phrasesHTML = '';
      if (t.usefulPhrases) {
        phrasesHTML += '<div style="margin-top: 15px; font-weight:900; color:var(--blue); font-size:18px;">💡 عبارات مفيدة (Nützliche Sätze):</div>';
        t.usefulPhrases.slice(0, 5).forEach(ph => {
          phrasesHTML += `
            <div style="display:flex; flex-direction:column; background:#f7f7f7; border:2px solid var(--border-color); border-radius:16px; padding: 12px; margin-top:10px;">
              <div style="font-family:'Inter', sans-serif; font-weight:700; font-size:16px; color:var(--text-main);" dir="ltr">${ph.de}</div>
              <div style="font-weight:600; color:var(--text-muted); text-align:right;" dir="rtl">${ph.ar}</div>
            </div>
          `;
        });
      }

      categoryHTML += `
        <div class="card" style="margin-bottom: 24px;">
          <h3 class="card-title">${t.modelTitle} — ${t.typeAr}</h3>
          <div class="arabic-block" style="color:var(--text-main); margin-bottom: 12px;"><strong>الموضوع المطلوب:</strong> ${t.promptAr}</div>
          <div class="german-block" style="color:var(--text-muted); background:transparent; border-color:transparent; padding:0; margin-bottom:16px;"><em>Aufgabe: ${t.promptDe}</em></div>
          
          <div style="margin-top: 20px;">
            <div style="font-weight:900; color:var(--green); font-size:18px; margin-bottom:8px;">✅ نموذج رسالة جاهز (Musterbrief):</div>
            <pre class="german-block" style="white-space: pre-wrap;">${t.sampleAnswer}</pre>
          </div>
          ${phrasesHTML}
        </div>
      `;
    });
    
    categoryHTML += `</div>`;
    return categoryHTML;
  };

  let writingHTML = '';
  writingHTML += renderTasks(teil1Tasks, 'Teil 1: رسالة غير رسمية (Informelle E-Mail)', '👋', 'green');
  writingHTML += renderTasks(teil2Tasks, 'Teil 2: مشاركة في منتدى (Forumbeitrag)', '💬', 'blue');
  writingHTML += renderTasks(teil3Tasks, 'Teil 3: رسالة رسمية (Formelle E-Mail)', '🏢', 'red');

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      ${commonHead(
        'نماذج رسائل B1 ألمانية جاهزة ومترجمة للعربية',
        'مواضيع ورسائل امتحان B1 الألماني جاهزة للكتابة والنسخ. رسائل اعتذار للمدرسة، بريد رسمي للجوب سنتر، شكوى غسالة، طلب شقة، بريد لزميل العمل مع ترجمة.',
        'https://www.b1-syrer.de/schreiben/'
      )}
    </head>
    <body>
      ${commonHeaderHTML}
      
      <header class="hero-sec">
        <div class="container">
          <h1>✍️ نماذج رسائل B1 ألمانية جاهزة ومترجمة</h1>
          <p>أكثر من 15 نموذج رسالة وايميل جاهز لمواقف امتحان B1 الألماني الرسمي (غوته وتيلك) مع نصائح الكتابة والعبارات الهامة.</p>
        </div>
      </header>
      
      <main class="container">
        <div class="cta-container">
          <a href="../app/#/schreiben" class="app-cta-btn">🌐 افتح قسم الرسائل التفاعلي وانسخ النماذج فوراً</a>
        </div>
        
        <div class="content-grid">
          ${writingHTML}
        </div>
        
        <div class="cta-container">
          <a href="../app/#/schreiben" class="app-cta-btn">🚀 تمرن على كتابة مواضيع B1 وأرسلها للمراجعة</a>
        </div>
      </main>
      
      ${commonFooterHTML}
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(dir, 'index.html'), fullHTML.trim(), 'utf8');
  console.log('Generated: schreiben/index.html');
}

// ----------------------------------------
// GENERATE PAGE: REDEMITTEL (speaking/slang)
// ----------------------------------------
function generateRedemittelPage() {
  const dir = path.join(landingDir, 'redemittel');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let slangHTML = '';
  speakingData.categories.forEach(cat => {
    let phrasesHTML = '';
    cat.phrases.slice(0, 10).forEach(p => {
      phrasesHTML += `
        <div style="border-bottom:1px solid #F3F4F6; padding: 12px 0;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; color:var(--green-dark); font-family:'Inter'; font-size:15.5px;" dir="ltr">${p.german}</span>
            <span style="background:var(--bg-light); font-size:11px; padding:2px 6px; border-radius:4px; font-weight:700;">${p.difficulty}</span>
          </div>
          <div style="font-family:'Inter'; font-size:13px; color:var(--text-muted); text-align:left;" dir="ltr">Standard: ${p.hochdeutsch}</div>
          <div style="color:var(--text-main); font-size:14px; margin-top:4px;">👈 العربي: <strong>${p.arabic}</strong></div>
          <div style="font-size:12.5px; color:#CE1126; margin-top:2px;">🗣️ اللفظ التقريبي: <em>${p.phonetic}</em></div>
          ${p.context ? `<div style="font-size:12px; color:var(--text-muted); margin-top:2px;">ℹ️ سياق الاستخدام: ${p.context}</div>` : ''}
        </div>
      `;
    });

    slangHTML += `
      <div class="card">
        <h2 class="card-title">${cat.icon} ${cat.nameAr} — ${cat.nameDe}</h2>
        <p style="color:var(--text-muted); font-size:13.5px; margin-bottom:15px;">${cat.descriptionAr}</p>
        <div style="margin-top:10px;">
          ${phrasesHTML}
        </div>
      </div>
    `;
  });

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      ${commonHead(
        'عبارات العامية الألمانية اليومية والشارع مترجمة بالعربي',
        'تعلم عبارات العامية الألمانية (Umgangssprache) ومصطلحات الشارع المستخدمة يومياً مع النطق وكيف تقال باللهجة السورية. عبارات التذمر، العمل، والحب.',
        'https://www.b1-syrer.de/redemittel/'
      )}
    </head>
    <body>
      ${commonHeaderHTML}
      
      <header class="hero-sec">
        <div class="container">
          <h1>🧩 عبارات العامية الألمانية والشارع (Redemittel)</h1>
          <p>تعلم كيف يتحدث الألمان في الشارع والمكتب وخارج الكتب الأكاديمية مع مرادفاتها باللهجة السورية اليومية لتتكلم كأنك ألماني محلي.</p>
        </div>
      </header>
      
      <main class="container">
        <div class="cta-container">
          <a href="../app/#/slang" class="app-cta-btn">🌐 افتح قاموس العامية والشارع الصوتي بالتطبيق</a>
        </div>
        
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap:24px; margin: 40px 0;">
          ${slangHTML}
        </div>
        
        <div class="cta-container">
          <a href="../app/#/slang" class="app-cta-btn">🚀 احفظ مئات التعبيرات الشعبية والمجازية الألمانية</a>
        </div>
      </main>
      
      ${commonFooterHTML}
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(dir, 'index.html'), fullHTML.trim(), 'utf8');
  console.log('Generated: redemittel/index.html');
}

// ----------------------------------------
// GENERATE PAGE: LEBEN IN DEUTSCHLAND
// ----------------------------------------
function generateLebenPage() {
  const dir = path.join(landingDir, 'leben-in-deutschland');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let questionsHTML = '';
  // List first 30 core questions
  lebenData.slice(0, 35).forEach(q => {
    let optionsHTML = '';
    q.options.forEach((opt, idx) => {
      const isCorrect = idx === q.correct;
      optionsHTML += `
        <li style="padding: 6px 10px; border-radius:6px; margin-top:4px; font-size:13.5px; background:${isCorrect ? '#E6F4EC' : '#fff'}; border:1px solid ${isCorrect ? '#C7E6CF' : '#E5E7EB'}; color:${isCorrect ? 'var(--green-dark)' : 'inherit'};">
          ${isCorrect ? '✅' : '⚪'} <span dir="ltr">${opt}</span>
        </li>
      `;
    });

    questionsHTML += `
      <div class="card" style="margin-bottom: 20px;">
        <div style="font-weight:900; color:var(--green-dark); font-size:16px;">السؤال ${q.id}:</div>
        <div style="font-family:'Inter'; font-weight:700; text-align:left; margin-top:4px;" dir="ltr">${q.question}</div>
        <div style="font-size:14.5px; color:var(--text-main); margin-top:4px;">👈 بالعربي: <strong>${q.questionAr}</strong></div>
        
        <ul style="list-style:none; margin-top:12px;">
          ${optionsHTML}
        </ul>
      </div>
    `;
  });

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      ${commonHead(
        'أسئلة Leben in Deutschland مع الشرح والترجمة بالعربي',
        'شرح وحل أسئلة اختبار الجنسية الألمانية والحياة في ألمانيا (460 سؤال) مترجمة بالكامل للغة العربية مع الإجابات الصحيحة ودليل الحصول على الجنسية لعام 2024.',
        'https://www.b1-syrer.de/leben-in-deutschland/'
      )}
    </head>
    <body>
      ${commonHeaderHTML}
      
      <header class="hero-sec">
        <div class="container">
          <h1>🇩🇪 اختبار الحياة في ألمانيا (Leben in Deutschland)</h1>
          <p>شرح كامل لأسئلة الـ Einbürgerungstest والـ LiD البالغة 460 سؤالاً مترجمة للعربية لمساعدتك في الحصول على شهادة الاندماج والجنسية الألمانية.</p>
        </div>
      </header>
      
      <main class="container">
        <div class="cta-container">
          <a href="../app/#/leben" class="app-cta-btn">🌐 اختبر نفسك في وضع الامتحان الحقيقي (460 سؤال)</a>
        </div>
        
        <div class="sidebar-card">
          <h3>📜 دليل الجنسية الألمانية الجديد 2024</h3>
          <p>بفضل القانون الجديد، يحق للسوريين والعرب التقديم على الجنسية بعد **5 سنوات فقط** من الإقامة بدلاً من 8، أو بعد **3 سنوات** في حال وجود إنجازات اندماج ممتازة (كاللغة B2 أو العمل التطوعي). كما تم السماح بالاحتفاظ بالجنسية الأصلية (الجنسية المزدوجة).</p>
          <p style="margin-top:10px;"><strong>أهم شروط التقديم:</strong></p>
          <ul style="padding-inline-start:20px; margin-top:6px; font-size:14px; line-height:2;">
            <li>حيازة شهادة اللغة ألماني B1 أو أعلى.</li>
            <li>النجاح في اختبار "الحياة في ألمانيا" (17 إجابة صحيحة على الأقل من 33).</li>
            <li>تأمين سبل المعيشة وتجنب الاعتماد الكامل على الـ Bürgergeld.</li>
          </ul>
        </div>

        <h2 style="font-size:22px; font-weight:800; color:var(--green-dark); margin: 30px 0 15px;">📋 عينة من الأسئلة العامة للاختبار (أول 35 سؤال):</h2>
        
        <div class="content-grid">
          ${questionsHTML}
        </div>
        
        <div class="cta-container">
          <a href="../app/#/leben" class="app-cta-btn">🎮 ابدأ التدريب التفاعلي على كل أسئلة الولايات الـ 16</a>
        </div>
      </main>
      
      ${commonFooterHTML}
    </body>
    </html>
  `;

  fs.writeFileSync(path.join(dir, 'index.html'), fullHTML.trim(), 'utf8');
  console.log('Generated: leben-in-deutschland/index.html');
}

// ----------------------------------------
// RUN GENERATOR
// ----------------------------------------
try {
  generateGrammatikPage();
  generateWortschatzPage();
  generateSchreibenPage();
  generateRedemittelPage();
  generateLebenPage();
  console.log('Static site generation completed successfully!');
} catch (err) {
  console.error('Error generating static site:', err);
  process.exit(1);
}
