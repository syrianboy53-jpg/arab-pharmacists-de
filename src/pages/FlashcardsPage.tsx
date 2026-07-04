import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { vocabCategories } from '../data/vocabulary'
import { useXP } from '../hooks/useXP'
import confetti from 'canvas-confetti'

interface Word {
  de: string
  ar: string
  example?: string
  level?: string
}

export default function FlashcardsPage() {
  const { addXP } = useXP()
  const [cards, setCards] = useState<Word[]>([])
  const [totalCards, setTotalCards] = useState(0)
  const [knownWords, setKnownWords] = useState<number>(0)
  const [unknownWords, setUnknownWords] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const synthRef = useRef(window.speechSynthesis)

  // Motion values for swipe
  const x = useMotionValue(0)
  const rotateZ = useTransform(x, [-200, 200], [-15, 15])
  const backgroundColor = useTransform(
    x,
    [-200, 0, 200],
    ['rgba(239, 68, 68, 0.2)', 'rgba(255, 255, 255, 0)', 'rgba(34, 197, 94, 0.2)']
  )
  
  // Opacity transforms for swipe indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [0, -100], [0, 1])

  useEffect(() => {
    return () => { synthRef.current.cancel() }
  }, [])

  const startSession = (level: string) => {
    const allWords: Word[] = []
    vocabCategories.forEach(c => {
      // Extract level from ID (e.g. "a1-begruessung" -> "A1")
      const catLevel = c.id.split('-')[0].toUpperCase()
      c.words.forEach(w => {
        allWords.push({ ...w, level: catLevel })
      })
    })

    let filtered = allWords
    if (level !== 'ALL') {
      filtered = allWords.filter(w => w.level === level)
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 30) // 30 cards per session
    setCards(selected)
    setTotalCards(selected.length)
    setKnownWords(0)
    setUnknownWords(0)
    setSelectedLevel(level)
  }

  const speakWord = useCallback((text: string) => {
    const synth = synthRef.current
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    synth.speak(utterance)
  }, [])

  const playSound = (type: 'success' | 'error') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      if (type === 'success') {
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      } else {
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      }
      
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch(e) {}
  }

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    if (!isFlipped && cards.length > 0) {
      speakWord(cards[0].de)
    }
  }

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > 100 || velocity > 500) {
      // Swiped right (Known)
      playSound('success')
      setKnownWords(prev => prev + 1)
      addXP(10)
      nextCard()
    } else if (offset < -100 || velocity < -500) {
      // Swiped left (Unknown)
      playSound('error')
      setUnknownWords(prev => prev + 1)
      nextCard()
    } else {
      // Return to center
    }
  }

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      playSound('success')
      setKnownWords(prev => prev + 1)
      addXP(10)
    } else {
      playSound('error')
      setUnknownWords(prev => prev + 1)
    }
    nextCard()
  }

  const nextCard = () => {
    setIsFlipped(false)
    setCards(prev => {
      const newCards = prev.slice(1)
      if (newCards.length === 0) {
        // Trigger confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00b894', '#0984e3', '#fdcb6e']
        })
      }
      return newCards
    })
    x.set(0)
  }

  // Level Selection Screen
  if (!selectedLevel) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0984e3] to-[#00b894] rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-xl shadow-[#00b894]/30 mb-6 rotate-12">🗂️</div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">البطاقات الذكية <span className="text-[#0984e3]">2.0</span></h1>
          <p className="text-lg text-gray-500 font-bold max-w-lg mx-auto">اختر مستواك وابدأ الحفظ السريع! اسحب البطاقة لليمين إذا كنت تعرف الكلمة، ولليسار إذا كنت تحتاج لمراجعتها.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-8">
          {['A1', 'A2', 'B1', 'B2'].map(lvl => (
            <button
              key={lvl}
              onClick={() => startSession(lvl)}
              className="glass p-6 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-[#0984e3] hover:shadow-xl hover:shadow-[#0984e3]/20 transition-all group flex flex-col items-center gap-3 bg-white/50 dark:bg-[#1a1a2e]/50"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-2xl font-black text-gray-800 dark:text-white group-hover:bg-[#0984e3] group-hover:text-white transition-colors">{lvl}</div>
              <span className="font-bold text-gray-600 dark:text-gray-400 group-hover:text-[#0984e3]">ابدأ الآن</span>
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => startSession('ALL')}
          className="mt-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg"
        >
          🔀 تشكيلة من كل المستويات
        </button>
      </div>
    )
  }

  // Completion Screen
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
        <div className="w-32 h-32 bg-gradient-to-br from-[#00b894] to-emerald-600 rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-emerald-500/30 mb-4 animate-bounce">🏆</div>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white">أنجزت الجلسة بنجاح!</h2>
        <div className="bg-white/80 dark:bg-[#1a1a2e]/80 backdrop-blur-md p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-xl space-y-4 w-full max-w-md">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-gray-500 font-bold">حفظت بامتياز</span>
            <span className="text-emerald-500 font-black text-2xl bg-emerald-500/10 px-4 py-1 rounded-xl">{knownWords}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/5">
            <span className="text-gray-500 font-bold">كلمات للمراجعة</span>
            <span className="text-red-500 font-black text-2xl bg-red-500/10 px-4 py-1 rounded-xl">{unknownWords}</span>
          </div>
          <div className="pt-2">
            <p className="text-[#0984e3] font-bold flex items-center justify-center gap-2 text-lg">
              <span>⚡</span> مكاسب اليوم: +{knownWords * 10} XP
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedLevel(null)} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-bold shadow-xl transition-transform hover:scale-105 mt-4">
          العودة للقائمة الرئيسية
        </button>
      </div>
    )
  }

  const currentCard = cards[0]
  const progress = ((totalCards - cards.length) / totalCards) * 100

  return (
    <div className="max-w-md mx-auto min-h-[80vh] flex flex-col pt-6 pb-12 px-4 relative overflow-hidden">
      
      {/* Header & Progress */}
      <div className="text-center mb-6 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setSelectedLevel(null)} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            ❌
          </button>
          <div className="bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full font-bold text-sm text-gray-500 dark:text-gray-400">
            البطاقة {totalCards - cards.length + 1} من {totalCards}
          </div>
          <div className="w-10 h-10 rounded-full bg-[#0984e3]/10 text-[#0984e3] flex items-center justify-center font-black">
            {selectedLevel}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#0984e3] to-[#00b894]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-lg">
            <span>❌</span> {unknownWords}
          </div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg">
            {knownWords} <span>✅</span>
          </div>
        </div>
      </div>

      {/* Cards Area */}
      <div className="relative flex-1 flex justify-center items-center perspective-1000 z-10 mt-4 mb-8">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentCard.de}
            style={{ x, rotateZ, backgroundColor }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            onClick={handleCardClick}
            className="absolute w-full max-w-[340px] aspect-[3/4] cursor-grab active:cursor-grabbing preserve-3d"
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
              className="absolute inset-0 backface-hidden bg-white dark:bg-[#1a1a2e] rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-center items-center p-8 text-center overflow-hidden group"
            >
              {/* Swipe Indicators */}
              <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 right-8 border-4 border-emerald-500 text-emerald-500 font-black text-2xl px-4 py-1 rounded-xl rotate-12 bg-white/80 dark:bg-black/50 backdrop-blur-sm z-20">حفظت</motion.div>
              <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 left-8 border-4 border-red-500 text-red-500 font-black text-2xl px-4 py-1 rounded-xl -rotate-12 bg-white/80 dark:bg-black/50 backdrop-blur-sm z-20">مراجعة</motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-white/5 pointer-events-none"></div>
              
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 drop-shadow-sm z-10 leading-tight">{currentCard.de}</h2>
              
              <div className="mt-auto px-5 py-2.5 bg-gray-100 dark:bg-white/5 rounded-2xl text-sm text-gray-500 flex items-center gap-2 font-bold z-10 group-hover:bg-[#0984e3]/10 group-hover:text-[#0984e3] transition-colors">
                <span>🔄</span> انقر لقلب البطاقة وسماع النطق
              </div>
            </div>

            {/* Back of card (Arabic & Example) */}
            <div 
              className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#0984e3] to-[#00b894] rounded-[2.5rem] shadow-2xl flex flex-col justify-center items-center p-8 text-center"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <h2 className="text-4xl font-black text-white mb-8 drop-shadow-md">{currentCard.ar}</h2>
              
              {currentCard.example && (
                <div className="bg-black/20 p-5 rounded-2xl shadow-inner w-full backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-bold text-white/90 leading-relaxed" dir="ltr">{currentCard.example}</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Action Buttons (For mobile users who don't want to drag) */}
      <div className="flex justify-center gap-6 mt-auto relative z-10">
        <button 
          onClick={() => handleButtonSwipe('left')}
          className="w-16 h-16 rounded-full bg-white dark:bg-[#1a1a2e] border-2 border-red-100 dark:border-red-500/20 text-red-500 flex items-center justify-center text-3xl shadow-xl hover:bg-red-50 dark:hover:bg-red-500/10 hover:scale-110 transition-all"
        >
          ❌
        </button>
        <button 
          onClick={handleCardClick}
          className="w-16 h-16 rounded-full bg-white dark:bg-[#1a1a2e] border-2 border-[#0984e3]/20 text-[#0984e3] flex items-center justify-center text-2xl shadow-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:scale-110 transition-all"
        >
          🔄
        </button>
        <button 
          onClick={() => handleButtonSwipe('right')}
          className="w-16 h-16 rounded-full bg-white dark:bg-[#1a1a2e] border-2 border-emerald-100 dark:border-emerald-500/20 text-emerald-500 flex items-center justify-center text-3xl shadow-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:scale-110 transition-all"
        >
          💚
        </button>
      </div>
    </div>
  )
}
