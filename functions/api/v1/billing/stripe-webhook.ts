import { Env, query } from '../../../utils'

interface EnvExt extends Env {
  STRIPE_SECRET_KEY?: string
}

export async function onRequestPost(context: { request: Request; env: EnvExt }) {
  const { request, env } = context

  try {
    const payloadText = await request.text()
    
    let event: any
    try {
      event = JSON.parse(payloadText)
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), { status: 400 })
    }

    const sessionId = event.data?.object?.id
    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Session ID missing in payload' }), { status: 400 })
    }

    if (!env.STRIPE_SECRET_KEY || env.STRIPE_SECRET_KEY === '' || env.STRIPE_SECRET_KEY === 'mock') {
      return new Response(JSON.stringify({ error: 'Stripe secret key missing' }), { status: 500 })
    }

    // Securely fetch checkout session from Stripe API to verify payload authenticity
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
      }
    })

    if (!stripeRes.ok) {
      const errText = await stripeRes.text()
      return new Response(JSON.stringify({ error: `Stripe API error: ${errText}` }), { status: 400 })
    }

    const session = await stripeRes.json() as any

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return new Response(JSON.stringify({ received: true, status: session.status, payment_status: session.payment_status }), { status: 200 })
    }

    const userId = session.metadata?.user_id || session.subscription_data?.metadata?.user_id
    const plan = session.metadata?.plan || session.subscription_data?.metadata?.plan || 'monthly'

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID missing in session metadata' }), { status: 400 })
    }

    const userIdInt = parseInt(userId, 10)
    if (isNaN(userIdInt)) {
      return new Response(JSON.stringify({ error: 'Invalid User ID format' }), { status: 400 })
    }

    const productId = plan === 'yearly' ? 'premium_yearly' : 'premium_monthly'
    const interval = plan === 'yearly' ? '1 year' : '1 month'

    // Deactivate previous active subscriptions for this user
    await query(env, 'UPDATE subscription SET is_active = false WHERE user_id = $1', [userIdInt])

    // Insert new active subscription
    await query(env, `
      INSERT INTO subscription (
        user_id, platform, product_id, status, start_date, expiry_date, 
        is_active, gateway_subscription_id, gateway_customer_id, created_at, updated_at
      )
      VALUES ($1, 'stripe', $2, 'active', NOW(), NOW() + CAST($3 AS interval), true, $4, $5, NOW(), NOW())
    `, [
      userIdInt,
      productId,
      interval,
      session.subscription || null,
      session.customer || null
    ])

    return new Response(JSON.stringify({ ok: true, message: 'Subscription activated successfully' }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
