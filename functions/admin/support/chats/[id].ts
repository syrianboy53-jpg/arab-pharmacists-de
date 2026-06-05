import { Env, query } from '../../../utils'

export async function onRequest(context: { request: Request; env: Env; params: { id: string } }) {
  const { request, env, params } = context
  const adminToken = request.headers.get('X-Admin-Token')
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const chatId = params.id
  if (!chatId) {
    return new Response(JSON.stringify({ error: 'Chat ID required' }), { status: 400 })
  }

  const method = request.method

  try {
    if (method === 'GET') {
      // Mark as read for admin
      await query(env, "UPDATE support_chats SET unread_for_admin = 0 WHERE id = $1", [chatId])

      // Fetch chat details
      const chatRes = await query(env, `
        SELECT s.*, u.email, u.display_name 
        FROM support_chats s
        LEFT JOIN "user" u ON s.user_id = u.id
        WHERE s.id = $1
      `, [chatId])

      if (!chatRes.rows || chatRes.rows.length === 0) {
        return new Response(JSON.stringify({ error: 'Chat not found' }), { status: 404 })
      }

      // Fetch chat messages
      const msgsRes = await query(env, "SELECT * FROM support_messages WHERE chat_id = $1 ORDER BY created_at ASC", [chatId])

      const chat = chatRes.rows[0]
      chat.created_at = chat.created_at ? new Date(chat.created_at).toISOString() : null
      chat.last_msg_at = chat.last_msg_at ? new Date(chat.last_msg_at).toISOString() : null

      const messages = (msgsRes.rows || []).map((msg: any) => ({
        ...msg,
        created_at: msg.created_at ? new Date(msg.created_at).toISOString() : null
      }))

      return new Response(JSON.stringify({
        chat,
        messages
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      })
    }

    if (method === 'POST') {
      const { body } = await request.json() as { body: string }
      if (!body || !body.trim()) {
        return new Response(JSON.stringify({ error: 'Body required' }), { status: 400 })
      }

      // Insert message
      await query(env, `
        INSERT INTO support_messages (chat_id, sender, body, created_at)
        VALUES ($1, 'admin', $2, NOW())
      `, [chatId, body.trim()])

      // Update chat state
      await query(env, `
        UPDATE support_chats 
        SET last_msg_at = NOW(), last_msg_sender = 'admin', unread_for_user = unread_for_user + 1
        WHERE id = $1
      `, [chatId])

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (method === 'PATCH') {
      const { status } = await request.json() as { status: string }
      if (!status) {
        return new Response(JSON.stringify({ error: 'Status required' }), { status: 400 })
      }

      await query(env, "UPDATE support_chats SET status = $1 WHERE id = $2", [status, chatId])
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
