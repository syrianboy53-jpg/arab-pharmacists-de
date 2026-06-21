import { motion } from 'framer-motion'
import { useXP } from '../hooks/useXP'
import { getLevelTitle, getXPForLevel, getProgressToNextLevel } from '../lib/gamification'

export default function ProfilePage() {
  const { xp, level, streak, longestStreak, badges } = useXP()
  
  const levelTitle = getLevelTitle(level)
  const nextLevelXP = getXPForLevel(level + 1)
  const progress = getProgressToNextLevel(xp)

  // قائمة جميع الأوسمة المتاحة في النظام لكي نعرض المقفل منها
  const ALL_BADGES = [
    { id: 'first_lesson', name: 'الدرس الأول', icon: '🎯', desc: 'أكملت أول درس لك' },
    { id: 'week_streak', name: 'أسبوع متواصل', icon: '🔥', desc: 'درست لمدة 7 أيام متتالية' },
    { id: 'month_streak', name: 'شهر متواصل', icon: '⭐', desc: 'درست لمدة 30 يوماً متتالية' },
    { id: 'xp_500', name: '500 نقطة', icon: '💎', desc: 'جمعت 500 XP' },
    { id: 'xp_1000', name: '1000 نقطة', icon: '🏆', desc: 'جمعت 1000 XP' },
    { id: 'xp_5000', name: 'الأسطورة', icon: '👑', desc: 'جمعت 5000 XP' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* رأس الملف الشخصي */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0984e3]/20 to-[#00b894]/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* الأفاتار */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#16213e] flex items-center justify-center text-6xl">
                {level >= 5 ? '👑' : level >= 3 ? '😎' : '👨‍🎓'}
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#00b894] text-white px-4 py-1 rounded-full font-black shadow-lg text-sm whitespace-nowrap">
              مستوى {level}
            </div>
          </div>

          {/* معلومات المستوى */}
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{levelTitle}</h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold mb-6">استمر في التقدم لفتح مستويات جديدة!</p>
            
            <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl">
              <div className="flex justify-between items-end mb-2">
                <span className="font-black text-[#00b894] text-2xl">🌟 {xp} XP</span>
                <span className="text-sm font-bold text-gray-500">
                  {nextLevelXP === Infinity ? 'الحد الأقصى' : `الهدف القادم: ${nextLevelXP} XP`}
                </span>
              </div>
              {nextLevelXP !== Infinity && (
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00b894] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* الإحصائيات (الشعلة) */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between"
        >
          <div>
            <div className="text-sm font-bold opacity-80 mb-1">الشعلة الحالية</div>
            <div className="text-4xl font-black flex items-center gap-2">
              {streak} <span className="text-xl">أيام</span>
            </div>
          </div>
          <div className="text-5xl opacity-80 drop-shadow-lg">🔥</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between"
        >
          <div>
            <div className="text-sm font-bold opacity-80 mb-1">أطول شعلة (رقم قياسي)</div>
            <div className="text-4xl font-black flex items-center gap-2">
              {longestStreak} <span className="text-xl">أيام</span>
            </div>
          </div>
          <div className="text-5xl opacity-80 drop-shadow-lg">⚡</div>
        </motion.div>
      </div>

      {/* غرفة الجوائز */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <span>🏆</span> غرفة الجوائز (Trophy Room)
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_BADGES.map((badgeDef) => {
            const isUnlocked = badges.some(b => b.id === badgeDef.id)
            return (
              <div 
                key={badgeDef.id}
                className={`relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center ${
                  isUnlocked 
                  ? 'bg-white dark:bg-[#1a1a2e] border-[#00b894]/30 shadow-[0_10px_30px_rgba(0,184,148,0.15)] hover:-translate-y-2' 
                  : 'bg-gray-50 dark:bg-[#0f172a]/50 border-gray-200 dark:border-white/5 opacity-60 grayscale'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-3 right-3 text-gray-400">🔒</div>
                )}
                
                <div className="text-5xl mb-4 drop-shadow-xl filter">{badgeDef.icon}</div>
                <h3 className={`font-black text-lg mb-1 ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  {badgeDef.name}
                </h3>
                <p className="text-xs font-bold text-gray-500 leading-relaxed">
                  {badgeDef.desc}
                </p>
                
                {isUnlocked && (
                  <div className="mt-4 text-[10px] font-bold text-[#00b894] bg-[#00b894]/10 px-3 py-1 rounded-full">
                    تم الحصول عليه! 🎉
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
