import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const status = url.searchParams.get('status') || 'all'

    let sql = 'SELECT id, name, rating, comment, status, pinned, admin_reply, created_at, ip_hash, user_agent FROM reviews'
    const params: any[] = []

    if (status !== 'all') {
      sql += ' WHERE status = $1'
      params.push(status)
    }

    sql += ' ORDER BY created_at DESC'

    const res = await query(env, sql, params)
    const reviews = (res.rows || []).map((row: any) => ({
      ...row,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null
    }))

    return new Response(JSON.stringify({ reviews }), {
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
    const { id, action, reply } = await request.json() as any

    if (!id || !action) {
      return new Response(JSON.stringify({ error: 'id and action required' }), { status: 400 })
    }

    let sql = ''
    let params: any[] = []

    if (action === 'hide' || action === 'reject') {
      sql = "UPDATE reviews SET status = 'hidden' WHERE id = $1"
      params = [id]
    } else if (action === 'show' || action === 'approve') {
      sql = "UPDATE reviews SET status = 'visible' WHERE id = $1"
      params = [id]
    } else if (action === 'pin') {
      sql = 'UPDATE reviews SET pinned = true WHERE id = $1'
      params = [id]
    } else if (action === 'unpin') {
      sql = 'UPDATE reviews SET pinned = false WHERE id = $1'
      params = [id]
    } else if (action === 'reply') {
      sql = 'UPDATE reviews SET admin_reply = $2 WHERE id = $1'
      params = [id, reply || null]
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 })
    }

    await query(env, sql, params)

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
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
      return new Response(JSON.stringify({ error: 'id required' }), { status: 400 })
    }

    await query(env, 'DELETE FROM reviews WHERE id = $1', [id])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
