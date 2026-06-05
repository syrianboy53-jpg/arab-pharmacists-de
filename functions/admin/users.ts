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
    const search = url.searchParams.get('search') || ''

    let sql = 'SELECT id, email, display_name, created_at FROM "user"'
    let params: any[] = []

    if (search) {
      sql += ' WHERE email ILIKE $1 OR display_name ILIKE $1'
      params.push(`%${search}%`)
    }

    sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1)
    params.push(limit)

    const res = await query(env, sql, params)
    return new Response(JSON.stringify(res.rows || []), {
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
    const pathParts = url.pathname.split('/')
    const userId = pathParts[pathParts.length - 1]

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID required' }), { status: 400 })
    }

    // Delete user (due to references, cascaded deletes should happen, otherwise handle carefully)
    await query(env, 'DELETE FROM "user" WHERE id = $1', [userId])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
