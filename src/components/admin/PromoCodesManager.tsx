import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PromoCodesManager() {
  const [codes, setCodes] = useState([
    { id: 1, code: 'WELCOME50', discount: 50, usage: 12, max: 100, active: true },
    { id: 2, code: 'RAMADAN2026', discount: 30, usage: 450, max: 500, active: true },
    { id: 3, code: 'FLASH90', discount: 90, usage: 50, max: 50, active: false }
  ])

  const [newCode, setNewCode] = useState('')
  const [newDiscount, setNewDiscount] = useState('')
  const [newMax, setNewMax] = useState('')

  const handleAdd = () => {
    if (!newCode || !newDiscount) return
    setCodes([{ id: Date.now(), code: newCode.toUpperCase(), discount: Number(newDiscount), usage: 0, max: Number(newMax) || 1000, active: true }, ...codes])
    setNewCode('')
    setNewDiscount('')
    setNewMax('')
  }

  const toggleStatus = (id: number) => {
    setCodes(codes.map(c => c.id === id ? { ...c, active: !c.active } : c))
  }

  const deleteCode = (id: number) => {
    setCodes(codes.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-3xl border border-[#0984e3]/30 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0984e3] rounded-full blur-[80px] opacity-20"></div>
        
        <h3 className="text-xl font-black text-white mb-6 relative z-10 flex items-center gap-2">
          <span>🎟️</span> مدير أكواد الخصم
        </h3>
        
        <div className="flex flex-col md:flex-row gap-4 relative z-10">
          <input 
            type="text" 
            placeholder="الكود (مثال: FREE100)" 
            value={newCode}
            onChange={e => setNewCode(e.target.value)}
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0984e3] outline-none font-mono uppercase"
          />
          <input 
            type="number" 
            placeholder="الخصم %" 
            value={newDiscount}
            onChange={e => setNewDiscount(e.target.value)}
            className="w-full md:w-32 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0984e3] outline-none"
          />
          <input 
            type="number" 
            placeholder="الحد الأقصى للاستخدام" 
            value={newMax}
            onChange={e => setNewMax(e.target.value)}
            className="w-full md:w-48 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0984e3] outline-none"
          />
          <button 
            onClick={handleAdd}
            className="bg-[#0984e3] hover:bg-[#076bb8] text-white font-bold rounded-xl px-8 py-3 transition-colors shadow-[0_0_15px_rgba(9,132,227,0.4)]"
          >
            إضافة
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {codes.map(c => (
          <motion.div 
            key={c.id} 
            layout
            className={`glass p-5 rounded-2xl border ${c.active ? 'border-[#00b894]/30' : 'border-red-500/30 opacity-60'} flex flex-col justify-between h-40`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-mono text-2xl font-black text-white tracking-widest">{c.code}</h4>
                <p className="text-[#00b894] font-bold text-sm drop-shadow-[0_0_5px_rgba(0,184,148,0.5)]">خصم {c.discount}%</p>
              </div>
              <button onClick={() => deleteCode(c.id)} className="text-red-500 hover:text-red-400 p-2">🗑️</button>
            </div>
            
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1 font-bold">
                <span>الاستخدام: {c.usage} / {c.max}</span>
                <span className={c.active ? 'text-[#00b894]' : 'text-red-500'}>{c.active ? 'نشط' : 'متوقف'}</span>
              </div>
              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-[#0984e3] to-[#00b894]" style={{ width: `${(c.usage / c.max) * 100}%` }}></div>
              </div>
              
              <button 
                onClick={() => toggleStatus(c.id)}
                className={`w-full py-2 rounded-lg text-xs font-bold transition-colors ${c.active ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-[#00b894]/20 text-[#00b894] hover:bg-[#00b894]/30'}`}
              >
                {c.active ? 'إيقاف الكود' : 'تفعيل الكود'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
