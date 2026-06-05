import { Link, useLocation } from 'react-router-dom'
import { type ReactNode, useState } from 'react'

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
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-bg-light dark:bg-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-green">
              <span className="bg-green text-white px-2 py-0.5 rounded text-sm">B1</span>
              <span>Deutsch للعرب والسوريين</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="تبديل الوضع الليلي"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          {/* Navigation */}
          <nav className="max-w-6xl mx-auto px-4 pb-2 overflow-x-auto">
            <div className="flex gap-2 whitespace-nowrap">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-green text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green/10'
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-green-deep text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm opacity-80">
              © 2026 B1 Deutsch للعرب والسوريين – تطبيق تحضير امتحان B1 الألماني. جميع النماذج للتدريب فقط وليست أسئلة رسمية.
            </p>
            <div className="mt-4 flex justify-center gap-4 text-sm">
              <Link to="/about" className="hover:text-gold">عن التطبيق</Link>
              <a href="https://t.me/b1syrer" className="hover:text-gold">تليغرام</a>
              <a href="mailto:shami.fadi@gmx.de" className="hover:text-gold">تواصل معنا</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
