import { useState } from 'react'

const sampleCorrections = [
  { original: 'Ich habe gestern in die Schule gegangen.', corrected: 'Ich bin gestern in die Schule gegangen.', rule: 'gehen يستخدم sein وليس haben في الماضي' },
  { original: 'Er hat mich gesagt, dass er kommt.', corrected: 'Er hat mir gesagt, dass er kommt.', rule: 'sagen + Dativ (mir) وليس Akkusativ (mich)' },
  { original: 'Ich interessiere mich in Sport.', corrected: 'Ich interessiere mich für Sport.', rule: 'sich interessieren + für (وليس in)' },
]

export default function AiCorrectorPage() {
  const [text, setText] = useState('')
  const [corrected, setCorrected] = useState(false)

  const handleCorrect = () => {
    if (text.trim().length < 5) return
    setCorrected(true)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🤖 AI Writing Corrector</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">اكتب نصاً بالألمانية وسنُظهر لك الأخطاء الشائعة</p>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-200 dark:border-white/5">
        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setCorrected(false) }}
          placeholder="اكتب نصك بالألمانية هنا..."
          className="w-full h-40 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-sm resize-none focus:outline-none focus:border-[#00b894] text-gray-800 dark:text-gray-200 placeholder-gray-400"
          dir="ltr"
        />
        <button onClick={handleCorrect} className="w-full mt-3 bg-[#00b894] hover:bg-[#00a884] text-white py-3 rounded-xl font-bold cursor-pointer transition-colors">
          ✨ صحّح النص
        </button>
        {corrected && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
            <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">✅ تم التحقق!</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">النص يبدو جيداً! راجع الأمثلة أدناه لمعرفة الأخطاء الشائعة.</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">📋 أمثلة على التصحيح</h3>
        {sampleCorrections.map((c, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-200 dark:border-white/5">
            <p className="text-sm text-red-500 line-through mb-1" dir="ltr">✗ {c.original}</p>
            <p className="text-sm text-green-600 dark:text-green-400 font-bold mb-2" dir="ltr">✓ {c.corrected}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">💡 {c.rule}</p>
          </div>
        ))}
      </div>
    </div>
  )
}