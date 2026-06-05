import { Env, query, verifyJWT } from '../../../../utils'

interface EnvExt extends Env {
  PAYPAL_CLIENT_ID?: string
  PAYPAL_CLIENT_SECRET?: string
}

export async function onRequestPost(context: { request: Request; env: EnvExt }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const isMock = !env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET || env.PAYPAL_CLIENT_ID === ''

    if (isMock) {
      return new Response(JSON.stringify({ 
        error: 'بوابة الدفع PayPal غير مهيأة بعد على هذا الخادم.' 
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const redirectUrl = new URL(request.url).origin + '/app/#/premium?status=success'
    return new Response(JSON.stringify({ approve_url: redirectUrl }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
