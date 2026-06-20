import { useState, useEffect, useMemo } from 'react'

const API_BASE = 'https://www.b1-syrer.de'

interface UserRecord {
  id: number
  email: string
  display_name: string | null
  created_at: string
  progress_entries: number
  streak_current: number
  streak_longest: number

  subscription_id: number | null
  subscription_status: string | null
}


interface DBStats {
  total_users: number
  today_users: number
  week_users: number
  active_users: number
  total_progress_entries: number
  total_visitors?: number
  today_visitors?: number
  week_visitors?: number
  latest_visitors?: Array<{
    id: number
    created_at: string
    ip_address: string
    country: string
    user_agent: string
    path?: string
  }>
  top_countries?: Array<{
    country: string
    count: number
  }>
}



function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode === 'unknown' || countryCode.length !== 2) return '❓';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function getPathLabel(path?: string) {
  if (!path) return '🏠 الرئيسية (الهبوط)';
  
  let cleanPath = path.trim();
  if (cleanPath.includes('?')) {
    cleanPath = cleanPath.split('?')[0];
  }
  
  const items: Record<string, string> = {
    '/': '🏠 الرئيسية (الهبوط)',
    '/index.html': '🏠 الرئيسية (الهبوط)',
    '/app/': '🏠 الرئيسية (التطبيق)',
    '/app/#/': '🏠 الرئيسية (التطبيق)',
    '/app/#/lesen': '📖 القراءة',
    '/app/#/hoeren': '🎧 الاستماع',
    '/app/#/schreiben': '✍️ الكتابة',
    '/app/#/sprechen': '🗣️ المحادثة',
    '/app/#/chat-simulator': '💬 محاكي المحادثة',
    '/app/#/slang': '🔥 قاموس العامية',
    '/app/#/grammar': '📐 القواعد',
    '/app/#/vocabulary': '📚 المفردات',
    '/app/#/sprachbausteine': '🧩 Sprachbausteine',
    '/app/#/leben': '🇩🇪 الحياة في ألمانيا',
    '/app/#/b2': '🎓 B2',

    '/app/#/admin': '🔑 لوحة التحكم',
    '/app/#/about': 'ℹ️ عن التطبيق',
    '/app/#/einstufung': '📊 تحديد المستوى',
    '/app/#/satzbau': '🧩 بناء الجمل',
    '/app/#/drill': '🏋️ تدريب مكثف',
    '/app/#/synonyms': '🔗 المترادفات',
    '/app/#/fehler': '❌ تصحيح الأخطاء'
  };

  if (items[cleanPath]) return items[cleanPath];

  const internalRoute = cleanPath.replace('/app/#', '');
  if (items[`/app/#${internalRoute}`]) return items[`/app/#${internalRoute}`];
  if (items[internalRoute]) return items[internalRoute];

  return cleanPath;
}

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('b1-admin-auth') === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Settings config states
  const [config, setConfig] = useState({
    announcement: '',
    announcement_color: '#CE1126',
    web_version: '19',
    web_changelog: '',
    apk_version: '19',
    apk_changelog: '',
    apk_url: 'https://b1-syrer.de/b1-deutsch.apk',
    support_bmc_url: 'https://buymeacoffee.com/halawanyfav',
    support_paypal_url: '',
    support_message: '',
    support_hide: '0'
  })
  const [isSavingConfig, setIsSavingConfig] = useState(false)
  const [configStatus, setConfigStatus] = useState('')

  // Tokens and general dashboard states
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('b1-admin-api-token') || '')
  
  // Users list
  const [users, setUsers] = useState<UserRecord[]>([])
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState('')
  const [usersStats, setUsersStats] = useState<DBStats | null>(null)
  const [userSearch, setUserSearch] = useState('')



  // FCM and Push
  const [pushTitle, setPushTitle] = useState('')
  const [pushBody, setPushBody] = useState('')
  const [pushUrl, setPushUrl] = useState('')
  const [pushStats, setPushStats] = useState<{ active_devices: number; fcm_configured: boolean; history: any[] } | null>(null)
  const [isPushSending, setIsPushSending] = useState(false)
  const [pushStatus, setPushStatus] = useState('')

  // Suggestions mailbox
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
  const [suggestionsFilter, setSuggestionsFilter] = useState('all')
  const [unreadSuggestionsCount, setUnreadSuggestionsCount] = useState(0)

  // APK Download stats
  const [downloadStats, setDownloadStats] = useState<{ total: number; today: number; week: number; by_day: any[] } | null>(null)
  const [downloadError, setDownloadError] = useState('')

  // Message templates
  const [templates, setTemplates] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('b1-admin-templates') || '[]')
    } catch { return [] }
  })
  const [templateAr, setTemplateAr] = useState('')
  const [templateDe, setTemplateDe] = useState('')
  const [templateBodyDe, setTemplateBodyDe] = useState('')
  const [templateHintAr, setTemplateHintAr] = useState('')

  // Custom Leben questions
  const [customQuestions, setCustomQuestions] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('b1-admin-leben') || '[]')
    } catch { return [] }
  })
  const [questionDe, setQuestionDe] = useState('')
  const [questionAnswers, setQuestionAnswers] = useState(['', '', '', ''])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0)
  const [questionExplanation, setQuestionExplanation] = useState('')

  // Change password states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Local storage quick stats (for streak, studies, etc.)
  const studyStats = useMemo(() => {
    try {
      const keys = Object.keys(localStorage)
      const answered = JSON.parse(localStorage.getItem('b1-leben-answered') || '[]').length
      const favs = JSON.parse(localStorage.getItem('b1-leben-favorites') || '[]').length
      const streak = JSON.parse(localStorage.getItem('b1-streak') || '{"current":0,"longest":0,"total":0}')
      return {
        totalKeys: keys.filter(k => k.startsWith('b1-')).length,
        lebenAnswered: answered,
        lebenFavs: favs,
        streak
      }
    } catch {
      return { totalKeys: 0, lebenAnswered: 0, lebenFavs: 0, streak: { current: 0, longest: 0, total: 0 } }
    }
  }, [])

  // Auto load data on login and token restore
  useEffect(() => {
    if (authenticated && adminToken.trim()) {
      fetchData()
      fetchPushStats()
      fetchConfig()
    }
  }, [authenticated, adminToken])

  useEffect(() => {
    if (authenticated && adminToken.trim()) {
      fetchSuggestions()
    }
  }, [authenticated, adminToken, suggestionsFilter])

  useEffect(() => {
    fetchDownloadStats()
    const timer = setInterval(fetchDownloadStats, 60000)
    return () => clearInterval(timer)
  }, [])

  async function handleLogin() {
    if (isLoggingIn) return
    setIsLoggingIn(true)
    setLoginError('')
    try {
      const res = await fetch(`${API_BASE}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (res.ok) {
        sessionStorage.setItem('b1-admin-auth', '1')
        setAuthenticated(true)
        setLoginError('')
        setPassword('')
      } else if (res.status === 401) {
        setLoginError('كلمة المرور غير صحيحة')
      } else {
        setLoginError(`خطأ في السيرفر (${res.status}) ${await res.text()}`)
      }
    } catch (err: any) {
      setLoginError(`تعذّر الاتصال: ${err.message}`)
    } finally {
      setIsLoggingIn(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('b1-admin-auth')
    setAuthenticated(false)
  }

  function handleTokenChange(val: string) {
    setAdminToken(val)
    localStorage.setItem('b1-admin-api-token', val.trim())
  }

  async function fetchData() {
    fetchUsers()
  }

  async function fetchUsers(search = '') {
    if (!adminToken.trim()) {
      setUsersError('أدخل Admin API Token أولاً.')
      return
    }
    setIsUsersLoading(true)
    setUsersError('')
    try {
      const headers = { 'X-Admin-Token': adminToken.trim() }
      const [statsRes, listRes] = await Promise.all([
        fetch(`${API_BASE}/admin/stats`, { headers }),
        fetch(`${API_BASE}/admin/users?limit=200${search ? `&search=${encodeURIComponent(search)}` : ''}`, { headers })
      ])
      if (!statsRes.ok || !listRes.ok) {
        throw new Error(statsRes.status === 401 || listRes.status === 401 ? 'Token غير صحيح.' : 'فشل الجلب من الخادم.')
      }
      setUsersStats(await statsRes.json())
      setUsers(await listRes.json())
    } catch (err: any) {
      setUsersError(err.message)
    } finally {
      setIsUsersLoading(false)
    }
  }



  async function fetchPushStats() {
    if (!adminToken.trim()) return
    try {
      const res = await fetch(`${API_BASE}/admin/push/stats`, {
        headers: { 'X-Admin-Token': adminToken.trim() }
      })
      if (res.ok) {
        setPushStats(await res.json())
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchConfig() {
    try {
      const res = await fetch(`${API_BASE}/config`)
      if (res.ok) {
        const data = await res.json()
        setConfig(c => ({ ...c, ...data }))
      }
    } catch {}
  }

  async function saveConfig() {
    if (!adminToken.trim()) {
      setConfigStatus('❌ أدخل Admin API Token أولاً.')
      return
    }
    setIsSavingConfig(true)
    setConfigStatus('')
    try {
      const res = await fetch(`${API_BASE}/admin/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken.trim()
        },
        body: JSON.stringify(config)
      })
      if (res.ok) {
        setConfigStatus('✅ تم حفظ الإعدادات بنجاح.')
      } else {
        setConfigStatus(`❌ فشل الحفظ (${res.status})`)
      }
    } catch (err: any) {
      setConfigStatus(`❌ خطأ: ${err.message}`)
    } finally {
      setIsSavingConfig(false)
    }
  }



  async function deleteUser(userId: number, email: string) {
    if (!confirm(`حذف المستخدم ${email}؟ لا يمكن التراجع.`)) return
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': adminToken.trim() }
      })
      if (!res.ok) throw new Error(`فشل الحذف (${res.status})`)
      setUsers(u => u.filter(usr => usr.id !== userId))
      if (usersStats) {
        setUsersStats({ ...usersStats, total_users: Math.max(0, usersStats.total_users - 1) })
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  async function fetchDownloadStats() {
    setDownloadError('')
    try {
      const res = await fetch('/api/download-stats', { cache: 'no-store' })
      if (!res.ok) throw new Error(`فشل الجلب (${res.status})`)
      setDownloadStats(await res.json())
    } catch (err: any) {
      setDownloadError(err.message)
    }
  }

  async function sendPush() {
    if (!pushTitle.trim() || !pushBody.trim()) {
      alert('العنوان والنصّ مطلوبان')
      return
    }
    if (!confirm(`سيُرسَل الإشعار لـ ${pushStats?.active_devices || 0} جهاز نشط. هل أنت متأكّد؟`)) return
    setIsPushSending(true)
    setPushStatus('')
    try {
      const res = await fetch(`${API_BASE}/push/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken.trim()
        },
        body: JSON.stringify({ title: pushTitle, body: pushBody, url: pushUrl || undefined })
      })
      const data = await res.json()
      if (res.ok) {
        setPushStatus(`✅ نجح! وصل لـ ${data.sent} جهاز، فشل ${data.failed}.`)
        setPushTitle('')
        setPushBody('')
        setPushUrl('')
        fetchPushStats()
      } else {
        setPushStatus(`❌ خطأ: ${data.detail || JSON.stringify(data)}`)
      }
    } catch (err: any) {
      setPushStatus(`❌ خطأ في الاتّصال: ${err.message}`)
    } finally {
      setIsPushSending(false)
    }
  }

  async function fetchSuggestions() {
    setIsSuggestionsLoading(true)
    try {
      const res = await fetch(`${API_BASE}/admin/feedback?status=${suggestionsFilter}`, {
        headers: { 'X-Admin-Token': adminToken.trim() }
      })
      if (res.ok) {
        const data = await res.json()
        setSuggestions(data.entries || [])
        setUnreadSuggestionsCount(data.unread_count || 0)
      }
    } catch {}
    setIsSuggestionsLoading(false)
  }

  async function updateSuggestionStatus(id: number, status: string) {
    try {
      const res = await fetch(`${API_BASE}/admin/feedback`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken.trim()
        },
        body: JSON.stringify({ id, status })
      })
      if (res.ok) {
        fetchSuggestions()
      }
    } catch {}
  }

  async function changePassword() {
    if (!currentPassword || !newPassword) {
      setPasswordStatus('❌ أدخل كلمتي المرور الحالية والجديدة.')
      return
    }
    setIsChangingPassword(true)
    setPasswordStatus('')
    try {
      const res = await fetch(`${API_BASE}/admin/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken.trim()
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      if (res.ok) {
        setPasswordStatus('✅ تم تغيير كلمة المرور بنجاح.')
        setCurrentPassword('')
        setNewPassword('')
      } else {
        setPasswordStatus(`❌ فشل التغيير: ${await res.text()}`)
      }
    } catch (err: any) {
      setPasswordStatus(`❌ خطأ: ${err.message}`)
    } finally {
      setIsChangingPassword(false)
    }
  }

  function addTemplate() {
    if (!templateAr.trim() || !templateBodyDe.trim()) return
    const newTemplates = [
      ...templates,
      {
        id: `custom-${Date.now()}`,
        titleAr: templateAr.trim(),
        titleDe: templateDe.trim() || templateAr.trim(),
        bodyDe: templateBodyDe.trim(),
        hintAr: templateHintAr.trim() || undefined
      }
    ]
    setTemplates(newTemplates)
    localStorage.setItem('b1-admin-templates', JSON.stringify(newTemplates))
    setTemplateAr('')
    setTemplateDe('')
    setTemplateBodyDe('')
    setTemplateHintAr('')
  }

  function deleteTemplate(id: string) {
    const newTemplates = templates.filter(t => t.id !== id)
    setTemplates(newTemplates)
    localStorage.setItem('b1-admin-templates', JSON.stringify(newTemplates))
  }

  function addLebenQuestion() {
    if (!questionDe.trim()) return
    const newQuestions = [
      ...customQuestions,
      {
        id: `custom-leben-${Date.now()}`,
        question: questionDe.trim(),
        answers: questionAnswers.map(a => a.trim()),
        correct: correctAnswerIndex,
        explanation: questionExplanation.trim() || undefined
      }
    ]
    setCustomQuestions(newQuestions)
    localStorage.setItem('b1-admin-leben', JSON.stringify(newQuestions))
    setQuestionDe('')
    setQuestionAnswers(['', '', '', ''])
    setCorrectAnswerIndex(0)
    setQuestionExplanation('')
  }

  function deleteLebenQuestion(id: string) {
    const newQuestions = customQuestions.filter(q => q.id !== id)
    setCustomQuestions(newQuestions)
    localStorage.setItem('b1-admin-leben', JSON.stringify(newQuestions))
  }

  function exportUsersCSV() {
    if (users.length === 0) return
    const csvContent = [
      ['id', 'email', 'display_name', 'created_at', 'progress_entries', 'streak_current', 'streak_longest'],
      ...users.map(u => [u.id, u.email, u.display_name, u.created_at, u.progress_entries, u.streak_current, u.streak_longest])
    ].map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `b1-users-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Card subcomponent to match mini-card styling
  function StatCard({ label, value }: { label: string; value: string }) {
    return (
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#E6F4EC] to-white border border-[#0F7B3E] text-center shadow-sm">
        <div className="text-3xl font-black text-[#094F28]">{value}</div>
        <div className="text-xs font-semibold text-[#0B1E12] mt-1">{label}</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
        <div className="text-center mb-6">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">🔒 لوحة المصمّم</span>
          <h1 className="text-2xl font-black mt-2 text-gray-900">تسجيل الدخول</h1>
          <p className="text-gray-500 text-sm mt-1">هذه المنطقة مخصّصة للمسؤول (المصمّم فادي الحلواني)</p>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="كلمة المرور"
            className="w-full border-2 border-green rounded-xl p-3 text-center text-lg outline-none focus:border-green-deep"
          />
          {loginError && <div className="text-red-600 font-bold text-sm text-center">❌ {loginError}</div>}
          <button onClick={handleLogin} disabled={isLoggingIn} className="w-full bg-[#0F7B3E] hover:bg-[#094F28] text-white py-3 rounded-xl font-bold transition duration-200">
            {isLoggingIn ? '⏳ جاري الدخول...' : 'دخول'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-[#0B1E12] to-[#094F28] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <span className="bg-green text-white px-3 py-1 rounded-full text-xs font-bold">👑 لوحة المصمّم</span>
        <h1 className="text-2xl font-black mt-2">مرحباً فادي 🇸🇾 — لوحة التحكّم</h1>
        <p className="text-white/80 text-sm mt-1">تحكّم كامل بمحتوى التطبيق والإعلانات والبيانات.</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20 transition duration-200">
            🚪 تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Global Admin API Token Input */}
      <section className="bg-white border-l-4 border-[#0F7B3E] rounded-xl p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-900">🔑 رمز وصول المسؤول (Admin API Token)</h2>
        <p className="text-gray-500 text-xs font-semibold">أدخل الرمز لتفعيل إدارة المستخدمين والاشتراكات والميزات المتقدّمة.</p>
        <div className="flex flex-wrap gap-3">
          <input
            type="password"
            value={adminToken}
            onChange={e => handleTokenChange(e.target.value)}
            placeholder="رمز API Token"
            className="flex-1 min-w-[240px] border-2 border-[#0F7B3E] rounded-lg p-2.5 font-mono text-sm outline-none"
          />
          <button onClick={fetchData} className="bg-[#0F7B3E] hover:bg-[#094F28] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition duration-200">
            🔄 تحديث البيانات
          </button>
        </div>
      </section>

      {/* Database Quick Stats */}
      <section className="bg-white rounded-xl p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-900">📊 إحصاءات سريعة (التفاعل المحلي)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <StatCard label="🔥 تتابع المستخدم الحالي" value={String(studyStats.streak.current)} />
          <StatCard label="🏆 أطول تتابع" value={String(studyStats.streak.longest)} />
          <StatCard label="📅 إجمالي أيام الدراسة" value={String(studyStats.streak.total)} />
          <StatCard label="🇩🇪 أسئلة Leben مُجَابة" value={String(studyStats.lebenAnswered)} />
          <StatCard label="⭐ أسئلة Leben مفضّلة" value={String(studyStats.lebenFavs)} />
          <StatCard label="🗂️ عناصر مخزّنة محلياً" value={String(studyStats.totalKeys)} />
        </div>
      </section>

      {/* APK Download Stats */}
      <section className="bg-white border-l-4 border-[#C9A96E] rounded-xl p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-900">📥 إحصاءات تحميل APK (مباشر من b1-syrer.de)</h2>
        <p className="text-gray-500 text-xs font-semibold">كل ضغطة على زرّ "حمّل APK" من الموقع تُعدّ هنا تلقائياً. يتحدّث كل دقيقة.</p>
        {downloadError && <div className="text-red-600 font-bold text-sm">❌ {downloadError}</div>}
        {downloadStats ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="📦 إجمالي التحميلات" value={String(downloadStats.total)} />
              <StatCard label="📅 اليوم" value={String(downloadStats.today)} />
              <StatCard label="🗓️ آخر 7 أيام" value={String(downloadStats.week)} />
            </div>
            {downloadStats.by_day && downloadStats.by_day.length > 0 && (
              <div className="flex gap-2 items-end h-20 pt-4">
                {[...downloadStats.by_day].reverse().map(day => {
                  const maxVal = Math.max(1, ...downloadStats.by_day.map(d => d.count))
                  const barHeight = Math.max(4, (day.count / maxVal) * 70)
                  return (
                    <div key={day.date} className="flex-1 text-center">
                      <div style={{ height: barHeight }} className="bg-gradient-to-t from-[#094F28] to-[#0F7B3E] rounded text-[9px] text-white font-bold flex items-start justify-center pt-0.5">
                        {day.count > 0 ? day.count : ''}
                      </div>
                      <div className="text-[9px] text-gray-500 mt-1">{day.date.slice(5)}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          !downloadError && <p className="text-gray-400 italic">⏳ جاري التحميل...</p>
        )}
      </section>

      {/* Registered Users List */}
      <section className="bg-white border-l-4 border-[#CE1126] rounded-xl p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-900">👥 المستخدمون المسجّلون (مباشر من القاعدة الحيّة)</h2>
        <p className="text-gray-500 text-xs font-semibold font-sans">تصفّح وابحث في قائمة مستخدمي التطبيق.</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => fetchUsers(userSearch)} disabled={isUsersLoading} className="bg-red hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition duration-200">
            {isUsersLoading ? '⏳ جاري...' : '🔄 تحديث'}
          </button>
          <button onClick={exportUsersCSV} disabled={users.length === 0} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-lg text-sm font-bold transition duration-200 border border-gray-200">
            💾 تصدير CSV
          </button>
        </div>
        {usersError && <div className="text-red-600 font-bold text-sm">❌ {usersError}</div>}
        
        {usersStats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
            <StatCard label="إجمالي المستخدمين" value={String(usersStats.total_users)} />
            <StatCard label="📅 سجّلوا اليوم" value={String(usersStats.today_users)} />
            <StatCard label="🗓️ آخر 7 أيام" value={String(usersStats.week_users)} />
            <StatCard label="🔥 لديهم تقدّم" value={String(usersStats.active_users)} />
            <StatCard label="📝 إجمالي تقدّم" value={String(usersStats.total_progress_entries)} />
          </div>
        )}

        {users.length > 0 && (
          <div className="space-y-3 mt-4">
            <input
              type="search"
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchUsers(userSearch)}
              placeholder="🔎 ابحث بالبريد أو الاسم..."
              className="w-full border rounded-lg p-2 text-sm outline-none focus:border-red"
            />
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full border-collapse text-sm text-right">
                <thead>
                  <tr className="bg-[#FEE2E2] text-red-950 font-bold">
                    <th className="p-3">#</th>
                    <th className="p-3">البريد</th>
                    <th className="p-3">الاسم</th>
                    <th className="p-3">التسجيل</th>
                    <th className="p-3">التقدّم</th>
                    <th className="p-3">🔥</th>
                    <th className="p-3">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-500">{u.id}</td>
                      <td className="p-3 font-mono text-gray-700">
                        {u.email}
                      </td>
                      <td className="p-3">{u.display_name || '—'}</td>
                      <td className="p-3 text-xs text-gray-500">{u.created_at ? new Date(u.created_at).toLocaleDateString('ar-EG') : '—'}</td>
                      <td className="p-3 font-bold">{u.progress_entries}</td>
                      <td className="p-3 text-xs font-semibold text-amber-700">{u.streak_current} / {u.streak_longest}</td>
                      <td className="p-3 flex gap-2 justify-center">
                        <button onClick={() => deleteUser(u.id, u.email)} className="bg-red hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-bold transition duration-200">
                          🗑️
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Website Visitor Stats & Logs */}
      {usersStats && usersStats.total_visitors !== undefined && (
        <section className="bg-white border-l-4 border-indigo-500 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">🌐 زوار الموقع الأساسي (صفحة الهبوط)</h2>
          <p className="text-gray-500 text-xs font-semibold">إحصاءات الزوار الفريدين (Unique IPs) من قاعدة البيانات الحيّة.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard label="👥 إجمالي الزوار الفريدين" value={String(usersStats.total_visitors)} />
            <StatCard label="📅 اليوم" value={String(usersStats.today_visitors)} />
            <StatCard label="🗓️ آخر 7 أيام" value={String(usersStats.week_visitors)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Top Countries List */}
            <div className="md:col-span-1 space-y-3">
              <h3 className="font-bold text-sm text-gray-800 border-b pb-1">🌍 الدول الأكثر زيارة</h3>
              {usersStats.top_countries && usersStats.top_countries.length > 0 ? (
                <div className="space-y-2">
                  {usersStats.top_countries.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm p-2 rounded bg-gray-50">
                      <span className="font-bold flex items-center gap-1.5">
                        <span className="text-lg">{getFlagEmoji(item.country)}</span>
                        <span>{item.country === 'unknown' ? 'غير معروف' : item.country}</span>
                      </span>
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-bold">{item.count} زائر</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-xs italic">لا توجد بيانات دول بعد.</p>
              )}
            </div>

            {/* Latest Visitors Table */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="font-bold text-sm text-gray-800 border-b pb-1">📋 سجل أحدث زيارات الصفحات (آخر 100 زيارة)</h3>
              {usersStats.latest_visitors && usersStats.latest_visitors.length > 0 ? (
                <div className="overflow-x-auto border rounded-xl max-h-[300px] overflow-y-auto">
                  <table className="w-full border-collapse text-xs text-right">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-950 font-bold sticky top-0">
                        <th className="p-2.5">الوقت</th>
                        <th className="p-2.5">IP Address</th>
                        <th className="p-2.5">البلد</th>
                        <th className="p-2.5">الصفحة المستهدفة</th>
                        <th className="p-2.5">المتصفح / النظام</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersStats.latest_visitors.map((v, index) => (
                        <tr key={v.id || index} className="border-b hover:bg-gray-50/50">
                          <td className="p-2.5 text-gray-500 whitespace-nowrap">{new Date(v.created_at).toLocaleString('ar-EG')}</td>
                          <td className="p-2.5 font-mono text-gray-700">{v.ip_address}</td>
                          <td className="p-2.5 font-bold text-indigo-700 flex items-center gap-1">
                            <span>{getFlagEmoji(v.country)}</span>
                            <span>{v.country}</span>
                          </td>
                          <td className="p-2.5 font-semibold text-emerald-700 whitespace-nowrap">
                            {getPathLabel(v.path)}
                          </td>
                          <td className="p-2.5 text-gray-600 truncate max-w-[150px]" title={v.user_agent}>{v.user_agent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 text-xs italic">لا توجد سجلات زيارات بعد.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Broadcast Config */}
      <section className="bg-white border-l-4 border-amber-500 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">📡 بثّ مباشر — إعدادات التطبيق والإعلانات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800 border-b pb-1">📢 الإعلانات العامة</h3>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600">نص الإعلان:</label>
              <textarea
                value={config.announcement}
                onChange={e => setConfig({ ...config, announcement: e.target.value })}
                rows={3}
                placeholder="اكتب إعلاناً يظهر لجميع المستخدمين..."
                className="w-full border rounded-lg p-2 text-sm outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600">لون الإعلان:</label>
              <input
                type="color"
                value={config.announcement_color}
                onChange={e => setConfig({ ...config, announcement_color: e.target.value })}
                className="w-16 h-8 rounded cursor-pointer border"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800 border-b pb-1">⚙️ تفاصيل الإصدار والدعم</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-600">إصدار الويب:</label>
                <input type="text" value={config.web_version} onChange={e => setConfig({ ...config, web_version: e.target.value })} className="w-full border rounded p-2 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600">إصدار APK:</label>
                <input type="text" value={config.apk_version} onChange={e => setConfig({ ...config, apk_version: e.target.value })} className="w-full border rounded p-2 text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600">رابط تحميل APK:</label>
              <input type="text" value={config.apk_url} onChange={e => setConfig({ ...config, apk_url: e.target.value })} className="w-full border rounded p-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600">رسالة الدعم (Buy Me A Coffee):</label>
              <input type="text" value={config.support_message} onChange={e => setConfig({ ...config, support_message: e.target.value })} className="w-full border rounded p-2 text-sm outline-none" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t pt-3">
          <button onClick={saveConfig} disabled={isSavingConfig} className="bg-green hover:bg-green-deep text-white px-6 py-2.5 rounded-lg text-sm font-bold transition duration-200">
            {isSavingConfig ? '⏳ جاري الحفظ...' : '💾 حفظ التحديث المباشر'}
          </button>
          {configStatus && <span className="text-sm font-semibold">{configStatus}</span>}
        </div>
      </section>

      {/* Firebase Push Notifications */}
      <section className="bg-white border-l-4 border-blue-600 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">📲 إشعارات Push (Firebase)</h2>
        {pushStats && (
          <div className="grid grid-cols-2 gap-3 mb-2 max-w-sm">
            <StatCard label="الأجهزة النشطة" value={String(pushStats.active_devices)} />
            <StatCard label="حالة FCM" value={pushStats.fcm_configured ? '✅ مهيّأ' : '⚠️ غير مهيّأ'} />
          </div>
        )}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="عنوان الإشعار (مثال: تحديث جديد!)"
            value={pushTitle}
            onChange={e => setPushTitle(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
          />
          <textarea
            placeholder="نصّ الإشعار..."
            value={pushBody}
            onChange={e => setPushBody(e.target.value)}
            rows={3}
            className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
          />
          <input
            type="text"
            placeholder="رابط اختياري (مثلاً https://b1-syrer.de)"
            value={pushUrl}
            onChange={e => setPushUrl(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
          />
          <button onClick={sendPush} disabled={isPushSending || !pushStats?.fcm_configured} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition duration-200">
            {isPushSending ? '⏳ جاري الإرسال...' : `📤 أرسل لـ ${pushStats?.active_devices || 0} جهاز`}
          </button>
          {pushStatus && <div className="text-sm font-semibold">{pushStatus}</div>}
        </div>

        {pushStats && pushStats.history && pushStats.history.length > 0 && (
          <details className="mt-4 pt-3 border-t">
            <summary className="cursor-pointer font-bold text-sm text-gray-700">📜 سجلّ الإشعارات السابقة ({pushStats.history.length})</summary>
            <div className="space-y-3 mt-3 text-xs max-h-60 overflow-y-auto pr-2">
              {pushStats.history.map((hist: any) => (
                <div key={hist.id} className="border-r-2 border-blue-600 pr-3 py-1 space-y-1">
                  <div className="font-bold text-gray-800">{hist.title}</div>
                  <div className="text-gray-500">{hist.body}</div>
                  <div className="text-[10px] text-gray-400">
                    {new Date(hist.created_at).toLocaleString('ar-EG')} — وصل {hist.sent} / {hist.sent + hist.failed}
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
      </section>

      {/* Suggestions Mailbox */}
      <section className="bg-white border-l-4 border-amber-600 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-lg font-bold text-gray-900">📬 صندوق الاقتراحات ({suggestions.length})</h2>
          <button onClick={fetchSuggestions} disabled={isSuggestionsLoading} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition duration-200">
            {isSuggestionsLoading ? '⏳ جاري...' : '🔄 تحديث'}
          </button>
        </div>
        <p className="text-gray-500 text-xs font-semibold">الاقتراحات الحقيقيّة من المستخدمين عبر صفحة "تواصل".</p>
        
        <div className="flex gap-2 flex-wrap">
          {['all', 'unread', 'read', 'archived'].map(filter => (
            <button
              key={filter}
              onClick={() => setSuggestionsFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition duration-200 ${suggestionsFilter === filter ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {filter === 'all' && '📋 الكلّ'}
              {filter === 'unread' && `🔴 جديد (${unreadSuggestionsCount})`}
              {filter === 'read' && '✅ مقروء'}
              {filter === 'archived' && '📦 مؤرشف'}
            </button>
          ))}
        </div>

        {isSuggestionsLoading ? (
          <p className="text-gray-400 italic">⏳ جاري التحميل...</p>
        ) : suggestions.length === 0 ? (
          <p className="text-gray-400 italic">لا توجد اقتراحات.</p>
        ) : (
          <div className="space-y-3">
            {suggestions.map(s => {
              const isUnread = (s.status ?? 'unread') === 'unread'
              return (
                <div key={s.id} className={`p-4 rounded-xl border-2 transition duration-200 ${isUnread ? 'bg-amber-50/50 border-amber-300' : 'bg-gray-50/20 border-gray-200'}`}>
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {isUnread && <span className="bg-red text-white text-[9px] font-bold px-2 py-0.5 rounded-full">جديد</span>}
                      <strong className="text-gray-900 text-base">{s.subject}</strong>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(s.created_at).toLocaleString('ar-EG')}</span>
                  </div>
                  {(s.name || s.email) && (
                    <div className="text-xs font-bold text-gray-700 mb-2">
                      {s.name && <span>👤 {s.name}</span>}
                      {s.name && s.email && <span className="mx-1.5">·</span>}
                      {s.email && <a href={`mailto:${s.email}?subject=Re: ${encodeURIComponent(s.subject)}`} className="text-[#0F7B3E] hover:underline">✉️ {s.email}</a>}
                    </div>
                  )}
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{s.message}</p>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 flex-wrap">
                    {isUnread && (
                      <button onClick={() => updateSuggestionStatus(s.id, 'read')} className="bg-green/10 hover:bg-green/20 text-[#065F46] px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-200">
                        ✅ تعليم كمقروء
                      </button>
                    )}
                    {s.status !== 'archived' && (
                      <button onClick={() => updateSuggestionStatus(s.id, 'archived')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-200 border">
                        📦 أرشفة
                      </button>
                    )}
                    {s.status === 'archived' && (
                      <button onClick={() => updateSuggestionStatus(s.id, 'read')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-200 border">
                        ↩️ استعادة
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Admin Account Settings */}
      <section className="bg-white border-l-4 border-gray-500 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">🔑 تغيير كلمة مرور لوحة الإدارة</h2>
        <div className="max-w-md space-y-3">
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="كلمة المرور الحالية"
            className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-gray-500"
          />
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="كلمة المرور الجديدة"
            className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-gray-500"
          />
          <button onClick={changePassword} disabled={isChangingPassword} className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition duration-200">
            {isChangingPassword ? '⏳ جاري التغيير...' : 'تحديث كلمة المرور'}
          </button>
          {passwordStatus && <div className="text-sm font-semibold">{passwordStatus}</div>}
        </div>
      </section>

      {/* Custom templates and Leben questions saved in LocalStorage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LocalTemplates section */}
        <section className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">✉️ إدارة نماذج الرسائل (مخزنة محلياً)</h2>
          <div className="space-y-3">
            <input placeholder="العنوان بالعربية" value={templateAr} onChange={e => setTemplateAr(e.target.value)} className="w-full border rounded p-2 text-sm outline-none" />
            <input placeholder="العنوان بالألمانية" value={templateDe} onChange={e => setTemplateDe(e.target.value)} className="w-full border rounded p-2 text-sm outline-none" dir="ltr" />
            <textarea placeholder="نص الرسالة بالألمانية..." value={templateBodyDe} onChange={e => setTemplateBodyDe(e.target.value)} rows={4} className="w-full border rounded p-2 text-sm outline-none" dir="ltr" />
            <input placeholder="نصيحة / تلميح بالعربية (اختياري)" value={templateHintAr} onChange={e => setTemplateHintAr(e.target.value)} className="w-full border rounded p-2 text-sm outline-none" />
            <button onClick={addTemplate} className="bg-[#0F7B3E] hover:bg-[#094F28] text-white px-4 py-2 rounded-lg text-sm font-bold transition duration-200">
              ➕ أضف النموذج
            </button>
          </div>
          {templates.length > 0 && (
            <div className="space-y-3 mt-4 border-t pt-3">
              <h3 className="font-bold text-sm text-gray-700">📋 النماذج المُضافة ({templates.length})</h3>
              {templates.map(t => (
                <div key={t.id} className="p-3 border rounded-lg bg-gray-50/30">
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <strong className="text-gray-900">{t.titleAr}</strong>
                    <span className="text-xs text-gray-500" dir="ltr">{t.titleDe}</span>
                    <button onClick={() => deleteTemplate(t.id)} className="text-red-600 hover:text-red-800 text-xs font-bold">🗑️</button>
                  </div>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono" dir="ltr">{t.bodyDe}</pre>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Local Leben Questions section */}
        <section className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">🇩🇪 أسئلة Leben in Deutschland (مخزنة محلياً)</h2>
          <div className="space-y-3">
            <input placeholder="السؤال بالألمانية" value={questionDe} onChange={e => setQuestionDe(e.target.value)} className="w-full border rounded p-2 text-sm outline-none" dir="ltr" />
            {questionAnswers.map((ans, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input type="radio" checked={correctAnswerIndex === idx} onChange={() => setCorrectAnswerIndex(idx)} name="correctAnswer" />
                <span className="font-bold">{String.fromCharCode(65 + idx)}.</span>
                <input placeholder={`الخيار ${idx + 1}`} value={ans} onChange={e => {
                  const arr = [...questionAnswers]
                  arr[idx] = e.target.value
                  setQuestionAnswers(arr)
                }} className="flex-1 border rounded p-2 text-sm outline-none" dir="ltr" />
              </div>
            ))}
            <textarea placeholder="شرح الإجابة (اختياري)" value={questionExplanation} onChange={e => setQuestionExplanation(e.target.value)} rows={2} className="w-full border rounded p-2 text-sm outline-none" />
            <button onClick={addLebenQuestion} className="bg-[#0F7B3E] hover:bg-[#094F28] text-white px-4 py-2 rounded-lg text-sm font-bold transition duration-200">
              ➕ أضف السؤال
            </button>
          </div>
          {customQuestions.length > 0 && (
            <div className="space-y-3 mt-4 border-t pt-3">
              <h3 className="font-bold text-sm text-gray-700">📋 الأسئلة المُضافة ({customQuestions.length})</h3>
              {customQuestions.map(q => (
                <div key={q.id} className="p-3 border rounded-lg bg-gray-50/30 flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <div className="font-bold text-gray-900" dir="ltr">{q.question}</div>
                    <div className="text-xs text-green font-bold" dir="ltr">✓ {q.answers[q.correct]}</div>
                  </div>
                  <button onClick={() => deleteLebenQuestion(q.id)} className="text-red-600 hover:text-red-800 text-xs font-bold">🗑️</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
