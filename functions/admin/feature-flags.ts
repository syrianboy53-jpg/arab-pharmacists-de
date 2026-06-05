import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, 'SELECT key, label, enabled, premium, is_new, updated_at FROM feature_flags')
    const flags = res.rows || []

    return new Response(JSON.stringify({ flags }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export async function onRequestPatch(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const body = await request.json() as any
    const { key, ...updates } = body

    if (!key) {
      return new Response(JSON.stringify({ error: 'key required' }), { status: 400 })
    }

    const checkRes = await query(env, 'SELECT key FROM feature_flags WHERE key = $1', [key])
    
    if (checkRes.rows && checkRes.rows.length > 0) {
      // Update existing
      const keys = Object.keys(updates)
      if (keys.length > 0) {
        const setClause = keys.map((k, i) => `"${k}" = $${i + 2}`).join(', ')
        const params = [key, ...keys.map(k => updates[k])]
        await query(env, `UPDATE feature_flags SET ${setClause}, updated_at = NOW() WHERE key = $1`, params)
      }
    } else {
      // Insert new flag
      const enabled = updates.enabled !== undefined ? updates.enabled : true
      const premium = updates.premium !== undefined ? updates.premium : false
      const is_new = updates.is_new !== undefined ? updates.is_new : false
      const label = updates.label !== undefined ? updates.label : null
      await query(env, `
        INSERT INTO feature_flags (key, label, enabled, premium, is_new, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
      `, [key, label, enabled, premium, is_new])
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
