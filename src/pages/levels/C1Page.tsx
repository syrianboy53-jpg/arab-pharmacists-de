import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const learningPath = [
  { label: 'مفردات C1', path: '/vocabulary?level=c1', icon: '📚', desc: 'كلمات أكاديمية متقدمة' },
  { label: 'قواعد C1', path: '/grammar?level=c1', icon: '📝', desc: 'Konjunktiv, Passiv, Nominalstil' },
  { label: 'امتحان C1 تفاعلي', path: '/c1-exam', icon: '🎯', desc: 'نموذج كامل مع شروحات', highlight: true },
  { label: 'القراءة المتقدمة', path: '/speed-reading', icon: '📖', desc: 'نصوص أكاديمية وصحفية' },
  { label: 'الاستماع المكثف', path: '/stress-listening', icon: '🎧', desc: 'محاضرات ومقابلات' },
  { label: 'الكتابة الأكاديمية', path: '/schreiben', icon: '✍️', desc: 'Erörterung + Stellungnahme' },
  { label: 'العرض والنقاش', path: '/sprechen', icon: '🗣️', desc: 'Vortrag + Diskussion' },
  { label: 'المصحح الذكي', path: '/ai-corrector', icon: '🤖', desc: 'تصحيح بالذكاء الاصطناعي' },
]

export default function C1Page() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-rose-600 dark:text-rose-400 font-bold">مستوى C1</span>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] p-8"
        style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%)' }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(244,63,94,0.4), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.4), transparent 60%)' }} />
        <div className="relative z-10 flex items-center gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl border border-white/20 shadow-2xl">
            🏅
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="text-xs bg-rose-500/20 border border-rose-500/30 text-rose-300 px-3 py-1 rounded-full font-bold">Fortgeschrittene</span>
              <span className="text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full font-bold">telc C1 · TestDaF</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-1">C1 — الاحتراف</h1>
            <p className="text-sm text-white/60">نصوص أكاديمية، كتابة احترافية، عروض تقديمية ونقاشات</p>
          </div>
        </div>
      </motion.div>

      {/* CTA — Full Exam */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link
          to="/c1-exam"
          className="block relative overflow-hidden rounded-2xl p-5 border-2 border-rose-400/30 hover:border-rose-400/60 transition-all hover:-translate-y-1 group"
          style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.1) 0%, rgba(168,85,247,0.1) 100%)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">
              🎯
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">ابدأ امتحان C1 التفاعلي الكامل</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">2 نموذج كامل — Lesen + Grammatik + Schreiben + Sprechen مع شروحات عربية</p>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">←</span>
          </div>
        </Link>
      </motion.div>

      {/* Learning Path */}
      <div>
        <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="inline-flex w-7 h-7 rounded-lg bg-rose-500 items-center justify-center text-white text-sm shadow">🎓</span>
          مسار التعلم
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {learningPath.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx + 0.2 }}
            >
              <Link
                to={item.path}
                className={`group block p-4 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                  item.highlight
                    ? 'border-rose-400/40 bg-gradient-to-br from-rose-50 to-purple-50 dark:from-rose-950/30 dark:to-purple-950/30 shadow-lg shadow-rose-500/10'
                    : 'border-gray-100 dark:border-white/5 bg-white/80 dark:bg-white/5 hover:border-rose-300/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.label}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{item.desc}</p>
                  </div>
                  {item.highlight && (
                    <span className="text-[8px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full">جديد</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span>📋</span> عن امتحان C1
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="space-y-2">
            <p><span className="font-bold text-gray-700 dark:text-gray-300">telc C1 Hochschule:</span> للقبول الجامعي في ألمانيا</p>
            <p><span className="font-bold text-gray-700 dark:text-gray-300">TestDaF:</span> امتحان دولي معتمد في الجامعات الألمانية</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-bold text-gray-700 dark:text-gray-300">المدة:</span> ~3.5 ساعات (Lesen + Hören + Schreiben + Sprechen)</p>
            <p><span className="font-bold text-gray-700 dark:text-gray-300">المستوى:</span> فهم نصوص معقدة، كتابة أكاديمية، نقاشات متقدمة</p>
          </div>
        </div>
      </div>
    </div>
  )
}
