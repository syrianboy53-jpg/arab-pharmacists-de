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
    const status = url.searchParams.get('status') || 'all'

    let sql = 'SELECT * FROM feedback'
    let params: any[] = []

    if (status !== 'all') {
      sql += ' WHERE status = $1'
      params.push(status)
    }

    sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1)
    params.push(limit)

    const res = await query(env, sql, params)
    const entries = (res.rows || []).map((row: any) => ({
      ...row,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null
    }))

    const unreadRes = await query(env, "SELECT COUNT(*)::integer FROM feedback WHERE status = 'unread'")
    const unread_count = unreadRes.rows[0]?.count || 0

    return new Response(JSON.stringify({
      entries,
      unread_count
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

export async function onRequestDelete(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return new Response(JSON.stringify({ error: 'Feedback ID required' }), { status: 400 })
    }

    await query(env, 'DELETE FROM feedback WHERE id = $1', [id])
    return new Response(JSON.stringify({ ok: true }), {
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
    const { id, status, admin_notes } = await request.json() as any
    if (!id) {
      return new Response(JSON.stringify({ error: 'Feedback ID required' }), { status: 400 })
    }

    await query(env, 
      'UPDATE feedback SET status = $1, admin_notes = $2 WHERE id = $3',
      [status, admin_notes, id]
    )

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
