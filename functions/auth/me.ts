import { Env, query, verifyJWT } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, 'SELECT id, email, display_name, created_at FROM "user" WHERE id = $1', [userId])
    if (!res.rows || res.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    const user = res.rows[0]
    return new Response(JSON.stringify({
      id: user.id,
      email: user.email,
      display_name: user.display_name,
      created_at: user.created_at
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
