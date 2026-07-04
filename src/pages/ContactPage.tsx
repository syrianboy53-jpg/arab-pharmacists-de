import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
    website: '' // honeypot
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.website) {
      setStatus('success')
      return
    }

    if (formData.message.trim().length < 10) {
      setStatus('error')
      setErrorMessage('الرسالة قصيرة جداً. يرجى كتابة 10 أحرف على الأقل.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('https://www.b1-syrer.de/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', topic: 'general', message: '', website: '' })
      } else {
        throw new Error(data.detail || 'حدث خطأ غير متوقع')
      }
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err.message || 'فشل الاتصال بالخادم. حاول لاحقاً.')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-12 animate-fade-in" dir="rtl">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Info Column */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-8 border border-gray-200 dark:border-white/10 relative overflow-hidden h-full shadow-lg"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#00b894]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#0984e3]/10 rounded-full blur-3xl -z-10" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00b894] to-[#00cec9] flex items-center justify-center text-white mb-6 shadow-lg shadow-[#00b894]/30">
              <MessageSquare size={32} />
            </div>
            
            <h1 className="text-3xl font-black mb-4">تواصل معنا</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              نحن هنا لمساعدتك والاستماع لاقتراحاتك. سواء كان لديك استفسار عن الامتحانات، أو واجهت مشكلة تقنية، لا تتردد في مراسلتنا وسيتم عرض رسالتك للإدارة مباشرة!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 shadow-inner">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-bold">البريد الإلكتروني المباشر</div>
                  <a href="mailto:shami.fadi@gmx.de" className="font-bold hover:text-blue-500 transition-colors" dir="ltr">shami.fadi@gmx.de</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-3 bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-white/5 shadow-xl relative"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h2 className="text-2xl font-black text-center text-green-500">تم إرسال رسالتك بنجاح!</h2>
              <p className="text-center text-gray-600 dark:text-gray-400">شكراً لتواصلك معنا. لقد استلمت الإدارة رسالتك وسيتم قراءتها قريباً.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 px-6 py-2 bg-gray-100 dark:bg-white/5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#00b894] transition-colors"
                    placeholder="أدخل اسمك"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#00b894] transition-colors text-left"
                    placeholder="email@example.com"
                    dir="ltr"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">نوع الرسالة</label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#00b894] transition-colors"
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
                >
                  <option value="general">استفسار عام</option>
                  <option value="feedback">اقتراح أو ملاحظة لتطوير الموقع</option>
                  <option value="premium">مشكلة تقنية</option>
                  <option value="lessons">التدريب والدروس</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">تفاصيل الرسالة</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#00b894] transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا بوضوح لتسهيل الرد..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              {/* Honeypot field - Hidden from users to catch bots */}
              <input
                type="text"
                name="website"
                style={{ display: 'none' }}
                value={formData.website}
                onChange={e => setFormData({...formData, website: e.target.value})}
                tabIndex={-1}
                autoComplete="off"
              />

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-xl text-sm font-bold animate-shake">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#00b894] to-[#00cec9] hover:opacity-90 transition-opacity shadow-lg shadow-[#00b894]/30 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">جاري الإرسال...</span>
                ) : (
                  <>
                    <span>إرسال الرسالة إلى الإدارة</span>
                    <Send size={18} className="rotate-180" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
