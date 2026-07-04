import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { dtzExams } from '../data/dtzData'

export default function DTZPage() {
  return (
    <div className="space-y-8 animate-fade-in pb-12" dir="rtl">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold px-4">
        <ol className="flex items-center space-x-2 space-x-reverse">
          <li>
            <Link to="/" className="hover:text-amber-500 transition-colors flex items-center gap-1">
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
      <div className="relative overflow-hidden glass mx-4 rounded-3xl p-8 border border-amber-500/20 shadow-lg text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 mx-auto mb-6">
          🌍
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
          امتحان <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">DTZ للاندماج</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
          الخطوة الأهم نحو الاستقرار في ألمانيا. تدرب على نماذج امتحان "Deutsch-Test für Zuwanderer" الشاملة والمصممة لتحديد مستواك بين A2 و B1.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 px-4">
        {dtzExams.map((exam, idx) => (
          <motion.div 
            key={exam.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group glass rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-amber-500/30 transition-all flex flex-col relative"
          >
            {/* Top Pattern */}
            <div className={`h-32 bg-gradient-to-br flex items-center justify-center relative overflow-hidden ${
              exam.type === 'lesen' ? 'from-emerald-500/20 to-teal-500/5' :
              exam.type === 'hoeren' ? 'from-blue-500/20 to-cyan-500/5' :
              exam.type === 'schreiben' ? 'from-orange-500/20 to-amber-500/5' :
              'from-purple-500/20 to-pink-500/5'
            }`}>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }} />
              
              <div className="absolute top-4 right-4 bg-white dark:bg-[#1a1a2e] w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl drop-shadow-md">
                  {exam.type === 'lesen' ? '📖' : exam.type === 'hoeren' ? '🎧' : exam.type === 'schreiben' ? '✍️' : '🗣️'}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between relative z-10 bg-white/50 dark:bg-black/20 backdrop-blur-md">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 transition-colors">{exam.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{exam.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 bg-white dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5">
                  <span>⏱️</span>
                  <span>{exam.questions.length * 3} دقيقة</span>
                </div>
                
                <Link to={`/mock-exam/${exam.id}`} className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all text-white shadow-lg flex items-center gap-2 hover:-translate-x-1 ${
                  exam.type === 'lesen' ? 'bg-emerald-500 shadow-emerald-500/30' :
                  exam.type === 'hoeren' ? 'bg-blue-500 shadow-blue-500/30' :
                  exam.type === 'schreiben' ? 'bg-orange-500 shadow-orange-500/30' :
                  'bg-purple-500 shadow-purple-500/30'
                }`}>
                  <span>ابدأ</span>
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity rotate-180">➔</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Sections */}
      <div className="glass mx-4 mt-8 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 blur-3xl" />
        
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center border-b border-gray-200 dark:border-white/10 pb-6 flex items-center justify-center gap-3">
          <span>📋</span>
          هيكل امتحان DTZ (A2-B1)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Written */}
          <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
            <h4 className="font-black text-indigo-600 dark:text-indigo-400 mb-5 text-lg flex items-center gap-2">
              <span>✍️</span> الامتحان الكتابي (100 دقيقة)
            </h4>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-indigo-500/30 transition-colors">
                <span className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">🎧 الاستماع:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg">4 أجزاء، 25 دقيقة</span>
              </div>
              <div className="flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-indigo-500/30 transition-colors">
                <span className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">📖 القراءة:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg">5 أجزاء، 45 دقيقة</span>
              </div>
              <div className="flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-indigo-500/30 transition-colors">
                <span className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">✍️ الكتابة:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg">مهمة واحدة، 30 دقيقة</span>
              </div>
            </div>
          </div>

          {/* Oral & Score */}
          <div className="space-y-6">
            <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
              <h4 className="font-black text-rose-600 dark:text-rose-400 mb-5 text-lg flex items-center gap-2">
                <span>🗣️</span> الامتحان الشفهي (16 دقيقة)
              </h4>
              <div className="flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm text-sm hover:border-rose-500/30 transition-colors">
                <span className="font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">المحادثة:</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold bg-rose-500/10 px-3 py-1 rounded-lg">3 أجزاء (امتحان ثنائي)</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 rounded-2xl border border-emerald-500/20">
              <h4 className="font-black text-emerald-600 dark:text-emerald-400 mb-4 text-lg flex items-center gap-2">
                <span>🎯</span> مستويات الشهادة
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center bg-white/80 dark:bg-black/40 p-3 rounded-xl">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">شهادة B1:</span>
                  <span className="text-gray-600 dark:text-gray-400 font-bold text-xs">75 - 100 نقطة (في المحادثة والأقسام الأخرى)</span>
                </div>
                <div className="flex justify-between items-center bg-white/80 dark:bg-black/40 p-3 rounded-xl">
                  <span className="text-amber-600 dark:text-amber-400 font-black">شهادة A2:</span>
                  <span className="text-gray-600 dark:text-gray-400 font-bold text-xs">35 - 74.5 نقطة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
