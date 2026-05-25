import { useState } from 'react'
import { lesenModels } from '../data/lesen'

export default function LesenPage() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const model = selectedModel !== null ? lesenModels[selectedModel] : null

  function handleAnswer(questionId: number, optionIndex: number) {
    if (showResults) return
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  function checkAnswers() {
    setShowResults(true)
  }

  function reset() {
    setAnswers({})
    setShowResults(false)
    setSelectedModel(null)
  }

  if (!model) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📖</span>
          <div>
            <h1 className="text-2xl font-bold">القراءة — Lesen</h1>
            <p className="text-muted text-sm">اختر نموذجاً للتدريب. كل نموذج يحاكي الامتحان الحقيقي.</p>
          </div>
        </div>
        <div className="grid gap-3">
          {lesenModels.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(i)}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 text-right"
            >
              <h3 className="font-bold text-green">{m.title}</h3>
              <p className="text-sm text-muted mt-1">{m.description}</p>
              <p className="text-xs text-gray-400 mt-2">{m.questions.length} أسئلة</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const score = model.questions.filter(q => answers[q.id] === q.correct).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={reset} className="text-green font-bold text-sm hover:underline">
          → العودة للنماذج
        </button>
        <h1 className="text-lg font-bold">{model.title}</h1>
      </div>

      {showResults && (
        <div className={`rounded-xl p-4 text-center font-bold text-lg ${
          score >= model.questions.length * 0.7
            ? 'bg-green/10 text-green'
            : 'bg-red/10 text-red'
        }`}>
          النتيجة: {score} / {model.questions.length}
          {score >= model.questions.length * 0.7 ? ' — ممتاز! 🎉' : ' — حاول مرّة أخرى 💪'}
        </div>
      )}

      {model.questions.map((q) => (
        <div key={q.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 text-sm leading-relaxed" dir="ltr">
            {q.text}
          </div>
          <p className="font-bold mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let className = 'border rounded-lg p-3 cursor-pointer transition-colors text-sm '
              if (showResults) {
                if (oi === q.correct) className += 'border-green bg-green/10 text-green font-bold'
                else if (answers[q.id] === oi) className += 'border-red bg-red/10 text-red'
                else className += 'border-gray-200 text-gray-400'
              } else {
                if (answers[q.id] === oi) className += 'border-green bg-green/5 font-bold'
                else className += 'border-gray-200 hover:border-green hover:bg-green/5'
              }
              return (
                <button
                  key={oi}
                  onClick={() => handleAnswer(q.id, oi)}
                  className={className + ' block w-full text-right'}
                  dir="ltr"
                >
                  <span className="inline-block w-6 text-center font-bold">{String.fromCharCode(65 + oi)}.</span>
                  {opt}
                </button>
              )
            })}
          </div>
          {showResults && q.explanation && (
            <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-200">
              💡 {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!showResults && Object.keys(answers).length > 0 && (
        <button
          onClick={checkAnswers}
          className="w-full bg-green text-white py-3 rounded-xl font-bold hover:bg-green-dark transition-colors"
        >
          ✅ تحقّق من إجاباتي ({Object.keys(answers).length}/{model.questions.length})
        </button>
      )}

      {showResults && (
        <button
          onClick={reset}
          className="w-full bg-gray-100 dark:bg-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          🔄 العودة للنماذج
        </button>
      )}
    </div>
  )
}
