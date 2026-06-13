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
  // === VERB CONJUGATION ===
  { pattern: /\bIch ist\b/g, correct: 'Ich bin', explanation: 'مع "Ich" نستخدم "bin" وليس "ist"' },
  { pattern: /\bIch sind\b/g, correct: 'Ich bin', explanation: 'مع "Ich" نستخدم "bin" وليس "sind"' },
  { pattern: /\bIch haben\b/g, correct: 'Ich habe', explanation: 'مع "Ich" نستخدم "habe" وليس "haben"' },
  { pattern: /\bIch sein\b/g, correct: 'Ich bin', explanation: 'مع "Ich" الفعل يُصرّف: "Ich bin"' },
  { pattern: /\bDu ist\b/g, correct: 'Du bist', explanation: 'مع "Du" نستخدم "bist" وليس "ist"' },
  { pattern: /\bDu haben\b/g, correct: 'Du hast', explanation: 'مع "Du" نستخدم "hast" وليس "haben"' },
  { pattern: /\bDu bin\b/g, correct: 'Du bist', explanation: 'مع "Du" نستخدم "bist" وليس "bin"' },
  { pattern: /\b(Er|Sie|Es) bin\b/g, correct: '$1 ist', explanation: 'مع Er/Sie/Es نستخدم "ist" وليس "bin"' },
  { pattern: /\b(Er|Sie|Es) haben\b/g, correct: '$1 hat', explanation: 'مع Er/Sie/Es نستخدم "hat" وليس "haben"' },
  { pattern: /\bWir ist\b/g, correct: 'Wir sind', explanation: 'مع "Wir" نستخدم "sind" وليس "ist"' },
  { pattern: /\bWir habe\b/g, correct: 'Wir haben', explanation: 'مع "Wir" نستخدم "haben" وليس "habe"' },
  { pattern: /\bSie\s+ist\b/g, correct: 'Sie sind (للتعدد/التبجيل)', explanation: 'تحقق: "Sie ist" للمؤنث المفرد، "Sie sind" لضمير التبجيل أو الجمع' },

  // === MODAL VERBS ===
  { pattern: /\bmochte\b/g, correct: 'möchte', explanation: '"mochte" خطأ، الصحيح "möchte" (أريد)' },
  { pattern: /\bich mochte\b/g, correct: 'ich möchte', explanation: '"mochte" خطأ، الصحيح "möchte"' },
  { pattern: /\bmochten\b/g, correct: 'möchten', explanation: '"mochten" خطأ، الصحيح "möchten"' },
  { pattern: /\bkonnen\b/gi, correct: 'können', explanation: '"konnen" خطأ إملائي، الصحيح "können"' },
  { pattern: /\bwollen\b/g, correct: 'wollen ✓', explanation: '"wollen" صحيح ✓ (نريد)' },
  { pattern: /\bich habe gekonnt\b/g, correct: 'ich konnte', explanation: 'للأفعال الناقصة نستخدم Präteritum: "ich konnte" وليس "habe gekonnt"' },
  { pattern: /\bich habe gemusst\b/g, correct: 'ich musste', explanation: 'الصحيح: "ich musste" وليس "ich habe gemusst"' },
  { pattern: /\bich habe gewollt\b/g, correct: 'ich wollte', explanation: 'الصحيح: "ich wollte" وليس "ich habe gewollt"' },

  // === AGE MISTAKE ===
  { pattern: /\bIch habe\s+(\d+)\s+Jahre?\b/g, correct: 'Ich bin $1 Jahre alt', explanation: 'للعمر نستخدم "sein": "Ich bin ... Jahre alt" (وليس "haben")' },
  { pattern: /\b(Er|Sie) hat\s+(\d+)\s+Jahre?\b/g, correct: '$1 ist $2 Jahre alt', explanation: 'للعمر: "Er/Sie ist ... Jahre alt"' },

  // === MISSING UMLAUTS ===
  { pattern: /\buber\b/g, correct: 'über', explanation: '"uber" خطأ إملائي، الصحيح "über"' },
  { pattern: /\bUber\b/g, correct: 'Über', explanation: '"Uber" خطأ إملائي، الصحيح "Über"' },
  { pattern: /\bfur\b/g, correct: 'für', explanation: '"fur" خطأ إملائي، الصحيح "für"' },
  { pattern: /\bFur\b/g, correct: 'Für', explanation: '"Fur" خطأ إملائي، الصحيح "Für"' },
  { pattern: /\bgrosse\b/g, correct: 'große', explanation: '"grosse" خطأ إملائي، الصحيح "große"' },
  { pattern: /\bDanke schon\b/g, correct: 'Danke schön', explanation: 'الصحيح: "Danke schön" (شكراً) وليس "Danke schon" (شكراً بالفعل؟)' },
  { pattern: /\bschone\b/g, correct: 'schöne', explanation: '"schone" خطأ، الصحيح "schöne"' },
  { pattern: /\bJahre\b/g, correct: 'Jahre ✓', explanation: '"Jahre" جمع "Jahr" — صحيح ✓' },

  // === LETTER GREETINGS / CLOSING ===
  { pattern: /\bLiebe Damen\b/g, correct: 'Sehr geehrte Damen', explanation: 'في الرسائل الرسمية: "Sehr geehrte Damen und Herren"' },
  { pattern: /\bMit freundlich(e|en)?\s+Gru(ss|ß)(e)?\b/gi, correct: 'Mit freundlichen Grüßen', explanation: 'الختام الرسمي الصحيح: "Mit freundlichen Grüßen"' },
  { pattern: /\bFreundliche Gr(ü|u)(ß|ss)e\b/gi, correct: 'Mit freundlichen Grüßen', explanation: 'الختام الرسمي الصحيح: "Mit freundlichen Grüßen"' },
  { pattern: /\bFreundlich Grusse\b/gi, correct: 'Mit freundlichen Grüßen', explanation: 'الختام الصحيح: "Mit freundlichen Grüßen"' },
  { pattern: /\bViel Gruse\b/gi, correct: 'Viele Grüße', explanation: 'الختام غير الرسمي الصحيح: "Viele Grüße"' },

  // === DATIV AFTER PREPOSITIONS ===
  { pattern: /\bmit mein\b/g, correct: 'mit meinem/meiner', explanation: 'بعد "mit" نستخدم Dativ: "mit meinem" (مذكر/محايد) أو "mit meiner" (مؤنث)' },
  { pattern: /\bmit dein\b/g, correct: 'mit deinem/deiner', explanation: 'بعد "mit" نستخدم Dativ: "mit deinem/deiner"' },
  { pattern: /\bzu der\b/g, correct: 'zur', explanation: '"zu der" يُختصر إلى "zur"' },
  { pattern: /\bzu dem\b/g, correct: 'zum', explanation: '"zu dem" يُختصر إلى "zum"' },
  { pattern: /\bin dem\b/g, correct: 'im', explanation: '"in dem" يُختصر إلى "im"' },
  { pattern: /\ban dem\b/g, correct: 'am', explanation: '"an dem" يُختصر إلى "am"' },
  { pattern: /\bvon dem\b/g, correct: 'vom', explanation: '"von dem" يُختصر إلى "vom"' },

  // === WORD ORDER ===
  { pattern: /\bweil\s+(?:ich|er|sie|es|wir|ihr|Sie)\s+\w+\s+(bin|ist|sind|habe|hat|haben|war|wurde|kann|muss|will)\b/gi, correct: '', explanation: 'بعد "weil": الفعل يذهب لنهاية الجملة' },
  { pattern: /\bdass\s+(?:ich|er|sie|es|wir)\s+\w+\s+(bin|ist|habe|hat|kann|muss|will)\b/gi, correct: '', explanation: 'بعد "dass": الفعل يذهب لنهاية الجملة' },
  { pattern: /\bobwohl\s+(?:ich|er|sie|es|wir)\s+\w+\s+(bin|ist|habe|hat|kann|muss)\b/gi, correct: '', explanation: 'بعد "obwohl": الفعل يذهب لنهاية الجملة' },
  { pattern: /\bdeshalb\s+ich\b/g, correct: 'deshalb + Verb + Ich', explanation: 'بعد "deshalb" يأتي الفعل: "deshalb bin ich..."' },
  { pattern: /\baußerdem\s+ich\b/g, correct: 'außerdem + Verb + Ich', explanation: 'بعد "außerdem" يأتي الفعل: "außerdem habe ich..."' },
  { pattern: /\btrotzdem\s+ich\b/g, correct: 'trotzdem + Verb + Ich', explanation: 'بعد "trotzdem" يأتي الفعل: "trotzdem bin ich..."' },

  // === SEPARABLE VERBS ===
  { pattern: /\bIch anrufe\b/g, correct: 'Ich rufe ... an', explanation: '"anrufen" فعل منفصل: الجزء "an" يذهب لنهاية الجملة' },
  { pattern: /\bIch aufstehe\b/g, correct: 'Ich stehe ... auf', explanation: '"aufstehen" فعل منفصل: الجزء "auf" يذهب لنهاية الجملة' },
  { pattern: /\bIch einkaufe\b/g, correct: 'Ich kaufe ... ein', explanation: '"einkaufen" فعل منفصل: الجزء "ein" يذهب لنهاية الجملة' },
  { pattern: /\bIch mitnehme\b/g, correct: 'Ich nehme ... mit', explanation: '"mitnehmen" فعل منفصل: الجزء "mit" يذهب لنهاية الجملة' },

  // === ARTICLE GENDER ===
  { pattern: /\beine Problem\b/g, correct: 'ein Problem', explanation: '"Problem" محايد: "ein Problem" (وليس eine)' },
  { pattern: /\bdie Problem\b/g, correct: 'das Problem', explanation: '"Problem" محايد: "das Problem" (وليس die)' },
  { pattern: /\bdie Brief\b/g, correct: 'der Brief', explanation: '"Brief" مذكر: "der Brief"' },
  { pattern: /\bdie Termin\b/g, correct: 'der Termin', explanation: '"Termin" مذكر: "der Termin"' },
  { pattern: /\bdie Job\b/g, correct: 'der Job', explanation: '"Job" مذكر: "der Job"' },
  { pattern: /\bder Arbeit\b(?!\s+nachgehen)/g, correct: 'die Arbeit', explanation: '"Arbeit" مؤنث: "die Arbeit"' },
  { pattern: /\bder Email\b/gi, correct: 'die E-Mail', explanation: '"E-Mail" مؤنث: "die E-Mail"' },

  // === SPELLING ===
  { pattern: /\bwieviel\b/g, correct: 'wie viel', explanation: '"wieviel" يُكتب منفصلاً: "wie viel"' },
  { pattern: /\bviele\s+(\w+)s\b/g, correct: '', explanation: 'في الألمانية نادراً ما تُستخدم لاحقة "-s" للجمع' },
  { pattern: /\bmachen Urlaub\b/g, correct: 'Urlaub machen', explanation: 'الترتيب الصحيح: "Urlaub machen" وليس "machen Urlaub"' },
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
