import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '../hooks/useXP'

const CHALLENGES = [
  { type: 'translate', emoji: '🌍', label: 'ترجمة', color: 'from-blue-500 to-indigo-600',
    items: [
      { q: 'ما معنى "die Arbeit"؟', a: 'العمل', options: ['البيت', 'العمل', 'المدرسة', 'الطريق'] },
      { q: 'ما معنى "der Bahnhof"؟', a: 'المحطة', options: ['السوق', 'المطار', 'المحطة', 'الملعب'] },
      { q: 'ما معنى "die Gesundheit"؟', a: 'الصحة', options: ['السعادة', 'الصحة', 'القوة', 'الحرية'] },
      { q: 'ما معنى "der Urlaub"؟', a: 'الإجازة', options: ['العطلة/الإجازة', 'الدراسة', 'العمل', 'المرض'] },
      { q: 'ما معنى "die Wohnung"؟', a: 'الشقة', options: ['المدينة', 'الشقة', 'الحديقة', 'الشارع'] },
    ]
  },
  { type: 'artikel', emoji: '🎯', label: 'der/die/das', color: 'from-emerald-500 to-teal-600',
    items: [
      { q: '___ Tisch (der/die/das)', a: 'der', options: ['der', 'die', 'das', 'ein'] },
      { q: '___ Schule (der/die/das)', a: 'die', options: ['der', 'die', 'das', 'ein'] },
      { q: '___ Kind (der/die/das)', a: 'das', options: ['der', 'die', 'das', 'ein'] },
      { q: '___ Wohnung (der/die/das)', a: 'die', options: ['der', 'die', 'das', 'ein'] },
      { q: '___ Bahnhof (der/die/das)', a: 'der', options: ['der', 'die', 'das', 'ein'] },
    ]
  },
  { type: 'conjugate', emoji: '🔁', label: 'تصريف', color: 'from-violet-500 to-purple-600',
    items: [
      { q: 'Ich ___ (gehen) zur Schule.', a: 'gehe', options: ['gehe', 'gehst', 'geht', 'gehen'] },
      { q: 'Er ___ (haben) ein Auto.', a: 'hat', options: ['habe', 'hast', 'hat', 'haben'] },
      { q: 'Wir ___ (sein) müde.', a: 'sind', options: ['bin', 'bist', 'ist', 'sind'] },
      { q: 'Du ___ (arbeiten) heute.', a: 'arbeitest', options: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'] },
      { q: 'Sie (pl.) ___ (kommen) morgen.', a: 'kommen', options: ['komme', 'kommst', 'kommt', 'kommen'] },
    ]
  },
  { type: 'grammar', emoji: '📝', label: 'قواعد', color: 'from-amber-500 to-orange-600',
    items: [
      { q: 'Ich ___ kein Auto. (haben)', a: 'habe', options: ['habe', 'bin', 'war', 'hatte'] },
      { q: 'Das ist ___ Buch. (a book)', a: 'ein', options: ['ein', 'eine', 'einem', 'einer'] },
      { q: 'Er kommt ___ Deutschland.', a: 'aus', options: ['aus', 'von', 'in', 'nach'] },
      { q: 'Ich fahre ___ Berlin.', a: 'nach', options: ['nach', 'zu', 'in', 'an'] },
      { q: 'Das Buch liegt ___ dem Tisch.', a: 'auf', options: ['auf', 'unter', 'neben', 'über'] },
    ]
  },
  { type: 'synonym', emoji: '🪤', label: 'مترادفات', color: 'from-rose-500 to-pink-600',
    items: [
      { q: 'مرادف "schnell"؟', a: 'rasch', options: ['langsam', 'rasch', 'leise', 'dunkel'] },
      { q: 'مرادف "groß"؟', a: 'riesig', options: ['klein', 'riesig', 'dünn', 'kurz'] },
      { q: 'مرادف "schön"؟', a: 'hübsch', options: ['hässlich', 'traurig', 'hübsch', 'laut'] },
      { q: 'مرادف "beginnen"؟', a: 'anfangen', options: ['aufhören', 'anfangen', 'bleiben', 'gehen'] },
      { q: 'مرادف "antworten"؟', a: 'erwidern', options: ['fragen', 'sagen', 'erwidern', 'hören'] },
    ]
  },
  { type: 'sentence', emoji: '🧩', label: 'ترتيب', color: 'from-cyan-500 to-sky-600',
    items: [
      { q: 'رتّب: [geht / Maria / zur Schule]', a: 'Maria geht zur Schule', options: ['Schule zur Maria geht', 'Maria geht zur Schule', 'geht Maria Schule zur', 'zur Schule geht Maria'] },
      { q: 'رتّب: [kaufe / Ich / ein Buch]', a: 'Ich kaufe ein Buch', options: ['kaufe ein Buch Ich', 'Ich kaufe ein Buch', 'ein Buch kaufe Ich', 'Ich ein Buch kaufe'] },
      { q: 'رتّب: [schläft / Das Kind / früh]', a: 'Das Kind schläft früh', options: ['Das Kind schläft früh', 'schläft Das Kind früh', 'früh schläft Das Kind', 'Das früh Kind schläft'] },
      { q: 'رتّب: [wohnt / Er / in Berlin]', a: 'Er wohnt in Berlin', options: ['wohnt Er in Berlin', 'Er wohnt in Berlin', 'in Berlin wohnt Er', 'Er in Berlin wohnt'] },
      { q: 'رتّب: [spielen / Die Kinder / im Park]', a: 'Die Kinder spielen im Park', options: ['Die Kinder spielen im Park', 'spielen Die Kinder im Park', 'im Park spielen Die Kinder', 'Die Kinder im Park spielen'] },
    ]
  },
  { type: 'preposition', emoji: '📍', label: 'حروف الجر', color: 'from-teal-500 to-green-600',
    items: [
      { q: 'Ich bin ___ Hause.', a: 'zu', options: ['zu', 'nach', 'bei', 'von'] },
      { q: 'Er kommt ___ der Arbeit.', a: 'von', options: ['aus', 'von', 'nach', 'zu'] },
      { q: 'Wir fahren ___ die Stadt.', a: 'in', options: ['auf', 'in', 'an', 'über'] },
      { q: 'Das Buch ist ___ dem Stuhl.', a: 'auf', options: ['in', 'an', 'auf', 'unter'] },
      { q: 'Ich warte ___ dem Bus.', a: 'auf', options: ['nach', 'auf', 'von', 'mit'] },
    ]
  },
  { type: 'correction', emoji: '✏️', label: 'تصحيح', color: 'from-red-500 to-rose-600',
    items: [
      { q: 'ما الخطأ؟ "Ich bin müde, aber ich schlafen nicht."', a: 'schlafen → schlafe', options: ['müde → mude', 'schlafen → schlafe', 'aber → oder', 'Ich → Er'] },
      { q: 'ما الخطأ؟ "Er hat ein neue Auto."', a: 'neue → neues', options: ['hat → ist', 'neue → neues', 'ein → einen', 'Er → Sie'] },
      { q: 'ما الخطأ؟ "Wir gehen zu Schule."', a: 'zu → zur', options: ['gehen → fahren', 'zu → zur', 'Schule → Schul', 'Wir → Sie'] },
      { q: 'ما الخطأ؟ "Sie kommst heute."', a: 'kommst → kommt', options: ['Sie → Er', 'kommst → kommt', 'heute → gestern', 'لا خطأ'] },
      { q: 'ما الخطأ؟ "Das ist mein Bruder Haus."', a: 'Bruder Haus → Bruders Haus', options: ['Das → Die', 'mein → meine', 'Bruder Haus → Bruders Haus', 'ist → sind'] },
    ]
  },
]

function spinWheel(current: number): number {
  const spins = Math.floor(Math.random() * 5 + 3) * 360
  const extra = Math.floor(Math.random() * CHALLENGES.length) * (360 / CHALLENGES.length)
  return current + spins + extra
}

export default function WheelPage() {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<typeof CHALLENGES[0] | null>(null)
  const [currentItem, setCurrentItem] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [totalPlayed, setTotalPlayed] = useState(0)
  const { addXP } = useXP()

  const segmentAngle = 360 / CHALLENGES.length

  function handleSpin() {
    if (spinning || selectedChallenge) return
    setSpinning(true)
    const newRotation = spinWheel(rotation)
    setRotation(newRotation)
    setTimeout(() => {
      const normalised = ((newRotation % 360) + 360) % 360
      const idx = Math.floor(((360 - normalised) % 360) / segmentAngle) % CHALLENGES.length
      setSelectedChallenge(CHALLENGES[idx])
      setCurrentItem(Math.floor(Math.random() * CHALLENGES[idx].items.length))
      setSelected(null)
      setSpinning(false)
      const played = parseInt(localStorage.getItem('b1-wheel-played') || '0') + 1
      localStorage.setItem('b1-wheel-played', played.toString())
      setTotalPlayed(played)
    }, 3500)
  }

  function handleAnswer(option: string) {
    if (selected) return
    setSelected(option)
    if (option === selectedChallenge!.items[currentItem].a) {
      setScore(s => s + 1)
      addXP(15)
    }
    setTimeout(() => {
      setSelectedChallenge(null)
      setSelected(null)
    }, 1800)
  }

  const colors = ['#00b894','#0984e3','#6c5ce7','#e17055','#fdcb6e','#e84393','#00cec9','#a29bfe']

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">🎲 عجلة الحظ اللغوية</h1>
        <p className="text-gray-500 dark:text-gray-400">أدر العجلة واحصل على تحدٍّ عشوائي — كل إجابة صحيحة = 15 XP</p>
        <div className="mt-3 inline-flex items-center gap-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-2.5 shadow-sm">
          <span className="text-2xl font-black text-emerald-500">{score}</span>
          <span className="text-sm text-gray-500 font-bold">إجابة صحيحة</span>
          <span className="w-px h-5 bg-gray-200 dark:bg-white/10" />
          <span className="text-sm text-gray-400 font-bold">{totalPlayed || parseInt(localStorage.getItem('b1-wheel-played') || '0')} دورة</span>
        </div>
      </div>

      {/* Wheel */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-72 h-72">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 text-3xl drop-shadow-lg">▼</div>

          <motion.svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-2xl"
            animate={{ rotate: rotation }}
            transition={{ duration: 3.5, ease: [0.2, 0.8, 0.5, 1] }}
          >
            {CHALLENGES.map((c, i) => {
              const startAngle = (i * segmentAngle - 90) * (Math.PI / 180)
              const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180)
              const x1 = 100 + 100 * Math.cos(startAngle)
              const y1 = 100 + 100 * Math.sin(startAngle)
              const x2 = 100 + 100 * Math.cos(endAngle)
              const y2 = 100 + 100 * Math.sin(endAngle)
              const mx = 100 + 70 * Math.cos((startAngle + endAngle) / 2)
              const my = 100 + 70 * Math.sin((startAngle + endAngle) / 2)
              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`}
                    fill={colors[i % colors.length]}
                    stroke="white" strokeWidth="2"
                  />
                  <text
                    x={mx} y={my}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="14" fill="white" fontWeight="bold"
                    transform={`rotate(${i * segmentAngle + segmentAngle / 2}, ${mx}, ${my})`}
                  >
                    {c.emoji}
                  </text>
                </g>
              )
            })}
            <circle cx="100" cy="100" r="12" fill="white" stroke="#e5e7eb" strokeWidth="2" />
          </motion.svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2">
          {CHALLENGES.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: colors[i % colors.length] }}>
              {c.emoji} {c.label}
            </span>
          ))}
        </div>

        <button
          onClick={handleSpin}
          disabled={spinning || !!selectedChallenge}
          className="px-10 py-4 text-white font-black text-xl rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #00b894, #0984e3)' }}
        >
          {spinning ? '🎲 تدور...' : '🎲 أدر العجلة!'}
        </button>
      </div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {selectedChallenge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <div className="w-full max-w-md bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-white/10">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-black text-sm mb-4 bg-gradient-to-r ${selectedChallenge.color}`}>
                {selectedChallenge.emoji} {selectedChallenge.label}
              </div>
              <p className="text-xl font-black text-gray-900 dark:text-white mb-5 leading-relaxed" dir="rtl">
                {selectedChallenge.items[currentItem].q}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {selectedChallenge.items[currentItem].options.map((opt, i) => {
                  const isCorrect = opt === selectedChallenge.items[currentItem].a
                  const isSelected = opt === selected
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      disabled={!!selected}
                      className={`p-3 rounded-xl font-bold text-sm transition-all border-2 ${
                        selected
                          ? isCorrect ? 'bg-emerald-500 text-white border-emerald-500 scale-105'
                          : isSelected ? 'bg-red-500 text-white border-red-500'
                          : 'opacity-40 border-gray-200'
                          : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {selected && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`mt-4 text-center font-black text-lg ${selected === selectedChallenge.items[currentItem].a ? 'text-emerald-500' : 'text-red-500'}`}
                >
                  {selected === selectedChallenge.items[currentItem].a ? '✅ ممتاز! +15 XP' : `❌ الإجابة: ${selectedChallenge.items[currentItem].a}`}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
