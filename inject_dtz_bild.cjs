const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-dtz-CzCuJbSn.js', 'utf8');

let newChunk = orig;

const newBildTopics = [
  {
    title: "🛒 التسوق في السوبر ماركت (Einkaufen im Supermarkt)",
    items: [
      "الوقوف على الصندوق (Kasse)",
      "البحث عن المنتجات (Produkte suchen)",
      "الدفع نقداً أو بالبطاقة (Bar oder mit Karte zahlen)",
      "العروض الخاصة (Sonderangebote)"
    ]
  },
  {
    title: "🏫 في مدرسة اللغة (In der Sprachschule)",
    items: [
      "الطلاب والمعلم في الصف",
      "العمل في مجموعات (Gruppenarbeit)",
      "السبورة والكتب (Tafel und Bücher)",
      "الامتحانات والشهادات (Prüfungen und Zertifikate)"
    ]
  },
  {
    title: "🚉 في محطة القطار (Am Bahnhof)",
    items: [
      "انتظار القطار على الرصيف (Am Bahnsteig warten)",
      "تأخير القطار (Zugverspätung)",
      "حقائب السفر والمسافرين (Gepäck und Reisende)",
      "شراء التذاكر (Fahrkarten kaufen)"
    ]
  },
  {
    title: "🏢 مقابلة عمل (Vorstellungsgespräch)",
    items: [
      "الجلوس مع المدير (Mit dem Chef sprechen)",
      "الملابس الرسمية (Formelle Kleidung)",
      "السيرة الذاتية (Lebenslauf)",
      "الحديث عن الخبرات (Über Erfahrungen sprechen)"
    ]
  }
];

const bIdx = newChunk.indexOf('c=[{"title":"🩺 عند الطبيب');
if (bIdx !== -1) {
  let injectStr = '';
  for (let topic of newBildTopics) {
    injectStr += JSON.stringify(topic) + ',';
  }
  newChunk = newChunk.slice(0, bIdx + 3) + injectStr + newChunk.slice(bIdx + 3);
  console.log('Injected 4 new Bildbeschreibung topics!');
  fs.writeFileSync('public/assets/data-dtz-CzCuJbSn.js', newChunk);
} else {
  console.log('Could not find injection point!');
}
