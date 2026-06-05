import { Env, query, verifyJWT } from '../../../utils'

interface EnvExt extends Env {
  STRIPE_SECRET_KEY?: string
}

export async function onRequestPost(context: { request: Request; env: EnvExt }) {
  const { request, env } = context
  const authHeader = request.headers.get('Authorization')
  
  const userId = await verifyJWT(authHeader, env.JWT_SECRET)
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const isMock = !env.STRIPE_SECRET_KEY || 
                   env.STRIPE_SECRET_KEY.startsWith('re_mock') || 
                   env.STRIPE_SECRET_KEY === 'mock' ||
                   env.STRIPE_SECRET_KEY === ''

    const redirectUrl = new URL(request.url).origin + '/app/#/premium'

    if (isMock) {
      return new Response(JSON.stringify({ url: redirectUrl }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const userRes = await query(env, 'SELECT email FROM "user" WHERE id = $1', [userId])
    const userEmail = userRes.rows && userRes.rows[0] ? userRes.rows[0].email : ''

    if (!userEmail) {
      return new Response(JSON.stringify({ url: redirectUrl }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const customerListRes = await fetch(`https://api.stripe.com/v1/customers?email=${encodeURIComponent(userEmail)}&limit=1`, {
      headers: { 'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}` }
    })

    if (!customerListRes.ok) {
      return new Response(JSON.stringify({ url: redirectUrl }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const customers = await customerListRes.json() as any
    if (!customers.data || customers.data.length === 0) {
      return new Response(JSON.stringify({ url: redirectUrl }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const customerId = customers.data[0].id

    const formData = new URLSearchParams()
    formData.append('customer', customerId)
    formData.append('return_url', redirectUrl)

    const portalRes = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })

    if (!portalRes.ok) {
      return new Response(JSON.stringify({ url: redirectUrl }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const portalSession = await portalRes.json() as any
    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
