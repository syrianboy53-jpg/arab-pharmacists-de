import { useState } from 'react'

export default function MyPlanPage() {
  const [examDate, setExamDate] = useState('')
  const [plan, setPlan] = useState<string[]>([])
  const generate = () => {
    if (!examDate) return
    const days = Math.max(1, Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000))
    const p = []
    const topics = ['القواعد', 'المفردات', 'القراءة', 'الاستماع', 'الكتابة', 'المحادثة', 'مراجعة شاملة']
    for (let i = 0; i < Math.min(days, 28); i++) {
      const d = new Date(Date.now() + i * 86400000)
      p.push(`${d.toLocaleDateString('ar-EG', {weekday:'long'})} ${d.getDate()}/${d.getMonth()+1}: ${topics[i % topics.length]}`)
    }
    setPlan(p)
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">🎯 خطّتي الشخصيّة لـB1</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <label className="block text-sm font-bold mb-2">📅 متى موعد امتحانك؟</label>
        <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 mb-4" />
        <button onClick={generate} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-emerald-700 transition-colors">أنشئ خطّتي</button>
      </div>
      {plan.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="font-bold mb-4">📋 خطّتك اليومية</h2>
          <div className="space-y-2">{plan.map((p, i) => (<div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm">{p}</div>))}</div>
        </div>
      )}
    </div>
  )
}
