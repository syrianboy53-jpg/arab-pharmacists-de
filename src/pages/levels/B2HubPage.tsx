import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { telcB2Exams } from '../../data/telcB2Data'

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
          <li className="text-gray-900 dark:text-gray-200">TELC B2</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <div className="text-center space-y-3 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          امتحانات <span className="grad-text">TELC B2</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          تدرب على جميع أقسام امتحان TELC لمستوى B2 المتقدم.
        </p>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 px-4">
        {telcB2Exams.map((exam) => (
          <motion.div key={exam.id} whileHover={{ y: -4 }} className="glass rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl flex flex-col relative">
            <div className="h-32 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center relative">
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
              <Link to={`/mock-exam/${exam.id}`} className="w-full text-center py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm transition-colors shadow-md">
                ابدأ التدريب ({exam.questions.length} أسئلة)
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
