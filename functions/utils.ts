export interface Env {
  NEON_DATABASE_URL: string
  ADMIN_TOKEN: string
  JWT_SECRET: string
  RESEND_API_KEY: string
  FCM_SERVICE_ACCOUNT_JSON?: string
}

// Helper to query the Neon DB over HTTP
export async function query(env: Env, sql: string, params: any[] = []) {
  const host = env.NEON_DATABASE_URL.split('@')[1].split('/')[0]
  const dbUrl = `https://${host}/sql`
  
  const res = await fetch(dbUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': env.NEON_DATABASE_URL,
    },
    body: JSON.stringify({ query: sql, params }),
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`DB query failed: ${text}`)
  }
  
  return res.json() as any
}

// Hash a string using SHA-256
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function base64urlEncode(str: string): string {
  // Convert standard base64 to base64url
  return btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export function base64urlDecode(str: string): string {
  // Strip any existing '=' padding first, then convert base64url to standard base64
  let base64 = str.replace(/=/g, '').replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  return atob(base64)
}

// Decode and verify JWT token
export async function verifyJWT(authHeader: string | null, secret: string): Promise<number | null> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.split(' ')[1]
  const parts = token.split('.')
  if (parts.length !== 3) {
    return null
  }
  
  const [headerB64, payloadB64, signatureB64] = parts
  
  // Verify signature
  try {
    const data = `${headerB64}.${payloadB64}`
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    // Decode base64url signature safely
    const sigStr = base64urlDecode(signatureB64)
    const sigBytes = new Uint8Array(sigStr.length)
    for (let i = 0; i < sigStr.length; i++) {
      sigBytes[i] = sigStr.charCodeAt(i)
    }
    
    const verified = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      new TextEncoder().encode(data)
    )
    
    if (!verified) {
      return null
    }
    
    // Decode payload safely
    const payloadStr = base64urlDecode(payloadB64)
    const payload = JSON.parse(payloadStr)
    
    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null
    }
    
    return Number(payload.sub)
  } catch {
    return null
  }
}

