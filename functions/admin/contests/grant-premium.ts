import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, `
      SELECT id, device_token, expires_at, revoked, reason, created_at, starts_at
      FROM premium_grants
      ORDER BY created_at DESC
    `)

    const grants = (res.rows || []).map((row: any) => ({
      ...row,
      expires_at: row.expires_at ? new Date(row.expires_at).toISOString() : null,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
      starts_at: row.starts_at ? new Date(row.starts_at).toISOString() : null
    }))

    return new Response(JSON.stringify({ grants }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { device_token, days, reason } = await request.json() as any

    if (!device_token || !days) {
      return new Response(JSON.stringify({ detail: 'device_token and days required' }), { status: 400 })
    }

    const expiresAt = new Date(Date.now() + Number(days) * 24 * 3600 * 1000)

    const insertRes = await query(env, `
      INSERT INTO premium_grants (device_token, expires_at, reason, starts_at, revoked)
      VALUES ($1, $2, $3, NOW(), false)
      RETURNING id, device_token, expires_at, revoked, reason, created_at, starts_at
    `, [device_token.trim(), expiresAt.toISOString(), reason || null])

    const grant = insertRes.rows[0]
    if (grant) {
      grant.expires_at = grant.expires_at ? new Date(grant.expires_at).toISOString() : null
      grant.created_at = grant.created_at ? new Date(grant.created_at).toISOString() : null
      grant.starts_at = grant.starts_at ? new Date(grant.starts_at).toISOString() : null
    }

    return new Response(JSON.stringify({ ok: true, grant }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ detail: e.message }), { status: 500 })
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

    await query(env, 'DELETE FROM premium_grants WHERE id = $1', [id])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
