import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '../hooks/useXP'

type ExamStage = 'intro' | 'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'result'

const EXAM_DURATIONS = {
  lesen: 90 * 60,     // 90 minutes
  hoeren: 30 * 60,    // 30 minutes
  schreiben: 30 * 60, // 30 minutes
  sprechen: 15 * 60,  // 15 minutes
}

export default function TelcSimPage() {
  const { addXP } = useXP()
  const [stage, setStage] = useState<ExamStage>('intro')
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  // Timer Logic
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft === 0 && isRunning) {
        handleTimeUp()
      }
      return
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const secs = s % 60
    return `${m.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startStage = (newStage: 'lesen' | 'hoeren' | 'schreiben' | 'sprechen') => {
    setStage(newStage)
    setTimeLeft(EXAM_DURATIONS[newStage])
    setIsRunning(true)
  }

  const finishCurrentStage = () => {
    setIsRunning(false)
    
    if (stage === 'lesen') startStage('hoeren')
    else if (stage === 'hoeren') startStage('schreiben')
    else if (stage === 'schreiben') startStage('sprechen')
    else if (stage === 'sprechen') {
      setStage('result')
      addXP(500) // Huge reward for completing the full simulation
    }
  }

  const handleTimeUp = () => {
    alert('⏰ انتهى الوقت المخصص لهذا القسم! سيتم نقلك للقسم التالي.')
    finishCurrentStage()
  }

  // Confirmation before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (stage !== 'intro' && stage !== 'result') {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [stage])

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* Header and Timer Bar (Only show if in exam) */}
      <AnimatePresence>
        {stage !== 'intro' && stage !== 'result' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-4 z-50 glass p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-pulse">🔴</span>
              <div>
                <h2 className="font-black text-gray-900 dark:text-white">امتحان Telc B1 (محاكاة)</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">يُمنع استخدام القاموس أو المترجم</p>
              </div>
            </div>
            
            <div className={`text-4xl font-black font-mono tracking-wider ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
              {formatTime(timeLeft)}
            </div>
            
            <button 
              onClick={() => {
                if(window.confirm('هل أنت متأكد أنك تريد إنهاء هذا القسم قبل انتهاء الوقت؟')) {
                  finishCurrentStage()
                }
              }}
              className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-xl text-sm font-bold transition-colors"
            >
              تسليم القسم
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass p-6 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-2xl relative overflow-hidden min-h-[60vh]">
        <AnimatePresence mode="wait">
          
          {/* INTRO STAGE */}
          {stage === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center max-w-2xl mx-auto space-y-8 py-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-5xl shadow-lg transform -rotate-6">
                🎓
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">استعد للامتحان الحقيقي</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  هذه المحاكاة مصممة لتضعك تحت ضغط الوقت الفعلي لامتحان Telc B1. 
                  ستمر بالأقسام الأربعة بالتسلسل ولن تتمكن من إيقاف المؤقت.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-right">
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">📖</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Lesen & Bausteine</h3>
                  <p className="text-sm text-gray-500">90 دقيقة</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">🎧</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Hören</h3>
                  <p className="text-sm text-gray-500">30 دقيقة</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">✍️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Schreiben</h3>
                  <p className="text-sm text-gray-500">30 دقيقة</p>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="text-2xl mb-2">🗣️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Sprechen</h3>
                  <p className="text-sm text-gray-500">15 دقيقة</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/30">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  ⚠️ تنبيه: تأكد من جلوسك في مكان هادئ وتخصيص 3 ساعات تقريباً. إغلاق الصفحة سيؤدي لفقدان تقدمك.
                </p>
              </div>

              <button 
                onClick={() => startStage('lesen')}
                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                بدء الامتحان الآن 🚀
              </button>
            </motion.div>
          )}

          {/* LESEN STAGE */}
          {stage === 'lesen' && (
            <motion.div key="lesen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">📖</span> القسم الأول: القراءة واللغة
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h3>التعليمات (Hinweise):</h3>
                <p>لديك 90 دقيقة لحل جزئي القراءة (Leseverstehen) والهياكل اللغوية (Sprachbausteine).</p>
                <ul>
                  <li>Teil 1: Globalverstehen (5 Punkte)</li>
                  <li>Teil 2: Detailverstehen (25 Punkte)</li>
                  <li>Teil 3: Selektives Lesen (10 Punkte)</li>
                  <li>Teil 4: Sprachbausteine (30 Punkte)</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl mt-8 text-center border border-blue-200 dark:border-blue-800/30">
                  <p className="font-bold text-blue-800 dark:text-blue-300 mb-4">في هذه المحاكاة، قم بحل النماذج الورقية المتوفرة لديك أو استخدم نماذج القراءة في التطبيق.</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">عندما تنتهي من حله على الورق، اضغط على "تسليم القسم" في الأعلى للانتقال للقسم التالي.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* HOEREN STAGE */}
          {stage === 'hoeren' && (
            <motion.div key="hoeren" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">🎧</span> القسم الثاني: الاستماع
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h3>التعليمات (Hinweise):</h3>
                <p>لديك 30 دقيقة تقريباً لإنهاء هذا القسم.</p>
                <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl my-6 flex flex-col items-center justify-center border border-gray-200 dark:border-white/10">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl shadow-md mb-4 cursor-pointer hover:scale-110 transition-transform">
                    ▶️
                  </div>
                  <p className="text-gray-500 font-bold">ملف الصوت التجريبي للامتحان (Mock)</p>
                </div>
                <p>لا تتوقف عند السؤال الذي لا تعرف إجابته، استمر مع المقطع الصوتي.</p>
              </div>
            </motion.div>
          )}

          {/* SCHREIBEN STAGE */}
          {stage === 'schreiben' && (
            <motion.div key="schreiben" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">✍️</span> القسم الثالث: الكتابة
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none flex-shrink-0">
                <p>لديك 30 دقيقة لكتابة رسالة (E-Mail / Brief).</p>
                <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-xl border-l-4 border-emerald-500 mb-4">
                  <h4 className="mt-0 text-emerald-700 dark:text-emerald-400">Thema:</h4>
                  <p className="mb-0 text-sm">Sie haben sich für einen Deutschkurs angemeldet, aber Sie sind krank geworden. Schreiben Sie eine E-Mail an die Sprachschule. (Entschuldigung, Grund, neuer Termin, Hausaufgaben).</p>
                </div>
              </div>
              <textarea 
                className="flex-1 w-full p-4 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl resize-none focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white min-h-[200px]"
                placeholder="Schreiben Sie Ihre E-Mail hier..."
                dir="ltr"
              ></textarea>
            </motion.div>
          )}

          {/* SPRECHEN STAGE */}
          {stage === 'sprechen' && (
            <motion.div key="sprechen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-4xl">🗣️</span> القسم الرابع: المحادثة
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p>لديك 15 دقيقة مع شريكك (Partner) أو الفاحص.</p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-900/30">
                    <h4 className="text-rose-700 dark:text-rose-400 mt-0">Teil 1</h4>
                    <p className="text-sm">Kontaktaufnahme (التعارف والتحدث عن النفس وموضوع مشترك).</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30">
                    <h4 className="text-blue-700 dark:text-blue-400 mt-0">Teil 2</h4>
                    <p className="text-sm">Bildbeschreibung (وصف صورة ومناقشة الموضوع الذي تطرحه).</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                    <h4 className="text-emerald-700 dark:text-emerald-400 mt-0">Teil 3</h4>
                    <p className="text-sm">Gemeinsam etwas planen (التخطيط لحدث أو رحلة معاً).</p>
                  </div>
                </div>
                <div className="text-center mt-10">
                  <button onClick={finishCurrentStage} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold">
                    إنهاء الامتحان بالكامل 🎉
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT STAGE */}
          {stage === 'result' && (
            <motion.div 
              key="result"
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-center max-w-xl mx-auto space-y-8 py-10"
            >
              <div className="w-32 h-32 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-6xl shadow-inner border-4 border-yellow-400">
                🏆
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">امتحان بطولي!</h1>
                <p className="text-gray-500 text-lg">لقد صمدت حتى النهاية في المحاكاة.</p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 p-6 rounded-2xl shadow-lg text-white">
                <p className="text-sm font-bold opacity-80 mb-1">مكافأة الصمود</p>
                <div className="text-5xl font-black">+500 XP</div>
                <p className="text-sm mt-3">تمت إضافتها إلى رصيدك!</p>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                بما أن هذا محاكي للوقت والضغط، قم بمراجعة إجاباتك الورقية وتصحيحها من نماذج الحلول المرفقة في قسم الأساسيات.
              </p>

              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                إعادة المحاكاة
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}