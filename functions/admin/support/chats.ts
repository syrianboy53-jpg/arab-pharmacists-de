import { Env, query } from '../../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const adminToken = request.headers.get('X-Admin-Token')
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const res = await query(env, `
      SELECT s.*, u.email, u.display_name 
      FROM support_chats s
      LEFT JOIN "user" u ON s.user_id = u.id
      ORDER BY s.last_msg_at DESC NULLS LAST, s.created_at DESC
    `)

    const chats = (res.rows || []).map((row: any) => ({
      ...row,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
      last_msg_at: row.last_msg_at ? new Date(row.last_msg_at).toISOString() : null
    }))

    const unreadRes = await query(env, "SELECT SUM(unread_for_admin)::integer as count FROM support_chats")
    const total_unread = unreadRes.rows[0]?.count || 0

    return new Response(JSON.stringify({
      chats,
      total_unread
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
