import { useState, useMemo } from 'react'
import { lesenModels as baseModels } from '../data/lesen'
import { lesenModelsExtra } from '../data/lesen-extra'

const lesenModels = [...baseModels, ...lesenModelsExtra]

export default function LesenPage() {
  const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, any>>({}) // maps questionId to choice
  const [showResults, setShowResults] = useState(false)
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({})

  const model = selectedModelIndex !== null ? lesenModels[selectedModelIndex] : null

  // Flatten questions to calculate stats
  const allQuestions = useMemo(() => {
    if (!model) return []
    if ((model as any).parts) {
      // Hierarchical model
      const list: any[] = []
      ;(model as any).parts.forEach((part: any) => {
        if (part.statements) {
          list.push(...part.statements.map((s: any) => ({ ...s, type: 'match-blog', correct: s.correctAd })))
        } else if (part.questions) {
          if (part.type === 'tf-opinions') {
            list.push(...part.questions.map((q: any) => ({ ...q, type: 'tf-opinions', correct: q.correct })))
          } else {
            list.push(...part.questions.map((q: any) => ({ ...q, type: 'mc', correct: q.correct })))
          }
        } else if (part.situations) {
          list.push(...part.situations.map((s: any) => ({ ...s, type: 'match-ads', correct: s.correctAd })))
        }
      })
      return list
    } else {
      // Flat model
      return ((model as any).questions || []).map((q: any) => ({ ...q, type: 'flat', correct: q.correct }))
    }
  }, [model])

  // Calculate score
  const score = useMemo(() => {
    let count = 0
    allQuestions.forEach((q: any) => {
      const ans = answers[q.id]
      if (ans !== undefined && String(ans) === String(q.correct)) {
        count++
      }
    })
    return count
  }, [allQuestions, answers])

  const handleSelectAnswer = (qId: string, value: any) => {
    if (showResults) return
    setAnswers(prev => ({
      ...prev,
      [qId]: value
    }))
  }

  const reset = () => {
    setAnswers({})
    setShowResults(false)
    setSelectedModelIndex(null)
    setShowExplanations({})
  }

  if (!model) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📖</span>
          <div>
            <h1 className="text-2xl font-bold grad-text">القراءة — Lesen B1</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">اختر نموذجاً للتدريب. تحاكي هذه النماذج الأقسام المختلفة لامتحان القراءة B1.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {lesenModels.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelectedModelIndex(i)}
              className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 text-right hover:border-[#00b894]/20 transition-all flex flex-col justify-between shadow-md cursor-pointer group"
            >
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00b894] transition-colors">{m.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{m.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 flex justify-between items-center w-full">
                <span className="text-[10px] bg-[#00b894]/10 text-[#00b894] px-2 py-0.5 rounded-full">B1 Niveau</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                  {(m as any).parts ? `${(m as any).parts.length} أجزاء` : `${(m as any).questions.length} أسئلة`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const isAllAnswered = allQuestions.length > 0 && Object.keys(answers).length >= allQuestions.length

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button onClick={reset} className="text-[#00b894] font-bold text-sm hover:underline cursor-pointer">
          → العودة للنماذج
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{model.title}</h1>
      </div>

      {/* Results Header */}
      {showResults && (
        <div className={`rounded-xl p-5 text-center font-bold text-base border animate-slideDown ${
          score >= allQuestions.length * 0.6
            ? 'bg-[#00b894]/10 text-[#00b894] border-[#00b894]/20'
            : 'bg-red-500/10 text-red-500 border-red-500/20'
        }`}>
          النتيجة النهائية: {score} / {allQuestions.length} ({Math.round((score / allQuestions.length) * 100)}%)
          {score >= allQuestions.length * 0.6 ? ' — ممتاز! تجاوزت اختبار القراءة بنجاح 🎉' : ' — حاول مرّة أخرى لتعزيز مهاراتك في الفهم 💪'}
        </div>
      )}

      {/* RENDER HIERARCHICAL B1 EXAMS */}
      {(model as any).parts ? (
        <div className="space-y-8">
          {(model as any).parts.map((part: any, pIdx: number) => {
            return (
              <div key={pIdx} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-5 shadow-xl">
                {/* Part Header */}
                <div className="border-b border-gray-200 dark:border-white/5 pb-3">
                  <span className="text-xs text-[#00b894] font-bold uppercase tracking-wider">Teil {pIdx + 1}</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{part.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{part.instructionsAr}</p>
                </div>

                {/* Blog Matching Block */}
                {part.type === 'match-blog' && part.texts && (
                  <div className="space-y-6">
                    {/* Authors and texts */}
                    <div className="grid md:grid-cols-2 gap-3 bg-gray-100 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5">
                      {part.texts.map((item: any) => (
                        <div key={item.id} className="p-3 rounded-lg border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-left font-sans" dir="ltr">
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">{item.id}) {item.titleDe} ({item.titleAr}):</span>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{item.textDe}</p>
                        </div>
                      ))}
                    </div>

                    {/* Statements to check */}
                    <div className="space-y-4 pt-2">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">طابق العبارات بالكاتب المناسب (A-E):</p>
                      {part.statements.map((s: any, sIdx: number) => {
                        const selectedVal = answers[s.id]
                        
                        
                        return (
                          <div key={s.id} className="border-t border-gray-200 dark:border-white/5 pt-4 space-y-2">
                            <div className="flex gap-2.5 items-start">
                              <span className="bg-white dark:bg-[#1a1a2e]/5 text-gray-500 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans mt-0.5">
                                {sIdx + 1}
                              </span>
                              <div className="text-left font-sans text-sm text-gray-600 dark:text-gray-400 leading-normal" dir="ltr">
                                <p className="font-medium text-gray-900 dark:text-white">{s.textDe}</p>
                                {s.textAr && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right font-sans" dir="rtl">💡 {s.textAr}</p>}
                              </div>
                            </div>

                            {/* Author letters selectors */}
                            <div className="flex flex-wrap gap-1.5 mr-8 pt-1">
                              {part.texts.map((item: any) => {
                                const isSelected = selectedVal === item.id
                                const isOptCorrect = s.correctAd === item.id

                                let btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/10 text-gray-600 dark:text-gray-400 hover:bg-white dark:bg-[#1a1a2e]/10'
                                if (showResults) {
                                  if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/45 text-[#00b894] font-bold'
                                  else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/45 text-red-500 font-bold'
                                  else btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/5 text-gray-500 dark:text-gray-400 opacity-40'
                                } else {
                                  if (isSelected) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/30 text-[#00b894] font-bold'
                                }

                                return (
                                  <button
                                    key={item.id}
                                    disabled={showResults}
                                    onClick={() => handleSelectAnswer(s.id, item.id)}
                                    className={`w-9 h-9 rounded-full border text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                                  >
                                    {item.id}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Newspaper Article Text / Rules text / Opinions text */}
                {part.textDe && (
                  <div 
                    className="bg-slate-950/40 border border-gray-200 dark:border-white/5 p-5 rounded-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-wrap select-text text-left font-sans"
                    dir="ltr"
                  >
                    {part.textDe}
                  </div>
                )}

                {/* MC questions (mc-article / mc-rules) */}
                {part.questions && part.type !== 'tf-opinions' && (
                  <div className="space-y-6 pt-2">
                    {part.questions.map((q: any, qIdx: number) => {
                      const selectedVal = answers[q.id]
                      const showEx = showExplanations[q.id]
                      return (
                        <div key={q.id} className="border-t border-gray-200 dark:border-white/5 pt-4 space-y-3">
                          <div className="flex gap-2.5 items-start">
                            <span className="bg-white dark:bg-[#1a1a2e]/5 text-gray-500 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans mt-0.5">
                              {qIdx + 1}
                            </span>
                            <div className="text-left font-sans text-sm text-gray-900 dark:text-white" dir="ltr">
                              <p className="font-semibold">{q.promptDe}</p>
                              {q.promptAr && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right" dir="rtl">💡 {q.promptAr}</p>}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-2 mr-8">
                            {q.options.map((opt: any) => {
                              const optionId = opt.id
                              const optionText = opt.de
                              const isSelected = selectedVal === optionId
                              const isOptCorrect = q.correct === optionId

                              let btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/10 text-gray-600 dark:text-gray-400 hover:bg-white dark:bg-[#1a1a2e]/10'
                              if (showResults) {
                                if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/45 text-[#00b894] font-bold'
                                else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/45 text-red-500 font-bold'
                                else btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/5 text-gray-500 dark:text-gray-400 opacity-40'
                              } else {
                                if (isSelected) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/30 text-[#00b894] font-bold'
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
                                  {showResults && isOptCorrect && <span className="text-[#00b894] text-sm">✓</span>}
                                  {showResults && isSelected && !isOptCorrect && <span className="text-red-500 text-sm">✗</span>}
                                </button>
                              )
                            })}
                          </div>

                          {showResults && q.explanation && (
                            <div className="mr-8 space-y-2">
                              <button
                                onClick={() => setShowExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                                className="text-[10px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors cursor-pointer"
                              >
                                {showEx ? '🙈 إخفاء الشرح والترجمة' : '💡 عرض الشرح والترجمة العربية'}
                              </button>
                              {showEx && (
                                <div className="bg-gold/5 border border-gold/15 p-3 rounded-xl text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Ads matching (match-ads) */}
                {part.type === 'match-ads' && part.ads && (
                  <div className="space-y-6">
                    {/* Ads catalog */}
                    <div className="grid sm:grid-cols-2 gap-3 bg-gray-100 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 max-h-96 overflow-y-auto nav-scroll">
                      {part.ads.map((ad: any) => (
                        <div key={ad.id} className="p-3 rounded-lg border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-left font-sans" dir="ltr">
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">إعلان ({ad.id}): {ad.titleDe}</span>
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{ad.textDe}</p>
                        </div>
                      ))}
                    </div>

                    {/* Situations to solve */}
                    <div className="space-y-4 pt-2">
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">اختر الإعلان المناسب (a-h) لكل حالة من الحالات التالية:</p>
                      {part.situations.map((sit: any, sIdx: number) => {
                        const selectedVal = answers[sit.id]
                         

                        return (
                          <div key={sit.id} className="border-t border-gray-200 dark:border-white/5 pt-4 space-y-2">
                            <div className="flex gap-2.5 items-start">
                              <span className="bg-white dark:bg-[#1a1a2e]/5 text-gray-500 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans mt-0.5">
                                {sIdx + 1}
                              </span>
                              <div className="text-left font-sans text-sm text-gray-900 dark:text-white" dir="ltr">
                                <p className="font-medium text-gray-900 dark:text-white">{sit.textDe}</p>
                                {sit.textAr && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right font-sans" dir="rtl">💡 {sit.textAr}</p>}
                              </div>
                            </div>

                            {/* Options buttons a-h */}
                            <div className="flex flex-wrap gap-1.5 mr-8 pt-1">
                              {part.ads.map((ad: any) => {
                                const isSelected = selectedVal === ad.id
                                const isOptCorrect = sit.correctAd === ad.id

                                let btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/10 text-gray-600 dark:text-gray-400 hover:bg-white dark:bg-[#1a1a2e]/10'
                                if (showResults) {
                                  if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/45 text-[#00b894] font-bold'
                                  else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/45 text-red-500 font-bold'
                                  else btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/5 text-gray-500 dark:text-gray-400 opacity-40'
                                } else {
                                  if (isSelected) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/30 text-[#00b894] font-bold'
                                }

                                return (
                                  <button
                                    key={ad.id}
                                    disabled={showResults}
                                    onClick={() => handleSelectAnswer(sit.id, ad.id)}
                                    className={`w-9 h-9 rounded-xl border text-xs font-bold uppercase transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                                  >
                                    {ad.id}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* True/False opinions matching (tf-opinions) */}
                {part.type === 'tf-opinions' && part.questions && (
                  <div className="space-y-6 pt-2">
                    {part.questions.map((q: any, qIdx: number) => {
                      const selectedVal = answers[q.id]
                      const showEx = showExplanations[q.id]
                      return (
                        <div key={q.id} className="border-t border-gray-200 dark:border-white/5 pt-4 space-y-3">
                          <div className="flex gap-2.5 items-start">
                            <span className="bg-white dark:bg-[#1a1a2e]/5 text-gray-500 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans mt-0.5">
                              {qIdx + 1}
                            </span>
                            <div className="text-left font-sans text-sm text-gray-900 dark:text-white" dir="ltr">
                              <p className="font-semibold">{q.statementDe}</p>
                              {q.statementAr && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right" dir="rtl">💡 {q.statementAr}</p>}
                            </div>
                          </div>

                          <div className="flex gap-3 mr-8">
                            {([true, false] as const).map(val => {
                              const isSelected = selectedVal === val
                              const isOptCorrect = q.correct === val

                              let btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/10 text-gray-600 dark:text-gray-400 hover:bg-white dark:bg-[#1a1a2e]/10'
                              if (showResults) {
                                if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/45 text-[#00b894] font-bold'
                                else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/45 text-red-500 font-bold'
                                else btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/5 text-gray-500 dark:text-gray-400 opacity-40'
                              } else {
                                if (isSelected) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/30 text-[#00b894] font-bold'
                              }

                              return (
                                <button
                                  key={String(val)}
                                  disabled={showResults}
                                  onClick={() => handleSelectAnswer(q.id, val)}
                                  className={`px-5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${btnStyle}`}
                                >
                                  {val ? 'Richtig (صح)' : 'Falsch (خطأ)'}
                                </button>
                              )
                            })}
                          </div>

                          {showResults && q.explanation && (
                            <div className="mr-8 space-y-2">
                              <button
                                onClick={() => setShowExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                                className="text-[10px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors cursor-pointer"
                              >
                                {showEx ? '🙈 إخفاء الشرح والترجمة' : '💡 عرض الشرح والترجمة العربية'}
                              </button>
                              {showEx && (
                                <div className="bg-gold/5 border border-gold/15 p-3 rounded-xl text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

              </div>
            )
          })}
        </div>
      ) : (
        /* RENDER FLAT MODELS (lesenModelsExtra) */
        <div className="space-y-6">
          {(model as any).questions && (model as any).questions.map((q: any, qIdx: number) => {
            const selectedVal = answers[q.id]
            const showEx = showExplanations[q.id]

            return (
              <div key={q.id} className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4 shadow-xl">
                {/* Passage Text */}
                <div 
                  className="bg-slate-950/40 border border-gray-200 dark:border-white/5 p-4 rounded-xl text-xs text-gray-600 dark:text-gray-400 leading-relaxed select-text text-left font-sans"
                  dir="ltr"
                >
                  {q.text}
                </div>

                {/* Question Prompt */}
                <div className="flex gap-2.5 items-start">
                  <span className="bg-white dark:bg-[#1a1a2e]/5 text-gray-500 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans mt-0.5">
                    {qIdx + 1}
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white text-left font-sans" dir="ltr">{q.question}</p>
                </div>

                {/* Multiple choices buttons */}
                <div className="grid sm:grid-cols-2 gap-2 mr-8">
                  {q.options && q.options.map((opt: string, oi: number) => {
                    const isSelected = selectedVal === oi
                    const isOptCorrect = q.correct === oi

                    let btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/10 text-gray-600 dark:text-gray-400 hover:bg-white dark:bg-[#1a1a2e]/10'
                    if (showResults) {
                      if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/45 text-[#00b894] font-bold'
                      else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/45 text-red-500 font-bold'
                      else btnStyle = 'bg-white dark:bg-[#1a1a2e]/5 border-white/5 text-gray-500 dark:text-gray-400 opacity-40'
                    } else {
                      if (isSelected) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/30 text-[#00b894] font-bold'
                    }

                    return (
                      <button
                        key={oi}
                        disabled={showResults}
                        onClick={() => handleSelectAnswer(q.id, oi)}
                        className={`w-full text-left font-sans px-4 py-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-1.5 cursor-pointer ${btnStyle}`}
                        dir="ltr"
                      >
                        <span><span className="font-bold uppercase mr-1.5">{String.fromCharCode(65 + oi)})</span> {opt}</span>
                        {showResults && isOptCorrect && <span className="text-[#00b894] text-sm">✓</span>}
                        {showResults && isSelected && !isOptCorrect && <span className="text-red-500 text-sm">✗</span>}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation */}
                {showResults && q.explanation && (
                  <div className="mr-8 space-y-2">
                    <button
                      onClick={() => setShowExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="text-[10px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors cursor-pointer"
                    >
                      {showEx ? '🙈 إخفاء الشرح والترجمة' : '💡 عرض الشرح والترجمة العربية'}
                    </button>
                    {showEx && (
                      <div className="bg-gold/5 border border-gold/15 p-3 rounded-xl text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )}

              </div>
            )
          })}
        </div>
      )}

      {/* Verify Button */}
      {!showResults && isAllAnswered && (
        <button 
          onClick={() => setShowResults(true)} 
          className="w-full bg-[#00b894] text-white py-3.5 rounded-2xl font-bold hover:bg-[#094F28] transition-all cursor-pointer shadow-lg"
        >
          ✅ تحقّق من الإجابات ورؤية النتيجة
        </button>
      )}

      {/* Reset Button */}
      {showResults && (
        <button 
          onClick={reset} 
          className="w-full bg-white dark:bg-[#1a1a2e]/5 border border-gray-200 dark:border-white/10 text-white py-3.5 rounded-2xl font-bold hover:bg-white dark:bg-[#1a1a2e]/10 transition-all cursor-pointer shadow-lg"
        >
          🔄 العودة واختيار نموذج آخر
        </button>
      )}

    </div>
  )
}
