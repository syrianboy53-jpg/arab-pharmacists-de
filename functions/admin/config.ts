interface Env {
  NEON_DATABASE_URL: string
  ADMIN_TOKEN: string
}

async function query(env: Env, sql: string, params: any[] = []) {
  const res = await fetch('https://sql.neon.tech/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': env.NEON_DATABASE_URL,
    },
    body: JSON.stringify({ query: sql, params }),
  })
  return res.json() as any
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const updates = await request.json() as Record<string, string>

  for (const [key, value] of Object.entries(updates)) {
    await query(env,
      `INSERT INTO config (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
      [key, value]
    )
  }

  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
}
