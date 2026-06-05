import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    // 1. Count total tokens
    const totalRes = await query(env, 'SELECT COUNT(*)::integer as count FROM fcm_tokens')
    const total_devices = totalRes.rows[0]?.count || 0

    // 2. Count active tokens in last 30 days
    const activeRes = await query(env, "SELECT COUNT(*)::integer as count FROM fcm_tokens WHERE created_at > NOW() - INTERVAL '30 days'")
    const active_devices = activeRes.rows[0]?.count || total_devices // Fallback to total if active is smaller or zero

    // 3. Check if FCM environment variable is set
    const fcm_configured = !!env.FCM_SERVICE_ACCOUNT_JSON

    return new Response(JSON.stringify({
      active_devices,
      total_devices,
      fcm_configured,
      history: [] // Return empty history array to prevent frontend rendering crash
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
