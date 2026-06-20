import { useState } from 'react'

const questions = [
  { q: 'Was steht im Grundgesetz?', opts: ['Die Grundrechte', 'Die Steuerpflicht', 'Das Wahlgesetz', 'Die Schulpflicht'], correct: 0, ar: 'ماذا يتضمن الدستور؟ → الحقوق الأساسية' },
  { q: 'Deutschland ist ein...', opts: ['demokratischer Staat', 'Königreich', 'Kaiserreich', 'Fürstentum'], correct: 0, ar: 'ألمانيا هي... → دولة ديمقراطية' },
  { q: 'Was ist kein Grundrecht?', opts: ['Recht auf Wohngeld', 'Meinungsfreiheit', 'Religionsfreiheit', 'Pressefreiheit'], correct: 0, ar: 'ما ليس حقاً أساسياً؟ → حق السكن المدعوم' },
  { q: 'Wer wählt den Bundeskanzler?', opts: ['Der Bundestag', 'Das Volk', 'Der Bundesrat', 'Der Bundespräsident'], correct: 0, ar: 'من ينتخب المستشار؟ → البرلمان (البوندستاغ)' },
  { q: 'Wie viele Bundesländer hat Deutschland?', opts: ['16', '14', '18', '12'], correct: 0, ar: 'كم ولاية في ألمانيا؟ → 16' },
  { q: 'Wann ist der Tag der Deutschen Einheit?', opts: ['3. Oktober', '1. Mai', '24. Dezember', '9. November'], correct: 0, ar: 'متى يوم الوحدة الألمانية؟ → 3 أكتوبر' },
  { q: 'Wer ist das Staatsoberhaupt?', opts: ['Der Bundespräsident', 'Der Bundeskanzler', 'Der Bundestagspräsident', 'Der Ministerpräsident'], correct: 0, ar: 'من هو رئيس الدولة؟ → الرئيس الاتحادي' },
  { q: 'Was ist der Bundestag?', opts: ['Das Parlament', 'Die Regierung', 'Das Gericht', 'Die Polizei'], correct: 0, ar: 'ما هو البوندستاغ؟ → البرلمان' },
]

export default function EinbuergerungPage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const done = current >= questions.length

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === questions[current].correct) setScore(s => s + 1)
    setTimeout(() => { setSelected(null); setCurrent(c => c + 1) }, 1500)
  }

  if (done) return (
    <div className="bg-gradient-to-br from-[#fdcb6e] to-[#e17055] rounded-2xl p-8 text-white text-center">
      <div className="text-5xl mb-4">🏛️</div>
      <h1 className="text-2xl font-black mb-2">النتيجة</h1>
      <p className="text-3xl font-black">{score} / {questions.length}</p>
      <p className="text-gray-900 dark:text-white/70 mt-2">{score >= 6 ? 'ممتاز! أنت جاهز!' : 'حاول مرة أخرى'}</p>
      <button onClick={() => { setCurrent(0); setScore(0) }} className="mt-4 bg-white dark:bg-[#1a1a2e]/20 hover:bg-white dark:bg-[#1a1a2e]/30 px-6 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">أعد المحاولة</button>
    </div>
  )

  const q = questions[current]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2">🏛️ Einbürgerungstest</h1>
        <span className="text-sm bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold">{current + 1}/{questions.length}</span>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/5">
        <p className="text-xs text-gray-400 mb-2">{q.ar}</p>
        <p className="text-lg font-black mb-6" dir="ltr">{q.q}</p>
        <div className="space-y-2">{q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} className={`w-full p-3 rounded-xl font-bold text-sm text-right transition-all cursor-pointer border-2 ${
            selected === null ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-[#fdcb6e]' :
            i === q.correct ? 'bg-green-100 dark:bg-green-900/30 border-green-500' :
            i === selected ? 'bg-red-100 dark:bg-red-900/30 border-red-500' :
            'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-40'
          }`} dir="ltr">{opt}</button>
        ))}</div>
      </div>
    </div>
  )
}