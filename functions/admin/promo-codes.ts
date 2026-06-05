import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    // 1. Fetch promo codes
    const codesRes = await query(env, `
      SELECT id, code, label, duration_hours, max_uses, uses_count, expires_at, active, created_at
      FROM promo_codes
      ORDER BY created_at DESC
    `)
    const codes = (codesRes.rows || []).map((row: any) => ({
      ...row,
      expires_at: row.expires_at ? new Date(row.expires_at).toISOString() : null,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null
    }))

    // 2. Fetch recent redemptions joined with users
    const redemptionsRes = await query(env, `
      SELECT 
        r.id,
        r.code,
        r.user_id,
        r.redeemed_at,
        r.premium_until,
        r.revoked,
        r.ip_hash,
        r.device_fp,
        u.display_name,
        u.email
      FROM promo_redemptions r
      LEFT JOIN "user" u ON r.user_id = u.id
      ORDER BY r.redeemed_at DESC
      LIMIT 100
    `)
    const recent_redemptions = (redemptionsRes.rows || []).map((row: any) => ({
      ...row,
      redeemed_at: row.redeemed_at ? new Date(row.redeemed_at).toISOString() : null,
      premium_until: row.premium_until ? new Date(row.premium_until).toISOString() : null
    }))

    return new Response(JSON.stringify({ codes, recent_redemptions }), {
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
    const { code, label, duration_hours, max_uses, expires_at, active } = await request.json() as any

    if (!code || !code.trim()) {
      return new Response(JSON.stringify({ error: 'code required' }), { status: 400 })
    }

    const cleanCode = code.trim().toUpperCase()
    const cleanLabel = label ? label.trim() : null
    const duration = Number(duration_hours) || 24
    const maxUses = max_uses ? Number(max_uses) : null
    const expiresAt = expires_at || null

    // Check if code already exists
    const existsRes = await query(env, 'SELECT id FROM promo_codes WHERE code = $1', [cleanCode])
    if (existsRes.rows && existsRes.rows.length > 0) {
      return new Response(JSON.stringify({ detail: 'كود الخصم هذا موجود بالفعل' }), { status: 400 })
    }

    const insertRes = await query(env, `
      INSERT INTO promo_codes (code, label, duration_hours, max_uses, expires_at, active, uses_count)
      VALUES ($1, $2, $3, $4, $5, $6, 0)
      RETURNING id, code, label, duration_hours, max_uses, uses_count, expires_at, active, created_at
    `, [cleanCode, cleanLabel, duration, maxUses, expiresAt, active === undefined ? true : active])

    const newCode = insertRes.rows[0]
    if (newCode) {
      newCode.expires_at = newCode.expires_at ? new Date(newCode.expires_at).toISOString() : null
      newCode.created_at = newCode.created_at ? new Date(newCode.created_at).toISOString() : null
    }

    return new Response(JSON.stringify(newCode), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ detail: e.message }), { status: 500 })
  }
}
