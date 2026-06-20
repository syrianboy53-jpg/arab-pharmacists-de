import { useState } from 'react'
import { lebenQuestions } from '../data/leben'

export default function LebenPage() {
  const [currentSet, setCurrentSet] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const questionsPerPage = 10
  const totalSets = Math.ceil(lebenQuestions.length / questionsPerPage)
  const currentQuestions = lebenQuestions.slice(currentSet * questionsPerPage, (currentSet + 1) * questionsPerPage)

  const score = currentQuestions.filter(q => answers[q.id] === q.correct).length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🇩🇪</span>
        <div>
          <h1 className="text-2xl font-bold">الحياة في ألمانيا — Leben in Deutschland</h1>
          <p className="text-muted text-sm">أسئلة اختبار الجنسية الألمانية مع ترجمة عربية. ({lebenQuestions.length} سؤال)</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: totalSets }, (_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentSet(i); setAnswers({}); setShowResults(false) }}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${currentSet === i ? 'bg-green text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            المجموعة {i + 1}
          </button>
        ))}
      </div>

      {showResults && (
        <div className={`rounded-xl p-4 text-center font-bold ${score >= currentQuestions.length * 0.7 ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
          النتيجة: {score} / {currentQuestions.length} {score >= currentQuestions.length * 0.7 ? '🎉' : '💪'}
        </div>
      )}

      {currentQuestions.map(q => (
        <div key={q.id} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 shadow-sm border border-gray-200 dark:border-white/5">
          <p className="font-bold text-sm mb-1" dir="ltr">{q.id}. {q.question}</p>
          <p className="text-xs text-muted mb-3">{q.questionAr}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let cls = 'border rounded-lg p-3 text-sm block w-full text-right transition-colors cursor-pointer '
              if (showResults) {
                if (oi === q.correct) cls += 'border-green bg-green/10 text-green font-bold'
                else if (answers[q.id] === oi) cls += 'border-red bg-red/10 text-red'
                else cls += 'border-gray-200 text-gray-400'
              } else {
                cls += answers[q.id] === oi ? 'border-green bg-green/5 font-bold' : 'border-gray-200 hover:border-green'
              }
              return <button key={oi} onClick={() => !showResults && setAnswers(p => ({...p, [q.id]: oi}))} className={cls} dir="ltr">{opt}</button>
            })}
          </div>
        </div>
      ))}

      {!showResults && Object.keys(answers).length > 0 && (
        <button onClick={() => setShowResults(true)} className="w-full bg-green text-white py-3 rounded-xl font-bold">✅ تحقّق ({Object.keys(answers).length}/{currentQuestions.length})</button>
      )}
    </div>
  )
}
