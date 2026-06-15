import { Env, query, sha256 } from './utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  
  // 1. Get apk_url from DB config table
  let apkUrl = 'https://raw.githubusercontent.com/syrianboy53-jpg/arab-pharmacists-de/main/landing/apk/b1-deutsch-v90.apk'
  try {
    const res = await query(env, "SELECT value FROM config WHERE key = 'apk_raw_url'")
    if (res.rows && res.rows.length > 0 && res.rows[0].value) {
      apkUrl = res.rows[0].value
    }
  } catch (e) {
    console.error('Error fetching apk_url from DB:', e)
  }

  // 2. Log download click in DB
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const ipHash = await sha256(ip)
    await query(env, 'INSERT INTO apk_downloads (ip_hash) VALUES ($1)', [ipHash])
  } catch (e) {
    console.error('Error logging download click:', e)
  }

  // 3. Redirect to the actual APK file with a cache-buster query param
  const separator = apkUrl.includes('?') ? '&' : '?';
  const redirectUrl = `${apkUrl}${separator}t=${Date.now()}`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectUrl,
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  })
}
