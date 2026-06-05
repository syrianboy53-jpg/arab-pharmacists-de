import { Env, query, verifyJWT } from '../../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, 
      `SELECT platform, product_id, status, expiry_date, is_active 
       FROM subscription 
       WHERE user_id = $1 AND is_active = true AND expiry_date > NOW() 
       ORDER BY expiry_date DESC LIMIT 1`,
      [userId]
    )

    if (res.rows && res.rows.length > 0) {
      const sub = res.rows[0]
      return new Response(JSON.stringify({
        is_premium: true,
        platform: sub.platform,
        product_id: sub.product_id,
        status: sub.status,
        expiry_date: sub.expiry_date,
        premium_features: ['all']
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // Default: not premium
    return new Response(JSON.stringify({
      is_premium: false,
      status: 'none',
      premium_features: []
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
