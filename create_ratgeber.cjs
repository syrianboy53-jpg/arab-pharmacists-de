const fs = require('fs');
const path = require('path');

const dir = 'landing/ratgeber';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Common head block
const getHead = (title, desc) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>${title} | B1 Deutsch للسوريين</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${desc}" />
  <link rel="stylesheet" href="../modern-theme.css" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874998894873805" crossorigin="anonymous"></script>
</head>
<body class="bg-gray-50 text-gray-900 font-sans leading-relaxed">
  <header class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-syrian-green-dark">B1 Deutsch للسوريين</a>
      <nav class="space-x-4 space-x-reverse">
        <a href="/" class="text-gray-600 hover:text-syrian-green font-medium transition-colors">الرئيسية</a>
        <a href="/ratgeber/" class="text-syrian-green font-medium transition-colors">المدونة</a>
      </nav>
    </div>
  </header>
  <main class="max-w-4xl mx-auto px-6 py-12">
`;

const footer = `
  </main>
  <footer class="bg-white border-t border-gray-200 mt-12 py-8 text-center text-gray-500 text-sm">
    <p>© 2026 B1 Deutsch للسوريين. صنع في ألمانيا.</p>
    <div class="mt-4 space-x-4 space-x-reverse">
      <a href="/impressum/" class="hover:text-syrian-green">Impressum</a>
      <a href="/datenschutz/" class="hover:text-syrian-green">Datenschutz</a>
    </div>
  </footer>
</body>
</html>
`;

// 1. INDEX
const indexHtml = getHead('مدونة B1 Deutsch - نصائح لاجتياز امتحان DTZ', 'مقالات ونصائح حصرية لاجتياز امتحان اللغة الألمانية B1 للمهاجرين السوريين في ألمانيا.') + `
    <h1 class="text-4xl font-black text-gray-900 mb-4">مدونة B1 Deutsch</h1>
    <p class="text-xl text-gray-600 mb-12">دليلك الشامل لتعلم اللغة الألمانية واجتياز امتحان DTZ بنجاح.</p>
    
    <div class="space-y-8">
      <article class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h2 class="text-2xl font-bold mb-3"><a href="dtz-vorbereitung.html" class="text-syrian-green-dark hover:underline">دليلك الشامل لاجتياز امتحان B1 الألماني (DTZ) للمهاجرين</a></h2>
        <p class="text-gray-600 mb-4">تعرف على أقسام امتحان اللغة الألمانية للمهاجرين، وكيفية تقسيم الدرجات، وأهم الاستراتيجيات للنجاح في القسم التحريري والشفهي.</p>
        <a href="dtz-vorbereitung.html" class="text-syrian-green font-bold">اقرأ المقال كاملاً ←</a>
      </article>

      <article class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h2 class="text-2xl font-bold mb-3"><a href="dtz-sprechen.html" class="text-syrian-green-dark hover:underline">أهم 10 نصائح للنجاح في قسم المحادثة (Sprechen) في امتحان B1</a></h2>
        <p class="text-gray-600 mb-4">قسم المحادثة يثير توتر الكثيرين. في هذا المقال نكشف لك أسرار اجتياز هذا القسم بثقة، وكيفية وصف الصورة بشكل صحيح، والتخطيط المشترك.</p>
        <a href="dtz-sprechen.html" class="text-syrian-green font-bold">اقرأ المقال كاملاً ←</a>
      </article>

      <article class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h2 class="text-2xl font-bold mb-3"><a href="wortschatz.html" class="text-syrian-green-dark hover:underline">كيف تحفظ مفردات اللغة الألمانية بسهولة ولا تنساها أبداً؟</a></h2>
        <p class="text-gray-600 mb-4">بناء المخزون اللغوي هو أساس تعلم اللغة. نقدم لك استراتيجيات حديثة ومجربة لحفظ الكلمات الألمانية مع أدوات التعريف (Der, Die, Das) بسرعة وسهولة.</p>
        <a href="wortschatz.html" class="text-syrian-green font-bold">اقرأ المقال كاملاً ←</a>
      </article>
    </div>
` + footer;

// 2. ARTICLE 1: DTZ Vorbereitung
const art1 = getHead('دليلك الشامل لاجتياز امتحان B1 الألماني (DTZ)', 'مقالة مفصلة حول كيفية الاستعداد لامتحان DTZ للمهاجرين في ألمانيا وأقسام الامتحان.') + `
    <article class="prose lg:prose-xl prose-green mx-auto">
      <h1 class="text-3xl font-black mb-6">دليلك الشامل لاجتياز امتحان B1 الألماني (DTZ) للمهاجرين</h1>
      
      <p class="mb-4">إذا كنت تعيش في ألمانيا، فإن اجتياز <strong>امتحان اللغة الألمانية للمهاجرين (DTZ)</strong> يمثل نقطة تحول أساسية في حياتك هنا. الحصول على شهادة B1 ليس مجرد ورقة، بل هو المفتاح للحصول على الإقامة المفتوحة، التقديم على الجنسية الألمانية، وإيجاد فرص عمل أفضل.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">ما هو امتحان DTZ وكيف يتم تقييمه؟</h2>
      <p class="mb-4">امتحان DTZ مصمم خصيصاً للبالغين المهاجرين، وهو يقيس قدرتك على التعامل مع مواقف الحياة اليومية في ألمانيا. لا يعتمد الامتحان على حفظ القواعد المعقدة بقدر ما يعتمد على فهمك العام واستطاعتك على التواصل في الدوائر الحكومية، عند الطبيب، وفي مكان العمل.</p>
      <p class="mb-4">يُقسم الامتحان إلى قسمين رئيسيين:</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>القسم التحريري (Schriftlich):</strong> مدته 100 دقيقة، ويشمل القراءة (Lesen)، الاستماع (Hören)، والكتابة (Schreiben).</li>
        <li><strong>القسم الشفهي (Mündlich):</strong> مدته 15 دقيقة، ويشمل التعريف بالنفس، وصف الصورة، والتخطيط المشترك لموضوع ما.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">كيف يتم احتساب النتيجة النهائية؟</h2>
      <p class="mb-4">للنجاح بمستوى B1، هناك شرط ذهبي يجب أن تتذكره: <strong>يجب أن تحصل على مستوى B1 في قسم المحادثة الشفهية (Sprechen) كشرط أساسي</strong>. بالإضافة لذلك، يجب أن تحصل على مستوى B1 في أحد القسمين الآخرين إما (القراءة/الاستماع معاً) أو (الكتابة).</p>
      <p class="mb-4">إذا حصلت على A2 في المحادثة، فلا يمكنك الحصول على شهادة B1 أبداً، حتى لو حصلت على علامات كاملة في باقي الأقسام. لذلك، تدريب المحادثة هو الأهم!</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">خطوات عملية للتحضير قبل الامتحان</h2>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li><strong>حل نماذج الامتحانات السابقة:</strong> تعوّد على نمط الأسئلة. معرفة كيفية صياغة السؤال تختصر عليك نصف الوقت في الامتحان. استخدم تطبيقنا للتدرب على مئات الأسئلة.</li>
        <li><strong>تدرب على إدارة الوقت:</strong> في قسم القراءة، لا تضيع وقتك في فهم كل كلمة. ابحث عن الكلمات المفتاحية.</li>
        <li><strong>احفظ قوالب جاهزة لرسائل الكتابة:</strong> قسم الكتابة غالباً ما يطلب منك كتابة رسالة للمدرسة، لصاحب العمل، أو لإدارة السكن. احفظ مقدمات وخواتيم جاهزة (مثل: Sehr geehrte Damen und Herren).</li>
      </ol>

      <p class="mb-4">التحضير للامتحان يحتاج إلى استمرارية. خصص 30 دقيقة يومياً للدراسة الموجهة بدلاً من 3 ساعات مرة واحدة في الأسبوع. نتمنى لك التوفيق في امتحانك القادم!</p>
    </article>
` + footer;

// 3. ARTICLE 2: Sprechen
const art2 = getHead('أهم 10 نصائح للنجاح في قسم المحادثة في امتحان B1', 'كيف تتجاوز رهبة قسم المحادثة وتتحدث الألمانية بطلاقة في امتحان DTZ؟ اقرأ أهم النصائح العملية.') + `
    <article class="prose lg:prose-xl prose-green mx-auto">
      <h1 class="text-3xl font-black mb-6">أهم 10 نصائح للنجاح في قسم المحادثة (Sprechen) في امتحان B1</h1>
      
      <p class="mb-4">الكثير من المتقدمين لامتحان الـ DTZ يشعرون بالخوف والتوتر الشديد من قسم المحادثة (Mündliche Prüfung). لكن الحقيقة هي أن هذا القسم هو الأسهل للنجاح إذا كنت تعرف بالضبط ما يتوقعه الممتحن منك. إليك أهم 10 نصائح عملية لاجتياز هذا القسم بثقة تامة.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">الجزء الأول: التعريف بالنفس (Sich vorstellen)</h2>
      <p class="mb-4">هذا الجزء هو فرصتك الأولى لتكوين انطباع ممتاز. الممتحن لديه ورقة فيها نقاط محددة (الاسم، العمر، البلد، العائلة، المهنة، اللغات).</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>احفظ نصاً تعريفياً عن نفسك عن ظهر قلب:</strong> يجب أن تكون قادراً على قوله دون تردد.</li>
        <li><strong>استعد لأسئلة المتابعة:</strong> بعد أن تنهي تعريفك، سيسألك الممتحن سؤالاً، مثلاً: "لماذا تتعلم الألمانية؟" أو "ما هو الفرق بين بلدك وألمانيا في مجال عملك؟".</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">الجزء الثاني: وصف الصورة (Bildbeschreibung)</h2>
      <p class="mb-4">سيُطلب منك وصف صورة متعلقة بمواقف الحياة في ألمانيا (في عيادة الطبيب، في السوبرماركت، في مدرسة، أو عائلة). الهدف ليس ذكر كل تفصيل صغير، بل القدرة على صياغة جمل صحيحة.</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>استخدم العبارات الثابتة:</strong> ابدأ دائماً بـ "Auf dem Bild sehe ich..." أو "Im Vordergrund gibt es...".</li>
        <li><strong>لا تصمت أبداً:</strong> إذا لم تعرف اسم شيء ما في الصورة بالألمانية، اشرحه بطريقة أخرى، أو قل بوضوح "Ich kenne das Wort auf Deutsch nicht, aber man benutzt es für...".</li>
        <li><strong>اربط الصورة بحياتك الشخصية:</strong> بعد الوصف، سيسألك الممتحن عن رأيك. قل مثلاً: "في بلدي الأم، الأمر مختلف قليلاً..." فهذا يظهر قدرتك على التفكير والمقارنة باللغة الألمانية.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">الجزء الثالث: التخطيط المشترك (Gemeinsam etwas planen)</h2>
      <p class="mb-4">في هذا الجزء، ستتحدث مع شريكك في الامتحان لتنظيم شيء ما (حفلة، رحلة، زيارة مريض، أو شراء هدية).</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>لا تحتكر الحديث:</strong> هذا ليس مونولوج! يجب أن تطرح أسئلة على زميلك: "Was denkst du?" أو "Hast du eine andere Idee?".</li>
        <li><strong>احفظ عبارات الموافقة والرفض بأدب:</strong> مثل "Das ist eine gute Idee" أو "Ich finde das nicht so gut, vielleicht können wir stattdessen...".</li>
        <li><strong>قسّم المهام:</strong> لا تنسوا تقسيم من سيفعل ماذا. "Ich kaufe die Getränke, und du bringst das Essen mit."</li>
      </ul>

      <p class="mb-4 mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
        <strong>نصيحة ذهبية:</strong> الابتسامة والثقة بالنفس هما نصف النجاح. الممتحنون يعلمون أنك متوتر وهم هناك لمساعدتك وليس لتصيد أخطائك. تحدث بصوت واضح ولا تخف من الأخطاء القواعدية البسيطة.
      </p>
    </article>
` + footer;

// 4. ARTICLE 3: Wortschatz
const art3 = getHead('كيف تحفظ مفردات اللغة الألمانية بسهولة ولا تنساها أبداً؟', 'طرق علمية واستراتيجيات مجربة لحفظ الكلمات الألمانية وتذكر أدوات التعريف (Der, Die, Das) بسرعة.') + `
    <article class="prose lg:prose-xl prose-green mx-auto">
      <h1 class="text-3xl font-black mb-6">كيف تحفظ مفردات اللغة الألمانية بسهولة ولا تنساها أبداً؟</h1>
      
      <p class="mb-4">اللغة الألمانية لغة غنية بالمفردات، والتحدي الأكبر لأي متعلم هو كيفية حفظ هذه الكلمات والأهم من ذلك: كيفية تذكر أدوات التعريف الخاصة بها (der, die, das). في هذا المقال، سنستعرض استراتيجيات ذكية ستجعل حفظ الكلمات الألمانية أسهل بكثير.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">1. احفظ الكلمة في سياق كامل (Kontext)</h2>
      <p class="mb-4">الخطأ الأكبر الذي يقع فيه المبتدئون هو كتابة قائمة طويلة من الكلمات وحفظها كقائمة تسوق. دماغك لا يعمل بهذه الطريقة. بدلاً من حفظ كلمة "die Miete" (الإيجار) بمفردها، احفظ جملة كاملة: <strong>"Ich muss die Miete pünktlich bezahlen"</strong> (يجب أن أدفع الإيجار في الوقت المحدد). هذا يرسخ الكلمة وكيفية استخدامها وقواعدها في عقلك الباطن.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">2. طريقة الألوان لحفظ (Der, Die, Das)</h2>
      <p class="mb-4">الذاكرة البصرية قوية جداً. استخدم ثلاثة أقلام تلوين (Marker) عند دراسة الكلمات الجديدة:</p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong class="text-blue-600">اللون الأزرق</strong> للكلمات المذكرة (Der).</li>
        <li><strong class="text-red-600">اللون الأحمر</strong> للكلمات المؤنثة (Die).</li>
        <li><strong class="text-green-600">اللون الأخضر</strong> للكلمات المحايدة (Das).</li>
      </ul>
      <p class="mb-4">مع الوقت، عندما تحاول تذكر أداة تعريف كلمة ما، سيتذكر دماغك لون الكلمة في دفترك!</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">3. التكرار المتباعد (Spaced Repetition)</h2>
      <p class="mb-4">لا تراجع الكلمات التي درستها كل يوم. النظام العلمي الأفضل هو استخدام بطاقات الذاكرة (Flashcards) وتكرار الكلمة بعد يوم، ثم بعد 3 أيام، ثم أسبوع، ثم شهر. هذا ينقل الكلمات من الذاكرة قصيرة المدى إلى الذاكرة طويلة المدى. تطبيقنا يحتوي على ميزة البطاقات التعليمية مصممة خصيصاً لهذا الغرض.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-syrian-green-dark">4. ابحث عن الكلمات المركبة (Komposita)</h2>
      <p class="mb-4">اللغة الألمانية تعشق دمج الكلمات. إذا كنت تعرف كلمة "der Tisch" (الطاولة) وكلمة "das Holz" (الخشب)، فيمكنك استنتاج أن "der Holztisch" تعني الطاولة الخشبية. وتذكر القاعدة الذهبية: أداة التعريف للكلمة المركبة هي دائماً أداة التعريف للكلمة <strong>الأخيرة</strong> في المركب.</p>

      <p class="mb-4 mt-8 text-lg font-bold">الخلاصة: اجعل الكلمات جزءاً من حياتك اليومية. قم بتغيير لغة هاتفك المحمول إلى الألمانية، واقرأ مقالات قصيرة، وتحدث مع نفسك بصوت عالٍ. الاستمرارية هي سر إتقان اللغات!</p>
    </article>
` + footer;

fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
fs.writeFileSync(path.join(dir, 'dtz-vorbereitung.html'), art1);
fs.writeFileSync(path.join(dir, 'dtz-sprechen.html'), art2);
fs.writeFileSync(path.join(dir, 'wortschatz.html'), art3);

console.log('Created Ratgeber directory and 4 HTML files for AdSense SEO.');
