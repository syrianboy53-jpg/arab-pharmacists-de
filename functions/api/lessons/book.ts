import { Env, query } from '../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  
  try {
    const body = await request.json() as any
    const {
      slot_start,
      user_name,
      user_email,
      user_phone,
      topic_category,
      topic_detail,
      notes
    } = body

    // 1. Basic validation
    if (!slot_start || !user_name || !user_email || !topic_category) {
      return new Response(JSON.stringify({
        ok: false,
        detail: 'جميع الحقول المطلوبة يجب تعبئتها.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(user_email)) {
      return new Response(JSON.stringify({
        ok: false,
        detail: 'البريد الإلكتروني المدخل غير صالح.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // 2. Check if the slot is already booked
    const checkRes = await query(env, `
      SELECT id FROM lesson_bookings
      WHERE slot_start = $1 AND status != 'cancelled'
    `, [slot_start])

    if (checkRes.rows && checkRes.rows.length > 0) {
      return new Response(JSON.stringify({
        ok: false,
        detail: 'هذا الموعد محجوز بالفعل. يرجى اختيار موعد آخر.'
      }), { status: 409, headers: { 'Content-Type': 'application/json' } })
    }

    // 3. Setup dates and calculate slot_end
    const durationMin = 45
    const startDate = new Date(slot_start)
    const endDate = new Date(startDate.getTime() + durationMin * 60 * 1000)
    const slot_end = endDate.toISOString()

    // 4. Generate unique booking ID and insert into database
    const bookingId = crypto.randomUUID()
    
    await query(env, `
      INSERT INTO lesson_bookings (
        id, user_name, user_email, user_phone, topic_category, topic_detail, 
        slot_start, slot_end, duration_min, price_eur, paid, status, 
        admin_notes, room_id, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
    `, [
      bookingId,
      user_name.trim(),
      user_email.trim(),
      (user_phone || '').trim(),
      topic_category,
      (topic_detail || '').trim(),
      slot_start,
      slot_end,
      durationMin,
      7.00,
      false,
      'pending',
      notes ? notes.trim() : null,
      bookingId
    ])

    // 5. Send confirmation email via Resend (async, catch errors)
    if (env.RESEND_API_KEY) {
      const topics: Record<string, string> = {
        speaking: 'المحادثة والتحضير الشفهي',
        writing: 'كتابة الرسائل والتحضير الكتابي',
        grammar: 'قواعد اللغة والتمارين',
        general: 'استشارة عامة ونقاش خطة الدراسة'
      }
      const topicName = topics[topic_category] || topic_category
      
      const formattedDate = new Intl.DateTimeFormat('ar-EG', {
        timeZone: 'Europe/Berlin',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }).format(startDate)

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'B1 Deutsch <noreply@b1-syrer.de>',
            to: [user_email.trim()],
            bcc: ['syrianboy53@gmail.com'],
            subject: 'تأكيد طلب حجز درس خاص - B1 Deutsch',
            html: `
              <div dir="rtl" style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
                <h2 style="color: #0F7B3E; border-bottom: 2px solid #0F7B3E; padding-bottom: 10px; margin-top: 0;">تم استلام طلب حجز الدرس الخاص بنجاح</h2>
                <p>مرحباً <strong>${user_name.trim()}</strong>،</p>
                <p>شكراً لاهتمامك بالدروس الخاصة. لقد تم استلام طلب الحجز الخاص بك وهو قيد المراجعة الآن.</p>
                
                <div style="background-color: #f9f9f9; border-inline-start: 4px solid #0F7B3E; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <h3 style="margin-top: 0; color: #094F28; font-size: 16px;">تفاصيل الموعد:</h3>
                  <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                    <li><strong>رقم الحجز:</strong> <code style="font-family: monospace; font-size: 14px; background: #eee; padding: 2px 6px; border-radius: 4px;">${bookingId}</code></li>
                    <li><strong>التوقيت (بتوقيت ألمانيا):</strong> ${formattedDate}</li>
                    <li><strong>موضوع الدرس:</strong> ${topicName}</li>
                    ${topic_detail ? `<li><strong>التركيز على:</strong> ${topic_detail.trim()}</li>` : ''}
                    <li><strong>سعر الجلسة:</strong> 7 € (تدفع بعد التأكيد)</li>
                  </ul>
                </div>
                
                <h3 style="color: #094F28; font-size: 16px; margin-top: 20px;">الخطوات التالية:</h3>
                <ol style="padding-inline-start: 20px; margin: 0 0 20px 0; line-height: 1.8;">
                  <li>سيتواصل معك المدرس <strong>فادي شامي</strong> خلال ساعات قليلة لتأكيد الموعد ووسيلة الدفع المناسبة لك.</li>
                  <li>قبل الموعد بـ 5 دقائق، يرجى الدخول إلى غرفة الدرس عبر الزر أدناه أو من خلال تطبيقك مباشرة.</li>
                </ol>
                
                <div style="text-align: center; margin: 25px 0;">
                  <a href="https://www.b1-syrer.de/app/#/lessons/room/${bookingId}" style="display: inline-block; background-color: #0F7B3E; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(15, 123, 62, 0.35);">دخول غرفة الدرس</a>
                </div>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 11px; color: #999; text-align: center; margin-bottom: 0;">هذا البريد تم إرساله تلقائياً من تطبيق B1-Syrer.de.</p>
              </div>
            `
          })
        })
      } catch (err) {
        console.error('Failed to send Resend email:', err)
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      booking_id: bookingId
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
