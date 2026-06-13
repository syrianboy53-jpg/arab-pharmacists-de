const fs = require('fs');
const orig = fs.readFileSync('public/assets/data-dtz-CzCuJbSn.js', 'utf8');

let newChunk = orig;

// 1. Inject new Schreiben task (Letter to school)
const newSchreiben = {
  id: "dtz-schreiben-4",
  titleAr: "رسالة إلى المدرسة (مرض الطفل)",
  titleDe: "Brief an die Schule",
  scenarioAr: "ابنك/ابنتك مريض ولا يستطيع الذهاب إلى المدرسة اليوم. اكتب رسالة قصيرة إلى المعلم/ة.",
  scenarioDe: "Ihr Sohn / Ihre Tochter ist krank und kann heute nicht in die Schule gehen. Schreiben Sie eine kurze Entschuldigung an die Lehrkraft.",
  points: [
    { de: "Warum schreiben Sie?", ar: "لماذا تكتب؟ (السبب)" },
    { de: "Was hat das Kind?", ar: "مِمَّ يشكو الطفل؟ (المرض)" },
    { de: "Wann kommt das Kind wieder?", ar: "متى سيعود الطفل إلى المدرسة؟" },
    { de: "Hausaufgaben", ar: "الوظائف المدرسية (كيف سيحصل عليها؟)" }
  ],
  greetings: [
    { de: "Sehr geehrte(r) Frau/Herr [Name],", ar: "السيد(ة) المحترم(ة) [الاسم]،", usage: "رسمي لمعلم(ة)" }
  ],
  closings: [
    { de: "Mit freundlichen Grüßen", ar: "مع أطيب التحيات", usage: "رسمي" }
  ],
  sampleAnswerDe: "Sehr geehrte Frau Müller,\n\nich schreibe Ihnen, weil mein Sohn Ali heute leider nicht in die Schule kommen kann. Er hat seit gestern Abend starkes Fieber und Husten.\n\nDer Arzt sagt, er muss drei Tage im Bett bleiben. Ich denke, er kommt am Montag wieder zur Schule.\n\nKönnen Sie mir bitte sagen, welche Hausaufgaben die Klasse heute macht? Ein Mitschüler kann die Aufgaben für Ali mitbringen.\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen\n[Ihr Name]",
  sampleAnswerAr: "السيدة مولر المحترمة، أكتب لكِ لأن ابني علي للأسف لا يستطيع المجيء إلى المدرسة اليوم. لديه حمى شديدة وسعال منذ مساء أمس. يقول الطبيب إنه يجب أن يبقى في السرير لثلاثة أيام. أعتقد أنه سيعود إلى المدرسة يوم الاثنين. هل يمكنك من فضلك إخباري ما هي الوظائف التي سيأخذها الصف اليوم؟ يمكن لزميله أن يحضر الوظائف لعلي. شكراً لتفهمك. مع أطيب التحيات.",
  usefulPhrases: [
    { de: "Mein Kind kann heute nicht in die Schule kommen.", ar: "طفلي لا يستطيع المجيء للمدرسة اليوم." },
    { de: "Er/Sie hat Fieber.", ar: "لديه/لديها حمى." },
    { de: "Vielen Dank für Ihr Verständnis.", ar: "شكراً لتفهمك." }
  ],
  wordCount: "~75 كلمة"
};

const sIdx = newChunk.indexOf('u=[{id:`dtz-schreiben-1`');
if (sIdx !== -1) {
  const injectStr = JSON.stringify(newSchreiben) + ',';
  newChunk = newChunk.slice(0, sIdx + 3) + injectStr + newChunk.slice(sIdx + 3);
  console.log('Injected Schreiben!');
}

// 2. Inject new Sprechen task (Planning a birthday)
const newSprechen = {
  id: "dtz-sprechen-4",
  partNumber: 3,
  titleAr: "الجزء 3: تخطيط مشترك (عيد ميلاد)",
  titleDe: "Teil 3: Gemeinsam etwas planen",
  durationMin: 4,
  descriptionAr: "يجب أن تخطط مع زميلك لحفلة عيد ميلاد صديق مشترك.",
  taskDe: "Ein guter Freund von Ihnen hat nächste Woche Geburtstag. Sie möchten eine Überraschungsparty organisieren. Planen Sie gemeinsam, was Sie tun möchten.",
  examples: [
    { de: "Weißt du schon, dass Ahmad nächste Woche Geburtstag hat?", ar: "هل تعرف أن عيد ميلاد أحمد الأسبوع القادم؟" },
    { de: "Ja! Wir sollten eine Überraschungsparty für ihn machen. Was denkst du?", ar: "نعم! يجب أن نقيم له حفلة مفاجئة. ما رأيك؟" },
    { de: "Das ist eine tolle Idee! Wo sollen wir feiern?", ar: "فكرة رائعة! أين يجب أن نحتفل؟" },
    { de: "Vielleicht bei mir zu Hause, ich habe ein großes Wohnzimmer.", ar: "ربما في منزلي، لدي غرفة معيشة كبيرة." },
    { de: "Gut, und was ist mit dem Essen und den Getränken?", ar: "جيد، وماذا عن الطعام والمشروبات؟" },
    { de: "Jeder kann etwas mitbringen. Ich mache einen Salat und backe einen Kuchen.", ar: "كل شخص يمكنه إحضار شيء. أنا سأصنع سلطة وأخبز كعكة." },
    { de: "Super, ich kaufe die Getränke. Sollen wir ihm auch ein Geschenk kaufen?", ar: "ممتاز، أنا سأشتري المشروبات. هل يجب أن نشتري له هدية أيضاً؟" },
    { de: "Ja, vielleicht einen Gutschein für ein Restaurant.", ar: "نعم، ربما قسيمة لمطعم." }
  ],
  tipsAr: [
    "✅ استمع جيداً لزميلك وتفاعل مع أفكاره (Das ist eine gute Idee / Ich finde das nicht so gut).",
    "🎯 قسّم المهام (من سيشتري؟ من سيطبخ؟ متى؟ أين؟)",
    "⚠️ لا تتحدث لوحدك لفترة طويلة، يجب أن يكون حواراً متبادلاً."
  ]
};

const spIdx = newChunk.indexOf('d=[{id:`dtz-sprechen-1`');
if (spIdx !== -1) {
  const injectStr = JSON.stringify(newSprechen) + ',';
  newChunk = newChunk.slice(0, spIdx + 3) + injectStr + newChunk.slice(spIdx + 3);
  console.log('Injected Sprechen!');
}

// 3. Inject new Bildbeschreibung topic (At the doctor)
const newBild = {
  title: "🩺 عند الطبيب (Beim Arzt)",
  items: [
    "الانتظار في العيادة",
    "الفحص الطبي",
    "شراء الدواء من الصيدلية",
    "الحديث عن الألم والمرض"
  ]
};

const bIdx = newChunk.indexOf('c=[{title:`👨‍👩‍👧 العائلة (Familie)`');
if (bIdx !== -1) {
  const injectStr = JSON.stringify(newBild) + ',';
  newChunk = newChunk.slice(0, bIdx + 3) + injectStr + newChunk.slice(bIdx + 3);
  console.log('Injected Bildbeschreibung!');
}

fs.writeFileSync('public/assets/data-dtz-CzCuJbSn.js', newChunk);
console.log('Done modifying DTZ chunk!');
