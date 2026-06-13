interface Env {
  GEMINI_API_KEY?: string
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

// ===================================================
// RULE-BASED CORRECTION ENGINE (works without API key)
// Detects the most common B1-level German mistakes
// ===================================================

interface GrammarRule {
  pattern: RegExp
  correct: string
  explanation: string
}

const GRAMMAR_RULES: GrammarRule[] = [
  // Modal verbs + Infinitiv
  { pattern: /\b(kann|kann nicht|könnte|möchte|will|muss|darf|soll)\s+([\w]+en?)\s+nicht\b/gi, correct: '', explanation: 'ترتيب "nicht" مع الأفعال الناقصة: ضع "nicht" قبل الفعل الأصلي' },
  // mochte vs möchte
  { pattern: /\bmochte\b/g, correct: 'möchte', explanation: '"mochte" خطأ، الصحيح "möchte" (أريد)' },
  // bin/ist confusion
  { pattern: /\bIch ist\b/g, correct: 'Ich bin', explanation: 'مع "Ich" نستخدم "bin" وليس "ist"' },
  // Er/Sie bin confusion
  { pattern: /\b(Er|Sie|Es) bin\b/g, correct: '$1 ist', explanation: 'مع Er/Sie/Es نستخدم "ist" وليس "bin"' },
  // haben vs sein confusion with adjectives
  { pattern: /\bIch habe\s+(\d+)\s+Jahre?\b/g, correct: 'Ich bin $1 Jahre alt', explanation: 'للعمر نستخدم "sein" وليس "haben": "Ich bin ... Jahre alt"' },
  // mit + Dativ
  { pattern: /\bmit mein\b/g, correct: 'mit meinem/meiner', explanation: 'بعد "mit" نستخدم حالة المفعول به الغير مباشر (Dativ): "mit meinem/meiner"' },
  // in + Dativ for location
  { pattern: /\bin der\s+(\w+)e\b/gi, correct: '', explanation: 'تحقق من حالة الاسم بعد "in" عند الحديث عن مكان' },
  // weil + Verb am Ende
  { pattern: /\bweil\s+(?:ich|er|sie|es|wir|ihr|Sie)\s+\w+\s+(bin|ist|sind|habe|hat|haben|war|wurde)\b/gi, correct: '', explanation: 'بعد "weil" الفعل يأتي في نهاية الجملة' },
  // Formal greeting
  { pattern: /\bLiebe Damen\b/g, correct: 'Sehr geehrte Damen', explanation: 'في الرسائل الرسمية نستخدم "Sehr geehrte" وليس "Liebe"' },
  // freundlich Grüße  
  { pattern: /\bMit freundlich(e|en)?\s+Gruß(e)?\b/gi, correct: 'Mit freundlichen Grüßen', explanation: 'الختام الرسمي الصحيح: "Mit freundlichen Grüßen"' },
  // Groß vs grosse
  { pattern: /\bgrosse\b/g, correct: 'große', explanation: '"grosse" خطأ إملائي، الصحيح "große"' },
  // konnen
  { pattern: /\bkonnen\b/g, correct: 'können', explanation: '"konnen" خطأ إملائي، الصحيح "können"' },
  // ich mochte
  { pattern: /\bich mochte\b/g, correct: 'ich möchte', explanation: '"mochte" خطأ، الصحيح "möchte"' },
  // Umlaut missing: uber
  { pattern: /\buber\b/g, correct: 'über', explanation: '"uber" خطأ إملائي، الصحيح "über"' },
  // fur
  { pattern: /\bfur\b/g, correct: 'für', explanation: '"fur" خطأ إملائي، الصحيح "für"' },
  // danke/Danke schon
  { pattern: /\b[Dd]anke schon\b/g, correct: 'Danke schön', explanation: '"schon" تعني "بالفعل"، أما "schön" فتعني "جميل" في "Danke schön"' },
  // uber das
  { pattern: /\buber das\b/g, correct: 'über das / darüber', explanation: 'استخدم "über" مع Umlaut أو "darüber"' },
  // Plural issues - common mistake
  { pattern: /\bviele\s+(\w+)s\b/g, correct: '', explanation: 'في الألمانية نادراً ما تُستخدم لاحقة "-s" للجمع — تحقق من صيغة الجمع الصحيحة' },
]

// Positive phrase patterns to detect
const POSITIVE_PATTERNS = [
  { pattern: /\bSehr geehrte\b/i, note: 'استخدمت التحية الرسمية الصحيحة "Sehr geehrte"' },
  { pattern: /\bMit freundlichen Grüßen\b/i, note: 'استخدمت ختام الرسالة الرسمي الصحيح' },
  { pattern: /\bIch schreibe\b/i, note: 'بدأت بجملة تعريفية واضحة' },
  { pattern: /\bweil\b/i, note: 'استخدمت أداة التعليل "weil" — دليل على مستوى جيد' },
  { pattern: /\bdeshalb|daher|deswegen\b/i, note: 'استخدمت روابط سببية متقدمة (deshalb/daher)' },
  { pattern: /\baußerdem|darüber hinaus\b/i, note: 'استخدمت روابط إضافية متقدمة (außerdem)' },
  { pattern: /\bLeider\b/i, note: 'استخدمت "Leider" بشكل صحيح للتعبير عن الأسف' },
  { pattern: /\bwürde|hätte|wäre\b/i, note: 'استخدمت صيغة المؤدب Konjunktiv II — ممتاز!' },
]

function runRuleBasedCorrection(text: string, taskType: string, taskPromptAr: string) {
  const errors: { original: string; corrected: string; explanation: string }[] = []
  let correctedText = text

  // Apply grammar rules
  for (const rule of GRAMMAR_RULES) {
    const matches = text.match(rule.pattern)
    if (matches) {
      for (const match of matches) {
        const correctedMatch = rule.correct
          ? match.replace(rule.pattern, rule.correct)
          : match
        
        // Avoid duplicate errors
        if (!errors.find(e => e.original === match)) {
          errors.push({
            original: match,
            corrected: correctedMatch !== match ? correctedMatch : `[راجع: ${rule.explanation.split('،')[0]}]`,
            explanation: rule.explanation,
          })
        }

        if (correctedMatch && correctedMatch !== match) {
          correctedText = correctedText.replace(match, correctedMatch)
        }
      }
    }
  }

  // Detect positives
  const positives: string[] = []
  for (const pp of POSITIVE_PATTERNS) {
    if (pp.pattern.test(text)) {
      positives.push(pp.note)
    }
  }
  if (positives.length === 0) {
    positives.push('حاولت الكتابة بالألمانية — هذا هو الأهم!')
  }

  // Word count check
  const words = text.split(/\s+/).filter(Boolean)
  const wordCount = words.length

  // Improvements
  const improvements: string[] = []
  if (wordCount < 60) {
    improvements.push(`النص قصير جداً (${wordCount} كلمة). حاول الوصول إلى 80-100 كلمة لامتحان B1.`)
  }
  if (!text.match(/\bweil|da|denn|deshalb|daher\b/i)) {
    improvements.push('أضف جملة تعليلية باستخدام "weil" أو "deshalb" لإثراء النص.')
  }
  if (!text.match(/\baußerdem|auch|und\b/i)) {
    improvements.push('استخدم روابط مثل "außerdem" أو "auch" لربط الأفكار.')
  }
  if (taskType.toLowerCase().includes('brief') && !text.match(/\bSehr geehrte|Liebe[r]?\b/i)) {
    improvements.push('لا تنسَ البدء بتحية مناسبة: "Sehr geehrte..." للرسمي أو "Liebe/r..." لغير الرسمي.')
  }
  if (improvements.length === 0) {
    improvements.push('حاول استخدام صيغة Konjunktiv II (würde/hätte) لجعل أسلوبك أكثر رقياً.')
  }

  // Calculate score
  const errorDeduction = Math.min(errors.length * 8, 40)
  const wordBonus = wordCount >= 70 ? 10 : wordCount >= 50 ? 5 : 0
  const positivesBonus = positives.length * 5
  let score = Math.max(30, Math.min(95, 70 - errorDeduction + wordBonus + positivesBonus))

  // Score label
  let scoreLabel = 'يحتاج تحسيناً'
  let scoreColor = 'red'
  if (score >= 85) { scoreLabel = 'ممتاز'; scoreColor = 'emerald' }
  else if (score >= 70) { scoreLabel = 'جيد جداً'; scoreColor = 'blue' }
  else if (score >= 60) { scoreLabel = 'جيد'; scoreColor = 'yellow' }
  else if (score >= 45) { scoreLabel = 'مقبول'; scoreColor = 'orange' }

  // Task fulfillment
  const taskFulfillment = errors.length <= 2 && wordCount >= 60 ? 'نعم' : wordCount >= 40 ? 'جزئياً' : 'لا'
  const taskFulfillmentNote = taskFulfillment === 'نعم'
    ? 'النص يستوفي المتطلبات الأساسية لمهمة الكتابة.'
    : taskFulfillment === 'جزئياً'
    ? 'النص يستوفي بعض المتطلبات لكنه يحتاج إلى إضافة المزيد من التفاصيل.'
    : 'النص يحتاج إلى تطوير أكثر ليستوفي متطلبات المهمة.'

  return {
    score,
    scoreLabel,
    scoreColor,
    correctedText,
    errors: errors.slice(0, 6),
    improvements: improvements.slice(0, 3),
    positives: positives.slice(0, 3),
    taskFulfillment,
    taskFulfillmentNote,
  }
}

// ===================================================
// MAIN HANDLER
// ===================================================

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

    if (!userText || userText.trim().length < 10) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'يرجى كتابة نص أطول قبل طلب التصحيح (10 أحرف على الأقل).'
      }), { status: 400, headers: CORS_HEADERS })
    }

    // === TRY GEMINI API FIRST (if key available) ===
    if (env.GEMINI_API_KEY && env.GEMINI_API_KEY.startsWith('AIza')) {
      const systemPrompt = `أنت مصحح لغوي متخصص في تعليم اللغة الألمانية لمستوى B1 (CEFR).
مهمتك تصحيح النصوص الألمانية من متعلمين عرب. استجب بـ JSON فقط.

صيغة JSON المطلوبة:
{
  "score": <0-100>,
  "scoreLabel": "<ممتاز|جيد جداً|جيد|مقبول|يحتاج تحسيناً>",
  "scoreColor": "<emerald|blue|yellow|orange|red>",
  "correctedText": "<النص بعد التصحيح>",
  "errors": [{"original":"<الخطأ>","corrected":"<التصحيح>","explanation":"<شرح بالعربية>"}],
  "improvements": ["<اقتراح>"],
  "positives": ["<نقطة إيجابية>"],
  "taskFulfillment": "<نعم|جزئياً|لا>",
  "taskFulfillmentNote": "<ملاحظة>"
}`

      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nالمهمة: ${taskType}\n${taskPromptDe}\n\nالنص:\n${userText.trim()}` }] }],
              generationConfig: { responseMimeType: 'application/json', temperature: 0.3, maxOutputTokens: 2048 }
            })
          }
        )

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json() as any
          const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || ''
          const result = JSON.parse(rawText)
          return new Response(JSON.stringify({ ok: true, result, engine: 'gemini' }), { headers: CORS_HEADERS })
        }
      } catch {
        // Fall through to rule-based engine
      }
    }

    // === FALLBACK: RULE-BASED ENGINE ===
    const result = runRuleBasedCorrection(userText, taskType, taskPromptAr)
    return new Response(JSON.stringify({ ok: true, result, engine: 'rules' }), {
      headers: CORS_HEADERS
    })

  } catch (e: any) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
    }), { status: 500, headers: CORS_HEADERS })
  }
}
