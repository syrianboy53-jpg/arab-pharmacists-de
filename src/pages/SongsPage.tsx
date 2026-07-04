import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface WordTranslation { german: string; arabic: string; }
interface VerseLine { german: string; translation: WordTranslation[]; }
interface Verse { lines: VerseLine[]; }
interface VocabWord { german: string; arabic: string; example: string; }
interface QuizQuestion { question: string; options: string[]; correct: number; }
interface Song {
  id: number; title: string; artist: string; year: number;
  genre: string; genreEmoji: string; color: string; bgGradient: string;
  verses: Verse[]; vocabulary: VocabWord[]; quiz: QuizQuestion[]; xpReward: number;
}

const songs: Song[] = [
  {
    id: 1, title: "99 Luftballons", artist: "Nena", year: 1983,
    genre: "Pop", genreEmoji: "🎤", color: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-900/30 to-rose-900/20",
    verses: [
      { lines: [
        { german: "Hast du etwas Zeit für mich?", translation: [
          {german:"Hast",arabic:"هل لديك"},{german:"du",arabic:"أنت"},
          {german:"etwas Zeit",arabic:"بعض الوقت"},{german:"für mich",arabic:"لي"}] },
        { german: "Dann singe ich ein Lied für dich", translation: [
          {german:"Dann",arabic:"إذن"},{german:"singe ich",arabic:"أغني أنا"},
          {german:"ein Lied",arabic:"أغنية"},{german:"für dich",arabic:"لك"}] },
        { german: "99 Luftballons auf ihrem Weg zum Horizont", translation: [
          {german:"99 Luftballons",arabic:"تسعة وتسعون بالون"},
          {german:"auf ihrem Weg",arabic:"في طريقها"},
          {german:"zum Horizont",arabic:"إلى الأفق"}] },
      ]},
      { lines: [
        { german: "99 Düsenjäger, jeder war ein großer Krieger", translation: [
          {german:"99 Düsenjäger",arabic:"تسع وتسعون طائرة نفاثة"},
          {german:"jeder war",arabic:"كل واحد كان"},
          {german:"ein großer Krieger",arabic:"محارباً عظيماً"}] },
        { german: "Hielten sich für Captain Kirk", translation: [
          {german:"Hielten sich für",arabic:"اعتبروا أنفسهم كـ"},
          {german:"Captain Kirk",arabic:"القبطان كيرك"}] },
      ]},
    ],
    vocabulary: [
      {german:"der Luftballon",arabic:"البالون",example:"Der Luftballon fliegt hoch."},
      {german:"die Zeit",arabic:"الوقت",example:"Hast du Zeit für mich?"},
      {german:"das Lied",arabic:"الأغنية",example:"Ich singe ein Lied."},
      {german:"der Horizont",arabic:"الأفق",example:"Die Sonne geht am Horizont unter."},
      {german:"der Krieger",arabic:"المحارب",example:"Er ist ein tapferer Krieger."},
      {german:"der Weg",arabic:"الطريق",example:"Der Weg ist lang."},
    ],
    quiz: [
      {question:"ماذا تعني كلمة Luftballon؟",options:["طائرة","بالون هوائي","صاروخ","سفينة"],correct:1},
      {question:"ما معنى: هل لديك وقت لي؟",options:["أحبك","أين أنت؟","Hast du Zeit für mich?","متى تأتي؟"],correct:2},
      {question:"ما سنة صدور الأغنية؟",options:["1975","1983","1990","2001"],correct:1},
    ],
    xpReward: 50,
  },
  {
    id: 2, title: "Major Tom (Völlig losgelöst)", artist: "Peter Schilling", year: 1982,
    genre: "Pop", genreEmoji: "🚀", color: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-900/30 to-indigo-900/20",
    verses: [
      { lines: [
        { german: "Völlig losgelöst von der Erde", translation: [
          {german:"Völlig",arabic:"تماماً"},{german:"losgelöst",arabic:"منفصل"},
          {german:"von der Erde",arabic:"من الأرض"}] },
        { german: "Schwebt das Raumschiff völlig schwerelos", translation: [
          {german:"Schwebt",arabic:"يطفو"},{german:"das Raumschiff",arabic:"المركبة الفضائية"},
          {german:"schwerelos",arabic:"عديم الوزن"}] },
        { german: "Die Rakete brennt, wir heben ab", translation: [
          {german:"Die Rakete",arabic:"الصاروخ"},{german:"brennt",arabic:"يشتعل"},
          {german:"wir heben ab",arabic:"نحن نقلع"}] },
      ]},
      { lines: [
        { german: "Alles klar, Herr Kommandant", translation: [
          {german:"Alles klar",arabic:"كل شيء على ما يرام"},
          {german:"Herr Kommandant",arabic:"السيد القائد"}] },
      ]},
    ],
    vocabulary: [
      {german:"die Erde",arabic:"الأرض",example:"Die Erde ist rund."},
      {german:"das Raumschiff",arabic:"المركبة الفضائية",example:"Das Raumschiff fliegt zum Mond."},
      {german:"schwerelos",arabic:"عديم الوزن",example:"Im Weltall ist man schwerelos."},
      {german:"die Rakete",arabic:"الصاروخ",example:"Die Rakete startet um 10 Uhr."},
      {german:"der Kommandant",arabic:"القائد",example:"Der Kommandant gibt Befehle."},
      {german:"losgelöst",arabic:"منفصل",example:"Er ist losgelöst von der Realität."},
    ],
    quiz: [
      {question:"ماذا تعني völlig losgelöst؟",options:["سريع جداً","منفصل تماماً","مفقود","حزين"],correct:1},
      {question:"ما معنى Raumschiff؟",options:["سيارة","قطار","مركبة فضائية","طائرة"],correct:2},
      {question:"ما معنى schwerelos؟",options:["ثقيل جداً","بطيء","عديم الوزن","مظلم"],correct:2},
    ],
    xpReward: 50,
  },
  {
    id: 3, title: "Ein Hoch auf uns", artist: "Andreas Bourani", year: 2013,
    genre: "Pop", genreEmoji: "🥂", color: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-900/30 to-orange-900/20",
    verses: [
      { lines: [
        { german: "Auf diese eine Nacht, die alles verändern kann", translation: [
          {german:"Auf",arabic:"على / من أجل"},{german:"diese eine Nacht",arabic:"هذه الليلة الواحدة"},
          {german:"alles verändern kann",arabic:"يمكنها تغيير كل شيء"}] },
        { german: "Auf dieses eine Glück, das ich mit dir empfand", translation: [
          {german:"dieses eine Glück",arabic:"هذه السعادة الواحدة"},
          {german:"mit dir empfand",arabic:"التي شعرت بها معك"}] },
      ]},
      { lines: [
        { german: "Ein Hoch auf uns, auf diesen Moment", translation: [
          {german:"Ein Hoch auf uns",arabic:"نخب لنا"},
          {german:"auf diesen Moment",arabic:"على هذه اللحظة"}] },
        { german: "Auf das, was war und was noch kommt", translation: [
          {german:"was war",arabic:"ما كان"},{german:"was noch kommt",arabic:"وما سيأتي"}] },
      ]},
    ],
    vocabulary: [
      {german:"die Nacht",arabic:"الليل / الليلة",example:"Die Nacht ist schön und klar."},
      {german:"das Glück",arabic:"السعادة / الحظ",example:"Ich wünsche dir viel Glück!"},
      {german:"der Moment",arabic:"اللحظة",example:"Dieser Moment ist besonders."},
      {german:"verändern",arabic:"يغيّر",example:"Das hat mein Leben verändert."},
      {german:"empfinden",arabic:"يشعر بـ",example:"Ich empfinde Freude."},
      {german:"ein Hoch auf",arabic:"نخب لـ / تحية لـ",example:"Ein Hoch auf die Freundschaft!"},
    ],
    quiz: [
      {question:"ماذا يعني Ein Hoch auf uns؟",options:["نحن سعداء","في الأعلى","نخب لنا","لنذهب معاً"],correct:2},
      {question:"ما معنى Glück؟",options:["حب","سعادة / حظ","ليل","لحظة"],correct:1},
      {question:"ما معنى verändern؟",options:["يحب","يسافر","يغني","يغيّر"],correct:3},
    ],
    xpReward: 50,
  },
  {
    id: 4, title: "Atemlos durch die Nacht", artist: "Helene Fischer", year: 2013,
    genre: "Schlager", genreEmoji: "💃", color: "from-red-500 to-pink-600",
    bgGradient: "from-red-900/30 to-pink-900/20",
    verses: [
      { lines: [
        { german: "Atemlos durch die Nacht", translation: [
          {german:"Atemlos",arabic:"لاهث / بلا أنفاس"},
          {german:"durch die Nacht",arabic:"عبر الليل"}] },
        { german: "Spür was Liebe macht", translation: [
          {german:"Spür",arabic:"اشعر بـ"},{german:"was Liebe macht",arabic:"ما يفعله الحب"}] },
        { german: "Einfach raus und uns gehört die Welt", translation: [
          {german:"Einfach raus",arabic:"ببساطة للخارج"},
          {german:"uns gehört die Welt",arabic:"العالم ينتمي لنا"}] },
      ]},
      { lines: [
        { german: "Wir sind jung und die Nacht ist lang", translation: [
          {german:"Wir sind jung",arabic:"نحن شباب"},
          {german:"die Nacht ist lang",arabic:"الليل طويل"}] },
        { german: "Du hältst mich eng umfangen", translation: [
          {german:"Du hältst mich",arabic:"أنت تمسك بي"},
          {german:"eng umfangen",arabic:"بإحكام محتضناً"}] },
      ]},
    ],
    vocabulary: [
      {german:"atemlos",arabic:"لاهث / بلا أنفاس",example:"Er rennt atemlos durch die Stadt."},
      {german:"die Liebe",arabic:"الحب",example:"Liebe macht das Leben schöner."},
      {german:"die Welt",arabic:"العالم",example:"Die Welt ist groß und bunt."},
      {german:"jung",arabic:"شاب / صغير",example:"Sie ist noch sehr jung."},
      {german:"lang",arabic:"طويل",example:"Der Weg ist sehr lang."},
      {german:"gehören",arabic:"ينتمي إلى / يخص",example:"Das Buch gehört mir."},
    ],
    quiz: [
      {question:"ماذا تعني atemlos؟",options:["بطيء جداً","لاهث / بلا أنفاس","مستيقظ","نائم"],correct:1},
      {question:"ما معنى die Welt؟",options:["المدينة","البلد","العالم","البيت"],correct:2},
      {question:"ما الجنس الموسيقي لهذه الأغنية؟",options:["روك","جاز","شلاغر","بلوز"],correct:2},
    ],
    xpReward: 55,
  },
  {
    id: 5, title: "Durch den Monsun", artist: "Tokio Hotel", year: 2005,
    genre: "Rock", genreEmoji: "🎸", color: "from-cyan-500 to-teal-600",
    bgGradient: "from-cyan-900/30 to-teal-900/20",
    verses: [
      { lines: [
        { german: "Irgendwo hinter der Welt", translation: [
          {german:"Irgendwo",arabic:"في مكان ما"},
          {german:"hinter der Welt",arabic:"وراء العالم"}] },
        { german: "Werd ich auf dich warten", translation: [
          {german:"Werd ich",arabic:"سوف أنا"},
          {german:"auf dich warten",arabic:"أنتظرك"}] },
        { german: "Bis du durch den Monsun zu mir findest", translation: [
          {german:"Bis",arabic:"حتى"},{german:"durch den Monsun",arabic:"عبر الموسون"},
          {german:"zu mir findest",arabic:"تجدني"}] },
      ]},
      { lines: [
        { german: "Und die Zeit steht still für mich", translation: [
          {german:"die Zeit",arabic:"الزمن"},{german:"steht still",arabic:"يقف ساكناً"},
          {german:"für mich",arabic:"لأجلي"}] },
      ]},
    ],
    vocabulary: [
      {german:"irgendwo",arabic:"في مكان ما",example:"Irgendwo ist er gerade."},
      {german:"der Monsun",arabic:"الموسون / موسم الأمطار",example:"Der Monsun bringt viel Regen."},
      {german:"warten auf",arabic:"ينتظر",example:"Ich warte auf den Bus."},
      {german:"still",arabic:"ساكن / هادئ",example:"Es ist still in der Nacht."},
      {german:"die Zeit",arabic:"الوقت / الزمن",example:"Die Zeit vergeht schnell."},
      {german:"hinter",arabic:"خلف / وراء",example:"Das Haus steht hinter dem Baum."},
    ],
    quiz: [
      {question:"ما معنى irgendwo؟",options:["هنا","هناك","في مكان ما","في كل مكان"],correct:2},
      {question:"ما معنى warten auf؟",options:["يتذكر","ينتظر","يبحث","يحب"],correct:1},
      {question:"ما الفرقة التي أدّت هذه الأغنية؟",options:["Rammstein","Kraftwerk","Tokio Hotel","Die Ärzte"],correct:2},
    ],
    xpReward: 55,
  },
  {
    id: 6, title: "Ohne Dich", artist: "Rammstein", year: 2004,
    genre: "Rock", genreEmoji: "🔥", color: "from-orange-600 to-red-700",
    bgGradient: "from-orange-900/30 to-red-900/20",
    verses: [
      { lines: [
        { german: "Ich werde in die Tannen gehen", translation: [
          {german:"Ich werde",arabic:"سوف أنا"},
          {german:"in die Tannen gehen",arabic:"أذهب إلى أشجار التنوب"}] },
        { german: "Dorthin wo ich sie zuletzt gesehen", translation: [
          {german:"Dorthin",arabic:"إلى هناك"},{german:"wo",arabic:"حيث"},
          {german:"zuletzt gesehen",arabic:"آخر مرة رأيتها"}] },
        { german: "Ohne dich kann ich nicht sein", translation: [
          {german:"Ohne dich",arabic:"بدونك"},
          {german:"kann ich nicht sein",arabic:"لا أستطيع أن أكون"}] },
      ]},
      { lines: [
        { german: "Ohne dich, mit dir bin ich auch allein", translation: [
          {german:"Ohne dich",arabic:"بدونك"},{german:"mit dir",arabic:"معك"},
          {german:"bin ich auch allein",arabic:"أنا أيضاً وحيد"}] },
      ]},
    ],
    vocabulary: [
      {german:"ohne",arabic:"بدون",example:"Ohne Wasser kann man nicht leben."},
      {german:"die Tannen",arabic:"أشجار التنوب",example:"Die Tannen sind im Winter grün."},
      {german:"allein",arabic:"وحيد",example:"Er ist heute allein zu Hause."},
      {german:"zuletzt",arabic:"آخر مرة / أخيراً",example:"Ich habe ihn zuletzt gestern gesehen."},
      {german:"gehen",arabic:"يذهب",example:"Ich gehe zur Schule."},
      {german:"können",arabic:"يستطيع",example:"Ich kann Deutsch sprechen."},
    ],
    quiz: [
      {question:"ما معنى ohne dich؟",options:["معك","بدونك","من أجلك","إليك"],correct:1},
      {question:"ما معنى allein؟",options:["سعيد","وحيد","حزين","مسرور"],correct:1},
      {question:"ما معنى die Tannen؟",options:["البحيرات","الجبال","أشجار التنوب","الزهور"],correct:2},
    ],
    xpReward: 60,
  },
  {
    id: 7, title: "Perfect (Perfekt)", artist: "Ed Sheeran (auf Deutsch)", year: 2017,
    genre: "Ballade", genreEmoji: "💕", color: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-900/30 to-violet-900/20",
    verses: [
      { lines: [
        { german: "Ich habe eine Frau gefunden", translation: [
          {german:"Ich habe gefunden",arabic:"أنا وجدت"},
          {german:"eine Frau",arabic:"امرأة"}] },
        { german: "Die stark ist und mutig und wunderbar", translation: [
          {german:"Die",arabic:"التي"},{german:"stark ist",arabic:"قوية"},
          {german:"mutig",arabic:"شجاعة"},{german:"wunderbar",arabic:"رائعة"}] },
        { german: "Du bist perfekt für mich", translation: [
          {german:"Du bist",arabic:"أنت"},{german:"perfekt",arabic:"مثالي/ة"},
          {german:"für mich",arabic:"بالنسبة لي"}] },
      ]},
      { lines: [
        { german: "Ich finde Liebe genau am richtigen Ort", translation: [
          {german:"Ich finde",arabic:"أجد"},{german:"Liebe",arabic:"الحب"},
          {german:"genau",arabic:"تماماً"},{german:"am richtigen Ort",arabic:"في المكان الصحيح"}] },
      ]},
    ],
    vocabulary: [
      {german:"stark",arabic:"قوي / قوية",example:"Er ist sehr stark."},
      {german:"mutig",arabic:"شجاع / شجاعة",example:"Sie ist mutig und tapfer."},
      {german:"wunderbar",arabic:"رائع / رائعة",example:"Das Wetter ist heute wunderbar."},
      {german:"perfekt",arabic:"مثالي / مثالية",example:"Deine Arbeit ist perfekt."},
      {german:"finden",arabic:"يجد",example:"Ich kann meinen Schlüssel nicht finden."},
      {german:"der Ort",arabic:"المكان",example:"Das ist ein schöner Ort."},
    ],
    quiz: [
      {question:"ما معنى wunderbar؟",options:["سريع","رائع","جميل","كبير"],correct:1},
      {question:"ما معنى stark؟",options:["ضعيف","قوي","صغير","سعيد"],correct:1},
      {question:"ما معنى mutig؟",options:["خائف","كريم","شجاع","هادئ"],correct:2},
    ],
    xpReward: 50,
  },
  {
    id: 8, title: "Der Mond ist aufgegangen", artist: "تراث شعبي ألماني", year: 1779,
    genre: "Volkslied", genreEmoji: "🌙", color: "from-indigo-500 to-blue-700",
    bgGradient: "from-indigo-900/30 to-blue-900/20",
    verses: [
      { lines: [
        { german: "Der Mond ist aufgegangen", translation: [
          {german:"Der Mond",arabic:"القمر"},{german:"ist aufgegangen",arabic:"قد أشرق / طلع"}] },
        { german: "Die goldnen Sternlein prangen", translation: [
          {german:"Die goldnen",arabic:"الذهبية"},{german:"Sternlein",arabic:"النجوم الصغيرة"},
          {german:"prangen",arabic:"تلمع / تزهو"}] },
        { german: "Am Himmel hell und klar", translation: [
          {german:"Am Himmel",arabic:"في السماء"},{german:"hell",arabic:"مضيء"},
          {german:"klar",arabic:"صافٍ"}] },
      ]},
      { lines: [
        { german: "Der Wald steht schwarz und schweiget", translation: [
          {german:"Der Wald",arabic:"الغابة"},{german:"steht schwarz",arabic:"يقف أسود"},
          {german:"schweiget",arabic:"صامت"}] },
        { german: "Und aus den Wiesen steiget der weiße Nebel wunderbar", translation: [
          {german:"aus den Wiesen",arabic:"من المروج"},{german:"steiget",arabic:"يرتفع"},
          {german:"der weiße Nebel",arabic:"الضباب الأبيض"},{german:"wunderbar",arabic:"بشكل رائع"}] },
      ]},
    ],
    vocabulary: [
      {german:"der Mond",arabic:"القمر",example:"Der Mond scheint hell in der Nacht."},
      {german:"der Himmel",arabic:"السماء",example:"Der Himmel ist heute blau."},
      {german:"der Wald",arabic:"الغابة",example:"Im Wald leben viele Tiere."},
      {german:"der Nebel",arabic:"الضباب",example:"Im Winter gibt es oft Nebel."},
      {german:"klar",arabic:"صافٍ / واضح",example:"Das Wasser ist klar und sauber."},
      {german:"hell",arabic:"مضيء / ساطع",example:"Das Zimmer ist hell und freundlich."},
      {german:"schwarz",arabic:"أسود",example:"Ich trinke schwarzen Kaffee."},
    ],
    quiz: [
      {question:"ما معنى der Mond؟",options:["الشمس","النجوم","القمر","السماء"],correct:2},
      {question:"ما معنى der Wald؟",options:["البحر","الجبل","الصحراء","الغابة"],correct:3},
      {question:"ما معنى klar؟",options:["مظلم","صاخب","صافٍ / واضح","بارد"],correct:2},
    ],
    xpReward: 45,
  },
];

export default function SongsPage() {
  const [selectedSong, setSelectedSong] = useState<Song>(songs[0]);
  const [activeTab, setActiveTab] = useState<"lyrics"|"vocab"|"quiz">("lyrics");
  const [shownLines, setShownLines] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<(number|null)[]>([null,null,null]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [totalXP, setTotalXP] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("songs_xp") || "0"); } catch { return 0; }
  });
  const [completedSongs, setCompletedSongs] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("completed_songs") || "[]"); } catch { return []; }
  });
  const [showXPPopup, setShowXPPopup] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setShownLines(new Set());
    setQuizAnswers([null,null,null]);
    setQuizSubmitted(false);
    setActiveTab("lyrics");
  }, [selectedSong.id]);

  const toggleLine = (key: string) => {
    setShownLines(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const showAllTranslations = () => {
    const keys = new Set<string>();
    selectedSong.verses.forEach((v,vi) => v.lines.forEach((_,li) => keys.add(`${vi}-${li}`)));
    setShownLines(keys);
  };

  const submitQuiz = () => {
    if (quizAnswers.includes(null)) return;
    setQuizSubmitted(true);
    const correct = quizAnswers.filter((a,i) => a === selectedSong.quiz[i].correct).length;
    const xp = Math.round((correct / 3) * selectedSong.xpReward);
    if (!completedSongs.includes(selectedSong.id)) {
      const newXP = totalXP + xp;
      const newCompleted = [...completedSongs, selectedSong.id];
      setTotalXP(newXP);
      setCompletedSongs(newCompleted);
      try {
        localStorage.setItem("songs_xp", String(newXP));
        localStorage.setItem("completed_songs", JSON.stringify(newCompleted));
      } catch {}
      setEarnedXP(xp);
      setShowXPPopup(true);
      setTimeout(() => setShowXPPopup(false), 3000);
    }
  };

  const score = quizSubmitted
    ? quizAnswers.filter((a,i) => a === selectedSong.quiz[i].correct).length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-violet-950 text-white" dir="rtl">

      {showXPPopup && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-8 py-4 rounded-full shadow-2xl text-xl animate-bounce">
          🎉 +{earnedXP} XP كسبت!
        </div>
      )}

      <header className="sticky top-0 z-40 bg-purple-950/80 backdrop-blur-md border-b border-purple-800/40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-purple-300 hover:text-white transition text-sm">← الرئيسية</Link>
          <span className="text-purple-600">|</span>
          <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-pink-300">
            🎵 تعلم بالأغاني الألمانية
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 px-3 py-1 rounded-full text-sm font-bold">
            ⭐ {totalXP} XP
          </div>
          <div className="text-sm text-purple-300">✅ {completedSongs.length}/{songs.length}</div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-57px)]">
        <aside
          style={{width: sidebarOpen ? "17rem" : "3rem"}}
          className="transition-all duration-300 bg-purple-950/50 border-l border-purple-800/40 flex flex-col flex-shrink-0 overflow-hidden"
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 text-purple-300 hover:text-white border-b border-purple-800/40 text-center text-xs font-bold transition whitespace-nowrap"
          >
            {sidebarOpen ? "◀ إخفاء" : "▶"}
          </button>
          {sidebarOpen && (
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <p className="text-purple-400 text-xs font-bold px-2 py-2">🎵 قائمة الأغاني</p>
              {songs.map(song => (
                <button
                  key={song.id}
                  onClick={() => setSelectedSong(song)}
                  className={`w-full text-right p-3 rounded-xl border transition-all ${
                    selectedSong.id === song.id
                      ? "bg-purple-700/60 border-purple-500 text-white shadow-lg"
                      : "bg-purple-900/30 border-purple-800/30 text-purple-200 hover:bg-purple-800/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{song.genreEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs truncate">{song.title}</p>
                      <p className="text-xs text-purple-400 truncate">{song.artist}</p>
                    </div>
                    {completedSongs.includes(song.id) && <span className="text-green-400 text-xs flex-shrink-0">✅</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </aside>

        <main className="flex-1 p-4 md:p-6 space-y-5 overflow-hidden">
          <div className={`bg-gradient-to-r ${selectedSong.color} p-5 rounded-2xl shadow-2xl relative overflow-hidden`}>
            <div
              className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none"
              style={{fontSize:"10rem"}}
            >🎵</div>
            <div className="relative flex items-start justify-between">
              <div>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{selectedSong.genre}</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{selectedSong.year}</span>
                  <span className="bg-yellow-400/30 text-yellow-100 text-xs px-2 py-0.5 rounded-full font-bold">🏆 {selectedSong.xpReward} XP</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow">{selectedSong.title}</h2>
                <p className="text-white/80 mt-1 text-sm">{selectedSong.artist} {selectedSong.genreEmoji}</p>
              </div>
              <span className="text-5xl ml-4 flex-shrink-0">{selectedSong.genreEmoji}</span>
            </div>
          </div>

          <div className="flex gap-1 bg-purple-900/50 p-1 rounded-xl border border-purple-800/30">
            {(["lyrics","vocab","quiz"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab
                    ? `bg-gradient-to-r ${selectedSong.color} text-white shadow-lg`
                    : "text-purple-300 hover:text-white"
                }`}
              >
                {tab === "lyrics" ? "🎶 الكلمات" : tab === "vocab" ? "📚 المفردات" : "📝 الاختبار"}
              </button>
            ))}
          </div>

          {activeTab === "lyrics" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-purple-300 text-sm">💡 اضغط على أي سطر لترجمته كلمة بكلمة</p>
                <button
                  onClick={showAllTranslations}
                  className="text-xs bg-purple-700/50 hover:bg-purple-600/60 text-purple-200 px-3 py-1.5 rounded-full transition"
                >
                  👁 إظهار كل الترجمات
                </button>
              </div>
              {selectedSong.verses.map((verse, vi) => (
                <div key={vi} className={`bg-gradient-to-br ${selectedSong.bgGradient} border border-purple-700/30 rounded-2xl p-4 space-y-4`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${selectedSong.color} flex items-center justify-center text-xs font-black flex-shrink-0 text-white`}>{vi+1}</div>
                    <p className="text-purple-400 text-xs font-bold">المقطع {vi+1}</p>
                  </div>
                  {verse.lines.map((line, li) => {
                    const key = `${vi}-${li}`;
                    return (
                      <div key={li} className="border-b border-purple-800/20 pb-3 last:border-0 last:pb-0">
                        <button onClick={() => toggleLine(key)} className="w-full text-right group">
                          <p className="text-white text-lg font-semibold tracking-wide group-hover:text-purple-200 transition leading-relaxed">
                            {line.german}
                          </p>
                        </button>
                        {shownLines.has(key) && (
                          <div className="mt-2 flex flex-wrap gap-2 justify-end">
                            {line.translation.map((w, wi) => (
                              <div key={wi} className="bg-purple-800/70 border border-purple-600/30 rounded-lg px-2 py-1 text-center">
                                <p className="text-purple-100 text-xs font-bold">{w.german}</p>
                                <p className="text-yellow-300 text-xs">{w.arabic}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {activeTab === "vocab" && (
            <div className="space-y-4">
              <p className="text-purple-300 text-sm">📖 المفردات الرئيسية في هذه الأغنية</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedSong.vocabulary.map((word, i) => (
                  <div key={i} className={`bg-gradient-to-br ${selectedSong.bgGradient} border border-purple-700/30 rounded-xl p-4`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className={`bg-gradient-to-r ${selectedSong.color} text-white text-xs px-2 py-0.5 rounded-full font-bold`}>#{i+1}</span>
                      <div className="text-right">
                        <p className="text-white font-black text-xl">{word.german}</p>
                        <p className="text-yellow-300 font-bold text-sm">{word.arabic}</p>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2 mt-2">
                      <p className="text-purple-200 text-sm text-right italic">{word.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-purple-300 text-sm">🎯 اختر الإجابة الصحيحة</p>
                <span className="text-yellow-400 font-bold text-sm">🏆 حتى {selectedSong.xpReward} XP</span>
              </div>
              {selectedSong.quiz.map((q, qi) => (
                <div key={qi} className={`bg-gradient-to-br ${selectedSong.bgGradient} border border-purple-700/30 rounded-2xl p-5`}>
                  <p className="text-white font-bold mb-3 text-right">السؤال {qi+1}: {q.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      let cls = "border border-purple-700/40 text-purple-200 bg-purple-900/40 hover:bg-purple-700/40";
                      if (quizAnswers[qi] === oi) {
                        if (quizSubmitted) {
                          cls = oi === q.correct
                            ? "border-green-500 bg-green-900/60 text-green-200"
                            : "border-red-500 bg-red-900/60 text-red-200";
                        } else {
                          cls = "border-purple-400 bg-purple-700/60 text-white";
                        }
                      } else if (quizSubmitted && oi === q.correct) {
                        cls = "border-green-500 bg-green-900/60 text-green-200";
                      }
                      return (
                        <button
                          key={oi}
                          disabled={quizSubmitted}
                          onClick={() => {
                            if (!quizSubmitted) { const n=[...quizAnswers]; n[qi]=oi; setQuizAnswers(n); }
                          }}
                          className={`p-3 rounded-xl border text-right text-sm font-medium transition-all disabled:cursor-default ${cls}`}
                        >
                          {quizSubmitted && oi === q.correct && "✅ "}
                          {quizSubmitted && quizAnswers[qi] === oi && oi !== q.correct && "❌ "}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {!quizSubmitted ? (
                <button
                  onClick={submitQuiz}
                  disabled={quizAnswers.includes(null)}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${
                    quizAnswers.includes(null)
                      ? "bg-purple-900/40 text-purple-600 cursor-not-allowed"
                      : `bg-gradient-to-r ${selectedSong.color} text-white hover:scale-[1.02] shadow-xl`
                  }`}
                >
                  📝 تسليم الإجابات
                </button>
              ) : (
                <div className={`p-6 rounded-2xl text-center border ${
                  score===3 ? "bg-green-900/40 border-green-600"
                  : score>=2 ? "bg-blue-900/40 border-blue-600"
                  : "bg-orange-900/40 border-orange-600"
                }`}>
                  <div className="text-5xl mb-2">{score===3?"🏆":score>=2?"⭐":"💪"}</div>
                  <p className="text-white text-2xl font-black">{score}/3 إجابة صحيحة</p>
                  <p className="text-yellow-300 font-bold mt-1">
                    {completedSongs.includes(selectedSong.id)
                      ? "سبق أن أنجزت هذه الأغنية ✅"
                      : `+${Math.round((score/3)*selectedSong.xpReward)} XP`}
                  </p>
                  <button
                    onClick={() => { setQuizAnswers([null,null,null]); setQuizSubmitted(false); }}
                    className={`mt-4 px-6 py-2 rounded-full bg-gradient-to-r ${selectedSong.color} text-white font-bold text-sm hover:scale-105 transition`}
                  >
                    🔄 إعادة المحاولة
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
