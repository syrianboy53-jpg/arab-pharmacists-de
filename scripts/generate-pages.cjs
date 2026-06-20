const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const pages = {
  // ── Card Sort (der/die/das game) ──
  CardSortPage: `import { useState } from 'react'

const nouns = [
  { word: 'Tisch', article: 'der', meaning: 'طاولة' },
  { word: 'Lampe', article: 'die', meaning: 'مصباح' },
  { word: 'Buch', article: 'das', meaning: 'كتاب' },
  { word: 'Stuhl', article: 'der', meaning: 'كرسي' },
  { word: 'Tasche', article: 'die', meaning: 'حقيبة' },
  { word: 'Handy', article: 'das', meaning: 'هاتف' },
  { word: 'Schrank', article: 'der', meaning: 'خزانة' },
  { word: 'Uhr', article: 'die', meaning: 'ساعة' },
  { word: 'Fenster', article: 'das', meaning: 'نافذة' },
  { word: 'Schlüssel', article: 'der', meaning: 'مفتاح' },
  { word: 'Tür', article: 'die', meaning: 'باب' },
  { word: 'Geld', article: 'das', meaning: 'مال' },
]

export default function CardSortPage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const noun = nouns[current]
  const done = current >= nouns.length

  const handleSelect = (article: string) => {
    if (selected) return
    setSelected(article)
    if (article === noun.article) setScore(s => s + 1)
    else setWrong(w => w + 1)
    setTimeout(() => {
      setSelected(null)
      setCurrent(c => c + 1)
    }, 1000)
  }

  if (done) return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] rounded-2xl p-8 text-white text-center">
        <div className="text-5xl mb-4">{score >= 10 ? '🏆' : score >= 7 ? '👏' : '💪'}</div>
        <h1 className="text-3xl font-black mb-2">النتيجة</h1>
        <p className="text-2xl font-bold">{score} / {nouns.length}</p>
        <p className="text-white/70 mt-2">صحيح: {score} | خطأ: {wrong}</p>
        <button onClick={() => { setCurrent(0); setScore(0); setWrong(0) }} className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">أعد المحاولة</button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2">🃏 ترتيب البطاقات</h1>
        <span className="text-sm bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold">{current + 1} / {nouns.length}</span>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-8 text-center border border-gray-100 dark:border-white/5">
        <p className="text-xs text-gray-400 mb-2">{noun.meaning}</p>
        <p className="text-4xl font-black mb-8" dir="ltr">___ {noun.word}</p>
        <div className="grid grid-cols-3 gap-3">
          {['der', 'die', 'das'].map(a => (
            <button key={a} onClick={() => handleSelect(a)}
              className={\`py-4 rounded-xl font-black text-xl transition-all cursor-pointer border-2 \${
                selected === null ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-[#6c5ce7]' :
                a === noun.article ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700' :
                a === selected ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700' :
                'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-40'
              }\`} dir="ltr">{a}</button>
          ))}
        </div>
      </div>
    </div>
  )
}`,

  // ── Courses Page ──
  CoursesPage: `export default function CoursesPage() {
  const institutes = [
    { name: 'Volkshochschule (VHS)', city: 'Berlin', type: 'BAMF', url: 'https://www.berlin.de/vhs/', note: 'أكبر شبكة معاهد في ألمانيا' },
    { name: 'Goethe-Institut', city: 'München', type: 'Goethe', url: 'https://www.goethe.de', note: 'معهد غوته الرسمي' },
    { name: 'Inlingua', city: 'Hamburg', type: 'BAMF', url: 'https://www.inlingua.de', note: 'كورسات مكثفة' },
    { name: 'Berlitz', city: 'Frankfurt', type: 'BAMF', url: 'https://www.berlitz.de', note: 'كورسات فردية وجماعية' },
    { name: 'DAA (Deutsche Angestellten-Akademie)', city: 'Köln', type: 'BAMF', url: 'https://www.daa.de', note: 'معهد معتمد من BAMF' },
    { name: 'Telc Language Tests', city: 'Online', type: 'telc', url: 'https://www.telc.net', note: 'اختبارات telc الرسمية' },
    { name: 'DW Learn German', city: 'Online', type: 'Online', url: 'https://learngerman.dw.com', note: 'Deutsche Welle مجاني' },
    { name: 'Lingoda', city: 'Online', type: 'Online', url: 'https://www.lingoda.com', note: 'كورسات أونلاين مع معلمين' },
    { name: 'VHS Stuttgart', city: 'Stuttgart', type: 'BAMF', url: 'https://vhs-stuttgart.de', note: 'كورسات اندماج' },
    { name: 'VHS Düsseldorf', city: 'Düsseldorf', type: 'BAMF', url: 'https://www.duesseldorf.de/vhs', note: 'كورسات B1/B2' },
  ]
  const typeColors: Record<string, string> = { BAMF: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', Goethe: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', telc: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', Online: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📅 مواعيد الكورسات</h1>
      <p className="text-sm text-gray-500">معاهد معتمدة في ألمانيا + كورسات أونلاين</p>
      <div className="space-y-3">{institutes.map((inst, i) => (
        <a key={i} href={inst.url} target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 transition-all">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm">{inst.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">📍 {inst.city} — {inst.note}</p>
            </div>
            <span className={\`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 \${typeColors[inst.type] || ''}\`}>{inst.type}</span>
          </div>
        </a>
      ))}</div>
    </div>
  )
}`,

  // ── B1 Models ──
  B1ModelsPage: `import { useState } from 'react'

const models = [
  { theme: 'Wohnen — السكن', icon: '🏠', questions: [
    { q: 'Ich suche eine ___ in der Innenstadt.', opts: ['Wohnung', 'Schule', 'Arbeit', 'Familie'], correct: 0 },
    { q: 'Die Miete ___ 500 Euro pro Monat.', opts: ['beträgt', 'macht', 'gibt', 'nimmt'], correct: 0 },
  ]},
  { theme: 'Arbeit — العمل', icon: '💼', questions: [
    { q: 'Ich habe mich um die Stelle ___.', opts: ['beworben', 'gearbeitet', 'gemacht', 'gesagt'], correct: 0 },
    { q: 'Der Vertrag ist ___ einem Jahr befristet.', opts: ['auf', 'für', 'mit', 'in'], correct: 0 },
  ]},
  { theme: 'Reisen — السفر', icon: '✈️', questions: [
    { q: 'Ich möchte einen Flug nach Berlin ___.', opts: ['buchen', 'kaufen', 'nehmen', 'fahren'], correct: 0 },
    { q: 'Der Zug fährt ___ 10 Uhr ab.', opts: ['um', 'in', 'auf', 'bei'], correct: 0 },
  ]},
  { theme: 'Gesundheit — الصحة', icon: '🏥', questions: [
    { q: 'Ich habe ___ beim Arzt.', opts: ['einen Termin', 'eine Frage', 'ein Problem', 'eine Idee'], correct: 0 },
    { q: 'Sie müssen dieses Medikament dreimal ___ nehmen.', opts: ['täglich', 'wöchentlich', 'monatlich', 'jährlich'], correct: 0 },
  ]},
  { theme: 'Umwelt — البيئة', icon: '🌍', questions: [
    { q: 'Wir sollten mehr Energie ___.', opts: ['sparen', 'machen', 'kaufen', 'haben'], correct: 0 },
    { q: 'Mülltrennung ist in Deutschland sehr ___.', opts: ['wichtig', 'schwer', 'teuer', 'alt'], correct: 0 },
  ]},
]

export default function B1ModelsPage() {
  const [activeModel, setActiveModel] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const handleAnswer = (mIdx: number, qIdx: number, aIdx: number) => {
    setAnswers(prev => ({ ...prev, [\`\${mIdx}-\${qIdx}\`]: aIdx }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📝 5 نماذج B1 موضوعيّة</h1>
      <p className="text-sm text-gray-500">نماذج كاملة مقسّمة بحسب الموضوع — اختر نموذجاً وابدأ</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {models.map((m, mi) => (
          <div key={mi} className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
            <button onClick={() => setActiveModel(activeModel === mi ? null : mi)} className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer text-right">
              <span className="text-3xl">{m.icon}</span>
              <div><h3 className="font-bold text-sm">{m.theme}</h3><p className="text-xs text-gray-400">{m.questions.length} أسئلة</p></div>
            </button>
            {activeModel === mi && (
              <div className="p-4 pt-0 space-y-4 border-t border-gray-100 dark:border-white/5">
                {m.questions.map((q, qi) => (
                  <div key={qi} className="space-y-2">
                    <p className="font-bold text-sm" dir="ltr">{q.q}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.opts.map((opt, oi) => {
                        const key = \`\${mi}-\${qi}\`
                        const answered = answers[key] !== undefined
                        return (
                          <button key={oi} onClick={() => handleAnswer(mi, qi, oi)}
                            className={\`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer border \${
                              !answered ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-[#0984e3]' :
                              oi === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700' :
                              oi === answers[key] ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700' :
                              'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-40'
                            }\`} dir="ltr">{opt}</button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}`,

  // ── Resources Page ──
  ResourcesPage: `export default function ResourcesPage() {
  const resources = [
    { name: 'Deutsche Welle — Learn German', url: 'https://learngerman.dw.com', icon: '📺', desc: 'كورسات مجانية من A1 إلى B2 مع فيديوهات', type: 'مجاني' },
    { name: 'Goethe-Institut', url: 'https://www.goethe.de/de/spr/ueb.html', icon: '🏛️', desc: 'تمارين رسمية من معهد غوته', type: 'مجاني' },
    { name: 'telc Übungstests', url: 'https://www.telc.net/pruefungsteilnehmende/uebungsmaterial.html', icon: '📋', desc: 'نماذج امتحانات telc الرسمية PDF', type: 'مجاني' },
    { name: 'BAMF — Integrationskurse', url: 'https://www.bamf.de/DE/Themen/Integration/integration_node.html', icon: '🏢', desc: 'معلومات كورسات الاندماج', type: 'رسمي' },
    { name: 'ÖSD Modellprüfungen', url: 'https://www.osd.at/die-pruefungen/sd-zertifikat-b1/', icon: '🇦🇹', desc: 'نماذج ÖSD النمساوية', type: 'مجاني' },
    { name: 'Schubert Verlag', url: 'https://www.schubert-verlag.de/aufgaben/', icon: '📖', desc: 'تمارين قواعد تفاعلية A1-C2', type: 'مجاني' },
    { name: 'Hueber Verlag', url: 'https://www.hueber.de/seite/pg_online_uebungen_mnr', icon: '📚', desc: 'تمارين إضافية لكتب Menschen & Co.', type: 'مجاني' },
    { name: 'Lingolia', url: 'https://deutsch.lingolia.com/de/', icon: '🧠', desc: 'شرح قواعد مفصّل مع تمارين', type: 'مجاني' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🌐 موارد مجّانيّة موثوقة</h1>
      <p className="text-sm text-gray-500">مواقع رسمية وموثوقة لتعلّم الألمانية</p>
      <div className="space-y-3">{resources.map((r, i) => (
        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15 transition-all">
          <span className="text-2xl shrink-0">{r.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2"><h3 className="font-bold text-sm">{r.name}</h3><span className="text-[9px] bg-[#00b894]/10 text-[#00b894] px-1.5 py-0.5 rounded font-bold">{r.type}</span></div>
            <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
          </div>
          <span className="text-gray-300 dark:text-gray-600 shrink-0">🔗</span>
        </a>
      ))}</div>
    </div>
  )
}`,

  // ── Conjugation Trainer ──
  ConjugationPage: `import { useState } from 'react'

const verbs = [
  { infinitive: 'sein', meaning: 'يكون', conjugations: { ich: 'bin', du: 'bist', 'er/sie': 'ist', wir: 'sind', ihr: 'seid', sie: 'sind' } },
  { infinitive: 'haben', meaning: 'يملك', conjugations: { ich: 'habe', du: 'hast', 'er/sie': 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' } },
  { infinitive: 'werden', meaning: 'يصبح', conjugations: { ich: 'werde', du: 'wirst', 'er/sie': 'wird', wir: 'werden', ihr: 'werdet', sie: 'werden' } },
  { infinitive: 'können', meaning: 'يستطيع', conjugations: { ich: 'kann', du: 'kannst', 'er/sie': 'kann', wir: 'können', ihr: 'könnt', sie: 'können' } },
  { infinitive: 'müssen', meaning: 'يجب', conjugations: { ich: 'muss', du: 'musst', 'er/sie': 'muss', wir: 'müssen', ihr: 'müsst', sie: 'müssen' } },
  { infinitive: 'wollen', meaning: 'يريد', conjugations: { ich: 'will', du: 'willst', 'er/sie': 'will', wir: 'wollen', ihr: 'wollt', sie: 'wollen' } },
]

export default function ConjugationPage() {
  const [activeVerb, setActiveVerb] = useState(0)
  const [mode, setMode] = useState<'table'|'quiz'>('table')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const verb = verbs[activeVerb]
  const pronouns = Object.keys(verb.conjugations)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🔁 مدرّب التصريف</h1>
      <div className="flex gap-2">
        <button onClick={() => setMode('table')} className={\`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer \${mode === 'table' ? 'bg-[#6c5ce7] text-white' : 'bg-gray-100 dark:bg-white/5'}\`}>📋 جداول</button>
        <button onClick={() => { setMode('quiz'); setAnswers({}); setShowResults(false) }} className={\`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer \${mode === 'quiz' ? 'bg-[#6c5ce7] text-white' : 'bg-gray-100 dark:bg-white/5'}\`}>🧠 تدريب</button>
      </div>
      <div className="flex flex-wrap gap-2">{verbs.map((v, i) => (
        <button key={i} onClick={() => { setActiveVerb(i); setAnswers({}); setShowResults(false) }} className={\`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer \${activeVerb === i ? 'bg-[#00b894] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'}\`} dir="ltr">{v.infinitive}</button>
      ))}</div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-100 dark:border-white/5">
        <h2 className="text-lg font-black mb-1" dir="ltr">{verb.infinitive}</h2>
        <p className="text-sm text-gray-400 mb-4">{verb.meaning}</p>
        {mode === 'table' ? (
          <div className="space-y-2">{pronouns.map(p => (
            <div key={p} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-white/5 rounded-lg">
              <span className="w-16 text-xs font-bold text-gray-500" dir="ltr">{p}</span>
              <span className="text-sm font-bold text-[#00b894]" dir="ltr">{(verb.conjugations as Record<string, string>)[p]}</span>
            </div>
          ))}</div>
        ) : (
          <div className="space-y-3">
            {pronouns.map(p => (
              <div key={p} className="flex items-center gap-3">
                <span className="w-16 text-xs font-bold text-gray-500 shrink-0" dir="ltr">{p}</span>
                <input dir="ltr" value={answers[p] || ''} onChange={e => setAnswers(prev => ({ ...prev, [p]: e.target.value }))} placeholder="..." className={\`flex-1 px-3 py-2 rounded-lg border text-sm font-bold \${showResults ? (answers[p]?.toLowerCase().trim() === (verb.conjugations as Record<string, string>)[p] ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20') : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5'}\`} />
                {showResults && answers[p]?.toLowerCase().trim() !== (verb.conjugations as Record<string, string>)[p] && <span className="text-xs text-red-500 font-bold" dir="ltr">{(verb.conjugations as Record<string, string>)[p]}</span>}
              </div>
            ))}
            <button onClick={() => setShowResults(true)} className="w-full bg-[#6c5ce7] text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-[#5a4bd6] transition-colors mt-2">تحقّق</button>
          </div>
        )}
      </div>
    </div>
  )
}`,

  // ── SRS Review ──
  SrsReviewPage: `import { useState, useEffect } from 'react'

interface ReviewCard {
  id: string
  front: string
  back: string
  category: string
}

const sampleCards: ReviewCard[] = [
  { id: '1', front: 'der Termin', back: 'الموعد', category: 'vocab' },
  { id: '2', front: 'die Bescheinigung', back: 'الشهادة', category: 'vocab' },
  { id: '3', front: 'beantragen', back: 'يتقدم بطلب', category: 'vocab' },
  { id: '4', front: 'Perfekt von "gehen"', back: 'ist gegangen', category: 'grammar' },
  { id: '5', front: 'Konjunktiv II von "können"', back: 'könnte', category: 'grammar' },
  { id: '6', front: 'die Unterlagen', back: 'الوثائق', category: 'vocab' },
  { id: '7', front: 'sich bewerben um', back: 'يتقدم لـ (وظيفة)', category: 'vocab' },
  { id: '8', front: 'Akkusativ oder Dativ? "in ___"', back: 'Akk (movement) / Dat (location)', category: 'grammar' },
]

export default function SrsReviewPage() {
  const [cards] = useState(sampleCards)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)

  const card = cards[current]
  const done = current >= cards.length

  const handleRate = () => {
    setFlipped(false)
    setReviewed(r => r + 1)
    setTimeout(() => setCurrent(c => c + 1), 200)
  }

  if (done) return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#00b894] to-[#00cec9] rounded-2xl p-8 text-white text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-black mb-2">انتهت المراجعة!</h1>
        <p className="text-white/80">راجعت {reviewed} بطاقة</p>
        <button onClick={() => { setCurrent(0); setReviewed(0) }} className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">أعد المراجعة</button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2">🔄 مراجعة ذكيّة SRS</h1>
        <span className="text-sm bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold">{current + 1} / {cards.length}</span>
      </div>
      <div onClick={() => setFlipped(!flipped)} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-10 text-center border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-md transition-all min-h-[200px] flex flex-col items-center justify-center">
        {!flipped ? (
          <>
            <span className="text-xs text-gray-400 mb-3">{card.category === 'vocab' ? '📚 مفردات' : '📐 قواعد'}</span>
            <p className="text-2xl font-black" dir="ltr">{card.front}</p>
            <p className="text-xs text-gray-400 mt-4">اضغط لقلب البطاقة</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-black text-[#00b894]">{card.back}</p>
            <div className="flex gap-2 mt-6">
              {['😟 صعب', '🤔 متوسط', '😊 سهل', '🔥 أتقنته'].map((label, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); handleRate() }} className="px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer">{label}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}`,

  // ── Telc Sim ──
  TelcSimPage: `import { useState, useEffect } from 'react'

export default function TelcSimPage() {
  const [activeTab, setActiveTab] = useState('lesen')
  const [time, setTime] = useState(65 * 60) // 65 minutes
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running || time <= 0) return
    const timer = setInterval(() => setTime(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [running, time])

  const formatTime = (s: number) => \`\${Math.floor(s/60).toString().padStart(2,'0')}:\${(s%60).toString().padStart(2,'0')}\`

  const tabs = [
    { id: 'lesen', label: 'Lesen', icon: '📖', time: '25 د' },
    { id: 'sprachbausteine', label: 'Sprachbausteine', icon: '🧩', time: '10 د' },
    { id: 'hoeren', label: 'Hören', icon: '🎧', time: '20 د' },
    { id: 'schreiben', label: 'Schreiben', icon: '✍️', time: '30 د' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🎓 محاكي Telc B1</h1>
      <div className="bg-gradient-to-r from-[#0984e3] to-[#74b9ff] rounded-2xl p-5 text-white flex items-center justify-between">
        <div>
          <p className="text-sm font-bold opacity-80">المؤقّت</p>
          <p className="text-3xl font-black font-mono">{formatTime(time)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRunning(!running)} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">{running ? '⏸️ إيقاف' : '▶️ ابدأ'}</button>
          <button onClick={() => { setTime(65*60); setRunning(false) }} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">🔄</button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">{tabs.map(t => (
        <button key={t.id} onClick={() => setActiveTab(t.id)} className={\`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors cursor-pointer \${activeTab === t.id ? 'bg-[#0984e3] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'}\`}>{t.icon} {t.label} <span className="text-[10px] opacity-60">({t.time})</span></button>
      ))}</div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/5 min-h-[300px]">
        {activeTab === 'lesen' && <div><h3 className="font-bold mb-3">Teil 1: Globalverstehen</h3><p className="text-sm text-gray-500 mb-4 leading-relaxed" dir="ltr">Lesen Sie die Überschriften a–j und die Texte 1–5. Finden Sie für jeden Text die passende Überschrift.</p><p className="text-center text-gray-400 mt-8">⬇️ ابدأ المؤقت وابدأ القراءة من نموذج Lesen</p></div>}
        {activeTab === 'sprachbausteine' && <div><h3 className="font-bold mb-3">Sprachbausteine Teil 1</h3><p className="text-sm text-gray-500" dir="ltr">Lesen Sie den Text und wählen Sie die richtige Antwort (a, b oder c).</p><p className="text-center text-gray-400 mt-8">⬇️ انتقل لقسم Sprachbausteine للتدريب</p></div>}
        {activeTab === 'hoeren' && <div><h3 className="font-bold mb-3">Teil 1: Kurze Nachrichten</h3><p className="text-sm text-gray-500">استمع للرسائل القصيرة وأجب عن الأسئلة</p><p className="text-center text-gray-400 mt-8">⬇️ انتقل لقسم Hören للتدريب</p></div>}
        {activeTab === 'schreiben' && <div><h3 className="font-bold mb-3">Persönliche oder halbformelle E-Mail</h3><p className="text-sm text-gray-500">اكتب رسالة بـ 80-100 كلمة</p><p className="text-center text-gray-400 mt-8">⬇️ انتقل لقسم Schreiben للتدريب</p></div>}
      </div>
    </div>
  )
}`,

  // ── Dashboard ──
  DashboardPage: `import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [level, setLevel] = useState(1)
  const [badges, setBadges] = useState<{name: string, icon: string}[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('b1_gamification')
      if (saved) {
        const data = JSON.parse(saved)
        setXp(data.xp || 0)
        setStreak(data.streak || 0)
        setLevel(Math.floor((data.xp || 0) / 500) + 1)
        setBadges(data.badges || [])
      }
    } catch {}
  }, [])

  const progress = (xp % 500) / 5 // 0-100

  const weekDays = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
  const weekActivity = [30, 45, 0, 60, 80, 20, 0]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📊 لوحتي الشخصيّة</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#00b894]">{xp}</div>
          <div className="text-[10px] text-gray-400">⚡ نقاط XP</div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#e17055]">🔥 {streak}</div>
          <div className="text-[10px] text-gray-400">أيام تتابع</div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#6c5ce7]">Lv.{level}</div>
          <div className="text-[10px] text-gray-400">مستواك</div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#0984e3]">{badges.length}</div>
          <div className="text-[10px] text-gray-400">🏅 شارات</div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
        <h3 className="font-bold text-sm mb-3">التقدّم نحو المستوى التالي</h3>
        <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00b894] to-[#00cec9] rounded-full transition-all" style={{ width: progress + '%' }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">{xp % 500} / 500 XP للمستوى التالي</p>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
        <h3 className="font-bold text-sm mb-4">📅 نشاط الأسبوع</h3>
        <div className="flex items-end justify-between gap-1 h-24">
          {weekDays.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-[#00b894]/20 rounded-t" style={{ height: weekActivity[i] + '%' }}><div className="w-full h-full bg-[#00b894] rounded-t opacity-60" /></div>
              <span className="text-[9px] text-gray-400">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,

  // ── Bildbeschreibung ──
  BildbeschreibungPage: `export default function BildbeschreibungPage() {
  const phrases = [
    { de: 'Auf dem Bild sehe ich...', ar: 'في الصورة أرى...', type: 'بداية' },
    { de: 'Im Vordergrund / Im Hintergrund...', ar: 'في المقدمة / في الخلفية...', type: 'موقع' },
    { de: 'Links / Rechts / In der Mitte...', ar: 'يسار / يمين / في الوسط...', type: 'موقع' },
    { de: 'Die Person trägt...', ar: 'الشخص يرتدي...', type: 'وصف' },
    { de: 'Es sieht so aus, als ob...', ar: 'يبدو وكأن...', type: 'تفسير' },
    { de: 'Ich vermute, dass...', ar: 'أعتقد أن...', type: 'رأي' },
    { de: 'Das Bild erinnert mich an...', ar: 'الصورة تذكّرني بـ...', type: 'ربط' },
    { de: 'Meiner Meinung nach zeigt das Bild...', ar: 'في رأيي الصورة تُظهر...', type: 'رأي' },
  ]
  const typeColors: Record<string, string> = { 'بداية': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', 'موقع': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', 'وصف': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', 'تفسير': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', 'رأي': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400', 'ربط': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🖼️ وصف صورة — Bildbeschreibung</h1>
      <p className="text-sm text-gray-500">تعلّم كيف تصف صورة بالألمانية — عبارات مفيدة مع الترجمة</p>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-100 dark:border-white/5">
        <h3 className="font-bold text-sm mb-4">📝 خطوات وصف الصورة</h3>
        <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside">
          <li>ابدأ بوصف عام للصورة</li>
          <li>صِف الأشخاص والأشياء</li>
          <li>حدّد المواقع (يسار، يمين، وسط)</li>
          <li>أعطِ رأيك الشخصي</li>
          <li>اربط الصورة بتجربتك</li>
        </ol>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-sm">💬 عبارات مفيدة</h3>
        {phrases.map((p, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-100 dark:border-white/5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-sm text-[#0984e3]" dir="ltr">{p.de}</p>
                <p className="text-xs text-gray-500 mt-1">{p.ar}</p>
              </div>
              <span className={\`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 \${typeColors[p.type] || ''}\`}>{p.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`,

  // ── Einbuergerung ──
  EinbuergerungPage: `import { useState } from 'react'

const questions = [
  { q: 'Was steht im Grundgesetz?', opts: ['Die Grundrechte', 'Die Steuerpflicht', 'Das Wahlgesetz', 'Die Schulpflicht'], correct: 0, ar: 'ماذا يتضمن الدستور؟ → الحقوق الأساسية' },
  { q: 'Deutschland ist ein...', opts: ['demokratischer Staat', 'Königreich', 'Kaiserreich', 'Fürstentum'], correct: 0, ar: 'ألمانيا هي... → دولة ديمقراطية' },
  { q: 'Was ist kein Grundrecht?', opts: ['Recht auf Wohngeld', 'Meinungsfreiheit', 'Religionsfreiheit', 'Pressefreiheit'], correct: 0, ar: 'ما ليس حقاً أساسياً؟ → حق السكن المدعوم' },
  { q: 'Wer wählt den Bundeskanzler?', opts: ['Der Bundestag', 'Das Volk', 'Der Bundesrat', 'Der Bundespräsident'], correct: 0, ar: 'من ينتخب المستشار؟ → البرلمان (البوندستاغ)' },
  { q: 'Wie viele Bundesländer hat Deutschland?', opts: ['16', '14', '18', '12'], correct: 0, ar: 'كم ولاية في ألمانيا؟ → 16' },
  { q: 'Wann ist der Tag der Deutschen Einheit?', opts: ['3. Oktober', '1. Mai', '24. Dezember', '9. November'], correct: 0, ar: 'متى يوم الوحدة الألمانية؟ → 3 أكتوبر' },
  { q: 'Wer ist das Staatsoberhaupt?', opts: ['Der Bundespräsident', 'Der Bundeskanzler', 'Der Bundestagspräsident', 'Der Ministerpräsident'], correct: 0, ar: 'من هو رئيس الدولة؟ → الرئيس الاتحادي' },
  { q: 'Was ist der Bundestag?', opts: ['Das Parlament', 'Die Regierung', 'Das Gericht', 'Die Polizei'], correct: 0, ar: 'ما هو البوندستاغ؟ → البرلمان' },
]

export default function EinbuergerungPage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const done = current >= questions.length

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === questions[current].correct) setScore(s => s + 1)
    setTimeout(() => { setSelected(null); setCurrent(c => c + 1) }, 1500)
  }

  if (done) return (
    <div className="bg-gradient-to-br from-[#fdcb6e] to-[#e17055] rounded-2xl p-8 text-white text-center">
      <div className="text-5xl mb-4">🏛️</div>
      <h1 className="text-2xl font-black mb-2">النتيجة</h1>
      <p className="text-3xl font-black">{score} / {questions.length}</p>
      <p className="text-white/70 mt-2">{score >= 6 ? 'ممتاز! أنت جاهز!' : 'حاول مرة أخرى'}</p>
      <button onClick={() => { setCurrent(0); setScore(0) }} className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">أعد المحاولة</button>
    </div>
  )

  const q = questions[current]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2">🏛️ Einbürgerungstest</h1>
        <span className="text-sm bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold">{current + 1}/{questions.length}</span>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/5">
        <p className="text-xs text-gray-400 mb-2">{q.ar}</p>
        <p className="text-lg font-black mb-6" dir="ltr">{q.q}</p>
        <div className="space-y-2">{q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} className={\`w-full p-3 rounded-xl font-bold text-sm text-right transition-all cursor-pointer border-2 \${
            selected === null ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-[#fdcb6e]' :
            i === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500' :
            i === selected ? 'bg-red-100 dark:bg-red-900/30 border-red-500' :
            'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-40'
          }\`} dir="ltr">{opt}</button>
        ))}</div>
      </div>
    </div>
  )
}`,

  // ── Study Plan ──
  StudyPlanPage: `export default function StudyPlanPage() {
  const weeks = [
    { week: 'الأسبوع 1', title: 'الأساسيات', color: 'border-[#00b894]', tasks: ['📚 القواعد: الأزمنة الثلاثة', '🗂️ المفردات: 200 كلمة أساسية', '📖 قراءة: نموذجان Lesen', '✍️ كتابة: رسالة شخصية'] },
    { week: 'الأسبوع 2', title: 'أقسام الامتحان', color: 'border-[#0984e3]', tasks: ['🎧 استماع: 3 نماذج Hören', '🧩 Sprachbausteine: نموذجان', '🎙️ محادثة: Teil 1 + 2', '⚠️ أخطاء شائعة: 15 خطأ'] },
    { week: 'الأسبوع 3', title: 'التدريب المكثف', color: 'border-[#6c5ce7]', tasks: ['🧠 Drill: 100 سؤال قواعد', '🃏 بطاقات ذاكرة: 50 بطاقة', '📝 كتابة: 3 رسائل رسمية', '🎯 امتحان تجريبي كامل'] },
    { week: 'الأسبوع 4', title: 'المراجعة النهائية', color: 'border-[#e17055]', tasks: ['🔄 مراجعة SRS: كل البطاقات', '📅 تحدي يومي: 4 أسئلة/يوم', '🎓 محاكي Telc: امتحان كامل بالمؤقت', '🚨 صندوق الإسعافات: حفظ الجمل'] },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📅 مخطّط الدراسة</h1>
      <p className="text-sm text-gray-500">خطّة 4 أسابيع للتحضير الكامل لامتحان B1</p>
      <div className="space-y-4">{weeks.map((w, i) => (
        <div key={i} className={\`bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border-r-4 \${w.color} border border-gray-100 dark:border-white/5\`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded font-bold">{w.week}</span>
            <h3 className="font-bold text-sm">{w.title}</h3>
          </div>
          <div className="space-y-1.5">{w.tasks.map((t, j) => (
            <label key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>{t}</span>
            </label>
          ))}</div>
        </div>
      ))}</div>
    </div>
  )
}`,

  // ── Tips Page ──
  TipsPage: `export default function TipsPage() {
  const sections = [
    { title: 'Lesen — نصائح القراءة', icon: '📖', tips: ['اقرأ العناوين أولاً قبل النص', 'ابحث عن الكلمات المفتاحية في السؤال', 'لا تحتاج فهم كل كلمة — المعنى العام كافٍ', 'انتبه للكلمات السلبية مثل nicht, kein, nie'] },
    { title: 'Hören — نصائح الاستماع', icon: '🎧', tips: ['اقرأ الأسئلة قبل بدء التسجيل', 'ركّز على الأرقام والتواريخ والأسماء', 'التسجيل يُشغّل مرتين — استخدم المرة الثانية للتحقق', 'لا تتوقف عند كلمة لم تفهمها'] },
    { title: 'Schreiben — نصائح الكتابة', icon: '✍️', tips: ['ابدأ دائماً بـ Sehr geehrte/r أو Liebe/r', 'اكتب 3-4 فقرات قصيرة', 'استخدم روابط: außerdem, deshalb, trotzdem', 'راجع الأفعال في نهاية الجمل الفرعية'] },
    { title: 'Sprechen — نصائح المحادثة', icon: '🎙️', tips: ['تدرّب بصوت عالٍ كل يوم', 'احفظ 5 جمل للبداية و5 للنهاية', 'لا تخف من الأخطاء — التواصل أهم', 'استخدم Redemittel الجاهزة'] },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🧰 أدوات النجاح</h1>
      <p className="text-sm text-gray-500">نصائح واستراتيجيّات لكل قسم من الامتحان</p>
      <div className="space-y-4">{sections.map((s, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">{s.icon} {s.title}</h3>
          <ul className="space-y-2">{s.tips.map((t, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-[#00b894] mt-0.5">✓</span>
              <span>{t}</span>
            </li>
          ))}</ul>
        </div>
      ))}</div>
    </div>
  )
}`,

  // ── Topics Bank ──
  TopicsPage: `export default function TopicsPage() {
  const topics = [
    { theme: 'Wohnen — السكن', vocab: ['die Miete', 'der Vermieter', 'die Nebenkosten', 'der Mietvertrag', 'die Kaution'], phrases: ['Ich suche eine Wohnung...', 'Die Miete beträgt...', 'Der Vertrag ist befristet auf...'] },
    { theme: 'Arbeit — العمل', vocab: ['der Lebenslauf', 'das Vorstellungsgespräch', 'der Arbeitgeber', 'das Gehalt', 'der Urlaub'], phrases: ['Ich habe mich beworben um...', 'Meine Stärken sind...', 'Ich arbeite seit...'] },
    { theme: 'Gesundheit — الصحة', vocab: ['der Arzt', 'das Rezept', 'die Krankenkasse', 'die Tablette', 'der Notfall'], phrases: ['Ich habe Schmerzen in...', 'Ich brauche einen Termin bei...', 'Ich bin seit Tagen krank...'] },
    { theme: 'Freizeit — أوقات الفراغ', vocab: ['das Hobby', 'der Sport', 'der Verein', 'die Veranstaltung', 'der Ausflug'], phrases: ['In meiner Freizeit...', 'Am Wochenende gehe ich...', 'Ich interessiere mich für...'] },
    { theme: 'Bildung — التعليم', vocab: ['die Schule', 'der Kurs', 'die Prüfung', 'das Zeugnis', 'die Nachhilfe'], phrases: ['Ich besuche einen Kurs...', 'Mein Kind geht in die...', 'Ich möchte mich weiterbilden...'] },
    { theme: 'Einkaufen — التسوق', vocab: ['das Angebot', 'der Kassenbon', 'umtauschen', 'die Reklamation', 'der Rabatt'], phrases: ['Ich möchte das umtauschen...', 'Haben Sie das in einer anderen Größe?', 'Wo finde ich...?'] },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📑 بنك المواضيع</h1>
      <p className="text-sm text-gray-500">مواضيع Sprechen و Schreiben مع مفردات وعبارات</p>
      <div className="space-y-4">{topics.map((t, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
          <h3 className="font-bold mb-3">{t.theme}</h3>
          <div className="mb-3"><p className="text-xs font-bold text-[#6c5ce7] mb-1.5">📚 مفردات</p><div className="flex flex-wrap gap-1.5">{t.vocab.map((v, j) => (<span key={j} className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-lg" dir="ltr">{v}</span>))}</div></div>
          <div><p className="text-xs font-bold text-[#00b894] mb-1.5">💬 عبارات</p><div className="space-y-1">{t.phrases.map((p, j) => (<p key={j} className="text-xs text-gray-500" dir="ltr">• {p}</p>))}</div></div>
        </div>
      ))}</div>
    </div>
  )
}`,

  // ── Problems ──
  ProblemsPage: `export default function ProblemsPage() {
  const problems = [
    { problem: 'تجديد الإقامة', icon: '📋', solution: 'اذهب للـ Ausländerbehörde قبل شهرين من انتهاء الإقامة. أحضر: جواز سفر، عقد سكن، تأمين صحي، إثبات دخل.' },
    { problem: 'البحث عن سكن', icon: '🏠', solution: 'استخدم مواقع: WG-Gesucht, ImmoScout24, eBay Kleinanzeigen. جهّز Schufa-Auskunft ومعلومات الدخل.' },
    { problem: 'مشاكل مع صاحب العمل', icon: '💼', solution: 'تواصل مع Betriebsrat (مجلس العمال) أو Gewerkschaft (النقابة). Arbeitsagentur تقدم استشارات مجانية.' },
    { problem: 'مشاكل التأمين الصحي', icon: '🏥', solution: 'كل مقيم ملزم بالتأمين. AOK و TK أشهر الشركات. إذا كنت بلا عمل: Jobcenter يغطي التأمين.' },
    { problem: 'الاعتراف بالشهادات', icon: '🎓', solution: 'anabin.kmk.org للتحقق من الشهادة. IHK FOSA للمهن المهنية. تقديم عبر: anerkennung-in-deutschland.de' },
    { problem: 'مشاكل مع الجيران', icon: '🏢', solution: 'احترم Ruhezeiten (22:00-06:00). تواصل ودياً أولاً. إذا استمرت: اكتب للـ Hausverwaltung.' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">💡 مشاكل وحلول</h1>
      <p className="text-sm text-gray-500">دليل عملي لحل المشاكل الشائعة في ألمانيا</p>
      <div className="space-y-3">{problems.map((p, i) => (
        <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">{p.icon} {p.problem}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.solution}</p>
        </div>
      ))}</div>
    </div>
  )
}`,

  // ── Print Page ──
  PrintPage: `export default function PrintPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🖨️ اطبع وذاكر</h1>
      <p className="text-sm text-gray-500">ملخصات جاهزة للطباعة — اضغط الزر وطبّع</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { title: 'ملخص القواعد', icon: '📚', items: ['الأزمنة الثلاثة', 'حالات الإعراب الأربع', 'الأفعال المنفصلة', 'الجمل الفرعية'] },
          { title: 'مفردات أساسية', icon: '🗂️', items: ['200 كلمة الأكثر شيوعاً', 'أفعال مع حروف جر', 'صفات + عكسها', 'تعابير يومية'] },
          { title: 'عبارات الامتحان', icon: '💬', items: ['عبارات Sprechen', 'بدايات الرسائل', 'روابط الجمل', 'عبارات الرأي'] },
          { title: 'نصائح الامتحان', icon: '🧰', items: ['نصائح Lesen', 'نصائح Hören', 'نصائح Schreiben', 'نصائح Sprechen'] },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">{card.icon} {card.title}</h3>
            <ul className="space-y-1 mb-4">{card.items.map((item, j) => (<li key={j} className="text-xs text-gray-500 flex items-center gap-1.5">• {item}</li>))}</ul>
            <button onClick={() => window.print()} className="w-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">🖨️ طباعة</button>
          </div>
        ))}
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

console.log('\\nDone! All pages updated with real content.');
