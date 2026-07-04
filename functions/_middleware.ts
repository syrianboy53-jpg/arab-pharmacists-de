export async function onRequest(context: any) {
  const { request } = context
  const url = new URL(request.url)
  
  if (request.method === 'OPTIONS') {
    const corsHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token'
    })
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  const response = await context.next()
  const newHeaders = new Headers(response.headers)
  newHeaders.set('Access-Control-Allow-Origin', '*')
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token')

  const path = url.pathname
  const contentType = response.headers.get('content-type') || ''
  
  if (response.status === 405 || response.status === 404) {
    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH' || request.method === 'DELETE') {
      newHeaders.set('Content-Type', 'application/json')
      return new Response(JSON.stringify({
        ok: true,
        error: `DEBUG_405: ${request.method} to ${path}`,
        reply: `DEBUG_405: The app is trying to send a ${request.method} request to ${path}. Please tell Fadi this exact message!`,
        message: `DEBUG_405: ${request.method} to ${path}`,
        detail: `The endpoint returned ${response.status}`
      }), {
        status: 200, // Force 200 so the APK parses the JSON and shows the message
        headers: newHeaders
      })
    }
  }

  // Intercept HTML fallbacks on API/Admin/Auth endpoints and return clean JSON
  if (
    (path.startsWith('/admin/') || path.startsWith('/api/') || path.startsWith('/auth/')) &&
    contentType.includes('text/html')
  ) {
    newHeaders.set('Content-Type', 'application/json')
    return new Response(JSON.stringify({
      error: `Endpoint not found: ${path}`,
      detail: `هذه الميزة/الصفحة غير متوفرة بعد أو لم يتم استعادتها بالكامل.`
    }), {
      status: 404,
      headers: newHeaders
    })
  }
  
  // Prevent Cloudflare CDN from caching HTML (index.html) so users always get the latest app
  const isHTML = (newHeaders.get('content-type') || '').includes('text/html')
  if (isHTML) {
    newHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate')
  }

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  })
}

