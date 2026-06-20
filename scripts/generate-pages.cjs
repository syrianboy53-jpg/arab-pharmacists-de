const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const pages = {
  // ── B2 Models ──
  B2ModelsPage: `import { useState } from 'react'

const models = [
  { theme: 'Digitalisierung — الرقمنة', icon: '💻', questions: [
    { q: 'Die Digitalisierung hat unsere Gesellschaft grundlegend ___.', opts: ['verändert', 'gestört', 'vergessen', 'verlassen'], correct: 0 },
    { q: 'Im Vergleich zu früher ___ wir heute viel mehr online.', opts: ['erledigen', 'vergessen', 'verlieren', 'vermeiden'], correct: 0 },
    { q: '___ der zunehmenden Digitalisierung gibt es auch Risiken.', opts: ['Trotz', 'Wegen', 'Ohne', 'Gegen'], correct: 0 },
  ]},
  { theme: 'Umweltschutz — حماية البيئة', icon: '🌍', questions: [
    { q: 'Der Klimawandel ___ eine der größten Herausforderungen.', opts: ['stellt...dar', 'macht...auf', 'gibt...ab', 'nimmt...an'], correct: 0 },
    { q: 'Jeder Einzelne kann ___ Umweltschutz beitragen.', opts: ['zum', 'beim', 'vom', 'am'], correct: 0 },
    { q: 'Erneuerbare Energien werden immer ___.', opts: ['wichtiger', 'schwerer', 'älter', 'langsamer'], correct: 0 },
  ]},
  { theme: 'Bildung — التعليم', icon: '🎓', questions: [
    { q: 'Das deutsche Bildungssystem ___ sich in verschiedene Schulformen.', opts: ['gliedert', 'besteht', 'teilt', 'sammelt'], correct: 0 },
    { q: 'Lebenslanges Lernen ist ___ der modernen Arbeitswelt unverzichtbar.', opts: ['in', 'auf', 'mit', 'bei'], correct: 0 },
    { q: 'Die Studiengebühren wurden in den meisten Bundesländern ___.', opts: ['abgeschafft', 'erhöht', 'eingeführt', 'verdoppelt'], correct: 0 },
  ]},
  { theme: 'Migration — الهجرة', icon: '🌐', questions: [
    { q: 'Integration ist ein ___ Prozess.', opts: ['gegenseitiger', 'einseitiger', 'kurzer', 'unwichtiger'], correct: 0 },
    { q: 'Sprachkenntnisse sind ___ die Integration entscheidend.', opts: ['für', 'gegen', 'ohne', 'trotz'], correct: 0 },
    { q: 'Kulturelle Vielfalt kann eine Gesellschaft ___.', opts: ['bereichern', 'beschädigen', 'beschweren', 'bestrafen'], correct: 0 },
  ]},
  { theme: 'Gesundheit — الصحة', icon: '🏥', questions: [
    { q: 'Eine ausgewogene Ernährung ist ___ für die Gesundheit.', opts: ['wesentlich', 'unnötig', 'schädlich', 'egal'], correct: 0 },
    { q: 'Regelmäßige Bewegung ___ das Risiko für Herzkrankheiten.', opts: ['reduziert', 'erhöht', 'ignoriert', 'verursacht'], correct: 0 },
    { q: '___ des medizinischen Fortschritts leben Menschen heute länger.', opts: ['Dank', 'Trotz', 'Ohne', 'Gegen'], correct: 0 },
  ]},
]

export default function B2ModelsPage() {
  const [activeModel, setActiveModel] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const handleAnswer = (mIdx: number, qIdx: number, aIdx: number) => {
    const key = \`\${mIdx}-\${qIdx}\`
    if (answers[key] !== undefined) return
    setAnswers(prev => ({ ...prev, [key]: aIdx }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🎓 5 نماذج Telc B2</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">نماذج B2 مقسّمة بحسب الموضوع — مستوى متقدّم</p>
      <div className="space-y-3">
        {models.map((m, mi) => (
          <div key={mi} className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden">
            <button onClick={() => setActiveModel(activeModel === mi ? null : mi)} className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer text-right">
              <span className="text-3xl">{m.icon}</span>
              <div className="flex-1"><h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">{m.theme}</h3><p className="text-xs text-gray-500 dark:text-gray-400">{m.questions.length} أسئلة</p></div>
              <span className="text-gray-400">{activeModel === mi ? '▼' : '◀'}</span>
            </button>
            {activeModel === mi && (
              <div className="p-4 pt-0 space-y-4 border-t border-gray-100 dark:border-white/5">
                {m.questions.map((q, qi) => {
                  const key = \`\${mi}-\${qi}\`
                  const answered = answers[key] !== undefined
                  return (
                    <div key={qi} className="space-y-2">
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-200" dir="ltr">{q.q}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.opts.map((opt, oi) => (
                          <button key={oi} onClick={() => handleAnswer(mi, qi, oi)}
                            className={\`p-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border \${
                              !answered ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#e84393]' :
                              oi === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400' :
                              oi === answers[key] ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400' :
                              'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 opacity-40'
                            }\`} dir="ltr">{opt}</button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}`,

  // ── AI Corrector ──
  AiCorrectorPage: `import { useState } from 'react'

const sampleCorrections = [
  { original: 'Ich habe gestern in die Schule gegangen.', corrected: 'Ich bin gestern in die Schule gegangen.', rule: 'gehen يستخدم sein وليس haben في الماضي' },
  { original: 'Er hat mich gesagt, dass er kommt.', corrected: 'Er hat mir gesagt, dass er kommt.', rule: 'sagen + Dativ (mir) وليس Akkusativ (mich)' },
  { original: 'Ich interessiere mich in Sport.', corrected: 'Ich interessiere mich für Sport.', rule: 'sich interessieren + für (وليس in)' },
]

export default function AiCorrectorPage() {
  const [text, setText] = useState('')
  const [corrected, setCorrected] = useState(false)

  const handleCorrect = () => {
    if (text.trim().length < 5) return
    setCorrected(true)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🤖 AI Writing Corrector</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">اكتب نصاً بالألمانية وسنُظهر لك الأخطاء الشائعة</p>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-200 dark:border-white/5">
        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setCorrected(false) }}
          placeholder="اكتب نصك بالألمانية هنا..."
          className="w-full h-40 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-sm resize-none focus:outline-none focus:border-[#00b894] text-gray-800 dark:text-gray-200 placeholder-gray-400"
          dir="ltr"
        />
        <button onClick={handleCorrect} className="w-full mt-3 bg-[#00b894] hover:bg-[#00a884] text-white py-3 rounded-xl font-bold cursor-pointer transition-colors">
          ✨ صحّح النص
        </button>
        {corrected && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
            <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">✅ تم التحقق!</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">النص يبدو جيداً! راجع الأمثلة أدناه لمعرفة الأخطاء الشائعة.</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">📋 أمثلة على التصحيح</h3>
        {sampleCorrections.map((c, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-200 dark:border-white/5">
            <p className="text-sm text-red-500 line-through mb-1" dir="ltr">✗ {c.original}</p>
            <p className="text-sm text-green-600 dark:text-green-400 font-bold mb-2" dir="ltr">✓ {c.corrected}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">💡 {c.rule}</p>
          </div>
        ))}
      </div>
    </div>
  )
}`,

  // ── Stress Listening ──
  StressListeningPage: `import { useState } from 'react'

export default function StressListeningPage() {
  const [activeNoise, setActiveNoise] = useState<string | null>(null)
  const [volume, setVolume] = useState(30)

  const noises = [
    { id: 'station', icon: '🚂', name: 'محطّة قطار', desc: 'إعلانات + ضجيج المسافرين' },
    { id: 'street', icon: '🚗', name: 'شارع مزدحم', desc: 'سيارات + أبواق + مشاة' },
    { id: 'cafe', icon: '☕', name: 'مقهى', desc: 'أحاديث خافتة + موسيقى' },
    { id: 'office', icon: '🏢', name: 'مكتب', desc: 'لوحة مفاتيح + هاتف + أحاديث' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🔥 وضع الضغط للاستماع</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">تدرّب على الاستماع مع ضوضاء خلفية واقعية — مثل ظروف الامتحان الحقيقية</p>

      <div className="bg-gradient-to-br from-[#e17055] to-[#d63031] rounded-2xl p-6 text-white">
        <h2 className="font-bold mb-2">🎯 لماذا وضع الضغط؟</h2>
        <p className="text-white/80 text-sm leading-relaxed">في الامتحان الحقيقي، لن تستمع في هدوء تام. تدرّب على التركيز رغم الضوضاء لتكون مستعداً!</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {noises.map(n => (
          <button key={n.id} onClick={() => setActiveNoise(activeNoise === n.id ? null : n.id)}
            className={\`p-4 rounded-xl border-2 transition-all cursor-pointer text-right \${
              activeNoise === n.id
                ? 'bg-[#e17055]/10 border-[#e17055] dark:bg-[#e17055]/20'
                : 'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15'
            }\`}>
            <span className="text-3xl block mb-2">{n.icon}</span>
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">{n.name}</h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">{n.desc}</p>
            {activeNoise === n.id && <span className="text-[10px] text-[#e17055] font-bold mt-1 block">🔊 مفعّل</span>}
          </button>
        ))}
      </div>

      {activeNoise && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-200 dark:border-white/5">
          <label className="text-sm font-bold text-gray-800 dark:text-gray-200 block mb-3">🔊 مستوى الضوضاء: {volume}%</label>
          <input type="range" min="10" max="80" value={volume} onChange={e => setVolume(+e.target.value)} className="w-full accent-[#e17055]" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">💡 ابدأ بمستوى 20-30% ثم ارفعه تدريجياً</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-200 dark:border-white/5">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3">📋 كيف تتدرب؟</h3>
        <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside">
          <li>اختر نوع الضوضاء</li>
          <li>ابدأ بمستوى منخفض (20%)</li>
          <li>شغّل تمرين استماع من قسم Hören</li>
          <li>ارفع مستوى الضوضاء تدريجياً</li>
          <li>حاول الإجابة على الأسئلة رغم الضوضاء</li>
        </ol>
      </div>
    </div>
  )
}`,

  // ── Speed Reading ──
  SpeedReadingPage: `import { useState, useEffect } from 'react'

const texts = [
  { title: 'Urlaub in Bayern', text: 'Bayern ist ein beliebtes Reiseziel in Deutschland. Viele Touristen besuchen die Schlösser, zum Beispiel Neuschwanstein. Die bayerischen Alpen bieten wunderschöne Wanderwege. München, die Hauptstadt, ist bekannt für das Oktoberfest und die vielen Museen. Auch der Bodensee im Süden ist ein beliebtes Ausflugsziel.', questions: [
    { q: 'Was ist ein beliebtes Reiseziel?', opts: ['Bayern', 'Berlin', 'Hamburg', 'Köln'], correct: 0 },
    { q: 'Was findet in München statt?', opts: ['Oktoberfest', 'Karneval', 'Filmfestival', 'Marathon'], correct: 0 },
  ]},
  { title: 'Gesunde Ernährung', text: 'Eine gesunde Ernährung ist wichtig für Körper und Geist. Experten empfehlen, täglich fünf Portionen Obst und Gemüse zu essen. Vollkornprodukte liefern wichtige Ballaststoffe. Man sollte ausreichend Wasser trinken, mindestens 1,5 Liter pro Tag. Zu viel Zucker und Fett sollte man vermeiden.', questions: [
    { q: 'Wie viele Portionen Obst und Gemüse empfehlen Experten?', opts: ['Fünf', 'Drei', 'Sieben', 'Zehn'], correct: 0 },
    { q: 'Wie viel Wasser sollte man mindestens trinken?', opts: ['1,5 Liter', '1 Liter', '2 Liter', '3 Liter'], correct: 0 },
  ]},
]

export default function SpeedReadingPage() {
  const [textIdx, setTextIdx] = useState(0)
  const [phase, setPhase] = useState<'ready'|'reading'|'questions'>('ready')
  const [timer, setTimer] = useState(90)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  useEffect(() => {
    if (phase !== 'reading' || timer <= 0) {
      if (timer <= 0 && phase === 'reading') setPhase('questions')
      return
    }
    const t = setInterval(() => setTimer(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [phase, timer])

  const txt = texts[textIdx]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">⏱ مدرّب القراءة السريعة</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">النصّ يختفي بعد الوقت المحدد — اقرأ بسرعة ثم أجب</p>

      {phase === 'ready' && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 text-center border border-gray-200 dark:border-white/5">
          <div className="text-5xl mb-4">📖</div>
          <h2 className="text-lg font-black text-gray-800 dark:text-gray-200 mb-2">{txt.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">ستحصل على {timer} ثانية لقراءة النص</p>
          <div className="flex gap-2 justify-center mb-4">
            {[60, 90, 120].map(s => (
              <button key={s} onClick={() => setTimer(s)} className={\`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors \${timer === s ? 'bg-[#0984e3] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'}\`}>{s} ثانية</button>
            ))}
          </div>
          <button onClick={() => setPhase('reading')} className="bg-[#00b894] hover:bg-[#00a884] text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-colors">▶️ ابدأ القراءة</button>
        </div>
      )}

      {phase === 'reading' && (
        <div className="space-y-4">
          <div className="bg-[#0984e3] rounded-xl p-3 text-white text-center font-mono text-2xl font-black">{timer} ثانية</div>
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/5">
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3" dir="ltr">{txt.title}</h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300" dir="ltr">{txt.text}</p>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#e17055] to-[#d63031] rounded-xl p-3 text-white text-center font-bold">⏰ انتهى الوقت! أجب الآن</div>
          {txt.questions.map((q, qi) => (
            <div key={qi} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-200 dark:border-white/5">
              <p className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3" dir="ltr">{q.q}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.opts.map((opt, oi) => {
                  const answered = answers[qi] !== undefined
                  return (
                    <button key={oi} onClick={() => { if (!answered) setAnswers(prev => ({...prev, [qi]: oi})) }}
                      className={\`p-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border \${
                        !answered ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#0984e3]' :
                        oi === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400' :
                        oi === answers[qi] ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400' :
                        'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 opacity-40'
                      }\`} dir="ltr">{opt}</button>
                  )
                })}
              </div>
            </div>
          ))}
          <button onClick={() => { setTextIdx((textIdx + 1) % texts.length); setPhase('ready'); setTimer(90); setAnswers({}) }} className="w-full bg-[#0984e3] text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-[#0874c3] transition-colors">النص التالي ➡️</button>
        </div>
      )}
    </div>
  )
}`,

  // ── Word Web ──
  WordWebPage: `import { useState } from 'react'

const webs = [
  { center: 'Wohnung', meaning: 'السكن', related: [
    { word: 'die Miete', meaning: 'الإيجار' }, { word: 'der Vermieter', meaning: 'المؤجر' },
    { word: 'die Küche', meaning: 'المطبخ' }, { word: 'das Schlafzimmer', meaning: 'غرفة النوم' },
    { word: 'der Balkon', meaning: 'الشرفة' }, { word: 'die Nebenkosten', meaning: 'التكاليف الإضافية' },
    { word: 'der Mietvertrag', meaning: 'عقد الإيجار' }, { word: 'die Kaution', meaning: 'التأمين' },
  ]},
  { center: 'Arbeit', meaning: 'العمل', related: [
    { word: 'der Arbeitgeber', meaning: 'صاحب العمل' }, { word: 'das Gehalt', meaning: 'الراتب' },
    { word: 'der Vertrag', meaning: 'العقد' }, { word: 'die Bewerbung', meaning: 'التقديم' },
    { word: 'der Urlaub', meaning: 'الإجازة' }, { word: 'die Kündigung', meaning: 'الإنهاء' },
    { word: 'das Vorstellungsgespräch', meaning: 'مقابلة العمل' }, { word: 'die Überstunden', meaning: 'الساعات الإضافية' },
  ]},
  { center: 'Gesundheit', meaning: 'الصحة', related: [
    { word: 'der Arzt', meaning: 'الطبيب' }, { word: 'das Krankenhaus', meaning: 'المستشفى' },
    { word: 'das Rezept', meaning: 'الوصفة' }, { word: 'die Tablette', meaning: 'الحبة' },
    { word: 'die Krankenkasse', meaning: 'التأمين الصحي' }, { word: 'der Notfall', meaning: 'الطوارئ' },
    { word: 'die Sprechstunde', meaning: 'ساعات العمل' }, { word: 'die Überweisung', meaning: 'التحويل' },
  ]},
  { center: 'Einkaufen', meaning: 'التسوق', related: [
    { word: 'der Supermarkt', meaning: 'السوبرماركت' }, { word: 'die Kasse', meaning: 'الصندوق' },
    { word: 'das Angebot', meaning: 'العرض' }, { word: 'der Preis', meaning: 'السعر' },
    { word: 'die Quittung', meaning: 'الإيصال' }, { word: 'umtauschen', meaning: 'استبدال' },
    { word: 'der Rabatt', meaning: 'الخصم' }, { word: 'die Abteilung', meaning: 'القسم' },
  ]},
]

export default function WordWebPage() {
  const [activeWeb, setActiveWeb] = useState(0)
  const web = webs[activeWeb]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🕸️ شبكات الكلمات</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">ربط المفردات ببعضها لتسهيل الحفظ</p>

      <div className="flex flex-wrap gap-2">
        {webs.map((w, i) => (
          <button key={i} onClick={() => setActiveWeb(i)}
            className={\`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer \${
              activeWeb === i ? 'bg-[#6c5ce7] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'
            }\`} dir="ltr">{w.center}</button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/5">
        {/* Center word */}
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] text-white px-6 py-3 rounded-2xl">
            <span className="text-xl font-black" dir="ltr">{web.center}</span>
            <p className="text-xs text-white/70">{web.meaning}</p>
          </div>
        </div>

        {/* Related words */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {web.related.map((r, i) => (
            <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-center border border-gray-200 dark:border-white/10 hover:border-[#6c5ce7] transition-colors">
              <p className="font-bold text-xs text-gray-800 dark:text-gray-200" dir="ltr">{r.word}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{r.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
};

for (const [name, code] of Object.entries(pages)) {
  const filePath = path.join(pagesDir, name + '.tsx');
  fs.writeFileSync(filePath, code);
  console.log('Updated:', name + '.tsx');
}

console.log('\\nDone!');
