import { Env, query } from '../utils'

function toPgArray(arr: any): string {
  if (!Array.isArray(arr)) return '{}'
  return '{' + arr.map(val => `"${String(val).replace(/"/g, '\\"')}"`).join(',') + '}'
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-') // Allow Arabic characters as well in case name contains them, or replace with hyphens
    .replace(/(^-|-$)/g, '')
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, 'SELECT * FROM kurse_institutes ORDER BY created_at DESC')
    const institutes = res.rows || []

    return new Response(JSON.stringify({ institutes }), {
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
    const body = await request.json() as any
    const { name, city_de, city_ar, region, address, phone, website, schedule_url, price_from, bamf, levels, formats, schedules, is_visible, notes } = body

    if (!name || !website) {
      return new Response(JSON.stringify({ error: 'name and website required' }), { status: 400 })
    }

    const slug = generateSlug(name)
    const pgLevels = toPgArray(levels)
    const pgFormats = toPgArray(formats)
    const pgSchedules = toPgArray(schedules)

    await query(env, `
      INSERT INTO kurse_institutes (
        name, city_de, city_ar, region, address, phone, website, schedule_url, 
        price_from, bamf, levels, formats, schedules, is_visible, notes, slug, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::text[], $12::text[], $13::text[], $14, $15, $16, NOW(), NOW())
    `, [
      name, city_de, city_ar, region || null, address || null, phone || null, website, schedule_url || null,
      price_from !== undefined && price_from !== null ? Number(price_from) : null,
      !!bamf, pgLevels, pgFormats, pgSchedules, is_visible === undefined ? true : !!is_visible, notes || null, slug
    ])

    return new Response(JSON.stringify({ ok: true }), {
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
    const body = await request.json() as any
    const { id, name, city_de, city_ar, region, address, phone, website, schedule_url, price_from, bamf, levels, formats, schedules, is_visible, notes } = body

    if (!id || !name || !website) {
      return new Response(JSON.stringify({ error: 'id, name and website required' }), { status: 400 })
    }

    const slug = generateSlug(name)
    const pgLevels = toPgArray(levels)
    const pgFormats = toPgArray(formats)
    const pgSchedules = toPgArray(schedules)

    await query(env, `
      UPDATE kurse_institutes
      SET name = $1, city_de = $2, city_ar = $3, region = $4, address = $5, phone = $6, website = $7, schedule_url = $8,
          price_from = $9, bamf = $10, levels = $11::text[], formats = $12::text[], schedules = $13::text[], 
          is_visible = $14, notes = $15, slug = $16, updated_at = NOW()
      WHERE id = $17
    `, [
      name, city_de, city_ar, region || null, address || null, phone || null, website, schedule_url || null,
      price_from !== undefined && price_from !== null ? Number(price_from) : null,
      !!bamf, pgLevels, pgFormats, pgSchedules, is_visible === undefined ? true : !!is_visible, notes || null, slug, id
    ])

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

    await query(env, 'DELETE FROM kurse_institutes WHERE id = $1', [id])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
