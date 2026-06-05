import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')

    let sql = `
      SELECT 
        id, user_name, user_email, user_phone, topic_category, topic_detail, 
        slot_start, slot_end, duration_min, price_eur, paid, paid_method, 
        status, admin_notes, room_id, created_at, updated_at
      FROM lesson_bookings
    `
    const params: any[] = []

    if (status) {
      sql += ' WHERE status = $1'
      params.push(status)
    }

    sql += ' ORDER BY slot_start DESC'

    const res = await query(env, sql, params)
    const bookings = (res.rows || []).map((row: any) => ({
      ...row,
      slot_start: row.slot_start ? new Date(row.slot_start).toISOString() : null,
      slot_end: row.slot_end ? new Date(row.slot_end).toISOString() : null,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
      updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null
    }))

    return new Response(JSON.stringify({ bookings }), {
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
    const { id, ...updates } = body

    if (!id) {
      return new Response(JSON.stringify({ error: 'id required' }), { status: 400 })
    }

    const keys = Object.keys(updates)
    if (keys.length > 0) {
      const setClause = keys.map((k, i) => `"${k}" = $${i + 2}`).join(', ')
      const params = [id, ...keys.map(k => updates[k])]
      await query(env, `UPDATE lesson_bookings SET ${setClause}, updated_at = NOW() WHERE id = $1`, params)
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
