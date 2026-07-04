import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

const wordPairs = [
  { de: 'der Arzt', ar: 'الطبيب' }, { de: 'die Apotheke', ar: 'الصيدلية' }, { de: 'der Termin', ar: 'الموعد' },
  { de: 'die Wohnung', ar: 'الشقة' }, { de: 'der Mietvertrag', ar: 'عقد الإيجار' }, { de: 'die Kaution', ar: 'التأمين' },
  { de: 'der Führerschein', ar: 'رخصة القيادة' }, { de: 'die Versicherung', ar: 'التأمين (بوليصة)' }, { de: 'das Gehalt', ar: 'الراتب' },
  { de: 'der Lebenslauf', ar: 'السيرة الذاتية' }, { de: 'die Bewerbung', ar: 'طلب التوظيف' }, { de: 'das Vorstellungsgespräch', ar: 'مقابلة العمل' },
  { de: 'die Krankenversicherung', ar: 'التأمين الصحي' }, { de: 'die Steuererklärung', ar: 'الإقرار الضريبي' },
  { de: 'der Kindergarten', ar: 'الحضانة/الروضة' }, { de: 'die Grundschule', ar: 'المدرسة الابتدائية' },
  { de: 'das Einwohnermeldeamt', ar: 'مكتب تسجيل السكان' }, { de: 'die Aufenthaltserlaubnis', ar: 'إذن الإقامة' },
  { de: 'der Vermieter', ar: 'المؤجر' }, { de: 'die Nebenkosten', ar: 'المصاريف الجانبية' },
  { de: 'die Überweisung', ar: 'الحوالة البنكية' }, { de: 'das Girokonto', ar: 'الحساب الجاري' },
  { de: 'der Arbeitsvertrag', ar: 'عقد العمل' }, { de: 'die Kündigung', ar: 'الإنهاء/الفصل' },
  { de: 'die Anmeldung', ar: 'التسجيل' }, { de: 'die Bescheinigung', ar: 'الشهادة/الإفادة' },
  { de: 'der Antrag', ar: 'الطلب (رسمي)' }, { de: 'die Genehmigung', ar: 'التصريح/الموافقة' },
  { de: 'die Rechnung', ar: 'الفاتورة' }, { de: 'der Rabatt', ar: 'الخصم/التنزيل' },
  { de: 'die Verspätung', ar: 'التأخير' }, { de: 'die Beschwerde', ar: 'الشكوى' },
  { de: 'der Umzug', ar: 'الانتقال (سكن)' }, { de: 'die Renovierung', ar: 'التجديد/الترميم' },
  { de: 'der Notfall', ar: 'حالة الطوارئ' }, { de: 'der Krankenwagen', ar: 'سيارة الإسعاف' },
]

type Card = { id: number; text: string; type: 'de' | 'ar'; pairIdx: number; flipped: boolean; matched: boolean }

export default function WortschatzSpielPage() {
  const [difficulty, setDifficulty] = useState<number | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matched, setMatched] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const startGame = useCallback((pairs: number) => {
    const shuffledPairs = [...wordPairs].sort(() => Math.random() - 0.5).slice(0, pairs)
    const gameCards: Card[] = []
    shuffledPairs.forEach((pair, idx) => {
      gameCards.push({ id: idx * 2, text: pair.de, type: 'de', pairIdx: idx, flipped: false, matched: false })
      gameCards.push({ id: idx * 2 + 1, text: pair.ar, type: 'ar', pairIdx: idx, flipped: false, matched: false })
    })
    setCards(gameCards.sort(() => Math.random() - 0.5))
    setSelected([])
    setMoves(0)
    setMatched(0)
    setGameWon(false)
    setStartTime(Date.now())
    setDifficulty(pairs)
  }, [])

  useEffect(() => {
    if (!difficulty || gameWon) return
    const interval = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000)
    return () => clearInterval(interval)
  }, [difficulty, startTime, gameWon])

  const handleCardClick = (cardId: number) => {
    if (selected.length >= 2) return
    const card = cards.find(c => c.id === cardId)
    if (!card || card.flipped || card.matched) return

    const newCards = cards.map(c => c.id === cardId ? { ...c, flipped: true } : c)
    setCards(newCards)
    const newSelected = [...selected, cardId]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      setMoves(m => m + 1)
      const [first, second] = newSelected.map(id => newCards.find(c => c.id === id)!)
      if (first.pairIdx === second.pairIdx && first.type !== second.type) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairIdx === first.pairIdx ? { ...c, matched: true } : c))
          setMatched(m => {
            const newMatched = m + 1
            if (newMatched === difficulty) setGameWon(true)
            return newMatched
          })
          setSelected([])
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newSelected.includes(c.id) ? { ...c, flipped: false } : c))
          setSelected([])
        }, 800)
      }
    }
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (!difficulty) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
          <span>›</span>
          <span className="text-[#00b894] font-bold">لعبة المفردات</span>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] p-8 text-center" style={{ background: 'linear-gradient(135deg, #6c3483 0%, #8e44ad 50%, #6c3483 100%)' }}>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(155,89,182,0.5), transparent 70%)' }} />
          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white mb-2">🃏 لعبة مطابقة المفردات</h1>
            <p className="text-sm text-white/60">اقلب البطاقات وطابق الكلمة الألمانية مع ترجمتها العربية</p>
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">اختر الصعوبة:</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { pairs: 6, label: 'سهل', desc: '12 بطاقة', emoji: '🌱', color: 'from-green-500 to-emerald-600' },
            { pairs: 10, label: 'متوسط', desc: '20 بطاقة', emoji: '☀️', color: 'from-amber-500 to-orange-600' },
            { pairs: 16, label: 'صعب', desc: '32 بطاقة', emoji: '🔥', color: 'from-red-500 to-rose-600' },
          ].map(opt => (
            <button key={opt.pairs} onClick={() => startGame(opt.pairs)} className="p-6 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-purple-400/50 hover:-translate-y-1 transition-all text-center cursor-pointer group">
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{opt.emoji}</span>
              <h3 className="font-bold text-gray-900 dark:text-white">{opt.label}</h3>
              <p className="text-xs text-gray-500">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <button onClick={() => setDifficulty(null)} className="hover:text-gray-900 dark:hover:text-white transition-colors">لعبة المفردات</button>
      </div>

      <div className="glass p-3 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center"><span className="text-lg font-black text-[#00b894]">{matched}</span><span className="text-gray-400 text-xs">/{difficulty}</span><p className="text-[9px] text-gray-500">أزواج</p></div>
          <div className="text-center"><span className="text-lg font-black text-gray-600 dark:text-gray-300">{moves}</span><p className="text-[9px] text-gray-500">محاولات</p></div>
          <div className="text-center"><span className="text-lg font-black text-amber-500">{formatTime(elapsed)}</span><p className="text-[9px] text-gray-500">الوقت</p></div>
        </div>
        <button onClick={() => startGame(difficulty)} className="text-xs text-gray-500 hover:text-[#00b894] transition-colors font-bold">🔄 إعادة</button>
      </div>

      {gameWon ? (
        <div className="glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 text-center space-y-4 animate-bounce-in">
          <span className="text-6xl block">🎉</span>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">أحسنت! فزت!</h2>
          <p className="text-sm text-gray-500">{matched} زوج في {moves} محاولة — {formatTime(elapsed)}</p>
          <p className="text-xs text-gray-400">الكفاءة: {Math.round((difficulty! / moves) * 100)}%</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => startGame(difficulty)} className="bg-[#00b894] text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:bg-[#00a884] transition-all">العب مرة أخرى</button>
            <button onClick={() => setDifficulty(null)} className="bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-white/20 transition-all">غيّر الصعوبة</button>
          </div>
        </div>
      ) : (
        <div className={`grid gap-2 ${difficulty <= 6 ? 'grid-cols-3 sm:grid-cols-4' : difficulty <= 10 ? 'grid-cols-4 sm:grid-cols-5' : 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-8'}`}>
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.flipped || card.matched}
              className={`aspect-[3/4] rounded-xl border-2 flex items-center justify-center p-2 text-center transition-all duration-300 cursor-pointer ${
                card.matched ? 'bg-emerald-100 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 opacity-60 scale-95'
                : card.flipped ? 'bg-white dark:bg-white/10 border-purple-400 dark:border-purple-500 shadow-lg scale-105'
                : 'bg-gradient-to-br from-purple-500 to-violet-600 border-purple-400 hover:scale-105 hover:shadow-lg active:scale-95'
              }`}
            >
              {card.flipped || card.matched ? (
                <span className={`font-bold leading-tight ${card.type === 'de' ? 'text-xs font-sans text-gray-900 dark:text-white' : 'text-[11px] text-gray-700 dark:text-gray-300'}`} dir={card.type === 'de' ? 'ltr' : 'rtl'}>
                  {card.text}
                </span>
              ) : (
                <span className="text-white text-xl font-black">?</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
