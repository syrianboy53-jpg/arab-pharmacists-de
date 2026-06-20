import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { vocabCategories } from '../data/vocabulary'

interface Word {
  de: string
  ar: string
  example?: string
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Word[]>([])
  const [knownWords, setKnownWords] = useState<number>(0)
  const [unknownWords, setUnknownWords] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState(false)

  // Motion values for swipe
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0])
  const rotate = useTransform(x, [-150, 150], [-15, 15])
  const backgroundColor = useTransform(
    x,
    [-150, 0, 150],
    ['rgba(239, 68, 68, 0.2)', 'rgba(255, 255, 255, 0)', 'rgba(34, 197, 94, 0.2)']
  )

  useEffect(() => {
    // Flatten all B1 words for the demo (or you can filter by category)
    const allWords = vocabCategories.flatMap(c => c.words)
    // Shuffle the words
    const shuffled = [...allWords].sort(() => 0.5 - Math.random())
    setCards(shuffled.slice(0, 50)) // Load 50 words
  }, [])

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x
    if (offset > 100) {
      // Swiped right (Known)
      setKnownWords(prev => prev + 1)
      nextCard()
    } else if (offset < -100) {
      // Swiped left (Unknown)
      setUnknownWords(prev => prev + 1)
      nextCard()
    } else {
      // Return to center (do nothing)
    }
  }

  const nextCard = () => {
    setIsFlipped(false)
    setCards(prev => prev.slice(1))
    x.set(0)
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-2xl font-bold mb-4">أنجزت جميع البطاقات! 🎉</h2>
        <p className="text-gray-600 dark:text-gray-400">
          حفظت: <span className="text-green-500 font-bold">{knownWords}</span> | 
          تحتاج مراجعة: <span className="text-red-500 font-bold">{unknownWords}</span>
        </p>
        <button onClick={() => window.location.reload()} className="mt-6 bg-green hover:bg-green-dark text-white px-6 py-2 rounded-xl transition-all">
          إعادة المحاولة
        </button>
      </div>
    )
  }

  const currentCard = cards[0]

  return (
    <div className="max-w-md mx-auto h-[600px] flex flex-col pt-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">بطاقات الذاكرة الذكية</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">اسحب لليمين إذا كنت تعرف الكلمة، أو لليسار إذا كنت لا تعرفها.</p>
        <div className="flex justify-between items-center mt-4 px-8 text-sm font-bold">
          <span className="text-red-500 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">أحتاج مراجعة: {unknownWords}</span>
          <span className="text-green-500 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">حفظتها: {knownWords}</span>
        </div>
      </div>

      <div className="relative flex-1 flex justify-center items-center perspective-1000">
        <AnimatePresence>
          <motion.div
            key={currentCard.de}
            style={{ x, rotate, opacity, backgroundColor }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            onClick={() => setIsFlipped(!isFlipped)}
            className="absolute w-80 h-96 bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 cursor-grab active:cursor-grabbing flex flex-col justify-center items-center p-8 text-center"
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Front of card */}
            {!isFlipped ? (
              <>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{currentCard.de}</h2>
                <p className="text-sm text-gray-400 mt-8">(اضغط على البطاقة لقلبها)</p>
              </>
            ) : (
              /* Back of card */
              <div className="transform rotate-y-180">
                <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">{currentCard.ar}</h2>
                {currentCard.example && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-2">"{currentCard.example}"</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Swipe hints */}
            <div className="absolute bottom-6 w-full flex justify-between px-8 text-2xl opacity-30">
              <span className="text-red-500">❌</span>
              <span className="text-green-500">✅</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
