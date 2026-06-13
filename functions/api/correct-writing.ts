interface Env {
  GEMINI_API_KEY: string
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS })
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context

  try {
    const body = await request.json() as {
      userText: string
      taskPromptDe: string
      taskPromptAr: string
      taskType: string
    }

    const { userText, taskPromptDe, taskPromptAr, taskType } = body

    // Validation
    if (!userText || userText.trim().length < 10) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'يرجى كتابة نص أطول قبل طلب التصحيح (10 أحرف على الأقل).'
      }), { status: 400, headers: CORS_HEADERS })
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'خدمة التصحيح غير مفعّلة حالياً. يرجى المحاولة لاحقاً.'
      }), { status: 503, headers: CORS_HEADERS })
    }

    const systemPrompt = `أنت مصحح لغوي متخصص في تعليم اللغة الألمانية لمستوى B1 (CEFR). 
مهمتك هي تصحيح النصوص الألمانية المكتوبة من قِبَل المتعلمين العرب.

قواعد التصحيح:
1. ركّز على الأخطاء الشائعة لمستوى B1: الأفعال، ترتيب الكلمات (Satzstellung)، المفردات، علامات الترقيم.
2. قدّم التصحيح بطريقة تشجيعية وإيجابية.
3. أعطِ درجة تقييم من 100 بناءً على: الصحة النحوية (40%)، الأسلوب (30%)، استيفاء المتطلبات (30%).
4. استجب دائماً بصيغة JSON فقط، بدون أي نص خارجها.

صيغة الاستجابة المطلوبة (JSON):
{
  "score": <number 0-100>,
  "scoreLabel": "<ممتاز|جيد جداً|جيد|مقبول|يحتاج تحسيناً>",
  "scoreColor": "<emerald|blue|yellow|orange|red>",
  "correctedText": "<النص بعد التصحيح>",
  "errors": [
    {
      "original": "<الخطأ الأصلي>",
      "corrected": "<التصحيح>",
      "explanation": "<شرح قصير بالعربية>"
    }
  ],
  "improvements": ["<اقتراح تحسين 1>", "<اقتراح تحسين 2>"],
  "positives": ["<نقطة إيجابية 1>", "<نقطة إيجابية 2>"],
  "taskFulfillment": "<هل استوفى المتطلبات؟ نعم/جزئياً/لا>",
  "taskFulfillmentNote": "<ملاحظة قصيرة عن مدى استيفاء متطلبات السؤال>"
}`

    const userPrompt = `مهمة الكتابة (السؤال):
النوع: ${taskType}
بالألماني: ${taskPromptDe}
بالعربية: ${taskPromptAr}

النص المكتوب من المتعلم:
---
${userText.trim()}
---

قم بتقييم هذا النص وتصحيحه.`

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt + '\n\n' + userPrompt }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3,
            maxOutputTokens: 2048,
          }
        })
      }
    )

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      console.error('Gemini API error:', errText)
      return new Response(JSON.stringify({
        ok: false,
        error: 'خطأ في الاتصال بخدمة الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.'
      }), { status: 502, headers: CORS_HEADERS })
    }

    const geminiData = await geminiRes.json() as any
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    let result: any
    try {
      result = JSON.parse(rawText)
    } catch {
      console.error('Failed to parse Gemini JSON:', rawText)
      return new Response(JSON.stringify({
        ok: false,
        error: 'لم يتمكن الذكاء الاصطناعي من إرجاع نتيجة صحيحة. يرجى المحاولة مرة أخرى.'
      }), { status: 500, headers: CORS_HEADERS })
    }

    return new Response(JSON.stringify({ ok: true, result }), {
      headers: CORS_HEADERS
    })

  } catch (e: any) {
    console.error('correct-writing error:', e)
    return new Response(JSON.stringify({
      ok: false,
      error: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
    }), { status: 500, headers: CORS_HEADERS })
  }
}
