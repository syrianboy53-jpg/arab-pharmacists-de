import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('يرجى ملء جميع الحقول')
      return
    }

    setIsLoading(true)

    // Simulation of API call
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('b1-users-db') || '[]')
        const user = users.find((u: any) => u.email === email && u.password === password)
        
        if (!user) {
          setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.')
          setIsLoading(false)
          return
        }
        
        // Log them in
        localStorage.setItem('b1-current-user', JSON.stringify(user))
        
        // Navigate to home or profile
        window.location.href = '/app/#/profile'
      } catch (err) {
        setError('حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.')
        setIsLoading(false)
      }
    }, 1200)
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 flex justify-center min-h-[80vh] items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0984e3]/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#e84393]/20 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-20 h-20 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl mx-auto flex items-center justify-center text-4xl mb-4 shadow-lg transform -rotate-3">
            👋
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">مرحباً بعودتك!</h1>
          <p className="text-gray-500 dark:text-gray-400">استكمل دراستك وتدريبك لامتحان B1</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#0984e3] transition-colors text-gray-900 dark:text-white font-medium text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#0984e3] transition-colors text-gray-900 dark:text-white font-medium tracking-widest text-left"
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-gradient-to-r from-[#0984e3] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-black text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2"
          >
            {isLoading ? <span className="animate-spin">🔄</span> : '🔑 تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-200 dark:border-white/10 pt-6 relative z-10">
          <p className="text-gray-600 dark:text-gray-400">
            طالب جديد؟{' '}
            <Link to="/register" className="font-bold text-[#00b894] hover:underline">
              أنشئ حساباً مجانياً
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
