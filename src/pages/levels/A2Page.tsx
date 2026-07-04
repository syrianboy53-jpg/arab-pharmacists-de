import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const learningPath = [
  { label: 'مفردات A2', path: '/vocabulary?level=a2', icon: '📚', desc: 'مفردات العمل والصحة والسكن' },
  { label: 'قواعد A2', path: '/grammar?level=a2', icon: '📝', desc: 'Perfekt, Modalverben, Dativ' },
  { label: 'امتحان A2 تفاعلي', path: '/a2-exam', icon: '🎯', desc: 'نموذج كامل مع شروحات', highlight: true },
  { label: 'القراءة', path: '/lesen', icon: '📖', desc: 'إعلانات ورسائل وجداول' },
  { label: 'الاستماع', path: '/hoeren', icon: '🎧', desc: 'حوارات هاتفية وإعلانات' },
  { label: 'الكتابة', path: '/schreiben', icon: '✍️', desc: 'رسائل شكوى ودعوة واعتذار' },
  { label: 'المحادثة', path: '/sprechen', icon: '🗣️', desc: 'وصف صور وتخطيط مشترك' },
  { label: 'تصريف الأفعال', path: '/conjugation', icon: '🔁', desc: 'Perfekt + Modalverben' },
]

export default function A2Page() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">الرئيسية</Link>
        <span>›</span>
        <span className="text-amber-600 dark:text-amber-400 font-bold">مستوى A2</span>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] p-8"
        style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #78350f 100%)' }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.5), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(251,191,36,0.4), transparent 60%)' }} />
        <div className="relative z-10 flex items-center gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl border border-white/20 shadow-2xl">
            ☀️
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="text-xs bg-amber-500/20 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full font-bold">Grundstufe</span>
              <span className="text-xs bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-3 py-1 rounded-full font-bold">Goethe A2 · telc A2</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-1">A2 — المتوسط الأساسي</h1>
            <p className="text-sm text-white/60">العمل، الصحة، السكن — بناء جمل أطول والتواصل في المواقف اليومية</p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Link
          to="/a2-exam"
          className="block relative overflow-hidden rounded-2xl p-5 border-2 border-amber-400/30 hover:border-amber-400/60 transition-all hover:-translate-y-1 group"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(251,191,36,0.1) 100%)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">🎯</div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">ابدأ امتحان A2 التفاعلي الكامل</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">2 نموذج — Lesen + Grammatik + Schreiben + Sprechen مع شروحات عربية</p>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">←</span>
          </div>
        </Link>
      </motion.div>

      {/* Learning Path */}
      <div>
        <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="inline-flex w-7 h-7 rounded-lg bg-amber-500 items-center justify-center text-white text-sm shadow">📚</span>
          مسار التعلم
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {learningPath.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx + 0.2 }}>
              <Link
                to={item.path}
                className={`group block p-4 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                  item.highlight
                    ? 'border-amber-400/40 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 shadow-lg shadow-amber-500/10'
                    : 'border-gray-100 dark:border-white/5 bg-white/80 dark:bg-white/5 hover:border-amber-300/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.label}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{item.desc}</p>
                  </div>
                  {item.highlight && <span className="text-[8px] font-black bg-amber-500 text-white px-1.5 py-0.5 rounded-full">جديد</span>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><span>📋</span> عن امتحان A2</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="space-y-2">
            <p><span className="font-bold text-gray-700 dark:text-gray-300">Goethe A2:</span> المستوى الأساسي — فهم جمل عن الحياة اليومية</p>
            <p><span className="font-bold text-gray-700 dark:text-gray-300">telc A2:</span> بديل معترف به من telc</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-bold text-gray-700 dark:text-gray-300">المدة:</span> ~80 دقيقة (Lesen + Hören + Schreiben + Sprechen)</p>
            <p><span className="font-bold text-gray-700 dark:text-gray-300">الجديد في A2:</span> Perfekt, Modalverben, weil/dass, Dativ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
