import { Env, query, sha256 } from '../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  try {
    const { password } = await request.json() as any
    if (!password) {
      return new Response(JSON.stringify({ error: 'Password required' }), { status: 400 })
    }

    const res = await query(env, "SELECT password_hash, password_salt FROM admin_credentials WHERE id = 1")
    if (!res.rows || res.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Admin credentials not configured' }), { status: 500 })
    }

    const { password_hash, password_salt } = res.rows[0]
    const inputHash = await sha256(password + password_salt)

    if (inputHash !== password_hash) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
