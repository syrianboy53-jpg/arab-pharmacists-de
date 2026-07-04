import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, HeartCrack, RefreshCw } from 'lucide-react'
import { useXP } from '../hooks/useXP'
import confetti from 'canvas-confetti'

interface HangmanWord {
  de: string
  ar: string
}

const words: HangmanWord[] = [
  { de: 'BEWERBUNG', ar: 'طلب وظيفة' },
  { de: 'ERFAHRUNG', ar: 'خبرة' },
  { de: 'KRANKENHAUS', ar: 'مستشفى' },
  { de: 'WOHNSITZ', ar: 'محل الإقامة' },
  { de: 'VERTRAG', ar: 'عقد' },
  { de: 'AUSBILDUNG', ar: 'تدريب مهني' },
  { de: 'GESUNDHEIT', ar: 'صحة' },
  { de: 'MIETVERTRAG', ar: 'عقد إيجار' },
  { de: 'STEUERN', ar: 'ضرائب' },
  { de: 'VERSICHERUNG', ar: 'تأمين' },
]

const MAX_MISTAKES = 6

export default function HangmanPage() {
  const { addXP } = useXP()
  const [currentWord, setCurrentWord] = useState<HangmanWord>(words[0])
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [mistakes, setMistakes] = useState(0)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')

  // Pick random word on mount
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(randomWord)
    setGuessedLetters([])
    setMistakes(0)
    setGameStatus('playing')
  }

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return

    const newGuessed = [...guessedLetters, letter]
    setGuessedLetters(newGuessed)

    if (!currentWord.de.includes(letter)) {
      const newMistakes = mistakes + 1
      setMistakes(newMistakes)
      if (newMistakes >= MAX_MISTAKES) {
        setGameStatus('lost')
      }
    } else {
      // Check win condition
      const isWon = currentWord.de.split('').every(l => newGuessed.includes(l) || l === ' ')
      if (isWon) {
        setGameStatus('won')
        addXP(20)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }
  }

  // Generate German Keyboard
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'ß']
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-fade-in" dir="rtl">
      
      {/* Header */}
      <div className="glass rounded-[2rem] p-8 border border-purple-500/20 shadow-xl relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-lg shrink-0 text-white">
            🧗
          </div>
          <div className="text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black rounded-full uppercase tracking-wider mb-3 shadow-md animate-pulse">
              ✨ جديد
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">لعبة المشنقة (Galgenmännchen)</h1>
            <p className="text-gray-600 dark:text-gray-300 font-bold max-w-2xl">
              تخمّن أحرف الكلمة الألمانية قبل أن تفقد كل قلوبك! طريقة رائعة جداً وممتعة لمراجعة الإملاء (Rechtschreibung) لمفردات B1 الهامة.
            </p>
          </div>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 md:p-10 border border-gray-200 dark:border-white/5 shadow-2xl relative flex flex-col items-center">
        
        {/* Status Bar */}
        <div className="w-full flex justify-between items-center mb-10 border-b border-gray-200 dark:border-white/10 pb-4">
          <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
            الكلمة تعني: <span className="text-purple-600 dark:text-purple-400 text-xl font-black ml-2">{currentWord.ar}</span>
          </div>
          <div className="flex gap-1" dir="ltr">
            {[...Array(MAX_MISTAKES)].map((_, i) => (
              i < mistakes ? (
                <HeartCrack key={i} className="text-red-300 dark:text-red-900/50" fill="currentColor" size={24} />
              ) : (
                <Heart key={i} className="text-red-500 animate-pulse" fill="currentColor" size={24} />
              )
            ))}
          </div>
        </div>

        {/* Word Display */}
        <div className="flex gap-2 sm:gap-4 mb-16 flex-wrap justify-center" dir="ltr">
          {currentWord.de.split('').map((letter, index) => {
            const isRevealed = guessedLetters.includes(letter) || gameStatus === 'lost'
            const isMissed = gameStatus === 'lost' && !guessedLetters.includes(letter)
            
            return (
              <div 
                key={index}
                className={`w-10 h-14 sm:w-14 sm:h-16 border-b-4 flex items-center justify-center text-3xl sm:text-4xl font-black rounded-t-lg transition-colors ${
                  isRevealed 
                    ? isMissed ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20' : 'border-purple-600 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-300 dark:border-gray-600 text-transparent'
                }`}
              >
                {isRevealed ? letter : ''}
              </div>
            )
          })}
        </div>

        {/* Game Over Message */}
        {gameStatus !== 'playing' && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`mb-10 px-8 py-4 rounded-2xl border-2 flex flex-col items-center gap-4 ${gameStatus === 'won' ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}
          >
            <h2 className="text-2xl font-black">
              {gameStatus === 'won' ? '🎉 أحسنت! نجوت بذكاء!' : '💀 للأسف، لقد خسرت!'}
            </h2>
            <button 
              onClick={startNewGame}
              className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              <RefreshCw size={18} /> العب كلمة جديدة
            </button>
          </motion.div>
        )}

        {/* Keyboard */}
        <div className="w-full max-w-2xl flex flex-col gap-2 sm:gap-3" dir="ltr">
          {keyboardLayout.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1 sm:gap-2">
              {row.map(letter => {
                const isGuessed = guessedLetters.includes(letter)
                const isCorrect = isGuessed && currentWord.de.includes(letter)
                const isWrong = isGuessed && !currentWord.de.includes(letter)
                
                let btnClass = "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 shadow-sm"
                if (isCorrect) btnClass = "bg-green-500 border-green-600 text-white shadow-inner opacity-50 cursor-not-allowed"
                if (isWrong) btnClass = "bg-gray-300 border-gray-400 dark:bg-gray-700 dark:border-gray-600 text-gray-500 shadow-inner opacity-50 cursor-not-allowed"

                return (
                  <button
                    key={letter}
                    disabled={isGuessed || gameStatus !== 'playing'}
                    onClick={() => handleGuess(letter)}
                    className={`w-8 sm:w-12 h-12 sm:h-14 rounded-xl text-lg sm:text-xl font-black transition-all ${btnClass}`}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
