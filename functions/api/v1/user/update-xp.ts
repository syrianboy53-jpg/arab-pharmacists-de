import { Env, query, verifyJWT } from '../../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  
  try {
    const authHeader = request.headers.get('Authorization')
    const userId = await verifyJWT(authHeader, env.JWT_SECRET)
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const body = await request.json() as { amount: number }
    if (!body.amount || typeof body.amount !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), { status: 400 })
    }

    const result = await query(env, 
      `UPDATE "user" SET xp = COALESCE(xp, 0) + $1 WHERE id = $2 RETURNING xp`,
      [body.amount, userId]
    )

    if (!result.rows || result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    return new Response(JSON.stringify({ success: true, xp: result.rows[0].xp }), { headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
