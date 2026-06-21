import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { vocabCategories } from '../data/vocabulary'
import { generateLesson } from '../utils/lessonGenerator'
import type { LessonQuestion } from '../utils/lessonGenerator'
import { playCorrectSound, playWrongSound, playTadaSound, triggerConfetti } from '../utils/gamification'

export default function VocabLessonPage() {
  const { catId } = useParams()
  const navigate = useNavigate()
  
  const [questions, setQuestions] = useState<LessonQuestion[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [lives, setLives] = useState(5)
  const [progress, setProgress] = useState(0)
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)

  // Initialization
  useEffect(() => {
    const category = vocabCategories.find(c => c.id === catId)
    if (!category || !category.words || category.words.length === 0) {
      navigate('/vocabulary')
      return
    }
    
    // Generate 10 questions
    const lesson = generateLesson(category.words as any, 10)
    setQuestions(lesson)
  }, [catId, navigate])

  // Speak word if it's a listening question
  useEffect(() => {
    if (questions.length > 0 && !isAnswered && !isGameOver && !isGameWon) {
      const q = questions[currentIdx]
      if (q.type === 'listen_choose' || q.type === 'translate_de_ar') {
        speak(q.word.de)
      }
    }
  }, [currentIdx, questions, isAnswered, isGameOver, isGameWon])

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  if (questions.length === 0) {
    return <div className="h-screen flex items-center justify-center font-bold">جاري تحميل الدرس...</div>
  }

  const q = questions[currentIdx]

  const handleSelectOption = (option: string) => {
    if (isAnswered) return
    setSelectedOption(option)
  }

  const handleCheck = () => {
    if (!selectedOption) return
    
    setIsAnswered(true)
    const correct = selectedOption === q.correctAnswer
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
      // If they answered WRONG, we should probably append this question to the end so they learn it
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
      // Win!
      if (!isCorrect) {
        // Even if it's the last question, if wrong we must have appended it above
      } else {
        playTadaSound()
        triggerConfetti()
        setIsGameWon(true)
        
        // Save progress to local storage
        try {
          const progressData = JSON.parse(localStorage.getItem('b1-vocab-progress') || '{}')
          progressData[catId!] = 100
          localStorage.setItem('b1-vocab-progress', JSON.stringify(progressData))
        } catch(e) {}
      }
    }
  }

  if (isGameOver) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-[#0f0f1a] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-6">💔</div>
        <h1 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">لقد نفدت القلوب!</h1>
        <p className="text-gray-500 mb-8 max-w-md">لا بأس، الأخطاء هي طريقك للتعلم. خذ استراحة وحاول مرة أخرى.</p>
        <div className="flex gap-4 w-full max-w-sm">
          <button onClick={() => window.location.reload()} className="flex-1 bg-[#0984e3] text-white py-4 rounded-2xl font-black">إعادة المحاولة 🔄</button>
          <Link to="/vocabulary" className="flex-1 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white py-4 rounded-2xl font-black">العودة 🔙</Link>
        </div>
      </div>
    )
  }

  if (isGameWon) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-[#0f0f1a] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-6">🏆</div>
        <h1 className="text-3xl font-black mb-4 text-[#00b894]">عمل رائع جداً!</h1>
        <p className="text-gray-500 mb-8 max-w-md">أنت تتقدم بسرعة مذهلة! لقد أتممت هذا الدرس بنجاح واكتسبت مفردات جديدة.</p>
        <Link to="/vocabulary" className="w-full max-w-sm bg-[#00b894] hover:bg-[#00a884] text-white py-4 rounded-2xl font-black transition-colors">
          متابعة التعلم 💪
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a2e] flex flex-col">
      {/* Top Bar (Progress & Hearts) */}
      <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full flex items-center gap-6">
        <Link to="/vocabulary" className="text-gray-400 hover:text-gray-600 text-2xl font-bold">✕</Link>
        
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
        
        <h2 className="text-2xl sm:text-3xl font-black mb-8 text-gray-900 dark:text-white">
          {q.type === 'translate_de_ar' && 'ما معنى هذه الكلمة؟'}
          {q.type === 'translate_ar_de' && 'كيف نقول ذلك بالألمانية؟'}
          {q.type === 'listen_choose' && 'استمع واختر الكلمة الصحيحة:'}
        </h2>

        {/* Word Display */}
        <div className="mb-10 text-center">
          {q.type === 'listen_choose' ? (
            <button onClick={() => speak(q.word.de)} className="w-24 h-24 bg-[#0984e3] text-white rounded-full flex items-center justify-center text-4xl shadow-xl hover:scale-105 active:scale-95 transition-all mx-auto">
              🔊
            </button>
          ) : (
            <div className="inline-flex items-center gap-4 bg-gray-50 dark:bg-black/20 px-8 py-6 rounded-3xl border-2 border-gray-100 dark:border-white/5">
              <span className="text-4xl font-black text-[#0984e3]" dir="auto">
                {q.type === 'translate_de_ar' ? q.word.de : q.word.ar}
              </span>
              {q.type === 'translate_de_ar' && (
                <button onClick={() => speak(q.word.de)} className="text-[#0984e3] text-2xl hover:opacity-70 transition-opacity">🔊</button>
              )}
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.options.map((opt, i) => {
            const isSelected = selectedOption === opt
            
            let btnClass = "p-5 rounded-2xl border-2 font-bold text-lg transition-all text-center "
            
            if (isAnswered) {
              if (opt === q.correctAnswer) {
                btnClass += "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              } else if (isSelected && opt !== q.correctAnswer) {
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
                onClick={() => handleSelectOption(opt)} 
                disabled={isAnswered}
                className={btnClass}
                dir="auto"
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
                      {isCorrect ? 'رائع جداً!' : 'إجابة خاطئة'}
                    </h3>
                    {!isCorrect && (
                      <p className={`font-bold mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        الإجابة الصحيحة هي: {q.correctAnswer}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={isAnswered ? handleNext : handleCheck}
            disabled={!selectedOption}
            className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black text-xl transition-all ${
              !selectedOption ? 'bg-gray-200 text-gray-400 dark:bg-white/5 dark:text-gray-600 cursor-not-allowed' :
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
