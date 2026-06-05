import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '200')

    const res = await query(env, 
      `SELECT s.id, s.user_id, u.email, u.display_name, s.start_date, s.expiry_date, s.is_active, s.platform, s.product_id, s.status 
       FROM subscription s 
       LEFT JOIN "user" u ON s.user_id = u.id 
       ORDER BY s.created_at DESC LIMIT $1`,
      [limit]
    )
    return new Response(JSON.stringify(res.rows || []), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
