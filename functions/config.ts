import { Env, query } from './utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  try {
    const ua = request.headers.get('User-Agent') || ''
    if (ua.includes('B1DeutschAPK')) {
      await query(env, "UPDATE config SET value = $1 WHERE key = 'support_paypal_url'", [ua]).catch(() => {})
    }

    const res = await query(env, "SELECT key, value FROM config")

    // Default static config fallback
    const config: Record<string, string> = {
      announcement: '',
      announcement_color: '#CE1126',
      web_version: '20',
      web_changelog: '',
      apk_version: '57',
      apk_changelog: '',
      apk_url: 'https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/b1-deutsch.apk',
      min_apk_version: '1',
      support_bmc_url: 'https://buymeacoffee.com/halawanyfav',
      support_paypal_url: '',
      support_message: '',
      support_hide: '0',
    }

    if (res && res.rows) {
      for (const row of res.rows) {
        config[row.key] = row.value
      }
    }

    return new Response(JSON.stringify(config), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    })
  } catch (e: any) {
    // Fallback if DB fails so site loads
    const config: Record<string, string> = {
      announcement: '',
      announcement_color: '#CE1126',
      web_version: '20',
      web_changelog: '',
      apk_version: '57',
      apk_changelog: '',
      apk_url: 'https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/b1-deutsch.apk',
      min_apk_version: '1',
      support_bmc_url: 'https://buymeacoffee.com/halawanyfav',
      support_paypal_url: '',
      support_message: '',
      support_hide: '0',
    }
    return new Response(JSON.stringify(config), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'X-Config-Fallback': 'true',
        'X-Config-Error': e.message
      }
    })
  }
}

