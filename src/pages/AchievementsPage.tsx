import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { achievements, categoryLabels, rarityColors, rarityLabels } from '../data/achievements'

function getStats() {
  try {
    const xp = parseInt(localStorage.getItem('b1-xp') || '0')
    const streak = JSON.parse(localStorage.getItem('b1-streak') || '{"current":0}').current || 0
    const stories = Object.values(JSON.parse(localStorage.getItem('b1-stories-done') || '{}')).filter(Boolean).length
    const speedScore = parseInt(localStorage.getItem('b1-speed-highscore') || '0')
    const speedPlayed = parseInt(localStorage.getItem('b1-speed-played') || '0')
    const wheelPlayed = parseInt(localStorage.getItem('b1-wheel-played') || '0')
    const dailyCompleted = parseInt(localStorage.getItem('b1-daily-completed') || '0')
    const level = Math.floor(xp / 100) + 1
    return { xp, streak, stories, speedScore, speedPlayed, wheelPlayed, dailyCompleted, level }
  } catch { return { xp: 0, streak: 0, stories: 0, speedScore: 0, speedPlayed: 0, wheelPlayed: 0, dailyCompleted: 0, level: 1 } }
}

function isUnlocked(condition: string, stats: ReturnType<typeof getStats>): boolean {
  try {
    const { xp, streak, stories, speedScore, speedPlayed, wheelPlayed, dailyCompleted, level } = stats
    // safe eval replacement
    return Function('xp', 'streak', 'stories', 'speedScore', 'speedPlayed', 'wheelPlayed', 'dailyCompleted', 'level',
      `return ${condition}`)(xp, streak, stories, speedScore, speedPlayed, wheelPlayed, dailyCompleted, level)
  } catch { return false }
}

export default function AchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')
  const [catFilter, setCatFilter] = useState<string>('all')
  const [showDetail, setShowDetail] = useState<string | null>(null)
  const stats = useMemo(() => getStats(), [])

  const unlockedIds = useMemo(() =>
    new Set(achievements.filter(a => isUnlocked(a.condition, stats)).map(a => a.id)),
    [stats]
  )

  const filtered = achievements.filter(a => {
    const unlocked = unlockedIds.has(a.id)
    if (filter === 'unlocked' && !unlocked) return false
    if (filter === 'locked' && unlocked) return false
    if (catFilter !== 'all' && a.category !== catFilter) return false
    return true
  })

  const unlockedCount = unlockedIds.size
  const pct = Math.round((unlockedCount / achievements.length) * 100)

  const categories = ['all', ...Object.keys(categoryLabels)]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">🏅 غرفة الإنجازات</h1>
        <p className="text-gray-500 dark:text-gray-400">افتح الشارات وسجّل تقدمك في رحلة تعلم الألمانية</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-5 border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-gray-500">{unlockedCount} / {achievements.length} إنجاز</span>
          <span className="text-2xl font-black text-gray-900 dark:text-white">{pct}%</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00b894, #0984e3)' }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[['XP', stats.xp.toLocaleString(), '⚡'], ['Streak', `${stats.streak} يوم`, '🔥'], ['قصص', stats.stories.toString(), '📖'], ['المستوى', stats.level.toString(), '🎯']].map(([label, val, icon]) => (
            <div key={label} className="text-center bg-gray-50 dark:bg-white/5 rounded-xl p-2 border border-gray-100 dark:border-white/5">
              <div className="text-lg">{icon}</div>
              <div className="font-black text-sm text-gray-900 dark:text-white">{val}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCatFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${catFilter === cat ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
            >
              {cat === 'all' ? '🌟 الكل' : categoryLabels[cat]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[['all', 'الكل'], ['unlocked', '✅ مفتوحة'], ['locked', '🔒 مقفلة']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val as typeof filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${filter === val ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <AnimatePresence>
          {filtered.map((a, i) => {
            const unlocked = unlockedIds.has(a.id)
            return (
              <motion.button
                key={a.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setShowDetail(a.id)}
                className={`relative p-4 rounded-2xl border-2 text-center transition-all hover:scale-105 hover:shadow-lg ${
                  unlocked
                    ? 'bg-white dark:bg-[#1a1a2e] border-transparent shadow-md'
                    : 'bg-gray-50 dark:bg-white/3 border-gray-100 dark:border-white/5 opacity-60'
                }`}
              >
                {/* Rarity glow for unlocked */}
                {unlocked && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${rarityColors[a.rarity]} opacity-10`} />
                )}
                <div className={`text-4xl mb-2 transition-all ${unlocked ? '' : 'grayscale opacity-40'}`}>
                  {unlocked ? a.emoji : '🔒'}
                </div>
                <p className={`text-xs font-black leading-tight ${unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                  {unlocked ? a.title : '???'}
                </p>
                {unlocked && (
                  <span className={`mt-1.5 inline-block text-[10px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${rarityColors[a.rarity]}`}>
                    {rarityLabels[a.rarity]}
                  </span>
                )}
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (() => {
          const a = achievements.find(x => x.id === showDetail)!
          const unlocked = unlockedIds.has(a.id)
          return (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDetail(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20 }}
                className="w-full max-w-sm bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-white/10"
                onClick={e => e.stopPropagation()}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${rarityColors[a.rarity]} flex items-center justify-center text-4xl shadow-xl ${!unlocked ? 'grayscale opacity-50' : ''}`}>
                  {unlocked ? a.emoji : '🔒'}
                </div>
                <h3 className="text-2xl font-black text-center text-gray-900 dark:text-white mb-1">
                  {unlocked ? a.title : 'مقفل'}
                </h3>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {unlocked ? a.description : '???'}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">النوع</span>
                    <span className="font-bold text-gray-900 dark:text-white">{categoryLabels[a.category]}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">الندرة</span>
                    <span className={`font-black px-2 py-0.5 rounded-full text-xs text-white bg-gradient-to-r ${rarityColors[a.rarity]}`}>{rarityLabels[a.rarity]}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">المكافأة</span>
                    <span className="font-black text-emerald-500">+{a.xpReward} XP</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">الحالة</span>
                    <span className={`font-black ${unlocked ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {unlocked ? '✅ مفتوح' : '🔒 مقفل'}
                    </span>
                  </div>
                </div>
                <button onClick={() => setShowDetail(null)}
                  className="w-full mt-5 py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  إغلاق
                </button>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
