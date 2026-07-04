import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Headphones, Play, Turtle, CheckCircle, XCircle, ChevronRight, HelpCircle } from 'lucide-react'
import { dictationSentences } from '../data/dictation'
import { useXP } from '../hooks/useXP'

export default function DictationPage() {
  const { addXP } = useXP()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const currentSentence = dictationSentences[currentIndex]

  const speak = (rate: number = 0.9) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // clear queue
      const utterance = new SpeechSynthesisUtterance(currentSentence.text)
      utterance.lang = 'de-DE'
      utterance.rate = rate
      window.speechSynthesis.speak(utterance)
    } else {
      alert("متصفحك لا يدعم ميزة النطق الصوتي.")
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleCheck = () => {
    if (!userInput.trim()) return

    // Clean strings for comparison: remove punctuation, lower case
    const cleanTarget = currentSentence.text.toLowerCase().replace(/[,.?!]/g, '').trim()
    const cleanInput = userInput.toLowerCase().replace(/[,.?!]/g, '').trim()

    if (cleanTarget === cleanInput) {
      setIsCorrect(true)
      addXP(15) // XP for correct dictation
    } else {
      setIsCorrect(false)
    }
    setChecked(true)
  }

  const handleNext = () => {
    if (currentIndex < dictationSentences.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setUserInput('')
      setChecked(false)
      setIsCorrect(false)
      setShowHint(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-fade-in" dir="rtl">
      
      {/* Header */}
      <div className="glass rounded-[2rem] p-8 border border-emerald-500/20 shadow-xl relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-[#00b894]/10 dark:to-[#0984e3]/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-4xl shadow-lg shrink-0 text-white">
            <Headphones size={40} />
          </div>
          <div className="text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black rounded-full uppercase tracking-wider mb-3 shadow-md animate-pulse">
              ✨ جديد
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">الإملاء الصوتي (Diktat)</h1>
            <p className="text-gray-600 dark:text-gray-300 font-bold max-w-2xl">
              استمع إلى الجملة باللغة الألمانية واكتب ما تسمعه بدقة. هذا التمرين ممتاز لتطوير الاستماع السريع والتهجئة قبل الفحص.
            </p>
          </div>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 md:p-10 border border-gray-200 dark:border-white/5 shadow-2xl relative">
        <div className="flex justify-between items-center mb-8">
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-bold">
            مستوى {currentSentence.level}
          </span>
          <span className="text-sm font-bold text-gray-500">
            {currentIndex + 1} / {dictationSentences.length}
          </span>
        </div>

        {/* Audio Controls */}
        <div className="flex justify-center gap-4 mb-10">
          <button 
            onClick={() => speak(0.9)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center border-2 border-blue-500 shadow-lg group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Play size={32} fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">سرعة عادية</span>
          </button>
          
          <button 
            onClick={() => speak(0.5)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border-2 border-emerald-500 shadow-md group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-white transition-all mt-2">
              <Turtle size={24} />
            </div>
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">بطيء جداً</span>
          </button>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={checked}
            placeholder="اكتب ما سمعته هنا..."
            className="w-full bg-gray-50 dark:bg-black/20 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-xl text-center focus:border-blue-500 outline-none transition-all resize-none h-32"
            dir="ltr"
          />

          {!checked ? (
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setShowHint(true)}
                className="text-yellow-600 dark:text-yellow-400 font-bold text-sm flex items-center gap-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <HelpCircle size={18} /> مساعدة بالترجمة
              </button>
              
              <button
                onClick={handleCheck}
                disabled={!userInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1"
              >
                تحقق 
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border-2 ${isCorrect ? 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-600' : 'bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-600'}`}
            >
              <div className="flex items-start gap-4">
                {isCorrect ? (
                  <CheckCircle className="text-green-600 dark:text-green-400 shrink-0 mt-1" size={28} />
                ) : (
                  <XCircle className="text-red-600 dark:text-red-400 shrink-0 mt-1" size={28} />
                )}
                
                <div className="flex-1 space-y-3">
                  <h3 className={`font-black text-lg ${isCorrect ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                    {isCorrect ? 'ممتاز! إملاء صحيح 100%' : 'هناك خطأ ما، انتبه للفرق:'}
                  </h3>
                  
                  {!isCorrect && (
                    <div className="bg-white/60 dark:bg-black/40 p-4 rounded-xl border border-black/10">
                      <p className="text-sm font-bold text-gray-500 mb-1">النص الصحيح:</p>
                      <p className="text-lg font-mono text-gray-900 dark:text-white" dir="ltr">{currentSentence.text}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNext}
                      className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md"
                    >
                      الجملة التالية <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Hint Overlay */}
          <AnimatePresence>
            {showHint && !checked && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-xl text-center text-yellow-800 dark:text-yellow-400 font-bold mt-4"
              >
                💡 ترجمة الجملة: "{currentSentence.translation}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
