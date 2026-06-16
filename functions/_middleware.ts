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
  
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  })
}

