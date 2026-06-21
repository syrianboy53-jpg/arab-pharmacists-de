import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { dtzExams } from '../data/dtzData'

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
              {/* DTZ Mock Exams Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 px-4">
        {dtzExams.map((exam, i) => (
          <motion.div key={exam.id} whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl flex flex-col relative">
            <div className="h-32 bg-gradient-to-br from-[#00b894]/20 to-[#00cec9]/10 flex items-center justify-center relative">
              <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1a2e] w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                <span className="text-xl">
                  {exam.type === 'lesen' ? '📖' : exam.type === 'hoeren' ? '🎧' : exam.type === 'schreiben' ? '✍️' : '🗣️'}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{exam.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{exam.description}</p>
              </div>
              <Link to={`/mock-exam/${exam.id}`} className="w-full text-center py-3 rounded-full bg-[#00b894] hover:bg-[#00a884] text-white font-bold text-sm transition-colors shadow-md">
                ابدأ التدريب ({exam.questions.length} أسئلة)
              </Link>
            </div>
          </motion.div>
        ))}
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
