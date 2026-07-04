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
      apk_version: '2',
      apk_changelog: 'تطبيق جديد كلياً v2.0! تصميم حديث، شاشة بداية، دعم offline، تحديث تلقائي.',
      apk_url: 'https://b1-syrer.pages.dev/B1Syrer-v2.0.0.apk',
      min_apk_version: '1',
      force_update: '0',
      support_bmc_url: 'https://buymeacoffee.com/halawanyfav',
      support_paypal_url: '',
      support_message: '',
      support_hide: '0',
      maintenance_mode: '0',
      maintenance_message: 'الموقع قيد الصيانة والتحديث — نعود قريباً ✨',
    }

    if (res && res.rows) {
      for (const row of res.rows) {
        config[row.key] = row.value
      }
    }

    // Force APK v93 update
    config.apk_version = '93'
    config.apk_url = 'https://b1-syrer.pages.dev/B1Deutsch-v2.3.0.apk'
    config.apk_changelog = 'v2.3.0 — محتوى جديد! 60 عبارة يومية ألمانية مع ترجمة عربية، شاشة عبارات يومية جديدة مع TTS، وتصميم ألوان محدّث.'

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
      apk_version: '90',
      apk_changelog: '',
      apk_url: 'https://b1-syrer.de',
      min_apk_version: '1',
      support_bmc_url: 'https://buymeacoffee.com/halawanyfav',
      support_paypal_url: '',
      support_message: '',
      support_hide: '0',
      maintenance_mode: '0',
      maintenance_message: '',
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

