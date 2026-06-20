import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [level, setLevel] = useState(1)
  const [badges, setBadges] = useState<{name: string, icon: string}[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('b1_gamification')
      if (saved) {
        const data = JSON.parse(saved)
        setXp(data.xp || 0)
        setStreak(data.streak || 0)
        setLevel(Math.floor((data.xp || 0) / 500) + 1)
        setBadges(data.badges || [])
      }
    } catch {}
  }, [])

  const progress = (xp % 500) / 5 // 0-100

  const weekDays = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
  const weekActivity = [30, 45, 0, 60, 80, 20, 0]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2">📊 لوحتي الشخصيّة</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#00b894]">{xp}</div>
          <div className="text-[10px] text-gray-400">⚡ نقاط XP</div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#e17055]">🔥 {streak}</div>
          <div className="text-[10px] text-gray-400">أيام تتابع</div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#6c5ce7]">Lv.{level}</div>
          <div className="text-[10px] text-gray-400">مستواك</div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 text-center border border-gray-100 dark:border-white/5">
          <div className="text-2xl font-black text-[#0984e3]">{badges.length}</div>
          <div className="text-[10px] text-gray-400">🏅 شارات</div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
        <h3 className="font-bold text-sm mb-3">التقدّم نحو المستوى التالي</h3>
        <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00b894] to-[#00cec9] rounded-full transition-all" style={{ width: progress + '%' }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">{xp % 500} / 500 XP للمستوى التالي</p>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-5 border border-gray-100 dark:border-white/5">
        <h3 className="font-bold text-sm mb-4">📅 نشاط الأسبوع</h3>
        <div className="flex items-end justify-between gap-1 h-24">
          {weekDays.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-[#00b894]/20 rounded-t" style={{ height: weekActivity[i] + '%' }}><div className="w-full h-full bg-[#00b894] rounded-t opacity-60" /></div>
              <span className="text-[9px] text-gray-400">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}