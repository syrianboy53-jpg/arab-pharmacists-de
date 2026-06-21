import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Award, BookOpen, ScrollText } from 'lucide-react'

export default function ExamsPage() {
  const exams = [
    { path: '/b1', label: 'GOETHE (A1-B2)', icon: GraduationCap, color: 'from-[#00b894] to-[#00cec9]' },
    { path: '/b2-hub', label: 'TELC (A1-C1)', icon: Award, color: 'from-blue-500 to-indigo-500' },
    { path: '/dtz', label: 'DTZ (A2-B1)', icon: BookOpen, color: 'from-orange-500 to-amber-500' },
    { path: '/c1', label: 'TestDaF (C1)', icon: ScrollText, color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="space-y-8 animate-fade-in pb-12 px-4 max-w-4xl mx-auto pt-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          أقسام <span className="grad-text">الامتحانات</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          اختر نوع الامتحان الذي ترغب في التدرب عليه.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exams.map((exam) => {
          const Icon = exam.icon
          return (
            <Link key={exam.path} to={exam.path}>
              <motion.div whileHover={{ y: -4 }} className="glass p-6 rounded-2xl flex items-center gap-4 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-all">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{exam.label}</h2>
                  <p className="text-sm text-gray-500">تدريبات ونماذج امتحانية</p>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
