interface Env {
  NEON_DATABASE_URL: string
  ADMIN_TOKEN: string
}

export async function onRequestGet(context: { env: Env }) {
  const { env } = context
  try {
    const res = await fetch(env.NEON_DATABASE_URL.replace('postgresql://', 'https://').split('?')[0], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Neon-Connection-String': env.NEON_DATABASE_URL },
      body: JSON.stringify({ query: "SELECT key, value FROM config" })
    })

    // Fallback: return static config if DB query fails
    const config: Record<string, string> = {
      announcement: '',
      announcement_color: '#CE1126',
      web_version: '20',
      web_changelog: '',
      apk_version: '52',
      apk_changelog: '',
      apk_url: 'https://b1-syrer.de/b1-deutsch.apk',
      min_apk_version: '1',
      support_bmc_url: 'https://buymeacoffee.com/halawanyfav',
      support_paypal_url: '',
      support_message: '',
      support_hide: '0',
    }

    if (res.ok) {
      const data = await res.json() as any
      if (data.rows) {
        for (const row of data.rows) {
          config[row.key] = row.value
        }
      }
    }

    return new Response(JSON.stringify(config), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
  }
}
