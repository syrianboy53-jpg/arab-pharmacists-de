import { Link, useLocation } from 'react-router-dom'
import { type ReactNode, useState, useEffect } from 'react'
import { Home, BookOpen, LayoutGrid, Menu } from 'lucide-react'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)
  const [updateUrl, setUpdateUrl] = useState<string | null>(null)

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


  return (
    <div className={darkMode ? 'dark' : ''}>
      {updateUrl && (
        <div className="bg-yellow-500 text-gray-900 px-4 py-2 text-center text-sm font-bold shadow-md flex items-center justify-center gap-2 z-50 border-b border-yellow-600 animate-pulse">
          <span>📢 تحديث جديد هام لتطبيق الأندرويد متوفر الآن!</span>
          <a
            href={updateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-colors inline-block"
          >
            تحميل التحديث المباشر ⬇️
          </a>
        </div>
      )}
      <div className="min-h-screen bg-bg-light dark:bg-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/app/#/" className="flex items-center gap-2 text-xl font-bold text-green">
              <span className="bg-green text-white px-2 py-0.5 rounded text-sm">B1</span>
              <span>Deutsch للعرب والسوريين</span>
            </a>
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
            <div className="flex justify-around items-center border-t border-gray-100 dark:border-gray-700 pt-2">
              <a href="/app/#/" className={`flex flex-col items-center p-2 rounded-xl transition-all`}>
                <Home size={24} className="mb-1" />
                <span className="text-xs font-medium">الرئيسية</span>
              </a>
              
              <a href="/app/#/lernzentrum" className={`flex flex-col items-center p-2 rounded-xl transition-all`}>
                <BookOpen size={24} className="mb-1" />
                <span className="text-xs font-medium">دروسي</span>
              </a>

              <a href="/app/#/tools" className={`flex flex-col items-center p-2 rounded-xl transition-all`}>
                <LayoutGrid size={24} className="mb-1" />
                <span className="text-xs font-medium">المركز</span>
              </a>

              <a href="/app/#/more" className={`flex flex-col items-center p-2 rounded-xl transition-all`}>
                <Menu size={24} className="mb-1" />
                <span className="text-xs font-medium">المزيد</span>
              </a>
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
