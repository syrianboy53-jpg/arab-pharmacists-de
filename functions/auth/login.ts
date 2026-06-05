import { Env, query, base64urlEncode } from '../utils'
import bcrypt from 'bcryptjs'

async function createJWT(payload: object, secret: string): Promise<string> {
  const header = base64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64urlEncode(JSON.stringify(payload))
  const data = `${header}.${body}`
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const signature = base64urlEncode(String.fromCharCode(...new Uint8Array(sig)))
  return `${header}.${body}.${signature}`
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const { email, password } = await request.json() as any

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 })
  }

  // Look up user by email
  const result = await query(env,
    `SELECT id, email, display_name, password_hash, created_at FROM "user" WHERE email = $1`,
    [email]
  )

  if (!result.rows || result.rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
  }

  const user = result.rows[0]

  // Compare passwords using bcryptjs
  try {
    const isMatched = bcrypt.compareSync(password, user.password_hash)
    if (!isMatched) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Password verification failed' }), { status: 401 })
  }

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
