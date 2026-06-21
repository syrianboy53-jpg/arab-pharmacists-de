import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function B2HubPage() {
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
          <li className="text-gray-900 dark:text-gray-200">مستوى B2</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-2">
          Gute Mittelstufe - متقدم
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          B2 - <span className="grad-text">Telc & Goethe</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          الخطوة نحو الاحتراف والعمل المهني. تدرب على امتحانات B2 المتقدمة والمصطلحات المعقدة.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Card 1 */}
        <motion.div whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col">
          <div className="h-32 bg-gradient-to-br from-[#d19200]/10 to-[#d19200]/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🎓</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">محاكي امتحانات B2</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">نماذج حقيقية لامتحانات Telc B2 متضمنة القراءة واللغة (Sprachbausteine).</p>
            </div>
            <Link to="/b2" className="w-full text-center py-3 rounded-full bg-[#d19200] hover:bg-[#b37d00] text-white font-bold text-sm transition-all shadow-lg hover:shadow-orange-500/30">
              الدخول للمحاكي ←
            </Link>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col">
          <div className="h-32 bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🚀</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">تحديات B2 المتقدمة</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">درب أذنك على الاستماع السريع، والقراءة السريعة للنصوص الطويلة.</p>
            </div>
            <Link to="/b2-models" className="w-full text-center py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-indigo-500/30">
              ابدأ التحدي ←
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
