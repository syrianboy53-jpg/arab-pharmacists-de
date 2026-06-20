import { useState } from 'react'

const nouns = [
  { word: 'Tisch', article: 'der', meaning: 'طاولة' },
  { word: 'Lampe', article: 'die', meaning: 'مصباح' },
  { word: 'Buch', article: 'das', meaning: 'كتاب' },
  { word: 'Stuhl', article: 'der', meaning: 'كرسي' },
  { word: 'Tasche', article: 'die', meaning: 'حقيبة' },
  { word: 'Handy', article: 'das', meaning: 'هاتف' },
  { word: 'Schrank', article: 'der', meaning: 'خزانة' },
  { word: 'Uhr', article: 'die', meaning: 'ساعة' },
  { word: 'Fenster', article: 'das', meaning: 'نافذة' },
  { word: 'Schlüssel', article: 'der', meaning: 'مفتاح' },
  { word: 'Tür', article: 'die', meaning: 'باب' },
  { word: 'Geld', article: 'das', meaning: 'مال' },
]

export default function CardSortPage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const noun = nouns[current]
  const done = current >= nouns.length

  const handleSelect = (article: string) => {
    if (selected) return
    setSelected(article)
    if (article === noun.article) setScore(s => s + 1)
    else setWrong(w => w + 1)
    setTimeout(() => {
      setSelected(null)
      setCurrent(c => c + 1)
    }, 1000)
  }

  if (done) return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] rounded-2xl p-8 text-white text-center">
        <div className="text-5xl mb-4">{score >= 10 ? '🏆' : score >= 7 ? '👏' : '💪'}</div>
        <h1 className="text-3xl font-black mb-2">النتيجة</h1>
        <p className="text-2xl font-bold">{score} / {nouns.length}</p>
        <p className="text-gray-900 dark:text-white/70 mt-2">صحيح: {score} | خطأ: {wrong}</p>
        <button onClick={() => { setCurrent(0); setScore(0); setWrong(0) }} className="mt-4 bg-white dark:bg-[#1a1a2e]/20 hover:bg-gray-50 dark:hover:bg-white/30 px-6 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">أعد المحاولة</button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2">🃏 ترتيب البطاقات</h1>
        <span className="text-sm bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold">{current + 1} / {nouns.length}</span>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-8 text-center border border-gray-100 dark:border-white/5">
        <p className="text-xs text-gray-400 mb-2">{noun.meaning}</p>
        <p className="text-4xl font-black mb-8" dir="ltr">___ {noun.word}</p>
        <div className="grid grid-cols-3 gap-3">
          {['der', 'die', 'das'].map(a => (
            <button key={a} onClick={() => handleSelect(a)}
              className={`py-4 rounded-xl font-black text-xl transition-all cursor-pointer border-2 ${
                selected === null ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-[#6c5ce7]' :
                a === noun.article ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700' :
                a === selected ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700' :
                'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-40'
              }`} dir="ltr">{a}</button>
          ))}
        </div>
      </div>
    </div>
  )
}