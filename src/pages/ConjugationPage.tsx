import { useState } from 'react'

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
        <button onClick={() => setMode('table')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${mode === 'table' ? 'bg-[#6c5ce7] text-white' : 'bg-gray-100 dark:bg-white/5'}`}>📋 جداول</button>
        <button onClick={() => { setMode('quiz'); setAnswers({}); setShowResults(false) }} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${mode === 'quiz' ? 'bg-[#6c5ce7] text-white' : 'bg-gray-100 dark:bg-white/5'}`}>🧠 تدريب</button>
      </div>
      <div className="flex flex-wrap gap-2">{verbs.map((v, i) => (
        <button key={i} onClick={() => { setActiveVerb(i); setAnswers({}); setShowResults(false) }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeVerb === i ? 'bg-[#00b894] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'}`} dir="ltr">{v.infinitive}</button>
      ))}</div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-100 dark:border-white/5">
        <h2 className="text-lg font-black mb-1" dir="ltr">{verb.infinitive}</h2>
        <p className="text-sm text-gray-400 mb-4">{verb.meaning}</p>
        {mode === 'table' ? (
          <div className="space-y-2">{pronouns.map(p => (
            <div key={p} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-white/5 rounded-lg">
              <span className="w-16 text-xs font-bold text-gray-500 dark:text-gray-400" dir="ltr">{p}</span>
              <span className="text-sm font-bold text-[#00b894]" dir="ltr">{(verb.conjugations as Record<string, string>)[p]}</span>
            </div>
          ))}</div>
        ) : (
          <div className="space-y-3">
            {pronouns.map(p => (
              <div key={p} className="flex items-center gap-3">
                <span className="w-16 text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0" dir="ltr">{p}</span>
                <input dir="ltr" value={answers[p] || ''} onChange={e => setAnswers(prev => ({ ...prev, [p]: e.target.value }))} placeholder="..." className={`flex-1 px-3 py-2 rounded-lg border text-sm font-bold ${showResults ? (answers[p]?.toLowerCase().trim() === (verb.conjugations as Record<string, string>)[p] ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20') : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5'}`} />
                {showResults && answers[p]?.toLowerCase().trim() !== (verb.conjugations as Record<string, string>)[p] && <span className="text-xs text-red-500 font-bold" dir="ltr">{(verb.conjugations as Record<string, string>)[p]}</span>}
              </div>
            ))}
            <button onClick={() => setShowResults(true)} className="w-full bg-[#6c5ce7] text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-[#5a4bd6] transition-colors mt-2">تحقّق</button>
          </div>
        )}
      </div>
    </div>
  )
}