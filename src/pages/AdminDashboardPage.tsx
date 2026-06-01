import { useState, useEffect } from 'react'

const API_BASE = 'https://www.b1-syrer.de'

export default function AdminDashboardPage() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
  const [authenticated, setAuthenticated] = useState(false)
  const [config, setConfig] = useState<Record<string, string>>({})
  const [announcement, setAnnouncement] = useState('')
  const [pushTitle, setPushTitle] = useState('')
  const [pushBody, setPushBody] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (token && !authenticated) {
      fetchConfig()
    }
  }, [])

  async function fetchConfig() {
    try {
      const res = await fetch(`${API_BASE}/config`)
      const data = await res.json()
      setConfig(data)
      setAnnouncement(data.announcement || '')
      setAuthenticated(true)
      localStorage.setItem('admin_token', token)
    } catch {
      setStatus('خطأ في الاتصال')
    }
  }

  async function login() {
    if (!token) return
    localStorage.setItem('admin_token', token)
    await fetchConfig()
  }

  async function updateConfig(key: string, value: string) {
    try {
      const res = await fetch(`${API_BASE}/admin/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
        body: JSON.stringify({ [key]: value })
      })
      if (res.ok) setStatus(`تمّ تحديث ${key}`)
      else setStatus('خطأ: ' + (await res.text()))
    } catch { setStatus('خطأ في الاتصال') }
  }

  async function sendPush() {
    try {
      const res = await fetch(`${API_BASE}/push/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
        body: JSON.stringify({ title: pushTitle, body: pushBody })
      })
      if (res.ok) setStatus('تمّ إرسال الإشعار!')
      else setStatus('خطأ: ' + (await res.text()))
    } catch { setStatus('خطأ في الاتصال') }
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white rounded-xl p-8 shadow-sm">
        <h1 className="text-xl font-bold text-center mb-6">🔐 لوحة الإدارة</h1>
        <input
          type="password"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Admin Token"
          className="w-full border rounded-lg p-3 mb-4"
          dir="ltr"
        />
        <button onClick={login} className="w-full bg-green text-white py-3 rounded-xl font-bold">دخول</button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🔐 لوحة الإدارة</h1>
      {status && <div className="bg-blue-50 text-blue-700 rounded-lg p-3 text-sm">{status}</div>}

      {/* Config Overview */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold mb-3">📊 الإعدادات الحالية</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted">إصدار الويب:</span> <strong>{config.web_version}</strong></div>
          <div><span className="text-muted">إصدار APK:</span> <strong>{config.apk_version}</strong></div>
        </div>
      </div>

      {/* Announcement */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold mb-3">📢 إعلان</h2>
        <textarea value={announcement} onChange={e => setAnnouncement(e.target.value)} className="w-full border rounded-lg p-3 min-h-[80px] text-sm" placeholder="اكتب إعلاناً يظهر لجميع المستخدمين..." />
        <button onClick={() => updateConfig('announcement', announcement)} className="mt-2 bg-green text-white px-6 py-2 rounded-lg font-bold text-sm">حفظ الإعلان</button>
      </div>

      {/* Push Notification */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold mb-3">🔔 إشعار Push</h2>
        <input value={pushTitle} onChange={e => setPushTitle(e.target.value)} placeholder="العنوان" className="w-full border rounded-lg p-3 mb-2 text-sm" />
        <textarea value={pushBody} onChange={e => setPushBody(e.target.value)} placeholder="المحتوى" className="w-full border rounded-lg p-3 min-h-[80px] text-sm" />
        <button onClick={sendPush} className="mt-2 bg-red text-white px-6 py-2 rounded-lg font-bold text-sm">إرسال لجميع المستخدمين</button>
      </div>
    </div>
  )
}
