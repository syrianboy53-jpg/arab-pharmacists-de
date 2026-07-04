import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { vocabCategories } from '../data/vocabulary'

const categoryEmojis: Record<string, string> = {
  alltag: '☕',
  arbeit: '💼',
  wohnen: '🏢',
  gesundheit: '🏥',
  behoerden: '🏛️',
  schule: '🏫',
  verkehr: '🚗',
  einkaufen: '🛒',
  freizeit: '⚽',
  konnektoren: '🧩',
  meinung: '💬',
  koerper: '💪',
  geld: '💰',
  amt: '🏛️',
  shopping: '🛍️',
  gefuehle: '😊',
  haushalt: '🛋️',
  umwelt: '🌱',
  zeit: '📅',
  essen2: '🍲',
  arzt: '🩺',
  'auto-verkehr': '🚗',
  'bank-finanzen': '💳',
  'post-amt': '✉️',
  'medien-internet': '💻'
}

export default function VocabularyPage() {
  const [searchParams] = useSearchParams()
  const levelParam = searchParams.get('level')?.toLowerCase() || ''

  const [selectedCatId, setSelectedCatId] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMeaning, setShowMeaning] = useState<Record<string, boolean>>({})
  const [progressData, setProgressData] = useState<Record<string, number>>({})

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('b1-vocab-progress') || '{}')
      setProgressData(data)
    } catch (e) {}
  }, [])

  // Text-To-Speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  // Level filtered categories
  const levelCategories = useMemo(() => {
    if (!levelParam) return vocabCategories
    return vocabCategories.filter(c => 
      c.id.toLowerCase().startsWith(levelParam + '-') || 
      (c.titleDe && c.titleDe.toLowerCase().includes(levelParam)) ||
      (c.titleAr && c.titleAr.toLowerCase().includes(levelParam))
    )
  }, [levelParam])

  // Filtered categories and words based on selection & search query
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    
    // If no search query and a specific category is selected
    if (!q && selectedCatId !== 'all') {
      const cat = levelCategories.find(c => c.id === selectedCatId)
      return cat ? [cat] : []
    }

    // If search query is active
    return levelCategories.map(cat => {
      // If we are filtering by category and this isn't it, skip
      if (selectedCatId !== 'all' && cat.id !== selectedCatId) {
        return null
      }

      const matchingWords = cat.words.filter(w => 
        w.de.toLowerCase().includes(q) || 
        w.ar.toLowerCase().includes(q) || 
        ((w as any).example && (w as any).example.toLowerCase().includes(q))
      )

      if (matchingWords.length > 0) {
        return {
          ...cat,
          words: matchingWords
        }
      }
      return null
    }).filter(Boolean) as typeof vocabCategories
  }, [selectedCatId, searchQuery])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📚</span>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            المفردات الشاملة {levelParam && <span className="text-[#00b894] uppercase">- {levelParam}</span>}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تصفح وتعلم أهم الكلمات الألمانية</p>
        </div>
      </div>

      {/* Controls Container */}
      <div className="glass p-5 rounded-2xl border border-gray-200 dark:border-white/5 space-y-4 shadow-xl">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block">اختر القسم:</label>
            <select
              value={selectedCatId}
              onChange={(e) => {
                setSelectedCatId(e.target.value)
                setShowMeaning({})
              }}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white"
            >
              <option value="all">جميع الأقسام ({levelCategories.length})</option>
              {levelCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {categoryEmojis[cat.id] || '📁'} {cat.titleAr} - {cat.titleDe} ({cat.words?.length || 0} كلمة)
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block">بحث عن كلمة (بالألماني أو العربي):</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="مثال: Arzt, ينهض, Miete..."
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#00b894] text-gray-900 dark:text-white text-left"
                dir="ltr"
              />
              <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 text-xs">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Word Listings */}
      {filteredData.length === 0 ? (
        <div className="glass p-10 text-center rounded-2xl border border-gray-200 dark:border-white/5">
          <p className="text-gray-500 dark:text-gray-400 text-sm">لم يتم العثور على أي نتائج تطابق البحث.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredData.map(cat => (
            <div key={cat.id} className="space-y-4">
              {/* Category Subheader */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{categoryEmojis[cat.id] || '📚'}</span>
                  <div>
                    <h3 className="font-bold text-xl text-[#00b894]">{cat.titleAr}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold" dir="ltr">{cat.titleDe}</p>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2 py-0.5 rounded-full text-gray-500 dark:text-gray-400">
                    {cat.words.length} كلمة
                  </span>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {progressData[cat.id] ? (
                    <div className="flex items-center gap-2 text-green-500 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-xl">
                      <span>✅ مكتمل ({progressData[cat.id]}%)</span>
                    </div>
                  ) : null}
                  <Link 
                    to={`/vocabulary/lesson/${cat.id}`}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-[#0984e3] hover:bg-blue-600 text-white font-black rounded-xl text-center transition-all shadow-lg shadow-blue-500/20"
                  >
                    🚀 ابدأ الدرس التفاعلي
                  </Link>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid md:grid-cols-2 gap-3">
                {cat.words.map((w, idx) => {
                  const key = `${cat.id}-${idx}`
                  const hasExample = !!(w as any).example
                  
                  return (
                    <div
                      key={key}
                      className="glass p-4 rounded-xl border border-gray-200 dark:border-white/5 hover:border-[#00b894]/20 transition-all flex flex-col justify-between gap-3 shadow-md group"
                    >
                      <div className="flex items-start justify-between gap-2" dir="ltr">
                        <div className="text-left">
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-[#00b894] transition-colors text-base">
                            {w.de}
                          </h4>
                          {showMeaning[key] && hasExample && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 italic leading-relaxed">
                              {(w as any).example}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2 shrink-0">
                          {/* Audio play button */}
                          <button
                            onClick={() => speak(w.de)}
                            className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-[#00b894] hover:bg-[#00b894]/10 hover:border-[#00b894]/20 p-2 rounded-lg text-xs transition-all"
                            title="استمع للنطق"
                          >
                            🔊
                          </button>

                          {/* Reveal meaning button */}
                          <button
                            onClick={() => setShowMeaning(prev => ({ ...prev, [key]: !prev[key] }))}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              showMeaning[key] 
                                ? 'bg-[#00b894]/20 border-[#00b894]/30 text-[#00b894] font-medium' 
                                : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            {showMeaning[key] ? 'إخفاء' : 'معنى'}
                          </button>
                        </div>
                      </div>

                      {/* Display Arabic Translation if revealed */}
                      {showMeaning[key] && (
                        <div className="pt-2 border-t border-gray-200 dark:border-white/5 flex items-center justify-between text-right">
                          <p className="text-[#00b894] text-sm font-medium w-full">
                            {w.ar}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
