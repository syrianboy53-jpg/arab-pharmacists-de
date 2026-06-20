import { useState } from 'react'

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
    setAnswers(prev => ({ ...prev, [`${mIdx}-${qIdx}`]: aIdx }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📝 5 نماذج B1 موضوعيّة</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">نماذج كاملة مقسّمة بحسب الموضوع — اختر نموذجاً وابدأ</p>
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
                        const key = `${mi}-${qi}`
                        const answered = answers[key] !== undefined
                        return (
                          <button key={oi} onClick={() => handleAnswer(mi, qi, oi)}
                            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                              !answered ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-[#0984e3]' :
                              oi === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700' :
                              oi === answers[key] ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700' :
                              'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-40'
                            }`} dir="ltr">{opt}</button>
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
}