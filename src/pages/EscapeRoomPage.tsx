import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { escapeRooms } from '../data/escapeRoom'
import confetti from 'canvas-confetti'
import { useXP } from '../hooks/useXP'

export default function EscapeRoomPage() {
  const { addXP } = useXP()
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [passcode, setPasscode] = useState('')
  const [orderedWords, setOrderedWords] = useState<string[]>([])
  const [errorShake, setErrorShake] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [escaped, setEscaped] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes = 600 seconds
  const [gameOver, setGameOver] = useState(false)

  const room = escapeRooms[currentRoomIndex]

  // Play creepy/atmospheric sound or success/error sounds
  const playSound = (type: 'success' | 'error' | 'ambient' | 'unlock') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      if (type === 'success') {
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.1)
      } else if (type === 'error') {
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3)
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.3)
      } else if (type === 'unlock') {
        oscillator.type = 'square'
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.4)
      }
    } catch(e) {}
  }

  // Timer logic
  useEffect(() => {
    if (escaped || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameOver(true)
          playSound('error')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [escaped, gameOver])

  const triggerError = () => {
    playSound('error')
    setErrorShake(true)
    setTimeout(() => setErrorShake(false), 500)
  }

  const handleNextRoom = () => {
    playSound('unlock')
    if (currentRoomIndex < escapeRooms.length - 1) {
      setCurrentRoomIndex(prev => prev + 1)
      setPasscode('')
      setOrderedWords([])
      setShowHint(false)
    } else {
      // VICTORY!
      setEscaped(true)
      addXP(500) // Huge reward
      
      const duration = 4000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
      
      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }

  const handlePasscodeSubmit = () => {
    if (passcode.toLowerCase() === (room.correctAnswer as string).toLowerCase()) {
      handleNextRoom()
    } else {
      triggerError()
    }
  }

  const handleMultipleChoice = (option: string) => {
    if (option === room.correctAnswer) {
      handleNextRoom()
    } else {
      triggerError()
    }
  }

  const handleWordClick = (word: string) => {
    setOrderedWords(prev => [...prev, word])
  }

  const handleWordRemove = (index: number) => {
    setOrderedWords(prev => prev.filter((_, i) => i !== index))
  }

  const handleWordOrderSubmit = () => {
    const isCorrect = JSON.stringify(orderedWords) === JSON.stringify(room.correctAnswer)
    if (isCorrect) {
      handleNextRoom()
    } else {
      triggerError()
    }
  }

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (gameOver) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-4">
        <div className="text-8xl mb-6">💀</div>
        <h1 className="text-4xl font-black text-red-500 mb-4">انتهى الوقت!</h1>
        <p className="text-gray-400 text-lg mb-8 text-center max-w-md">لقد نفد الوقت وبقيت محتجزاً في الغرفة. حاول مرة أخرى للهروب!</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          إعادة المحاولة 🔄
        </button>
      </div>
    )
  }

  if (escaped) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-4 text-center">
        <div className="w-40 h-40 bg-emerald-500/20 rounded-full flex items-center justify-center text-7xl shadow-[0_0_100px_rgba(16,185,129,0.4)] mb-8 animate-pulse">
          🔓
        </div>
        <h1 className="text-5xl font-black text-emerald-400 mb-4 drop-shadow-lg">لقد هربت بنجاح!</h1>
        <p className="text-gray-300 text-lg mb-8 max-w-lg">تهانينا! لقد تمكنت من حل جميع الألغاز القواعدية والهروب من الغرفة قبل نفاد الوقت.</p>
        <div className="bg-emerald-900/40 border border-emerald-500/30 p-6 rounded-2xl mb-8">
          <p className="text-2xl font-black text-yellow-400">+500 XP 🏆</p>
          <p className="text-sm text-emerald-200 mt-2">مكافأة النجاة والذكاء!</p>
        </div>
        <button 
          onClick={() => window.location.href = '/app/#/'}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
        >
          العودة للرئيسية 🏠
        </button>
      </div>
    )
  }



  return (
    <div className="min-h-[85vh] bg-[#0a0a0a] rounded-[2.5rem] border border-gray-800 p-4 md:p-8 flex flex-col relative overflow-hidden shadow-2xl mt-4">
      {/* Creepy Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 blur-[100px] pointer-events-none"></div>
      
      {/* Header (Timer & Room Info) */}
      <div className="flex justify-between items-center mb-8 relative z-10 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-gray-200">{room.title}</h2>
          <p className="text-xs font-bold text-gray-500 mt-1 tracking-widest">مرحلة {currentRoomIndex + 1} من {escapeRooms.length}</p>
        </div>
        <div className={`flex items-center gap-3 font-mono text-2xl font-black px-4 py-2 rounded-xl border ${timeLeft < 60 ? 'border-red-500/50 text-red-500 bg-red-500/10 animate-pulse' : 'border-gray-700 text-gray-300 bg-gray-900'}`}>
          <span>⏱️</span>
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Story / Context Area */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentRoomIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative z-10 flex-1 flex flex-col max-w-3xl mx-auto w-full"
        >
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-6 rounded-2xl mb-8 shadow-inner">
            <p className="text-gray-300 leading-relaxed text-lg" dir="rtl">{room.story}</p>
          </div>

          <div className="bg-black/50 border border-gray-800 p-8 rounded-3xl mb-8">
            <h3 className="text-xl font-bold text-emerald-400 mb-6 text-center" dir="rtl">{room.question}</h3>

            <motion.div 
              animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}} 
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              {/* PUZZLE TYPE: PASSCODE */}
              {room.type === 'passcode' && (
                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                  <input 
                    type="text" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="أدخل الكود هنا..."
                    className="w-full bg-gray-900 border-2 border-gray-700 focus:border-emerald-500 text-white text-center text-2xl tracking-widest p-4 rounded-xl outline-none transition-colors"
                    dir="ltr"
                    onKeyDown={(e) => e.key === 'Enter' && handlePasscodeSubmit()}
                  />
                  <button 
                    onClick={handlePasscodeSubmit}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-6 py-4 rounded-xl font-bold transition-colors"
                  >
                    🔓 محاولة الفتح
                  </button>
                </div>
              )}

              {/* PUZZLE TYPE: MULTIPLE CHOICE */}
              {room.type === 'multiple-choice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {room.options?.map((opt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleMultipleChoice(opt)}
                      className="bg-gray-900 hover:bg-emerald-900/30 text-gray-300 hover:text-emerald-400 border border-gray-700 hover:border-emerald-500/50 p-4 rounded-xl font-bold transition-all text-right"
                      dir="rtl"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* PUZZLE TYPE: WORD ORDER */}
              {room.type === 'word-order' && (
                <div className="w-full space-y-6">
                  {/* Selected Words Area (The Lock) */}
                  <div className="min-h-[80px] bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl p-4 flex flex-wrap gap-2 items-center justify-center">
                    {orderedWords.length === 0 ? (
                      <span className="text-gray-600 text-sm">انقر على الكلمات بالأسفل لترتيبها هنا...</span>
                    ) : (
                      orderedWords.map((word, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleWordRemove(idx)}
                          className="bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg font-bold hover:bg-red-900/40 hover:border-red-500/30 hover:text-red-300 transition-colors"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>
                  
                  {/* Available Words Pool */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {room.words?.map((word, idx) => {
                      // Count occurrences in original vs selected to know how many to disable
                      const totalCount = room.words!.filter(w => w === word).length
                      const selectedCount = orderedWords.filter(w => w === word).length
                      // But to make it simpler, we just render them and check if we used this exact index.
                      // Let's just pass an array of objects to map easily, or disable if count is maxed.
                      const isDisabled = selectedCount >= totalCount

                      return (
                        <button 
                          key={idx}
                          disabled={isDisabled}
                          onClick={() => handleWordClick(word)}
                          className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                            isDisabled 
                              ? 'bg-gray-900 border-gray-800 text-gray-700 cursor-not-allowed opacity-50' 
                              : 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200 hover:scale-105 active:scale-95'
                          }`}
                        >
                          {word}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={handleWordOrderSubmit}
                      disabled={orderedWords.length !== room.words?.length}
                      className="bg-gray-800 disabled:bg-gray-900 disabled:text-gray-700 disabled:border-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-8 py-3 rounded-xl font-bold transition-all w-full max-w-sm"
                    >
                      🔓 تجربة التعويذة
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* HINT SYSTEM */}
          <div className="mt-auto flex justify-center">
            {showHint ? (
              <div className="bg-yellow-900/20 border border-yellow-600/30 text-yellow-500 p-4 rounded-xl w-full max-w-2xl text-center text-sm font-bold shadow-lg">
                💡 تلميح: {room.hint}
              </div>
            ) : (
              <button 
                onClick={() => setShowHint(true)}
                className="text-gray-500 hover:text-yellow-500 font-bold text-sm flex items-center gap-2 transition-colors bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800"
              >
                <span>🔍</span> أحتاج إلى تلميح
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
