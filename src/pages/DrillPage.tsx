import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { pruefungsFragen } from '../data/sprachbausteine'
import { playCorrectSound, playWrongSound, playTadaSound, triggerConfetti } from '../utils/gamification'

interface DrillItem {
  id: string
  category: string
  level: string
  context: string
  options: string[]
  correct: number
  explanation: string
}

const correctPhrases = [
  'أنت مذهل! إجابة صحيحة 🦉',
  'عبقري! استمر هكذا 🌟',
  'إجابة دقيقة جداً! ممتاز 💪',
  'عمل رائع! فخور بك 🎓',
  'رائع! سرعتك ممتازة اليوم 🔥'
]

const incorrectPhrases = [
  'لا بأس، تعلّم من هذا الخطأ 🦉',
  'ركز جيداً في السؤال القادم ✊',
  'أوه! خطأ بسيط. اقرأ التفسير بالأسفل 💡',
  'لا تقلق، المحاولة التالية ستكون أفضل! 📐',
  'الأخطاء تساعدك على الفهم والترسيخ! 📏'
]

export default function DrillPage() {
  const [drillsPool, setDrillsPool] = useState<DrillItem[]>([])
  const [roundDrills, setRoundDrills] = useState<DrillItem[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [mascotPhrase, setMascotPhrase] = useState('اختر الكلمة أو الحرف الصحيح لإكمال الفراغ 🦉')
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    if (Array.isArray(pruefungsFragen)) {
      setDrillsPool(pruefungsFragen as DrillItem[])
    }
  }, [])

  useEffect(() => {
    if (drillsPool.length > 0) {
      startNewGame()
    }
  }, [drillsPool])

  const startNewGame = () => {
    const shuffledPool = [...drillsPool].sort(() => Math.random() - 0.5)
    const selected = shuffledPool.slice(0, Math.min(10, shuffledPool.length))

    setRoundDrills(selected)
    setCurrentIdx(0)
    setLives(3)
    setScore(0)
    setGameOver(false)
    setGameWon(false)
    setAnswered(false)
    setSelectedAnswer(null)
    setMascotPhrase('اختر الكلمة أو الحرف المناسب لإكمال الفراغ! 🦉')
  }

  const handleAnswer = (idx: number) => {
    if (answered) return
    setSelectedAnswer(idx)
    setAnswered(true)

    const isCorrect = idx === roundDrills[currentIdx].correct

    if (isCorrect) {
      playCorrectSound()
      setScore((s) => s + 1)
      setMascotPhrase(correctPhrases[Math.floor(Math.random() * correctPhrases.length)])
    } else {
      playWrongSound()
      setMascotPhrase(incorrectPhrases[Math.floor(Math.random() * incorrectPhrases.length)])
      setLives((l) => {
        const newL = l - 1
        if (newL <= 0) {
          setTimeout(() => setGameOver(true), 2000)
        }
        return newL
      })
    }
  }

  const handleNext = () => {
    if (currentIdx < roundDrills.length - 1 && lives > 0) {
      setCurrentIdx((i) => i + 1)
      setSelectedAnswer(null)
      setAnswered(false)
      setMascotPhrase('اختر الكلمة أو الحرف المناسب لإكمال الفراغ! 🦉')
    } else {
      if (lives > 0) {
        playTadaSound()
        triggerConfetti()
      }
      setGameWon(true)
    }
  }

  const handleShare = () => {
    const shareText = `لقد أحرزت ${score} من 10 في التدريبات اللغوية التفاعلية (Grammar Drills) على B1-Syrer! اختبر معلوماتك الآن 📚`
    if (navigator.share) {
      navigator
        .share({
          title: 'تدريبات القواعد - B1-Syrer',
          text: shareText,
          url: window.location.origin + '/#/drill'
        })
        .catch((err) => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin + '/#/drill')
      alert('تم نسخ النتيجة ورابط التدريب إلى الحافظة! 🎉')
    }
  }

  if (gameOver || gameWon) {
    const won = gameWon && lives > 0
    return (
      <div className="max-w-xl mx-auto p-4 animate-fadeIn">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 text-center shadow-lg border border-gray-100 dark:border-white/5">
          <div className="text-6xl mb-4">{won ? '🎉' : '💔'}</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{won ? 'عمل رائع! لقد نجحت' : 'انتهت الفرص!'}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-6">
            لقد أجبت على <span className="font-bold text-[#00b894]">{score}</span> من أصل <span className="font-bold text-gray-800 dark:text-gray-200">{roundDrills.length}</span> أسئلة بشكل صحيح.
          </p>

          <div className="bg-[#00b894]/5 dark:bg-[#00b894]/10 border border-[#00b894]/20 rounded-2xl p-4 mb-8">
            <span className="text-sm text-amber-600 dark:text-amber-400 font-bold">🎯 لقد كسبت: {score * 10} XP</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleShare}
              className="bg-gold hover:bg-gold/90 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <span>📢 مشاركة النتيجة</span>
            </button>
            <button
              onClick={startNewGame}
              className="bg-[#00b894] hover:bg-[#094F28] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              🔄 تدريب جديد
            </button>
          </div>

          <Link
            to="/"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white text-sm font-semibold mt-6 block underline transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    )
  }

  if (roundDrills.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00b894] border-t dark:border-white/10-transparent"></div>
      </div>
    )
  }

  const q = roundDrills[currentIdx]
  const progress = (currentIdx + 1) / roundDrills.length

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-[#00b894] hover:text-[#094F28] font-bold flex items-center gap-1">
          <span>←</span> <span>الرئيسية</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="text-2xl transition-transform duration-300">
                {i < lives ? '❤️' : '🖤'}
              </span>
            ))}
          </div>
          <span className="bg-gold/10 text-amber-600 dark:text-amber-400 font-bold px-3 py-1 rounded-full text-sm">
            🏆 {score * 10} XP
          </span>
        </div>
      </div>

      {/* Mascot Speech Bubble */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 items-center mb-6 animate-pulseOnce">
        <span className="text-4xl">🦉</span>
        <div className="flex-1">
          <div className="text-xs text-gray-500 dark:text-gray-400 font-bold mb-0.5">مدرّب B1-Syrer</div>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed">{mascotPhrase}</p>
        </div>
      </div>

      {/* Drill Question Card */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
            سؤال {currentIdx + 1} من {roundDrills.length}
          </span>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-md">
              {q.level}
            </span>
            <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-bold px-2 py-0.5 rounded-md">
              {q.category}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 dark:bg-white/10 h-2.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-[#00b894] h-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-bold text-center py-6 leading-relaxed border-b border-gray-50 dark:border-white/5" dir="ltr">
          {q.context}
        </h2>

        {/* Options Grid */}
        <div className="grid gap-3 mt-6">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct
            const isSelected = selectedAnswer === i

            let btnClass =
              'w-full text-left p-4 rounded-xl font-bold border-2 transition-all flex justify-between items-center text-lg '

            if (answered) {
              if (isCorrect) {
                btnClass += 'border-[#00b894] bg-[#00b894]/10 text-[#094F28] dark:text-green-300'
              } else if (isSelected) {
                btnClass += 'border-red-500 bg-red-500/10 text-red-500 dark:text-red-300'
              } else {
                btnClass += 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5/50 dark:bg-[#1a1a2e]/50 opacity-60 text-gray-500 dark:text-gray-400'
              }
            } else {
              btnClass += 'border-gray-200 dark:border-white/5 hover:border-[#00b894] hover:bg-[#00b894]/5'
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className={btnClass}
                dir="ltr"
              >
                <span>{opt}</span>
                {answered && isCorrect && <span className="text-[#00b894] text-xl font-bold">✓</span>}
                {answered && isSelected && !isCorrect && <span className="text-red-500 text-xl font-bold">✗</span>}
              </button>
            )
          })}
        </div>

        {/* Explanation Card */}
        {answered && q.explanation && (
          <div className="mt-6 p-4 bg-gold/5 dark:bg-gold/10 border border-gold/20 rounded-xl flex gap-3 animate-fadeIn">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-1">الشرح بالعربية:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}

        {/* Next Button */}
        {answered && (
          <button
            onClick={handleNext}
            className="w-full mt-6 bg-[#00b894] hover:bg-[#094F28] text-white font-bold py-4 rounded-xl text-center transition-colors shadow-md text-lg"
          >
            {currentIdx < roundDrills.length - 1 ? 'السؤال التالي ➡️' : 'عرض النتيجة النهائية 🏆'}
          </button>
        )}
      </div>
    </div>
  )
}
