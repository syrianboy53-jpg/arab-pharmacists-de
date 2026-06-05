import { Link, useLocation } from 'react-router-dom'
import { type ReactNode, useState, useEffect } from 'react'

const navItems = [
  { path: '/', label: 'الرئيسية', icon: '🏠' },
  { path: '/lesen', label: 'القراءة', icon: '📖' },
  { path: '/hoeren', label: 'الاستماع', icon: '🎧' },
  { path: '/schreiben', label: 'الكتابة', icon: '✍️' },
  { path: '/sprechen', label: 'المحادثة', icon: '🗣️' },
  { path: '/chat-simulator', label: 'المحادث الذكي', icon: '💬' },
  { path: '/slang', label: 'قاموس العامية', icon: '🔥' },
  { path: '/grammar', label: 'القواعد', icon: '📐' },
  { path: '/vocabulary', label: 'المفردات', icon: '📚' },
  { path: '/sprachbausteine', label: 'عناصر اللغة', icon: '🧩' },
  { path: '/leben', label: 'الحياة في ألمانيا', icon: '🇩🇪' },
  { path: '/b2', label: 'B2', icon: '🎓' },
  { path: '/premium', label: 'Premium', icon: '⭐' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)
  
  // Update/Announcement states
  const [announcement, setAnnouncement] = useState('')
  const [announcementColor, setAnnouncementColor] = useState('#CE1126')
  const [updateAlert, setUpdateAlert] = useState(false)
  const [apkUrl, setApkUrl] = useState('https://www.b1-syrer.de/b1-deutsch.apk')

  useEffect(() => {
    // Fetch live config
    fetch('/config')
      .then(res => res.json())
      .then(data => {
        if (data.announcement) {
          setAnnouncement(data.announcement)
        }
        if (data.announcement_color) {
          setAnnouncementColor(data.announcement_color)
        }
        if (data.apk_url) {
          setApkUrl(data.apk_url)
        }
        
        // Version check for APK
        const userAgent = navigator.userAgent || ''
        const isApk = userAgent.includes('B1DeutschAPK') || (window as any).isB1DeutschAPK
        
        if (isApk) {
          let currentVersion = 1 // default legacy version code
          const match = userAgent.match(/B1DeutschAPK\/([0-9.]+)/)
          if (match && match[1]) {
            currentVersion = parseInt(match[1]) || 1
          } else if ((window as any).b1ApkVersion) {
            currentVersion = (window as any).b1ApkVersion
          }
          
          // Latest version from config (usually versionCode)
          const latestVersionStr = data.apk_version || '1'
          const latestVersion = parseInt(latestVersionStr) || 1
          
          if (latestVersion > currentVersion) {
            setUpdateAlert(true)
          }
        }
      })
      .catch(err => console.error('Error fetching config:', err))
  }, [])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-bg-light dark:bg-gray-900">
        {/* Announcement Banner */}
        {announcement && (
          <div 
            style={{ backgroundColor: announcementColor }} 
            className="text-white text-center py-2 px-4 text-xs font-bold flex items-center justify-center gap-2 relative z-50 shadow-sm"
          >
            <span>📢</span>
            <span>{announcement}</span>
          </div>
        )}

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

        {/* APK Update Alert */}
        {updateAlert && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md bg-gradient-to-r from-emerald-700 to-green-900 text-white rounded-2xl p-5 shadow-2xl z-50 border border-emerald-500/20 animate-slideUp">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🚀</span>
              <div className="flex-1 space-y-1">
                <h4 className="font-bold text-sm">يتوفر تحديث جديد للتطبيق!</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  يتوفر إصدار جديد من التطبيق بميزات محسنة وتصميم محدث. يرجى تثبيت التحديث لتجنب توقف أي من الميزات الحالية.
                </p>
                <div className="pt-2 flex gap-2">
                  <a 
                    href={apkUrl} 
                    className="bg-white text-emerald-950 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-emerald-50 transition-colors"
                  >
                    📥 تحميل التحديث (APK)
                  </a>
                  <button 
                    onClick={() => setUpdateAlert(false)} 
                    className="text-xs text-white/60 hover:text-white px-2 py-1.5"
                  >
                    لاحقاً
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
