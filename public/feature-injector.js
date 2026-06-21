(function () {
  // Dictionary
  const translations = {
    'en': {
      'الرئيسية': 'Home',
      'دروسي': 'Lessons',
      'الخطة': 'Plan',
      'المركز': 'Hub',
      'المزيد': 'More',
      'أقسام رئيسية': 'Main Sections',
      'قواعد (Grammatik)': 'Grammar',
      'كلمات (Wortschatz)': 'Vocabulary',
      'كتابة (Schreiben)': 'Writing',
      'تحدث (Sprechen)': 'Speaking',
      'الامتحان والإقامة': 'Exams & Residency',
      'امتحان (telc/Goethe)': 'Exam (telc/Goethe)',
      'الحياة في ألمانيا': 'Life in Germany',
      'مستواك الحالي:': 'Current Level:',
      'أيام متتالية': 'Day Streak',
      'أفضل سلسلة': 'Best Streak',
      'أيام نشطة': 'Active Days',
      'كلمة اليوم': 'Word of the Day',
      'محاكاة الامتحان': 'Exam Simulation',
      'Deutsch للعرب والسوريين': 'Deutsch for Arabs & Syrians',
      'البحث عن درس أو قاعدة...': 'Search for a lesson...',
      'الوضع الليلي': 'Dark Mode',
      'اختبار تحديد المستوى': 'Placement Test',
      'بناء الجملة': 'Sentence Builder',
      'تدريب الكلمات': 'Vocab Drill',
      'المرادفات والأضداد': 'Synonyms',
      'اكتشف الأخطاء': 'Find Mistakes'
    },
    'tr': {
      'الرئيسية': 'Ana Sayfa',
      'دروسي': 'Dersler',
      'الخطة': 'Plan',
      'المركز': 'Merkez',
      'المزيد': 'Daha',
      'أقسام رئيسية': 'Ana Bölümler',
      'قواعد (Grammatik)': 'Gramer',
      'كلمات (Wortschatz)': 'Kelime',
      'كتابة (Schreiben)': 'Yazma',
      'تحدث (Sprechen)': 'Konuşma',
      'الامتحان والإقامة': 'Sınav ve İkamet',
      'امتحان (telc/Goethe)': 'Sınav (telc/Goethe)',
      'الحياة في ألمانيا': 'Almanya\'da Yaşam',
      'مستواك الحالي:': 'Mevcut Seviye:',
      'أيام متتالية': 'Günlük Seri',
      'أفضل سلسلة': 'En İyi Seri',
      'أيام نشطة': 'Aktif Günler',
      'كلمة اليوم': 'Günün Kelimesi',
      'محاكاة الامتحان': 'Sınav Simülasyonu',
      'Deutsch للعرب والسوريين': 'Araplar için Deutsch',
      'البحث عن درس أو قاعدة...': 'Ders ara...',
      'الوضع الليلي': 'Gece Modu',
      'اختبار تحديد المستوى': 'Seviye Sınavı',
      'بناء الجملة': 'Cümle Kurma',
      'تدريب الكلمات': 'Kelime Pratiği',
      'المرادفات والأضداد': 'Eşanlamlılar',
      'اكتشف الأخطاء': 'Hataları Bul'
    }
  };

  let currentLang = localStorage.getItem('app_language') || 'ar';
  let observer = null;

  function initTranslator() {
    applyTranslation();
    
    // Create a MutationObserver to translate elements as they render
    observer = new MutationObserver((mutations) => {
      let shouldTranslate = false;
      for (let m of mutations) {
        if (m.addedNodes.length > 0 || m.type === 'characterData') {
          shouldTranslate = true;
          break;
        }
      }
      if (shouldTranslate) applyTranslation();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function applyTranslation() {
    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      // Restoring original Arabic would require storing originals, 
      // but reloading the page is cleaner when switching back to Arabic.
      return; 
    }

    document.documentElement.dir = 'ltr';
    document.documentElement.lang = currentLang;

    const dict = translations[currentLang];
    if (!dict) return;

    // Walk DOM and replace text nodes
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walk.nextNode()) {
      const text = node.nodeValue.trim();
      if (text && dict[text]) {
        // We attach original text to the parent node to prevent losing it if re-rendered
        if (!node.parentElement.dataset.originalText) {
          node.parentElement.dataset.originalText = text;
        }
        node.nodeValue = node.nodeValue.replace(text, dict[text]);
      }
    }
  }

  function injectLanguageSwitcher() {
    const switcher = document.createElement('div');
    switcher.style.position = 'fixed';
    switcher.style.top = '12px';
    switcher.style.right = currentLang === 'ar' ? 'auto' : '16px';
    switcher.style.left = currentLang === 'ar' ? '16px' : 'auto';
    switcher.style.zIndex = '99999';
    switcher.style.background = '#ffffff';
    switcher.style.border = '2px solid #059669'; // Green border
    switcher.style.padding = '6px 12px';
    switcher.style.borderRadius = '20px';
    switcher.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    switcher.style.display = 'flex';
    switcher.style.alignItems = 'center';
    switcher.style.gap = '8px';
    switcher.style.fontFamily = 'Inter, sans-serif';

    const select = document.createElement('select');
    select.style.border = 'none';
    select.style.background = 'transparent';
    select.style.color = '#000000'; // Explicit dark text
    select.style.outline = 'none';
    select.style.cursor = 'pointer';
    select.style.fontWeight = '800';
    select.style.fontSize = '15px';

    const options = [
      { code: 'ar', label: '🇸🇾 AR' },
      { code: 'en', label: '🇬🇧 EN' },
      { code: 'tr', label: '🇹🇷 TR' }
    ];

    options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.code;
      option.innerText = opt.label;
      if (currentLang === opt.code) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      const newLang = e.target.value;
      localStorage.setItem('app_language', newLang);
      window.location.reload(); // Reload to reset DOM and apply new lang cleanly
    });

    switcher.appendChild(select);
    document.body.appendChild(switcher);
  }

  function injectExamButton() {
    const btn = document.createElement('a');
    btn.href = '/app/#/exam-simulation'; // Routes to the new mini-app
    btn.style.position = 'fixed';
    btn.style.bottom = '80px'; // Above the bottom nav
    btn.style.left = currentLang === 'ar' ? '16px' : 'auto';
    btn.style.right = currentLang === 'ar' ? 'auto' : '16px';
    btn.style.zIndex = '99999';
    btn.style.background = '#059669'; // Syrian Green
    btn.style.color = '#fff';
    btn.style.padding = '12px 20px';
    btn.style.borderRadius = '30px';
    btn.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.4)';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.gap = '8px';
    btn.style.fontFamily = 'Inter, sans-serif';
    btn.style.fontWeight = 'bold';
    btn.style.textDecoration = 'none';

    const icon = document.createElement('span');
    icon.innerText = '🎯';
    
    const text = document.createElement('span');
    text.innerText = currentLang === 'en' ? 'Exam Sim' : (currentLang === 'tr' ? 'Sınav Sim' : 'محاكاة الامتحان');

    btn.appendChild(icon);
    btn.appendChild(text);
    
    // Only show if we are on the Home, Learning Center, or tools pages
    // Check hash changes
    function checkVisibility() {
      const hash = window.location.hash;
      if (hash === '' || hash === '#/' || hash === '#/tools' || hash === '#/lernzentrum') {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    }
    
    window.addEventListener('hashchange', checkVisibility);
    checkVisibility(); // Initial check

    document.body.appendChild(btn);
  }

  // Run on load
  window.addEventListener('DOMContentLoaded', () => {
    injectLanguageSwitcher();
    injectExamButton();
    if (currentLang !== 'ar') {
      initTranslator();
    }
  });

})();
