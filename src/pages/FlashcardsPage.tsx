import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { vocabCategories } from '../data/vocabulary'
import { useXP } from '../hooks/useXP'

interface Word {
  de: string
  ar: string
  example?: string
}

export default function FlashcardsPage() {
  const { addXP } = useXP()
  const [cards, setCards] = useState<Word[]>([])
  const [knownWords, setKnownWords] = useState<number>(0)
  const [unknownWords, setUnknownWords] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const synthRef = useRef(window.speechSynthesis)

  // Motion values for swipe
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0])
  const rotateZ = useTransform(x, [-150, 150], [-15, 15])
  const backgroundColor = useTransform(
    x,
    [-150, 0, 150],
    ['rgba(239, 68, 68, 0.2)', 'rgba(255, 255, 255, 0)', 'rgba(34, 197, 94, 0.2)']
  )

  useEffect(() => {
    const allWords = vocabCategories.flatMap(c => c.words)
    const shuffled = [...allWords].sort(() => 0.5 - Math.random())
    setCards(shuffled.slice(0, 50)) // Load 50 words
    return () => { synthRef.current.cancel() }
  }, [])

  const speakWord = useCallback((text: string) => {
    const synth = synthRef.current
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    synth.speak(utterance)
  }, [])

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    if (!isFlipped && cards.length > 0) {
      speakWord(cards[0].de)
    }
  }

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x
    if (offset > 100) {
      // Swiped right (Known)
      setKnownWords(prev => prev + 1)
      addXP(10) // Reward for learning a word!
      nextCard()
    } else if (offset < -100) {
      // Swiped left (Unknown)
      setUnknownWords(prev => prev + 1)
      nextCard()
    } else {
      // Return to center
    }
  }

  const nextCard = () => {
    setIsFlipped(false)
    setCards(prev => prev.slice(1))
    x.set(0)
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
        <div className="text-8xl">🎉</div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">أنجزت جميع البطاقات!</h2>
        <div className="bg-white dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm space-y-2">
          <p className="text-lg">حفظت بامتياز: <span className="text-green-500 font-black">{knownWords}</span> كلمة</p>
          <p className="text-lg">كلمات للمراجعة: <span className="text-red-500 font-black">{unknownWords}</span> كلمة</p>
          <p className="text-emerald-500 font-bold mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
            مكاسب اليوم: +{knownWords * 10} XP 🏆
          </p>
        </div>
        <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-[#00b894] to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1">
          إعادة التدريب
        </button>
      </div>
    )
  }

  const currentCard = cards[0]

  return (
    <div className="max-w-md mx-auto min-h-[80vh] flex flex-col pt-8 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">البطاقات الذكية 🗂️</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">اسحب يميناً ✅ إذا حفظتها، ويساراً ❌ إذا أردت مراجعتها.</p>
        <div className="flex justify-between items-center mt-6 px-4">
          <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl text-red-600 dark:text-red-400 font-bold text-sm">
            ❌ للمراجعة: {unknownWords}
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl text-green-600 dark:text-green-400 font-bold text-sm flex items-center gap-2">
            ✅ حفظتها: {knownWords}
          </div>
        </div>
      </div>

      <div className="relative flex-1 flex justify-center items-center perspective-1000">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentCard.de}
            style={{ x, rotateZ, backgroundColor }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            onClick={handleCardClick}
            className="absolute w-full max-w-[320px] aspect-[3/4] cursor-grab active:cursor-grabbing preserve-3d"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotateY: isFlipped ? 180 : 0
            }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Front of card (German) */}
            <div 
              className="absolute inset-0 backface-hidden bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-center items-center p-8 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 drop-shadow-sm">{currentCard.de}</h2>
              <div className="mt-8 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-full text-xs text-gray-500 flex items-center gap-2 font-bold">
                <span>👆</span> انقر لقلب البطاقة وسماع النطق
              </div>
            </div>

            {/* Back of card (Arabic & Example) */}
            <div 
              className="absolute inset-0 backface-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl shadow-2xl border border-emerald-100 dark:border-emerald-500/20 flex flex-col justify-center items-center p-8 text-center"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <h2 className="text-4xl font-black text-emerald-700 dark:text-emerald-400 mb-6">{currentCard.ar}</h2>
              
              {currentCard.example && (
                <div className="bg-white dark:bg-black/20 p-4 rounded-xl shadow-inner w-full">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200" dir="ltr">{currentCard.example}</p>
                </div>
              )}
              
              <div className="absolute bottom-6 flex justify-between w-full px-10 text-xl font-bold opacity-40">
                <span className="text-red-500">سحب 👈</span>
                <span className="text-green-500">👉 سحب</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
