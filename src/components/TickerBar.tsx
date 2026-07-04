import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, X } from 'lucide-react'

interface TickerConfig {
  announcement?: string
  announcement_color?: string
}

export default function TickerBar() {
  const [config, setConfig] = useState<TickerConfig | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Try to load from cache first for instant display
    try {
      const cached = localStorage.getItem('b1-ticker-config')
      if (cached) {
        const c = JSON.parse(cached)
        if (c.announcement?.trim()) setConfig(c)
      }
    } catch {}

    // Fetch fresh from server
    fetch('/config?t=' + Date.now())
      .then(r => r.json())
      .then((data: TickerConfig) => {
        if (data.announcement?.trim()) {
          setConfig(data)
          localStorage.setItem('b1-ticker-config', JSON.stringify({
            announcement: data.announcement,
            announcement_color: data.announcement_color
          }))
        } else {
          setConfig(null)
        }
      })
      .catch(() => {})
  }, [])

  if (!config?.announcement?.trim() || dismissed) return null

  const color = config.announcement_color || '#0984e3'

  // Determine text color based on background brightness
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  const textColor = brightness > 128 ? '#000000' : '#ffffff'

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Background shimmer */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          animation: 'shimmer 3s ease-in-out infinite'
        }}
      />

      <div className="relative flex items-center h-10">
        {/* Left Icon Badge */}
        <div
          className="flex items-center gap-1.5 px-3 h-full shrink-0 z-10"
          style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
        >
          <Megaphone size={14} style={{ color: textColor }} />
          <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: textColor }}>
            إعلان
          </span>
        </div>

        {/* Scrolling Text */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: Math.max(10, config.announcement.length * 0.15),
                ease: 'linear',
              },
            }}
            className="whitespace-nowrap text-sm font-bold px-4 inline-block"
            style={{ color: textColor }}
            dir="rtl"
          >
            {config.announcement}
            <span className="mx-16 opacity-40">◆</span>
            {config.announcement}
            <span className="mx-16 opacity-40">◆</span>
            {config.announcement}
          </motion.div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="flex items-center justify-center w-10 h-full shrink-0 hover:opacity-70 transition-opacity z-10"
          style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
          aria-label="إغلاق الإعلان"
        >
          <X size={14} style={{ color: textColor }} />
        </button>
      </div>
    </motion.div>
  )
}
