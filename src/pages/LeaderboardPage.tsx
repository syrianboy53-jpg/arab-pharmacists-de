

export default function LeaderboardPage() {
  const leaders = [
    { name: 'أحمد م.', xp: 4520, streak: 23 },
    { name: 'سارة ع.', xp: 3890, streak: 18 },
    { name: 'محمد ح.', xp: 3450, streak: 15 },
    { name: 'فاطمة ر.', xp: 3120, streak: 21 },
    { name: 'عمر ب.', xp: 2890, streak: 12 },
    { name: 'نور ص.', xp: 2650, streak: 9 },
    { name: 'خالد ت.', xp: 2340, streak: 14 },
    { name: 'ليلى ك.', xp: 2100, streak: 7 },
    { name: 'يوسف ن.', xp: 1870, streak: 11 },
    { name: 'أنت', xp: 1200, streak: 5 },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">🏆 لوحة المتصدّرين</h1>
      <p className="text-sm text-gray-500">ترتيب هذا الأسبوع — تحديث كل يوم اثنين</p>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {leaders.map((l, i) => (
          <div key={i} className={`flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 ${l.name === 'أنت' ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i < 3 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>{i + 1}</span>
            <span className="flex-1 font-bold text-sm">{l.name}</span>
            <span className="text-sm text-orange-500">🔥 {l.streak}</span>
            <span className="text-sm font-bold text-emerald-600">{l.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  )
}
