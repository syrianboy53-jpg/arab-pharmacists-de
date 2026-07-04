import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { playCorrectSound, playWrongSound, playTadaSound, triggerConfetti } from '../utils/gamification'
import { useXP } from '../hooks/useXP'
import originalLessonsJson from '../data/grammarLessons.json'

interface Exercise {
  type?: 'multiple-choice' | 'fill-blank' | 'word-order'
  question: string
  options?: string[]
  correct?: number
  answer?: string
  hint?: string
  words?: string[]
}

interface LessonTopic {
  id: number
  level?: string
  title: string
  titleAr: string
  explanation: string
  tip?: string
  table?: {
    headers: string[]
    rows: string[][]
  }
  examples: { de: string; ar: string }[]
  exercises: Exercise[]
}

const lessons = originalLessonsJson as LessonTopic[]

const LEVEL_COLORS: Record<string, string> = {
  'A1': 'bg-emerald-100 text-emerald-700 border-emerald-300',
  'A2': 'bg-blue-100 text-blue-700 border-blue-300',
  'B1': 'bg-amber-100 text-amber-700 border-amber-300',
  'B2': 'bg-rose-100 text-rose-700 border-rose-300',
}

export default function GrammarLessonPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { addXP } = useXP()
  
  const [lesson, setLesson] = useState<LessonTopic | null>(null)
  const [questions, setQuestions] = useState<Exercise[]>([])
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [lives, setLives] = useState(5)
  const [progress, setProgress] = useState(0)
  
  // MC state
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  // Fill-blank state
  const [fillInput, setFillInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  // Word-order state
  const [wordOrderAnswer, setWordOrderAnswer] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>([])
  
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  const [showExplanation, setShowExplanation] = useState(true)

  useEffect(() => {
    const l = lessons.find(x => x.id === Number(lessonId))
    if (!l || !l.exercises || l.exercises.length === 0) {
      navigate('/grammar')
      return
    }
    setLesson(l)
    setQuestions(l.exercises)
  }, [lessonId, navigate])

  const initWordOrder = (q: Exercise) => {
    if (q.type === 'word-order' && q.words) {
      setAvailableWords([...q.words].sort(() => Math.random() - 0.5))
      setWordOrderAnswer([])
    }
  }

  useEffect(() => {
    if (questions.length > 0 && !showExplanation) {
      initWordOrder(questions[currentIdx])
      setFillInput('')
      setShowHint(false)
    }
  }, [currentIdx, questions, showExplanation])

  if (!lesson || questions.length === 0) {
    return <div className="h-screen flex items-center justify-center font-bold">جاري التحميل...</div>
  }

  // --- EXPLANATION PHASE ---
  if (showExplanation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f1a] flex flex-col items-center p-4 sm:p-6 pb-12">
        <div className="max-w-2xl w-full text-right">
          <Link to="/grammar" className="text-gray-400 hover:text-gray-600 mb-6 inline-flex items-center gap-1 font-bold">
            ← عودة للقواعد
          </Link>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/5 mb-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
              <div className="text-4xl bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">📐</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white" dir="ltr">{lesson.title}</h1>
                  {lesson.level && (
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${LEVEL_COLORS[lesson.level] || LEVEL_COLORS['B1']}`}>
                      {lesson.level}
                    </span>
                  )}
                </div>
                <p className="text-[#0984e3] font-bold">{lesson.titleAr}</p>
              </div>
            </div>

            {/* TIP box */}
            {lesson.tip && (
              <div className="mb-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/20 rounded-2xl p-4 flex gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="text-sm font-black text-amber-700 dark:text-amber-400 mb-1">تذكّر!</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{lesson.tip}</p>
                </div>
              </div>
            )}

            {/* Grammar Table */}
            {lesson.table && (
              <div className="mb-6 overflow-x-auto">
                <h3 className="font-black text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <span className="text-lg">📊</span> جدول القاعدة:
                </h3>
                <table className="w-full text-sm rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                  <thead>
                    <tr className="bg-[#0984e3] text-white">
                      {lesson.table.headers.map((h, i) => (
                        <th key={i} className="px-3 py-2.5 text-center font-bold text-xs sm:text-sm whitespace-nowrap" dir="ltr">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.table.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-white dark:bg-[#1a1a2e]' : 'bg-blue-50/50 dark:bg-blue-900/10'}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-center text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-white/5 whitespace-nowrap" dir={ci === 0 ? 'rtl' : 'ltr'}>
                            {cell.includes('✦') ? (
                              <span className="text-[#0984e3] font-bold">{cell}</span>
                            ) : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Explanation */}
            <div className="mb-6">
              <h3 className="font-black text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-lg">📖</span> الشرح:
              </h3>
              <div className="bg-gray-50 dark:bg-black/20 rounded-2xl p-4 border border-gray-200 dark:border-white/5">
                <pre className="text-gray-800 dark:text-gray-200 font-sans whitespace-pre-wrap leading-loose text-sm sm:text-base">
                  {lesson.explanation}
                </pre>
              </div>
            </div>

            {/* Examples */}
            <div className="mb-8">
              <h3 className="font-black text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-lg">✏️</span> أمثلة (Beispiele):
              </h3>
              <div className="space-y-3">
                {lesson.examples.slice(0, 4).map((ex, i) => (
                  <div key={i} className="bg-white dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col gap-1.5">
                    <span className="font-bold text-base text-gray-900 dark:text-white" dir="ltr">{ex.de}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{ex.ar}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => { setShowExplanation(false); initWordOrder(questions[0]) }}
              className="w-full bg-[#00b894] hover:bg-[#00a884] text-white font-black text-xl py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
            >
              جاهز للتمارين التفاعلية! 🚀
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- QUIZ PHASE ---
  const q = questions[currentIdx]
  const qType = q.type || 'multiple-choice'

  const handleCheck = () => {
    let correct = false

    if (qType === 'multiple-choice') {
      if (selectedOption === null) return
      correct = selectedOption === q.correct
    } else if (qType === 'fill-blank') {
      const userAns = fillInput.trim().toLowerCase()
      const expected = (q.answer || '').trim().toLowerCase()
      correct = userAns === expected
    } else if (qType === 'word-order') {
      const userSentence = wordOrderAnswer.join(' ')
      const expected = (q.answer || '').trim()
      correct = userSentence.trim() === expected.trim()
    }

    setIsAnswered(true)
    setIsCorrect(correct)

    if (correct) {
      playCorrectSound()
      const newProgress = ((currentIdx + 1) / questions.length) * 100
      setProgress(newProgress)
    } else {
      playWrongSound()
      setLives(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (lives <= 0 && !isCorrect) {
      setIsGameOver(true)
      return
    }

    if (currentIdx < questions.length - 1) {
      if (!isCorrect) {
        setQuestions(prev => {
          const newQ = [...prev]
          newQ.push({ ...q, id: (q as any).id + '-retry' } as any)
          return newQ
        })
      }
      setCurrentIdx(i => i + 1)
      setIsAnswered(false)
      setSelectedOption(null)
      setIsCorrect(false)
    } else {
      if (isCorrect) {
        playTadaSound()
        triggerConfetti()
        setIsGameWon(true)
        addXP(20)
      }
    }
  }

  if (isGameOver) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-[#0f0f1a] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-6">💔</div>
        <h1 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">لقد نفدت القلوب!</h1>
        <p className="text-gray-500 mb-8 max-w-md">لا بأس، راجع الشرح وحاول مجدداً!</p>
        <div className="flex gap-4 w-full max-w-sm">
          <button onClick={() => window.location.reload()} className="flex-1 bg-[#0984e3] text-white py-4 rounded-2xl font-black">إعادة المحاولة 🔄</button>
          <button onClick={() => setShowExplanation(true)} className="flex-1 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white py-4 rounded-2xl font-black">مراجعة القاعدة 📖</button>
        </div>
      </div>
    )
  }

  if (isGameWon) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-[#0f0f1a] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-6">🏆</div>
        <h1 className="text-3xl font-black mb-4 text-[#00b894]">إتقان رائع للقاعدة!</h1>
        <p className="text-gray-500 mb-2 max-w-md">أنت الآن تفهم قاعدة <b>{lesson.titleAr}</b> بشكل ممتاز.</p>
        <p className="text-amber-500 font-bold mb-8">+20 XP 🎉</p>
        <Link to="/grammar" className="w-full max-w-sm bg-[#00b894] hover:bg-[#00a884] text-white py-4 rounded-2xl font-black transition-colors block text-center">
          متابعة التعلم 💪
        </Link>
      </div>
    )
  }

  const canSubmit = qType === 'multiple-choice'
    ? selectedOption !== null
    : qType === 'fill-blank'
    ? fillInput.trim().length > 0
    : wordOrderAnswer.length > 0

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a2e] flex flex-col">
      {/* Top Bar */}
      <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full flex items-center gap-4 sm:gap-6">
        <Link to="/grammar" className="text-gray-400 hover:text-gray-600 text-2xl font-bold shrink-0">✕</Link>
        
        <div className="flex-1 h-4 bg-gray-200 dark:bg-black/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00b894] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          />
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          {lesson.level && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${LEVEL_COLORS[lesson.level] || LEVEL_COLORS['B1']}`}>
              {lesson.level}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-red-500 font-bold text-lg">
            <span>❤️</span>
            <span>{lives}</span>
          </div>
        </div>
      </div>

      {/* Question counter */}
      <div className="px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <p className="text-xs text-gray-400 font-bold text-center mb-2">
          السؤال {currentIdx + 1} من {questions.length} · {lesson.titleAr}
        </p>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-6 flex flex-col justify-center gap-6">
        
        {/* Question type badge */}
        <div className="flex justify-center">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">
            {qType === 'multiple-choice' ? '🔘 اختر الإجابة الصحيحة' : qType === 'fill-blank' ? '✍️ اكتب الإجابة' : '🔤 رتّب الكلمات'}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-relaxed text-center" dir="ltr">
          {q.question.split('___').map((part: string, i: number, arr: any[]) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block border-b-4 border-gray-300 dark:border-gray-600 w-16 mx-2 translate-y-1"></span>
              )}
            </span>
          ))}
        </h2>

        {/* MULTIPLE CHOICE */}
        {qType === 'multiple-choice' && q.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.options.map((opt: string, i: number) => {
              const isSelected = selectedOption === i
              let btnClass = "p-5 rounded-2xl border-2 font-bold text-lg transition-all text-center "
              
              if (isAnswered) {
                if (i === q.correct) {
                  btnClass += "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                } else if (isSelected && i !== q.correct) {
                  btnClass += "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                } else {
                  btnClass += "bg-gray-50 border-gray-200 text-gray-400 dark:bg-white/5 dark:border-white/10 dark:text-gray-600 opacity-50"
                }
              } else {
                if (isSelected) {
                  btnClass += "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 scale-[1.02]"
                } else {
                  btnClass += "bg-white border-gray-200 hover:bg-gray-50 text-gray-700 dark:bg-[#0f0f1a] dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 hover:border-gray-300"
                }
              }

              return (
                <button 
                  key={i} 
                  onClick={() => { if (!isAnswered) setSelectedOption(i) }} 
                  disabled={isAnswered}
                  className={btnClass}
                  dir="ltr"
                >
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {/* FILL BLANK */}
        {qType === 'fill-blank' && (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={fillInput}
                onChange={e => setFillInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !isAnswered && canSubmit) handleCheck() }}
                disabled={isAnswered}
                dir="ltr"
                placeholder="اكتب إجابتك هنا..."
                className={`w-full text-xl font-bold text-center p-5 rounded-2xl border-2 transition-all outline-none ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-white dark:bg-[#0f0f1a] border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:border-[#0984e3]'
                }`}
                autoFocus
              />
            </div>
            {isAnswered && !isCorrect && q.answer && (
              <div className="text-center text-sm font-bold bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700/30 p-3 rounded-xl text-green-700 dark:text-green-400">
                الإجابة الصحيحة: <span dir="ltr" className="font-black">{q.answer}</span>
              </div>
            )}
            {!isAnswered && q.hint && (
              <div className="text-center">
                {!showHint ? (
                  <button onClick={() => setShowHint(true)} className="text-xs text-gray-400 hover:text-gray-600 font-bold underline">
                    💡 إظهار التلميح
                  </button>
                ) : (
                  <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/20 px-4 py-2 rounded-xl font-bold">
                    💡 {q.hint}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* WORD ORDER */}
        {qType === 'word-order' && (
          <div className="space-y-5">
            {/* Answer area */}
            <div 
              className={`min-h-[70px] p-4 rounded-2xl border-2 flex flex-wrap gap-2 items-center justify-center transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-dashed border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-black/20'
              }`}
              dir="ltr"
            >
              {wordOrderAnswer.length === 0 ? (
                <span className="text-gray-400 text-sm font-bold">انقر على الكلمات لإضافتها هنا...</span>
              ) : (
                wordOrderAnswer.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (isAnswered) return
                      setWordOrderAnswer(prev => prev.filter((_, idx) => idx !== i))
                      setAvailableWords(prev => [...prev, w])
                    }}
                    disabled={isAnswered}
                    className="px-3 py-1.5 bg-[#0984e3] text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors"
                  >
                    {w}
                  </button>
                ))
              )}
            </div>
            {/* Available words */}
            <div className="flex flex-wrap gap-2 justify-center" dir="ltr">
              {availableWords.map((w, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (isAnswered) return
                    setWordOrderAnswer(prev => [...prev, w])
                    setAvailableWords(prev => prev.filter((_, idx) => idx !== i))
                  }}
                  disabled={isAnswered}
                  className="px-3 py-1.5 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-colors text-gray-800 dark:text-gray-200"
                >
                  {w}
                </button>
              ))}
            </div>
            {!isAnswered && wordOrderAnswer.length > 0 && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setAvailableWords(prev => [...prev, ...wordOrderAnswer])
                    setWordOrderAnswer([])
                  }}
                  className="text-xs text-gray-400 hover:text-red-500 font-bold underline"
                >
                  🔄 إعادة ترتيب
                </button>
              </div>
            )}
            {isAnswered && !isCorrect && q.answer && (
              <div className="text-center text-sm font-bold bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700/30 p-3 rounded-xl text-green-700 dark:text-green-400" dir="ltr">
                الترتيب الصحيح: <span className="font-black">{q.answer}</span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Bottom Action Bar */}
      <div className={`mt-auto border-t-2 p-4 sm:p-6 transition-colors ${
        !isAnswered ? 'bg-white border-gray-100 dark:bg-[#1a1a2e] dark:border-white/5' :
        isCorrect ? 'bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-900/50' : 
        'bg-red-100 border-red-200 dark:bg-red-900/20 dark:border-red-900/50'
      }`}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {isCorrect ? '✅' : '❌'}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                      {isCorrect ? 'عمل ممتاز! 🔥' : 'إجابة خاطئة'}
                    </h3>
                    {!isCorrect && qType === 'multiple-choice' && q.options && q.correct !== undefined && (
                      <p className="font-bold mt-1 text-red-600 dark:text-red-400" dir="ltr">
                        ✓ {q.options[q.correct]}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={isAnswered ? handleNext : handleCheck}
            disabled={!canSubmit && !isAnswered}
            className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black text-xl transition-all ${
              (!canSubmit && !isAnswered) ? 'bg-gray-200 text-gray-400 dark:bg-white/5 dark:text-gray-600 cursor-not-allowed' :
              isAnswered && isCorrect ? 'bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20' :
              isAnswered && !isCorrect ? 'bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/20' :
              'bg-[#0984e3] hover:bg-blue-600 text-white shadow-xl shadow-blue-500/20'
            }`}
          >
            {isAnswered ? 'متابعة ←' : 'تحقق'}
          </button>
        </div>
      </div>
    </div>
  )
}
