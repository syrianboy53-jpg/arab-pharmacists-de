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

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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

  // Compare passwords
  let isMatched = false
  
  // Try new SHA-256 hash
  if (user.password_hash === await hashPassword(password)) {
    isMatched = true
  }

  // Fallback 1: Legacy btoa
  if (!isMatched && user.password_hash === btoa(password)) {
    isMatched = true
  }

  // Fallback 2: bcryptjs
  if (!isMatched) {
    try {
      if (bcrypt.compareSync(password, user.password_hash)) {
        isMatched = true;
      }
    } catch (err: any) {
    }
  }

  if (isMatched && user.password_hash !== await hashPassword(password)) {
     // Upgrade to SHA-256 hash
     try {
       const newHash = await hashPassword(password)
       await query(env, 'UPDATE "user" SET password_hash = $1 WHERE id = $2', [newHash, user.id])
     } catch (dbErr) {
       console.error('Failed to auto-upgrade password hash:', dbErr)
     }
  }

  if (!isMatched) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
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
