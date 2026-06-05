import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, "SELECT key, value FROM config")
    
    // Default static config fallback (to ensure React controlled inputs never receive undefined values)
    const config: Record<string, string> = {
      announcement: '',
      announcement_color: '#CE1126',
      web_version: '20',
      web_changelog: '',
      apk_version: '56',
      apk_changelog: '',
      apk_url: 'https://b1-syrer.de/b1-deutsch.apk',
      min_apk_version: '1',
      support_bmc_url: 'https://buymeacoffee.com/halawanyfav',
      support_paypal_url: '',
      support_message: '',
      support_hide: '0',
    }

    if (res.rows) {
      for (const row of res.rows) {
        config[row.key] = row.value
      }
    }
    return new Response(JSON.stringify(config), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

async function handleWrite(request: Request, env: Env) {
  const adminToken = request.headers.get('X-Admin-Token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const updates = await request.json() as Record<string, string>
    for (const [key, value] of Object.entries(updates)) {
      await query(env,
        `INSERT INTO config (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
        [key, value]
      )
    }
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  return handleWrite(context.request, context.env)
}

export async function onRequestPut(context: { request: Request; env: Env }) {
  return handleWrite(context.request, context.env)
}
