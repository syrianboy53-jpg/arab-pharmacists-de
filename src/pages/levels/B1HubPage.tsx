import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function B1HubPage() {
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
          <li className="text-gray-900 dark:text-gray-200">مستوى B1</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold mb-2">
          Mittelstufe - المتوسط
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          B1 - <span className="grad-text">Telc & Goethe</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          المستوى الأهم للعمل والحياة في ألمانيا. هذا التطبيق يحتوي على أضخم مكتبة لتدريبات B1 التفاعلية.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Card 1 */}
        <motion.div whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col">
          <div className="h-32 bg-gradient-to-br from-[#2f6df6]/10 to-[#2f6df6]/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🇩🇪</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">بوابة امتحان DTZ</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">تدريب شامل لامتحان الاندماج (القراءة، الاستماع، المحادثة، الكتابة).</p>
            </div>
            <Link to="/dtz" className="w-full text-center py-3 rounded-full bg-[#2f6df6] hover:bg-[#1d4ed8] text-white font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/30">
              الدخول للبوابة ←
            </Link>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col">
          <div className="h-32 bg-gradient-to-br from-[#00b894]/10 to-[#00b894]/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">📝</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">الأساسيات (القواعد والمفردات)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">آلاف الكلمات وجميع قواعد B1 مع تدريبات ذكية ونظام نقاط.</p>
            </div>
            <Link to="/grammar" className="w-full text-center py-3 rounded-full bg-[#00b894] hover:bg-[#009b7c] text-white font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/30">
              ابدأ التعلم ←
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
