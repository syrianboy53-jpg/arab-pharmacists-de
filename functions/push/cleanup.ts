import { Env, query } from '../utils'

// Helper to base64url-encode ArrayBuffer
function arrayBufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

// Helper to base64url-encode JSON object
function jsonToBase64url(obj: any): string {
  const str = JSON.stringify(obj)
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

// Helper to get Google OAuth2 Access Token for FCM
async function getFcmAccessToken(serviceAccountJsonStr: string): Promise<string> {
  const sa = JSON.parse(serviceAccountJsonStr)
  
  // Parse PEM private key
  const pemHeader = '-----BEGIN PRIVATE KEY-----'
  const pemFooter = '-----END PRIVATE KEY-----'
  let pemContents = sa.private_key
  if (pemContents.includes(pemHeader)) {
    pemContents = pemContents.split(pemHeader)[1].split(pemFooter)[0]
  }
  pemContents = pemContents.replace(/\s/g, '')
  
  const binaryString = atob(pemContents)
  const keyBytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    keyBytes[i] = binaryString.charCodeAt(i)
  }
  
  // Import Key
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyBytes.buffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' }
    },
    false,
    ['sign']
  )
  
  // Create JWT claim set
  const header = { alg: 'RS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const claimSet = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }
  
  const headerB64 = jsonToBase64url(header)
  const claimB64 = jsonToBase64url(claimSet)
  const tokenStr = `${headerB64}.${claimB64}`
  
  // Sign JWT
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(tokenStr)
  )
  
  const signatureB64 = arrayBufferToBase64url(signature)
  const jwt = `${tokenStr}.${signatureB64}`
  
  // Fetch Token
  const oauthRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  })
  
  if (!oauthRes.ok) {
    const text = await oauthRes.text()
    throw new Error(`Google OAuth2 request failed: ${text}`)
  }
  
  const data = await oauthRes.json() as any
  return data.access_token
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const url = new URL(request.url)
  const adminToken = request.headers.get('X-Admin-Token') || url.searchParams.get('token')
  
  if (adminToken !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const offset = parseInt(url.searchParams.get('offset') || '0', 10)
  const limit = 30

  try {
    if (!env.FCM_SERVICE_ACCOUNT_JSON) {
      return new Response(JSON.stringify({ error: 'Firebase is not configured' }), { status: 500 })
    }

    // 1. Get Access Token
    const accessToken = await getFcmAccessToken(env.FCM_SERVICE_ACCOUNT_JSON)
    const sa = JSON.parse(env.FCM_SERVICE_ACCOUNT_JSON)
    const projectId = sa.project_id

    // 2. Fetch 30 active tokens from database
    const dbRes = await query(env, 'SELECT token FROM pushdevice WHERE active = true ORDER BY id ASC LIMIT $1 OFFSET $2', [limit, offset])
    const tokens = dbRes.rows?.map((r: any) => r.token) || []

    if (tokens.length === 0) {
      return new Response(JSON.stringify({ 
        ok: true, 
        processed: 0,
        deactivated: 0,
        message: 'No active devices found for this offset.'
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    let deactivatedCount = 0

    // 3. Validate tokens in parallel
    const results = await Promise.all(tokens.map(async (token: string) => {
      try {
        const fcmRes = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            validate_only: true,
            message: { token }
          })
        })
        
        if (!fcmRes.ok) {
          const errData = await fcmRes.json() as any
          const fcmErrorStatus = errData.error?.status
          const fcmErrorCode = errData.error?.details?.[0]?.errorCode
          
          if (
            fcmRes.status === 404 || 
            fcmRes.status === 400 || 
            fcmErrorStatus === 'NOT_FOUND' || 
            fcmErrorStatus === 'INVALID_ARGUMENT' ||
            fcmErrorCode === 'UNREGISTERED' ||
            fcmErrorCode === 'INVALID_ARGUMENT'
          ) {
            await query(env, 'UPDATE pushdevice SET active = false WHERE token = $1', [token]).catch(() => {})
            deactivatedCount++
            return { token, valid: false, error: fcmErrorStatus }
          }
          return { token, valid: false, error: 'other_error' }
        }
        return { token, valid: true }
      } catch (err: any) {
        return { token, valid: false, error: err.message }
      }
    }))

    // Get overall remaining active count
    const countRes = await query(env, 'SELECT COUNT(*)::integer as count FROM pushdevice WHERE active = true')
    const active_remaining = countRes.rows[0]?.count || 0

    return new Response(JSON.stringify({ 
      ok: true, 
      processed: tokens.length,
      deactivated: deactivatedCount,
      active_remaining,
      offset,
      results
    }), { headers: { 'Content-Type': 'application/json' } })

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
