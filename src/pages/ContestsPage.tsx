

export default function ContestsPage() {return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-white">🎁 مسابقات بجوائز</h1>
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="text-3xl mb-2">🏅</div>
        <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-200">مسابقة الأسبوع</h2>
        <p className="text-white/80 text-sm mb-4">أجب على 20 سؤال — أفضل 3 يحصلون على هدايا</p>
        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm"><p className="text-center font-bold">⏰ تبدأ خلال 3 أيام</p></div>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
        <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">🏆 الفائزون السابقون</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>🥇 أحمد م. — 19/20</p><p>🥈 سارة ع. — 18/20</p><p>🥉 محمد ح. — 17/20</p>
        </div>
      </div>
    </div>
  )
}
