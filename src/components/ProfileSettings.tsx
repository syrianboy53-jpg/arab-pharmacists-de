import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Lock, Mail, User, Phone } from 'lucide-react'

export default function ProfileSettings() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    // Load current user from localStorage
    try {
      const savedUser = localStorage.getItem('b1-current-user')
      if (savedUser) {
        const u = JSON.parse(savedUser)
        setName(u.name || u.display_name || '')
        setEmail(u.email || '')
        setContactInfo(u.contact_info || '')
      }
    } catch (e) {
      console.error('Failed to load user', e)
    }
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    setIsLoading(true)

    try {
      // 1. Update local storage DB
      const usersDb = JSON.parse(localStorage.getItem('b1-users-db') || '[]')
      const currentUser = JSON.parse(localStorage.getItem('b1-current-user') || '{}')
      
      const userIndex = usersDb.findIndex((u: any) => u.email === currentUser.email || u.id === currentUser.id)
      
      if (userIndex >= 0) {
        // Validate password if changing password or email
        const user = usersDb[userIndex]
        if (newPassword || (email !== user.email)) {
          if (user.password !== currentPassword) {
            setMessage({ type: 'error', text: 'كلمة المرور الحالية غير صحيحة' })
            setIsLoading(false)
            return
          }
        }

        // Update fields
        usersDb[userIndex].name = name
        usersDb[userIndex].email = email
        usersDb[userIndex].contact_info = contactInfo
        if (newPassword) {
          usersDb[userIndex].password = newPassword
        }

        localStorage.setItem('b1-users-db', JSON.stringify(usersDb))
        localStorage.setItem('b1-current-user', JSON.stringify(usersDb[userIndex]))
      } else {
        // Just update current user if not found in DB
        currentUser.name = name
        currentUser.email = email
        currentUser.contact_info = contactInfo
        localStorage.setItem('b1-current-user', JSON.stringify(currentUser))
      }

      // 2. Send email notification via backend
      try {
        await fetch('/api/send-profile-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, contactInfo })
        })
      } catch (err) {
        console.warn('Failed to send email notification', err)
      }

      setMessage({ type: 'success', text: 'تم تحديث بياناتك بنجاح! راجع بريدك الإلكتروني.' })
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء الحفظ.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1a1a2e] rounded-xl p-6 border border-gray-100 dark:border-white/5 font-cairo"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
        <User className="text-[#0984e3]" />
        ملف المتعلم وإعدادات الحساب
      </h2>

      {message.text && (
        <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-red-50 text-red-600 dark:bg-red-900/20'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم بالكامل</label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-white/10 rounded-xl py-3 pr-10 pl-4 text-gray-900 dark:text-white focus:outline-none focus:border-[#0984e3]"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-white/10 rounded-xl py-3 pr-10 pl-4 text-gray-900 dark:text-white focus:outline-none focus:border-[#0984e3]"
              required
            />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">معلومات التواصل (رقم الهاتف، واتساب، الخ)</label>
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="مثال: +49 151..."
              className="w-full bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-white/10 rounded-xl py-3 pr-10 pl-4 text-gray-900 dark:text-white focus:outline-none focus:border-[#0984e3]"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-white/10 pt-6 mt-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
            <Lock className="text-[#e84393]" />
            تغيير كلمة المرور
          </h3>
          <p className="text-xs text-gray-500 mb-4">اترك الحقول فارغة إذا لم تكن ترغب بتغيير كلمة المرور.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الحالية</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:border-[#e84393]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الجديدة</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:border-[#e84393]"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0984e3] hover:bg-[#74b9ff] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          {isLoading ? <span className="animate-pulse">جاري الحفظ...</span> : <><Save size={20} /> حفظ التغييرات</>}
        </button>
      </form>
    </motion.div>
  )
}
