import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  try {
    const adminToken = request.headers.get('X-Admin-Token')
    if (adminToken !== env.ADMIN_TOKEN) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Get unique visitors who have been active in the last 15 minutes
    const res = await query(env, `
      SELECT 
        ip_address, 
        MAX(country) as country, 
        MAX(user_agent) as user_agent, 
        MAX(path) as path, 
        MAX(created_at) as last_seen 
      FROM visitor_logs 
      WHERE created_at >= NOW() - INTERVAL '15 minutes' 
      GROUP BY ip_address 
      ORDER BY last_seen DESC
    `)
    
    return new Response(JSON.stringify(res.rows), { 
      headers: { 'Content-Type': 'application/json' } 
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
