import { useState } from 'react'

export default function DailyChallengePage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const questions = [
    { q: 'Ich ___ gestern ins Kino gegangen.', options: ['bin', 'habe', 'war', 'wurde'], correct: 0, ar: 'ذهبت أمس إلى السينما.' },
    { q: 'Er hat mir ___ Buch geschenkt.', options: ['ein', 'einen', 'eine', 'einem'], correct: 0, ar: 'أهداني كتاباً.' },
    { q: '___ du morgen Zeit?', options: ['Hast', 'Bist', 'Wirst', 'Kannst'], correct: 0, ar: 'هل لديك وقت غداً؟' },
    { q: 'Wir müssen uns ___ beeilen.', options: ['dringend', 'schnell', 'sofort', 'eilig'], correct: 0, ar: 'يجب أن نسرع فوراً.' },
  ]

  const handleAnswer = (idx: number) => {
    if (answered !== null) return
    setAnswered(idx)
    if (idx === questions[current].correct) setScore(s => s + 1)
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1)
        setAnswered(null)
      } else {
        setDone(true)
      }
    }, 1200)
  }

  if (done) return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-2">أحسنت!</h1>
        <p className="text-xl">{score} / {questions.length} إجابات صحيحة</p>
        <p className="text-gray-900 dark:text-white/80 mt-2">+ {score * 22} XP</p>
      </div>
    </div>
  )

  const q = questions[current]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-gray-900 dark:text-white">📅 تحدّي اليوم</h1>
        <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold">{current + 1} / {questions.length}</span>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{q.ar}</p>
        <p className="text-xl font-bold mb-6" dir="ltr">{q.q}</p>
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)}
              className={`p-4 rounded-xl font-bold text-center transition-all cursor-pointer border-2 ${
                answered === null ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-white/10 hover:border-emerald-500' :
                i === q.correct ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700' :
                i === answered ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700' :
                'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-white/10 opacity-50'
              }`} dir="ltr">{opt}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
