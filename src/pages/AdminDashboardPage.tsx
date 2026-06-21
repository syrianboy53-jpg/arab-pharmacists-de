import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AdminTab = 'overview' | 'generator' | 'maintenance'

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('b1-admin-auth') === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  // Content Generator State
  const [genType] = useState<'vocabulary' | 'grammar'>('vocabulary')
  const [vocabWord, setVocabWord] = useState('')
  const [vocabMeaning, setVocabMeaning] = useState('')
  const [vocabExample, setVocabExample] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [copied, setCopied] = useState(false)

  // Maintenance State
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'fadi2024') {
      sessionStorage.setItem('b1-admin-auth', '1')
      setAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('كلمة المرور غير صحيحة')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('b1-admin-auth')
    setAuthenticated(false)
  }

  const generateCode = () => {
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

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 glass rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-lg">
            👑
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">لوحة المصمّم</h1>
          <p className="text-sm text-gray-500 mt-2">تسجيل الدخول للمسؤولين فقط (فادي)</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="كلمة المرور..."
              className="w-full p-4 bg-white dark:bg-black/20 border-2 border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#00b894] transition-colors text-center text-xl tracking-widest text-gray-900 dark:text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          {loginError && <p className="text-red-500 text-sm font-bold text-center">{loginError}</p>}
          <button type="submit" className="w-full py-4 bg-[#00b894] hover:bg-[#00a884] text-white rounded-xl font-black text-lg transition-colors">
            دخول
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto pb-10 space-y-6">
      
      {/* Header */}
      <div className="glass p-6 rounded-3xl border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👑</div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">مرحباً فادي 👋</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Content Studio & App Manager</p>
          </div>
        </div>
        <button onClick={handleLogout} className="px-6 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-100 dark:border-red-900/30">
          تسجيل الخروج 🚪
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10 w-fit mx-auto sm:mx-0">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          📊 نظرة عامة
        </button>
        <button 
          onClick={() => setActiveTab('generator')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'generator' ? 'bg-[#00b894] text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          <span>⚡</span> مولّد المحتوى
        </button>
        <button 
          onClick={() => setActiveTab('maintenance')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'maintenance' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          <span>🚧</span> الصيانة
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center gap-4">
                <div className="text-4xl">👥</div>
                <div>
                  <p className="text-sm text-gray-500">المستخدمين (Mock)</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">1,240</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center gap-4">
                <div className="text-4xl">📚</div>
                <div>
                  <p className="text-sm text-gray-500">كلمات القاموس</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">6,000+</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl border border-gray-200 dark:border-white/10 flex items-center gap-4">
                <div className="text-4xl">⚡</div>
                <div>
                  <p className="text-sm text-gray-500">حالة السيرفر</p>
                  <p className="text-2xl font-black text-emerald-500">Serverless (مستقر)</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-200 dark:border-blue-900/30">
              <h3 className="text-blue-800 dark:text-blue-400 font-black text-lg mb-2">💡 ملاحظة تقنية</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                بما أن التطبيق يعمل بشكل ثابت (Static) ومجاني 100%، لا يوجد قاعدة بيانات لجمع أرقام المستخدمين الحقيقية لحماية خصوصيتهم.
                لقد تم تصميم هذه اللوحة لتكون "استوديو محتوى" يساعدك على إضافة المفردات والقواعد بسهولة لتطوير التطبيق دون الحاجة لكتابة كود برمجي.
              </p>
            </div>
          </motion.div>
        )}

        {/* GENERATOR TAB */}
        {activeTab === 'generator' && (
          <motion.div key="generator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-6">
            
            <div className="glass p-6 rounded-[2rem] border border-emerald-200 dark:border-emerald-900/30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">✨</span>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">إضافة مفردات جديدة</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">الكلمة بالألمانية (مع الأداة)</label>
                  <input 
                    type="text" 
                    value={vocabWord} 
                    onChange={e => setVocabWord(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
                    placeholder="مثال: der Arzt"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">الترجمة العربية</label>
                  <input 
                    type="text" 
                    value={vocabMeaning} 
                    onChange={e => setVocabMeaning(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
                    placeholder="مثال: الطبيب"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">مثال (اختياري)</label>
                  <input 
                    type="text" 
                    value={vocabExample} 
                    onChange={e => setVocabExample(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
                    placeholder="مثال: Ich gehe zum Arzt."
                    dir="ltr"
                  />
                </div>
                <button 
                  onClick={generateCode}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-[#00b894] to-[#00cec9] hover:opacity-90 text-white rounded-xl font-black transition-all shadow-lg hover:shadow-xl"
                >
                  توليد الكود البرمجي ⚡
                </button>
              </div>
            </div>

            <div className="glass p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-lg flex flex-col">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">الكود الجاهز</h2>
              <p className="text-sm text-gray-500 mb-4">انسخ هذا السطر وضعه داخل مصفوفة الكلمات في ملف <code className="text-[#00b894]">src/data/vocabulary.ts</code></p>
              
              <div className="flex-1 bg-gray-900 rounded-2xl p-4 relative font-mono text-sm text-green-400 overflow-hidden flex items-center justify-center min-h-[150px]">
                {generatedCode ? (
                  <p className="break-all" dir="ltr">{generatedCode}</p>
                ) : (
                  <p className="text-gray-600">سيظهر الكود المولد هنا...</p>
                )}
              </div>
              
              <button 
                onClick={copyToClipboard}
                disabled={!generatedCode}
                className={`w-full py-4 mt-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 ${
                  copied ? 'bg-emerald-500 text-white' : 
                  !generatedCode ? 'bg-gray-200 text-gray-400 dark:bg-white/5 cursor-not-allowed' : 
                  'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-[1.02]'
                }`}
              >
                {copied ? '✅ تم النسخ!' : '📋 نسخ الكود'}
              </button>
            </div>

          </motion.div>
        )}

        {/* MAINTENANCE TAB */}
        {activeTab === 'maintenance' && (
          <motion.div key="maintenance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto space-y-6">
            <div className="glass p-8 rounded-[2rem] border border-orange-200 dark:border-orange-900/30 text-center shadow-xl">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">محاكي وضع الصيانة</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                استخدم هذا الزر لرؤية الشاشة التي ستظهر للمستخدمين عندما يتم إغلاق الموقع للصيانة والتحديثات.
              </p>
              
              <button 
                onClick={() => setIsMaintenanceActive(true)}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black text-lg shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1"
              >
                تفعيل تجريبي للصيانة ⚠️
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Maintenance Overlay (Mock) */}
      <AnimatePresence>
        {isMaintenanceActive && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#1a1a2e] max-w-lg w-full rounded-3xl p-8 md:p-12 text-center shadow-2xl border border-gray-200 dark:border-white/10"
            >
              <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                🛠️
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">تحديثات هامة!</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                مرحباً! يقوم المطور (فادي الحلواني) حالياً برفع محتوى جديد وتطوير الموقع ليكون أفضل. 
                سنعود خلال دقائق معدودة 🚀
              </p>
              <button 
                onClick={() => setIsMaintenanceActive(false)}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-black hover:scale-[1.02] transition-transform"
              >
                إغلاق وضع التجربة (Admin Only)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
