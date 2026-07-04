import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '../hooks/useXP'

const QUESTIONS = [
  { q: 'ما معنى "die Arbeit"؟', a: 'العمل', o: ['البيت', 'العمل', 'المدرسة', 'الطريق'] },
  { q: '___ Tisch (der/die/das)', a: 'der', o: ['der', 'die', 'das', 'ein'] },
  { q: 'Ich ___ (gehen) zur Schule.', a: 'gehe', o: ['gehe', 'gehst', 'geht', 'gehen'] },
  { q: 'ما معنى "der Bahnhof"؟', a: 'المحطة', o: ['السوق', 'المطار', 'المحطة', 'الملعب'] },
  { q: '___ Kind (der/die/das)', a: 'das', o: ['der', 'die', 'das', 'ein'] },
  { q: 'Er ___ (haben) ein Auto.', a: 'hat', o: ['habe', 'hast', 'hat', 'haben'] },
  { q: 'ما معنى "die Gesundheit"؟', a: 'الصحة', o: ['السعادة', 'الصحة', 'القوة', 'الحرية'] },
  { q: '___ Schule (der/die/das)', a: 'die', o: ['der', 'die', 'das', 'eine'] },
  { q: 'Ich fahre ___ Berlin.', a: 'nach', o: ['nach', 'zu', 'in', 'an'] },
  { q: 'ما معنى "der Urlaub"؟', a: 'الإجازة', o: ['الدراسة', 'العمل', 'الإجازة', 'المرض'] },
  { q: 'Wir ___ (sein) müde.', a: 'sind', o: ['bin', 'bist', 'ist', 'sind'] },
  { q: 'مرادف "schnell"؟', a: 'rasch', o: ['langsam', 'rasch', 'leise', 'dunkel'] },
  { q: '___ Wohnung (der/die/das)', a: 'die', o: ['der', 'die', 'das', 'ein'] },
  { q: 'ما معنى "die Wohnung"؟', a: 'الشقة', o: ['المدينة', 'الشقة', 'الحديقة', 'الشارع'] },
  { q: 'Das Buch liegt ___ dem Tisch.', a: 'auf', o: ['auf', 'unter', 'neben', 'über'] },
  { q: 'مرادف "groß"؟', a: 'riesig', o: ['klein', 'riesig', 'dünn', 'kurz'] },
  { q: 'Ich bin ___ Hause.', a: 'zu', o: ['zu', 'nach', 'bei', 'von'] },
  { q: 'Er kommt ___ Deutschland.', a: 'aus', o: ['aus', 'von', 'in', 'nach'] },
  { q: 'Du ___ (arbeiten) heute.', a: 'arbeitest', o: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'] },
  { q: 'ما معنى "der Vertrag"؟', a: 'العقد', o: ['الاتفاق', 'العقد', 'الخطاب', 'الطلب'] },
]

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function SpeedRushPage() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle')
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [questions, setQuestions] = useState(shuffle(QUESTIONS))
  const [selected, setSelected] = useState<string | null>(null)
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('b1-speed-highscore') || '0'))
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { addXP } = useXP()

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('done')
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('b1-speed-highscore', score.toString())
    }
    const best = Math.max(score, parseInt(localStorage.getItem('b1-speed-highscore') || '0'))
    localStorage.setItem('b1-speed-highscore', best.toString())
    addXP(score * 5)
  }, [score, highScore, addXP])

  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { endGame(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase, endGame])

  function startGame() {
    setQuestions(shuffle(QUESTIONS))
    setQIdx(0); setScore(0); setMissed(0); setTimeLeft(60); setSelected(null)
    setPhase('playing')
  }

  function handleAnswer(option: string) {
    if (selected || phase !== 'playing') return
    setSelected(option)
    const correct = questions[qIdx % questions.length].a
    if (option === correct) {
      setScore(s => s + 1)
      setTimeLeft(t => Math.min(t + 2, 99))
    } else {
      setMissed(m => m + 1)
      setTimeLeft(t => Math.max(t - 5, 0))
    }
    setTimeout(() => {
      setQIdx(i => i + 1)
      setSelected(null)
    }, 600)
  }

  const current = questions[qIdx % questions.length]
  const timerColor = timeLeft > 30 ? 'text-emerald-500' : timeLeft > 10 ? 'text-amber-500' : 'text-red-500'

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">⚡ تحدي السرعة</h1>
        <p className="text-gray-500 dark:text-gray-400">60 ثانية من الأسئلة المتسارعة — إجابة صحيحة = +2 ثوانٍ، خطأ = -5 ثوانٍ</p>
        <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/30 text-amber-700 dark:text-amber-400 rounded-xl px-4 py-2">
          <span className="text-lg">🏆</span>
          <span className="font-black text-sm">أعلى نتيجة: {highScore} سؤال</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="grid grid-cols-3 gap-4">
              {[['⚡', '+2 ثانية', 'إجابة صحيحة', 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200'],
                ['⏱️', '60 ثانية', 'وقت البداية', 'text-blue-500 bg-blue-50 dark:bg-blue-950/30 border-blue-200'],
                ['❌', '-5 ثوانٍ', 'إجابة خاطئة', 'text-red-500 bg-red-50 dark:bg-red-950/30 border-red-200']
              ].map(([icon, val, label, cls]) => (
                <div key={label} className={`p-4 rounded-2xl border text-center ${cls}`}>
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="font-black text-lg">{val}</div>
                  <div className="text-xs font-bold opacity-70">{label}</div>
                </div>
              ))}
            </div>
            <button onClick={startGame}
              className="w-full py-5 text-white font-black text-2xl rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #e17055, #d63031)' }}
            >
              🚀 ابدأ التحدي!
            </button>
          </motion.div>
        )}

        {phase === 'playing' && current && (
          <motion.div key="playing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Timer + Score */}
            <div className="flex items-center justify-between bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 border border-gray-200 dark:border-white/10 shadow-lg">
              <div className="text-center">
                <div className={`text-5xl font-black tabular-nums ${timerColor}`}>{timeLeft}</div>
                <div className="text-xs text-gray-400 font-bold mt-1">ثانية</div>
              </div>
              {/* Timer bar */}
              <div className="flex-1 mx-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" animate={{ width: `${(timeLeft / 60) * 100}%` }}
                  style={{ background: timeLeft > 30 ? '#00b894' : timeLeft > 10 ? '#fdcb6e' : '#d63031' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-500">{score}</div>
                <div className="text-xs text-gray-400 font-bold mt-1">نقطة</div>
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div key={qIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.15 }}
                className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-xl"
              >
                <p className="text-xl font-black text-gray-900 dark:text-white mb-5 text-center" dir="rtl">{current.q}</p>
                <div className="grid grid-cols-2 gap-3">
                  {current.o.map((opt, i) => {
                    const isCorrect = opt === current.a
                    const isSelected = opt === selected
                    return (
                      <button key={i} onClick={() => handleAnswer(opt)} disabled={!!selected}
                        className={`p-4 rounded-xl font-black text-sm transition-all border-2 ${
                          selected
                            ? isCorrect ? 'bg-emerald-500 text-white border-emerald-500 scale-105'
                            : isSelected ? 'bg-red-500 text-white border-red-500'
                            : 'opacity-30 border-gray-100 dark:border-white/5'
                            : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="text-center text-xs text-gray-400 font-bold">سؤال #{qIdx + 1} | أخطاء: {missed}</p>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl"
          >
            <div className="text-6xl">{score >= 20 ? '🏆' : score >= 10 ? '🎉' : '💪'}</div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                {score >= 20 ? 'مذهل!' : score >= 10 ? 'ممتاز!' : 'استمر!'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">أجبت على {score} سؤال بشكل صحيح</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[['✅', score.toString(), 'صحيح'], ['❌', missed.toString(), 'خطأ'], ['🏆', highScore.toString(), 'أعلى نتيجة']].map(([icon, val, label]) => (
                <div key={label} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-3 border border-gray-100 dark:border-white/5">
                  <div className="text-2xl">{icon}</div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{val}</div>
                  <div className="text-xs text-gray-400 font-bold">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg">+{score * 5} XP مكتسبة!</p>
            <button onClick={startGame}
              className="w-full py-4 text-white font-black text-xl rounded-2xl shadow-xl hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #e17055, #d63031)' }}
            >
              🔄 العب مجدداً!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
