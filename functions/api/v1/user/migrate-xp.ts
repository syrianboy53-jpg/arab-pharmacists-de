import { Env, query } from '../../../../utils'

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context
  
  // Very basic auth to prevent abuse
  const authHeader = request.headers.get('Authorization')
  if (authHeader !== `Bearer ${env.ADMIN_TOKEN}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    await query(env, `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0;`)
    return new Response(JSON.stringify({ success: true, message: 'Added xp column to user table' }), { headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
