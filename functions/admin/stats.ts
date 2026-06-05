import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const [totalRes, todayRes, weekRes, activeRes, progressRes] = await Promise.all([
      query(env, 'SELECT COUNT(*)::integer FROM "user"'),
      query(env, 'SELECT COUNT(*)::integer FROM "user" WHERE created_at >= CURRENT_DATE'),
      query(env, 'SELECT COUNT(*)::integer FROM "user" WHERE created_at >= NOW() - INTERVAL \'7 days\''),
      query(env, 'SELECT COUNT(DISTINCT user_id)::integer FROM progressentry'),
      query(env, 'SELECT COUNT(*)::integer FROM progressentry')
    ])

    const total_users = totalRes.rows[0]?.count || 0
    const today_users = todayRes.rows[0]?.count || 0
    const week_users = weekRes.rows[0]?.count || 0
    const active_users = activeRes.rows[0]?.count || 0
    const total_progress_entries = progressRes.rows[0]?.count || 0

    return new Response(JSON.stringify({
      total_users,
      today_users,
      week_users,
      active_users,
      total_progress_entries
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

