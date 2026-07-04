import { useState } from 'react'
import { motion } from 'framer-motion'
import ProfileSettings from '../components/ProfileSettings'
import { useXP } from '../hooks/useXP'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'stats' | 'settings'>('stats')
  
  const { xp, level, streak, badges, studyDates } = useXP()

  const progress = (xp % 500) / 5 // 0-100

  // Calculate week activity from studyDates
  const weekDays = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
  const today = new Date()
  const weekActivity = Array(7).fill(0)
  
  // A simple representation of activity based on study dates matching the last 7 days
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (studyDates.includes(dateStr)) {
      weekActivity[6 - i] = 100 // Studied that day
    } else {
      weekActivity[6 - i] = 10 // A little base bar just for visuals
    }
  }

  // Get the day names for the last 7 days correctly
  const last7DaysLabels = Array(7).fill('').map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return weekDays[d.getDay()]
  })

  return (
    <div className="space-y-6 animate-fade-in pb-20" dir="rtl">
      
      {/* Header Profile Area */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#00b894]/20 to-[#0984e3]/20 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-right w-full">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00b894] to-[#0984e3] p-1 shadow-lg shadow-[#00b894]/30">
              <div className="w-full h-full bg-white dark:bg-[#0f0f1a] rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-white dark:border-[#0f0f1a] shadow-md">
              مستوى {level}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">لوحتي الشخصيّة</h1>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
              تابع تقدمك، واكتشف إنجازاتك في رحلة تعلم الألمانية! 🚀
            </p>
          </div>
        </div>

        <div className="flex bg-gray-100 dark:bg-black/20 p-1.5 rounded-2xl relative z-10 shrink-0">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-white dark:bg-[#1a1a2e] shadow-md text-[#0984e3]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            الإحصائيات
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-white dark:bg-[#1a1a2e] shadow-md text-[#0984e3]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            ملف المتعلم
          </button>
        </div>
      </div>

      {activeTab === 'stats' ? (
        <div className="space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass rounded-3xl p-5 border border-emerald-500/20 text-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl font-black text-emerald-500 mb-1">{xp}</div>
              <div className="text-xs font-bold text-gray-500">⚡ نقاط XP</div>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass rounded-3xl p-5 border border-orange-500/20 text-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl font-black text-orange-500 mb-1">🔥 {streak}</div>
              <div className="text-xs font-bold text-gray-500">أيام تتابع</div>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-5 border border-indigo-500/20 text-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl font-black text-indigo-500 mb-1">Lv.{level}</div>
              <div className="text-xs font-bold text-gray-500">مستواك الحالي</div>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-5 border border-pink-500/20 text-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl font-black text-pink-500 mb-1">{badges.length}</div>
              <div className="text-xs font-bold text-gray-500">🏅 شارات وإنجازات</div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Progress to Next Level */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/5 shadow-lg relative overflow-hidden">
              <h3 className="font-black text-lg mb-4 text-gray-900 dark:text-white">التقدّم نحو المستوى التالي</h3>
              <div className="flex justify-between items-end mb-2">
                <span className="font-black text-[#00b894] text-2xl">{xp % 500} <span className="text-sm text-gray-500">XP</span></span>
                <span className="font-bold text-gray-400 text-sm">500 XP</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: progress + '%' }} 
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#00b894] to-[#00cec9] rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
                </motion.div>
              </div>
              <p className="text-xs font-bold text-gray-500 mt-4 text-center">أكمل تدريبات أكثر للوصول للمستوى {level + 1}!</p>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/5 shadow-lg">
              <h3 className="font-black text-lg mb-6 text-gray-900 dark:text-white">📅 نشاط آخر 7 أيام</h3>
              <div className="flex items-end justify-between gap-2 h-24">
                {last7DaysLabels.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-gray-100 dark:bg-white/5 rounded-t-xl relative overflow-hidden flex-1 flex items-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: weekActivity[i] + '%' }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`w-full rounded-t-xl transition-colors ${weekActivity[i] > 10 ? 'bg-gradient-to-t from-[#0984e3] to-[#74b9ff]' : 'bg-gray-200 dark:bg-white/10'}`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Badges Section */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/5 shadow-lg">
            <h3 className="font-black text-lg mb-6 text-gray-900 dark:text-white">🏆 شاراتك المكتسبة</h3>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {badges.map((badge, idx) => (
                  <div key={idx} className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform shadow-sm">
                    <span className="text-4xl mb-3 drop-shadow-md">{badge.icon}</span>
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{badge.name}</span>
                    <span className="text-[10px] text-gray-500 mt-1">{new Date(badge.earnedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                <span className="text-4xl mb-2 block opacity-50">🌱</span>
                <p className="text-sm font-bold text-gray-500">لم تكتسب أي شارة بعد. ابدأ التعلم الآن لتجمع الشارات!</p>
              </div>
            )}
          </motion.div>

        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ProfileSettings />
        </motion.div>
      )}
    </div>
  )
}