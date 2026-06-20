import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { synonyms } from '../data/synonyms'

interface SynonymItem {
  id: string
  a: string
  b: string
  hintAr: string
  level: string
  example?: string
}

interface MatchingCard {
  id: string
  word: string
  pairId: string
  type: 'a' | 'b'
}

export default function SynonymsPage() {
  const [synonymsPool, setSynonymsPool] = useState<SynonymItem[]>([])
  const [gameMode, setGameMode] = useState<'menu' | 'quiz' | 'match'>('menu')

  // Quiz State
  const [quizRound, setQuizRound] = useState<SynonymItem[]>([])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizOptions, setQuizOptions] = useState<string[]>([])
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [quizSelected, setQuizSelected] = useState<string | null>(null)
  const [quizScore, setQuizScore] = useState(0)

  // Matching Game State
  const [matchingCards, setMatchingCards] = useState<MatchingCard[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([]) // Indices of selected cards
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]) // pairIds of matched cards
  const [matchScore, setMatchScore] = useState(0)
  const [matchAttempts, setMatchAttempts] = useState(0)
  const [matchWon, setMatchWon] = useState(false)

  useEffect(() => {
    if (Array.isArray(synonyms)) {
      setSynonymsPool(synonyms as SynonymItem[])
    }
  }, [])

  // Start Synonym Quiz
  const startQuiz = () => {
    const shuffled = [...synonymsPool].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 10)
    setQuizRound(selected)
    setQuizIdx(0)
    setQuizScore(0)
    setQuizAnswered(false)
    setQuizSelected(null)
    setGameMode('quiz')
    if (selected.length > 0) {
      initQuizQuestion(selected[0], shuffled)
    }
  }

  const initQuizQuestion = (item: SynonymItem, fullPool: SynonymItem[]) => {
    // Correct option is item.b
    const correct = item.b
    // Pick 3 wrong options
    const wrong = fullPool
      .filter((s) => s.id !== item.id && s.b !== item.b)
      .map((s) => s.b)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const opts = [correct, ...wrong].sort(() => Math.random() - 0.5)
    setQuizOptions(opts)
    setQuizAnswered(false)
    setQuizSelected(null)
  }

  const handleQuizAnswer = (opt: string) => {
    if (quizAnswered) return
    setQuizSelected(opt)
    setQuizAnswered(true)
    if (opt === quizRound[quizIdx].b) {
      setQuizScore((s) => s + 1)
    }
  }

  const handleQuizNext = () => {
    if (quizIdx < quizRound.length - 1) {
      const nextIdx = quizIdx + 1
      setQuizIdx(nextIdx)
      initQuizQuestion(quizRound[nextIdx], synonymsPool)
    } else {
      // Finished
      alert(`تهانينا! أنهيت كويز المترادفات بنتيجة ${quizScore} من 10 🎉`)
      setGameMode('menu')
    }
  }

  // Start Matching Game
  const startMatchingGame = () => {
    // Pick 6 random pairs
    const selectedPairs = [...synonymsPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)

    const cards: MatchingCard[] = []
    selectedPairs.forEach((pair) => {
      cards.push({ id: `${pair.id}-a`, word: pair.a, pairId: pair.id, type: 'a' })
      cards.push({ id: `${pair.id}-b`, word: pair.b, pairId: pair.id, type: 'b' })
    })

    // Shuffle the 12 cards
    setMatchingCards(cards.sort(() => Math.random() - 0.5))
    setSelectedCards([])
    setMatchedPairs([])
    setMatchScore(0)
    setMatchAttempts(0)
    setMatchWon(false)
    setGameMode('match')
  }

  const handleCardClick = (idx: number) => {
    if (selectedCards.length >= 2 || matchedPairs.includes(matchingCards[idx].pairId)) return
    if (selectedCards.includes(idx)) return // Already selected

    const newSelected = [...selectedCards, idx]
    setSelectedCards(newSelected)

    if (newSelected.length === 2) {
      setMatchAttempts((a) => a + 1)
      const first = matchingCards[newSelected[0]]
      const second = matchingCards[newSelected[1]]

      if (first.pairId === second.pairId && first.type !== second.type) {
        // Match found!
        setMatchedPairs((prev) => [...prev, first.pairId])
        setMatchScore((s) => s + 10)
        setSelectedCards([])

        if (matchedPairs.length + 1 === 6) {
          setMatchWon(true)
        }
      } else {
        // No match, flip back after 1.2s
        setTimeout(() => {
          setSelectedCards([])
        }, 1200)
      }
    }
  }

  const handleShareResult = (score: number, mode: string) => {
    const shareText = `لقد لعبت لعبة المترادفات الألمانية (${mode}) على موقع B1-Syrer وحصلت على ${score} نقطة! تعلّم المترادفات مجاناً وبطريقة تفاعلية 🎮`
    if (navigator.share) {
      navigator
        .share({
          title: 'فخاخ المترادفات - B1-Syrer',
          text: shareText,
          url: window.location.origin + '/#/synonyms'
        })
        .catch((err) => console.log('Error sharing:', err))
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.origin + '/#/synonyms')
      alert('تم نسخ النتيجة ورابط اللعبة إلى الحافظة! 🎉')
    }
  }

  if (synonymsPool.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green border-t dark:border-white/10-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          onClick={() => {
            if (gameMode !== 'menu') {
              setGameMode('menu')
              return false
            }
          }}
          className="text-green hover:text-green-dark font-bold flex items-center gap-1"
        >
          <span>←</span> <span>الرئيسية</span>
        </Link>
        <span className="text-muted text-sm font-bold">فخاخ المترادفات 🎮</span>
      </div>

      {/* MENU MODE */}
      {gameMode === 'menu' && (
        <div className="space-y-6 text-center">
          <div className="bg-gradient-to-br from-green/20 to-gold/10 p-8 rounded-3xl border border-green/10">
            <span className="text-6xl block mb-4 animate-bounce">🃏</span>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">فخاخ المترادفات الألمانية</h1>
            <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
              أكثر من 90 زوجاً من المترادفات الهامة لامتحان B1. تدرّب عليها للتعبير بشكل متنوّع وتفادي التكرار في الرسائل والحديث.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={startQuiz}
              className="bg-white dark:bg-[#1a1a2e] hover:bg-green/5 dark:bg-[#1a1a2e] p-6 rounded-2xl border-2 border-gray-100 dark:border-white/5 hover:border-green transition-all shadow-sm text-center flex flex-col items-center"
            >
              <span className="text-4xl mb-3">📝</span>
              <h3 className="font-bold text-lg mb-1">كويز المترادفات</h3>
              <p className="text-xs text-muted">اختبار اختيار من متعدد لـ 10 أسئلة عشوائية.</p>
            </button>

            <button
              onClick={startMatchingGame}
              className="bg-white dark:bg-[#1a1a2e] hover:bg-green/5 dark:bg-[#1a1a2e] p-6 rounded-2xl border-2 border-gray-100 dark:border-white/5 hover:border-green transition-all shadow-sm text-center flex flex-col items-center"
            >
              <span className="text-4xl mb-3">🧩</span>
              <h3 className="font-bold text-lg mb-1">لعبة مطابقة البطاقات</h3>
              <p className="text-xs text-muted">لعبة ذاكرة ممتعة لمطابقة 6 كلمات مع مرادفاتها.</p>
            </button>
          </div>
        </div>
      )}

      {/* QUIZ MODE */}
      {gameMode === 'quiz' && quizRound.length > 0 && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-muted font-bold">
              سؤال {quizIdx + 1} من {quizRound.length}
            </span>
            <span className="bg-gold/10 text-gold text-xs font-bold px-2 py-0.5 rounded-md">
              {quizRound[quizIdx].level}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-green h-full transition-all duration-300"
              style={{ width: `${((quizIdx + 1) / quizRound.length) * 100}%` }}
            />
          </div>

          {/* Question Word */}
          <div className="text-center py-6 border-b border-gray-50 dark:border-white/5">
            <div className="text-xs text-muted font-bold mb-1">ما هو مرادف الكلمة التالية؟</div>
            <h2 className="text-3xl font-black text-green" dir="ltr">
              {quizRound[quizIdx].a}
            </h2>
            <div className="text-xs text-muted mt-2">({quizRound[quizIdx].hintAr})</div>
          </div>

          {/* Options */}
          <div className="grid gap-3 mt-6">
            {quizOptions.map((opt, i) => {
              const isCorrect = opt === quizRound[quizIdx].b
              const isSelected = quizSelected === opt

              let btnClass = 'w-full p-4 rounded-xl font-bold border-2 text-center text-lg transition-all '

              if (quizAnswered) {
                if (isCorrect) {
                  btnClass += 'border-green bg-green/10 text-green-dark dark:text-green-300'
                } else if (isSelected) {
                  btnClass += 'border-red bg-red/10 text-red dark:text-red-300'
                } else {
                  btnClass += 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5/50 dark:bg-[#1a1a2e]/50 opacity-60 text-muted'
                }
              } else {
                btnClass += 'border-gray-200 dark:border-white/5 hover:border-green hover:bg-green/5 text-gray-900 dark:text-white'
              }

              return (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(opt)}
                  disabled={quizAnswered}
                  className={btnClass}
                  dir="ltr"
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Explanation Notes */}
          {quizAnswered && (
            <div className="mt-6 p-4 bg-gold/5 dark:bg-gold/10 border border-gold/20 rounded-xl animate-fadeIn">
              <div className="text-sm font-semibold mb-2">
                مرادف <span className="text-green font-bold" dir="ltr">{quizRound[quizIdx].a}</span> هو{' '}
                <span className="text-green font-bold" dir="ltr">{quizRound[quizIdx].b}</span>.
              </div>
              {quizRound[quizIdx].example && (
                <p className="text-xs text-muted font-mono leading-relaxed" dir="ltr">
                  مثال: {quizRound[quizIdx].example}
                </p>
              )}
            </div>
          )}

          {/* Next Button */}
          {quizAnswered && (
            <button
              onClick={handleQuizNext}
              className="w-full mt-6 bg-green hover:bg-green-dark text-white font-bold py-4 rounded-xl transition-colors"
            >
              {quizIdx < quizRound.length - 1 ? 'السؤال التالي ➡️' : 'إنهاء وعرض النتيجة 🏆'}
            </button>
          )}
        </div>
      )}

      {/* MATCHING MODE */}
      {gameMode === 'match' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-[#1a1a2e] p-4 rounded-xl border border-gray-100 dark:border-white/5">
            <span className="text-sm font-bold text-muted">المحاولات: {matchAttempts}</span>
            <span className="bg-gold/10 text-gold font-bold px-3 py-1 rounded-full text-xs">
              🏆 {matchScore} XP
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-3">
            {matchingCards.map((card, idx) => {
              const isSelected = selectedCards.includes(idx)
              const isMatched = matchedPairs.includes(card.pairId)

              let cardClass =
                'h-24 rounded-2xl flex items-center justify-center text-center p-2 font-bold transition-all duration-300 border-2 text-sm md:text-base '

              if (isMatched) {
                cardClass += 'bg-green/10 border-green text-green cursor-default scale-95 opacity-80'
              } else if (isSelected) {
                cardClass += 'bg-gold/10 border-gold text-gold scale-105 shadow-md'
              } else {
                cardClass +=
                  'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-white/5 hover:border-gold hover:shadow-sm'
              }

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={cardClass}
                  dir="ltr"
                >
                  {card.word}
                </button>
              )
            })}
          </div>

          {/* Win Dialog */}
          {matchWon && (
            <div className="bg-white dark:bg-[#1a1a2e] border-2 border-green/30 rounded-3xl p-6 text-center shadow-lg animate-fadeIn">
              <span className="text-5xl block mb-2">🎉</span>
              <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-200">فوز رائع!</h2>
              <p className="text-muted text-xs mb-4">لقد طابقت كل الكلمات بنجاح في {matchAttempts} محاولة.</p>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleShareResult(matchScore, 'مطابقة البطاقات')}
                  className="bg-gold hover:bg-gold/90 text-gray-900 dark:text-white font-bold px-4 py-2 rounded-full text-xs transition-colors"
                >
                  📢 مشاركة
                </button>
                <button
                  onClick={startMatchingGame}
                  className="bg-green hover:bg-green-dark text-white font-bold px-4 py-2 rounded-full text-xs transition-colors"
                >
                  🔄 لعب مجدداً
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
