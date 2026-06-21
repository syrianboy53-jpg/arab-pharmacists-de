import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { playCorrectSound, playWrongSound, playTadaSound, triggerConfetti } from '../utils/gamification'
import originalLessonsJson from '../data/grammarLessons.json'

interface LessonTopic {
  id: number
  title: string
  titleAr: string
  explanation: string
  examples: { de: string; ar: string }[]
  exercises: { question: string; options: string[]; correct: number }[]
}

const lessons = originalLessonsJson as LessonTopic[]

export default function GrammarLessonPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  
  const [lesson, setLesson] = useState<LessonTopic | null>(null)
  const [questions, setQuestions] = useState<any[]>([])
  
  const [currentIdx, setCurrentIdx] = useState(0)
  const [lives, setLives] = useState(5)
  const [progress, setProgress] = useState(0)
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  
  // New phase for explanation
  const [showExplanation, setShowExplanation] = useState(true)

  useEffect(() => {
    const l = lessons.find(x => x.id === Number(lessonId))
    if (!l || !l.exercises || l.exercises.length === 0) {
      navigate('/grammar')
      return
    }
    
    setLesson(l)
    
    // We can just use the defined exercises as our questions pool
    // To make it fun, we map them into the format we need
    const mappedQuestions = l.exercises.map((ex, idx) => ({
      id: `q-${idx}`,
      question: ex.question,
      options: ex.options,
      correctIndex: ex.correct
    }))
    
    setQuestions(mappedQuestions)
  }, [lessonId, navigate])

  if (!lesson || questions.length === 0) {
    return <div className="h-screen flex items-center justify-center font-bold">جاري التحميل...</div>
  }

  // --- Explanation Phase ---
  if (showExplanation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f1a] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl w-full text-right">
          <Link to="/grammar" className="text-gray-400 hover:text-gray-600 mb-6 inline-block font-bold">← عودة</Link>
          <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-white/5 mb-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
              <div className="text-4xl bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">📐</div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white" dir="ltr">{lesson.title}</h1>
                <p className="text-[#0984e3] font-bold mt-1">{lesson.titleAr}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-500 mb-3">القاعدة باختصار:</h3>
              <pre className="text-gray-800 dark:text-gray-200 font-sans whitespace-pre-wrap leading-loose text-lg">
                {lesson.explanation}
              </pre>
            </div>
            
            <div className="mb-8">
              <h3 className="font-bold text-gray-500 mb-3">أمثلة (Beispiele):</h3>
              <div className="space-y-3">
                {lesson.examples.slice(0, 3).map((ex, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col gap-1">
                    <span className="font-bold text-lg text-gray-900 dark:text-white" dir="ltr">{ex.de}</span>
                    <span className="text-gray-500 text-sm">{ex.ar}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setShowExplanation(false)}
              className="w-full bg-[#00b894] hover:bg-[#00a884] text-white font-black text-xl py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
            >
              جاهز للاختبار التفاعلي! 🚀
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- Quiz Phase ---
  const q = questions[currentIdx]

  const handleSelectOption = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
  }

  const handleCheck = () => {
    if (selectedOption === null) return
    
    setIsAnswered(true)
    const correct = selectedOption === q.correctIndex
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
      // If wrong, push to end to retry
      if (!isCorrect) {
        setQuestions(prev => {
          const newQ = [...prev]
          newQ.push({ ...q, id: q.id + '-retry' })
          return newQ
        })
      }
      
      setCurrentIdx(i => i + 1)
      setIsAnswered(false)
      setSelectedOption(null)
      setIsCorrect(false)
    } else {
      // Win
      if (!isCorrect) {
        // Appended above, so won't reach here immediately
      } else {
        playTadaSound()
        triggerConfetti()
        setIsGameWon(true)
      }
    }
  }

  if (isGameOver) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-[#0f0f1a] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-6">💔</div>
        <h1 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">لقد نفدت القلوب!</h1>
        <p className="text-gray-500 mb-8 max-w-md">لا بأس، قواعد اللغة تحتاج للتدريب المستمر. يمكنك مراجعة القاعدة والمحاولة مجدداً.</p>
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
        <p className="text-gray-500 mb-8 max-w-md">أنت الآن تفهم قاعدة <b>{lesson.titleAr}</b> بشكل ممتاز.</p>
        <Link to="/grammar" className="w-full max-w-sm bg-[#00b894] hover:bg-[#00a884] text-white py-4 rounded-2xl font-black transition-colors">
          متابعة التعلم 💪
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a2e] flex flex-col">
      {/* Top Bar */}
      <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full flex items-center gap-6">
        <Link to="/grammar" className="text-gray-400 hover:text-gray-600 text-2xl font-bold">✕</Link>
        
        <div className="flex-1 h-4 bg-gray-200 dark:bg-black/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00b894] rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
          <span>❤️</span>
          <span>{lives}</span>
        </div>
      </div>

      {/* Main Lesson Area */}
      <div className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center">
        
        <h2 className="text-2xl sm:text-3xl font-black mb-10 text-gray-900 dark:text-white leading-relaxed text-center" dir="ltr">
          {/* Highlight the fill-in-the-blank portion */}
          {q.question.split('___').map((part: string, i: number, arr: any[]) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block border-b-4 border-gray-300 dark:border-gray-600 w-16 mx-2 translate-y-1"></span>
              )}
            </span>
          ))}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.options.map((opt: string, i: number) => {
            const isSelected = selectedOption === i
            
            let btnClass = "p-5 rounded-2xl border-2 font-bold text-lg transition-all text-center "
            
            if (isAnswered) {
              if (i === q.correctIndex) {
                btnClass += "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              } else if (isSelected && i !== q.correctIndex) {
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
                onClick={() => handleSelectOption(i)} 
                disabled={isAnswered}
                className={btnClass}
                dir="ltr"
              >
                {opt}
              </button>
            )
          })}
        </div>

      </div>

      {/* Bottom Action Bar */}
      <div className={`mt-auto border-t-2 p-6 transition-colors ${
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
                      {isCorrect ? 'عمل ممتاز!' : 'إجابة خاطئة'}
                    </h3>
                    {!isCorrect && (
                      <p className={`font-bold mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`} dir="ltr">
                        {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={isAnswered ? handleNext : handleCheck}
            disabled={selectedOption === null}
            className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black text-xl transition-all ${
              selectedOption === null ? 'bg-gray-200 text-gray-400 dark:bg-white/5 dark:text-gray-600 cursor-not-allowed' :
              isAnswered && isCorrect ? 'bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20' :
              isAnswered && !isCorrect ? 'bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/20' :
              'bg-[#0984e3] hover:bg-blue-600 text-white shadow-xl shadow-blue-500/20'
            }`}
          >
            {isAnswered ? 'متابعة' : 'تحقق'}
          </button>
        </div>
      </div>
    </div>
  )
}
