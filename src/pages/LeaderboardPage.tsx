import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useXP } from '../hooks/useXP'

const mockUsers = [
  { id: 'u1', name: 'أحمد م.', xp: 4520, streak: 23, avatar: '👨🏻‍🎓' },
  { id: 'u2', name: 'سارة ع.', xp: 3890, streak: 18, avatar: '👩🏻‍🎓' },
  { id: 'u3', name: 'محمد ح.', xp: 3450, streak: 15, avatar: '👨🏽‍💻' },
  { id: 'u4', name: 'فاطمة ر.', xp: 3120, streak: 21, avatar: '🧕🏻' },
  { id: 'u5', name: 'عمر ب.', xp: 2890, streak: 12, avatar: '👨🏼‍🏫' },
  { id: 'u6', name: 'نور ص.', xp: 2650, streak: 9, avatar: '👩🏼‍⚕️' },
  { id: 'u7', name: 'خالد ت.', xp: 2340, streak: 14, avatar: '🧑🏻‍💼' },
  { id: 'u8', name: 'ليلى ك.', xp: 2100, streak: 7, avatar: '👩🏻‍💻' },
  { id: 'u9', name: 'يوسف ن.', xp: 1870, streak: 11, avatar: '👨🏻‍🔧' },
]

export default function LeaderboardPage() {
  const { xp, streak } = useXP()

  // Inject current user into the list and sort by XP
  const leaderboard = useMemo(() => {
    const allUsers = [...mockUsers, { id: 'currentUser', name: 'أنت (Your Rank)', xp, streak, avatar: '👑', isCurrentUser: true }]
    return allUsers.sort((a, b) => b.xp - a.xp)
  }, [xp, streak])

  const top3 = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3)

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-block p-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-3xl mb-2">
          <span className="text-5xl">🏆</span>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">لوحة الشرف الأسبوعية</h1>
        <p className="text-gray-500 dark:text-gray-400">اجمع النقاط (XP) من خلال التعلم لتتصدر الترتيب وتنافس أصدقاءك!</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-2 md:gap-6 pt-10">
        {/* Rank 2 */}
        {top3[1] && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center w-28 md:w-36">
            <div className="relative mb-2">
              <span className="text-4xl md:text-5xl">{top3[1].avatar}</span>
              <span className="absolute -top-3 -right-3 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-black text-white shadow-lg border-2 border-white dark:border-gray-800">2</span>
            </div>
            <div className="h-32 md:h-40 w-full bg-gradient-to-t from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-t-xl flex flex-col items-center justify-start pt-4 border-t-4 border-gray-300">
              <span className={`font-bold text-sm text-center px-1 truncate w-full ${top3[1].isCurrentUser ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{top3[1].name}</span>
              <span className="text-emerald-500 font-black mt-2">{top3[1].xp} XP</span>
            </div>
          </motion.div>
        )}

        {/* Rank 1 */}
        {top3[0] && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center w-32 md:w-44 z-10">
            <div className="relative mb-2">
              <span className="text-6xl md:text-7xl">{top3[0].avatar}</span>
              <span className="absolute -top-4 -right-4 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-black text-white shadow-lg border-2 border-white dark:border-gray-800 text-lg">1</span>
            </div>
            <div className="h-44 md:h-52 w-full bg-gradient-to-t from-amber-200 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/40 rounded-t-xl flex flex-col items-center justify-start pt-4 border-t-4 border-amber-400 shadow-[0_-10px_30px_rgba(251,191,36,0.3)]">
              <span className={`font-black text-base text-center px-1 truncate w-full ${top3[0].isCurrentUser ? 'text-blue-600 dark:text-blue-400' : 'text-amber-900 dark:text-amber-100'}`}>{top3[0].name}</span>
              <span className="text-amber-600 dark:text-amber-400 font-black text-lg mt-2">{top3[0].xp} XP</span>
              <span className="text-xs text-orange-500 font-bold mt-1">🔥 {top3[0].streak}</span>
            </div>
          </motion.div>
        )}

        {/* Rank 3 */}
        {top3[2] && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col items-center w-28 md:w-36">
            <div className="relative mb-2">
              <span className="text-4xl md:text-5xl">{top3[2].avatar}</span>
              <span className="absolute -top-3 -right-3 w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center font-black text-white shadow-lg border-2 border-white dark:border-gray-800">3</span>
            </div>
            <div className="h-24 md:h-32 w-full bg-gradient-to-t from-amber-900/20 to-amber-800/10 dark:from-amber-900/40 dark:to-amber-800/20 rounded-t-xl flex flex-col items-center justify-start pt-4 border-t-4 border-amber-700">
              <span className={`font-bold text-sm text-center px-1 truncate w-full ${top3[2].isCurrentUser ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{top3[2].name}</span>
              <span className="text-emerald-500 font-black mt-2">{top3[2].xp} XP</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Rest of the List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden">
        {rest.map((user, i) => {
          const rank = i + 4;
          return (
            <div key={user.id} className={`flex items-center gap-4 p-4 sm:p-5 border-b border-gray-100 dark:border-white/5 last:border-0 transition-colors ${user.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}>
              <span className="w-8 font-black text-gray-400 dark:text-gray-500 text-center">{rank}</span>
              <span className="text-2xl">{user.avatar}</span>
              <div className="flex-1">
                <span className={`font-bold block ${user.isCurrentUser ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                  {user.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg">🔥 {user.streak}</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 min-w-[60px] text-right">{user.xp} XP</span>
              </div>
            </div>
          )
        })}
      </motion.div>

    </div>
  )
}
