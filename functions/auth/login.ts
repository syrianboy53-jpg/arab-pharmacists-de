interface Env {
  NEON_DATABASE_URL: string
  JWT_SECRET: string
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

async function createJWT(payload: object, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))
  const data = `${header}.${body}`
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const signature = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  return `${header}.${body}.${signature}`
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const { email, password } = await request.json() as any

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 })
  }

  const pwHash = btoa(password)
  const result = await query(env,
    `SELECT id, email, display_name, created_at FROM "user" WHERE email = $1 AND password_hash = $2`,
    [email, pwHash]
  )

  if (!result.rows || result.rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
  }

  const user = result.rows[0]
  const token = await createJWT(
    { sub: String(user.id), email: user.email, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 30 * 24 * 3600 },
    env.JWT_SECRET
  )

  return new Response(JSON.stringify({
    access_token: token,
    token_type: 'bearer',
    user: { id: user.id, email: user.email, display_name: user.display_name, created_at: user.created_at }
  }), { headers: { 'Content-Type': 'application/json' } })
}
