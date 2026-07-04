import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
interface WordPair { german: string; arabic: string; category: string; }
interface Card { id: number; pairId: number; content: string; lang: "de"|"ar"; isFlipped: boolean; isMatched: boolean; }

// ─── All Word Pairs (40+) ─────────────────────────────────────────────────────
const ALL_PAIRS: WordPair[] = [
  // Daily Objects
  {german:"das Buch",arabic:"الكتاب",category:"أشياء"},
  {german:"der Tisch",arabic:"الطاولة",category:"أشياء"},
  {german:"das Fenster",arabic:"النافذة",category:"أشياء"},
  {german:"die Tür",arabic:"الباب",category:"أشياء"},
  {german:"das Handy",arabic:"الهاتف",category:"أشياء"},
  {german:"der Schlüssel",arabic:"المفتاح",category:"أشياء"},
  {german:"die Uhr",arabic:"الساعة",category:"أشياء"},
  {german:"der Stuhl",arabic:"الكرسي",category:"أشياء"},
  {german:"das Wasser",arabic:"الماء",category:"أشياء"},
  {german:"das Brot",arabic:"الخبز",category:"أشياء"},
  // Verbs
  {german:"essen",arabic:"يأكل",category:"أفعال"},
  {german:"trinken",arabic:"يشرب",category:"أفعال"},
  {german:"schlafen",arabic:"ينام",category:"أفعال"},
  {german:"laufen",arabic:"يجري",category:"أفعال"},
  {german:"lesen",arabic:"يقرأ",category:"أفعال"},
  {german:"schreiben",arabic:"يكتب",category:"أفعال"},
  {german:"sprechen",arabic:"يتكلم",category:"أفعال"},
  {german:"kaufen",arabic:"يشتري",category:"أفعال"},
  {german:"arbeiten",arabic:"يعمل",category:"أفعال"},
  {german:"lernen",arabic:"يتعلم",category:"أفعال"},
  // Adjectives
  {german:"groß",arabic:"كبير",category:"صفات"},
  {german:"klein",arabic:"صغير",category:"صفات"},
  {german:"schön",arabic:"جميل",category:"صفات"},
  {german:"schnell",arabic:"سريع",category:"صفات"},
  {german:"langsam",arabic:"بطيء",category:"صفات"},
  {german:"warm",arabic:"دافئ",category:"صفات"},
  {german:"kalt",arabic:"بارد",category:"صفات"},
  {german:"neu",arabic:"جديد",category:"صفات"},
  {german:"alt",arabic:"قديم / عجوز",category:"صفات"},
  {german:"billig",arabic:"رخيص",category:"صفات"},
  // Numbers / Time
  {german:"heute",arabic:"اليوم",category:"وقت"},
  {german:"morgen",arabic:"غداً",category:"وقت"},
  {german:"gestern",arabic:"أمس",category:"وقت"},
  {german:"die Woche",arabic:"الأسبوع",category:"وقت"},
  {german:"der Monat",arabic:"الشهر",category:"وقت"},
  {german:"das Jahr",arabic:"السنة",category:"وقت"},
  {german:"die Stunde",arabic:"الساعة (وقت)",category:"وقت"},
  {german:"die Minute",arabic:"الدقيقة",category:"وقت"},
  {german:"früh",arabic:"مبكراً",category:"وقت"},
  {german:"spät",arabic:"متأخراً",category:"وقت"},
  // Bonus pairs
  {german:"die Schule",arabic:"المدرسة",category:"أماكن"},
  {german:"das Krankenhaus",arabic:"المستشفى",category:"أماكن"},
  {german:"der Bahnhof",arabic:"محطة القطار",category:"أماكن"},
  {german:"die Stadt",arabic:"المدينة",category:"أماكن"},
  {german:"das Haus",arabic:"البيت / المنزل",category:"أماكن"},
];

// ─── Difficulty Config ─────────────────────────────────────────────────────────
const DIFFICULTIES = [
  {id:"easy",   label:"سهل",   labelDe:"Einfach",  pairs:8,  emoji:"😊", color:"from-green-500 to-emerald-600",  bg:"from-green-900/30 to-emerald-900/20", xpBase:100, timeLimit:120},
  {id:"medium", label:"متوسط", labelDe:"Mittel",   pairs:12, emoji:"🤔", color:"from-blue-500 to-indigo-600",   bg:"from-blue-900/30 to-indigo-900/20",  xpBase:200, timeLimit:180},
  {id:"hard",   label:"صعب",   labelDe:"Schwer",   pairs:16, emoji:"😤", color:"from-orange-500 to-red-600",    bg:"from-orange-900/30 to-red-900/20",   xpBase:350, timeLimit:240},
  {id:"expert", label:"خبير",  labelDe:"Experte",  pairs:20, emoji:"🔥", color:"from-purple-500 to-violet-700", bg:"from-purple-900/30 to-violet-900/20",xpBase:500, timeLimit:300},
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function buildCards(pairs: WordPair[]): Card[] {
  const cards: Card[] = [];
  pairs.forEach((pair,idx) => {
    cards.push({id:idx*2,   pairId:idx, content:pair.german, lang:"de", isFlipped:false, isMatched:false});
    cards.push({id:idx*2+1, pairId:idx, content:pair.arabic,  lang:"ar", isFlipped:false, isMatched:false});
  });
  return shuffle(cards);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds/60).toString().padStart(2,"0");
  const s = (seconds%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

// ─── Card styles ──────────────────────────────────────────────────────────────
const CARD_GRADIENTS = [
  "linear-gradient(135deg,#6d28d9,#7c3aed)",
  "linear-gradient(135deg,#1d4ed8,#2563eb)",
  "linear-gradient(135deg,#059669,#10b981)",
  "linear-gradient(135deg,#b45309,#d97706)",
  "linear-gradient(135deg,#be185d,#ec4899)",
  "linear-gradient(135deg,#0e7490,#06b6d4)",
  "linear-gradient(135deg,#7c3aed,#a855f7)",
  "linear-gradient(135deg,#dc2626,#ef4444)",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function MemoryGamePage() {
  const [gameState, setGameState] = useState<"start"|"playing"|"won">("start");
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [bestScores, setBestScores] = useState<Record<string,number>>(() => {
    try { return JSON.parse(localStorage.getItem("memory_best") || "{}"); } catch { return {}; }
  });
  const [wrongFlash, setWrongFlash] = useState<number[]>([]);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => setTimeElapsed(t => t+1), 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Start Game
  const startGame = useCallback((diff: typeof DIFFICULTIES[0]) => {
    setDifficulty(diff);
    const selected = shuffle(ALL_PAIRS).slice(0, diff.pairs);
    setCards(buildCards(selected));
    setFlipped([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeElapsed(0);
    setIsLocked(false);
    setEarnedXP(0);
    setWrongFlash([]);
    setGameState("playing");
  }, []);

  // Flip logic
  const handleCardClick = (cardId: number) => {
    if (isLocked || gameState !== "playing") return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flipped.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];

    setCards(prev => prev.map(c => c.id === cardId ? {...c, isFlipped:true} : c));

    if (newFlipped.length === 1) {
      setFlipped(newFlipped);
      return;
    }

    // Two cards flipped
    setFlipped([]);
    setMoves(m => m+1);
    setIsLocked(true);

    const [firstId, secondId] = [newFlipped[0], cardId];
    const firstCard = cards.find(c => c.id === firstId)!;
    const secondCard = cards.find(c => c.id === secondId)!;

    if (firstCard.pairId === secondCard.pairId) {
      // Match!
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === firstId || c.id === secondId ? {...c, isMatched:true} : c
        ));
        const newMatched = matchedPairs + 1;
        setMatchedPairs(newMatched);
        setIsLocked(false);

        if (newMatched === difficulty.pairs) {
          // Win!
          setTimeout(() => {
            const timeBonus = Math.max(0, difficulty.timeLimit - timeElapsed);
            const movesPenalty = Math.max(0, moves - difficulty.pairs);
            const xp = Math.round(difficulty.xpBase + timeBonus * 0.5 - movesPenalty * 2);
            const finalXP = Math.max(Math.round(difficulty.xpBase * 0.3), xp);
            setEarnedXP(finalXP);
            const key = difficulty.id;
            if (!bestScores[key] || finalXP > bestScores[key]) {
              const newBest = {...bestScores, [key]: finalXP};
              setBestScores(newBest);
              try { localStorage.setItem("memory_best", JSON.stringify(newBest)); } catch {}
            }
            setGameState("won");
          }, 500);
        }
      }, 400);
    } else {
      // No match
      setWrongFlash([firstId, secondId]);
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === firstId || c.id === secondId ? {...c, isFlipped:false} : c
        ));
        setWrongFlash([]);
        setIsLocked(false);
      }, 900);
    }
  };

  // Grid cols by difficulty pairs
  const gridCols = difficulty.pairs <= 8 ? 4 : difficulty.pairs <= 12 ? 4 : difficulty.pairs <= 16 ? 4 : 5;

  const progress = difficulty.pairs > 0 ? (matchedPairs / difficulty.pairs) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white" dir="rtl">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-gray-400 hover:text-white transition text-sm">← الرئيسية</Link>
          <span className="text-gray-600">|</span>
          <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300">
            🧠 لعبة الذاكرة البصرية
          </h1>
        </div>
        {gameState === "playing" && (
          <div className="flex items-center gap-3 text-sm">
            <span className="bg-blue-900/50 border border-blue-700/50 text-blue-300 px-2 py-1 rounded-lg font-mono">
              ⏱ {formatTime(timeElapsed)}
            </span>
            <span className="bg-purple-900/50 border border-purple-700/50 text-purple-300 px-2 py-1 rounded-lg">
              🎯 {moves} حركة
            </span>
            <span className="bg-green-900/50 border border-green-700/50 text-green-300 px-2 py-1 rounded-lg">
              ✅ {matchedPairs}/{difficulty.pairs}
            </span>
          </div>
        )}
      </header>

      {/* ── START SCREEN ── */}
      {gameState === "start" && (
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <div className="text-7xl mb-4">🧠</div>
            <h2 className="text-4xl font-black text-white mb-3">لعبة الذاكرة البصرية</h2>
            <p className="text-gray-400 text-lg">طابق الكلمات الألمانية مع ترجماتها العربية!</p>
          </div>

          {/* Best scores */}
          {Object.keys(bestScores).length > 0 && (
            <div className="mb-8 bg-yellow-900/20 border border-yellow-700/30 rounded-2xl p-4">
              <p className="text-yellow-400 font-bold text-sm mb-3 text-center">🏆 أفضل النتائج</p>
              <div className="grid grid-cols-4 gap-2">
                {DIFFICULTIES.map(d => (
                  <div key={d.id} className="text-center bg-black/20 rounded-xl p-2">
                    <p className="text-lg">{d.emoji}</p>
                    <p className="text-xs text-gray-400">{d.label}</p>
                    <p className="text-yellow-300 font-bold text-sm">{bestScores[d.id] ? `${bestScores[d.id]} XP` : "—"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff.id}
                onClick={() => startGame(diff)}
                className={`bg-gradient-to-r ${diff.color} p-6 rounded-2xl text-right hover:scale-[1.03] transition-all shadow-xl group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-bold">
                      {diff.pairs * 2} بطاقة
                    </div>
                    <span className="text-4xl">{diff.emoji}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{diff.label}</h3>
                  <p className="text-white/70 text-sm">{diff.labelDe}</p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <span className="bg-white/15 text-white/90 text-xs px-2 py-0.5 rounded-full">
                      {diff.pairs} زوج
                    </span>
                    <span className="bg-white/15 text-white/90 text-xs px-2 py-0.5 rounded-full">
                      ⏱ {formatTime(diff.timeLimit)}
                    </span>
                    <span className="bg-yellow-400/30 text-yellow-100 text-xs px-2 py-0.5 rounded-full font-bold">
                      🏆 حتى {diff.xpBase} XP
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-gray-900/60 border border-gray-700/30 rounded-2xl p-5">
            <p className="text-gray-300 font-bold mb-3">📖 كيفية اللعب:</p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2"><span className="text-purple-400 flex-shrink-0">١.</span> اضغط على أي بطاقة لقلبها وإظهار الكلمة</li>
              <li className="flex items-start gap-2"><span className="text-purple-400 flex-shrink-0">٢.</span> اضغط على بطاقة ثانية — إذا تطابقت الكلمتان (ألمانية + عربية) فهما زوج</li>
              <li className="flex items-start gap-2"><span className="text-purple-400 flex-shrink-0">٣.</span> أكمل كل الأزواج بأقل عدد من الحركات وأسرع وقت للحصول على أعلى XP</li>
              <li className="flex items-start gap-2"><span className="text-purple-400 flex-shrink-0">٤.</span> يتم حفظ أفضل نتائجك تلقائياً</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── PLAYING SCREEN ── */}
      {gameState === "playing" && (
        <div className="max-w-5xl mx-auto px-3 py-4">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>التقدم</span>
              <span>{matchedPairs}/{difficulty.pairs} زوج</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${difficulty.color} rounded-full transition-all duration-500`}
                style={{width:`${progress}%`}}
              />
            </div>
          </div>

          {/* Card grid */}
          <div
            className="grid gap-3"
            style={{gridTemplateColumns:`repeat(${gridCols}, 1fr)`}}
          >
            {cards.map((card, _idx) => {
              const isWrong = wrongFlash.includes(card.id);
              const gradientIdx = card.pairId % CARD_GRADIENTS.length;
              const gradient = CARD_GRADIENTS[gradientIdx];

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  style={{perspective:"600px", cursor: card.isMatched || card.isFlipped ? "default" : "pointer"}}
                  className={`aspect-square select-none ${card.isMatched ? "opacity-60" : ""}`}
                >
                  <div
                    style={{
                      position:"relative",
                      width:"100%",
                      height:"100%",
                      transformStyle:"preserve-3d",
                      transition:"transform 0.45s ease",
                      transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Back (face down) */}
                    <div
                      style={{
                        position:"absolute",
                        inset:0,
                        backfaceVisibility:"hidden",
                        WebkitBackfaceVisibility:"hidden",
                        background: isWrong
                          ? "linear-gradient(135deg,#7f1d1d,#dc2626)"
                          : "linear-gradient(135deg,#1e1b4b,#312e81)",
                        borderRadius:"0.75rem",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        border: isWrong ? "2px solid #ef4444" : "2px solid #4c1d95",
                        transition:"all 0.2s",
                      }}
                    >
                      <span style={{fontSize: difficulty.pairs >= 16 ? "1.5rem" : "2rem"}}>🧠</span>
                    </div>

                    {/* Front (face up) */}
                    <div
                      style={{
                        position:"absolute",
                        inset:0,
                        backfaceVisibility:"hidden",
                        WebkitBackfaceVisibility:"hidden",
                        transform:"rotateY(180deg)",
                        background: card.isMatched ? "linear-gradient(135deg,#064e3b,#065f46)" : gradient,
                        borderRadius:"0.75rem",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"0.5rem",
                        border: card.isMatched ? "2px solid #10b981" : "2px solid rgba(255,255,255,0.15)",
                        boxShadow: card.isMatched ? "0 0 15px rgba(16,185,129,0.4)" : "none",
                        textAlign:"center",
                      }}
                    >
                      {card.isMatched && (
                        <span style={{position:"absolute",top:"4px",right:"4px",fontSize:"0.7rem"}}>✅</span>
                      )}
                      <span style={{
                        fontSize: difficulty.pairs >= 20 ? "0.55rem" : difficulty.pairs >= 16 ? "0.6rem" : difficulty.pairs >= 12 ? "0.7rem" : "0.8rem",
                        fontWeight:"bold",
                        color:"white",
                        lineHeight:1.2,
                        wordBreak:"break-word",
                        direction: card.lang === "ar" ? "rtl" : "ltr",
                      }}>
                        {card.content}
                      </span>
                      <span style={{
                        fontSize:"0.55rem",
                        color:"rgba(255,255,255,0.5)",
                        marginTop:"2px",
                        fontWeight:"bold",
                      }}>
                        {card.lang === "de" ? "🇩🇪 DE" : "🇸🇦 AR"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-5 justify-center">
            <button
              onClick={() => startGame(difficulty)}
              className={`px-5 py-2 rounded-xl bg-gradient-to-r ${difficulty.color} text-white font-bold text-sm hover:scale-105 transition shadow-lg`}
            >
              🔄 إعادة اللعب
            </button>
            <button
              onClick={() => setGameState("start")}
              className="px-5 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:text-white font-bold text-sm hover:scale-105 transition"
            >
              🏠 القائمة الرئيسية
            </button>
          </div>
        </div>
      )}

      {/* ── WIN SCREEN ── */}
      {gameState === "won" && (
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/30 border border-yellow-600/40 rounded-3xl p-8 shadow-2xl">
            <div className="text-8xl mb-4 animate-bounce">🏆</div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mb-2">
              أحسنت! فزت!
            </h2>
            <p className="text-gray-300 mb-6">لقد أكملت لعبة {difficulty.label}!</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-black/30 rounded-2xl p-4">
                <div className="text-3xl mb-1">⏱</div>
                <p className="text-white font-black text-xl">{formatTime(timeElapsed)}</p>
                <p className="text-gray-400 text-xs">الوقت المستغرق</p>
              </div>
              <div className="bg-black/30 rounded-2xl p-4">
                <div className="text-3xl mb-1">🎯</div>
                <p className="text-white font-black text-xl">{moves}</p>
                <p className="text-gray-400 text-xs">عدد الحركات</p>
              </div>
              <div className="bg-black/30 rounded-2xl p-4">
                <div className="text-3xl mb-1">✅</div>
                <p className="text-white font-black text-xl">{difficulty.pairs}/{difficulty.pairs}</p>
                <p className="text-gray-400 text-xs">الأزواج</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-2xl p-5 mb-6">
              <p className="text-yellow-300 text-sm mb-1">النقاط المكتسبة</p>
              <p className="text-yellow-300 font-black text-5xl">+{earnedXP}</p>
              <p className="text-yellow-400 font-bold">XP ⭐</p>
              {bestScores[difficulty.id] === earnedXP && (
                <div className="mt-2 bg-yellow-500/20 rounded-lg px-3 py-1 inline-block">
                  <p className="text-yellow-200 text-sm font-bold">🌟 أفضل نتيجة جديدة!</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => startGame(difficulty)}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${difficulty.color} text-white font-bold hover:scale-105 transition shadow-xl`}
              >
                🔄 العب مرة أخرى
              </button>
              <button
                onClick={() => {
                  const nextIdx = DIFFICULTIES.findIndex(d => d.id === difficulty.id) + 1;
                  if (nextIdx < DIFFICULTIES.length) startGame(DIFFICULTIES[nextIdx]);
                  else setGameState("start");
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold hover:scale-105 transition shadow-xl"
              >
                {DIFFICULTIES.findIndex(d=>d.id===difficulty.id) < DIFFICULTIES.length-1 ? "⬆️ مستوى أصعب" : "🏠 القائمة"}
              </button>
              <button
                onClick={() => setGameState("start")}
                className="px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:text-white font-bold hover:scale-105 transition"
              >
                🏠 القائمة الرئيسية
              </button>
            </div>
          </div>

          {/* All best scores */}
          <div className="mt-6 bg-gray-900/60 border border-gray-800/40 rounded-2xl p-4">
            <p className="text-gray-400 font-bold mb-3 text-sm">🏆 أفضل نتائجك</p>
            <div className="grid grid-cols-4 gap-2">
              {DIFFICULTIES.map(d => (
                <div key={d.id} className={`text-center rounded-xl p-3 ${d.id === difficulty.id ? `bg-gradient-to-br ${d.bg} border border-gray-700/40` : "bg-black/20"}`}>
                  <p className="text-xl">{d.emoji}</p>
                  <p className="text-xs text-gray-400">{d.label}</p>
                  <p className="text-yellow-300 font-black text-sm">{bestScores[d.id] ? `${bestScores[d.id]}` : "—"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
