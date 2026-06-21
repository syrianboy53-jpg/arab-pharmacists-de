import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, AlertTriangle, MessageSquare } from 'lucide-react'

export interface FeedbackData {
  id: string
  type: 'issue' | 'feedback'
  message: string
  email?: string
  date: string
  status: 'new' | 'read' | 'resolved'
}

interface Props {
  isOpen: boolean
  onClose: () => void
  type: 'issue' | 'feedback'
}

export default function FeedbackModal({ isOpen, onClose, type }: Props) {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newFeedback: FeedbackData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      email,
      date: new Date().toISOString(),
      status: 'new'
    }

    // Save to local storage for Admin Dashboard
    const existing = JSON.parse(localStorage.getItem('b1-feedbacks') || '[]')
    localStorage.setItem('b1-feedbacks', JSON.stringify([newFeedback, ...existing]))

    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setMessage('')
      setEmail('')
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-[#1a1a2e] p-6 rounded-3xl shadow-2xl z-[101] border border-gray-200 dark:border-white/10"
            dir="rtl"
          >
            <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500">
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">تم الإرسال بنجاح!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">شكراً لك، رسالتك تساهم في تحسين المنصة.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === 'issue' ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'}`}>
                    {type === 'issue' ? <AlertTriangle size={20} /> : <MessageSquare size={20} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {type === 'issue' ? 'الإبلاغ عن مشكلة' : 'شاركنا رأيك'}
                    </h3>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {type === 'issue' ? 'وصف المشكلة' : 'رسالتك / مقترحك'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={type === 'issue' ? 'يرجى وصف المشكلة بالتفصيل...' : 'ما الذي تود إضافته أو تحسينه في الموقع؟'}
                    className="w-full bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b894] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="للتواصل معك إذا لزم الأمر"
                    className="w-full bg-gray-50 dark:bg-[#0f0f1a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00b894] hover:bg-[#00a884] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-colors"
                >
                  <Send size={18} />
                  إرسال
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
