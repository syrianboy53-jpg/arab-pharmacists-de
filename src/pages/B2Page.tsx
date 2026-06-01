import { Link } from 'react-router-dom'

export default function B2Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🎓</span>
        <div>
          <h1 className="text-2xl font-bold">B2 المتقدّم</h1>
          <p className="text-muted text-sm">محتوى متقدّم لمن أنهى B1 ويريد الانتقال لـB2.</p>
        </div>
      </div>

      <div className="bg-gradient-to-bl from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Telc B2 Vorbereitung</h2>
        <p className="text-sm opacity-90">نماذج كاملة على نمط امتحان telc B2 — قراءة، استماع، كتابة، محادثة.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">📖 Lesen B2</h3>
          <p className="text-sm text-muted mb-3">نصوص أطول وأعقد — مقالات صحفية وعلمية.</p>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">قريباً</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">🎧 Hören B2</h3>
          <p className="text-sm text-muted mb-3">محادثات مطوّلة ومحاضرات ونقاشات.</p>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">قريباً</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">✍️ Schreiben B2</h3>
          <p className="text-sm text-muted mb-3">مقالات رأي، رسائل رسمية متقدّمة، تقارير.</p>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">قريباً</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">🗣️ Sprechen B2</h3>
          <p className="text-sm text-muted mb-3">عرض تقديمي، مناقشة، حلّ مشكلات.</p>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">قريباً</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-3">📐 Grammatik B2</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {['Konjunktiv II', 'Passiv', 'Relativsätze', 'Partizipien als Adjektive', 'Nominalisierung', 'Konnektoren (je...desto)'].map((topic, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">{topic}</div>
          ))}
        </div>
      </div>

      <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 text-center">
        <p className="text-sm">⭐ محتوى B2 متاح مبكراً لمشتركي Premium</p>
        <Link to="/premium" className="inline-block mt-3 bg-gold text-white px-6 py-2 rounded-full font-bold text-sm">اشترك الآن</Link>
      </div>
    </div>
  )
}
