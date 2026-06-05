import { Env, query, sha256 } from '../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  try {
    // 1. Generate new password (10 characters)
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let newPassword = ''
    const randBytes = new Uint8Array(10)
    crypto.getRandomValues(randBytes)
    for (let i = 0; i < 10; i++) {
      newPassword += chars[randBytes[i] % chars.length]
    }

    // 2. Generate new salt and hash
    const newSalt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0')).join('')
    const newHash = await sha256(newPassword + newSalt)

    // 3. Update DB
    await query(env, 
      "UPDATE admin_credentials SET password_hash = $1, password_salt = $2, updated_at = NOW() WHERE id = 1",
      [newHash, newSalt]
    )

    // 4. Send email using Resend
    if (!env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured on the server.')
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'B1 Deutsch <noreply@b1-syrer.de>',
        to: ['syrianboy53@gmail.com'],
        subject: 'إعادة تعيين كلمة مرور الإدارة - B1 Deutsch',
        html: `
          <div dir="rtl" style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #0F7B3E; border-bottom: 2px solid #0F7B3E; padding-bottom: 10px;">إعادة تعيين كلمة مرور الإدارة</h2>
            <p>مرحباً فادي،</p>
            <p>تمت إعادة تعيين كلمة المرور الخاصة بلوحة الإدارة بناءً على طلبك.</p>
            <div style="background-color: #f9f9f9; border-inline-start: 4px solid #0F7B3E; padding: 12px; margin: 20px 0; font-size: 18px; text-align: center;">
              كلمة المرور الجديدة هي: <strong style="font-family: monospace; color: #094F28; letter-spacing: 1px;">${newPassword}</strong>
            </div>
            <p style="color: #666; font-size: 13px;">يرجى تسجيل الدخول وتغيير كلمة المرور فوراً من إعدادات الأمان في لوحة التحكم.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 11px; color: #999; text-align: center;">هذا البريد تم إرساله تلقائياً من تطبيق B1-Syrer.de.</p>
          </div>
        `
      })
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      throw new Error(`Failed to send email: ${errText}`)
    }

    // 5. Log recovery IP hash
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const ipHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))))
      .map(b => b.toString(16).padStart(2, '0')).join('')
    await query(env, "INSERT INTO admin_recovery_log (ip_hash, created_at) VALUES ($1, NOW())", [ipHash])

    return new Response(JSON.stringify({
      message: 'تم إرسال كلمة المرور الجديدة إلى بريدك الإلكتروني بنجاح (syrianboy53@gmail.com).'
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
