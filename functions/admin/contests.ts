import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, `
      SELECT 
        c.id, c.title, c.description, c.duration_seconds, c.seconds_per_question, c.num_questions, c.starts_at, c.ends_at, c.status,
        COALESCE(a.attempts_count, 0)::integer as attempts_count,
        COALESCE(a.flagged_count, 0)::integer as flagged_count
      FROM contests c
      LEFT JOIN (
        SELECT 
          contest_id, 
          COUNT(*)::integer as attempts_count,
          SUM(CASE WHEN cheating_flagged = true THEN 1 ELSE 0 END)::integer as flagged_count
        FROM contest_attempts
        GROUP BY contest_id
      ) a ON c.id = a.contest_id
      ORDER BY c.created_at DESC
    `)

    const contests = (res.rows || []).map((row: any) => ({
      ...row,
      starts_at: row.starts_at ? new Date(row.starts_at).toISOString() : null,
      ends_at: row.ends_at ? new Date(row.ends_at).toISOString() : null
    }))

    return new Response(JSON.stringify({ contests }), {
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
    const { title, description, duration_seconds, seconds_per_question, num_questions, starts_at, ends_at, prize_description, questions } = await request.json() as any

    if (!title || !starts_at || !ends_at || !questions || !Array.isArray(questions)) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    // 1. Insert contest
    const contestRes = await query(env, `
      INSERT INTO contests (title, description, duration_seconds, seconds_per_question, num_questions, starts_at, ends_at, status, prize_type, prize_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'active', 'premium-1d', 10)
      RETURNING id
    `, [
      title, 
      description || null, 
      Number(duration_seconds) || 300, 
      Number(seconds_per_question) || 30, 
      Number(num_questions) || questions.length, 
      starts_at, 
      ends_at
    ])

    const contestId = contestRes.rows[0].id

    // 2. Insert questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      await query(env, `
        INSERT INTO contest_questions (contest_id, prompt_de, options, correct_index, explanation_ar, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        contestId,
        q.prompt_de || q.question || '',
        JSON.stringify(q.options || []),
        Number(q.correct_index) || 0,
        q.explanation_ar || null,
        i
      ])
    }

    return new Response(JSON.stringify({ ok: true, id: contestId }), {
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
    const { id, status } = await request.json() as any

    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'id and status required' }), { status: 400 })
    }

    await query(env, 'UPDATE contests SET status = $2 WHERE id = $1', [id, status])

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

    // Deletes with referencing cleanup
    await query(env, 'UPDATE premium_grants SET contest_id = NULL WHERE contest_id = $1', [id])
    await query(env, 'DELETE FROM contest_attempts WHERE contest_id = $1', [id])
    await query(env, 'DELETE FROM contest_questions WHERE contest_id = $1', [id])
    await query(env, 'DELETE FROM contests WHERE id = $1', [id])

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
