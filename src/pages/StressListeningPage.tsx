import { useState } from 'react'

export default function StressListeningPage() {
  const [activeNoise, setActiveNoise] = useState<string | null>(null)
  const [volume, setVolume] = useState(30)

  const noises = [
    { id: 'station', icon: '🚂', name: 'محطّة قطار', desc: 'إعلانات + ضجيج المسافرين' },
    { id: 'street', icon: '🚗', name: 'شارع مزدحم', desc: 'سيارات + أبواق + مشاة' },
    { id: 'cafe', icon: '☕', name: 'مقهى', desc: 'أحاديث خافتة + موسيقى' },
    { id: 'office', icon: '🏢', name: 'مكتب', desc: 'لوحة مفاتيح + هاتف + أحاديث' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🔥 وضع الضغط للاستماع</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">تدرّب على الاستماع مع ضوضاء خلفية واقعية — مثل ظروف الامتحان الحقيقية</p>

      <div className="bg-gradient-to-br from-[#e17055] to-[#d63031] rounded-2xl p-6 text-white">
        <h2 className="font-bold mb-2 text-gray-800 dark:text-gray-200">🎯 لماذا وضع الضغط؟</h2>
        <p className="text-gray-900 dark:text-white/80 text-sm leading-relaxed">في الامتحان الحقيقي، لن تستمع في هدوء تام. تدرّب على التركيز رغم الضوضاء لتكون مستعداً!</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {noises.map(n => (
          <button key={n.id} onClick={() => setActiveNoise(activeNoise === n.id ? null : n.id)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-right ${
              activeNoise === n.id
                ? 'bg-[#e17055]/10 border-[#e17055] dark:bg-[#e17055]/20'
                : 'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/15'
            }`}>
            <span className="text-3xl block mb-2">{n.icon}</span>
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">{n.name}</h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">{n.desc}</p>
            {activeNoise === n.id && <span className="text-[10px] text-[#e17055] font-bold mt-1 block">🔊 مفعّل</span>}
          </button>
        ))}
      </div>

      {activeNoise && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-200 dark:border-white/5">
          <label className="text-sm font-bold text-gray-800 dark:text-gray-200 block mb-3">🔊 مستوى الضوضاء: {volume}%</label>
          <input type="range" min="10" max="80" value={volume} onChange={e => setVolume(+e.target.value)} className="w-full accent-[#e17055]" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">💡 ابدأ بمستوى 20-30% ثم ارفعه تدريجياً</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-200 dark:border-white/5">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3">📋 كيف تتدرب؟</h3>
        <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside">
          <li>اختر نوع الضوضاء</li>
          <li>ابدأ بمستوى منخفض (20%)</li>
          <li>شغّل تمرين استماع من قسم Hören</li>
          <li>ارفع مستوى الضوضاء تدريجياً</li>
          <li>حاول الإجابة على الأسئلة رغم الضوضاء</li>
        </ol>
      </div>
    </div>
  )
}