import { Link, useLocation } from 'react-router-dom'
import { type ReactNode, useState, useEffect } from 'react'

const navItems = [
  { path: '/', label: 'الرئيسية', icon: '🏠' },
  { path: '/lesen', label: 'القراءة', icon: '📖' },
  { path: '/hoeren', label: 'الاستماع', icon: '🎧' },
  { path: '/schreiben', label: 'الكتابة', icon: '✍️' },
  { path: '/sprechen', label: 'المحادثة', icon: '🗣️' },
  { path: '/grammar', label: 'القواعد', icon: '📐' },
  { path: '/vocabulary', label: 'المفردات', icon: '📚' },
  { path: '/sprachbausteine', label: 'Sprachbausteine', icon: '🧩' },
  { path: '/leben', label: 'الحياة في ألمانيا', icon: '🇩🇪' },
  { path: '/b2', label: 'B2', icon: '🎓' },
  { path: '/premium', label: 'الاشتراك', icon: '⭐' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [lang, setLang] = useState('ar')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false)
    setLangMenuOpen(false)
  }, [location.pathname])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-bg text-ink relative transition-colors duration-300 pb-12 pt-24 lg:pt-28">
        {/* Animated background grid & orbs */}
        <div className="bg-grid" aria-hidden="true"></div>
        <div className="bg-glow bg-glow-1" aria-hidden="true"></div>
        <div className="bg-glow bg-glow-2" aria-hidden="true"></div>
        <div className="bg-glow bg-glow-3" aria-hidden="true"></div>

        {/* FadiHalawani Style Header */}
        <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
          <div className="nav-inner">
            {/* Logo */}
            <Link to="/" className="nav-logo">
              <div className="nav-logo-img-circle">B1</div>
              <div className="nav-logo-text-wrap">
                <span className="nav-logo-name">B1-Syrer.de</span>
                <span className="nav-logo-role">سوري 🇸🇾 ➔ 🇩🇪 ألمانيا</span>
              </div>
            </Link>

            {/* Desktop Links (1024px+) */}
            <ul className="nav-links">
              {navItems.slice(0, 9).map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/premium"
                  className={`nav-cta ${location.pathname === '/premium' ? 'active' : ''}`}
                >
                  الاشتراك ⭐
                </Link>
              </li>
            </ul>

            {/* Right Controls */}
            <div className="nav-right">
              {/* Theme toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="theme-toggle-btn"
                aria-label="تبديل المظهر"
                title="تبديل المظهر"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Language Selector */}
              <div className={`mofa-lang-switcher ${langMenuOpen ? 'open' : ''}`}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="mofa-lang-trigger"
                  aria-haspopup="true"
                  aria-expanded={langMenuOpen}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" className="mofa-globe-icon">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.1923 12.7115C16.0758 12.4321 15.8027 12.25 15.5 12.25C15.1972 12.25 14.9241 12.4321 14.8076 12.7115L12.3076 18.7115C12.1483 19.0939 12.3291 19.533 12.7115 19.6923C13.0938 19.8516 13.5329 19.6708 13.6923 19.2885L14.3333 17.75H16.6666L17.3076 19.2885C17.467 19.6708 17.9061 19.8516 18.2884 19.6923C18.6708 19.533 18.8516 19.0939 18.6923 18.7115L16.1923 12.7115ZM15.5 14.95L16.0416 16.25H14.9583L15.5 14.95Z"></path>
                    <path d="M8.15 4.25C8.56421 4.25 8.9 4.58579 8.9 5V5.21552H12C12.4142 5.21552 12.75 5.5513 12.75 5.96552C12.75 6.37973 12.4142 6.71552 12 6.71552H10.7973C10.4274 7.74664 9.85464 8.71119 9.21395 9.57728L10.1155 10.5145C10.4027 10.8131 10.3935 11.2879 10.0949 11.575C9.79642 11.8622 9.32163 11.8529 9.03448 11.5544L8.26126 10.7506C7.65985 11.4317 7.04053 12.0391 6.48266 12.5521C6.17775 12.8324 5.7033 12.8126 5.42293 12.5077C5.14256 12.2028 5.16244 11.7283 5.46735 11.4479C6.0382 10.923 6.66238 10.3072 7.2537 9.62414C7.12848 9.4632 7.00289 9.29589 6.88542 9.13299C6.64973 8.80615 6.40843 8.44486 6.28521 8.18047C6.11023 7.80503 6.27273 7.35883 6.64817 7.18384C7.02361 7.00886 7.46981 7.17137 7.64479 7.5468C7.70157 7.66862 7.86527 7.92724 8.10208 8.25565C8.13755 8.30483 8.1738 8.35441 8.21052 8.40399C8.59222 7.85898 8.92551 7.29315 9.18194 6.71552H5C4.58579 6.71552 4.25 6.37973 4.25 5.96552C4.25 5.5513 4.58579 5.21552 5 5.21552H7.4V5C7.4 4.58579 7.73579 4.25 8.15 4.25Z"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.45109 1.25H9.54891C11.1512 1.24999 12.4205 1.24998 13.4248 1.36868C14.4557 1.49055 15.3044 1.74638 16.0134 2.3282C16.2539 2.52558 16.4744 2.74612 16.6718 2.98663C17.3772 3.8462 17.6099 4.92342 17.6958 6.30423C19.0763 6.39008 20.1536 6.62257 21.0134 7.3282C21.25 7.52558 21.4744 7.74612 21.6718 7.98663C22.2536 8.69558 22.5095 9.54428 22.6313 10.5752C22.75 11.5795 22.75 12.8488 22.75 14.451V14.5489C22.75 16.1511 22.75 17.4205 22.6313 18.4248C22.5095 19.4557 22.2536 20.3044 21.6718 21.0134C21.4744 21.25 21.25 21.4744 21.0134 21.6718C20.3044 22.2536 19.4557 22.5095 18.4248 22.6313C17.4205 22.75 16.1512 22.75 14.5 22.75H14.4511C12.8489 22.75 11.5795 22.75 10.5752 22.6313C9.54428 22.5095 8.69558 22.2536 7.98663 21.6718C7.74612 21.4744 7.52558 21.25 7.3282 21.0134C6.62278 20.1538 6.39007 19.0766 6.30421 17.6958C4.92341 17.6099 3.8462 17.3772 2.98663 16.6718C2.74612 16.4744 2.52558 16.2539 2.3282 16.0134C1.74638 15.3044 1.49055 14.4557 1.36868 13.4248C1.24998 12.4205 1.24999 11.1512 1.25 9.54891V9.45109C1.24999 7.84883 1.24998 6.57947 1.36868 5.57525C1.49055 4.54428 1.74638 3.69558 2.3282 2.98663C2.52558 2.74612 2.74612 2.52558 2.98663 2.3282C3.69558 1.74638 4.54428 1.49055 5.57525 1.36868C6.57947 1.24998 7.84883 1.24999 9.45109 1.25ZM7.78429 17.2769C7.8525 18.7782 8.04964 19.528 8.48772 20.0618C8.62277 20.2263 8.77366 20.3772 8.93822 20.5123C9.33563 20.8384 9.86197 21.0366 10.7513 21.1417C11.6572 21.2488 12.8379 21.25 14.5 21.25C16.1621 21.25 17.3428 21.2488 18.2487 21.1417C19.138 21.0366 19.6644 20.8384 20.0618 20.5123C20.2263 20.3772 20.3772 20.2263 20.5123 20.0618C20.8384 19.6644 21.1417 18.2487 21.1417 18.2487C21.2488 17.3428 21.25 16.1621 21.25 14.5C21.25 12.8379 21.2488 11.6572 21.1417 10.7513C21.0366 9.86197 20.8384 9.33563 20.5123 8.93822C20.3772 8.77366 20.2263 8.62277 20.0618 8.48772C19.5307 8.05189 18.7855 7.85431 17.2979 7.78524L7.78429 17.2769ZM16.2167 6.74509C16.1494 5.22909 15.9525 4.47463 15.5123 3.93822C15.3772 3.77366 15.2263 3.62277 15.0618 3.48772C14.6644 3.16158 14.138 2.96344 13.2487 2.85831C12.3428 2.75123 11.1621 2.75 9.5 2.75C7.83789 2.75 6.65724 2.75123 5.75133 2.85831C4.86197 2.96344 4.33563 3.16158 3.93822 3.48772C3.77366 3.62277 3.62277 3.77366 3.48772 3.93822C3.16158 4.33563 2.96344 4.86197 2.85831 5.75133C2.75123 6.65724 2.75 7.83789 2.75 9.5C2.75 11.1621 2.75123 12.3428 2.85831 13.2487C2.96344 14.138 3.16158 14.6644 3.48772 15.0618C3.62277 15.2263 3.77366 15.3772 3.93822 15.5123C4.47215 15.9505 5.22213 16.1476 6.72412 16.2158L16.2167 6.74509Z"></path>
                  </svg>
                  <span className="mofa-active-lang-text">{lang === 'ar' ? 'العربية' : 'Deutsch'}</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" className="mofa-chevron-icon">
                    <path d="M1.5031 1.1294C1.60467 1.26388 1.90793 1.66534 2.08853 1.89676C2.45026 2.36027 2.94452 2.97618 3.47769 3.59026C4.01356 4.20744 4.57648 4.80852 5.07658 5.25039C5.32734 5.47195 5.54762 5.64031 5.72939 5.74989C5.90035 5.85296 6.00134 5.87439 6.00134 5.87439C6.00134 5.87439 6.09936 5.85295 6.27031 5.7499C6.45209 5.64032 6.67237 5.47196 6.92313 5.25039C7.42322 4.80852 7.98615 4.20744 8.52201 3.59025C9.05518 2.97616 9.54944 2.36025 9.91117 1.89673C10.0918 1.66531 10.3946 1.26442 10.4962 1.12994C10.7009 0.852004 11.0925 0.792058 11.3705 0.996751C11.6484 1.20145 11.7078 1.59269 11.5031 1.87063L11.5015 1.87273C11.395 2.01376 11.0809 2.42963 10.8966 2.66577C10.5267 3.13975 10.018 3.77384 9.46589 4.40976C8.91646 5.04257 8.31173 5.69149 7.7508 6.18712C7.47105 6.4343 7.18747 6.65656 6.91567 6.82042C6.66102 6.97393 6.33861 7.125 5.99985 7.125C5.66109 7.125 5.33868 6.97393 5.08404 6.82041C4.81223 6.65656 4.52866 6.4343 4.24891 6.18712C3.68798 5.69149 3.08325 5.04258 2.53382 4.40977C1.98169 3.77386 1.473 3.13978 1.1031 2.6658C0.918709 2.42953 0.60464 2.01371 0.4983 1.87292L0.4969 1.87107C0.292204 1.59313 0.351284 1.20149 0.629218 0.996793C0.907143 0.792105 1.2984 0.851493 1.5031 1.1294Z"></path>
                  </svg>
                </button>
                <div className="mofa-lang-menu">
                  <button
                    className={`mofa-lang-option ${lang === 'ar' ? 'active' : ''}`}
                    onClick={() => {
                      setLang('ar')
                      setLangMenuOpen(false)
                    }}
                  >
                    العربية
                  </button>
                  <button
                    className={`mofa-lang-option ${lang === 'de' ? 'active' : ''}`}
                    onClick={() => {
                      setLang('de')
                      setLangMenuOpen(false)
                    }}
                  >
                    Deutsch
                  </button>
                </div>
              </div>

              {/* Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
                aria-label="تبديل القائمة"
                aria-expanded={mobileMenuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
          {children}
        </main>

        {/* FadiHalawani Style 4-Column Footer */}
        <footer>
          <div className="footer-accent-bar"></div>
          <div className="footer-main">
            <div className="container">
              <div className="footer-grid">
                
                {/* Column 1: Brand details */}
                <div className="footer-brand">
                  <div className="footer-logo-wrap">
                    <div className="footer-logo-circle">B1</div>
                    <div>
                      <div className="footer-name">B1-Syrer.de</div>
                      <div className="footer-tagline">سوري 🇸🇾 ➔ 🇩🇪 ألمانيا</div>
                    </div>
                  </div>
                  <p className="footer-desc">
                    منصة سورية تفاعلية مجانية متكاملة لتحضير امتحان اللغة الألمانية B1 وقواعدها للعرب والسوريين.
                  </p>
                  
                  {/* Social Icons */}
                  <div className="footer-socials">
                    <a href="https://t.me/b1syrer" target="_blank" rel="noopener noreferrer" className="fsoc" aria-label="Telegram" title="Telegram Channel">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.95 1.23-5.5 3.63-.52.36-.97.53-1.35.52-.42-.01-1.23-.24-1.83-.43-.74-.24-1.33-.37-1.28-.79.03-.22.33-.45.9-.69 3.51-1.53 5.85-2.54 7.03-3.03 3.35-1.39 4.05-1.63 4.5-.14zm0 0" />
                      </svg>
                    </a>
                    <a href="mailto:shami.fadi@gmx.de" className="fsoc" aria-label="Email" title="Email Us">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="fsoc" aria-label="YouTube" title="YouTube Channel">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.502 6.163C0 8.018 0 12 0 12s0 3.982.502 5.837a3.003 3.003 0 002.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.982 24 12 24 12s0-3.982-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Column 2: Exam modules */}
                <div className="footer-col">
                  <h4 className="footer-col-title">أقسام الامتحان</h4>
                  <ul>
                    <li><Link to="/lesen">اختبار القراءة (Lesen)</Link></li>
                    <li><Link to="/hoeren">اختبار الاستماع (Hören)</Link></li>
                    <li><Link to="/schreiben">اختبار الكتابة (Schreiben)</Link></li>
                    <li><Link to="/sprechen">اختبار المحادثة (Sprechen)</Link></li>
                    <li><Link to="/sprachbausteine">إكمال الفراغات (Sprachbausteine)</Link></li>
                  </ul>
                </div>

                {/* Column 3: Secondary items */}
                <div className="footer-col">
                  <h4 className="footer-col-title">أقسام أخرى</h4>
                  <ul>
                    <li><Link to="/grammar">قواعد اللغة B1</Link></li>
                    <li><Link to="/vocabulary">قاموس المفردات</Link></li>
                    <li><Link to="/leben">الحياة في ألمانيا (Leben in DE)</Link></li>
                    <li><Link to="/b2">المستوى المتقدّم B2</Link></li>
                  </ul>
                </div>

                {/* Column 4: Contact details */}
                <div className="footer-col">
                  <h4 className="footer-col-title">تواصل معنا</h4>
                  <ul className="footer-contact-list">
                    <li>
                      <span className="fci">📍</span>
                      <span>Wuppertal, Germany</span>
                    </li>
                    <li>
                      <span className="fci">✉️</span>
                      <a href="mailto:shami.fadi@gmx.de">shami.fadi@gmx.de</a>
                    </li>
                    <li>
                      <span className="fci">🌐</span>
                      <a href="https://b1-syrer.de">b1-syrer.de</a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom">
            <div className="container">
              <div className="footer-bottom-inner">
                <span id="footer-copy">© 2026 B1-Syrer.de. جميع الحقوق محفوظة لـ فادي الحلواني.</span>
                <div className="footer-legal-links">
                  <Link to="/about">من نحن</Link>
                  <span className="sep">|</span>
                  <Link to="/premium">شروط الاستخدام</Link>
                </div>
                <span className="footer-made">صنع بحب 💚 في Wuppertal</span>
                <div className="footer-langs">
                  <span>AR</span>
                  <span className="sep">•</span>
                  <span>DE</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
