import { motion } from 'framer-motion'

export default function PremiumStatCard({ title, value, icon, color = 'emerald' }: { title: string, value: string | number, icon: string, color?: string }) {
  
  const gradients: Record<string, string> = {
    emerald: 'from-[#00b894]/20 to-transparent border-[#00b894]/30',
    blue: 'from-[#0984e3]/20 to-transparent border-[#0984e3]/30',
    rose: 'from-[#e84393]/20 to-transparent border-[#e84393]/30',
    purple: 'from-[#6c5ce7]/20 to-transparent border-[#6c5ce7]/30',
    orange: 'from-[#e17055]/20 to-transparent border-[#e17055]/30'
  }

  const glows: Record<string, string> = {
    emerald: 'bg-[#00b894]',
    blue: 'bg-[#0984e3]',
    rose: 'bg-[#e84393]',
    purple: 'bg-[#6c5ce7]',
    orange: 'bg-[#e17055]'
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${gradients[color] || gradients.emerald} p-6 backdrop-blur-xl group cursor-pointer transition-all duration-300`}
    >
      {/* Background Glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 ${glows[color] || glows.emerald} rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity`}></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${glows[color] || glows.emerald} flex items-center justify-center text-2xl shadow-lg shadow-black/20`}>
          {icon}
        </div>
      </div>
      
      {/* Mini Chart Mockup (Visual only) */}
      <div className="mt-6 flex items-end gap-1 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`flex-1 rounded-t-sm ${glows[color] || glows.emerald}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
