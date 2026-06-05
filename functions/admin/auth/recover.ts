import { Env, query } from '../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const ipHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))))
      .map(b => b.toString(16).padStart(2, '0')).join('')

    await query(env, "INSERT INTO admin_recovery_log (ip_hash, created_at) VALUES ($1, NOW())", [ipHash])

    return new Response(JSON.stringify({
      message: 'Recovery requested. Since the system email is disabled, please contact your developer to reset the admin password directly in the database.'
    }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
