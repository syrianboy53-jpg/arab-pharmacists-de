import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const country = request.headers.get('CF-IPCountry') || 'unknown'
    const ua = request.headers.get('User-Agent') || ''

    if (ip !== 'unknown') {
      // Check if this IP has visited in the last 15 minutes to prevent spamming logs
      const recentCheck = await query(env, 
        "SELECT id FROM visitor_logs WHERE ip_address = $1 AND created_at >= NOW() - INTERVAL '15 minutes' LIMIT 1", 
        [ip]
      )
      
      if (recentCheck.rows.length === 0) {
        await query(env, 
          "INSERT INTO visitor_logs (ip_address, country, user_agent) VALUES ($1, $2, $3)", 
          [ip, country, ua]
        )
      }
    }

    // Run queries in parallel for efficiency
    const [countRes, todayRes, topCountriesRes] = await Promise.all([
      query(env, "SELECT COUNT(DISTINCT ip_address)::integer FROM visitor_logs"),
      query(env, "SELECT COUNT(DISTINCT ip_address)::integer FROM visitor_logs WHERE created_at >= CURRENT_DATE"),
      query(env, "SELECT country, COUNT(DISTINCT ip_address)::integer AS count FROM visitor_logs GROUP BY country ORDER BY count DESC LIMIT 8")
    ])

    const uniqueCount = countRes.rows[0]?.count || 0
    const todayCount = todayRes.rows[0]?.count || 0
    const topCountries = topCountriesRes.rows || []
    
    // Base offset to maintain the historical count
    const baseOffset = 34820
    const totalViews = baseOffset + uniqueCount

    return new Response(JSON.stringify({ 
      views: totalViews,
      today: todayCount,
      countries: topCountries
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
