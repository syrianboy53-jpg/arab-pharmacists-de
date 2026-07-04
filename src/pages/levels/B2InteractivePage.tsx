import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { telcB2Models } from '../../data/b2'

export default function B2InteractivePage() {
  const navigate = useNavigate()
  // Currently we use the first model for the simulation by default, or you can allow selection
  const b2Model = telcB2Models[0] 

  const [activeTab, setActiveTab] = useState(0) // 0: Lesen, 1: Sprachbausteine, 2: Hören, 3: Schreiben, 4: Sprechen
  const [secondsRemaining, setSecondsRemaining] = useState((b2Model.durationMin || 165) * 60)
  const [timerExpired, setTimerExpired] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Answers state
  const [lesenAnswers, setLesenAnswers] = useState<Record<string, number>>({}) // "pIdx-qIdx": optIdx
  const [sprachAnswers, setSprachAnswers] = useState<Record<number, number>>({}) // qIdx: optIdx
  const [hoerenAnswers, setHoerenAnswers] = useState<Record<string, number>>({}) // "hIdx-qIdx": optIdx

  // Scores
  const [scoreLesen, setScoreLesen] = useState(0)
  const [scoreSprach, setScoreSprach] = useState(0)
  const [scoreHoeren, setScoreHoeren] = useState(0)

  useEffect(() => {
    if (isSubmitted || timerExpired) return

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimerExpired(true)
          submitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isSubmitted, timerExpired])

  const formattedTime = () => {
    const h = Math.floor(secondsRemaining / 3600)
    const m = Math.floor((secondsRemaining % 3600) / 60)
    const s = secondsRemaining % 60
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const letterToIndex = (letter: string) => {
    const l = letter.toLowerCase()
    return l.charCodeAt(0) - 97
  }

  const submitExam = () => {
    let lScore = 0
    b2Model.readingPassages?.forEach((p: any, pIdx: number) => {
      p.questions?.forEach((q: any, qIdx: number) => {
        const correctIdx = letterToIndex(q.correct)
        if (lesenAnswers[`${pIdx}-${qIdx}`] === correctIdx) lScore++
      })
    })

    let sScore = 0
    b2Model.sprachbausteine?.forEach((b: any, bIdx: number) => {
      const correctIdx = letterToIndex(b.correct)
      if (sprachAnswers[bIdx] === correctIdx) sScore++
    })

    let hScore = 0
    b2Model.hoeren?.forEach((h: any, hIdx: number) => {
      h.questions?.forEach((q: any, qIdx: number) => {
        const correctIdx = letterToIndex(q.correct)
        if (hoerenAnswers[`${hIdx}-${qIdx}`] === correctIdx) hScore++
      })
    })

    setScoreLesen(lScore)
    setScoreSprach(sScore)
    setScoreHoeren(hScore)
    setIsSubmitted(true)
  }

  const getTotalLesen = () => {
    let total = 0
    b2Model.readingPassages?.forEach((p: any) => total += p.questions?.length || 0)
    return total
  }

  const getTotalHoeren = () => {
    let total = 0
    b2Model.hoeren?.forEach((h: any) => total += h.questions?.length || 0)
    return total
  }

  const renderLesen = () => (
    <div className="space-y-8 animate-fade-in">
      {b2Model.readingPassages?.map((p: any, pIdx: number) => (
        <div key={pIdx} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-red-500 mb-4" dir="ltr">{p.titleDe}</h2>
          <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl mb-6 text-gray-800 dark:text-gray-200 leading-relaxed text-sm" dir="ltr">
            {p.textDe}
          </div>
          <h3 className="font-bold mb-4">Fragen:</h3>
          <div className="space-y-6">
            {p.questions?.map((q: any, qIdx: number) => (
              <div key={qIdx}>
                <p className="font-bold mb-3" dir="ltr">{qIdx + 1}. {q.promptDe}</p>
                <div className="space-y-2">
                  {q.options?.map((opt: any, optIdx: number) => {
                    const isSelected = lesenAnswers[`${pIdx}-${qIdx}`] === optIdx
                    const isCorrect = isSubmitted && letterToIndex(q.correct) === optIdx
                    const isWrong = isSubmitted && isSelected && !isCorrect

                    let btnClass = "w-full text-left p-3 rounded-lg border-2 transition-all "
                    if (isSubmitted) {
                      if (isCorrect) btnClass += "bg-green-100 border-green-500 text-green-800"
                      else if (isWrong) btnClass += "bg-red-100 border-red-500 text-red-800"
                      else btnClass += "bg-gray-50 border-gray-200 text-gray-400"
                    } else {
                      btnClass += isSelected 
                        ? "bg-red-50 border-red-500 text-red-700" 
                        : "bg-white dark:bg-black/20 border-gray-200 hover:border-red-300"
                    }

                    return (
                      <button 
                        key={optIdx} 
                        disabled={isSubmitted}
                        onClick={() => setLesenAnswers(prev => ({ ...prev, [`${pIdx}-${qIdx}`]: optIdx }))}
                        className={btnClass} 
                        dir="ltr"
                      >
                        {opt.de}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderSprachbausteine = () => (
    <div className="space-y-6 animate-fade-in">
      {b2Model.sprachbausteine?.map((b: any, bIdx: number) => (
        <div key={bIdx} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-6" dir="ltr">
            {bIdx + 1}. 
            {b.contextDe.split('___').map((part: string, i: number, arr: any[]) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="font-black text-red-500 px-2">_________</span>}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-3">
            {b.options?.map((opt: any, optIdx: number) => {
              const isSelected = sprachAnswers[bIdx] === optIdx
              const isCorrect = isSubmitted && letterToIndex(b.correct) === optIdx
              const isWrong = isSubmitted && isSelected && !isCorrect

              let btnClass = "px-4 py-2 rounded-lg border-2 font-bold transition-all "
              if (isSubmitted) {
                if (isCorrect) btnClass += "bg-green-100 border-green-500 text-green-800"
                else if (isWrong) btnClass += "bg-red-100 border-red-500 text-red-800"
                else btnClass += "bg-gray-50 border-gray-200 text-gray-400"
              } else {
                btnClass += isSelected 
                  ? "bg-red-50 border-red-500 text-red-700" 
                  : "bg-white dark:bg-black/20 border-gray-200 hover:border-red-300 dark:text-white"
              }

              return (
                <button 
                  key={optIdx} 
                  disabled={isSubmitted}
                  onClick={() => setSprachAnswers(prev => ({ ...prev, [bIdx]: optIdx }))}
                  className={btnClass} 
                  dir="ltr"
                >
                  {opt.de}
                </button>
              )
            })}
          </div>
          {isSubmitted && (
            <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm" dir="rtl">
              💡 {b.explanationAr}
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderHoeren = () => (
    <div className="space-y-8 animate-fade-in">
      {b2Model.hoeren?.map((h: any, hIdx: number) => (
        <div key={hIdx} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-red-500 mb-1" dir="ltr">{h.partDe}</h2>
          <p className="text-xs text-gray-500 mb-4">{h.partAr}</p>
          
          {h.audioUrl && (
            <div className="mb-6">
              <audio controls src={h.audioUrl} className="w-full" />
            </div>
          )}

          <div className="space-y-6">
            {h.questions?.map((q: any, qIdx: number) => (
              <div key={qIdx}>
                <p className="font-bold mb-3 text-gray-800 dark:text-gray-200" dir="ltr">{qIdx + 1}. {q.promptDe}</p>
                <div className="space-y-2">
                  {q.options?.map((opt: any, optIdx: number) => {
                    const isSelected = hoerenAnswers[`${hIdx}-${qIdx}`] === optIdx
                    const isCorrect = isSubmitted && letterToIndex(q.correct) === optIdx
                    const isWrong = isSubmitted && isSelected && !isCorrect

                    let btnClass = "w-full text-left p-3 rounded-lg border-2 transition-all "
                    if (isSubmitted) {
                      if (isCorrect) btnClass += "bg-green-100 border-green-500 text-green-800"
                      else if (isWrong) btnClass += "bg-red-100 border-red-500 text-red-800"
                      else btnClass += "bg-gray-50 border-gray-200 text-gray-400"
                    } else {
                      btnClass += isSelected 
                        ? "bg-red-50 border-red-500 text-red-700" 
                        : "bg-white dark:bg-black/20 border-gray-200 hover:border-red-300 dark:text-white"
                    }

                    return (
                      <button 
                        key={optIdx} 
                        disabled={isSubmitted}
                        onClick={() => setHoerenAnswers(prev => ({ ...prev, [`${hIdx}-${qIdx}`]: optIdx }))}
                        className={btnClass} 
                        dir="ltr"
                      >
                        {opt.de}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderSchreiben = () => (
    <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10 animate-fade-in">
      <h2 className="text-xl font-bold text-red-500 mb-2" dir="ltr">{b2Model.schreiben?.topicDe}</h2>
      <p className="text-gray-500 mb-6">{b2Model.schreiben?.topicAr}</p>
      
      <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl mb-6 text-gray-800 dark:text-gray-200" dir="ltr">
        {b2Model.schreiben?.contextDe}
      </div>
      
      <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300" dir="ltr">
        {b2Model.schreiben?.bulletPoints?.map((bp: string, i: number) => (
          <li key={i}>{bp}</li>
        ))}
      </ul>

      <h3 className="font-bold mb-2">مساحة الكتابة التدريبية:</h3>
      <textarea 
        className="w-full h-64 p-4 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-black/40 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
        placeholder="Schreiben Sie hier..."
        dir="ltr"
      />

      {isSubmitted && b2Model.schreiben?.sampleEssayDe && (
        <div className="mt-6">
          <h3 className="font-bold text-green-600 mb-2">نموذج الحل (Musterlösung):</h3>
          <div className="bg-green-50 p-4 rounded-xl text-green-900 leading-relaxed text-sm whitespace-pre-wrap" dir="ltr">
            {b2Model.schreiben.sampleEssayDe}
          </div>
        </div>
      )}
    </div>
  )

  const renderSprechen = () => (
    <div className="space-y-6 animate-fade-in">
      {b2Model.sprechen?.map((sp: any, spIdx: number) => (
        <div key={spIdx} className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-red-500 mb-1" dir="ltr">{sp.partDe}</h2>
          <p className="text-xs text-gray-500 mb-4">{sp.partAr}</p>
          
          <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl mb-6 text-gray-800 dark:text-gray-200" dir="ltr">
            {sp.topicDe}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{sp.topicAr}</p>

          <h3 className="font-bold mb-2 text-indigo-500">💡 Redemittel (قوالب التحدث):</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200 text-sm mb-6" dir="ltr">
            {sp.redemittel?.map((r: string, i: number) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          {isSubmitted && sp.sampleAnswerDe && (
            <div className="mt-4">
              <h3 className="font-bold text-green-600 mb-2">نموذج إجابة صوتية (Musterantwort):</h3>
              <div className="bg-green-50 p-4 rounded-xl text-green-900 leading-relaxed text-sm whitespace-pre-wrap" dir="ltr">
                {sp.sampleAnswerDe}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const tabs = ['القراءة', 'بناء اللغة', 'الاستماع', 'الكتابة', 'المحادثة']

  return (
    <div className="space-y-6 pb-24" dir="rtl">
      {/* Header */}
      <div className="glass sticky top-0 z-10 mx-[-1rem] px-4 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate(-1)} className="text-gray-500 font-bold hover:text-red-500">◀ عودة</button>
        <div className="font-black text-xl text-red-500">{b2Model.titleDe}</div>
        <div className={`font-bold text-xl px-4 py-1 rounded-lg ${secondsRemaining < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 dark:bg-white/10'} `} dir="ltr">
          ⏱ {formattedTime()}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-colors ${
              activeTab === idx 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'glass text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[50vh]">
        {activeTab === 0 && renderLesen()}
        {activeTab === 1 && renderSprachbausteine()}
        {activeTab === 2 && renderHoeren()}
        {activeTab === 3 && renderSchreiben()}
        {activeTab === 4 && renderSprechen()}
      </div>

      {/* Results / Submit */}
      {isSubmitted ? (
        <div className="glass p-8 rounded-3xl border border-green-500/30 text-center animate-fade-in">
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-2xl font-black mb-6">نتائج الامتحان</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
            <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-white/10 w-full md:w-1/3">
              <h3 className="font-bold text-gray-500 mb-2">القراءة</h3>
              <p className="text-3xl font-black text-blue-600">{scoreLesen} / {getTotalLesen()}</p>
            </div>
            <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-white/10 w-full md:w-1/3">
              <h3 className="font-bold text-gray-500 mb-2">بناء اللغة</h3>
              <p className="text-3xl font-black text-purple-600">{scoreSprach} / {b2Model.sprachbausteine?.length}</p>
            </div>
            <div className="bg-white dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-white/10 w-full md:w-1/3">
              <h3 className="font-bold text-gray-500 mb-2">الاستماع</h3>
              <p className="text-3xl font-black text-amber-600">{scoreHoeren} / {getTotalHoeren()}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">أقسام الكتابة والمحادثة تُقيّم ذاتياً عبر النماذج المتوفرة.</p>
        </div>
      ) : (
        <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 fixed bottom-4 left-4 right-4 md:left-auto md:right-auto md:w-[700px] md:mx-auto z-20">
          <button 
            onClick={() => setActiveTab(p => Math.max(0, p - 1))}
            disabled={activeTab === 0}
            className="px-6 py-2 rounded-lg font-bold bg-gray-100 dark:bg-white/5 disabled:opacity-50"
          >
            السابق
          </button>
          
          {activeTab === 4 ? (
            <button 
              onClick={submitExam}
              className="px-8 py-2 rounded-lg font-bold bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600"
            >
              إنهاء الامتحان
            </button>
          ) : (
            <button 
              onClick={() => setActiveTab(p => Math.min(4, p + 1))}
              className="px-8 py-2 rounded-lg font-bold bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600"
            >
              التالي
            </button>
          )}
        </div>
      )}
    </div>
  )
}
