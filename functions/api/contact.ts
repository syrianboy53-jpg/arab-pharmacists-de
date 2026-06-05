import { Env, query } from '../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  
  try {
    const body = await request.json() as any
    const {
      name,
      email,
      subject,
      message,
      topic,
      website
    } = body

    // 1. Honeypot check (anti-spam)
    if (website && website.trim().length > 0) {
      console.log('Spam detected via honeypot website field:', website)
      // Return 200 OK to spam bots to fool them into thinking the submission succeeded
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 2. Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        ok: false,
        detail: 'يرجى تعبئة الحقول الأساسية: الاسم، البريد الإلكتروني، والرسالة.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        ok: false,
        detail: 'البريد الإلكتروني المدخل غير صالح.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (message.trim().length < 10) {
      return new Response(JSON.stringify({
        ok: false,
        detail: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // 3. Send notification email via Resend
    if (env.RESEND_API_KEY) {
      const topics: Record<string, string> = {
        general: 'استفسار عام',
        feedback: 'اقتراح أو ملاحظة',
        premium: 'مشاكل الاشتراك / الدفع',
        lessons: 'الدروس الخاصة والطلب الشفوي',
        collab: 'شراكة / تعاون',
        other: 'أخرى'
      }
      const topicName = topics[topic] || topic || 'غير محدد'

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'B1 Deutsch Contact <contact@b1-syrer.de>',
            to: ['syrianboy53@gmail.com'],
            reply_to: email.trim(),
            subject: `رسالة تواصل جديدة: ${subject ? subject.trim() : topicName}`,
            html: `
              <div dir="rtl" style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
                <h2 style="color: #0F7B3E; border-bottom: 2px solid #0F7B3E; padding-bottom: 10px; margin-top: 0;">رسالة تواصل جديدة من الموقع</h2>
                
                <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 4px; border-inline-start: 4px solid #0F7B3E;">
                  <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                    <li><strong>الاسم:</strong> ${name.trim()}</li>
                    <li><strong>البريد الإلكتروني:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></li>
                    <li><strong>القسم/الموضوع الفرعي:</strong> ${topicName}</li>
                    ${subject ? `<li><strong>العنوان الفرعي:</strong> ${subject.trim()}</li>` : ''}
                  </ul>
                </div>
                
                <h3 style="color: #094F28; font-size: 16px; margin-top: 20px; border-bottom: 1px dashed #eee; padding-bottom: 6px;">محتوى الرسالة:</h3>
                <div style="white-space: pre-wrap; background-color: #fff; border: 1px solid #f0f0f0; padding: 15px; border-radius: 6px; font-size: 14.5px; line-height: 1.6;">
                  ${message.trim()}
                </div>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 11px; color: #999; text-align: center; margin-bottom: 0;">هذا البريد تم إرساله تلقائياً من نظام الاتصال في B1-Syrer.de.</p>
              </div>
            `
          })
        })
      } catch (err) {
        console.error('Failed to send contact notification email via Resend:', err)
      }
    }

    // 4. Save to database feedback table (so it shows up in Fadi's Admin Dashboard)
    try {
      const topics: Record<string, string> = {
        general: 'استفسار عام',
        feedback: 'اقتراح أو ملاحظة',
        premium: 'مشاكل الاشتراك / الدفع',
        lessons: 'الدروس الخاصة والطلب الشفوي',
        collab: 'شراكة / تعاون',
        other: 'أخرى'
      }
      const topicName = topics[topic] || topic || 'غير محدد'
      const finalSubject = subject ? subject.trim() : topicName;

      await query(env, 
        'INSERT INTO feedback (name, email, subject, message, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          name.trim(),
          email.trim(),
          finalSubject,
          message.trim(),
          'unread',
          new Date().toISOString()
        ]
      )
      console.log('Saved feedback to database successfully')
    } catch (dbErr) {
      console.error('Failed to save feedback to database:', dbErr)
    }

    return new Response(JSON.stringify({
      ok: true
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, detail: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
