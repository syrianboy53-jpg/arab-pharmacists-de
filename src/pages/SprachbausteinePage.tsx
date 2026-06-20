import { useState } from 'react'

interface SprachbausteineExercise {
  id: number
  text: string
  gaps: { position: string; options: string[]; correct: number }[]
}

const exercises: SprachbausteineExercise[] = [
  {
    id: 1,
    text: `Sehr geehrte Damen und Herren,

ich schreibe Ihnen, [1] ich mich für die Stelle als Verkäufer bewerben möchte. Ich habe [2] drei Jahren Erfahrung im Einzelhandel. [3] ich zurzeit arbeitslos bin, suche ich eine neue Stelle. Ich könnte [4] dem 1. März anfangen. Über eine Einladung [5] einem Vorstellungsgespräch würde ich mich sehr freuen.

Mit freundlichen Grüßen
Khalid Mansour`,
    gaps: [
      { position: '[1]', options: ['weil', 'obwohl', 'damit', 'trotzdem'], correct: 0 },
      { position: '[2]', options: ['vor', 'seit', 'nach', 'bis'], correct: 1 },
      { position: '[3]', options: ['Weil', 'Obwohl', 'Da', 'Wenn'], correct: 2 },
      { position: '[4]', options: ['ab', 'von', 'seit', 'aus'], correct: 0 },
      { position: '[5]', options: ['für', 'zu', 'auf', 'mit'], correct: 1 },
    ]
  },
  {
    id: 2,
    text: `Liebe Maria,

vielen Dank [1] deine Einladung zur Party! Ich komme sehr gern. Soll ich etwas [2] ? Ich könnte einen Salat machen [3] einen Kuchen backen. Sag mir bitte Bescheid, [4] die Party anfängt. Ich freue mich schon [5] den Abend!

Liebe Grüße
Fatima`,
    gaps: [
      { position: '[1]', options: ['an', 'für', 'über', 'mit'], correct: 1 },
      { position: '[2]', options: ['mitbringen', 'mitnehmen', 'mitgeben', 'mitmachen'], correct: 0 },
      { position: '[3]', options: ['und', 'oder', 'aber', 'denn'], correct: 1 },
      { position: '[4]', options: ['wann', 'wenn', 'als', 'ob'], correct: 0 },
      { position: '[5]', options: ['über', 'auf', 'für', 'an'], correct: 1 },
    ]
  },
]

export default function SprachbausteinePage() {
  const [selectedEx, setSelectedEx] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const ex = selectedEx !== null ? exercises[selectedEx] : null

  if (!ex) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🧩</span>
          <div>
            <h1 className="text-2xl font-bold">Sprachbausteine</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">أكمل الفراغات بالكلمة الصحيحة — تدريب على قواعد B1.</p>
          </div>
        </div>
        <div className="grid gap-3">
          {exercises.map((e, i) => (
            <button key={e.id} onClick={() => setSelectedEx(i)} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-white/5 text-right">
              <h3 className="font-bold text-[#00b894]">نموذج {e.id}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{e.gaps.length} فراغات</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const score = ex.gaps.filter((g) => answers[g.position] === g.correct).length

  return (
    <div className="space-y-6">
      <button onClick={() => { setSelectedEx(null); setAnswers({}); setShowResults(false) }} className="text-[#00b894] font-bold text-sm">→ العودة</button>

      {showResults && (
        <div className={`rounded-xl p-4 text-center font-bold ${score >= ex.gaps.length * 0.7 ? 'bg-[#00b894]/10 text-[#00b894]' : 'bg-red-500/10 text-red-500'}`}>
          النتيجة: {score} / {ex.gaps.length}
        </div>
      )}

      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 shadow-sm border border-gray-200 dark:border-white/5">
        <pre className="text-sm whitespace-pre-wrap leading-relaxed" dir="ltr">{ex.text}</pre>
      </div>

      <div className="space-y-4">
        {ex.gaps.map((gap) => (
          <div key={gap.position} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5">
            <p className="font-bold text-sm mb-2" dir="ltr">{gap.position}</p>
            <div className="flex flex-wrap gap-2">
              {gap.options.map((opt, oi) => {
                let cls = 'px-4 py-2 rounded-lg text-sm border transition-colors '
                if (showResults) {
                  if (oi === gap.correct) cls += 'border-[#00b894] bg-[#00b894]/10 text-[#00b894] font-bold'
                  else if (answers[gap.position] === oi) cls += 'border-red-500 bg-red-500/10 text-red-500'
                  else cls += 'border-gray-200 dark:border-white/10'
                } else {
                  cls += answers[gap.position] === oi ? 'border-[#00b894] bg-[#00b894]/5 font-bold' : 'border-gray-200 dark:border-white/10 hover:border-[#00b894]'
                }
                return <button key={oi} onClick={() => !showResults && setAnswers(p => ({...p, [gap.position]: oi}))} className={cls} dir="ltr">{opt}</button>
              })}
            </div>
          </div>
        ))}
      </div>

      {!showResults && Object.keys(answers).length > 0 && (
        <button onClick={() => setShowResults(true)} className="w-full bg-[#00b894] text-white py-3 rounded-xl font-bold">✅ تحقّق</button>
      )}
    </div>
  )
}
