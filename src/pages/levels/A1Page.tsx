import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const learningPath = [
  { label: 'مفردات A1', path: '/vocabulary?level=a1', icon: '📚', desc: 'كلمات أساسية للمبتدئين' },
  { label: 'قواعد A1', path: '/grammar?level=a1', icon: '📝', desc: 'الأزمنة والأفعال الأساسية' },
  { label: 'امتحان A1 تفاعلي', path: '/a1-exam', icon: '🎯', desc: 'نموذج كامل مع شروحات', highlight: true },
  { label: 'القراءة', path: '/lesen', icon: '📖', desc: 'نصوص بسيطة وإعلانات' },
  { label: 'الاستماع', path: '/hoeren', icon: '🎧', desc: 'حوارات يومية بسيطة' },
  { label: 'الكتابة', path: '/schreiben', icon: '✍️', desc: 'استمارات ورسائل قصيرة' },
  { label: 'المحادثة', path: '/sprechen', icon: '🗣️', desc: 'تقديم النفس وطلبات بسيطة' },
  { label: 'بناء الجمل', path: '/satzbau', icon: '🧩', desc: 'تمارين تركيب الجمل' },
]

export default function A1Page() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">مستوى A1</span>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] p-8"
        style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)' }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.5), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(52,211,153,0.4), transparent 60%)' }} />
        <div className="relative z-10 flex items-center gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl border border-white/20 shadow-2xl">
            🌱
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full font-bold">Anfänger</span>
              <span className="text-xs bg-teal-500/20 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full font-bold">Start Deutsch 1</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-1">A1 — الأساسيات</h1>
            <p className="text-sm text-white/60">أول خطوة في تعلم الألمانية — التعريف بالنفس، الأرقام، الحياة اليومية</p>
          </div>
        </div>
      </motion.div>

      {/* CTA — Full Exam */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Link
          to="/a1-exam"
          className="block relative overflow-hidden rounded-2xl p-5 border-2 border-emerald-400/30 hover:border-emerald-400/60 transition-all hover:-translate-y-1 group"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(52,211,153,0.1) 100%)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">🎯</div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">ابدأ امتحان A1 التفاعلي الكامل</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">2 نموذج — Lesen + Grammatik + Schreiben + Sprechen مع شروحات عربية</p>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">←</span>
          </div>
        </Link>
      </motion.div>

      {/* Learning Path */}
      <div>
        <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="inline-flex w-7 h-7 rounded-lg bg-emerald-500 items-center justify-center text-white text-sm shadow">📚</span>
          مسار التعلم
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {learningPath.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx + 0.2 }}>
              <Link
                to={item.path}
                className={`group block p-4 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                  item.highlight
                    ? 'border-emerald-400/40 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 shadow-lg shadow-emerald-500/10'
                    : 'border-gray-100 dark:border-white/5 bg-white/80 dark:bg-white/5 hover:border-emerald-300/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.label}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{item.desc}</p>
                  </div>
                  {item.highlight && <span className="text-[8px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">جديد</span>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><span>📋</span> عن امتحان A1</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="space-y-2">
            <p><span className="font-bold text-gray-700 dark:text-gray-300">Goethe A1 (Start Deutsch 1):</span> أول شهادة للمبتدئين</p>
            <p><span className="font-bold text-gray-700 dark:text-gray-300">الأهمية:</span> مطلوبة لـ Familiennachzug (لمّ الشمل العائلي)</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-bold text-gray-700 dark:text-gray-300">المدة:</span> ~65 دقيقة (Lesen + Hören + Schreiben + Sprechen)</p>
            <p><span className="font-bold text-gray-700 dark:text-gray-300">المحتوى:</span> تقديم النفس، تسوق، أرقام، عائلة، يوميات</p>
          </div>
        </div>
      </div>
    </div>
  )
}
