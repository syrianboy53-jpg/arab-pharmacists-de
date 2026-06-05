import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const url = new URL(request.url)
  const adminToken = request.headers.get('X-Admin-Token') || url.searchParams.get('token') || url.searchParams.get('admin_token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  // Support quick GET actions directly from the browser URL bar
  const action = url.searchParams.get('action')
  const id = url.searchParams.get('id')
  const email = url.searchParams.get('email')

  if (action && (id || email)) {
    try {
      let targetId = id
      if (email) {
        // Resolve email to active or most recent subscription ID
        const userSubRes = await query(env, `
          SELECT s.id 
          FROM subscription s
          JOIN "user" u ON s.user_id = u.id
          WHERE u.email = $1
          ORDER BY s.created_at DESC LIMIT 1
        `, [email])
        
        if (userSubRes.rows && userSubRes.rows.length > 0) {
          targetId = userSubRes.rows[0].id
        } else {
          return new Response(JSON.stringify({ error: `No subscription found for email: ${email}` }), { status: 404 })
        }
      }

      if (action === 'cancel') {
        await query(env, `
          UPDATE subscription 
          SET is_active = false, status = 'cancelled', updated_at = NOW()
          WHERE id = $1
        `, [targetId])
        return new Response(JSON.stringify({ ok: true, message: `Subscription for ${email || 'ID ' + targetId} cancelled successfully` }), {
          headers: { 'Content-Type': 'application/json' }
        })
      } else if (action === 'delete') {
        await query(env, 'DELETE FROM subscription WHERE id = $1', [targetId])
        return new Response(JSON.stringify({ ok: true, message: `Subscription for ${email || 'ID ' + targetId} deleted successfully` }), {
          headers: { 'Content-Type': 'application/json' }
        })
      } else if (action === 'activate') {
        await query(env, `
          UPDATE subscription 
          SET is_active = true, status = 'active', updated_at = NOW()
          WHERE id = $1
        `, [targetId])
        return new Response(JSON.stringify({ ok: true, message: `Subscription for ${email || 'ID ' + targetId} activated successfully` }), {
          headers: { 'Content-Type': 'application/json' }
        })
      }
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 })
    }
  }


  try {
    const limit = parseInt(url.searchParams.get('limit') || '200')


    // 1. Fetch subscriptions list
    const res = await query(env, 
      `SELECT s.id, s.user_id, u.email, u.display_name, s.start_date, s.expiry_date, s.is_active, s.platform, s.product_id, s.status 
       FROM subscription s 
       LEFT JOIN "user" u ON s.user_id = u.id 
       ORDER BY s.created_at DESC LIMIT $1`,
      [limit]
    )

    const subscriptions = (res.rows || []).map((row: any) => ({
      ...row,
      start_date: row.start_date ? new Date(row.start_date).toISOString() : null,
      expiry_date: row.expiry_date ? new Date(row.expiry_date).toISOString() : null
    }))

    // 2. Fetch statistics (using COALESCE to ensure no null values are returned when table is empty)
    const statsRes = await query(env, `
      SELECT 
        COUNT(*)::integer as total,
        COALESCE(SUM(CASE WHEN is_active = true THEN 1 ELSE 0 END), 0)::integer as active,
        COALESCE(SUM(CASE WHEN platform = 'stripe' THEN 1 ELSE 0 END), 0)::integer as stripe_count,
        COALESCE(SUM(CASE WHEN platform = 'paypal' THEN 1 ELSE 0 END), 0)::integer as paypal_count,
        COALESCE(SUM(CASE WHEN platform IN ('google_play', 'play_store', 'google', 'android') THEN 1 ELSE 0 END), 0)::integer as google_play_count,
        COALESCE(SUM(CASE WHEN product_id LIKE '%monthly%' OR product_id LIKE '%month%' THEN 1 ELSE 0 END), 0)::integer as monthly_count,
        COALESCE(SUM(CASE WHEN product_id LIKE '%yearly%' OR product_id LIKE '%year%' THEN 1 ELSE 0 END), 0)::integer as yearly_count
      FROM subscription
    `)

    const stats = statsRes.rows[0] || {
      total: 0,
      active: 0,
      stripe_count: 0,
      paypal_count: 0,
      google_play_count: 0,
      monthly_count: 0,
      yearly_count: 0
    }

    return new Response(JSON.stringify({ subscriptions, stats }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const url = new URL(request.url)
  const adminToken = request.headers.get('X-Admin-Token') || url.searchParams.get('token') || url.searchParams.get('admin_token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { id, is_active, status, expiry_date } = await request.json() as any

    if (!id) {
      return new Response(JSON.stringify({ error: 'Subscription id required' }), { status: 400 })
    }

    // Update subscription status or active flag
    await query(env, `
      UPDATE subscription 
      SET is_active = $2, status = $3, expiry_date = COALESCE($4, expiry_date), updated_at = NOW()
      WHERE id = $1
    `, [
      id, 
      is_active !== undefined ? is_active : false, 
      status || 'cancelled',
      expiry_date || null
    ])

    return new Response(JSON.stringify({ ok: true, message: 'Subscription updated successfully' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export async function onRequestDelete(context: { request: Request; env: Env }) {
  const { request, env } = context
  const url = new URL(request.url)
  const adminToken = request.headers.get('X-Admin-Token') || url.searchParams.get('token') || url.searchParams.get('admin_token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const id = url.searchParams.get('id')

    if (!id) {
      return new Response(JSON.stringify({ error: 'id required' }), { status: 400 })
    }

    await query(env, 'DELETE FROM subscription WHERE id = $1', [id])

    return new Response(JSON.stringify({ ok: true, message: 'Subscription deleted successfully' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

