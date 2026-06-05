import { Env, query } from '../utils'

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
  const { email, password, name } = await request.json() as any

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 })
  }

  // Hash password
  const pwHash = btoa(password) // simplified - production should use bcrypt

  // Insert user
  const result = await query(env,
    `INSERT INTO "user" (email, password_hash, display_name, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email, display_name, created_at`,
    [email, pwHash, name || email.split('@')[0]]
  )

  if (!result.rows || result.rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 409 })
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
