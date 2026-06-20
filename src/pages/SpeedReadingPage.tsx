import { useState, useEffect } from 'react'

const texts = [
  { title: 'Urlaub in Bayern', text: 'Bayern ist ein beliebtes Reiseziel in Deutschland. Viele Touristen besuchen die Schlösser, zum Beispiel Neuschwanstein. Die bayerischen Alpen bieten wunderschöne Wanderwege. München, die Hauptstadt, ist bekannt für das Oktoberfest und die vielen Museen. Auch der Bodensee im Süden ist ein beliebtes Ausflugsziel.', questions: [
    { q: 'Was ist ein beliebtes Reiseziel?', opts: ['Bayern', 'Berlin', 'Hamburg', 'Köln'], correct: 0 },
    { q: 'Was findet in München statt?', opts: ['Oktoberfest', 'Karneval', 'Filmfestival', 'Marathon'], correct: 0 },
  ]},
  { title: 'Gesunde Ernährung', text: 'Eine gesunde Ernährung ist wichtig für Körper und Geist. Experten empfehlen, täglich fünf Portionen Obst und Gemüse zu essen. Vollkornprodukte liefern wichtige Ballaststoffe. Man sollte ausreichend Wasser trinken, mindestens 1,5 Liter pro Tag. Zu viel Zucker und Fett sollte man vermeiden.', questions: [
    { q: 'Wie viele Portionen Obst und Gemüse empfehlen Experten?', opts: ['Fünf', 'Drei', 'Sieben', 'Zehn'], correct: 0 },
    { q: 'Wie viel Wasser sollte man mindestens trinken?', opts: ['1,5 Liter', '1 Liter', '2 Liter', '3 Liter'], correct: 0 },
  ]},
]

export default function SpeedReadingPage() {
  const [textIdx, setTextIdx] = useState(0)
  const [phase, setPhase] = useState<'ready'|'reading'|'questions'>('ready')
  const [timer, setTimer] = useState(90)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  useEffect(() => {
    if (phase !== 'reading' || timer <= 0) {
      if (timer <= 0 && phase === 'reading') setPhase('questions')
      return
    }
    const t = setInterval(() => setTimer(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [phase, timer])

  const txt = texts[textIdx]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">⏱ مدرّب القراءة السريعة</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">النصّ يختفي بعد الوقت المحدد — اقرأ بسرعة ثم أجب</p>

      {phase === 'ready' && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 text-center border border-gray-200 dark:border-white/5">
          <div className="text-5xl mb-4">📖</div>
          <h2 className="text-lg font-black text-gray-800 dark:text-gray-200 mb-2">{txt.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">ستحصل على {timer} ثانية لقراءة النص</p>
          <div className="flex gap-2 justify-center mb-4">
            {[60, 90, 120].map(s => (
              <button key={s} onClick={() => setTimer(s)} className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors ${timer === s ? 'bg-[#0984e3] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'}`}>{s} ثانية</button>
            ))}
          </div>
          <button onClick={() => setPhase('reading')} className="bg-[#00b894] hover:bg-[#00a884] text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-colors">▶️ ابدأ القراءة</button>
        </div>
      )}

      {phase === 'reading' && (
        <div className="space-y-4">
          <div className="bg-[#0984e3] rounded-xl p-3 text-white text-center font-mono text-2xl font-black">{timer} ثانية</div>
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/5">
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3" dir="ltr">{txt.title}</h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300" dir="ltr">{txt.text}</p>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#e17055] to-[#d63031] rounded-xl p-3 text-white text-center font-bold">⏰ انتهى الوقت! أجب الآن</div>
          {txt.questions.map((q, qi) => (
            <div key={qi} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-200 dark:border-white/5">
              <p className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3" dir="ltr">{q.q}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.opts.map((opt, oi) => {
                  const answered = answers[qi] !== undefined
                  return (
                    <button key={oi} onClick={() => { if (!answered) setAnswers(prev => ({...prev, [qi]: oi})) }}
                      className={`p-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        !answered ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#0984e3]' :
                        oi === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400' :
                        oi === answers[qi] ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400' :
                        'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 opacity-40'
                      }`} dir="ltr">{opt}</button>
                  )
                })}
              </div>
            </div>
          ))}
          <button onClick={() => { setTextIdx((textIdx + 1) % texts.length); setPhase('ready'); setTimer(90); setAnswers({}) }} className="w-full bg-[#0984e3] text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-[#0874c3] transition-colors">النص التالي ➡️</button>
        </div>
      )}
    </div>
  )
}