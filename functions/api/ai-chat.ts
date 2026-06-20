interface Env {
  GEMINI_API_KEY?: string
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context
    const body = await request.json() as any
    const userMessage = body.message || ''
    const history = body.history || []
    const persona = body.persona || 'friendly_tutor' // can be auslaenderbehoerde, landlord, jobcenter

    if (!env.GEMINI_API_KEY) {
      // Fallback if no API key is provided
      return new Response(JSON.stringify({
        ok: true,
        reply: "عذراً، خدمة الدردشة بالذكاء الاصطناعي غير مفعلة حالياً على السيرفر (API Key مفقود).",
        engine: "none"
      }), { headers: CORS_HEADERS })
    }

    let systemPrompt = "Du bist ein freundlicher Deutschlehrer für B1-Studenten. Antworte auf Deutsch, benutze einfaches B1-Vokabular und korrigiere den Schüler, wenn er große Fehler macht. Sei ermutigend."

    if (persona === 'auslaenderbehoerde') {
      systemPrompt = "Du bist ein Beamter bei der Ausländerbehörde in Deutschland. Du bist formell (Sie) und stellst Fragen zum Aufenthaltstitel, Pass und Arbeitsvertrag. Dein Deutsch ist auf B1/B2 Niveau."
    } else if (persona === 'landlord') {
      systemPrompt = "Du bist ein Vermieter in Deutschland. Du suchst einen neuen Mieter für deine Wohnung. Stell Fragen zum Beruf, Einkommen und Haustieren. Sei höflich aber bestimmt (Sie)."
    } else if (persona === 'jobcenter') {
      systemPrompt = "Du bist ein Berater beim Jobcenter. Du hilfst bei der Jobsuche und fragst nach Lebenslauf und Qualifikationen. Formell (Sie)."
    } else if (persona === 'friend') {
      systemPrompt = "Du bist ein deutscher Freund namens Lukas. Du sprichst informell (du) und chattest über Hobbys, Wochenende und Alltag. Benutze B1-Vokabular."
    }

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Verstanden. Ich bin bereit." }] }
    ]

    for (const msg of history) {
      const textContent = msg.content || msg.text || msg.parts || '';
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: textContent }]
      })
    }

    if (userMessage.trim()) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      })
    }

    // The user has requested to disable the AI feature completely.
    return new Response(JSON.stringify({ 
      ok: true, 
      reply: "عذراً، المحادثة مع الذكاء الاصطناعي متوقفة حالياً بطلب من الإدارة. يمكنك الاستمرار في تصفح باقي الدروس والتمارين في التطبيق.", 
      engine: 'offline' 
    }), { headers: CORS_HEADERS })

  } catch (e: any) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'حدث خطأ في السيرفر أثناء معالجة رسالتك.'
    }), { status: 500, headers: CORS_HEADERS })
  }
}
