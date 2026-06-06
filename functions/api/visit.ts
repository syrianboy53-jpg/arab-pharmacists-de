import { Env, query } from '../utils'

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { env } = context
  try {
    // Increment the page_views config value in DB
    await query(env, "UPDATE config SET value = (value::integer + 1)::text WHERE key = 'page_views'")
    
    // Retrieve the updated value
    const res = await query(env, "SELECT value FROM config WHERE key = 'page_views'")
    const views = res.rows[0]?.value || '34820'
    
    return new Response(JSON.stringify({ views: parseInt(views, 10) }), {
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
