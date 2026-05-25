import { useState } from 'react'
import { hoerenModels } from '../data/hoeren'

export default function HoerenPage() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const model = selectedModel !== null ? hoerenModels[selectedModel] : null

  if (!model) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎧</span>
          <div>
            <h1 className="text-2xl font-bold">الاستماع — Hören</h1>
            <p className="text-muted text-sm">تدرّب على فهم الإعلانات والمحادثات الألمانية. ({hoerenModels.length} نماذج)</p>
          </div>
        </div>
        <div className="grid gap-3">
          {hoerenModels.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(i)}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-right"
            >
              <h3 className="font-bold text-green">{m.title}</h3>
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
        <button onClick={() => { setSelectedModel(null); setAnswers({}); setShowResults(false) }} className="text-green font-bold text-sm">→ العودة</button>
        <h1 className="text-lg font-bold">{model.title}</h1>
      </div>

      {showResults && (
        <div className={`rounded-xl p-4 text-center font-bold ${score >= model.questions.length * 0.7 ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
          النتيجة: {score} / {model.questions.length}
        </div>
      )}

      {model.questions.map(q => (
        <div key={q.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="bg-purple-50 rounded-lg p-4 mb-4 text-sm whitespace-pre-line" dir="ltr">
            {q.audioDescription}
          </div>
          <p className="font-bold mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let cls = 'border rounded-lg p-3 text-sm block w-full text-right transition-colors '
              if (showResults) {
                if (oi === q.correct) cls += 'border-green bg-green/10 text-green font-bold'
                else if (answers[q.id] === oi) cls += 'border-red bg-red/10 text-red'
                else cls += 'border-gray-200 text-gray-400'
              } else {
                cls += answers[q.id] === oi ? 'border-green bg-green/5 font-bold' : 'border-gray-200 hover:border-green'
              }
              return <button key={oi} onClick={() => !showResults && setAnswers(p => ({...p, [q.id]: oi}))} className={cls} dir="ltr">{String.fromCharCode(65+oi)}. {opt}</button>
            })}
          </div>
          {showResults && <div className="mt-3 bg-blue-50 rounded-lg p-3 text-sm text-blue-800">💡 {q.explanation}</div>}
        </div>
      ))}

      {!showResults && Object.keys(answers).length > 0 && (
        <button onClick={() => setShowResults(true)} className="w-full bg-green text-white py-3 rounded-xl font-bold">✅ تحقّق</button>
      )}
    </div>
  )
}
