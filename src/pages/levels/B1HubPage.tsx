import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { goetheB1Exams } from '../../data/goetheB1Data'

export default function B1HubPage() {
  return (
    <div className="space-y-8 animate-fade-in pb-12" dir="rtl">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold px-4">
        <ol className="flex items-center space-x-2 space-x-reverse">
          <li>
            <Link to="/" className="hover:text-[#00b894] transition-colors flex items-center gap-1">
              <span>🏠</span> الرئيسية
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
          </li>
          <li>
            <Link to="/exams" className="hover:text-[#00b894] transition-colors">
              الامتحانات
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
          </li>
          <li className="text-gray-900 dark:text-gray-200">Goethe B1</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden glass mx-4 rounded-3xl p-8 border border-emerald-500/20 shadow-lg text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="w-20 h-20 bg-gradient-to-br from-[#00b894] to-[#0984e3] rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-[#00b894]/30 mx-auto mb-6">
          🎓
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
          امتحانات <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b894] to-[#0984e3]">Goethe B1</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
          اختبر مستواك وتدرب على نماذج امتحانات معهد غوته لمستوى B1. تغطي هذه النماذج جميع الأقسام الأربعة (القراءة، الاستماع، الكتابة، المحادثة) مع تصحيح ذكي وإجابات نموذجية.
        </p>
      </div>

      {/* Learning Path Section */}
      <div className="px-4 space-y-6 mt-8">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <span>📚</span> مسار التعلم B1
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/vocabulary?level=b1" className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#00b894]/50 transition-all flex flex-col items-center text-center gap-3 group">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              📖
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00b894] transition-colors">مفردات B1</h3>
              <p className="text-xs text-gray-500 mt-1">أكثر من 2000 كلمة هامة</p>
            </div>
          </Link>

          <Link to="/grammar?level=b1" className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#00b894]/50 transition-all flex flex-col items-center text-center gap-3 group">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🧩
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00b894] transition-colors">قواعد وملاحظات</h3>
              <p className="text-xs text-gray-500 mt-1">الروابط وتصريف الأفعال الشاذة</p>
            </div>
          </Link>

          <Link to="/schreiben" className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#00b894]/50 transition-all flex flex-col items-center text-center gap-3 group">
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              ✍️
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00b894] transition-colors">نماذج الكتابة</h3>
              <p className="text-xs text-gray-500 mt-1">رسائل جاهزة للتدريب</p>
            </div>
          </Link>

          <Link to="/sprechen" className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#00b894]/50 transition-all flex flex-col items-center text-center gap-3 group">
            <div className="w-14 h-14 rounded-xl bg-rose-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🗣️
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00b894] transition-colors">نماذج المحادثة</h3>
              <p className="text-xs text-gray-500 mt-1">تدريبات التخطيط وإبداء الرأي</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="px-4 mt-12 space-y-6">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <span>🎯</span> امتحانات وتدريبات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goetheB1Exams.map((exam, idx) => (
          <motion.div 
            key={exam.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group glass rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-emerald-500/30 transition-all flex flex-col relative"
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
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">{exam.title}</h3>
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
      </div>
    </div>
  )
}
