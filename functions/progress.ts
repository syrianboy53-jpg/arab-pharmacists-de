import { Env, query, verifyJWT } from './utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, 
      'SELECT key, score, max_score, completed, updated_at FROM progressentry WHERE user_id = $1',
      [userId]
    )
    return new Response(JSON.stringify(res.rows || []), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export async function onRequestPut(context: { request: Request; env: Env }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { items } = await request.json() as any
    if (!items || !Array.isArray(items)) {
      return new Response(JSON.stringify({ error: 'Invalid payload, items array required' }), { status: 400 })
    }

    for (const item of items) {
      const { key, score, max_score, completed } = item
      if (!key) continue

      // Check if entry exists
      const checkRes = await query(env, 
        'SELECT id FROM progressentry WHERE user_id = $1 AND key = $2', 
        [userId, key]
      )

      if (checkRes.rows && checkRes.rows.length > 0) {
        // Update
        await query(env,
          'UPDATE progressentry SET score = $1, max_score = $2, completed = $3, updated_at = NOW() WHERE user_id = $4 AND key = $5',
          [score || 0, max_score || 0, !!completed, userId, key]
        )
      } else {
        // Insert
        await query(env,
          'INSERT INTO progressentry (user_id, key, score, max_score, completed, updated_at) VALUES ($1, $2, $3, $4, $5, NOW())',
          [userId, key, score || 0, max_score || 0, !!completed]
        )
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
