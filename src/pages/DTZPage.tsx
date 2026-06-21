import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DTZPage() {
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
          <li>
            <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
          </li>
          <li className="text-gray-900 dark:text-gray-200">بوابة امتحان DTZ</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="text-center space-y-3 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          DTZ - <span className="grad-text">Deutsch-Test für Zuwanderer</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          اختر قسماً للتدريب الفعلي على امتحان الاندماج الرسمي للمهاجرين (مستوى A2-B1). جميع الأقسام مصممة لتحاكي الامتحان الحقيقي.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Hören Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col"
        >
          <div className="h-32 bg-gradient-to-br from-[#2f6df6]/10 to-[#2f6df6]/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🎧</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">الاستماع (Hören)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                تدرب على فهم الإعلانات الهاتفية، المعلومات الإعلامية، والمحادثات اليومية والآراء المختلفة.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-xs font-bold bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">4 أجزاء</span>
                <span className="text-xs font-bold bg-[#2f6df6]/10 text-[#2f6df6] px-3 py-1 rounded-full">25 دقيقة</span>
              </div>
            </div>
            <Link to="/hoeren" className="w-full text-center py-3 rounded-full bg-[#2f6df6] hover:bg-[#1d4ed8] text-white font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/30">
              ابدأ التدريب ←
            </Link>
          </div>
        </motion.div>

        {/* Lesen Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col"
        >
          <div className="h-32 bg-gradient-to-br from-[#d19200]/10 to-[#d19200]/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">📖</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">القراءة (Lesen)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                اقرأ الفهارس، الإعلانات، المقالات، الإيميلات وأكمل الفراغات بشكل صحيح.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-xs font-bold bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">5 أجزاء</span>
                <span className="text-xs font-bold bg-[#d19200]/10 text-[#d19200] px-3 py-1 rounded-full">45 دقيقة</span>
              </div>
            </div>
            <Link to="/lesen" className="w-full text-center py-3 rounded-full bg-[#d19200] hover:bg-[#b37d00] text-white font-bold text-sm transition-all shadow-lg hover:shadow-yellow-600/30">
              ابدأ التدريب ←
            </Link>
          </div>
        </motion.div>

        {/* Schreiben Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col"
        >
          <div className="h-32 bg-gradient-to-br from-[#16a34a]/10 to-[#16a34a]/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">✍️</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">الكتابة (Schreiben)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                اكتب رسائل رسمية أو غير رسمية لمواقف التواصل اليومية وقم بتصحيحها عبر المصحح الآلي.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-xs font-bold bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">موضوع واحد</span>
                <span className="text-xs font-bold bg-[#16a34a]/10 text-[#16a34a] px-3 py-1 rounded-full">30 دقيقة</span>
              </div>
            </div>
            <Link to="/schreiben" className="w-full text-center py-3 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-sm transition-all shadow-lg hover:shadow-green-500/30">
              ابدأ التدريب ←
            </Link>
          </div>
        </motion.div>

        {/* Sprechen Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group cursor-pointer flex flex-col"
        >
          <div className="h-32 bg-gradient-to-br from-[#8b3bdf]/10 to-[#8b3bdf]/5 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🗣️</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">المحادثة (Sprechen)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                عرّف عن نفسك، تحدث عن تجربة، وخطط لنشاط بالاشتراك مع شريكك.
              </p>
              <div className="flex gap-2 mb-6">
                <span className="text-xs font-bold bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">3 أجزاء</span>
                <span className="text-xs font-bold bg-[#8b3bdf]/10 text-[#8b3bdf] px-3 py-1 rounded-full">16 دقيقة (زوجي)</span>
              </div>
            </div>
            <Link to="/sprechen" className="w-full text-center py-3 rounded-full bg-[#8b3bdf] hover:bg-[#7e22ce] text-white font-bold text-sm transition-all shadow-lg hover:shadow-purple-500/30">
              ابدأ التدريب ←
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Info Sections */}
      <div className="glass mt-12 p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center border-b border-gray-200 dark:border-white/10 pb-4">
          هيكل امتحان DTZ (A2-B1)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Written */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">الامتحان الكتابي (100 دقيقة)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/5">
                <span className="font-bold flex items-center gap-2">🎧 الاستماع:</span>
                <span className="text-gray-600 dark:text-gray-400">4 أجزاء، 25 دقيقة</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/5">
                <span className="font-bold flex items-center gap-2">📖 القراءة:</span>
                <span className="text-gray-600 dark:text-gray-400">5 أجزاء، 45 دقيقة</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/5">
                <span className="font-bold flex items-center gap-2">✍️ الكتابة:</span>
                <span className="text-gray-600 dark:text-gray-400">مهمة واحدة، 30 دقيقة</span>
              </div>
            </div>
          </div>

          {/* Oral & Score */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">الامتحان الشفهي (16 دقيقة)</h4>
              <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-200 dark:border-white/5 text-sm">
                <span className="font-bold flex items-center gap-2">🗣️ المحادثة:</span>
                <span className="text-gray-600 dark:text-gray-400">3 أجزاء (امتحان ثنائي)</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-base">مستويات الشهادة</h4>
              <div className="space-y-2 text-sm bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5">
                <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                  <span className="text-green-600 dark:text-green-400 font-black">شهادة B1:</span>
                  <span className="text-gray-600 dark:text-gray-400">75 - 100 نقطة (في المحادثة والأقسام الأخرى)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-yellow-600 dark:text-yellow-400 font-black">شهادة A2:</span>
                  <span className="text-gray-600 dark:text-gray-400">35 - 74.5 نقطة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
