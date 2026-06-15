import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { env } = context
  
  try {
    const result = await query(env, 
      `SELECT id, display_name, COALESCE(xp, 0) as xp FROM "user" ORDER BY COALESCE(xp, 0) DESC, created_at ASC LIMIT 50`
    )

    return new Response(JSON.stringify({ success: true, leaderboard: result.rows }), { headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    // Return empty leaderboard on error (e.g. if column doesn't exist yet)
    return new Response(JSON.stringify({ success: true, leaderboard: [] }), { headers: { 'Content-Type': 'application/json' } })
  }
}
