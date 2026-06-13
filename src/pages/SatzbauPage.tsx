import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { satzbau, commonMistakes } from '../data/grammar'
import { playCorrectSound, playWrongSound, playTadaSound, triggerConfetti } from '../utils/gamification'

interface SentenceItem {
  right: string
  ar: string
  explain: string
}

const correctPhrases = [
  'مذهل! عمل رائع 🦉',
  'أنت بطل! إجابة صحيحة 🌟',
  'ممتاز! استمر هكذا 💪',
  'عبقري! إجابة دقيقة 🎓',
  'رائع جداً! أداء متقن 🔥'
]

const incorrectPhrases = [
  'لا بأس، تعلّم من الأخطاء 🦉',
  'لا تستسلم، حاول التركيز أكثر ✊',
  'خطأ بسيط، ستقوم بها في المرة القادمة! 💡',
  'أوه! انتبه لترتيب الأفعال (موقع 2) 📏',
  'ابذل جهدك، المحاولة القادمة أفضل! 💡'
]

export default function SatzbauPage() {
  const [sentencesPool, setSentencesPool] = useState<SentenceItem[]>([])
  const [roundSentences, setRoundSentences] = useState<SentenceItem[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [shuffledWords, setShuffledWords] = useState<string[]>([])
  const [userWords, setUserWords] = useState<string[]>([])
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [mascotPhrase, setMascotPhrase] = useState('رتب الكلمات لتصيغ الجملة الألمانية بشكل صحيح! 🦉')
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  // Initialize pool from satzbau and commonMistakes datasets
  useEffect(() => {
    const pool: SentenceItem[] = []

    // 1. From satzbau
    if (Array.isArray(satzbau)) {
      satzbau.forEach((item: any) => {
        if (item.tokens && item.tokens.length > 0) {
          pool.push({
            right: item.tokens.join(' '),
            ar: item.ar || '',
            explain: item.tipAr || ''
          })
        }
      })
    }

    // 2. From commonMistakes
    if (Array.isArray(commonMistakes)) {
      commonMistakes.forEach((mistake: any) => {
        if (Array.isArray(mistake.examples)) {
          mistake.examples.forEach((ex: any) => {
            if (ex.right && ex.ar) {
              pool.push({
                right: ex.right,
                ar: ex.ar,
                explain: mistake.titleAr || ''
              })
            }
          })
        }
      })
    }

    setSentencesPool(pool)
  }, [])

  // Start new game once pool is ready
  useEffect(() => {
    if (sentencesPool.length > 0) {
      startNewGame()
    }
  }, [sentencesPool])

  const startNewGame = () => {
    // Select 10 random sentences
    const shuffledPool = [...sentencesPool].sort(() => Math.random() - 0.5)
    const selected = shuffledPool.slice(0, Math.min(10, shuffledPool.length))

    setRoundSentences(selected)
    setCurrentIdx(0)
    setLives(3)
    setScore(0)
    setGameOver(false)
    setGameWon(false)
    setAnswered(false)
    setIsCorrect(null)
    setMascotPhrase('رتب الكلمات لتصيغ الجملة الألمانية بشكل صحيح! 🦉')

    if (selected.length > 0) {
      initRound(selected[0])
    }
  }

  const initRound = (item: SentenceItem) => {
    // Split into tokens
    const words = item.right.split(/\s+/).filter((w) => w.length > 0)
    // Shuffle words
    const shuffled = [...words].sort(() => Math.random() - 0.5)

    // Ensure shuffled is actually different from the correct order (if length > 1)
    if (words.length > 1 && shuffled.join(' ') === words.join(' ')) {
      shuffled.reverse()
    }

    setShuffledWords(shuffled)
    setUserWords([])
    setAnswered(false)
    setIsCorrect(null)
  }

  const selectWord = (word: string, index: number) => {
    if (answered) return
    setUserWords((prev) => [...prev, word])
    setShuffledWords((prev) => prev.filter((_, idx) => idx !== index))
  }

  const deselectWord = (word: string, index: number) => {
    if (answered) return
    setShuffledWords((prev) => [...prev, word])
    setUserWords((prev) => prev.filter((_, idx) => idx !== index))
  }

  const checkAnswer = () => {
    const current = roundSentences[currentIdx]
    const userSentence = userWords.join(' ').trim().toLowerCase().replace(/[.,!?;:]/g, '')
    const rightSentence = current.right.trim().toLowerCase().replace(/[.,!?;:]/g, '')

    const correct = userSentence === rightSentence
    setIsCorrect(correct)
    setAnswered(true)

    if (correct) {
      playCorrectSound()
      setScore((s) => s + 1)
      const phrase = correctPhrases[Math.floor(Math.random() * correctPhrases.length)]
      setMascotPhrase(phrase)
    } else {
      playWrongSound()
      const phrase = incorrectPhrases[Math.floor(Math.random() * incorrectPhrases.length)]
      setMascotPhrase(phrase)
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
    if (currentIdx < roundSentences.length - 1 && lives > 0) {
      const nextIdx = currentIdx + 1
      setCurrentIdx(nextIdx)
      setAnswered(false)
      setIsCorrect(null)
      setMascotPhrase('رتب الكلمات لتصيغ الجملة التالية! 🦉')
      initRound(roundSentences[nextIdx])
    } else {
      if (lives > 0) {
        playTadaSound()
        triggerConfetti()
      }
      setGameWon(true)
    }
  }

  const handleShare = () => {
    const shareText = `لقد حصلت على ${score} من 10 في لعبة تركيب الجمل الألمانية Satzbau! جرّب اللعبة التفاعلية الآن 🦉`
    if (navigator.share) {
      navigator
        .share({
          title: 'لعبة تركيب الجمل - B1-Syrer',
          text: shareText,
          url: window.location.origin + '/#/satzbau'
        })
        .catch((err) => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin + '/#/satzbau')
      alert('تم نسخ النتيجة ورابط اللعبة إلى الحافظة! 🎉')
    }
  }

  if (gameOver || gameWon) {
    const won = gameWon && lives > 0
    return (
      <div className="max-w-xl mx-auto p-4 animate-fadeIn">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-6xl mb-4">{won ? '🎉' : '💔'}</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{won ? 'أحسنت! فوز ساحق' : 'انتهت المحاولات!'}</h1>
          <p className="text-muted text-sm md:text-base mb-6">
            لقد أحرزت <span className="font-bold text-green">{score}</span> من أصل <span className="font-bold">{roundSentences.length}</span> جمل بشكل صحيح.
          </p>

          <div className="bg-green/5 dark:bg-green/10 border border-green/20 rounded-2xl p-4 mb-8">
            <span className="text-sm text-gold font-bold">🎯 مجموع النقاط: {score * 10} XP</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleShare}
              className="bg-gold hover:bg-gold/90 text-white font-bold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <span>📢 مشاركة النتيجة</span>
            </button>
            <button
              onClick={startNewGame}
              className="bg-green hover:bg-green-dark text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              🔄 لعب مجدداً
            </button>
          </div>

          <Link
            to="/"
            className="text-muted hover:text-ink text-sm font-semibold mt-6 block underline transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    )
  }

  if (roundSentences.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green border-t-transparent"></div>
      </div>
    )
  }

  const current = roundSentences[currentIdx]

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-green hover:text-green-dark font-bold flex items-center gap-1">
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
          <span className="bg-gold/10 text-gold font-bold px-3 py-1 rounded-full text-sm">
            🏆 {score * 10} XP
          </span>
        </div>
      </div>

      {/* Mascot Speech Bubble */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 items-center mb-6 animate-pulseOnce">
        <span className="text-4xl">🦉</span>
        <div className="flex-1">
          <div className="text-xs text-muted font-bold mb-0.5">مدرّب B1-Syrer</div>
          <p className="text-sm font-bold text-ink-soft dark:text-gray-300 leading-relaxed">{mascotPhrase}</p>
        </div>
      </div>

      {/* Target Arabic Meaning */}
      <div className="bg-green/5 dark:bg-green/10 border-2 border-green/30 rounded-2xl p-5 mb-6 text-center">
        <div className="text-xs text-muted font-bold mb-1">ترجم الجملة التالية:</div>
        <p className="text-xl font-bold text-green-dark dark:text-green-300 leading-relaxed">{current.ar}</p>
      </div>

      {/* User Construction Area */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-[100px] mb-6 flex flex-wrap gap-2 items-center justify-center">
        {userWords.map((word, i) => (
          <button
            key={i}
            onClick={() => deselectWord(word, i)}
            disabled={answered}
            className="bg-green text-white hover:bg-green-dark font-bold px-4 py-2 rounded-xl text-lg transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            {word}
          </button>
        ))}
        {userWords.length === 0 && (
          <span className="text-gray-400 dark:text-gray-600 text-sm">اضغط على الكلمات بالأسفل لترتيبها</span>
        )}
      </div>

      {/* Scrambled Word Bubbles Shelf */}
      <div className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-wrap gap-2 justify-center mb-6 min-h-[80px]">
        {shuffledWords.map((word, i) => (
          <button
            key={i}
            onClick={() => selectWord(word, i)}
            disabled={answered}
            className="bg-white dark:bg-gray-700 text-ink dark:text-white border-2 border-gray-200 dark:border-gray-600 hover:border-green hover:bg-green/5 font-bold px-4 py-2 rounded-xl text-lg transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Tips and Explanations */}
      {answered && (
        <div className={`p-5 rounded-2xl border mb-6 animate-fadeIn ${isCorrect ? 'bg-green/5 border-green/20' : 'bg-red/5 border-red/20'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{isCorrect ? '🎉' : '❌'}</span>
            <h4 className="font-bold text-lg">{isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة!'}</h4>
          </div>
          {!isCorrect && (
            <p className="text-sm font-semibold mb-3 leading-relaxed" dir="ltr">
              الجملة الصحيحة: <span className="text-green font-bold text-base">{current.right}</span>
            </p>
          )}
          {current.explain && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-muted font-bold block mb-1">نصيحة نحوية:</span>
              <p className="text-sm text-ink-soft dark:text-gray-300 leading-relaxed">{current.explain}</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!answered ? (
          <button
            onClick={checkAnswer}
            disabled={userWords.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-center transition-colors shadow-md text-lg ${
              userWords.length === 0
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-green hover:bg-green-dark text-white'
            }`}
          >
            ✅ تحقق من الإجابة
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-green hover:bg-green-dark text-white font-bold py-4 rounded-xl text-center transition-colors shadow-md text-lg"
          >
            {currentIdx < roundSentences.length - 1 ? 'الجملة التالية ➡️' : 'عرض النتيجة النهائية 🏆'}
          </button>
        )}
      </div>
    </div>
  )
}
