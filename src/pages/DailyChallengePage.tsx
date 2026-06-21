import { useState, useEffect, useMemo } from 'react'
import { getDailyChallengeQuestions, DailyQuestion } from '../data/dailyChallenge'
import { useXP } from '../hooks/useXP'

export default function DailyChallengePage() {
  const { addXP } = useXP()
  
  const [questions, setQuestions] = useState<DailyQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [alreadyDoneToday, setAlreadyDoneToday] = useState(false)
  
  // Confetti effect trigger
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Check if challenge is already done today
    const dateStr = new Date().toISOString().split('T')[0]
    const storageKey = `daily_challenge_completed_${dateStr}`
    
    if (localStorage.getItem(storageKey)) {
      setAlreadyDoneToday(true)
    }

    // Load today's questions
    setQuestions(getDailyChallengeQuestions())
  }, [])

  const handleAnswer = (idx: number) => {
    if (answered !== null) return
    setAnswered(idx)
    
    const isCorrect = idx === questions[current].correctIndex
    if (isCorrect) {
      setScore(s => s + 1)
      // Optional: play success sound
    } else {
      // Optional: play error sound
    }
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
      setAnswered(null)
    } else {
      setDone(true)
      setShowConfetti(true)
      
      // Calculate XP
      const xpEarned = score * 20 + 50 // Base 50 + 20 per correct answer
      addXP(xpEarned)
      
      // Mark as done for today
      const dateStr = new Date().toISOString().split('T')[0]
      localStorage.setItem(`daily_challenge_completed_${dateStr}`, 'true')
    }
  }

  // Already done screen
  if (alreadyDoneToday && !done) return (
    <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
      <div className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        🌟
      </div>
      <h1 className="text-3xl font-black grad-text">أنهيت تحدي اليوم!</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">لقد أكملت التحدي بنجاح لهذا اليوم. عد غداً لتحدي جديد ومزيد من نقاط الخبرة (XP)!</p>
      <button 
        onClick={() => {
          // Allow practicing anyway but without XP
          setAlreadyDoneToday(false)
          localStorage.removeItem(`daily_challenge_completed_${new Date().toISOString().split('T')[0]}`)
        }}
        className="mt-4 px-6 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-all"
      >
        إعادة للتدريب (بدون نقاط)
      </button>
    </div>
  )

  // Done screen
  if (done) return (
    <div className="space-y-6 py-10">
      <div className="bg-gradient-to-br from-[#00b894] to-[#0984e3] rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
        {/* Confetti decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="text-6xl mb-6 relative z-10 animate-bounce">🎉</div>
        <h1 className="text-4xl font-black mb-3 relative z-10">أحسنت!</h1>
        <p className="text-xl text-white/90 mb-8 relative z-10">لقد أجبت بشكل صحيح على {score} من أصل {questions.length}</p>
        
        <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 relative z-10">
          <div className="text-sm text-white/80 font-bold mb-1">النقاط المكتسبة</div>
          <div className="text-4xl font-black text-yellow-300 drop-shadow-md">
            + {score * 20 + 50} XP
          </div>
        </div>
      </div>
    </div>
  )

  if (questions.length === 0) return <div>Loading...</div>

  const q = questions[current]
  const isAnswered = answered !== null
  const isCorrect = isAnswered && answered === q.correctIndex

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'grammar': return '📚 قواعد'
      case 'vocabulary': return '📖 مفردات'
      case 'situation': return '🗣️ مواقف'
      default: return '❓ سؤال'
    }
  }

  const progress = ((current) / questions.length) * 100

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header & Progress */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-white">📅 تحدّي اليوم</h1>
        <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full font-bold shadow-sm">
          {current + 1} / {questions.length}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#00b894] to-[#0984e3] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200/50 dark:border-white/5 relative overflow-hidden transition-all duration-300">
        
        {/* Type Badge */}
        <div className="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-bold mb-6 border border-blue-100 dark:border-blue-800/30">
          {getTypeIcon(q.type)}
        </div>

        {/* Question Text */}
        <p className="text-2xl sm:text-3xl font-bold mb-8 leading-relaxed text-gray-900 dark:text-white" dir="ltr">
          {q.question}
        </p>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.options.map((opt, i) => {
            const isSelected = answered === i
            const isThisCorrect = i === q.correctIndex

            let btnClass = 'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-white/10 hover:border-[#00b894] hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 text-gray-700 dark:text-gray-200'
            
            if (isAnswered) {
              if (isThisCorrect) {
                btnClass = 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold scale-[1.02] shadow-lg shadow-emerald-500/20'
              } else if (isSelected && !isThisCorrect) {
                btnClass = 'bg-red-50 dark:bg-red-900/30 border-red-400 text-red-600 dark:text-red-400 scale-[0.98]'
              } else {
                btnClass = 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-white/5 text-gray-400 dark:text-gray-500 opacity-60'
              }
            }

            return (
              <button 
                key={i} 
                disabled={isAnswered}
                onClick={() => handleAnswer(i)}
                className={`p-4 sm:p-5 rounded-2xl text-center transition-all duration-300 cursor-pointer border-2 shadow-sm ${btnClass}`} 
                dir="ltr"
              >
                <span className="text-lg">{opt}</span>
                {isAnswered && isThisCorrect && <span className="absolute top-2 right-2 text-emerald-500">✓</span>}
                {isAnswered && isSelected && !isThisCorrect && <span className="absolute top-2 right-2 text-red-500">✗</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation & Next Button */}
      {isAnswered && (
        <div className="animate-fade-in-up mt-6">
          <div className={`p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30'}`}>
            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
              {isCorrect ? '✨ إجابة صحيحة!' : '❌ إجابة خاطئة'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed" dir="rtl">
              {q.explanationAr}
            </p>
          </div>
          
          <button 
            onClick={handleNext}
            className="w-full mt-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gray-900/20 dark:shadow-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {current < questions.length - 1 ? 'السؤال التالي' : 'إنهاء التحدي'}
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
