import { Env, query, verifyJWT } from '../../../../utils'

interface EnvExt extends Env {
  PAYPAL_CLIENT_ID?: string
  PAYPAL_CLIENT_SECRET?: string
}

export async function onRequestPost(context: { request: Request; env: EnvExt }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { plan } = await request.json() as any

    const isMock = !env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET || env.PAYPAL_CLIENT_ID === ''

    if (isMock) {
      const expiry = new Date()
      expiry.setFullYear(expiry.getFullYear() + (plan === 'yearly' ? 1 : 0))
      if (plan !== 'yearly') {
        expiry.setMonth(expiry.getMonth() + 1)
      }

      await query(env, 'UPDATE subscription SET is_active = false WHERE user_id = $1', [userId])

      await query(env, `
        INSERT INTO subscription (
          user_id, platform, product_id, status, start_date, expiry_date, is_active, created_at, updated_at
        ) VALUES ($1, 'paypal', $2, 'active', NOW(), $3, true, NOW(), NOW())
      `, [
        userId,
        plan === 'yearly' ? 'premium_yearly' : 'premium_monthly',
        expiry.toISOString()
      ])

      const redirectUrl = new URL(request.url).origin + '/app/#/premium?status=success'
      return new Response(JSON.stringify({ approve_url: redirectUrl }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const redirectUrl = new URL(request.url).origin + '/app/#/premium?status=success'
    return new Response(JSON.stringify({ approve_url: redirectUrl }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
