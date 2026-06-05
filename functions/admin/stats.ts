import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const [usersRes, subsRes, feedbackRes] = await Promise.all([
      query(env, 'SELECT COUNT(*)::integer FROM "user"'),
      query(env, 'SELECT COUNT(*)::integer FROM subscription WHERE is_active = true AND expiry_date > NOW()'),
      query(env, 'SELECT COUNT(*)::integer FROM feedback')
    ])

    const total_users = usersRes.rows[0]?.[0] || usersRes.rows[0]?.count || 0
    const active_subscriptions = subsRes.rows[0]?.[0] || subsRes.rows[0]?.count || 0
    const total_feedback = feedbackRes.rows[0]?.[0] || feedbackRes.rows[0]?.count || 0

    return new Response(JSON.stringify({
      total_users,
      active_subscriptions,
      total_feedback
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
