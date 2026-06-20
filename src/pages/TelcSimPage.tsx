import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TelcSimPage() {
  const [activeTab, setActiveTab] = useState('lesen')
  const [time, setTime] = useState(65 * 60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running || time <= 0) return
    const timer = setInterval(() => setTime(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [running, time])

  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`

  const tabs = [
    { id: 'lesen', label: 'Lesen', icon: '📖', time: '25 د', color: 'from-emerald-500 to-teal-500' },
    { id: 'sprachbausteine', label: 'Sprachbausteine', icon: '🧩', time: '10 د', color: 'from-violet-500 to-purple-500' },
    { id: 'hoeren', label: 'Hören', icon: '🎧', time: '20 د', color: 'from-blue-500 to-cyan-500' },
    { id: 'schreiben', label: 'Schreiben', icon: '✍️', time: '30 د', color: 'from-orange-500 to-amber-500' },
  ]

  const sections: Record<string, { title: string; desc: string; tips: string[]; link: string; linkLabel: string }> = {
    lesen: {
      title: 'القراءة — Lesen',
      desc: '65 دقيقة — 5 أجزاء — 25 سؤال',
      tips: [
        'Teil 1 — Globalverstehen: اقرأ العناوين أولاً ثم النصوص',
        'Teil 2 — Detailverstehen: ابحث عن الكلمات المفتاحية في النص',
        'Teil 3 — Selektives Lesen: ركّز على المعلومات المطلوبة فقط',
        'Teil 4 — Richtig/Falsch/Nicht im Text: احذر "لا يوجد في النص"',
        'Teil 5 — Strukturen erkennen: اختر الكلمة المناسبة للفراغ',
      ],
      link: '/lesen',
      linkLabel: 'ابدأ تدريب القراءة →',
    },
    sprachbausteine: {
      title: 'الهياكل اللغوية — Sprachbausteine',
      desc: '15 دقيقة — جزءان — 20 سؤال',
      tips: [
        'Teil 1 — Lückentext: أكمل النص برسالة بريدية — 10 فراغات مع 3 خيارات',
        'Teil 2 — Brief/E-Mail: اختر الكلمة الصحيحة من 15 خياراً لـ 10 فراغات',
        'اقرأ النص كاملاً قبل الإجابة لفهم السياق',
        'ركّز على أدوات الربط: weil, obwohl, trotzdem, deshalb',
        'انتبه لحالات الإعراب: Akkusativ / Dativ / Genitiv',
      ],
      link: '/sprachbausteine',
      linkLabel: 'ابدأ تدريب Sprachbausteine →',
    },
    hoeren: {
      title: 'الاستماع — Hören',
      desc: '30 دقيقة — 3 أجزاء — 25 سؤال',
      tips: [
        'Teil 1 — Nachrichten: رسائل قصيرة — صح/خطأ',
        'Teil 2 — Radiobeitrag: حوار أو تقرير — اختيار من متعدد',
        'Teil 3 — Alltagsgespräch: حوار يومي — صح/خطأ',
        'اقرأ الأسئلة قبل التشغيل — جهّز إجاباتك ذهنياً',
        'لا تتوقف عند سؤال لم تفهمه — انتقل للسؤال التالي',
      ],
      link: '/hoeren',
      linkLabel: 'ابدأ تدريب الاستماع →',
    },
    schreiben: {
      title: 'الكتابة — Schreiben',
      desc: '30 دقيقة — جزءان',
      tips: [
        'Teil 1 — Persönliche/Halbformelle E-Mail: رسالة 80-100 كلمة',
        'Teil 2 — Meinung äußern: عبّر عن رأيك في موضوع — 80 كلمة',
        'اكتب Anrede + Einleitung + 4 Inhaltspunkte + Schluss + Gruß',
        'تجنّب الجمل البسيطة — استخدم: weil, dass, obwohl, wenn',
        'راجع المقال: Groß/Klein, Punkt, Komma, Verben am Ende',
      ],
      link: '/schreiben',
      linkLabel: 'ابدأ تدريب الكتابة →',
    },
  }

  const current = sections[activeTab]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">🎓</span>
        <div>
          <h1 className="text-2xl font-black grad-text">محاكي Telc B1 الحقيقي</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">حاكِ الامتحان الحقيقي — مع المؤقّت والأقسام الأربعة</p>
        </div>
      </div>

      {/* Timer Card */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0984e3] to-[#6c5ce7]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 0%, transparent 60%)' }} />
        <div className="relative z-10 p-6 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-bold">⏱ المؤقّت</p>
            <p className={`text-4xl font-black font-mono text-white ${time < 300 ? 'text-red-300 animate-pulse' : ''}`}>
              {formatTime(time)}
            </p>
            <p className="text-white/50 text-xs mt-1">
              {running ? '⏳ الامتحان جاري...' : time === 65 * 60 ? 'اضغط ابدأ' : '⏸ متوقف مؤقتاً'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRunning(!running)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer border border-gray-200 dark:border-white/10"
            >
              {running ? '⏸️ إيقاف' : '▶️ ابدأ'}
            </button>
            <button
              onClick={() => { setTime(65*60); setRunning(false) }}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer border border-gray-200 dark:border-white/10"
            >
              🔄
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeTab === t.id
                ? `bg-gradient-to-r ${t.color} text-white border-transparent shadow-lg`
                : 'bg-white dark:bg-[#1a1a2e] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'
            }`}
          >
            {t.icon} {t.label}
            <span className="text-[10px] opacity-70">({t.time})</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm space-y-5">
        <div className="border-b border-gray-200 dark:border-white/10 pb-4">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">{current.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{current.desc}</p>
        </div>

        {/* Tips */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#00b894] flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-[#00b894]" />
            نصائح هذا القسم:
          </h3>
          <div className="space-y-2">
            {current.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <span className="w-6 h-6 rounded-full bg-[#00b894]/10 text-[#00b894] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={current.link}
          className="block w-full bg-gradient-to-r from-[#00b894] to-[#00cec9] hover:from-[#00a884] hover:to-[#00beb9] text-white text-center py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-[#00b894]/25"
        >
          {current.linkLabel}
        </Link>
      </div>

      {/* Exam Structure Overview */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-200 dark:border-white/5 shadow-sm">
        <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-[#6c5ce7]" />
          هيكل امتحان Telc B1
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: '📖', label: 'Lesen', duration: '65 دقيقة', parts: '5 أجزاء / 25 سؤال', pct: '25%' },
            { icon: '🧩', label: 'Sprachbausteine', duration: '15 دقيقة', parts: 'جزءان / 20 سؤال', pct: '10%' },
            { icon: '🎧', label: 'Hören', duration: '30 دقيقة', parts: '3 أجزاء / 25 سؤال', pct: '25%' },
            { icon: '✍️', label: 'Schreiben', duration: '30 دقيقة', parts: 'جزءان', pct: '15%' },
            { icon: '🎙️', label: 'Sprechen', duration: '15 دقيقة', parts: '3 أجزاء', pct: '25%' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <span className="text-xl">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{s.label}</span>
                  <span className="text-xs text-[#00b894] font-bold">{s.pct}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.duration} · {s.parts}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/20 text-center">
          <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">⚠️ درجة النجاح: 60% في كلّ من الكتابي والشفهي</p>
        </div>
      </div>
    </div>
  )
}