import { useState, useEffect } from 'react'

export default function TelcSimPage() {
  const [activeTab, setActiveTab] = useState('lesen')
  const [time, setTime] = useState(65 * 60) // 65 minutes
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running || time <= 0) return
    const timer = setInterval(() => setTime(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [running, time])

  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`

  const tabs = [
    { id: 'lesen', label: 'Lesen', icon: '📖', time: '25 د' },
    { id: 'sprachbausteine', label: 'Sprachbausteine', icon: '🧩', time: '10 د' },
    { id: 'hoeren', label: 'Hören', icon: '🎧', time: '20 د' },
    { id: 'schreiben', label: 'Schreiben', icon: '✍️', time: '30 د' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">🎓 محاكي Telc B1</h1>
      <div className="bg-gradient-to-r from-[#0984e3] to-[#74b9ff] rounded-2xl p-5 text-white flex items-center justify-between">
        <div>
          <p className="text-sm font-bold opacity-80">المؤقّت</p>
          <p className="text-3xl font-black font-mono">{formatTime(time)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRunning(!running)} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">{running ? '⏸️ إيقاف' : '▶️ ابدأ'}</button>
          <button onClick={() => { setTime(65*60); setRunning(false) }} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer">🔄</button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">{tabs.map(t => (
        <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${activeTab === t.id ? 'bg-[#0984e3] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'}`}>{t.icon} {t.label} <span className="text-[10px] opacity-60">({t.time})</span></button>
      ))}</div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/5 min-h-[300px]">
        {activeTab === 'lesen' && <div><h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Teil 1: Globalverstehen</h3><p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed" dir="ltr">Lesen Sie die Überschriften a–j und die Texte 1–5. Finden Sie für jeden Text die passende Überschrift.</p><p className="text-center text-gray-400 mt-8">⬇️ ابدأ المؤقت وابدأ القراءة من نموذج Lesen</p></div>}
        {activeTab === 'sprachbausteine' && <div><h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Sprachbausteine Teil 1</h3><p className="text-sm text-gray-500" dir="ltr">Lesen Sie den Text und wählen Sie die richtige Antwort (a, b oder c).</p><p className="text-center text-gray-400 mt-8">⬇️ انتقل لقسم Sprachbausteine للتدريب</p></div>}
        {activeTab === 'hoeren' && <div><h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Teil 1: Kurze Nachrichten</h3><p className="text-sm text-gray-500 dark:text-gray-400">استمع للرسائل القصيرة وأجب عن الأسئلة</p><p className="text-center text-gray-400 mt-8">⬇️ انتقل لقسم Hören للتدريب</p></div>}
        {activeTab === 'schreiben' && <div><h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Persönliche oder halbformelle E-Mail</h3><p className="text-sm text-gray-500 dark:text-gray-400">اكتب رسالة بـ 80-100 كلمة</p><p className="text-center text-gray-400 mt-8">⬇️ انتقل لقسم Schreiben للتدريب</p></div>}
      </div>
    </div>
  )
}