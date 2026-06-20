import { Link, useLocation } from 'react-router-dom'
import { type ReactNode, useState, useEffect } from 'react'
import { Home, BookOpen, Gamepad2, BarChart3, Moon, Sun, ArrowRight, Trophy, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return JSON.parse(saved)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [updateUrl, setUpdateUrl] = useState<string | null>(null)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('b1_gamification')
      if (saved) {
        const data = JSON.parse(saved)
        setXp(data.xp || 0)
        setStreak(data.streak || 0)
      }
    } catch {}
  }, [location.pathname])

  useEffect(() => {
    const ua = navigator.userAgent
    const match = ua.match(/B1DeutschAPK\/(\d+)/)
    if (match) {
      const localVersion = parseInt(match[1], 10)
      fetch('/config?t=' + Date.now())
        .then(res => res.json())
        .then((config: any) => {
          const remoteVersion = parseInt(config.apk_version || '0', 10)
          if (localVersion < remoteVersion && config.apk_url) {
            setUpdateUrl(config.apk_url)
          }
        })
        .catch(err => console.error('Error checking for updates:', err))
    }
  }, [])

  useEffect(() => {
    const appPath = '/app/#' + location.pathname
    fetch('/api/visit?path=' + encodeURIComponent(appPath))
      .catch(err => console.error('Error tracking page visit:', err))
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/grammar', label: 'القواعد', icon: BookOpen },
    { path: '/daily', label: 'تحدّي', icon: Gamepad2 },
    { path: '/dashboard', label: 'تقدّمي', icon: BarChart3 },
    { path: '/leaderboard', label: 'المتصدّرين', icon: Trophy },
  ]

  return (
    <div className={darkMode ? 'dark' : ''}>
      {updateUrl && (
        <div className="bg-yellow-500 text-gray-900 px-4 py-2 text-center text-sm font-bold shadow-md flex items-center justify-center gap-2 z-50 border-b border-yellow-600 animate-pulse">
          <span>📢 تحديث جديد متوفر!</span>
          <a href={updateUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors inline-block">
            تحميل ⬇️
          </a>
        </div>
      )}
      <div className="min-h-screen bg-[#f8f9fb] dark:bg-[#0f0f1a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#12122a]/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/5 shadow-sm dark:shadow-none">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo + Brand */}
            <a href="/app/#/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b894] to-[#0984e3] flex items-center justify-center text-white text-sm font-black shadow-lg shadow-[#00b894]/20 group-hover:shadow-[#00b894]/40 transition-all group-hover:scale-105">
                  B1
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#12122a] rounded-full" />
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-base text-gray-900 dark:text-white leading-none block">B1-Syrer</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-none">.de — مجّاني 100%</span>
              </div>
            </a>

            {/* Center: Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#00b894]/10 text-[#00b894]'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon size={14} strokeWidth={active ? 2.5 : 1.5} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right: Stats + Controls */}
            <div className="flex items-center gap-2">
              {/* Streak */}
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-500/10 dark:to-amber-500/10 px-2.5 py-1.5 rounded-xl border border-orange-100 dark:border-orange-500/10">
                <span className="text-sm">🔥</span>
                <span className="text-xs font-black text-orange-600 dark:text-orange-400">{streak}</span>
              </div>
              {/* XP */}
              <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 px-2.5 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/10">
                <Zap size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{xp}</span>
              </div>
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/5"
                aria-label="تبديل الوضع الليلي"
              >
                {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-gray-500" />}
              </button>
            </div>
          </div>
        </header>

        {/* ── Back Button (non-home pages) ── */}
        {location.pathname !== '/' && (
          <div className="max-w-5xl mx-auto px-4 pt-3">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#00b894] transition-colors">
              <ArrowRight size={14} />
              <span>الرئيسية</span>
            </Link>
          </div>
        )}

        {/* ── Main Content ── */}
        <main className="max-w-5xl mx-auto px-4 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── Bottom Nav (Mobile) ── */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1a1a2e]/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/5 sm:hidden">
          <div className="flex justify-around items-center h-14 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
                    active
                      ? 'text-[#00b894]'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                  <span className="text-[10px] font-bold">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* ── Footer ── */}
        <footer className="bg-[#0f2940] text-white mt-12 pb-20 sm:pb-0">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid sm:grid-cols-3 gap-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00b894] to-[#00cec9] flex items-center justify-center text-white text-xs font-black">B1</div>
                  <span className="font-black text-base">B1-Syrer.de</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  تطبيق سوري مجاني لتحضير امتحان B1 الألماني. مفتوح المصدر ومصنوع بحب من الحسكة 🇸🇾
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-[#00b894]">روابط سريعة</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link to="/grammar" className="text-white/50 hover:text-white transition-colors">القواعد</Link>
                  <Link to="/vocabulary" className="text-white/50 hover:text-white transition-colors">المفردات</Link>
                  <Link to="/lesen" className="text-white/50 hover:text-white transition-colors">القراءة</Link>
                  <Link to="/hoeren" className="text-white/50 hover:text-white transition-colors">الاستماع</Link>
                  <Link to="/schreiben" className="text-white/50 hover:text-white transition-colors">الكتابة</Link>
                  <Link to="/sprechen" className="text-white/50 hover:text-white transition-colors">المحادثة</Link>
                  <Link to="/daily" className="text-white/50 hover:text-white transition-colors">تحدّي اليوم</Link>
                  <Link to="/leben" className="text-white/50 hover:text-white transition-colors">الجنسية</Link>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-[#00b894]">تواصل معنا</h4>
                <div className="space-y-2 text-xs">
                  <a href="https://t.me/b1syrer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <span>📱</span> تليغرام @b1syrer
                  </a>
                  <a href="mailto:shami.fadi@gmx.de" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <span>✉️</span> shami.fadi@gmx.de
                  </a>
                  <a href="https://buymeacoffee.com/halawanyfav" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <span>☕</span> ادعمنا بقهوة
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 mt-8 pt-4 flex flex-wrap justify-between items-center gap-3">
              <p className="text-[11px] text-white/30">© 2026 B1-Syrer.de — Made with ❤️ in Germany 🇸🇾🇩🇪</p>
              <div className="flex gap-3 text-[11px]">
                <a href="/impressum/" className="text-white/30 hover:text-white/60 transition-colors">Impressum</a>
                <a href="/datenschutz/" className="text-white/30 hover:text-white/60 transition-colors">Datenschutz</a>
                <a href="/agb/" className="text-white/30 hover:text-white/60 transition-colors">AGB</a>
                <a href="/privacy/" className="text-white/30 hover:text-white/60 transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
