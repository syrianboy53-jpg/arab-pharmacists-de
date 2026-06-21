import { Env, verifyJWT, query, sha256 } from '../../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  
  // 1. Verify Authentication
  const authHeader = request.headers.get('Authorization')
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const body = await request.json() as any
    const { name, email, contactInfo, currentPassword, newPassword } = body

    // 2. Make sure contact_info column exists (Idempotent operation)
    try {
      await query(env, `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS contact_info TEXT;`)
    } catch (e) {
      console.warn('Could not add contact_info column, might already exist.', e)
    }

    // 3. Get current user data
    const userRes = await query(env, `SELECT id, email, password_hash, display_name FROM "user" WHERE id = $1`, [userId])
    if (!userRes.rows || userRes.rows.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: 'User not found' }), { status: 404 })
    }
    const user = userRes.rows[0]

    // 4. Verify current password if they want to change email or password
    let updatedPwHash = user.password_hash
    const requiresPasswordCheck = (email && email !== user.email) || newPassword

    if (requiresPasswordCheck) {
      if (!currentPassword) {
        return new Response(JSON.stringify({ ok: false, error: 'كلمة المرور الحالية مطلوبة لتغيير الإيميل أو كلمة المرور' }), { status: 400 })
      }
      const currentPwHash = await sha256(currentPassword)
      
      if (currentPwHash !== user.password_hash) {
        return new Response(JSON.stringify({ ok: false, error: 'كلمة المرور الحالية غير صحيحة' }), { status: 403 })
      }
      
      if (newPassword) {
        updatedPwHash = await sha256(newPassword)
      }
    }

    // 5. Update user in DB
    const finalName = name || user.display_name
    const finalEmail = email || user.email
    const finalContact = contactInfo !== undefined ? contactInfo : null

    await query(env, 
      `UPDATE "user" SET display_name = $1, email = $2, password_hash = $3, contact_info = $4 WHERE id = $5`,
      [finalName, finalEmail, updatedPwHash, finalContact, userId]
    )

    // 6. Send Email Notification via Resend
    if (env.RESEND_API_KEY) {
      const emailContent = `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #059669;">مرحباً ${finalName}،</h2>
          <p>تم تحديث بيانات ملفك الشخصي في موقع <strong>B1 Syrer</strong> بنجاح.</p>
          <ul>
            <li><strong>الاسم:</strong> ${finalName}</li>
            <li><strong>البريد الإلكتروني:</strong> ${finalEmail}</li>
            ${finalContact ? `<li><strong>معلومات التواصل:</strong> ${finalContact}</li>` : ''}
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
          to: [finalEmail],
          subject: 'إشعار تحديث بيانات الحساب - B1 Syrer',
          html: emailContent
        })
      });
    }

    return new Response(JSON.stringify({ 
      ok: true, 
      message: 'Profile updated successfully',
      user: {
        id: userId,
        display_name: finalName,
        email: finalEmail,
        contact_info: finalContact
      }
    }), { status: 200 })

  } catch (err: any) {
    console.error('Update profile error:', err)
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 })
  }
}
