import { Link, useLocation } from 'react-router-dom'
import { type ReactNode, useState, useEffect } from 'react'
import { Home, GraduationCap, Award, BookOpen, ScrollText, Mail, LayoutDashboard, Moon, Sun, ArrowRight, Zap, ChevronDown } from 'lucide-react'
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
  const [maintenance, setMaintenance] = useState(false)
  const [maintenanceMsg, setMaintenanceMsg] = useState('')

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

  // Fetch config — check for updates + maintenance mode
  useEffect(() => {
    fetch('/config?t=' + Date.now())
      .then(res => res.json())
      .then((config: any) => {
        // Maintenance check
        if (config.maintenance_mode === '1') {
          setMaintenance(true)
          setMaintenanceMsg(config.maintenance_message || 'الموقع قيد الصيانة والتحديث — نعود قريباً ✨')
        } else {
          setMaintenance(false)
        }
        // APK update check
        const ua = navigator.userAgent
        const match = ua.match(/B1DeutschAPK\/(\d+)/)
        if (match) {
          const localVersion = parseInt(match[1], 10)
          const remoteVersion = parseInt(config.apk_version || '0', 10)
          if (localVersion < remoteVersion && config.apk_url) {
            setUpdateUrl(config.apk_url)
          }
        }
      })
      .catch(err => console.error('Error fetching config:', err))
  }, [])

  useEffect(() => {
    const appPath = '/app/#' + location.pathname
    fetch('/api/visit?path=' + encodeURIComponent(appPath))
      .catch(err => console.error('Error tracking page visit:', err))
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { 
      path: '/exams',
      label: 'Exams', 
      icon: GraduationCap,
      children: [
        { path: '/b1', label: 'GOETHE', icon: GraduationCap },
        { path: '/b2-hub', label: 'TELC', icon: Award },
        { path: '/dtz', label: 'DTZ', icon: BookOpen },
        { path: '/c1', label: 'TestDaF', icon: ScrollText },
      ]
    },
    { path: '#', label: 'Contact', icon: Mail },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ]

  // Allow admin page even during maintenance
  const isAdminPage = location.pathname === '/admin'

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* ── Maintenance Mode Screen ── */}
      {maintenance && !isAdminPage ? (
        <div className="min-h-screen bg-[#0f172a] relative overflow-hidden flex items-center justify-center p-6 font-cairo" dir="rtl">
          {/* Background Ambient Lights */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-md w-full relative z-10"
          >
            {/* Glassmorphic Card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 animate-gradient-x" style={{ backgroundSize: '200% 100%' }} />

              {/* Icon / Avatar */}
              <div className="flex justify-center mb-8">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative"
                >
                  <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" style={{ animationDuration: '3s' }} />
                  <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">⚙️</span>
                </motion.div>
              </div>

              {/* Title & Message */}
              <div className="text-center space-y-4 mb-8">
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  تحديثات وتطوير
                </h1>
                <p className="text-gray-300 text-[15px] leading-relaxed font-medium">
                  {maintenanceMsg}
                </p>
              </div>

              {/* Loading Bar */}
              <div className="bg-black/40 rounded-full h-2 mb-8 overflow-hidden relative">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-400 to-blue-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                />
              </div>

              {/* Contact Info */}
              <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-3">
                <span className="text-xs font-bold text-gray-500 tracking-wider">هل تواجه مشكلة طارئة؟</span>
                <div className="flex gap-4">
                  <a href="https://t.me/b1syrer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-bold text-gray-300 hover:text-white group">
                    <span className="group-hover:scale-110 transition-transform">✈️</span>
                    <span>تليغرام</span>
                  </a>
                  <a href="mailto:shami.fadi@gmx.de" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-bold text-gray-300 hover:text-white group">
                    <span className="group-hover:scale-110 transition-transform">📬</span>
                    <span>بريد إلكتروني</span>
                  </a>
                </div>
              </div>

              {/* Secret Admin Door */}
              <div className="absolute top-4 left-4">
                <a href="/app/#/admin" className="opacity-10 hover:opacity-100 transition-opacity text-[10px] grayscale hover:grayscale-0">
                  🔐
                </a>
              </div>
            </div>
          </motion.div>

          {/* CSS animation for gradient */}
          <style>{`
            @keyframes gradient-x {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient-x {
              animation: gradient-x 3s ease infinite;
            }
          `}</style>
        </div>
      ) : (
      <>
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
                <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-none">.de — 100% Free</span>
              </div>
            </a>

            {/* Center: Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item, idx) => {
                if (item.children) {
                  return (
                    <div key={idx} className="relative group">
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer">
                        <item.icon size={15} strokeWidth={1.5} />
                        {item.label}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                      </button>
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-xl border border-gray-100 dark:border-white/5 py-2 w-48 flex flex-col">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-colors ${
                                isActive(child.path)
                                  ? 'bg-[#00b894]/10 text-[#00b894]'
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                              }`}
                            >
                              <child.icon size={14} strokeWidth={isActive(child.path) ? 2.5 : 1.5} />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                const active = isActive(item.path!)
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path!}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#00b894]/10 text-[#00b894]'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon size={15} strokeWidth={active ? 2.5 : 1.5} />
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

              {/* Auth Button */}
              {(() => {
                const user = (() => {
                  try {
                    return JSON.parse(localStorage.getItem('b1-current-user') || 'null')
                  } catch { return null }
                })();

                if (user) {
                  return (
                    <div className="flex items-center gap-2 pr-2 border-r border-gray-200 dark:border-white/10">
                      <Link to="/profile" className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-[#00b894] transition-colors truncate max-w-[80px]" title={user.name}>
                        👤 {user.name.split(' ')[0]}
                      </Link>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('b1-current-user')
                          window.location.reload()
                        }}
                        className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded-lg hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors font-bold"
                      >
                        Logout
                      </button>
                    </div>
                  )
                }

                return (
                  <Link 
                    to="/register" 
                    className="hidden sm:flex items-center gap-1 bg-[#0984e3] hover:bg-[#0874c3] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md mr-1"
                  >
                    🚀 Sign up Free
                  </Link>
                )
              })()}
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

        {/* ── Mega Footer ── */}
        <footer className="bg-[#0f2940] text-white mt-12 pb-20 sm:pb-0 border-t-4 border-[#00b894]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              
              {/* Column 1: Brand & Info */}
              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b894] to-[#00cec9] flex items-center justify-center text-white text-sm font-black shadow-lg">B1</div>
                  <span className="font-black text-xl tracking-tight">B1-Syrer.de</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  تدرب على امتحانات اللغة الألمانية مع مواد أصلية واستعد للحصول على شهادتك. منصتك الشاملة للاندماج واللغة.
                </p>
                <div className="mb-3 font-bold text-sm text-white/80">تابعنا على (Follow us on):</div>
                <div className="flex gap-3">
                  <a href="https://t.me/b1syrer" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Telegram">
                    <span className="text-white text-sm">📱</span>
                  </a>
                  <a href="mailto:shami.fadi@gmx.de" className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Email">
                    <span className="text-white text-sm">✉️</span>
                  </a>
                  <a href="https://buymeacoffee.com/halawanyfav" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#FFDD00] flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Buy me a coffee">
                    <span className="text-black text-sm">☕</span>
                  </a>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-white">روابط سريعة</h4>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li><Link to="/" className="hover:text-[#00b894] transition-colors">الرئيسية (Home)</Link></li>
                  <li><Link to="/about" className="hover:text-[#00b894] transition-colors">من نحن</Link></li>
                  <li><Link to="/dashboard" className="hover:text-[#00b894] transition-colors">لوحة التحكم</Link></li>
                  <li><Link to="/einstufung" className="hover:text-[#00b894] transition-colors">تحديد المستوى</Link></li>
                  <li><Link to="/resources" className="hover:text-[#00b894] transition-colors">المصادر</Link></li>
                  <li><Link to="/contact" className="hover:text-[#00b894] transition-colors">اتصل بنا</Link></li>
                </ul>
              </div>

              {/* Column 3: المستويات (Goethe & TELC) */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-white">المستويات للامتحانات</h4>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li><Link to="/a1" className="hover:text-[#00b894] transition-colors">مستوى A1</Link></li>
                  <li><Link to="/a2" className="hover:text-[#00b894] transition-colors">مستوى A2</Link></li>
                  <li><Link to="/b1" className="hover:text-[#00b894] transition-colors">مستوى B1</Link></li>
                  <li><Link to="/b2-hub" className="hover:text-[#00b894] transition-colors">مستوى B2</Link></li>
                  <li><Link to="/c1" className="hover:text-[#00b894] transition-colors">مستوى C1</Link></li>
                </ul>
              </div>

              {/* Column 4: DTZ A2-B1 */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-white">امتحان الاندماج (DTZ)</h4>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li><Link to="/dtz" className="hover:text-[#00b894] transition-colors font-bold text-white/90">بوابة DTZ الشاملة</Link></li>
                  <li><Link to="/lesen" className="hover:text-[#00b894] transition-colors">القراءة (Lesen)</Link></li>
                  <li><Link to="/hoeren" className="hover:text-[#00b894] transition-colors">الاستماع (Hören)</Link></li>
                  <li><Link to="/schreiben" className="hover:text-[#00b894] transition-colors">الكتابة (Schreiben)</Link></li>
                  <li><Link to="/sprechen" className="hover:text-[#00b894] transition-colors">المحادثة (Sprechen)</Link></li>
                </ul>
              </div>

              {/* Column 5: Leben in Deutschland */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-white">الحياة في ألمانيا</h4>
                <ul className="space-y-2.5 text-sm text-white/60">
                  <li><Link to="/leben" className="hover:text-[#00b894] transition-colors font-bold text-white/90">بوابة Leben in Deutschland</Link></li>
                  <li><Link to="/leben" className="hover:text-[#00b894] transition-colors">جميع الأسئلة الـ 300</Link></li>
                  <li><Link to="/leben" className="hover:text-[#00b894] transition-colors">أسئلة المقاطعات</Link></li>
                  <li><Link to="/einbuergerung" className="hover:text-[#00b894] transition-colors">اختبار الجنسية التجريبي</Link></li>
                  <li><Link to="/emergency" className="hover:text-[#00b894] transition-colors">أرقام الطوارئ والمساعدة</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
              <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                <p>© 2026 B1-Syrer. All rights reserved.</p>
                <span className="hidden md:inline">•</span>
                <p>Independent exam prep — not affiliated with or endorsed by any examination body.</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0 font-medium">
                <a href="mailto:shami.fadi@gmx.de?subject=Report%20Issue" className="flex items-center gap-1 hover:text-[#00b894] transition-colors">⚑ إبلاغ عن مشكلة (Report Issue)</a>
                <a href="mailto:shami.fadi@gmx.de?subject=Feedback" className="flex items-center gap-1 hover:text-[#00b894] transition-colors">💬 شاركنا رأيك (Feedback)</a>
                <span className="text-white/20 hidden sm:inline">|</span>
                <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
                <a href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية (Privacy Policy)</a>
                <a href="/agb" className="hover:text-white transition-colors">شروط الخدمة (Terms of Service)</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </>
      )}
    </div>
  )
}
