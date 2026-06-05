import { Env, query, verifyJWT } from '../../../../utils'

interface EnvExt extends Env {
  LEMON_SQUEEZY_API_KEY?: string
}

export async function onRequestPost(context: { request: Request; env: EnvExt }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const isMock = !env.LEMON_SQUEEZY_API_KEY || env.LEMON_SQUEEZY_API_KEY === ''

    if (isMock) {
      return new Response(JSON.stringify({ 
        error: 'بوابة الدفع Lemon Squeezy غير مهيأة بعد على هذا الخادم.' 
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const redirectUrl = new URL(request.url).origin + '/app/#/premium?status=success'
    return new Response(JSON.stringify({ checkout_url: redirectUrl }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
