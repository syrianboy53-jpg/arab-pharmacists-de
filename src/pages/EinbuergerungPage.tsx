import { useState, useMemo, useEffect } from 'react'
import { lebenQuestions } from '../data/leben'
import { useXP } from '../hooks/useXP'

export default function EinbuergerungPage() {
  const { addXP } = useXP()
  const [mode, setMode] = useState<'menu'|'study'|'exam'>('menu')
  
  // Study Mode States
  const [searchQuery, setSearchQuery] = useState('')
  const [showStudyAnswer, setShowStudyAnswer] = useState<Record<number, boolean>>({})

  // Exam Mode States
  const [examQuestions, setExamQuestions] = useState<typeof lebenQuestions>([])
  const [currentExamQ, setCurrentExamQ] = useState(0)
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({})
  const [examDone, setExamDone] = useState(false)
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)

  // Start Exam: pick 33 random questions
  const startExam = () => {
    const shuffled = [...lebenQuestions].sort(() => 0.5 - Math.random())
    setExamQuestions(shuffled.slice(0, 33))
    setCurrentExamQ(0)
    setExamAnswers({})
    setExamDone(false)
    setSelectedOpt(null)
    setMode('exam')
  }

  // Calculate score
  const examScore = useMemo(() => {
    let score = 0
    examQuestions.forEach(q => {
      if (examAnswers[q.id] === q.correct) score++
    })
    return score
  }, [examAnswers, examQuestions])

  const isExamPassed = examScore >= 17

  const handleExamAnswer = (optIdx: number) => {
    if (selectedOpt !== null) return
    setSelectedOpt(optIdx)
    
    setExamAnswers(prev => ({ ...prev, [examQuestions[currentExamQ].id]: optIdx }))
    
    setTimeout(() => {
      if (currentExamQ < examQuestions.length - 1) {
        setCurrentExamQ(c => c + 1)
        setSelectedOpt(null)
      } else {
        setExamDone(true)
      }
    }, 1200)
  }

  // Award XP once when exam is done and passed
  useEffect(() => {
    if (examDone && isExamPassed) {
      addXP(100) // Award 100 XP for passing the simulation
    }
  }, [examDone, isExamPassed, addXP])

  // Filter study questions
  const filteredStudyQuestions = useMemo(() => {
    if (!searchQuery.trim()) return lebenQuestions
    return lebenQuestions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.questionAr.includes(searchQuery)
    )
  }, [searchQuery])

  if (mode === 'menu') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center py-10 space-y-4">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="text-3xl font-black grad-text">اختبار التجنس الألماني</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            (Leben in Deutschland)
            <br />
            تدرّب على أسئلة اختبار الاندماج والتجنس في ألمانيا بطريقة تفاعلية وممتعة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button 
            onClick={() => setMode('study')}
            className="glass p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-right flex flex-col group"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📖</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">وضع التدرّب والدراسة</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">تصفح الـ 300 سؤال، اقرأ الترجمة العربية لكل سؤال، واحفظ الإجابات الصحيحة بدون ضغط الوقت.</p>
          </button>

          <button 
            onClick={startExam}
            className="glass p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-right flex flex-col group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b894]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">⏱️</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">محاكاة الامتحان (Simulation)</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">اختبار يضم 33 سؤالاً عشوائياً (كما في الامتحان الحقيقي). تحتاج 17 إجابة صحيحة للنجاح وكسب 100 XP.</p>
          </button>
        </div>
      </div>
    )
  }

  if (mode === 'study') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-white">📖 بنك الأسئلة</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">راجع جميع الأسئلة ({lebenQuestions.length} سؤال متاح حالياً)</p>
          </div>
          <button 
            onClick={() => setMode('menu')}
            className="px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-colors w-fit"
          >
            عودة للقائمة
          </button>
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder="ابحث عن سؤال بالعربية أو الألمانية..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl pl-10 pr-4 py-4 shadow-sm focus:outline-none focus:border-[#0984e3] focus:ring-2 focus:ring-[#0984e3]/20 text-gray-900 dark:text-white"
          />
          <span className="absolute left-4 top-4 text-gray-400">🔍</span>
        </div>

        <div className="space-y-4">
          {filteredStudyQuestions.map((q, idx) => {
            const isRevealed = showStudyAnswer[q.id]
            return (
              <div key={q.id} className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center font-black">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-lg font-bold text-gray-900 dark:text-white" dir="ltr">{q.question}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400" dir="rtl">{q.questionAr}</p>
                    
                    {!isRevealed ? (
                      <button 
                        onClick={() => setShowStudyAnswer(prev => ({...prev, [q.id]: true}))}
                        className="mt-3 text-sm text-[#0984e3] font-bold hover:underline"
                      >
                        إظهار الجواب الصحيح 👀
                      </button>
                    ) : (
                      <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl">
                        <p className="text-emerald-700 dark:text-emerald-400 font-bold" dir="ltr">✅ {q.options[q.correct]}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          {filteredStudyQuestions.length === 0 && (
            <div className="text-center py-10 text-gray-500">لا يوجد سؤال يطابق بحثك.</div>
          )}
        </div>
      </div>
    )
  }

  // Exam Mode
  if (mode === 'exam' && examDone) {
    return (
      <div className="max-w-2xl mx-auto py-10 space-y-8 animate-fade-in-up">
        <div className={`p-10 rounded-3xl text-white text-center shadow-2xl ${isExamPassed ? 'bg-gradient-to-br from-[#00b894] to-[#0984e3]' : 'bg-gradient-to-br from-red-500 to-rose-600'}`}>
          <div className="text-6xl mb-4">{isExamPassed ? '🎉' : '💔'}</div>
          <h1 className="text-4xl font-black mb-2">{isExamPassed ? 'ألف مبروك! نجحت' : 'للأسف، رسبت'}</h1>
          <p className="text-xl text-white/90 mb-6">لقد أجبت بشكل صحيح على {examScore} من أصل 33 سؤالاً</p>
          
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-sm text-white/80 font-bold mb-1">النتيجة المطلوبة للنجاح: 17</div>
            <div className="text-4xl font-black drop-shadow-md">
              {examScore} <span className="text-2xl text-white/70">/ 33</span>
            </div>
          </div>

          {isExamPassed && (
            <div className="mt-6 text-yellow-300 font-black text-xl animate-pulse">
              + 100 XP 🌟
            </div>
          )}
        </div>

        <button 
          onClick={() => setMode('menu')}
          className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95"
        >
          عودة للقائمة الرئيسية
        </button>
      </div>
    )
  }

  if (mode === 'exam') {
    const q = examQuestions[currentExamQ]
    const isAnswered = selectedOpt !== null

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black flex items-center gap-2 text-gray-900 dark:text-white">⏱️ محاكاة الامتحان</h1>
          <button onClick={() => setMode('menu')} className="text-sm text-red-500 font-bold hover:underline">إنهاء مبكر</button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 mb-6">
          <div className="bg-[#0984e3] h-2 rounded-full transition-all duration-300" style={{ width: `${(currentExamQ / 33) * 100}%` }}></div>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-white/5">
          <div className="flex justify-between items-start mb-6">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-lg text-sm font-black">
              سؤال {currentExamQ + 1} / 33
            </span>
          </div>

          <p className="text-2xl font-bold mb-8 text-gray-900 dark:text-white leading-relaxed" dir="ltr">{q.question}</p>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selectedOpt === i
              const isThisCorrect = i === q.correct

              let btnClass = 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:border-[#0984e3]'
              
              if (isAnswered) {
                if (isThisCorrect) {
                  btnClass = 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-lg shadow-emerald-500/20'
                } else if (isSelected && !isThisCorrect) {
                  btnClass = 'bg-red-50 dark:bg-red-900/30 border-red-400 text-red-600 dark:text-red-400'
                } else {
                  btnClass = 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-white/5 text-gray-400 dark:text-gray-500 opacity-50'
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleExamAnswer(i)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer border-2 ${btnClass}`}
                  dir="ltr"
                >
                  <span className="text-lg">{opt}</span>
                  {isAnswered && isThisCorrect && <span className="absolute right-6 text-emerald-500">✓</span>}
                  {isAnswered && isSelected && !isThisCorrect && <span className="absolute right-6 text-red-500">✗</span>}
                </button>
              )
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 animate-fade-in-up text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">الترجمة:</p>
              <p className="text-gray-900 dark:text-white mt-1">{q.questionAr}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}