import { useState } from 'react'

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
    const key = `${mIdx}-${qIdx}`
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
                  const key = `${mi}-${qi}`
                  const answered = answers[key] !== undefined
                  return (
                    <div key={qi} className="space-y-2">
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-200" dir="ltr">{q.q}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.opts.map((opt, oi) => (
                          <button key={oi} onClick={() => handleAnswer(mi, qi, oi)}
                            className={`p-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                              !answered ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#e84393]' :
                              oi === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400' :
                              oi === answers[key] ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400' :
                              'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 opacity-40'
                            }`} dir="ltr">{opt}</button>
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
}