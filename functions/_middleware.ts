export async function onRequest(context: any) {
  const response = await context.next()
  const newHeaders = new Headers(response.headers)
  newHeaders.set('Access-Control-Allow-Origin', '*')
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token')
  
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: newHeaders })
  }
  
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  })
}
