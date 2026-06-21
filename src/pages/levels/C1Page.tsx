import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function C1Page() {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold px-2">
        <ol className="flex items-center space-x-2 space-x-reverse">
          <li>
            <Link to="/" className="hover:text-[#00b894] transition-colors flex items-center gap-1">
              <span>🏠</span> الرئيسية
            </Link>
          </li>
          <li><span className="mx-2 text-gray-300 dark:text-gray-600">/</span></li>
          <li className="text-gray-900 dark:text-gray-200">مستوى C1</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-2">
          Fortgeschrittene - الاحتراف
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          C1 - <span className="grad-text">Telc Hochschule / TestDaF</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          مستوى اللغة الأكاديمية والمهنية المعقدة. التحضير للدراسة في الجامعات الألمانية والعمل التخصصي.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Card 1 */}
        <motion.div whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl flex flex-col relative opacity-80 grayscale">
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-bold z-10">قريباً</div>
          <div className="h-32 bg-gradient-to-br from-red-500/10 to-red-500/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">📊</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">وصف الرسوم البيانية (Grafik)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">تدرب على تحليل ووصف المخططات البيانية لامتحان TestDaF و Telc.</p>
            </div>
            <button disabled className="w-full text-center py-3 rounded-full bg-gray-200 text-gray-500 font-bold text-sm cursor-not-allowed">قيد التطوير 🛠️</button>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl flex flex-col relative opacity-80 grayscale">
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-bold z-10">قريباً</div>
          <div className="h-32 bg-gradient-to-br from-rose-500/10 to-rose-500/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🔬</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">النصوص العلمية</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">قراءة وتحليل النصوص الأكاديمية والعلمية المعقدة.</p>
            </div>
            <button disabled className="w-full text-center py-3 rounded-full bg-gray-200 text-gray-500 font-bold text-sm cursor-not-allowed">قيد التطوير 🛠️</button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
