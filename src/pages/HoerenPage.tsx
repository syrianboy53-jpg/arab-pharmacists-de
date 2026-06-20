import { useState, useMemo } from 'react'
import { hoerenModels } from '../data/hoeren'

export default function HoerenPage() {
  const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, any>>({}) // maps questionId to choice
  const [showResults, setShowResults] = useState(false)
  const [showTranscripts, setShowTranscripts] = useState<Record<number, boolean>>({})
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({})

  const model = selectedModelIndex !== null ? hoerenModels[selectedModelIndex] : null

  // Flatten all questions to calculate stats
  const allQuestions = useMemo(() => {
    if (!model) return []
    const list: any[] = []
    model.parts.forEach(part => {
      if (part.questions) {
        list.push(...part.questions)
      }
    })
    return list
  }, [model])

  // Calculate score
  const score = useMemo(() => {
    let count = 0
    allQuestions.forEach(q => {
      const ans = answers[q.id]
      if (ans !== undefined && String(ans) === String(q.correct)) {
        count++
      }
    })
    return count
  }, [allQuestions, answers])

  if (!model) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎧</span>
          <div>
            <h1 className="text-2xl font-bold grad-text">الاستماع — Hören B1</h1>
            <p className="text-muted text-sm">تدرّب على فهم النصوص المسموعة الألمانية وحلّ أسئلتها. ({hoerenModels.length} نماذج كاملة)</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {hoerenModels.map((m, i) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModelIndex(i)
                setAnswers({})
                setShowResults(false)
                setShowTranscripts({})
                setShowExplanations({})
              }}
              className="glass p-5 rounded-2xl border border-white/5 text-right hover:border-green/20 transition-all flex flex-col justify-between shadow-md cursor-pointer group"
            >
              <div>
                <h3 className="font-bold text-white group-hover:text-green transition-colors">{m.title}</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">{m.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center w-full">
                <span className="text-[10px] bg-green/10 text-green px-2 py-0.5 rounded-full">نموذج B1</span>
                <span className="text-[10px] text-muted font-mono">{m.parts?.length || 0} أجزاء</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const handleSelectAnswer = (qId: string, value: any) => {
    if (showResults) return
    setAnswers(prev => ({
      ...prev,
      [qId]: value
    }))
  }

  const isAllAnswered = allQuestions.length > 0 && Object.keys(answers).length >= allQuestions.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button 
          onClick={() => { setSelectedModelIndex(null); setAnswers({}); setShowResults(false) }} 
          className="text-green font-bold text-sm hover:underline cursor-pointer"
        >
          → العودة للنماذج
        </button>
        <h1 className="text-lg font-bold text-white">{model.title}</h1>
      </div>

      {/* Result Panel */}
      {showResults && (
        <div className={`rounded-xl p-5 text-center font-bold text-base border animate-slideDown ${
          score >= allQuestions.length * 0.6
            ? 'bg-green/10 text-green border-green/20'
            : 'bg-red/10 text-red border-red/20'
        }`}>
          النتيجة النهائية: {score} / {allQuestions.length} ({Math.round((score / allQuestions.length) * 100)}%)
          {score >= allQuestions.length * 0.6 ? ' — أحسنت! نجحت في الاختبار 🎉' : ' — تحتاج إلى مزيد من التدريب والأخطاء تعلّمك 💪'}
        </div>
      )}

      {/* Parts Loop */}
      <div className="space-y-8">
        {model.parts.map((part, pIdx) => (
          <div key={pIdx} className="glass p-6 rounded-2xl border border-white/5 space-y-5 shadow-xl">
            {/* Title & Instructions */}
            <div className="border-b border-white/5 pb-3">
              <span className="text-xs text-green font-bold uppercase tracking-wider">Teil {pIdx + 1}</span>
              <h3 className="text-base font-bold text-white mt-0.5">{part.title}</h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">{part.instructionsAr}</p>
            </div>

            {/* Transcript Area */}
            {part.transcripts && part.transcripts.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowTranscripts(prev => ({ ...prev, [pIdx]: !prev[pIdx] }))}
                  className="bg-white dark:bg-[#1a1a2e]/5 border border-white/10 text-ink-soft hover:bg-white dark:bg-[#1a1a2e]/10 px-3.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  📝 {showTranscripts[pIdx] ? 'إخفاء النص المكتوب (Transkript)' : 'عرض النص المكتوب (Transkript)'}
                </button>

                {showTranscripts[pIdx] && (
                  <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-3">
                    {part.transcripts.map((t, tIdx) => (
                      <div key={t.id || tIdx} className="space-y-1 text-left" dir="ltr">
                        {(t as any).speaker && <span className="text-[10px] text-gold font-bold">{(t as any).speaker}:</span>}
                        <p className="text-xs text-ink-soft font-sans leading-relaxed whitespace-pre-wrap">{t.textDe}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Questions list */}
            <div className="space-y-6 pt-2">
              {part.questions.map((q: any, qIdx: number) => {
                const isTF = q.statementDe !== undefined
                const selectedVal = answers[q.id]
                const showEx = showExplanations[q.id]

                return (
                  <div key={q.id} className="border-t border-white/5 pt-4 space-y-3">
                    <div className="flex gap-2 items-start">
                      <span className="bg-white dark:bg-[#1a1a2e]/5 text-muted w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans mt-0.5">
                        {qIdx + 1}
                      </span>
                      <div className="text-left font-sans" dir="ltr">
                        {isTF ? (
                          <>
                            <p className="text-sm font-semibold text-white">{q.statementDe}</p>
                            {q.statementAr && <p className="text-xs text-muted mt-1 text-right" dir="rtl">💡 {q.statementAr}</p>}
                          </>
                        ) : (
                          <p className="text-sm font-semibold text-white">{q.promptDe}</p>
                        )}
                      </div>
                    </div>

                    {/* True / False choices */}
                    {isTF && (
                      <div className="flex gap-3 mr-8">
                        {([true, false] as const).map(val => {
                          const isSelected = selectedVal === val
                          const isOptCorrect = q.correct === val

                          let btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/10 text-ink-soft hover:bg-white dark:bg-[#1a1a2e]/10'
                          if (showResults) {
                            if (isOptCorrect) btnStyle = 'bg-green/10 border-green/40 text-green font-bold'
                            else if (isSelected) btnStyle = 'bg-red/10 border-red/40 text-red font-bold'
                            else btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/5 text-muted opacity-50'
                          } else {
                            if (isSelected) btnStyle = 'bg-green/10 border-green/30 text-green font-bold'
                          }

                          return (
                            <button
                              key={String(val)}
                              disabled={showResults}
                              onClick={() => handleSelectAnswer(q.id, val)}
                              className={`px-6 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${btnStyle}`}
                            >
                              {val ? 'Richtig (صح)' : 'Falsch (خطأ)'}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Multiple choice options */}
                    {!isTF && q.options && (
                      <div className="grid sm:grid-cols-3 gap-2 mr-8">
                        {q.options.map((opt: any) => {
                          const optionId = opt.id || opt // handles object or string fallback
                          const optionText = opt.de || opt
                          const isSelected = selectedVal === optionId
                          const isOptCorrect = q.correct === optionId

                          let btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/10 text-ink-soft hover:bg-white dark:bg-[#1a1a2e]/10'
                          if (showResults) {
                            if (isOptCorrect) btnStyle = 'bg-green/10 border-green/40 text-green font-bold'
                            else if (isSelected) btnStyle = 'bg-red/10 border-red/40 text-red font-bold'
                            else btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/5 text-muted opacity-50'
                          } else {
                            if (isSelected) btnStyle = 'bg-green/10 border-green/30 text-green font-bold'
                          }

                          return (
                            <button
                              key={optionId}
                              disabled={showResults}
                              onClick={() => handleSelectAnswer(q.id, optionId)}
                              className={`w-full text-left font-sans px-4 py-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-1.5 cursor-pointer ${btnStyle}`}
                              dir="ltr"
                            >
                              <span><span className="font-bold uppercase mr-1">{optionId})</span> {optionText}</span>
                              {showResults && isOptCorrect && <span className="text-green text-sm">✓</span>}
                              {showResults && isSelected && !isOptCorrect && <span className="text-red text-sm">✗</span>}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Explanation toggle */}
                    {showResults && q.explanation && (
                      <div className="mr-8 space-y-2">
                        <button
                          onClick={() => setShowExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="text-[10px] text-muted hover:text-white transition-colors cursor-pointer"
                        >
                          {showEx ? '🙈 إخفاء الشرح والترجمة' : '💡 عرض الشرح والترجمة العربية'}
                        </button>
                        {showEx && (
                          <div className="bg-gold/5 border border-gold/15 p-3 rounded-xl text-[11px] text-ink-soft leading-relaxed">
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Verify Button */}
      {!showResults && isAllAnswered && (
        <button 
          onClick={() => setShowResults(true)} 
          className="w-full bg-green text-white py-3.5 rounded-2xl font-bold hover:bg-green-dark transition-all cursor-pointer shadow-lg"
        >
          ✅ تحقّق من الإجابات ورؤية النتيجة
        </button>
      )}

      {/* Reset/Redo Button */}
      {showResults && (
        <button 
          onClick={() => { setAnswers({}); setShowResults(false); setShowExplanations({}) }} 
          className="w-full bg-white dark:bg-[#1a1a2e]/5 border border-white/10 text-white py-3.5 rounded-2xl font-bold hover:bg-white dark:bg-[#1a1a2e]/10 transition-all cursor-pointer shadow-lg"
        >
          🔄 إعادة الاختبار والتدريب
        </button>
      )}
    </div>
  )
}
