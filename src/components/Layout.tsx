import { Link, useLocation } from 'react-router-dom'
import { type ReactNode, useState, useEffect } from 'react'

const navItems = [
  { path: '/', label: 'الرئيسية', icon: '🏠' },
  { path: '/lesen', label: 'القراءة', icon: '📖' },
  { path: '/hoeren', label: 'الاستماع', icon: '🎧' },
  { path: '/schreiben', label: 'الكتابة', icon: '✍️' },
  { path: '/sprechen', label: 'المحادثة', icon: '🗣️' },
  { path: '/chat-simulator', label: 'محاكي المحادثة', icon: '💬' },
  { path: '/slang', label: 'قاموس العامية', icon: '🔥' },
  { path: '/grammar', label: 'القواعد', icon: '📐' },
  { path: '/vocabulary', label: 'المفردات', icon: '📚' },
  { path: '/sprachbausteine', label: 'Sprachbausteine', icon: '🧩' },
  { path: '/leben', label: 'الحياة في ألمانيا', icon: '🇩🇪' },
  { path: '/b2', label: 'B2', icon: '🎓' },
  { path: '/premium', label: 'Premium', icon: '⭐' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme-mode') === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
      localStorage.setItem('theme-mode', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme-mode', 'light')
    }
  }, [darkMode])

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Background decorations */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow-1" aria-hidden="true" />
      <div className="bg-glow bg-glow-2" aria-hidden="true" />

      <div className="min-h-screen bg-transparent relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0c1a20]/80 backdrop-blur-md border-b border-border dark:border-border shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-xl font-black text-green hover:opacity-90 transition-opacity">
              <span className="bg-gradient-to-br from-green to-gold text-white font-extrabold px-3 py-1 rounded-xl shadow-md text-sm tracking-wide">B1</span>
              <span className="bg-gradient-to-r from-green to-gold bg-clip-text text-transparent">Deutsch للعرب والسوريين</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-border hover:border-gold/30 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-all cursor-pointer shadow-sm text-lg"
                aria-label="تبديل الوضع الليلي"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          
          {/* Navigation - Styled as modern capsules */}
          <nav className="max-w-6xl mx-auto px-4 pb-3 overflow-x-auto scrollbar-none">
            <div className="flex gap-2 whitespace-nowrap py-1">
              {navItems.map(item => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm border ${
                      isActive
                        ? 'bg-gradient-to-r from-green to-green-dark text-white border-green/20 scale-102 shadow-green/10'
                        : 'bg-white dark:bg-gray-800 text-txt-m dark:text-gray-300 border-border hover:border-gold/30 hover:bg-gray-50 dark:hover:bg-gray-750'
                    }`}
                  >
                    <span className="ml-1">{item.icon}</span> {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-green-deep to-[#00201b] text-white py-12 mt-16 border-t border-green/10 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 relative z-10 text-center space-y-6">
            <p className="text-sm leading-relaxed opacity-90 max-w-2xl mx-auto">
              © 2026 B1 Deutsch للعرب والسوريين – تطبيق تفاعلي مجاني لتحضير امتحان B1 الألماني. جميع النماذج والأسئلة للتدريب فقط وليست أسئلة رسمية.
            </p>
            <div className="flex justify-center flex-wrap gap-6 text-sm font-bold">
              <Link to="/about" className="text-white hover:text-gold transition-colors">عن التطبيق</Link>
              <a href="https://t.me/b1syrer" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors">تليغرام</a>
              <a href="mailto:shami.fadi@gmx.de" className="text-white hover:text-gold transition-colors">تواصل معنا</a>
            </div>
          </div>
          {/* Subtle overlay grid for footer */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        </footer>
      </div>
    </div>
  )
}
