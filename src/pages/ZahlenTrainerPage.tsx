import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const levels = [
  { id: 'easy', label: 'سهل (1-20)', min: 1, max: 20, emoji: '🌱' },
  { id: 'medium', label: 'متوسط (1-100)', min: 1, max: 100, emoji: '☀️' },
  { id: 'hard', label: 'صعب (1-1000)', min: 1, max: 1000, emoji: '🔥' },
  { id: 'expert', label: 'خبير (1-10000)', min: 1, max: 10000, emoji: '💎' },
  { id: 'time', label: 'مواعيد وتواريخ', min: 0, max: 0, emoji: '🕐' },
  { id: 'price', label: 'أسعار ونقود', min: 0, max: 0, emoji: '💶' },
]

const numberWords: Record<number, string> = {
  0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf',
  6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn',
  11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn', 15: 'fünfzehn',
  16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn',
  20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig',
  60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig',
}

function numberToGerman(n: number): string {
  if (n <= 20) return numberWords[n] || ''
  if (n < 100) {
    const tens = Math.floor(n / 10) * 10
    const ones = n % 10
    if (ones === 0) return numberWords[tens]
    return `${numberWords[ones]}und${numberWords[tens]}`
  }
  if (n < 1000) {
    const hundreds = Math.floor(n / 100)
    const rest = n % 100
    const hWord = hundreds === 1 ? 'einhundert' : `${numberWords[hundreds]}hundert`
    if (rest === 0) return hWord
    return `${hWord}${numberToGerman(rest)}`
  }
  if (n < 10000) {
    const thousands = Math.floor(n / 1000)
    const rest = n % 1000
    const tWord = thousands === 1 ? 'eintausend' : `${numberWords[thousands]}tausend`
    if (rest === 0) return tWord
    return `${tWord}${numberToGerman(rest)}`
  }
  return String(n)
}

const timeQuestions = [
  { display: '08:30', answer: 'acht Uhr dreißig', answerAr: 'الثامنة والنصف' },
  { display: '14:15', answer: 'vierzehn Uhr fünfzehn', answerAr: 'الثانية عشرة والربع' },
  { display: '09:45', answer: 'neun Uhr fünfundvierzig', answerAr: 'العاشرة إلا ربع' },
  { display: '12:00', answer: 'zwölf Uhr', answerAr: 'الثانية عشرة ظهراً' },
  { display: '18:00', answer: 'achtzehn Uhr', answerAr: 'السادسة مساءً' },
  { display: '07:20', answer: 'sieben Uhr zwanzig', answerAr: 'السابعة وعشرون' },
  { display: '22:10', answer: 'zweiundzwanzig Uhr zehn', answerAr: 'العاشرة وعشر مساءً' },
  { display: '15:30', answer: 'fünfzehn Uhr dreißig', answerAr: 'الثالثة والنصف' },
  { display: '06:00', answer: 'sechs Uhr', answerAr: 'السادسة صباحاً' },
  { display: '20:45', answer: 'zwanzig Uhr fünfundvierzig', answerAr: 'التاسعة إلا ربع مساءً' },
]

const priceQuestions = [
  { display: '3,50 €', answer: 'drei Euro fünfzig', answerAr: 'ثلاثة يورو وخمسون سنت' },
  { display: '12,99 €', answer: 'zwölf Euro neunundneunzig', answerAr: 'اثنا عشر يورو و99 سنت' },
  { display: '0,75 €', answer: 'fünfundsiebzig Cent', answerAr: 'خمسة وسبعون سنت' },
  { display: '149,00 €', answer: 'einhundertneunundvierzig Euro', answerAr: 'مئة وتسعة وأربعون يورو' },
  { display: '2,30 €', answer: 'zwei Euro dreißig', answerAr: 'يوروان وثلاثون سنت' },
  { display: '45,80 €', answer: 'fünfundvierzig Euro achtzig', answerAr: 'خمسة وأربعون يورو و80 سنت' },
  { display: '7,15 €', answer: 'sieben Euro fünfzehn', answerAr: 'سبعة يورو وخمسة عشر سنت' },
  { display: '550,00 €', answer: 'fünfhundertfünfzig Euro', answerAr: 'خمسمئة وخمسون يورو' },
]

export default function ZahlenTrainerPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [, setCurrentNumber] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [answerAr, setAnswerAr] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [streak, setStreak] = useState(0)

  const generateQuestion = useCallback(() => {
    if (!selectedLevel) return
    const level = levels.find(l => l.id === selectedLevel)!

    if (level.id === 'time') {
      const q = timeQuestions[Math.floor(Math.random() * timeQuestions.length)]
      setDisplayText(q.display)
      setCorrectAnswer(q.answer)
      setAnswerAr(q.answerAr)
      const wrongOptions = timeQuestions.filter(t => t.answer !== q.answer).sort(() => Math.random() - 0.5).slice(0, 3).map(t => t.answer)
      const allOpts = [q.answer, ...wrongOptions].sort(() => Math.random() - 0.5)
      setOptions(allOpts)
    } else if (level.id === 'price') {
      const q = priceQuestions[Math.floor(Math.random() * priceQuestions.length)]
      setDisplayText(q.display)
      setCorrectAnswer(q.answer)
      setAnswerAr(q.answerAr)
      const wrongOptions = priceQuestions.filter(t => t.answer !== q.answer).sort(() => Math.random() - 0.5).slice(0, 3).map(t => t.answer)
      const allOpts = [q.answer, ...wrongOptions].sort(() => Math.random() - 0.5)
      setOptions(allOpts)
    } else {
      const num = Math.floor(Math.random() * (level.max - level.min + 1)) + level.min
      setCurrentNumber(num)
      setDisplayText(String(num))
      const correct = numberToGerman(num)
      setCorrectAnswer(correct)
      setAnswerAr('')

      const wrongNums = new Set<number>()
      while (wrongNums.size < 3) {
        const offset = Math.floor(Math.random() * 10) - 5
        const wrong = Math.max(level.min, Math.min(level.max, num + offset))
        if (wrong !== num) wrongNums.add(wrong)
      }
      const allOpts = [correct, ...[...wrongNums].map(n => numberToGerman(n))].sort(() => Math.random() - 0.5)
      setOptions(allOpts)
    }
    setSelectedAnswer(null)
  }, [selectedLevel])

  useEffect(() => {
    if (selectedLevel) generateQuestion()
  }, [selectedLevel, generateQuestion])

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setTotalAnswered(prev => prev + 1)
    if (answer === correctAnswer) {
      setScore(prev => prev + 1)
      setStreak(prev => prev + 1)
    } else {
      setStreak(0)
    }
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'de-DE'
      u.rate = 0.75
      window.speechSynthesis.speak(u)
    }
  }

  if (!selectedLevel) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
          <span>›</span>
          <span className="text-[#00b894] font-bold">مدرب الأرقام</span>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] p-8 text-center" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%)' }}>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(108,92,231,0.5), transparent 70%)' }} />
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-white mb-2">🔢 مدرب الأرقام الألمانية</h1>
            <p className="text-sm text-white/60">تعلّم نطق وقراءة الأرقام الألمانية بطريقة تفاعلية</p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white">اختر المستوى:</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className="p-6 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#00b894]/50 hover:-translate-y-1 transition-all text-center cursor-pointer group"
            >
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{level.emoji}</span>
              <h3 className="font-bold text-gray-900 dark:text-white">{level.label}</h3>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <button onClick={() => { setSelectedLevel(null); setScore(0); setTotalAnswered(0); setStreak(0) }} className="hover:text-gray-900 dark:hover:text-white transition-colors">مدرب الأرقام</button>
        <span>›</span>
        <span className="text-[#00b894] font-bold">{levels.find(l => l.id === selectedLevel)?.label}</span>
      </div>

      {/* Score Bar */}
      <div className="glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-2xl font-black text-[#00b894]">{score}</span>
            <p className="text-[10px] text-gray-500">صحيح</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-black text-gray-400">{totalAnswered}</span>
            <p className="text-[10px] text-gray-500">إجمالي</p>
          </div>
          <div className="text-center">
            <span className={`text-2xl font-black ${accuracy >= 70 ? 'text-emerald-500' : 'text-amber-500'}`}>{accuracy}%</span>
            <p className="text-[10px] text-gray-500">الدقة</p>
          </div>
        </div>
        {streak >= 3 && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            🔥 {streak} متتالية!
          </div>
        )}
        <button onClick={() => { setSelectedLevel(null); setScore(0); setTotalAnswered(0); setStreak(0) }} className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          ← رجوع
        </button>
      </div>

      {/* Question Card */}
      <div className="glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 text-center space-y-6 shadow-xl">
        <p className="text-xs text-gray-500 dark:text-gray-400">كيف تقرأ هذا بالألمانية؟</p>
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl font-black text-gray-900 dark:text-white font-sans" dir="ltr">{displayText}</span>
          <button onClick={() => speak(correctAnswer)} className="w-12 h-12 rounded-2xl bg-[#00b894]/10 border border-[#00b894]/20 flex items-center justify-center text-xl hover:bg-[#00b894]/20 transition-all cursor-pointer">🔊</button>
        </div>
        {answerAr && selectedAnswer && <p className="text-xs text-gray-400">{answerAr}</p>}

        <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          {options.map((opt, idx) => {
            const isSelected = selectedAnswer === opt
            const isCorrect = opt === correctAnswer
            let style = 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#00b894]/40 hover:bg-[#00b894]/5'
            if (selectedAnswer) {
              if (isCorrect) style = 'bg-[#00b894]/10 border-[#00b894]/40 text-[#00b894] font-bold'
              else if (isSelected) style = 'bg-red-500/10 border-red-500/40 text-red-500'
              else style = 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 opacity-50'
            }
            return (
              <button
                key={idx}
                disabled={!!selectedAnswer}
                onClick={() => handleAnswer(opt)}
                className={`p-3 rounded-xl border-2 text-sm font-sans text-left transition-all cursor-pointer ${style}`}
                dir="ltr"
              >
                {opt}
                {selectedAnswer && isCorrect && ' ✓'}
                {selectedAnswer && isSelected && !isCorrect && ' ✗'}
              </button>
            )
          })}
        </div>

        {selectedAnswer && (
          <button
            onClick={generateQuestion}
            className="bg-[#00b894] text-white font-bold text-sm px-8 py-3 rounded-2xl hover:bg-[#00a884] transition-all shadow-lg shadow-[#00b894]/20 cursor-pointer"
          >
            السؤال التالي ←
          </button>
        )}
      </div>
    </div>
  )
}
