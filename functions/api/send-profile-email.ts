import { Env } from '../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  
  try {
    const body = await request.json() as any
    const { email, name, contactInfo } = body

    if (!email) {
      return new Response(JSON.stringify({ ok: false, error: 'Email required' }), { status: 400 })
    }

    if (env.RESEND_API_KEY) {
      const emailContent = `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #059669;">مرحباً ${name || 'صديقنا'}،</h2>
          <p>تم تحديث بيانات ملفك الشخصي في موقع <strong>B1 Syrer</strong> بنجاح.</p>
          <ul>
            ${name ? `<li><strong>الاسم:</strong> ${name}</li>` : ''}
            <li><strong>البريد الإلكتروني:</strong> ${email}</li>
            ${contactInfo ? `<li><strong>معلومات التواصل:</strong> ${contactInfo}</li>` : ''}
          </ul>
          <p>إذا لم تقم بهذا التغيير، يرجى التواصل معنا فوراً.</p>
          <br>
          <p>مع تحيات،<br>فريق B1 Syrer</p>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'B1 Syrer <noreply@b1-syrer.de>',
          to: [email],
          subject: 'إشعار تحديث بيانات الحساب - B1 Syrer',
          html: emailContent
        })
      });
    }

    return new Response(JSON.stringify({ ok: true, message: 'Email sent successfully' }), { status: 200 })

  } catch (err: any) {
    console.error('Send email error:', err)
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 })
  }
}
