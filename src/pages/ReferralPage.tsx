import { useState } from 'react'

export default function ReferralPage() {
  const [code] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase())
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black flex items-center gap-2 text-gray-900 dark:text-gray-900 dark:text-white">👥 ادعُ صديقاً</h1>
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 text-center">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">شارك كودك مع أصدقائك</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">عندما يسجّل صديقك بكودك، تحصلان معاً على 200 XP إضافية!</p>
        <div className="bg-gray-100 dark:bg-white/10 rounded-xl p-4 flex items-center justify-center gap-4">
          <span className="text-3xl font-mono font-bold tracking-widest text-emerald-600">{code}</span>
          <button onClick={copy} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm cursor-pointer hover:bg-emerald-700 transition-colors">{copied ? '✅ تم النسخ' : '📋 انسخ'}</button>
        </div>
      </div>
    </div>
  )
}
