import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

type AdminTab = 'stats' | 'users' | 'communication' | 'settings' | 'content'

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('b1-admin-auth') === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>('stats')

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
    support_hide: '0',
    maintenance_mode: '0',
    maintenance_message: 'الموقع قيد الصيانة والتحديث — نعود قريباً ✨'
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

  // MAGIC GENERATOR
  const [genType] = useState<'vocabulary' | 'grammar'>('vocabulary')
  const [vocabWord, setVocabWord] = useState('')
  const [vocabMeaning, setVocabMeaning] = useState('')
  const [vocabExample, setVocabExample] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [copied, setCopied] = useState(false)

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

  async function handleLogin(e?: React.FormEvent) {
    if(e) e.preventDefault()
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

  const generateContentCode = () => {
    if (genType === 'vocabulary') {
      if (!vocabWord || !vocabMeaning) return alert('الرجاء إدخال الكلمة ومعناها على الأقل')
      const code = `  { word: '${vocabWord}', meaning: '${vocabMeaning}', example: '${vocabExample}' },`
      setGeneratedCode(code)
    } else {
      setGeneratedCode('// قريباً: توليد أكواد القواعد')
    }
    setCopied(false)
  }

  const copyToClipboard = () => {
    if (!generatedCode) return
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function StatCard({ label, value }: { label: string; value: string }) {
    return (
      <div className="p-4 rounded-xl glass border border-gray-200 dark:border-white/10 text-center shadow-sm">
        <div className="text-2xl font-black text-[#00b894]">{value}</div>
        <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-1">{label}</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 glass rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b894]/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0984e3]/20 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-20 h-20 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl mx-auto flex items-center justify-center text-4xl mb-4 shadow-lg">
            👑
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">لوحة الإدارة القوية</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">تسجيل الدخول للمسؤولين فقط</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <input
              type="password"
              placeholder="كلمة المرور..."
              className="w-full p-4 bg-white dark:bg-black/20 border-2 border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00b894] transition-colors text-center text-xl tracking-widest text-gray-900 dark:text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoggingIn}
              autoFocus
            />
          </div>
          {loginError && <p className="text-red-500 text-sm font-bold text-center animate-pulse">{loginError}</p>}
          <button 
            type="submit" 
            disabled={isLoggingIn || !password}
            className="w-full py-4 bg-[#00b894] hover:bg-[#00a884] text-white rounded-xl font-black text-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoggingIn ? <span className="animate-spin">🔄</span> : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      
      {/* Modern Header */}
      <div className="glass p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#0984e3]/10 to-transparent blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl flex items-center justify-center text-2xl shadow-md">
            👑
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">مرحباً فادي 👋</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">تحكم كامل بالإحصائيات والمحتوى والسيرفر.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button onClick={fetchData} disabled={isUsersLoading} className="px-5 py-2.5 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-2">
            {isUsersLoading ? '⏳ جاري...' : '🔄 تحديث'}
          </button>
          <button onClick={handleLogout} className="px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-100 dark:border-red-900/30">
            تسجيل الخروج 🚪
          </button>
        </div>
      </div>

      {/* Admin Token Bar */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl p-4 border border-gray-200 dark:border-white/5 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
          🔑 رمز اتصال السيرفر:
        </div>
        <input
          type="password"
          value={adminToken}
          onChange={e => handleTokenChange(e.target.value)}
          placeholder="أدخل رمز API Token هنا للاتصال بالسيرفر..."
          className="flex-1 min-w-[240px] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg p-2 font-mono text-sm outline-none focus:border-[#00b894] text-gray-800 dark:text-gray-200"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 w-fit mx-auto sm:mx-0">
        <button onClick={() => setActiveTab('stats')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'stats' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          📊 الإحصائيات
        </button>
        <button onClick={() => setActiveTab('users')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          👥 المستخدمون
        </button>
        <button onClick={() => setActiveTab('communication')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'communication' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          💬 التواصل والرسائل
        </button>
        <button onClick={() => setActiveTab('content')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'content' ? 'bg-[#00b894] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          ✨ استوديو المحتوى
        </button>
        <button onClick={() => setActiveTab('settings')} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          ⚙️ إعدادات النظام
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">إحصائيات المنصة الشاملة</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="🔥 تتابع محلي حالي" value={String(studyStats.streak.current)} />
              <StatCard label="🇩🇪 Leben مجابة (محلياً)" value={String(studyStats.lebenAnswered)} />
              <StatCard label="📦 إجمالي تحميلات APK" value={String(downloadStats?.total || 0)} />
              <StatCard label="📅 تحميلات APK اليوم" value={String(downloadStats?.today || 0)} />
            </div>
            {downloadError && <p className="text-red-500 text-xs mt-2">{downloadError}</p>}

            {usersStats && (
              <div className="glass p-6 rounded-2xl border border-blue-200 dark:border-blue-900/30">
                <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-4">زوار الموقع (Live)</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatCard label="إجمالي الزوار" value={String(usersStats.total_visitors || 0)} />
                  <StatCard label="زوار اليوم" value={String(usersStats.today_visitors || 0)} />
                  <StatCard label="آخر 7 أيام" value={String(usersStats.week_visitors || 0)} />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-3">
                    <h4 className="font-bold text-sm">أكثر الدول:</h4>
                    {usersStats.top_countries?.map((c, i) => (
                      <div key={i} className="flex justify-between bg-white dark:bg-black/20 p-2 rounded border border-gray-100 dark:border-white/5">
                        <span className="flex gap-2"><span>{getFlagEmoji(c.country)}</span> {c.country}</span>
                        <span className="font-bold text-[#0984e3]">{c.count}</span>
                      </div>
                    ))}
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-bold text-sm mb-3">سجل أحدث الزيارات المباشرة:</h4>
                    <div className="max-h-60 overflow-auto bg-white dark:bg-black/20 rounded-xl p-2 border border-gray-100 dark:border-white/5 custom-scrollbar">
                      {usersStats.latest_visitors?.map(v => (
                        <div key={v.id} className="flex flex-col sm:flex-row justify-between text-xs p-2 border-b border-gray-100 dark:border-white/5 gap-2">
                          <div>
                            <span className="font-bold text-[#00b894]">{v.ip_address}</span>
                            <span className="mx-2 text-gray-500">{new Date(v.created_at).toLocaleString('ar-EG')}</span>
                          </div>
                          <div className="flex gap-3">
                            <span className="font-bold">{getFlagEmoji(v.country)} {v.country}</span>
                            <span className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 px-2 rounded">{getPathLabel(v.path)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white dark:bg-[#1a1a2e] p-5 rounded-2xl border border-gray-200 dark:border-white/5">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">إدارة المستخدمين ({users.length})</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو البريد..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && fetchUsers(userSearch)}
                  className="px-4 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-xl outline-none focus:border-[#e84393] text-sm"
                />
                <button onClick={() => fetchUsers(userSearch)} className="bg-[#e84393] hover:bg-[#d63384] text-white px-4 py-2 rounded-xl text-sm font-bold">🔍 ابحث</button>
                <button onClick={exportUsersCSV} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-xl text-sm font-bold">💾 CSV</button>
              </div>
            </div>

            {usersError && <p className="text-red-500 font-bold">{usersError}</p>}
            {isUsersLoading && <p className="text-gray-500 text-sm">⏳ جاري التحميل...</p>}
            
            <div className="overflow-x-auto glass rounded-2xl border border-gray-200 dark:border-white/10">
              <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">الاسم والبريد</th>
                    <th className="p-4 text-center">النقاط / المهام</th>
                    <th className="p-4 text-center">الشعلة</th>
                    <th className="p-4 text-center">الاشتراك</th>
                    <th className="p-4">تاريخ الانضمام</th>
                    <th className="p-4 text-center">حذف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                      <td className="p-4 text-gray-500">#{u.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900 dark:text-white">{u.display_name || 'بدون اسم'}</div>
                        <div className="text-gray-500 text-xs" dir="ltr">{u.email}</div>
                      </td>
                      <td className="p-4 text-center font-bold text-emerald-500">{u.progress_entries}</td>
                      <td className="p-4 text-center font-bold text-orange-500">🔥 {u.streak_current}</td>
                      <td className="p-4 text-center text-xs">{u.subscription_status === 'active' ? '💎 VIP' : 'مجاني'}</td>
                      <td className="p-4 text-gray-500 text-xs" dir="ltr">{new Date(u.created_at).toLocaleDateString('en-GB')}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => deleteUser(u.id, u.email)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* COMMUNICATION TAB */}
        {activeTab === 'communication' && (
          <motion.div key="communication" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-6">
            {/* PUSH */}
            <div className="glass p-6 rounded-2xl border border-[#0984e3]/30">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">📲 إرسال إشعارات (Push)</h2>
              <div className="space-y-4">
                <input placeholder="عنوان الإشعار..." value={pushTitle} onChange={e => setPushTitle(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:bg-white/5 outline-none" />
                <textarea placeholder="النص..." value={pushBody} onChange={e => setPushBody(e.target.value)} rows={3} className="w-full p-3 rounded-xl border border-gray-200 dark:bg-white/5 outline-none" />
                <input placeholder="رابط عند النقر (اختياري)..." value={pushUrl} onChange={e => setPushUrl(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:bg-white/5 outline-none" />
                <button onClick={sendPush} disabled={isPushSending || !pushStats?.fcm_configured} className="w-full py-3 bg-[#0984e3] hover:bg-[#0874c3] text-white rounded-xl font-bold">
                  {isPushSending ? 'جاري الإرسال...' : `📤 إرسال لـ ${pushStats?.active_devices || 0} جهاز نشط`}
                </button>
                {pushStatus && <p className="text-sm font-bold mt-2">{pushStatus}</p>}
              </div>
            </div>

            {/* SUGGESTIONS */}
            <div className="glass p-6 rounded-2xl border border-[#e17055]/30 flex flex-col h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  📬 الاقتراحات ({suggestions.length})
                  {unreadSuggestionsCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadSuggestionsCount} جديد</span>}
                </h2>
                <button onClick={fetchSuggestions} disabled={isSuggestionsLoading} className="bg-[#e17055] text-white px-3 py-1 rounded text-xs font-bold">
                  {isSuggestionsLoading ? '⏳' : 'تحديث'}
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                <button onClick={() => setSuggestionsFilter('unread')} className={`px-3 py-1 rounded text-xs font-bold ${suggestionsFilter==='unread'?'bg-[#e17055] text-white':'bg-gray-100 text-gray-600'}`}>جديد</button>
                <button onClick={() => setSuggestionsFilter('all')} className={`px-3 py-1 rounded text-xs font-bold ${suggestionsFilter==='all'?'bg-gray-300 text-black':'bg-gray-100 text-gray-600'}`}>الكل</button>
                <button onClick={() => setSuggestionsFilter('archived')} className={`px-3 py-1 rounded text-xs font-bold ${suggestionsFilter==='archived'?'bg-gray-300 text-black':'bg-gray-100 text-gray-600'}`}>مؤرشف</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                {suggestions.map(s => (
                  <div key={s.id} className="p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/10">
                    <div className="flex justify-between font-bold text-sm mb-1">
                      <span>{s.subject} {s.status === 'unread' && '🔴'}</span>
                      <span className="text-[10px] text-gray-400">{new Date(s.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{s.message}</p>
                    <div className="flex gap-2">
                      {s.status === 'unread' && <button onClick={() => updateSuggestionStatus(s.id, 'read')} className="text-emerald-600 text-xs font-bold">✔ مقروء</button>}
                      {s.status !== 'archived' && <button onClick={() => updateSuggestionStatus(s.id, 'archived')} className="text-gray-500 text-xs font-bold">📦 أرشفة</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            
            <div className={`p-6 rounded-2xl border-2 transition-colors ${config.maintenance_mode === '1' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400' : 'glass border-gray-200 dark:border-white/10'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black flex items-center gap-2">🚧 وضع الصيانة</h2>
                <button onClick={() => setConfig({...config, maintenance_mode: config.maintenance_mode === '1' ? '0' : '1'})} className={`px-6 py-2 rounded-xl text-white font-bold ${config.maintenance_mode === '1' ? 'bg-emerald-500' : 'bg-orange-500'}`}>
                  {config.maintenance_mode === '1' ? '✅ إيقاف الصيانة' : 'تفعيل'}
                </button>
              </div>
              <input value={config.maintenance_message} onChange={e => setConfig({...config, maintenance_message: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 outline-none dark:bg-black/20" placeholder="رسالة الصيانة للزوار..." />
            </div>

            <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
              <h2 className="text-xl font-black mb-4">⚙️ إعدادات التطبيق والدعم</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold mb-1">رسالة الإعلان</label>
                  <textarea value={config.announcement} onChange={e => setConfig({...config, announcement: e.target.value})} className="w-full p-2 rounded border outline-none dark:bg-black/20" rows={2} />
                  <input type="color" value={config.announcement_color} onChange={e => setConfig({...config, announcement_color: e.target.value})} className="mt-1" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">رسالة الدعم (Buy Me a Coffee)</label>
                  <textarea value={config.support_message} onChange={e => setConfig({...config, support_message: e.target.value})} className="w-full p-2 rounded border outline-none dark:bg-black/20" rows={2} />
                  <div className="mt-2 flex gap-4">
                    <input placeholder="Web Version" value={config.web_version} onChange={e => setConfig({...config, web_version: e.target.value})} className="w-full p-2 border rounded text-xs dark:bg-black/20" />
                    <input placeholder="APK Version" value={config.apk_version} onChange={e => setConfig({...config, apk_version: e.target.value})} className="w-full p-2 border rounded text-xs dark:bg-black/20" />
                  </div>
                </div>
              </div>
              <button onClick={saveConfig} disabled={isSavingConfig} className="bg-[#00b894] text-white px-6 py-2.5 rounded-xl font-bold">
                {isSavingConfig ? '⏳ جاري الحفظ...' : '💾 حفظ إعدادات السيرفر'}
              </button>
              {configStatus && <span className="mx-3 text-sm font-bold">{configStatus}</span>}
            </div>

            <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10 max-w-sm">
              <h2 className="text-lg font-black mb-4">تغيير كلمة مرور الأدمن</h2>
              <input type="password" placeholder="الحالية" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full mb-2 p-2 rounded border outline-none dark:bg-black/20" />
              <input type="password" placeholder="الجديدة" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full mb-4 p-2 rounded border outline-none dark:bg-black/20" />
              <button onClick={changePassword} disabled={isChangingPassword} className="bg-gray-800 text-white px-4 py-2 rounded-xl w-full font-bold">
                {isChangingPassword ? '⏳...' : 'تغيير'}
              </button>
              {passwordStatus && <p className="mt-2 text-xs font-bold">{passwordStatus}</p>}
            </div>

          </motion.div>
        )}

        {/* CONTENT STUDIO TAB (NEW) */}
        {activeTab === 'content' && (
          <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            
            {/* GENERATOR */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-[2rem] border border-[#00b894]/30 shadow-lg bg-[#00b894]/5">
                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2"><span>✨</span> توليد مفردات بسرعة</h2>
                <div className="space-y-3">
                  <input type="text" value={vocabWord} onChange={e => setVocabWord(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-black/20" placeholder="الكلمة بالألمانية (der Arzt)" dir="ltr" />
                  <input type="text" value={vocabMeaning} onChange={e => setVocabMeaning(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-black/20" placeholder="الترجمة (الطبيب)" />
                  <input type="text" value={vocabExample} onChange={e => setVocabExample(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-black/20" placeholder="مثال (Ich gehe zum Arzt.)" dir="ltr" />
                  <button onClick={generateContentCode} className="w-full py-3 bg-[#00b894] hover:bg-[#00a884] text-white rounded-xl font-black">توليد كود TS ⚡</button>
                </div>
              </div>

              <div className="glass p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 flex flex-col">
                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">الكود الجاهز</h2>
                <p className="text-xs text-gray-500 mb-2">أضفه في `src/data/vocabulary.ts`</p>
                <div className="flex-1 bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 flex items-center justify-center">
                  {generatedCode || 'النتيجة تظهر هنا...'}
                </div>
                <button onClick={copyToClipboard} disabled={!generatedCode} className={`w-full py-3 mt-3 rounded-xl font-black ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white'}`}>
                  {copied ? '✅ تم النسخ!' : '📋 نسخ الكود'}
                </button>
              </div>
            </div>

            {/* LOCAL TEMPLATES */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                <h2 className="text-lg font-black mb-4">✉️ نماذج الرسائل (Local)</h2>
                <input placeholder="العنوان بالعربية" value={templateAr} onChange={e => setTemplateAr(e.target.value)} className="w-full mb-2 border rounded p-2 text-sm outline-none dark:bg-black/20" />
                <input placeholder="العنوان بالألمانية" value={templateDe} onChange={e => setTemplateDe(e.target.value)} className="w-full mb-2 border rounded p-2 text-sm outline-none dark:bg-black/20" dir="ltr" />
                <textarea placeholder="نص الرسالة بالألمانية..." value={templateBodyDe} onChange={e => setTemplateBodyDe(e.target.value)} rows={3} className="w-full mb-2 border rounded p-2 text-sm outline-none dark:bg-black/20" dir="ltr" />
                <button onClick={addTemplate} className="bg-[#0F7B3E] text-white px-4 py-2 rounded-xl text-sm font-bold">➕ أضف النموذج</button>
                {templates.map(t => (
                  <div key={t.id} className="mt-3 p-2 bg-gray-50 dark:bg-white/5 rounded flex justify-between items-center text-sm border border-gray-100">
                    <strong>{t.titleAr}</strong>
                    <button onClick={() => deleteTemplate(t.id)} className="text-red-500 font-bold">🗑️</button>
                  </div>
                ))}
              </div>

              <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                <h2 className="text-lg font-black mb-4">🇩🇪 أسئلة Leben (Local)</h2>
                <input placeholder="السؤال بالألمانية" value={questionDe} onChange={e => setQuestionDe(e.target.value)} className="w-full mb-2 border rounded p-2 text-sm outline-none dark:bg-black/20" dir="ltr" />
                {questionAnswers.map((ans, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input type="radio" checked={correctAnswerIndex === idx} onChange={() => setCorrectAnswerIndex(idx)} />
                    <input value={ans} onChange={e => { const arr = [...questionAnswers]; arr[idx] = e.target.value; setQuestionAnswers(arr) }} placeholder={`الخيار ${idx+1}`} className="flex-1 border rounded p-1 text-sm outline-none dark:bg-black/20" dir="ltr" />
                  </div>
                ))}
                <button onClick={addLebenQuestion} className="bg-[#0F7B3E] text-white px-4 py-2 rounded-xl text-sm font-bold mt-2">➕ أضف السؤال</button>
                {customQuestions.map(q => (
                  <div key={q.id} className="mt-3 p-2 bg-gray-50 dark:bg-white/5 rounded flex justify-between items-center text-sm border border-gray-100" dir="ltr">
                    <span className="truncate max-w-[200px]">{q.question}</span>
                    <button onClick={() => deleteLebenQuestion(q.id)} className="text-red-500 font-bold">🗑️</button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  )
}
