import { Env, query, sha256 } from '../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { currentPassword, newPassword } = await request.json() as any
    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Current and new passwords required' }), { status: 400 })
    }

    const res = await query(env, "SELECT password_hash, password_salt FROM admin_credentials WHERE id = 1")
    if (!res.rows || res.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Admin credentials not configured' }), { status: 500 })
    }

    const { password_hash, password_salt } = res.rows[0]
    const inputHash = await sha256(currentPassword + password_salt)

    if (inputHash !== password_hash) {
      return new Response(JSON.stringify({ error: 'Invalid current password' }), { status: 401 })
    }

    // Generate new salt
    const newSalt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0')).join('')
    const newHash = await sha256(newPassword + newSalt)

    await query(env, 
      "UPDATE admin_credentials SET password_hash = $1, password_salt = $2, updated_at = NOW() WHERE id = 1",
      [newHash, newSalt]
    )

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
