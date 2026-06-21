import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '../hooks/useXP'
import { lesenModels } from '../data/lesen'
import { hoerenModels } from '../data/hoeren'
import { schreibenModels } from '../data/schreiben'

type ExamStage = 'intro' | 'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'result'

const EXAM_DURATIONS = {
  lesen: 90 * 60,     // 90 minutes
  hoeren: 30 * 60,    // 30 minutes
  schreiben: 30 * 60, // 30 minutes
  sprechen: 15 * 60,  // 15 minutes
}

export default function TelcSimPage() {
  const { addXP } = useXP()
  const [stage, setStage] = useState<ExamStage>('intro')
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  // Data selection
  const currentLesenModel = lesenModels[0]
  const currentHoerenModel = hoerenModels[0]
  const currentSchreibenTask = schreibenModels[0].tasks![0]

  // Answers State
  const [lesenAnswers, setLesenAnswers] = useState<Record<string, string>>({})
  const [hoerenAnswers, setHoerenAnswers] = useState<Record<string, string | boolean>>({})
  const [schreibenText, setSchreibenText] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  // Timer Logic
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft === 0 && isRunning) {
        handleTimeUp()
      }
      return
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const secs = s % 60
    return `${m.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startStage = (newStage: 'lesen' | 'hoeren' | 'schreiben' | 'sprechen') => {
    setStage(newStage)
    setTimeLeft(EXAM_DURATIONS[newStage])
    setIsRunning(true)
    stopSpeaking() // Stop any playing audio
    window.scrollTo(0, 0)
  }

  const finishCurrentStage = () => {
    setIsRunning(false)
    stopSpeaking()
    window.scrollTo(0, 0)
    
    if (stage === 'lesen') startStage('hoeren')
    else if (stage === 'hoeren') startStage('schreiben')
    else if (stage === 'schreiben') startStage('sprechen')
    else if (stage === 'sprechen') {
      setStage('result')
      addXP(500) // Huge reward for completing the full simulation
    }
  }

  const handleTimeUp = () => {
    alert('⏰ انتهى الوقت المخصص لهذا القسم! سيتم نقلك للقسم التالي.')
    finishCurrentStage()
  }

  // Confirmation before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (stage !== 'intro' && stage !== 'result') {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [stage])

  // ===================== TTS (TEXT-TO-SPEECH) LOGIC =====================
  const [playingId, setPlayingId] = useState<string | null>(null)
  const synthRef = useRef(window.speechSynthesis)

  useEffect(() => {
    return () => { synthRef.current.cancel() }
  }, [])

  const stopSpeaking = useCallback(() => {
    synthRef.current.cancel()
    setPlayingId(null)
  }, [])

  const speakText = useCallback((text: string, id: string) => {
    const synth = synthRef.current
    if (playingId === id) {
      synth.cancel()
      setPlayingId(null)
      return
    }
    synth.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = 0.9 // slightly slower for exam clarity
    utterance.pitch = 1.0

    const voices = synth.getVoices()
    const deVoice = voices.find(v => v.lang.startsWith('de')) || voices.find(v => v.lang.includes('DE'))
    if (deVoice) utterance.voice = deVoice

    utterance.onstart = () => setPlayingId(id)
    utterance.onend = () => setPlayingId(null)
    utterance.onerror = () => setPlayingId(null)

    synth.speak(utterance)
  }, [playingId])
  // ======================================================================

  // Calculation for result
  let totalLesenQuestions = 0
  let correctLesen = 0
  let totalHoerenQuestions = 0
  let correctHoeren = 0

  if (stage === 'result') {
    currentLesenModel.parts.forEach((part: any) => {
      if (part.type === 'match-blog' && part.statements) {
        part.statements.forEach((st: any) => {
          totalLesenQuestions++
          if (lesenAnswers[st.id] === st.correctAd) correctLesen++
        })
      } else if (part.type === 'mc-article' && part.questions) {
        part.questions.forEach((q: any) => {
          totalLesenQuestions++
          if (lesenAnswers[q.id] === q.correctOptionId) correctLesen++
        })
      }
    })

    currentHoerenModel.parts.forEach((part: any) => {
      if (part.statements) {
        part.statements.forEach((st: any) => {
          totalHoerenQuestions++
          if (hoerenAnswers[st.id] === st.isTrue) correctHoeren++
        })
      }
      if (part.questions) {
        part.questions.forEach((q: any) => {
          totalHoerenQuestions++
          if (hoerenAnswers[q.id] === q.correctOptionId) correctHoeren++
        })
      }
    })
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* Header and Timer Bar (Only show if in exam) */}
      <AnimatePresence>
        {stage !== 'intro' && stage !== 'result' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-4 z-50 glass p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-pulse">🔴</span>
              <div>
                <h2 className="font-black text-gray-900 dark:text-white">امتحان Telc B1 (محاكاة)</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">يُمنع استخدام القاموس أو المترجم</p>
              </div>
            </div>
            
            <div className={`text-4xl font-black font-mono tracking-wider ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
              {formatTime(timeLeft)}
            </div>
            
            <button 
              onClick={() => {
                if(window.confirm('هل أنت متأكد أنك تريد تسليم هذا القسم قبل انتهاء الوقت؟')) {
                  finishCurrentStage()
                }
              }}
              className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-xl text-sm font-bold transition-colors"
            >
              تسليم القسم للانتقال
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass p-6 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-2xl relative overflow-hidden min-h-[60vh]">
        <AnimatePresence mode="wait">
          
          {/* INTRO STAGE */}
          {stage === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center max-w-2xl mx-auto space-y-8 py-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-5xl shadow-lg transform -rotate-6">
                🎓
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">استعد للامتحان الحقيقي</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  هذه المحاكاة مصممة لتضعك تحت ضغط الوقت الفعلي لامتحان Telc B1. 
                  ستمر بالأقسام الأربعة بالتسلسل ولن تتمكن من إيقاف المؤقت.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-right">
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">📖</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Lesen & Bausteine</h3>
                  <p className="text-sm text-gray-500">90 دقيقة</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">🎧</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Hören</h3>
                  <p className="text-sm text-gray-500">30 دقيقة (صوت حقيقي)</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">✍️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Schreiben</h3>
                  <p className="text-sm text-gray-500">30 دقيقة</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">🗣️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Sprechen</h3>
                  <p className="text-sm text-gray-500">15 دقيقة (تفاعل صوتي)</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/30">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  ⚠️ تنبيه: تأكد من جلوسك في مكان هادئ وتخصيص ساعتين و 45 دقيقة تقريباً. إغلاق الصفحة سيؤدي لفقدان تقدمك.
                </p>
              </div>

              <button 
                onClick={() => startStage('lesen')}
                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                بدء الامتحان الآن 🚀
              </button>
            </motion.div>
          )}

          {/* LESEN STAGE */}
          {stage === 'lesen' && (
            <motion.div key="lesen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">📖</span> القسم الأول: القراءة (Leseverstehen)
                </h2>
                <p className="text-gray-500 mt-2">جميع أقسام القراءة - {currentLesenModel.title}</p>
              </div>
              
              <div className="space-y-10">
                {currentLesenModel.parts.map((part: any, pIndex: number) => (
                  <div key={pIndex} className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                    <h3 className="text-xl font-black mb-2">{part.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-bold">{part.instructionsAr}</p>
                    
                    {part.type === 'match-blog' && part.texts && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-bold border-b pb-2">Texte:</h4>
                          {part.texts.map((t: any) => (
                            <div key={t.id} className="p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5">
                              <span className="font-black text-blue-600 mr-2">{t.id}. {t.titleDe}</span>
                              <span className="text-sm" dir="ltr">{t.textDe}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-bold border-b pb-2">Fragen (اختر الشخص المناسب):</h4>
                          {part.statements?.map((q: any) => (
                            <div key={q.id} className="p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 space-y-3">
                              <p className="font-bold text-sm" dir="ltr">{q.textDe}</p>
                              <div className="flex gap-2 flex-wrap" dir="ltr">
                                {part.texts.map((t: any) => (
                                  <label key={t.id} className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name={q.id} 
                                      value={t.id}
                                      checked={lesenAnswers[q.id] === t.id}
                                      onChange={() => setLesenAnswers(prev => ({...prev, [q.id]: t.id}))}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="font-bold">{t.id}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {part.type === 'mc-article' && part.textDe && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-black/20 p-5 rounded-xl border border-gray-100 dark:border-white/5 whitespace-pre-wrap text-lg leading-relaxed" dir="ltr">
                          {part.textDe}
                        </div>
                        <div className="space-y-4">
                          {part.questions?.map((q: any) => (
                            <div key={q.id} className="p-4 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 space-y-3">
                              <p className="font-bold text-lg" dir="ltr">{q.promptDe}</p>
                              <div className="space-y-2" dir="ltr">
                                {q.options?.map((opt: any) => (
                                  <label key={opt.id} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                                    <input 
                                      type="radio" 
                                      name={q.id} 
                                      value={opt.id}
                                      checked={lesenAnswers[q.id] === opt.id}
                                      onChange={() => setLesenAnswers(prev => ({...prev, [q.id]: opt.id}))}
                                      className="w-5 h-5 text-blue-600"
                                    />
                                    <span>{opt.id}) {opt.de}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {part.type === 'match-ads' && part.ads && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {part.ads.map((ad: any) => (
                            <div key={ad.id} className="p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 text-sm" dir="ltr">
                              <span className="font-black text-blue-600 block mb-1">Anzeige {ad.id}</span>
                              {ad.textDe}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4 mt-6">
                          {part.situations?.map((q: any) => (
                            <div key={q.id} className="p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 space-y-3">
                              <p className="font-bold text-sm" dir="ltr">{q.textDe}</p>
                              <div className="flex gap-2 flex-wrap" dir="ltr">
                                {part.ads.map((ad: any) => (
                                  <label key={ad.id} className="flex items-center gap-1 cursor-pointer">
                                    <input type="radio" name={q.id} value={ad.id} checked={lesenAnswers[q.id] === ad.id} onChange={() => setLesenAnswers(prev => ({...prev, [q.id]: ad.id}))} className="w-4 h-4" />
                                    <span className="font-bold">{ad.id}</span>
                                  </label>
                                ))}
                                <label className="flex items-center gap-1 cursor-pointer text-red-500">
                                  <input type="radio" name={q.id} value="0" checked={lesenAnswers[q.id] === "0"} onChange={() => setLesenAnswers(prev => ({...prev, [q.id]: "0"}))} className="w-4 h-4" />
                                  <span className="font-bold">Keine Lösung (0)</span>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button onClick={finishCurrentStage} className="px-8 py-3 bg-[#00b894] hover:bg-[#00a884] text-white rounded-xl font-bold transition-colors shadow-lg">
                  إنهاء قسم القراءة والانتقال للاستماع
                </button>
              </div>
            </motion.div>
          )}

          {/* HOEREN STAGE */}
          {stage === 'hoeren' && (
            <motion.div key="hoeren" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">🎧</span> القسم الثاني: الاستماع (Hörverstehen)
                </h2>
                <p className="text-gray-500 mt-2">اضغط على زر (▶️ تشغيل الصوت) لسماع المحادثة الخاصة بكل قسم. ركز جيداً!</p>
              </div>
              
              <div className="space-y-10">
                {currentHoerenModel.parts.map((part: any, pIndex: number) => (
                  <div key={pIndex} className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                    <h3 className="text-xl font-black mb-2">{part.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-bold">{part.instructionsAr}</p>
                    
                    <div className="space-y-8">
                      {part.transcripts?.map((tr: any) => (
                        <div key={tr.id} className="p-5 bg-white dark:bg-black/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm relative overflow-hidden">
                          
                          {/* Audio Player UI */}
                          <div className="flex items-center justify-between mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => speakText(tr.textDe, tr.id)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all shadow-md ${
                                  playingId === tr.id ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                              >
                                {playingId === tr.id ? '⏹' : '▶️'}
                              </button>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white">المسار الصوتي: {tr.speaker}</p>
                                <p className="text-xs text-gray-500">{playingId === tr.id ? 'جاري التشغيل...' : 'متوقف'}</p>
                              </div>
                            </div>
                            <div className="hidden sm:flex gap-1">
                              {[1,2,3,4,5].map(bar => (
                                <div key={bar} className={`w-1.5 bg-blue-400 dark:bg-blue-500 rounded-full ${playingId === tr.id ? 'animate-bounce' : 'h-2'}`} style={{ height: playingId === tr.id ? `${Math.random() * 20 + 10}px` : '8px', animationDelay: `${bar * 0.1}s` }}></div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            {part.statements?.filter((st: any) => st.transcriptId === tr.id || !st.transcriptId).map((st: any) => (
                              <div key={st.id} className="bg-gray-50 dark:bg-black/40 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                <p className="font-bold text-base mb-3" dir="ltr">{st.id}. {st.textDe} (Richtig / Falsch?)</p>
                                <div className="flex gap-4" dir="ltr">
                                  <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-blue-500 transition-colors">
                                    <input type="radio" name={st.id} checked={hoerenAnswers[st.id] === true} onChange={() => setHoerenAnswers(prev => ({...prev, [st.id]: true}))} className="w-5 h-5 text-blue-600" />
                                    <span className="font-bold">Richtig</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-red-500 transition-colors">
                                    <input type="radio" name={st.id} checked={hoerenAnswers[st.id] === false} onChange={() => setHoerenAnswers(prev => ({...prev, [st.id]: false}))} className="w-5 h-5 text-red-600" />
                                    <span className="font-bold">Falsch</span>
                                  </label>
                                </div>
                              </div>
                            ))}
                            {part.questions?.filter((q: any) => q.transcriptId === tr.id || !q.transcriptId).map((q: any) => (
                              <div key={q.id} className="bg-gray-50 dark:bg-black/40 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                <p className="font-bold text-base mb-3" dir="ltr">{q.id}. {q.promptDe}</p>
                                <div className="space-y-2" dir="ltr">
                                  {q.options?.map((opt: any) => (
                                    <label key={opt.id} className="flex items-center gap-3 cursor-pointer bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:border-blue-500 transition-colors">
                                      <input type="radio" name={q.id} checked={hoerenAnswers[q.id] === opt.id} onChange={() => setHoerenAnswers(prev => ({...prev, [q.id]: opt.id}))} className="w-5 h-5 text-blue-600" />
                                      <span className="font-medium">{opt.id}) {opt.de}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* If part doesn't use transcripts directly mapping, render questions anyway */}
                      {(!part.transcripts || part.transcripts.length === 0) && (
                        <div className="space-y-4">
                            {part.statements?.map((st: any) => (
                              <div key={st.id} className="bg-gray-50 dark:bg-black/40 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                <p className="font-bold text-base mb-3" dir="ltr">{st.id}. {st.textDe} (Richtig / Falsch?)</p>
                                <div className="flex gap-4" dir="ltr">
                                  <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-blue-500 transition-colors">
                                    <input type="radio" name={st.id} checked={hoerenAnswers[st.id] === true} onChange={() => setHoerenAnswers(prev => ({...prev, [st.id]: true}))} className="w-5 h-5 text-blue-600" />
                                    <span className="font-bold">Richtig</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-white/5 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-red-500 transition-colors">
                                    <input type="radio" name={st.id} checked={hoerenAnswers[st.id] === false} onChange={() => setHoerenAnswers(prev => ({...prev, [st.id]: false}))} className="w-5 h-5 text-red-600" />
                                    <span className="font-bold">Falsch</span>
                                  </label>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button onClick={finishCurrentStage} className="px-8 py-3 bg-[#00b894] hover:bg-[#00a884] text-white rounded-xl font-bold transition-colors shadow-lg">
                  إنهاء قسم الاستماع والانتقال للكتابة
                </button>
              </div>
            </motion.div>
          )}

          {/* SCHREIBEN STAGE */}
          {stage === 'schreiben' && (
            <motion.div key="schreiben" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">✍️</span> القسم الثالث: الكتابة (Schriftlicher Ausdruck)
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none flex-shrink-0">
                <p>لديك 30 دقيقة لكتابة رسالة (E-Mail / Brief) حول هذا الموضوع المتكرر في الامتحانات.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border-l-4 border-blue-500 mb-4 shadow-sm">
                  <h4 className="mt-0 text-blue-800 dark:text-blue-300 font-black">{currentSchreibenTask.typeDe} - {currentSchreibenTask.typeAr}</h4>
                  <p className="text-lg font-bold my-4" dir="ltr">{currentSchreibenTask.promptDe}</p>
                  <p className="text-sm text-gray-600 mb-2 font-bold">نقاط يجب تغطيتها (Punkte):</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    {currentSchreibenTask.requirements.map((req: string, i: number) => (
                      <li key={i} dir="rtl">{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <textarea 
                className="flex-1 w-full p-5 bg-white dark:bg-black/20 border-2 border-gray-200 dark:border-white/10 rounded-2xl resize-y focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white min-h-[300px] text-lg leading-relaxed shadow-inner"
                placeholder="Schreiben Sie Ihre E-Mail hier..."
                dir="ltr"
                value={schreibenText}
                onChange={e => setSchreibenText(e.target.value)}
              ></textarea>
              <div className="text-center mt-4">
                <button onClick={finishCurrentStage} className="px-8 py-3 bg-[#00b894] hover:bg-[#00a884] text-white rounded-xl font-bold transition-colors shadow-lg">
                  إنهاء قسم الكتابة والانتقال للمحادثة
                </button>
              </div>
            </motion.div>
          )}

          {/* SPRECHEN STAGE */}
          {stage === 'sprechen' && (
            <motion.div key="sprechen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">🗣️</span> القسم الرابع: المحادثة (Mündlicher Ausdruck)
                </h2>
                <p className="text-gray-500 mt-2">يمكنك الآن التحدث بصوتك. استمع للموضوعات، اضغط زر التسجيل، وتمرّن كأنك أمام الممتحنين.</p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border-2 border-red-200 dark:border-red-900/50 flex flex-col items-center justify-center text-center mb-8">
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all shadow-xl mb-4 ${
                    isRecording ? 'bg-red-500 text-white animate-pulse scale-110' : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-red-100 hover:text-red-500'
                  }`}
                >
                  🎤
                </button>
                <h3 className="font-black text-xl text-red-600 dark:text-red-400">
                  {isRecording ? '🔴 جاري التسجيل (التحدث)...' : 'اضغط للتحدث والممارسة المفتوحة'}
                </h3>
                <p className="text-sm text-gray-500 mt-2">لا يتم حفظ صوتك، هذه الميزة لمحاكات شعور الرهبة في الامتحان فقط.</p>
              </div>

              <div className="grid gap-6">
                {[
                  { id: 'sp1', title: 'Teil 1: Kontaktaufnahme', de: "Stellen Sie sich vor. Wie heißen Sie? Woher kommen Sie? Warum lernen Sie Deutsch?", ar: "تعرف على شريكك. تحدث عن اسمك، عائلتك، لماذا تتعلم الألمانية.", color: 'rose' },
                  { id: 'sp2', title: 'Teil 2: Thema diskutieren', de: "Diskutieren Sie das Thema: Handys für Kinder – Pro oder Contra? Was ist Ihre Meinung?", ar: "موضوع النقاش: الهواتف للأطفال. عبّر عن رأيك واذكر تجربتك الشخصية.", color: 'blue' },
                  { id: 'sp3', title: 'Teil 3: Gemeinsam etwas planen', de: "Ein Freund aus dem Kurs liegt im Krankenhaus. Planen Sie einen Besuch. Wann? Was mitbringen? Wie hinkommen?", ar: "التخطيط: صديقكم في الدورة مريض في المشفى. خططوا لزيارته.", color: 'emerald' }
                ].map(sp => (
                  <div key={sp.id} className={`bg-${sp.color}-50 dark:bg-${sp.color}-900/10 p-5 rounded-2xl border border-${sp.color}-200 dark:border-${sp.color}-900/30 flex gap-4`}>
                    <button 
                      onClick={() => speakText(sp.de, sp.id)}
                      className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-xl transition-all shadow-sm bg-white dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-white/10 border border-${sp.color}-200 dark:border-${sp.color}-900/50 ${playingId === sp.id ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      {playingId === sp.id ? '🔊' : '▶️'}
                    </button>
                    <div>
                      <h4 className={`text-${sp.color}-700 dark:text-${sp.color}-400 mt-0 font-black text-xl mb-1`}>{sp.title}</h4>
                      <p className="font-bold text-gray-900 dark:text-white" dir="ltr">{sp.de}</p>
                      <p className="text-sm text-gray-500 mt-2">{sp.ar}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <button onClick={finishCurrentStage} className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-black text-xl shadow-xl transition-transform hover:-translate-y-1">
                  إنهاء الامتحان بالكامل 🎉
                </button>
              </div>
            </motion.div>
          )}

          {/* RESULT STAGE */}
          {stage === 'result' && (
            <motion.div 
              key="result"
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-center max-w-2xl mx-auto space-y-8 py-10"
            >
              <div className="w-32 h-32 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-6xl shadow-inner border-4 border-yellow-400">
                🏆
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">امتحان بطولي!</h1>
                <p className="text-gray-500 text-lg">لقد صمدت حتى النهاية وأكملت محاكاة امتحان Telc B1.</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 text-center">
                  <h3 className="font-bold mb-2">القراءة (Lesen)</h3>
                  <div className="text-3xl font-black text-blue-600">
                    {correctLesen} / {totalLesenQuestions}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 text-center">
                  <h3 className="font-bold mb-2">الاستماع (Hören)</h3>
                  <div className="text-3xl font-black text-purple-600">
                    {correctHoeren} / {totalHoerenQuestions}
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-gradient-to-r from-emerald-500 to-teal-400 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-center items-center">
                  <p className="text-sm font-bold opacity-80 mb-1">مكافأة المثابرة</p>
                  <div className="text-4xl font-black">+500 XP</div>
                </div>
              </div>

              {schreibenText && (
                <div className="text-right bg-white dark:bg-black/20 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-black text-lg mb-4 text-[#00b894]">رسالتك (Schreiben):</h3>
                  <div className="bg-gray-50 dark:bg-black/40 p-4 rounded-xl text-gray-800 dark:text-gray-300 font-mono whitespace-pre-wrap text-left text-sm" dir="ltr">
                    {schreibenText}
                  </div>
                  <p className="text-xs text-gray-500 mt-4">قم بنسخ رسالتك وانتقل لأداة المصحح الذكي (AI Corrector) لمعرفة الأخطاء.</p>
                </div>
              )}

              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-black hover:shadow-lg transition-all"
              >
                العودة للصفحة الرئيسية
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}