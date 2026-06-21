import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { hoerenModels } from '../data/hoeren'

export default function HoerenPage() {
  const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, any>>({}) // maps questionId to choice
  const [showResults, setShowResults] = useState(false)
  const [showTranscripts, setShowTranscripts] = useState<Record<number, boolean>>({})
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({})
  
  // Audio TTS State
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [playingAll, setPlayingAll] = useState<number | null>(null) // part index
  const [ttsSpeed, setTtsSpeed] = useState(0.85)
  const synthRef = useRef(window.speechSynthesis)

  // Cleanup on unmount
  useEffect(() => {
    return () => { synthRef.current.cancel() }
  }, [])

  // Speak a single transcript
  const speakText = useCallback((text: string, id: string) => {
    const synth = synthRef.current
    synth.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = ttsSpeed
    utterance.pitch = 1.0

    // Try to find a German voice
    const voices = synth.getVoices()
    const deVoice = voices.find(v => v.lang.startsWith('de')) || voices.find(v => v.lang.includes('DE'))
    if (deVoice) utterance.voice = deVoice

    utterance.onstart = () => setPlayingId(id)
    utterance.onend = () => setPlayingId(null)
    utterance.onerror = () => setPlayingId(null)

    synth.speak(utterance)
  }, [ttsSpeed])

  // Play all transcripts in a part sequentially
  const playAllTranscripts = useCallback((partIndex: number) => {
    const synth = synthRef.current
    synth.cancel()
    
    const part = model?.parts[partIndex]
    if (!part?.transcripts) return

    setPlayingAll(partIndex)
    const texts = part.transcripts.map(t => t.textDe)
    
    texts.forEach((text, i) => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = ttsSpeed
      utterance.pitch = 1.0

      const voices = synth.getVoices()
      const deVoice = voices.find(v => v.lang.startsWith('de'))
      if (deVoice) utterance.voice = deVoice

      const tId = part.transcripts![i]?.id || `t-${i}`
      utterance.onstart = () => setPlayingId(tId)
      utterance.onend = () => {
        setPlayingId(null)
        if (i === texts.length - 1) setPlayingAll(null)
      }
      utterance.onerror = () => { setPlayingId(null); setPlayingAll(null) }

      synth.speak(utterance)
    })
  }, [ttsSpeed])

  const stopSpeaking = useCallback(() => {
    synthRef.current.cancel()
    setPlayingId(null)
    setPlayingAll(null)
  }, [])

  const model = selectedModelIndex !== null ? hoerenModels[selectedModelIndex] : null

  // Flatten all questions to calculate stats
  const allQuestions = useMemo(() => {
    if (!model) return []
    const list: any[] = []
    model.parts.forEach(part => {
      if ('questions' in part && part.questions) {
        list.push(...part.questions)
      } else if ('statements' in part && part.statements) {
        list.push(...part.statements)
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
            <p className="text-gray-500 dark:text-gray-400 text-sm">تدرّب على فهم النصوص المسموعة الألمانية وحلّ أسئلتها. ({hoerenModels.length} نماذج كاملة)</p>
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
              className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 text-right hover:border-[#00b894]/20 transition-all flex flex-col justify-between shadow-md cursor-pointer group"
            >
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00b894] transition-colors">{m.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{m.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 flex justify-between items-center w-full">
                <span className="text-[10px] bg-[#00b894]/10 text-[#00b894] px-2 py-0.5 rounded-full">نموذج B1</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">{m.parts?.length || 0} أجزاء</span>
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
          className="text-[#00b894] font-bold text-sm hover:underline cursor-pointer"
        >
          → العودة للنماذج
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{model.title}</h1>
      </div>

      {/* Result Panel */}
      {showResults && (
        <div className={`rounded-xl p-5 text-center font-bold text-base border animate-slideDown ${
          score >= allQuestions.length * 0.6
            ? 'bg-[#00b894]/10 text-[#00b894] border-[#00b894]/20'
            : 'bg-red-500/10 text-red-500 border-red-500/20'
        }`}>
          النتيجة النهائية: {score} / {allQuestions.length} ({Math.round((score / allQuestions.length) * 100)}%)
          {score >= allQuestions.length * 0.6 ? ' — أحسنت! نجحت في الاختبار 🎉' : ' — تحتاج إلى مزيد من التدريب والأخطاء تعلّمك 💪'}
        </div>
      )}

      {/* Parts Loop */}
      <div className="space-y-8">
        {model.parts.map((part, pIdx) => (
          <div key={pIdx} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5 space-y-5 shadow-xl">
            {/* Title & Instructions */}
            <div className="border-b border-gray-200 dark:border-white/5 pb-3">
              <span className="text-xs text-[#00b894] font-bold uppercase tracking-wider">Teil {pIdx + 1}</span>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{part.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{part.instructionsAr}</p>
            </div>

            {/* 🎧 Audio Player Controls */}
            {part.transcripts && part.transcripts.length > 0 && (
              <div className="space-y-3">
                {/* Main Audio Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Play All / Stop Button */}
                  {playingAll === pIdx || playingId ? (
                    <button
                      onClick={stopSpeaking}
                      className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-lg animate-pulse"
                    >
                      ⏹ إيقاف
                    </button>
                  ) : (
                    <button
                      onClick={() => playAllTranscripts(pIdx)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00b894] to-[#00cec9] hover:from-[#00a884] hover:to-[#00beb9] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-lg hover:shadow-[#00b894]/25"
                    >
                      ▶ استمع للحوار كاملاً
                    </button>
                  )}

                  {/* Speed Control */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">السرعة:</span>
                    {[0.6, 0.85, 1.0, 1.2].map(s => (
                      <button
                        key={s}
                        onClick={() => setTtsSpeed(s)}
                        className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          ttsSpeed === s
                            ? 'bg-[#00b894] text-white shadow'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {s === 0.6 ? '🐢' : s === 0.85 ? '🔈' : s === 1.0 ? '🔊' : '⚡'}
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transcript Toggle + Individual Audio */}
                <button
                  onClick={() => setShowTranscripts(prev => ({ ...prev, [pIdx]: !prev[pIdx] }))}
                  className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 px-3.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  📝 {showTranscripts[pIdx] ? 'إخفاء النص (Transkript)' : 'عرض النص (Transkript)'}
                </button>

                {showTranscripts[pIdx] && (
                  <div className="bg-gray-50 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 p-4 rounded-xl space-y-3">
                    {part.transcripts.map((t, tIdx) => {
                      const tId = t.id || `t-${tIdx}`
                      const isThisPlaying = playingId === tId
                      return (
                        <div key={tId} className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          isThisPlaying 
                            ? 'bg-[#00b894]/10 border-[#00b894]/30 shadow-md' 
                            : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5'
                        }`} dir="ltr">
                          {/* Play individual button */}
                          <button
                            onClick={() => isThisPlaying ? stopSpeaking() : speakText(t.textDe, tId)}
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                              isThisPlaying
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-[#00b894]/10 text-[#00b894] hover:bg-[#00b894]/20'
                            }`}
                          >
                            {isThisPlaying ? '⏸' : '▶'}
                          </button>
                          <div className="flex-1 space-y-1">
                            {(t as any).speaker && (
                              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{(t as any).speaker}:</span>
                            )}
                            <p className="text-xs text-gray-700 dark:text-gray-300 font-sans leading-relaxed whitespace-pre-wrap">{t.textDe}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Questions/Statements list */}
            <div className="space-y-6 pt-2">
              {('questions' in part && part.questions ? part.questions : ('statements' in part && part.statements ? part.statements : [])).map((q: any, qIdx: number) => {
                const isTF = q.statementDe !== undefined && q.correct !== undefined // Only for tf-mc or tf
                const isMatch = q.correctAd !== undefined // For match-speakers
                const selectedVal = answers[q.id]
                const showEx = showExplanations[q.id]

                return (
                  <div key={q.id} className="border-t border-gray-200 dark:border-white/5 pt-4 space-y-3">
                    <div className="flex gap-2 items-start">
                      <span className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-sans mt-0.5">
                        {qIdx + 1}
                      </span>
                      <div className="text-left font-sans flex-1" dir="ltr">
                        {isTF || isMatch ? (
                          <>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{q.statementDe || q.textDe}</p>
                            {(q.statementAr || q.textAr) && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right" dir="rtl">💡 {q.statementAr || q.textAr}</p>}
                          </>
                        ) : (
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{q.promptDe}</p>
                        )}
                      </div>
                    </div>

                    {/* True / False choices */}
                    {isTF && (
                      <div className="flex gap-3 mr-8">
                        {([true, false] as const).map(val => {
                          const isSelected = selectedVal === val
                          const isOptCorrect = q.correct === val

                          let btnStyle = 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                          if (showResults) {
                            if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-bold'
                            else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/40 text-red-500 font-bold'
                            else btnStyle = 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 opacity-50'
                          } else {
                            if (isSelected) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/30 text-[#00b894] font-bold'
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

                          let btnStyle = 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                          if (showResults) {
                            if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-bold'
                            else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/40 text-red-500 font-bold'
                            else btnStyle = 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 opacity-50'
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
                    )}

                    {/* Match options */}
                    {isMatch && (
                      <div className="grid sm:grid-cols-2 gap-2 mr-8">
                        {part.transcripts?.map((tr: any) => {
                          const optId = tr.speaker
                          const isSelected = selectedVal === optId
                          const isOptCorrect = q.correctAd === optId

                          let btnStyle = 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'
                          if (showResults) {
                            if (isOptCorrect) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-bold'
                            else if (isSelected) btnStyle = 'bg-red-500/10 border-red-500/40 text-red-500 font-bold'
                            else btnStyle = 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 opacity-50'
                          } else {
                            if (isSelected) btnStyle = 'bg-[#00b894]/10 border-[#00b894]/30 text-[#00b894] font-bold'
                          }

                          return (
                            <button
                              key={optId}
                              disabled={showResults}
                              onClick={() => handleSelectAnswer(q.id, optId)}
                              className={`p-3 rounded-xl border text-left text-sm transition-all cursor-pointer ${btnStyle}`}
                            >
                              <div className="font-bold">{optId}</div>
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Explanation toggle */}
                    {showResults && (q.explanation || q.explanationAr) && (
                      <div className="mr-8 space-y-2">
                        <button
                          onClick={() => setShowExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="text-[10px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors cursor-pointer"
                        >
                          {showEx ? '🙈 إخفاء الشرح والترجمة' : '💡 عرض الشرح والترجمة العربية'}
                        </button>
                        {showEx && (
                          <div className="bg-amber-100 dark:bg-amber-900/5 border border-amber-200 dark:border-amber-700/15 p-3 rounded-xl text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
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
          className="w-full bg-[#00b894] text-white py-3.5 rounded-2xl font-bold hover:bg-[#094F28] transition-all cursor-pointer shadow-lg"
        >
          ✅ تحقّق من الإجابات ورؤية النتيجة
        </button>
      )}

      {/* Reset/Redo Button */}
      {showResults && (
        <button 
          onClick={() => { setAnswers({}); setShowResults(false); setShowExplanations({}) }} 
          className="w-full bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white py-3.5 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-all cursor-pointer shadow-lg"
        >
          🔄 إعادة الاختبار والتدريب
        </button>
      )}
    </div>
  )
}
