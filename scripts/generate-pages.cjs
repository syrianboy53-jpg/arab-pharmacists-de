// Script to generate all new page stubs
const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const pages = [
  {
    file: 'DailyChallengePage.tsx',
    title: 'تحدّي اليوم',
    icon: '📅',
    desc: 'أجب على 4 أسئلة جديدة كل يوم واكسب 90 XP',
    content: `
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const questions = [
    { q: 'Ich ___ gestern ins Kino gegangen.', options: ['bin', 'habe', 'war', 'wurde'], correct: 0, ar: 'ذهبت أمس إلى السينما.' },
    { q: 'Er hat mir ___ Buch geschenkt.', options: ['ein', 'einen', 'eine', 'einem'], correct: 0, ar: 'أهداني كتاباً.' },
    { q: '___ du morgen Zeit?', options: ['Hast', 'Bist', 'Wirst', 'Kannst'], correct: 0, ar: 'هل لديك وقت غداً؟' },
    { q: 'Wir müssen uns ___ beeilen.', options: ['dringend', 'schnell', 'sofort', 'eilig'], correct: 0, ar: 'يجب أن نسرع فوراً.' },
  ]

  const handleAnswer = (idx: number) => {
    if (answered !== null) return
    setAnswered(idx)
    if (idx === questions[current].correct) setScore(s => s + 1)
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1)
        setAnswered(null)
      } else {
        setDone(true)
      }
    }, 1200)
  }

  if (done) return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-2">أحسنت!</h1>
        <p className="text-xl">{score} / {questions.length} إجابات صحيحة</p>
        <p className="text-white/80 mt-2">+ {score * 22} XP</p>
      </div>
    </div>
  )

  const q = questions[current]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">📅 تحدّي اليوم</h1>
        <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold">{current + 1} / {questions.length}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-xs text-gray-500 mb-2">{q.ar}</p>
        <p className="text-xl font-bold mb-6" dir="ltr">{q.q}</p>
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)}
              className={\`p-4 rounded-xl font-bold text-center transition-all cursor-pointer border-2 \${
                answered === null ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-emerald-500' :
                i === q.correct ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700' :
                i === answered ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700' :
                'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
              }\`} dir="ltr">{opt}</button>
          ))}
        </div>
      </div>
    </div>
  )`,
    imports: "import { useState } from 'react'"
  },
  {
    file: 'LeaderboardPage.tsx',
    title: 'لوحة المتصدّرين',
    icon: '🏆',
    desc: 'تنافس مع المتعلّمين كلّ أسبوع',
    content: `
  const leaders = [
    { name: 'أحمد م.', xp: 4520, streak: 23 },
    { name: 'سارة ع.', xp: 3890, streak: 18 },
    { name: 'محمد ح.', xp: 3450, streak: 15 },
    { name: 'فاطمة ر.', xp: 3120, streak: 21 },
    { name: 'عمر ب.', xp: 2890, streak: 12 },
    { name: 'نور ص.', xp: 2650, streak: 9 },
    { name: 'خالد ت.', xp: 2340, streak: 14 },
    { name: 'ليلى ك.', xp: 2100, streak: 7 },
    { name: 'يوسف ن.', xp: 1870, streak: 11 },
    { name: 'أنت', xp: 1200, streak: 5 },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">🏆 لوحة المتصدّرين</h1>
      <p className="text-sm text-gray-500">ترتيب هذا الأسبوع — تحديث كل يوم اثنين</p>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {leaders.map((l, i) => (
          <div key={i} className={\`flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 \${l.name === 'أنت' ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}\`}>
            <span className={\`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm \${i < 3 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}\`}>{i + 1}</span>
            <span className="flex-1 font-bold text-sm">{l.name}</span>
            <span className="text-sm text-orange-500">🔥 {l.streak}</span>
            <span className="text-sm font-bold text-emerald-600">{l.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  )`
  },
  {
    file: 'ContestsPage.tsx', title: 'مسابقات بجوائز', icon: '🎁',
    desc: 'فز بهدايا ومكافآت',
    content: `return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">🎁 مسابقات بجوائز</h1>
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="text-3xl mb-2">🏅</div>
        <h2 className="text-xl font-bold mb-1">مسابقة الأسبوع</h2>
        <p className="text-white/80 text-sm mb-4">أجب على 20 سؤال — أفضل 3 يحصلون على هدايا</p>
        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm"><p className="text-center font-bold">⏰ تبدأ خلال 3 أيام</p></div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-3">🏆 الفائزون السابقون</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>🥇 أحمد م. — 19/20</p><p>🥈 سارة ع. — 18/20</p><p>🥉 محمد ح. — 17/20</p>
        </div>
      </div>
    </div>
  )`
  },
  {
    file: 'ReferralPage.tsx', title: 'ادعُ صديقاً', icon: '👥',
    desc: 'صديق ينضمّ بكودك = مكافأة لكليكما',
    imports: "import { useState } from 'react'",
    content: `
  const [code] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase())
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">👥 ادعُ صديقاً</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-xl font-bold mb-2">شارك كودك مع أصدقائك</h2>
        <p className="text-sm text-gray-500 mb-6">عندما يسجّل صديقك بكودك، تحصلان معاً على 200 XP إضافية!</p>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 flex items-center justify-center gap-4">
          <span className="text-3xl font-mono font-bold tracking-widest text-emerald-600">{code}</span>
          <button onClick={copy} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm cursor-pointer hover:bg-emerald-700 transition-colors">{copied ? '✅ تم النسخ' : '📋 انسخ'}</button>
        </div>
      </div>
    </div>
  )`
  },
  {
    file: 'MyPlanPage.tsx', title: 'خطّتي الشخصيّة لـB1', icon: '🎯',
    desc: 'أدخل تاريخ امتحانك → جدول يومي مفصّل',
    imports: "import { useState } from 'react'",
    content: `
  const [examDate, setExamDate] = useState('')
  const [plan, setPlan] = useState<string[]>([])
  const generate = () => {
    if (!examDate) return
    const days = Math.max(1, Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000))
    const p = []
    const topics = ['القواعد', 'المفردات', 'القراءة', 'الاستماع', 'الكتابة', 'المحادثة', 'مراجعة شاملة']
    for (let i = 0; i < Math.min(days, 28); i++) {
      const d = new Date(Date.now() + i * 86400000)
      p.push(\`\${d.toLocaleDateString('ar-EG', {weekday:'long'})} \${d.getDate()}/\${d.getMonth()+1}: \${topics[i % topics.length]}\`)
    }
    setPlan(p)
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">🎯 خطّتي الشخصيّة لـB1</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <label className="block text-sm font-bold mb-2">📅 متى موعد امتحانك؟</label>
        <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 mb-4" />
        <button onClick={generate} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-emerald-700 transition-colors">أنشئ خطّتي</button>
      </div>
      {plan.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold mb-4">📋 خطّتك اليومية</h2>
          <div className="space-y-2">{plan.map((p, i) => (<div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm">{p}</div>))}</div>
        </div>
      )}
    </div>
  )`
  },
  { file: 'ReviewsPage.tsx', title: 'تقييمات وتعليقات', icon: '⭐', desc: 'قيّم التطبيق + اقرأ تجارب الآخرين',
    content: `
  const reviews = [
    { name: 'أحمد', stars: 5, text: 'أفضل تطبيق لتحضير B1! نجحت من أول مرة بفضله.' },
    { name: 'سارة', stars: 5, text: 'الشرح بالعربي سهّل عليّ كثير. شكراً فادي!' },
    { name: 'محمد', stars: 4, text: 'ممتاز جداً، أتمنى إضافة المزيد من نماذج الاستماع.' },
    { name: 'نور', stars: 5, text: 'التطبيق مجاني وفيه كل شي. ما في أحسن منه.' },
    { name: 'عمر', stars: 5, text: 'الألعاب التفاعلية خلّت الدراسة ممتعة!' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">⭐ تقييمات وتعليقات</h1>
      <div className="space-y-4">{reviews.map((r, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2"><span className="font-bold">{r.name}</span><span className="text-amber-400">{'⭐'.repeat(r.stars)}</span></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{r.text}</p>
        </div>
      ))}</div>
    </div>
  )`
  },
  { file: 'EmergencyPage.tsx', title: 'صندوق الإسعافات للامتحان', icon: '🚨', desc: 'جمل تنقذك عند نسيان كلمة',
    content: `
  const phrases = [
    { de: 'Können Sie die Frage bitte wiederholen?', ar: 'هل يمكنك تكرار السؤال من فضلك؟' },
    { de: 'Ich brauche einen Moment, bitte.', ar: 'أحتاج لحظة من فضلك.' },
    { de: 'Wie sagt man ... auf Deutsch?', ar: 'كيف نقول ... بالألمانية؟' },
    { de: 'Ich meine damit, dass...', ar: 'أقصد بذلك أن...' },
    { de: 'Entschuldigung, ich habe das nicht verstanden.', ar: 'عذراً، لم أفهم ذلك.' },
    { de: 'Können Sie bitte langsamer sprechen?', ar: 'هل يمكنك التحدث ببطء أكثر؟' },
    { de: 'Meiner Meinung nach...', ar: 'في رأيي...' },
    { de: 'Ich bin der Meinung, dass...', ar: 'أنا أرى أنّ...' },
    { de: 'Zum Beispiel...', ar: 'على سبيل المثال...' },
    { de: 'Zusammenfassend kann man sagen, dass...', ar: 'يمكن تلخيص ذلك بأن...' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">🚨 صندوق الإسعافات للامتحان</h1>
      <p className="text-sm text-gray-500">جمل تنقذك في أي موقف أثناء الامتحان — احفظها جيداً!</p>
      <div className="space-y-3">{phrases.map((p, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1" dir="ltr">{p.de}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{p.ar}</p>
        </div>
      ))}</div>
    </div>
  )`
  },
];

// Simple placeholder for remaining pages
const simplePlaceholders = [
  ['CardSortPage', '🃏', 'ترتيب البطاقات', 'لعبة Solitär — صنّف der/die/das + نوع الكلمة'],
  ['CoursesPage', '📅', 'مواعيد الكورسات', '30 معهداً في 13 مدينة + Online (BAMF + Goethe + VHS)'],
  ['B1ModelsPage', '📝', '5 نماذج B1 موضوعيّة', 'نماذج كاملة مع تصحيح — Wohnen, Arbeit, Reisen, Gesundheit, Umwelt'],
  ['ResourcesPage', '🌐', 'موارد مجّانيّة موثوقة', 'روابط مباشرة لـDW + Goethe + telc + BAMF + ÖSD'],
  ['SrsReviewPage', '🔄', 'مراجعة ذكيّة SRS', 'نظام مراجعة متباعدة ذكي يعزز حفظك'],
  ['ConjugationPage', '🔁', 'مدرّب التصريف', 'تدرّب على تصريف الأفعال + Modalverben'],
  ['TelcSimPage', '🎓', 'محاكي Telc B1 الحقيقي', 'كلّ الأقسام + مؤقّت + تقييم فوري'],
  ['BildbeschreibungPage', '🖼️', 'وصف صورة — Bildbeschreibung', 'تدرّب على وصف الصور بالألمانية'],
  ['EinbuergerungPage', '🏛️', 'Einbürgerungstest', 'كتالوج كامل + 88 سؤال مترجَم'],
  ['ProblemsPage', '💡', 'مشاكل وحلول', 'دليل عملي لحل مشاكل الحياة في ألمانيا'],
  ['B2ModelsPage', '🎓', '5 نماذج Telc B2', 'نماذج كاملة مع تصحيح'],
  ['AiCorrectorPage', '🤖', 'AI Writing Corrector', 'تصحيح ذكي لنصوصك الألمانية'],
  ['StressListeningPage', '🔥', 'وضع الضغط للاستماع', 'ضوضاء واقعيّة (محطّة/شارع/مقهى) فوق التسجيل'],
  ['SpeedReadingPage', '⏱', 'مدرّب القراءة السريعة', 'النصّ يختفي بعد 90/180ث — تدريب Skimming'],
  ['DashboardPage', '📊', 'لوحتي الشخصيّة', 'تتبّع تقدّمك ونقاطك وشاراتك'],
  ['StudyPlanPage', '📅', 'مخطّط الدراسة', 'خطّة 4 أسابيع مفصّلة للتحضير'],
  ['PrintPage', '🖨️', 'اطبع وذاكر', 'PDF جاهز للطباعة — قواعد ومفردات ونصائح'],
  ['WordWebPage', '🕸️', 'شبكات الكلمات', 'ربط المفردات ببعضها لتسهيل الحفظ'],
  ['TopicsPage', '📑', 'بنك المواضيع', 'مواضيع Sprechen + Schreiben مع مفردات وعبارات'],
  ['TipsPage', '🧰', 'أدوات النجاح', 'نصائح واستراتيجيّات لكل قسم من الامتحان'],
];

// Write complex pages
for (const page of pages) {
  const imp = page.imports || ''
  const code = `${imp}

export default function ${page.file.replace('.tsx', '')}() {${page.content}
}
`;
  fs.writeFileSync(path.join(pagesDir, page.file), code);
  console.log('Created:', page.file);
}

// Write simple placeholder pages
for (const [name, icon, title, desc] of simplePlaceholders) {
  // Skip if file already exists
  const filePath = path.join(pagesDir, name + '.tsx');
  if (fs.existsSync(filePath)) {
    console.log('Skipped (exists):', name + '.tsx');
    continue;
  }
  const code = `export default function ${name}() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">${icon} ${title}</h1>
      <p className="text-sm text-gray-500">${desc}</p>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
        <div className="text-5xl mb-4">${icon}</div>
        <h2 className="text-xl font-bold mb-2">${title}</h2>
        <p className="text-gray-500">${desc}</p>
        <p className="text-emerald-600 font-bold mt-4">🚧 قيد التطوير — سيتم إضافة المحتوى قريباً</p>
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(filePath, code);
  console.log('Created:', name + '.tsx');
}

console.log('\\nDone! All pages created.');
