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
      'SELECT current, longest, total_days, last_day FROM streakrecord WHERE user_id = $1',
      [userId]
    )

    if (res.rows && res.rows.length > 0) {
      const row = res.rows[0]
      return new Response(JSON.stringify({
        current: row.current || 0,
        longest: row.longest || 0,
        total_days: row.total_days || 0,
        last_day: row.last_day || ''
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // Default return if no streak record exists
    return new Response(JSON.stringify({
      current: 0,
      longest: 0,
      total_days: 0,
      last_day: ''
    }), { headers: { 'Content-Type': 'application/json' } })
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
    const { current, longest, total_days, last_day } = await request.json() as any

    const checkRes = await query(env, 
      'SELECT id FROM streakrecord WHERE user_id = $1', 
      [userId]
    )

    if (checkRes.rows && checkRes.rows.length > 0) {
      // Update
      await query(env,
        'UPDATE streakrecord SET current = $1, longest = $2, total_days = $3, last_day = $4 WHERE user_id = $5',
        [current || 0, longest || 0, total_days || 0, last_day || '', userId]
      )
    } else {
      // Insert
      await query(env,
        'INSERT INTO streakrecord (user_id, current, longest, total_days, last_day) VALUES ($1, $2, $3, $4, $5)',
        [userId, current || 0, longest || 0, total_days || 0, last_day || '']
      )
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
