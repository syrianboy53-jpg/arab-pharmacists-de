import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const [
      totalRes, todayRes, weekRes, activeRes, progressRes,
      totalVisitorsRes, todayVisitorsRes, weekVisitorsRes,
      latestVisitorsRes, topCountriesRes
    ] = await Promise.all([
      query(env, 'SELECT COUNT(*)::integer FROM "user"'),
      query(env, 'SELECT COUNT(*)::integer FROM "user" WHERE created_at >= CURRENT_DATE'),
      query(env, 'SELECT COUNT(*)::integer FROM "user" WHERE created_at >= NOW() - INTERVAL \'7 days\''),
      query(env, 'SELECT COUNT(DISTINCT user_id)::integer FROM progressentry'),
      query(env, 'SELECT COUNT(*)::integer FROM progressentry'),
      query(env, 'SELECT COUNT(DISTINCT ip_address)::integer FROM visitor_logs'),
      query(env, 'SELECT COUNT(DISTINCT ip_address)::integer FROM visitor_logs WHERE created_at >= CURRENT_DATE'),
      query(env, "SELECT COUNT(DISTINCT ip_address)::integer FROM visitor_logs WHERE created_at >= NOW() - INTERVAL '7 days'"),
      query(env, 'SELECT id, created_at, ip_address, country, user_agent FROM visitor_logs ORDER BY created_at DESC LIMIT 50'),
      query(env, 'SELECT country, COUNT(DISTINCT ip_address)::integer AS count FROM visitor_logs GROUP BY country ORDER BY count DESC LIMIT 10')
    ])

    const total_users = totalRes.rows[0]?.count || 0
    const today_users = todayRes.rows[0]?.count || 0
    const week_users = weekRes.rows[0]?.count || 0
    const active_users = activeRes.rows[0]?.count || 0
    const total_progress_entries = progressRes.rows[0]?.count || 0

    // Base offset to match historical counter on the landing page
    const baseOffset = 34820
    const total_visitors = baseOffset + (totalVisitorsRes.rows[0]?.count || 0)
    const today_visitors = todayVisitorsRes.rows[0]?.count || 0
    const week_visitors = weekVisitorsRes.rows[0]?.count || 0
    const latest_visitors = latestVisitorsRes.rows || []
    const top_countries = topCountriesRes.rows || []

    return new Response(JSON.stringify({
      total_users,
      today_users,
      week_users,
      active_users,
      total_progress_entries,
      total_visitors,
      today_visitors,
      week_visitors,
      latest_visitors,
      top_countries
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

