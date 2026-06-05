import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const contestId = url.searchParams.get('id')

    if (!contestId) {
      return new Response(JSON.stringify({ error: 'contest id required' }), { status: 400 })
    }

    const res = await query(env, `
      SELECT id, score, max_score, time_used_seconds, cheating_flagged, nickname, device_token, cheating_reason, started_at, finished_at
      FROM contest_attempts
      WHERE contest_id = $1
      ORDER BY score DESC, time_used_seconds ASC, started_at ASC
    `, [contestId])

    const participants = (res.rows || []).map((row: any, idx: number) => ({
      ...row,
      rank: idx + 1,
      started_at: row.started_at ? new Date(row.started_at).toISOString() : null,
      finished_at: row.finished_at ? new Date(row.finished_at).toISOString() : null
    }))

    return new Response(JSON.stringify({ participants }), {
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
    const { id, flagged, reason } = await request.json() as any

    if (id === undefined || flagged === undefined) {
      return new Response(JSON.stringify({ error: 'id and flagged status required' }), { status: 400 })
    }

    await query(env, `
      UPDATE contest_attempts
      SET cheating_flagged = $2,
          cheating_reason = $3
      WHERE id = $1
    `, [id, flagged, reason || null])

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

    await query(env, 'DELETE FROM contest_attempts WHERE id = $1', [id])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
