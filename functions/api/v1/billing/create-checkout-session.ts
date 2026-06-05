import { Env, query, verifyJWT } from '../../../utils'

interface EnvExt extends Env {
  STRIPE_SECRET_KEY?: string
  STRIPE_PRICE_YEARLY?: string
  STRIPE_PRICE_MONTHLY?: string
}

export async function onRequestPost(context: { request: Request; env: EnvExt }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { plan } = await request.json() as any

    if (!env.STRIPE_SECRET_KEY || env.STRIPE_SECRET_KEY === '' || env.STRIPE_SECRET_KEY === 'mock') {
      return new Response(JSON.stringify({ 
        error: 'بوابة الدفع Stripe غير مهيأة بعد على هذا الخادم.' 
      }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const userRes = await query(env, 'SELECT email FROM "user" WHERE id = $1', [userId])
    const userEmail = userRes.rows && userRes.rows[0] ? userRes.rows[0].email : ''

    const formData = new URLSearchParams()
    formData.append('payment_method_types[0]', 'card')
    formData.append('mode', 'subscription')
    if (userEmail) {
      formData.append('customer_email', userEmail)
    }

    const priceId = plan === 'yearly' 
      ? (env.STRIPE_PRICE_YEARLY || 'price_mock_yearly') 
      : (env.STRIPE_PRICE_MONTHLY || 'price_mock_monthly')

    formData.append('line_items[0][price]', priceId)
    formData.append('line_items[0][quantity]', '1')

    const origin = new URL(request.url).origin
    formData.append('success_url', `${origin}/app/#/premium?status=success`)
    formData.append('cancel_url', `${origin}/app/#/premium?status=cancel`)
    formData.append('metadata[user_id]', String(userId))
    formData.append('subscription_data[metadata][user_id]', String(userId))

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })

    if (stripeRes.ok) {
      const session = await stripeRes.json() as any
      return new Response(JSON.stringify({ url: session.url }), {
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      const errData = await stripeRes.json() as any
      const errMsg = errData.error?.message || 'فشلت عملية إنشاء جلسة الدفع عبر Stripe.'
      return new Response(JSON.stringify({ error: errMsg }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
