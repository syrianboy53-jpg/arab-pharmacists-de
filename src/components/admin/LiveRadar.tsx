import { motion } from 'framer-motion'

export default function LiveRadar({ activeCount = 0 }: { activeCount: number }) {
  // Generate random dots representing users
  const dots = Array.from({ length: Math.min(activeCount, 50) }).map((_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    delay: Math.random() * 2,
    size: Math.random() * 4 + 4,
  }))

  return (
    <div className="relative w-full h-64 rounded-3xl border border-[#00b894]/30 bg-[#050510] overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,184,148,0.1)]">
      
      {/* Radar Sweep Animation */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200%] h-[200%] rounded-full border-4 border-[#00b894]/20 opacity-50"
        style={{
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 184, 148, 0.4) 100%)',
          transformOrigin: 'center center'
        }}
      />

      {/* Grid Rings */}
      <div className="absolute w-32 h-32 rounded-full border border-[#00b894]/10"></div>
      <div className="absolute w-48 h-48 rounded-full border border-[#00b894]/10"></div>
      <div className="absolute w-64 h-64 rounded-full border border-[#00b894]/10"></div>

      {/* Center Pulse */}
      <div className="absolute w-4 h-4 bg-[#00b894] rounded-full shadow-[0_0_20px_#00b894]"></div>
      <div className="absolute w-4 h-4 bg-[#00b894] rounded-full animate-ping opacity-75"></div>

      {/* Active Users Dots */}
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: dot.delay }}
          className="absolute rounded-full bg-[#00b894] shadow-[0_0_10px_#00b894]"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size
          }}
        />
      ))}

      {/* Overlay Text */}
      <div className="absolute bottom-4 right-4 z-10 glass px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <span className="font-mono text-white text-sm font-bold">LIVE RADAR: {activeCount} USERS</span>
      </div>
    </div>
  )
}
