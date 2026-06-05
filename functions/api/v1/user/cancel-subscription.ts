import { Env, query, verifyJWT } from '../../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    // Set all active subscriptions for this user to inactive/cancelled
    await query(env, `
      UPDATE subscription 
      SET is_active = false, status = 'cancelled', updated_at = NOW()
      WHERE user_id = $1 AND is_active = true
    `, [userId])

    return new Response(JSON.stringify({ ok: true, message: 'Subscription cancelled successfully' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
