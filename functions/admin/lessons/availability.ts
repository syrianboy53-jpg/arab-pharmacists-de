import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    // 1. Fetch slots
    const slotsRes = await query(env, `
      SELECT day_of_week, start_time, end_time, active 
      FROM lesson_availability
      ORDER BY day_of_week ASC, start_time ASC
    `)
    const slots = slotsRes.rows || []

    // 2. Fetch blackouts
    const blackoutsRes = await query(env, `
      SELECT id, blocked_date, reason 
      FROM lesson_blackouts
      ORDER BY blocked_date ASC
    `)
    const blackouts = (blackoutsRes.rows || []).map((row: any) => ({
      id: row.id,
      blocked_date: row.blocked_date ? new Date(row.blocked_date).toISOString().split('T')[0] : null,
      reason: row.reason
    }))

    return new Response(JSON.stringify({ slots, blackouts }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export async function onRequestPut(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { slots } = await request.json() as any

    if (!slots || !Array.isArray(slots)) {
      return new Response(JSON.stringify({ error: 'slots array required' }), { status: 400 })
    }

    // 1. Delete all existing availability slots
    await query(env, 'DELETE FROM lesson_availability')

    // 2. Insert new slots sequentially
    for (const slot of slots) {
      if (slot.day_of_week !== undefined && slot.start_time && slot.end_time) {
        await query(env, `
          INSERT INTO lesson_availability (day_of_week, start_time, end_time, timezone, active)
          VALUES ($1, $2, $3, 'Europe/Berlin', true)
        `, [Number(slot.day_of_week), slot.start_time, slot.end_time])
      }
    }

    // 3. Retrieve updated slots to return
    const updatedSlotsRes = await query(env, `
      SELECT day_of_week, start_time, end_time, active 
      FROM lesson_availability
      ORDER BY day_of_week ASC, start_time ASC
    `)
    const updatedSlots = updatedSlotsRes.rows || []

    return new Response(JSON.stringify({ slots: updatedSlots }), {
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
    const { action, date, reason, id } = await request.json() as any

    if (action === 'add_blackout') {
      if (!date) {
        return new Response(JSON.stringify({ error: 'date required for add_blackout' }), { status: 400 })
      }
      await query(env, 'INSERT INTO lesson_blackouts (blocked_date, reason) VALUES ($1, $2)', [date, reason || null])
    } else if (action === 'remove_blackout') {
      if (!id) {
        return new Response(JSON.stringify({ error: 'id required for remove_blackout' }), { status: 400 })
      }
      await query(env, 'DELETE FROM lesson_blackouts WHERE id = $1', [id])
    } else {
      return new Response(JSON.stringify({ error: 'invalid action' }), { status: 400 })
    }

    // Fetch updated blackouts
    const blackoutsRes = await query(env, `
      SELECT id, blocked_date, reason 
      FROM lesson_blackouts
      ORDER BY blocked_date ASC
    `)
    const blackouts = (blackoutsRes.rows || []).map((row: any) => ({
      id: row.id,
      blocked_date: row.blocked_date ? new Date(row.blocked_date).toISOString().split('T')[0] : null,
      reason: row.reason
    }))

    return new Response(JSON.stringify({ blackouts }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
