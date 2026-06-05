import { Env, query } from '../../utils'

const DEFAULT_SETTINGS = {
  active: false,
  title: '',
  body: '',
  emoji: '🎉',
  code: '',
  cta_label: '',
  cta_url: '',
  gradient_from: '#f59e0b',
  gradient_to: '#d97706',
  show_on_every_visit: false
}

export async function onRequestGet(context: { env: Env }) {
  const { env } = context
  try {
    const res = await query(env, "SELECT value FROM config WHERE key = 'announcement_settings'")
    if (res.rows && res.rows.length > 0 && res.rows[0].value) {
      return new Response(res.rows[0].value, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      })
    }
    return new Response(JSON.stringify(DEFAULT_SETTINGS), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
