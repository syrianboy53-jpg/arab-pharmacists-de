import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stories, type Story } from '../data/stories'
import { useXP } from '../hooks/useXP'
import { BookOpen, ChevronLeft, ChevronRight, Check, X } from 'lucide-react'

function getProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem('b1-stories-done') || '{}') } catch { return {} }
}
function markDone(id: string) {
  const p = getProgress(); p[id] = true
  localStorage.setItem('b1-stories-done', JSON.stringify(p))
}

export default function StoriesPage() {
  const [selected, setSelected] = useState<Story | null>(null)
  const [paraIdx, setParaIdx] = useState(0)
  const [showAr, setShowAr] = useState<number[]>([])
  const [showVocab, setShowVocab] = useState(false)
  const [quizMode, setQuizMode] = useState(false)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [done, setDone] = useState(getProgress())
  const { addXP } = useXP()

  function openStory(s: Story) {
    setSelected(s); setParaIdx(0); setShowAr([]); setShowVocab(false); setQuizMode(false); setAnswers({})
  }

  function toggleAr(i: number) {
    setShowAr(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  }

  function handleAnswer(qi: number, ai: number) {
    if (answers[qi] !== undefined) return
    setAnswers(p => ({ ...p, [qi]: ai }))
  }

  function finishStory() {
    if (!selected) return
    markDone(selected.id)
    setDone(getProgress())
    addXP(selected.xpReward)
  }

  const correctCount = selected
    ? Object.entries(answers).filter(([qi, ai]) => selected.questions[parseInt(qi)].correct === ai).length
    : 0

  const doneCount = Object.values(done).filter(Boolean).length

  if (!selected) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">📖 قصص B1 التفاعلية</h1>
          <p className="text-gray-500 dark:text-gray-400">قصص ألمانية بمستوى B1 مع ترجمة فورية وأسئلة فهم</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl px-4 py-2">
            <span className="font-black text-emerald-600 dark:text-emerald-400">{doneCount} / {stories.length}</span>
            <span className="text-sm text-gray-500">قصص مكتملة</span>
          </div>
        </div>

        <div className="grid gap-4">
          {stories.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => openStory(s)}
              className="w-full text-right p-5 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl w-14 h-14 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform">
                  {s.emoji}
                </div>
                <div className="flex-1 text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    {done[s.id] && <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></span>}
                    <h3 className="font-black text-lg text-gray-900 dark:text-white">{s.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.titleDe} · {s.topic}</p>
                  <div className="flex items-center gap-3 mt-2 justify-end">
                    <span className="text-xs font-bold text-gray-400">⏱️ {s.estimatedMinutes} دقائق</span>
                    <span className="text-xs font-bold text-emerald-500">+{s.xpReward} XP</span>
                    <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">{s.level}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  if (quizMode) {
    const allAnswered = Object.keys(answers).length === selected.questions.length
    return (
      <div className="max-w-xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setQuizMode(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <ChevronRight size={20} className="text-gray-500" />
          </button>
          <h2 className="font-black text-xl text-gray-900 dark:text-white">أسئلة الفهم — {selected.title}</h2>
        </div>

        <div className="space-y-5">
          {selected.questions.map((q, qi) => (
            <div key={qi} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-200 dark:border-white/10 shadow-sm">
              <p className="font-black text-gray-900 dark:text-white mb-4" dir="rtl">{qi + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, ai) => {
                  const answered = answers[qi] !== undefined
                  const isCorrect = ai === q.correct
                  const isSelected = answers[qi] === ai
                  return (
                    <button key={ai} onClick={() => handleAnswer(qi, ai)} disabled={answered}
                      className={`w-full text-right px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                        answered
                          ? isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-700 dark:text-emerald-400'
                          : isSelected ? 'bg-red-50 dark:bg-red-950/30 border-red-400 text-red-600'
                          : 'opacity-40 border-gray-100 dark:border-white/5'
                          : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 justify-end">
                        <span>{opt}</span>
                        {answered && isCorrect && <Check size={16} className="text-emerald-500 shrink-0" />}
                        {answered && isSelected && !isCorrect && <X size={16} className="text-red-500 shrink-0" />}
                      </div>
                    </button>
                  )
                })}
              </div>
              {answers[qi] !== undefined && (
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 rounded-lg p-2" dir="rtl">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        {allAnswered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-xl"
          >
            <div className="text-5xl mb-3">{correctCount === selected.questions.length ? '🏆' : correctCount >= selected.questions.length / 2 ? '🎉' : '💪'}</div>
            <h3 className="text-2xl font-black mb-1">{correctCount} / {selected.questions.length} صحيح</h3>
            <p className="opacity-80 text-sm mb-4">+{selected.xpReward} XP مكتسبة</p>
            {!done[selected.id] && (
              <button onClick={finishStory} className="bg-white text-emerald-600 font-black px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                ✅ أكمل القصة واحصل على XP
              </button>
            )}
            {done[selected.id] && <p className="font-black">✅ تم الإنجاز بالفعل!</p>}
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <ChevronRight size={20} className="text-gray-500" />
        </button>
        <div className="flex-1 text-right">
          <div className="flex items-center gap-2 justify-end">
            <h2 className="font-black text-xl text-gray-900 dark:text-white">{selected.title}</h2>
            <span className="text-2xl">{selected.emoji}</span>
          </div>
          <p className="text-sm text-gray-500">{selected.titleDe}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/5">
        <div className="flex-1 bg-gray-200 dark:bg-white/10 rounded-full h-2">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
            style={{ width: `${((paraIdx + 1) / selected.paragraphs.length) * 100}%` }} />
        </div>
        <span className="text-xs font-black text-gray-500">{paraIdx + 1} / {selected.paragraphs.length}</span>
      </div>

      {/* Paragraph */}
      <AnimatePresence mode="wait">
        <motion.div key={paraIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-lg space-y-4"
        >
          <p className="text-lg leading-relaxed text-gray-900 dark:text-white font-medium" dir="ltr">
            {selected.paragraphs[paraIdx].de}
          </p>
          <button onClick={() => toggleAr(paraIdx)}
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${showAr.includes(paraIdx) ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
          >
            <BookOpen size={16} />
            {showAr.includes(paraIdx) ? 'إخفاء الترجمة' : 'اضغط لرؤية الترجمة'}
          </button>
          <AnimatePresence>
            {showAr.includes(paraIdx) && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="text-base text-blue-700 dark:text-blue-400 font-bold leading-relaxed border-t border-gray-100 dark:border-white/10 pt-3" dir="rtl"
              >
                {selected.paragraphs[paraIdx].ar}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button onClick={() => setParaIdx(p => Math.max(0, p - 1))} disabled={paraIdx === 0}
          className="flex-1 py-3 bg-gray-100 dark:bg-white/5 rounded-xl font-bold text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors disabled:opacity-30"
        >
          <ChevronRight size={18} /> السابق
        </button>
        {paraIdx < selected.paragraphs.length - 1 ? (
          <button onClick={() => setParaIdx(p => p + 1)}
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            التالي <ChevronLeft size={18} />
          </button>
        ) : (
          <button onClick={() => setShowVocab(true)}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-black hover:opacity-90 transition-opacity"
          >
            المفردات 📖
          </button>
        )}
      </div>

      {/* Vocab Drawer */}
      <AnimatePresence>
        {showVocab && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800/30 shadow-xl space-y-4"
          >
            <h3 className="font-black text-xl text-gray-900 dark:text-white text-right">📚 مفردات القصة</h3>
            <div className="space-y-3">
              {selected.vocabulary.map((v, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/5">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{v.meaning}</span>
                    <span className="font-black text-gray-900 dark:text-white" dir="ltr">{v.word}</span>
                  </div>
                  <p className="text-xs text-gray-400 italic" dir="ltr">{v.example}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setShowVocab(false); setQuizMode(true) }}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-black text-lg hover:opacity-90 transition-opacity"
            >
              🎯 ابدأ اختبار الفهم!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
