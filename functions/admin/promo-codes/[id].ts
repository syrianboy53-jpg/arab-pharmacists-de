import { Env, query } from '../../utils'

export async function onRequestPatch(context: { request: Request; env: Env; params: { id: string } }) {
  const { request, env, params } = context
  const adminToken = request.headers.get('X-Admin-Token')
  const id = params.id
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { active } = await request.json() as any

    if (active === undefined) {
      return new Response(JSON.stringify({ detail: 'active status required' }), { status: 400 })
    }

    // 1. Get the code string first
    const codeRes = await query(env, 'SELECT code FROM promo_codes WHERE id = $1', [id])
    if (!codeRes.rows || codeRes.rows.length === 0) {
      return new Response(JSON.stringify({ detail: 'الكود غير موجود' }), { status: 404 })
    }
    const code = codeRes.rows[0].code

    // 2. Update active status
    await query(env, 'UPDATE promo_codes SET active = $2 WHERE id = $1', [id, active])

    // 3. If deactivating, revoke all premium redemptions granted from this code
    if (!active) {
      await query(env, 'UPDATE promo_redemptions SET revoked = true WHERE code = $1', [code])
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ detail: e.message }), { status: 500 })
  }
}

export async function onRequestDelete(context: { request: Request; env: Env; params: { id: string } }) {
  const { request, env, params } = context
  const adminToken = request.headers.get('X-Admin-Token')
  const id = params.id
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    // 1. Get the code string first
    const codeRes = await query(env, 'SELECT code FROM promo_codes WHERE id = $1', [id])
    if (!codeRes.rows || codeRes.rows.length === 0) {
      return new Response(JSON.stringify({ detail: 'الكود غير موجود' }), { status: 404 })
    }
    const code = codeRes.rows[0].code

    // 2. Delete redemptions first (due to referencing code or standard clean up)
    await query(env, 'DELETE FROM promo_redemptions WHERE code = $1', [code])

    // 3. Delete code itself
    await query(env, 'DELETE FROM promo_codes WHERE id = $1', [id])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ detail: e.message }), { status: 500 })
  }
}
