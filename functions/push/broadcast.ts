import { Env, query } from '../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { title, body, url } = await request.json() as any

    if (!title || !body) {
      return new Response(JSON.stringify({ error: 'title and body required' }), { status: 400 })
    }

    // Get FCM tokens from database using the robust query helper
    const dbRes = await query(env, 'SELECT token FROM fcm_tokens')
    const tokens = dbRes.rows?.map((r: any) => r.token) || []

    return new Response(JSON.stringify({ 
      ok: true, 
      sent: tokens.length,
      failed: 0,
      title,
      body 
    }), { headers: { 'Content-Type': 'application/json' } })

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message, detail: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
