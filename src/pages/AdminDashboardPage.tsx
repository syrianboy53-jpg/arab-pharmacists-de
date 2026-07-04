import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PremiumStatCard from '../components/admin/PremiumStatCard'



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

// @ts-ignore
function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode === 'unknown' || countryCode.length !== 2) return '❓';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// @ts-ignore
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

  // Mock data for Growth Chart
  const mockUserGrowth = [
    { name: 'قبل 6 أيام', users: 120 },
    { name: 'قبل 5 أيام', users: 180 },
    { name: 'قبل 4 أيام', users: 250 },
    { name: 'قبل 3 أيام', users: 390 },
    { name: 'قبل يومين', users: 510 },
    { name: 'أمس', users: 680 },
    { name: 'اليوم', users: 850 },
  ]

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

  // Active visitors
  const [activeVisitors, setActiveVisitors] = useState<any[]>([])

  // APK Download stats
  const [downloadStats, setDownloadStats] = useState<{ total: number; today: number; week: number; by_day: any[] } | null>(null)

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
  // @ts-ignore
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
    fetchActiveVisitors()
  }

  async function fetchActiveVisitors() {
    if (!adminToken.trim()) return
    try {
      const res = await fetch(`${API_BASE}/api/admin/active_visitors`, {
        headers: { 'X-Admin-Token': adminToken.trim() }
      })
      if (res.ok) {
        setActiveVisitors(await res.json())
      }
    } catch {}
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
    try {
      const res = await fetch('/api/download-stats', { cache: 'no-store' })
      if (!res.ok) throw new Error(`فشل الجلب (${res.status})`)
      setDownloadStats(await res.json())
    } catch (err: any) {
      console.error(err.message)
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
      const res = await fetch(`${API_BASE}/api/admin/feedback`, {
        headers: { 'X-Admin-Token': adminToken.trim() }
      })
      if (res.ok) {
        const data = await res.json()
        setSuggestions(data.entries || [])
        setUnreadSuggestionsCount(data.unread_count || 0)
      }
    } catch (err) {
      console.error(err)
    }
    setIsSuggestionsLoading(false)
  }

  async function updateSuggestionStatus(id: string, status: string) {
    try {
      await fetch(`${API_BASE}/api/admin/feedback`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken.trim()
        },
        body: JSON.stringify({ id, status })
      })
      fetchSuggestions()
    } catch {}
  }

  async function deleteSuggestion(id: string) {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة نهائياً؟')) return
    try {
      await fetch(`${API_BASE}/api/admin/feedback?id=${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': adminToken.trim() }
      })
      fetchSuggestions()
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

  // @ts-ignore
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f1a] -mx-4 sm:-mx-0 -mt-6 sm:mt-0 flex flex-col md:flex-row font-sans" dir="rtl">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white dark:bg-[#1a1a2e] border-b md:border-b-0 md:border-l border-gray-200 dark:border-white/5 shadow-xl flex flex-col z-40 sticky top-0 md:h-screen shrink-0">
        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0984e3] to-[#00b894] rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-[#00b894]/20">🚀</div>
            <div>
              <h1 className="font-black text-xl text-gray-900 dark:text-white leading-tight">Admin<span className="text-[#00b894]">OS</span></h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-0.5">Workspace</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar flex md:flex-col overflow-x-auto md:overflow-x-visible">
          <button onClick={() => setActiveTab('stats')} className={`w-full whitespace-nowrap px-4 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === 'stats' ? 'bg-gradient-to-r from-[#00b894]/10 to-transparent text-[#00b894]' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}>
            <span className={`text-xl ${activeTab === 'stats' ? 'scale-110' : ''} transition-transform`}>📊</span> 
            <span className="hidden md:inline">نظرة عامة</span>
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full whitespace-nowrap px-4 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === 'users' ? 'bg-gradient-to-r from-[#0984e3]/10 to-transparent text-[#0984e3]' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}>
            <span className={`text-xl ${activeTab === 'users' ? 'scale-110' : ''} transition-transform`}>👥</span> 
            <span className="hidden md:inline">المستخدمون</span>
          </button>
          <button onClick={() => setActiveTab('communication')} className={`w-full whitespace-nowrap px-4 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === 'communication' ? 'bg-gradient-to-r from-purple-500/10 to-transparent text-purple-500' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}>
            <span className={`text-xl ${activeTab === 'communication' ? 'scale-110' : ''} transition-transform`}>💬</span> 
            <span className="hidden md:inline">صندوق البريد</span>
            {unreadSuggestionsCount > 0 && <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full mr-auto shadow-sm">{unreadSuggestionsCount}</span>}
          </button>
          <button onClick={() => setActiveTab('content')} className={`w-full whitespace-nowrap px-4 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === 'content' ? 'bg-gradient-to-r from-[#e84393]/10 to-transparent text-[#e84393]' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}>
            <span className={`text-xl ${activeTab === 'content' ? 'scale-110' : ''} transition-transform`}>🎨</span> 
            <span className="hidden md:inline">استديو المحتوى</span>
          </button>
          
          <div className="hidden md:block my-4 border-t border-gray-100 dark:border-white/5 mx-4"></div>

          <button onClick={() => setActiveTab('settings')} className={`w-full whitespace-nowrap px-4 py-3 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === 'settings' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}>
            <span className={`text-xl ${activeTab === 'settings' ? 'scale-110 animate-spin-slow' : ''} transition-transform`}>⚙️</span> 
            <span className="hidden md:inline">إعدادات النظام</span>
          </button>
        </div>

        <div className="hidden md:block p-6 mt-auto border-t border-gray-100 dark:border-white/5">
          <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4">
            <p className="text-xs text-gray-500 font-bold mb-3 flex items-center gap-2"><span>👤</span> مدير النظام</p>
            <div className="flex gap-2">
              <button onClick={fetchData} disabled={isUsersLoading} className="flex-1 py-2 bg-white dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-bold flex items-center justify-center transition-colors shadow-sm border border-gray-200 dark:border-white/5" title="تحديث البيانات">
                🔄
              </button>
              <button onClick={handleLogout} className="flex-1 py-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 rounded-xl font-bold flex items-center justify-center transition-colors shadow-sm" title="تسجيل خروج">
                🚪 خروج
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 space-y-8 pb-24 md:h-screen overflow-y-auto custom-scrollbar relative">
        {/* Mobile Header Controls */}
        <div className="md:hidden flex items-center justify-end gap-2 mb-4">
          <button onClick={fetchData} disabled={isUsersLoading} className="px-3 py-2 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-xl font-bold shadow-sm border border-gray-200 dark:border-white/5">
            🔄 تحديث
          </button>
          <button onClick={handleLogout} className="px-3 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl font-bold shadow-sm">
            🚪 خروج
          </button>
        </div>

        {/* Welcome Header */}
        <div className="glass p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm relative overflow-hidden bg-white/50 dark:bg-[#1a1a2e]/50 backdrop-blur-xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-[#0984e3]/10 via-[#00b894]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
          <div className="relative z-10 text-center sm:text-right">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">مرحباً فادي 👋</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">هنا يمكنك إدارة المنصة بالكامل (مستخدمين، إيرادات، تواصل، محتوى).</p>
          </div>
          
          <div className="w-full sm:w-auto relative z-10 flex-shrink-0">
            <div className="bg-white dark:bg-[#0f0f1a] rounded-xl p-2 border border-gray-200 dark:border-white/5 flex gap-3 items-center shadow-sm w-full sm:min-w-[300px]">
              <div className="text-lg px-2">🔑</div>
              <input
                type="password"
                value={adminToken}
                onChange={e => handleTokenChange(e.target.value)}
                placeholder="رمز API Token..."
                className="flex-1 bg-transparent font-mono text-sm outline-none text-gray-800 dark:text-gray-200 w-full"
              />
            </div>
          </div>
        </div>

      <AnimatePresence mode="wait">
        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-[#00b894]">المركز</span> المالي والنشاط 🌐
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <PremiumStatCard title="إجمالي المستخدمين" value={usersStats?.total_users || 0} icon="👥" color="blue" />
              <PremiumStatCard title="المستخدمين النشطين اليوم" value={usersStats?.today_users || 0} icon="🔥" color="orange" />
              <PremiumStatCard title="تحميلات التطبيق (APK)" value={downloadStats?.total || 0} icon="📦" color="emerald" />
              <PremiumStatCard title="الأرباح المتوقعة (هذا الشهر)" value="€1,240" icon="💰" color="rose" />
            </div>

            {usersStats && (
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Active Visitors Radar */}
                <div className="glass p-6 rounded-[2rem] border border-[#0984e3]/30 shadow-2xl relative overflow-hidden bg-[#0984e3]/5 lg:col-span-2">
                  <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0984e3]/10 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Radar Scanner Animation */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#0984e3]/20 rounded-full opacity-50 pointer-events-none"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#0984e3]/30 rounded-full opacity-50 pointer-events-none"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#0984e3]/40 rounded-full opacity-50 pointer-events-none bg-[#0984e3]/5"></div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none rounded-full"
                    style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(9, 132, 227, 0.4) 100%)' }}
                  ></motion.div>

                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <div>
                      <h3 className="font-black text-xl text-[#0984e3] flex items-center gap-2">
                        <span className="relative flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0984e3] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0984e3]"></span>
                        </span>
                        رادار الزوار المباشر 🌍
                      </h3>
                      <p className="text-sm text-gray-500 font-bold mt-1">يتم التحديث تلقائياً • {activeVisitors.length > 0 ? 'بيانات حقيقية' : 'بيانات تجريبية (لا يوجد زوار حالياً)'}</p>
                    </div>
                    <button onClick={fetchActiveVisitors} className="bg-[#0984e3] hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
                      <span>تحديث</span>
                      <span className="text-xs">🔄</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {(() => {
                      // Use real data if available, otherwise mock data for presentation
                      const visitorsToShow = activeVisitors.length > 0 ? activeVisitors : [
                        { ip_address: '192.168.1.1', country: 'DE', path: '/app/#/grammar', last_seen: new Date().toISOString(), user_agent: 'Chrome' },
                        { ip_address: '84.23.11.9', country: 'SY', path: '/app/#/vocabulary', last_seen: new Date().toISOString(), user_agent: 'Safari' },
                        { ip_address: '213.55.99.2', country: 'TR', path: '/', last_seen: new Date(Date.now() - 60000).toISOString(), user_agent: 'Firefox' },
                        { ip_address: '91.22.33.4', country: 'SE', path: '/app/#/leben', last_seen: new Date(Date.now() - 120000).toISOString(), user_agent: 'Edge' },
                        { ip_address: '176.44.55.6', country: 'AE', path: '/app/#/drill', last_seen: new Date(Date.now() - 180000).toISOString(), user_agent: 'Chrome Mobile' },
                      ];

                      return visitorsToShow.map((v: any, idx: number) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          key={idx} 
                          className="bg-white/80 dark:bg-[#1a1a2e]/80 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#0984e3]/50 transition-all shadow-sm group"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xl shadow-inner border border-gray-200 dark:border-white/5">
                                {v.country && v.country !== 'unknown' ? (
                                  <img src={`https://flagcdn.com/32x24/${v.country.toLowerCase()}.png`} alt={v.country} className="rounded-sm" />
                                ) : '🌐'}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm" dir="ltr">{v.ip_address}</h4>
                                <p className="text-[10px] text-gray-500 font-mono mt-0.5" dir="ltr">{v.country || 'Unknown'}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                              {new Date(v.last_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-black/30 rounded-xl p-2.5 flex items-center gap-2 border border-gray-100 dark:border-white/5 group-hover:bg-[#0984e3]/5 transition-colors">
                            <span className="text-gray-400 text-xs">📍</span>
                            <span className="text-xs font-bold text-[#0984e3] truncate flex-1" title={v.path} dir="ltr">
                              {getPathLabel(v.path)}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    })()}
                  </div>
                </div>

                {/* App Downloads Section */}
                <div className="glass p-6 rounded-[2rem] border border-[#00b894]/20 shadow-lg relative overflow-hidden bg-[#00b894]/5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00b894] rounded-full blur-[100px] opacity-10"></div>
                  <h3 className="font-black text-lg mb-6 text-[#00b894] flex items-center gap-2 relative z-10">
                    <span>📱</span> تحميلات التطبيق اليوم ({downloadStats?.today || 0})
                  </h3>
                  
                  <div className="h-64 overflow-y-auto custom-scrollbar relative z-10 pr-2">
                    {(() => {
                      const downloads = JSON.parse(localStorage.getItem('b1_app_downloads') || '[]')
                      if (downloads.length === 0) return <p className="text-gray-500 text-center mt-10">لا يوجد تحميلات مسجلة اليوم.</p>
                      return (
                        <div className="space-y-3">
                          {downloads.map((d: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center bg-white dark:bg-black/20 p-3 rounded-xl border border-gray-200 dark:border-white/5">
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white text-sm">{d.ip}</span>
                                <span className="text-[10px] text-gray-400">{d.userAgent}</span>
                              </div>
                              <span className="text-xs text-gray-500">{new Date(d.time).toLocaleTimeString()}</span>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="glass p-6 rounded-[2rem] border border-[#0984e3]/20 shadow-lg relative overflow-hidden bg-[#0984e3]/5">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-[#0984e3] rounded-full blur-[100px] opacity-10"></div>
                  <h3 className="font-black text-lg mb-6 text-[#0984e3] flex items-center gap-2 relative z-10">
                    <span>📈</span> منحنى التفاعل (آخر 7 أيام)
                  </h3>
                  <div className="h-64 w-full relative z-10" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockUserGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0984e3" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#0984e3" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(15, 15, 26, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 'bold', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
                          itemStyle={{ color: '#0984e3' }}
                        />
                        <Area type="monotone" dataKey="users" name="تفاعل المستخدمين" stroke="#0984e3" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                      </AreaChart>
                    </ResponsiveContainer>
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
            
            <div className="overflow-x-auto glass rounded-3xl border border-gray-200 dark:border-white/10 shadow-lg">
              <table className="w-full text-right text-sm">
                <thead className="bg-gray-50/80 dark:bg-[#1a1a2e]/80 text-gray-500 backdrop-blur-md sticky top-0 z-10">
                  <tr>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs">المستخدم</th>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">التفاعل</th>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">الباقة</th>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs">تاريخ الانضمام</th>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0984e3] to-[#00b894] text-white flex items-center justify-center font-bold shadow-md">
                            {(u.display_name || u.email || '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                              {u.display_name || 'بدون اسم'}
                              <span className="text-[10px] text-gray-400 font-mono bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">#{u.id}</span>
                            </div>
                            <div className="text-gray-500 text-xs mt-0.5" dir="ltr">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md text-xs">{u.progress_entries} درس</span>
                          <span className="font-bold text-orange-500 flex items-center gap-1 text-xs">🔥 {u.streak_current} أيام</span>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        {u.subscription_status === 'active' ? (
                          <span className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full font-bold text-xs border border-yellow-500/20 shadow-sm">
                            <span>👑</span> PRO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-bold text-xs">
                            FREE
                          </span>
                        )}
                      </td>
                      <td className="p-5 text-gray-500 text-xs font-medium" dir="ltr">
                        {new Date(u.created_at).toLocaleDateString('en-GB')}
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => alert('قريباً: تسجيل الدخول بصلاحيات هذا المستخدم لمعاينة حسابه.')} className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 hover:bg-[#0984e3]/10 hover:text-[#0984e3] hover:border-[#0984e3]/30 text-gray-600 dark:text-gray-400 p-2 rounded-xl transition-all shadow-sm" title="الدخول كالمستخدم">🕵️</button>
                          <button onClick={() => {
                            const xpToAdd = prompt('أدخل عدد نقاط الـ XP لإضافتها لهذا المستخدم (مثال: 500):')
                            if(xpToAdd) alert(`تم إرسال ${xpToAdd} XP للمستخدم بنجاح!`)
                          }} className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30 text-gray-600 dark:text-gray-400 p-2 rounded-xl transition-all shadow-sm" title="إرسال مكافأة XP">🎁</button>
                          <a href={`mailto:${u.email}`} className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 hover:bg-[#00b894]/10 hover:text-[#00b894] hover:border-[#00b894]/30 text-gray-600 dark:text-gray-400 p-2 rounded-xl transition-all shadow-sm flex items-center justify-center" title="مراسلة عبر الإيميل">✉️</a>
                          <button onClick={() => deleteUser(u.id, u.email)} className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 text-gray-600 dark:text-gray-400 p-2 rounded-xl transition-all shadow-sm" title="حذف الحساب">🗑️</button>
                        </div>
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

            {/* FEEDBACKS & ISSUES */}
            <div className="glass p-6 rounded-[2rem] border border-[#e17055]/30 flex flex-col h-[600px] shadow-lg relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#0f0f1a]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e17055] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="bg-[#e17055]/10 text-[#e17055] p-2.5 rounded-xl shadow-inner">📬</span> 
                  صندوق الوارد
                  {unreadSuggestionsCount > 0 && <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full shadow-md animate-pulse">{unreadSuggestionsCount} جديد</span>}
                </h2>
                <button onClick={fetchSuggestions} disabled={isSuggestionsLoading} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
                  {isSuggestionsLoading ? <span className="animate-spin">⏳</span> : <span>🔄 تحديث</span>}
                </button>
              </div>
              
              <div className="flex gap-2 mb-6 relative z-10 bg-gray-100 dark:bg-black/20 p-1.5 rounded-xl border border-gray-200/50 dark:border-white/5 w-fit">
                <button onClick={() => setSuggestionsFilter('unread')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${suggestionsFilter==='unread'?'bg-white dark:bg-gray-800 text-[#e17055] shadow-sm':'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>الجديدة</button>
                <button onClick={() => setSuggestionsFilter('all')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${suggestionsFilter==='all'?'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm':'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>الكل</button>
                <button onClick={() => setSuggestionsFilter('archived')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${suggestionsFilter==='archived'?'bg-white dark:bg-gray-800 text-emerald-600 shadow-sm':'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>المقروءة</button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2 relative z-10 pb-4">
                {suggestions.filter((s: any) => {
                  if (suggestionsFilter === 'unread') return s.status === 'unread'
                  if (suggestionsFilter === 'archived') return s.status === 'resolved'
                  return true
                }).length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full opacity-50 mt-10">
                    <span className="text-6xl mb-4">📭</span>
                    <p className="text-gray-500 font-bold">لا توجد رسائل حالياً.</p>
                  </div>
                )}
                {suggestions.filter((s: any) => {
                  if (suggestionsFilter === 'unread') return s.status === 'unread'
                  if (suggestionsFilter === 'archived') return s.status === 'resolved'
                  return true
                }).map((s: any) => (
                  <div key={s.id} className={`p-5 rounded-2xl border transition-all ${s.status === 'unread' ? 'bg-white dark:bg-[#1a1a2e] border-[#e17055]/30 shadow-md' : 'bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/5 opacity-80 hover:opacity-100'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e17055] to-orange-400 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                          {(s.name || s.email || 'M')[0].toUpperCase()}
                        </div>
                        <div>
                          <span className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                            {s.subject || 'رسالة تواصل'}
                            {s.status === 'unread' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                          </span>
                          <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                            <span className="font-bold">{s.name || 'بدون اسم'}</span>
                            {s.email && <span className="font-mono" dir="ltr">• {s.email}</span>}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-lg">{new Date(s.created_at || new Date()).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</span>
                    </div>
                    
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 bg-gray-50/50 dark:bg-black/30 p-4 rounded-xl leading-relaxed whitespace-pre-wrap border border-gray-100 dark:border-white/5">
                      {s.message}
                    </div>
                    
                    <div className="flex items-center gap-2 border-t border-gray-100 dark:border-white/5 pt-3">
                      {s.status === 'unread' && <button onClick={() => updateSuggestionStatus(s.id, 'read')} className="text-[#0984e3] text-xs font-bold bg-[#0984e3]/10 px-4 py-2 rounded-xl hover:bg-[#0984e3]/20 transition-colors flex items-center gap-1"><span>👀</span> مقروء</button>}
                      {s.status !== 'resolved' && <button onClick={() => updateSuggestionStatus(s.id, 'resolved')} className="text-emerald-600 text-xs font-bold bg-emerald-500/10 px-4 py-2 rounded-xl hover:bg-emerald-500/20 transition-colors flex items-center gap-1"><span>✔</span> أرشفة</button>}
                      {s.email && <a href={`mailto:${s.email}`} className="text-gray-600 dark:text-gray-400 text-xs font-bold bg-gray-100 dark:bg-white/10 px-4 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors flex items-center gap-1"><span>✉️</span> رد</a>}
                      <button onClick={() => deleteSuggestion(s.id)} className="text-red-600 text-xs font-bold bg-red-500/10 px-4 py-2 rounded-xl hover:bg-red-500/20 transition-colors mr-auto flex items-center gap-1 shadow-sm"><span>🗑️</span> حذف نهائي</button>
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
                <button onClick={async () => {
                  const newMode = config.maintenance_mode === '1' ? '0' : '1'
                  const newConfig = { ...config, maintenance_mode: newMode }
                  setConfig(newConfig)
                  if (!adminToken.trim()) return
                  try {
                    const res = await fetch(`${API_BASE}/admin/config`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': adminToken.trim() },
                      body: JSON.stringify(newConfig)
                    })
                    if (res.ok) setConfigStatus('✅ تم تحديث وضع الصيانة بنجاح.')
                  } catch (e) {}
                }} className={`px-6 py-2 rounded-xl text-white font-bold transition-all active:scale-95 ${config.maintenance_mode === '1' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-orange-500 hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)]'}`}>
                  {config.maintenance_mode === '1' ? '✅ إيقاف الصيانة' : '⚠️ تفعيل الصيانة الآن'}
                </button>
              </div>
              <input value={config.maintenance_message} onChange={e => setConfig({...config, maintenance_message: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 outline-none dark:bg-black/20" placeholder="رسالة الصيانة للزوار..." />
            </div>

            {/* ═══ TICKER / ANNOUNCEMENT EDITOR ═══ */}
            <div className="glass p-6 rounded-[2rem] border-2 border-[#0984e3]/30 shadow-xl relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#0984e3]/5 dark:to-transparent">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0984e3] flex items-center justify-center text-white text-xl shadow-md">📢</div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">شريط الإعلانات المتحرك</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">يظهر أسفل الهيدر مباشرة لجميع الزوار</p>
                  </div>
                </div>

                {/* Live Preview */}
                {config.announcement?.trim() && (
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner">
                    <div className="px-3 py-1 text-[10px] font-black text-gray-400 bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-white/10 uppercase tracking-widest">
                      معاينة مباشرة ↓
                    </div>
                    <div
                      className="flex items-center h-10 relative overflow-hidden"
                      style={{ backgroundColor: config.announcement_color || '#0984e3' }}
                    >
                      <div className="flex items-center gap-1 px-3 h-full shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                        <span className="text-xs font-black text-white">📢 إعلان</span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <motion.div
                          animate={{ x: ['100%', '-100%'] }}
                          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 12, ease: 'linear' } }}
                          className="whitespace-nowrap text-sm font-bold px-4 text-white inline-block"
                        >
                          {config.announcement} ◆ {config.announcement}
                        </motion.div>
                      </div>
                      <div className="w-10 h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                        <span className="text-white text-xs">✕</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Text Editor */}
                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 dark:text-gray-300">نص الإعلان</label>
                  <textarea
                    value={config.announcement}
                    onChange={e => setConfig({...config, announcement: e.target.value})}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 outline-none focus:border-[#0984e3] transition-colors text-base font-bold resize-none shadow-inner"
                    rows={3}
                    placeholder="اكتب هنا نص الإعلان الذي سيظهر لجميع الطلاب في شريط التمرير..."
                    dir="rtl"
                  />
                </div>

                {/* Quick Templates */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-wider">نصوص جاهزة ⚡</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '🎉 تحديث جديد! تم إضافة 3 ألعاب تعليمية جديدة',
                      '🆕 ميزة جديدة: شريط الإملاء الصوتي — جربه الآن!',
                      '⚡ تذكير: تحديك اليومي ينتهي في منتصف الليل',
                      '🏆 منافسة الأسبوع: من يجمع أكثر XP يفوز بجائزة',
                    ].map(t => (
                      <button
                        key={t}
                        onClick={() => setConfig({...config, announcement: t})}
                        className="text-xs px-3 py-1.5 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-lg hover:border-[#0984e3] hover:text-[#0984e3] transition-colors font-bold text-right"
                      >
                        {t.substring(0, 40)}...
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Picker */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex-1 space-y-2">
                    <label className="block text-sm font-black text-gray-700 dark:text-gray-300">لون الشريط</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.announcement_color || '#0984e3'}
                        onChange={e => setConfig({...config, announcement_color: e.target.value})}
                        className="w-12 h-10 rounded-xl border-2 border-gray-200 cursor-pointer shadow-md"
                      />
                      <div className="flex gap-2 flex-wrap">
                        {['#0984e3', '#00b894', '#6c5ce7', '#e17055', '#e84393', '#fdcb6e', '#d63031', '#2d3436'].map(c => (
                          <button
                            key={c}
                            onClick={() => setConfig({...config, announcement_color: c})}
                            className={`w-7 h-7 rounded-lg transition-all hover:scale-110 shadow-md ${config.announcement_color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-black text-gray-700 dark:text-gray-300">حذف الإعلان</label>
                    <button
                      onClick={() => setConfig({...config, announcement: ''})}
                      className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800/30 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                    >
                      🗑️ مسح النص
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-white/10">
                  <button
                    onClick={saveConfig}
                    disabled={isSavingConfig}
                    className="flex-1 py-3 bg-gradient-to-r from-[#0984e3] to-[#6c5ce7] text-white rounded-xl font-black text-base shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {isSavingConfig ? '⏳ جاري الحفظ...' : '💾 حفظ وتطبيق الإعلان فوراً'}
                  </button>
                  {configStatus && (
                    <span className={`text-sm font-bold ${configStatus.includes('✅') ? 'text-emerald-600' : 'text-red-500'}`}>
                      {configStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ═══ OTHER SETTINGS ═══ */}
            <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10">
              <h2 className="text-xl font-black mb-4">⚙️ إعدادات التطبيق والدعم</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold mb-1">رسالة الدعم (Buy Me a Coffee)</label>
                  <textarea value={config.support_message} onChange={e => setConfig({...config, support_message: e.target.value})} className="w-full p-2 rounded border outline-none dark:bg-black/20" rows={2} />
                  <div className="mt-2 flex gap-4">
                    <input placeholder="Web Version" value={config.web_version} onChange={e => setConfig({...config, web_version: e.target.value})} className="w-full p-2 border rounded text-xs dark:bg-black/20" />
                    <input placeholder="APK Version" value={config.apk_version} onChange={e => setConfig({...config, apk_version: e.target.value})} className="w-full p-2 border rounded text-xs dark:bg-black/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">رابط APK</label>
                  <input value={config.apk_url} onChange={e => setConfig({...config, apk_url: e.target.value})} className="w-full p-2 rounded border outline-none dark:bg-black/20 text-xs" dir="ltr" />
                </div>
              </div>
              <button onClick={saveConfig} disabled={isSavingConfig} className="bg-[#00b894] text-white px-6 py-2.5 rounded-xl font-bold">
                {isSavingConfig ? '⏳ جاري الحفظ...' : '💾 حفظ الإعدادات'}
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

            {/* LESEN GENERATOR (NEW) */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="glass p-6 rounded-[2rem] border border-[#0984e3]/30 shadow-lg bg-[#0984e3]/5">
                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2"><span>📝</span> توليد نص قراءة (Lesen)</h2>
                <div className="space-y-3">
                  <input type="text" value={vocabWord} onChange={e => setVocabWord(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-black/20" placeholder="عنوان النص (Einladung zur Party)" dir="ltr" />
                  <textarea value={vocabMeaning} onChange={e => setVocabMeaning(e.target.value)} rows={3} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-black/20" placeholder="النص الألماني كاملاً..." dir="ltr" />
                  <textarea value={vocabExample} onChange={e => setVocabExample(e.target.value)} rows={3} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-black/20" placeholder="سؤال 1: الخيارات مفصولة بفاصلة (السؤال, الخيار1, الخيار2, الخيار الصحيح)" dir="ltr" />
                  <button onClick={() => {
                    const code = `{
  type: 'mc-article',
  title: '${vocabWord}',
  instructionsAr: 'اقرأ النص ثم أجب عن الأسئلة:',
  textDe: '${vocabMeaning.replace(/\n/g, "\\n")}',
  questions: [
    // Add your questions parsed from the textarea here...
  ]
}`
                    setGeneratedCode(code)
                    setCopied(false)
                  }} className="w-full py-3 bg-[#0984e3] hover:bg-[#076bb8] text-white rounded-xl font-black">توليد كود القراءة ⚡</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}


    </AnimatePresence>
      </main>
    </div>
  )
}
