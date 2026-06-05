import { Env, query } from '../../utils'

function getBerlinISOString(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hour, minute] = timeStr.split(':').map(Number)

  // Guess UTC time
  const guessUTC = new Date(Date.UTC(year, month - 1, day, hour, minute, 0))

  // Find the Berlin local time representing this guess
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  const parts = formatter.formatToParts(guessUTC)
  const m: Record<string, number> = {}
  for (const p of parts) {
    if (p.type !== 'literal') {
      m[p.type] = Number(p.value)
    }
  }

  if (m.hour === 24) m.hour = 0

  const localDate = Date.UTC(m.year, m.month - 1, m.day, m.hour, m.minute, m.second)
  const offsetMs = guessUTC.getTime() - localDate

  return new Date(guessUTC.getTime() + offsetMs).toISOString()
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context
  const url = new URL(request.url)
  
  let days = 14
  const daysParam = url.searchParams.get('days')
  if (daysParam) {
    const parsedDays = parseInt(daysParam, 10)
    if (!isNaN(parsedDays) && parsedDays > 0) {
      days = Math.min(parsedDays, 30) // Cap to 30 days max
    }
  }

  try {
    // 1. Fetch weekly availability template slots
    const templatesRes = await query(env, `
      SELECT day_of_week, start_time, end_time, active 
      FROM lesson_availability
      WHERE active = true
    `)

    // 2. Fetch blackout dates
    const blackoutsRes = await query(env, `
      SELECT blocked_date 
      FROM lesson_blackouts
    `)
    const blackoutDates = new Set<string>()
    for (const row of blackoutsRes.rows || []) {
      if (row.blocked_date) {
        const d = new Date(row.blocked_date)
        const dateStr = d.toISOString().split('T')[0]
        blackoutDates.add(dateStr)
      }
    }

    // 3. Fetch active bookings in target window to filter out
    const bookingsRes = await query(env, `
      SELECT slot_start 
      FROM lesson_bookings
      WHERE status != 'cancelled'
    `)
    const bookedTimestamps = new Set<number>()
    for (const row of bookingsRes.rows || []) {
      if (row.slot_start) {
        bookedTimestamps.add(new Date(row.slot_start).getTime())
      }
    }

    // 4. Generate slots
    const timezone = 'Europe/Berlin'
    const slots: Array<{ iso_start: string; time_str: string }> = []
    const now = new Date()

    // Get today's local date string in Berlin
    const todayBerlinStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(now)

    const [year, month, day] = todayBerlinStr.split('-').map(Number)

    for (let i = 0; i < days; i++) {
      const d = new Date(Date.UTC(year, month - 1, day + i, 12, 0, 0))
      
      const dateStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(d)

      // Filter out dates that are in blackouts
      if (blackoutDates.has(dateStr)) {
        continue
      }

      // Find day of week in Berlin timezone
      const localDayStr = d.toLocaleString('en-US', { timeZone: timezone })
      const dayOfWeek = new Date(localDayStr).getDay()

      const templates = (templatesRes.rows || []).filter((t: any) => t.day_of_week === dayOfWeek)

      for (const temp of templates) {
        const isoStartStr = getBerlinISOString(dateStr, temp.start_time)
        const slotStart = new Date(isoStartStr)

        // Filter out past slots
        if (slotStart.getTime() < now.getTime()) {
          continue
        }

        // Filter out already booked slots
        if (bookedTimestamps.has(slotStart.getTime())) {
          continue
        }

        slots.push({
          iso_start: isoStartStr,
          time_str: `${temp.start_time} - ${temp.end_time}`
        })
      }
    }

    // Sort slots chronologically
    slots.sort((a, b) => new Date(a.iso_start).getTime() - new Date(b.iso_start).getTime())

    // Hardcode matching categories returned as part of response
    const topics = {
      speaking: 'المحادثة والتحضير الشفهي',
      writing: 'كتابة الرسائل والتحضير الكتابي',
      grammar: 'قواعد اللغة والتمارين',
      general: 'استشارة عامة ونقاش خطة الدراسة'
    }

    return new Response(JSON.stringify({ slots, topics }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
