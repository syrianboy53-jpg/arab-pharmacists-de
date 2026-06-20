import { useState } from 'react'

interface ReviewCard {
  id: string
  front: string
  back: string
  category: string
}

const sampleCards: ReviewCard[] = [
  { id: '1', front: 'der Termin', back: 'الموعد', category: 'vocab' },
  { id: '2', front: 'die Bescheinigung', back: 'الشهادة', category: 'vocab' },
  { id: '3', front: 'beantragen', back: 'يتقدم بطلب', category: 'vocab' },
  { id: '4', front: 'Perfekt von "gehen"', back: 'ist gegangen', category: 'grammar' },
  { id: '5', front: 'Konjunktiv II von "können"', back: 'könnte', category: 'grammar' },
  { id: '6', front: 'die Unterlagen', back: 'الوثائق', category: 'vocab' },
  { id: '7', front: 'sich bewerben um', back: 'يتقدم لـ (وظيفة)', category: 'vocab' },
  { id: '8', front: 'Akkusativ oder Dativ? "in ___"', back: 'Akk (movement) / Dat (location)', category: 'grammar' },
]

export default function SrsReviewPage() {
  const [cards] = useState(sampleCards)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)

  const card = cards[current]
  const done = current >= cards.length

  const handleRate = () => {
    setFlipped(false)
    setReviewed(r => r + 1)
    setTimeout(() => setCurrent(c => c + 1), 200)
  }

  if (done) return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#00b894] to-[#00cec9] rounded-2xl p-8 text-white text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-black mb-2">انتهت المراجعة!</h1>
        <p className="text-gray-900 dark:text-white/80">راجعت {reviewed} بطاقة</p>
        <button onClick={() => { setCurrent(0); setReviewed(0) }} className="mt-4 bg-white dark:bg-[#1a1a2e]/20 hover:bg-white dark:bg-[#1a1a2e]/30 px-6 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">أعد المراجعة</button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2">🔄 مراجعة ذكيّة SRS</h1>
        <span className="text-sm bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold">{current + 1} / {cards.length}</span>
      </div>
      <div onClick={() => setFlipped(!flipped)} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-10 text-center border border-gray-100 dark:border-white/5 cursor-pointer hover:shadow-md transition-all min-h-[200px] flex flex-col items-center justify-center">
        {!flipped ? (
          <>
            <span className="text-xs text-gray-400 mb-3">{card.category === 'vocab' ? '📚 مفردات' : '📐 قواعد'}</span>
            <p className="text-2xl font-black" dir="ltr">{card.front}</p>
            <p className="text-xs text-gray-400 mt-4">اضغط لقلب البطاقة</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-black text-[#00b894]">{card.back}</p>
            <div className="flex gap-2 mt-6">
              {['😟 صعب', '🤔 متوسط', '😊 سهل', '🔥 أتقنته'].map((label, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); handleRate() }} className="px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-white dark:bg-[#1a1a2e]/10 transition-colors cursor-pointer">{label}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}