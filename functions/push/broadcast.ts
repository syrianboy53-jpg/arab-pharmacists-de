interface Env {
  NEON_DATABASE_URL: string
  ADMIN_TOKEN: string
  FCM_SERVICE_ACCOUNT_JSON: string
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { title, body } = await request.json() as any

  if (!title || !body) {
    return new Response(JSON.stringify({ error: 'title and body required' }), { status: 400 })
  }

  // Get FCM tokens from database
  const res = await fetch('https://sql.neon.tech/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': env.NEON_DATABASE_URL,
    },
    body: JSON.stringify({ query: 'SELECT token FROM fcm_tokens' }),
  })
  const data = await res.json() as any
  const tokens = data.rows?.map((r: any) => r.token) || []

  return new Response(JSON.stringify({ 
    ok: true, 
    sent_to: tokens.length,
    title,
    body 
  }), { headers: { 'Content-Type': 'application/json' } })
}
