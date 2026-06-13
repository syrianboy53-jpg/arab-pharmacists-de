const fs = require('fs');
const orig = fs.readFileSync('landing/index.html', 'utf8');

const faqHTML = `
<!-- SEO FAQ SECTION FOR ADSENSE APPROVAL -->
<section class="section">
  <h2 class="section-title">الأسئلة الشائعة حول امتحان B1 (FAQ)</h2>
  <p class="section-subtitle">
    هنا تجد الإجابات الشاملة والمفصلة لأهم الأسئلة التي يطرحها متعلمو اللغة الألمانية حول امتحان B1 والاندماج في ألمانيا.
  </p>
  
  <div class="features-grid" style="grid-template-columns: 1fr; max-width: 800px; margin: 0 auto; text-align: right;" dir="rtl">
    <div class="feature-card">
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 10px; color: #111827;">1. ما هو امتحان DTZ (Deutsch-Test für Zuwanderer)؟</h3>
      <p style="color: #4b5563; line-height: 1.6;">
        امتحان DTZ هو "اختبار اللغة الألمانية للمهاجرين". هذا الامتحان هو الخطوة الأهم للاندماج في ألمانيا، وهو مصمم خصيصاً ليقيس قدرتك على التعامل مع مواقف الحياة اليومية في ألمانيا مثل زيارة الطبيب، البحث عن عمل، التواصل مع المدارس أو الدوائر الحكومية. يتكون الامتحان من قسمين رئيسيين: القسم التحريري (القراءة، الاستماع، والكتابة) والقسم الشفهي (المحادثة). لاجتياز الامتحان والحصول على مستوى B1، يجب عليك تحقيق درجات كافية في قسم المحادثة بالإضافة إلى أحد القسمين الآخرين على الأقل.
      </p>
    </div>

    <div class="feature-card">
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 10px; color: #111827;">2. كيف أستعد لقسم المحادثة (Sprechen) في امتحان B1؟</h3>
      <p style="color: #4b5563; line-height: 1.6;">
        قسم المحادثة يعتبر من الأقسام التي تثير توتر الكثيرين، لكنه في الواقع يعتمد على التحضير الجيد للسيناريوهات المتكررة. يتكون القسم من ثلاثة أجزاء: التعريف بالنفس، وصف الصورة، والتخطيط المشترك. للنجاح، يجب عليك أولاً حفظ مقدمة قوية عن نفسك. في وصف الصورة، ركز على وصف ما تراه في الواجهة والخلفية باستخدام تعابير مثل "Im Vordergrund sehe ich". أخيراً، في قسم التخطيط المشترك، استمع لزميلك جيداً واستخدم جمل الموافقة أو الرفض بأدب.
      </p>
    </div>

    <div class="feature-card">
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 10px; color: #111827;">3. ما هي أهمية امتحان "الحياة في ألمانيا" (Leben in Deutschland)؟</h3>
      <p style="color: #4b5563; line-height: 1.6;">
        امتحان "الحياة في ألمانيا" هو جزء أساسي من دورة الاندماج، وهو شرط إلزامي للحصول على الإقامة الدائمة (Niederlassungserlaubnis) أو الجنسية الألمانية (Einbürgerung). يحتوي الامتحان على 33 سؤالاً يتم اختيارها من بنك أسئلة يضم 310 أسئلة تغطي مواضيع التاريخ الألماني، الديمقراطية، حقوق الإنسان، والنظام السياسي. للنجاح في الامتحان يكفي الإجابة بشكل صحيح على 15 سؤالاً، ولكن إذا كنت تطمح للتقدم بطلب للحصول على الجنسية الألمانية، فيجب عليك الإجابة بشكل صحيح على 17 سؤالاً.
      </p>
    </div>

    <div class="feature-card">
      <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 10px; color: #111827;">4. كيف يمكنني تحسين مخزوني من الكلمات الألمانية (Wortschatz)؟</h3>
      <p style="color: #4b5563; line-height: 1.6;">
        بناء مخزون لغوي قوي هو مفتاح النجاح في جميع أقسام الامتحان. أفضل طريقة لحفظ الكلمات هي حفظها في "سياق" (Kontext) وليس ككلمات مفردة. عندما تتعلم كلمة جديدة مثل "der Termin" (الموعد)، احفظ معها فعلاً مناسباً مثل "einen Termin vereinbaren" (يحدد موعداً). بالإضافة إلى ذلك، من الضروري جداً حفظ كل اسم ألماني مع أداة التعريف الخاصة به (der, die, das) وصيغة الجمع، لأن القواعد الألمانية تعتمد بشكل كامل على جنس الكلمة.
      </p>
    </div>
  </div>
</section>

<!-- ADSENSE BLOG PROMO SECTION -->
<section class="section" style="background-color: var(--syrian-green-soft);">
  <h2 class="section-title">هل تبحث عن المزيد من النصائح والشروحات؟</h2>
  <p class="section-subtitle">
    قمنا بإعداد سلسلة من المقالات التفصيلية التي ستأخذ بيدك خطوة بخطوة لاجتياز الامتحان وتطوير لغتك الألمانية.
  </p>
  <div style="text-align: center; margin-top: 30px;">
    <a href="/ratgeber/index.html" class="btn-primary" style="display: inline-block;">تصفح قسم النصائح والمقالات (المدونة)</a>
  </div>
</section>

`;

let result = orig;
if (result.includes('<!-- ===== FOOTER ===== -->')) {
  result = result.replace('<!-- ===== FOOTER ===== -->', faqHTML + '\n<!-- ===== FOOTER ===== -->');
}

const navLink = '<a href="/ratgeber/index.html">المدونة والنصائح</a>\n      <a href="/app/#/dtz">امتحان DTZ</a>';
result = result.replace('<a href="/app/#/dtz">امتحان DTZ</a>', navLink);

fs.writeFileSync('landing/index.html', result);
console.log('Successfully injected FAQ and Blog link into landing page.');
