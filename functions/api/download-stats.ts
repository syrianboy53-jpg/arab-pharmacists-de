import { Env, query } from '../utils'

export async function onRequestGet(context: { env: Env }) {
  const { env } = context
  try {
    const [totalRes, todayRes, weekRes, byDayRes] = await Promise.all([
      query(env, 'SELECT COUNT(*)::integer FROM apk_downloads'),
      query(env, 'SELECT COUNT(*)::integer FROM apk_downloads WHERE created_at >= CURRENT_DATE'),
      query(env, "SELECT COUNT(*)::integer FROM apk_downloads WHERE created_at >= NOW() - INTERVAL '7 days'"),
      query(env, `
        SELECT TO_CHAR(created_at, 'YYYY-MM-DD') AS date, COUNT(*)::integer AS count
        FROM apk_downloads
        WHERE created_at >= NOW() - INTERVAL '14 days'
        GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
        ORDER BY date DESC
      `)
    ])

    const total = totalRes.rows[0]?.count || 0
    const today = todayRes.rows[0]?.count || 0
    const week = weekRes.rows[0]?.count || 0
    const by_day = byDayRes.rows || []

    return new Response(JSON.stringify({
      total,
      today,
      week,
      by_day
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
