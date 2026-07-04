// v52 Mock Exams - 6 full B1 simulation exams
final List<Map<String, dynamic>> mockExams = [{'id': 'mock-1', 'number': 1, 'titleAr': 'النموذج 1 — الحياة اليوميّة والعائلة', 'titleDe': 'Modell 1 — Alltag & Familie', 'theme': 'Alltag, Familie, Wohnen', 'themeIcon': '🏠', 'difficulty': 2, 'durationMin': 145, 'premium': false, 'lesenId': 'lesen-1', 'hoerenId': 'hoeren-1', 'bausteineId': 'sb-1', 'schreibenId': 'schreiben-1', 'sprechenLabel': 'Teil 1: شيء نخطّط له معاً', 'descriptionAr': 'نموذج تمهيدي مناسب للبدء — مواضيع يوميّة (السكن، العائلة، الحياة في الحيّ).', 'highlights': ['Lesen 5 أجزاء — إعلانات + مقالات قصيرة', 'Hören 4 أجزاء — حوارات في الأماكن العامّة', 'Sprachbausteine جزءان — رسالة بريديّة', 'Schreiben رسالة إلى صديق', 'Sprechen التخطيط لمناسبة عائليّة'], 'parts': {'lesen': 45, 'hoeren': 30, 'bausteine': 15, 'schreiben': 30, 'sprechen': 25}}, {'id': 'mock-2', 'number': 2, 'titleAr': 'النموذج 2 — العمل والوظيفة', 'titleDe': 'Modell 2 — Arbeit & Beruf', 'theme': 'Beruf, Bewerbung, Arbeitsplatz', 'themeIcon': '💼', 'difficulty': 3, 'durationMin': 145, 'premium': false, 'lesenId': 'lesen-2', 'hoerenId': 'hoeren-2', 'bausteineId': 'sb-2', 'schreibenId': 'schreiben-2', 'sprechenLabel': 'Teil 1: التخطيط لرحلة عمل / دورة', 'descriptionAr': 'يركّز على بيئة العمل (التقدّم لوظيفة، اجتماعات، تقارير، طلبات تدريب).', 'highlights': ['Lesen إعلانات وظائف ومقابلات قصيرة', 'Hören إعلانات في المكتب + حوار مع رئيس العمل', 'Sprachbausteine رسالة رسميّة', 'Schreiben رسالة شكوى أو طلب رسمي', 'Sprechen التخطيط لاجتماع/دورة'], 'parts': {'lesen': 45, 'hoeren': 30, 'bausteine': 15, 'schreiben': 30, 'sprechen': 25}}, {'id': 'mock-3', 'number': 3, 'titleAr': 'النموذج 3 — السفر والمواصلات', 'titleDe': 'Modell 3 — Reisen & Verkehr', 'theme': 'Reisen, Tourismus, Bahn', 'themeIcon': '✈️', 'difficulty': 3, 'durationMin': 145, 'premium': true, 'lesenId': 'lesen-3', 'hoerenId': 'hoeren-3', 'bausteineId': 'sb-3', 'schreibenId': 'schreiben-3', 'sprechenLabel': 'Teil 2: Vortrag — رحلتي المفضّلة', 'descriptionAr': 'مواضيع السفر، رحلات قطارات، فنادق، تجارب سياحيّة، مشاكل في المطار.', 'highlights': ['Lesen عروض رحلات + مقال عن السياحة المستدامة', 'Hören إعلانات في المحطّة + مقابلة عن العمل', 'Sprachbausteine رسالة احتجاج', 'Schreiben بريد إلكتروني لشركة سياحة', 'Sprechen عرض شخصي عن وجهة سياحيّة'], 'parts': {'lesen': 45, 'hoeren': 30, 'bausteine': 15, 'schreiben': 30, 'sprechen': 25}}, {'id': 'mock-4', 'number': 4, 'titleAr': 'النموذج 4 — الصحّة والرياضة', 'titleDe': 'Modell 4 — Gesundheit & Sport', 'theme': 'Gesundheit, Sport, Ernährung', 'themeIcon': '❤️', 'difficulty': 4, 'durationMin': 145, 'premium': true, 'lesenId': 'lesen-4', 'hoerenId': 'hoeren-4', 'bausteineId': 'sb-4', 'schreibenId': 'schreiben-4', 'sprechenLabel': 'Teil 3: مناقشة — الرياضة في المدارس', 'descriptionAr': 'مواضيع الصحّة، الغذاء الصحي، اللياقة البدنيّة، الزيارات الطبّيّة، نصائح مكافحة التوتّر.', 'highlights': ['Lesen مقالات صحّة + إعلانات نوادٍ', 'Hören نصائح طبيب + حوار عن الإجهاد', 'Sprachbausteine بريد لطبيب', 'Schreiben نصائح لصديق متعب', 'Sprechen مناقشة الرياضة في المدارس'], 'parts': {'lesen': 45, 'hoeren': 30, 'bausteine': 15, 'schreiben': 30, 'sprechen': 25}}, {'id': 'mock-5', 'number': 5, 'titleAr': 'النموذج 5 — البيئة والتكنولوجيا', 'titleDe': 'Modell 5 — Umwelt & Technik', 'theme': 'Umwelt, Klima, Digitalisierung', 'themeIcon': '🌱', 'difficulty': 5, 'durationMin': 145, 'premium': true, 'lesenId': 'lesen-5', 'hoerenId': 'hoeren-5', 'bausteineId': 'sb-5', 'schreibenId': 'schreiben-5', 'sprechenLabel': 'Teil 3: مناقشة — الذكاء الاصطناعي والوظائف', 'descriptionAr': 'النموذج الأكثر تحدّياً — مواضيع البيئة وتغيّر المناخ والذكاء الاصطناعي والإدمان الرقمي.', 'highlights': ['Lesen مقال علمي عن الاحتباس الحراري', 'Hören نشرة أخبار + حوار مع خبير', 'Sprachbausteine مقال رأي', 'Schreiben Leserbrief عن تقنيّة جديدة', 'Sprechen مناقشة AI ومستقبل الوظائف'], 'parts': {'lesen': 45, 'hoeren': 30, 'bausteine': 15, 'schreiben': 30, 'sprechen': 25}}, {'id': 'mock-6', 'number': 6, 'titleAr': 'النموذج 6 - نموذج معهد جوته التفاعلي (Goethe B1)', 'titleDe': 'Modell 6 - Goethe-Zertifikat B1 (Interaktiv)', 'theme': 'Prüfungssimulation (Goethe)', 'themeIcon': '🌟', 'difficulty': 4, 'durationMin': 165, 'premium': false, 'lesenId': 'lesen-6', 'hoerenId': 'hoeren-6', 'bausteineId': 'sb-6', 'schreibenId': 'schreiben-1', 'sprechenLabel': 'Teil 2: Präsentation', 'descriptionAr': 'نموذج امتحاني تفاعلي كامل صُمم خصيصاً ليحاكي امتحان معهد جوته B1 مع شروحات ذكية ومفردات إضافية تظهر عند الحل لتتعلم من أخطائك فوراً.', 'highlights': ['Lesen 5 أجزاء - نصوص طويلة مع شروحات ذكية', 'Hören 4 أجزاء - استماع مع نصوص وشروحات تفاعلية', 'Sprachbausteine غير مطلوب (لكن تمت إضافته كتدريب إضافي)', 'Schreiben كتابة رسائل', 'Sprechen تخطيط موضوع'], 'parts': {'lesen': 65, 'hoeren': 40, 'bausteine': 15, 'schreiben': 60, 'sprechen': 15}},
  {
    'id': 'mock-7',
    'number': 7,
    'titleAr': 'النموذج 7 - البيئة والمستقبل (تفاعلي)',
    'titleDe': 'Modell 7 - Umwelt & Zukunft',
    'theme': 'Umwelt, Technologie',
    'themeIcon': '🌍',
    'difficulty': 4,
    'durationMin': 165,
    'premium': false,
    'lesenId': 'lesen-7',
    'hoerenId': 'hoeren-1',
    'bausteineId': 'sb-1',
    'schreibenId': 'schreiben-1',
    'sprechenLabel': 'Teil 2: Präsentation',
    'descriptionAr': 'نموذج جديد تفاعلي يركز على مواضيع البيئة، التكنولوجيا، وحياة المستقبل مع شروحات ذكية جداً.',
    'highlights': ['Lesen مع شروحات ذكية للإجابات الخاطئة', 'مفردات B1 متقدمة'],
    'parts': {'lesen': 45, 'hoeren': 30, 'bausteine': 15, 'schreiben': 30, 'sprechen': 15}
  },
  {
    'id': 'mock-8',
    'number': 8,
    'titleAr': 'النموذج 8 - السكن والتسوق (تفاعلي)',
    'titleDe': 'Modell 8 - Wohnen & Leben',
    'theme': 'Wohnen, Nachbarn, Einkaufen',
    'themeIcon': '🛒',
    'difficulty': 3,
    'durationMin': 165,
    'premium': false,
    'lesenId': 'lesen-8',
    'hoerenId': 'hoeren-2',
    'bausteineId': 'sb-2',
    'schreibenId': 'schreiben-2',
    'sprechenLabel': 'Teil 2: Präsentation',
    'descriptionAr': 'نموذج مخصص للتدريب على الإعلانات، السكن، التسوق والتعامل مع الجيران.',
    'highlights': ['تدريب مكثف على قسم القراءة الجزء الأول والثاني', 'شروحات ذكية تفاعلية باللغة العربية'],
    'parts': {'lesen': 45, 'hoeren': 30, 'bausteine': 15, 'schreiben': 30, 'sprechen': 15}
  }
,
  {"id": "mock-9", "number": 9, "titleAr": "النموذج 9 - عالم العمل والاندماج", "titleDe": "Modell 9 - Arbeitswelt & Integration", "theme": "Beruf, Arbeitsplatz, Kollegen", "themeIcon": "🏢", "difficulty": 4, "durationMin": 165, "premium": false, "lesenId": "lesen-9", "hoerenId": "hoeren-9", "bausteineId": "sb-9", "schreibenId": "schreiben-9", "sprechenLabel": "Teil 2: Präsentation", "descriptionAr": "نموذج يركز على بيئة العمل، المراسلات مع الزملاء، والبحث عن وظائف.", "highlights": ["رسائل العمل الرسمية", "قواعد العمل في ألمانيا"], "parts": {"lesen": 45, "hoeren": 30, "bausteine": 15, "schreiben": 30, "sprechen": 15}},
  {"id": "mock-10", "number": 10, "titleAr": "النموذج 10 - الدوائر الحكومية (مجاني بالكامل)", "titleDe": "Modell 10 - Behörden & Bürokratie", "theme": "Behörden, Formulare", "themeIcon": "🏛️", "difficulty": 5, "durationMin": 165, "premium": false, "lesenId": "lesen-10", "hoerenId": "hoeren-10", "bausteineId": "sb-10", "schreibenId": "schreiben-10", "sprechenLabel": "Teil 2: Präsentation", "descriptionAr": "النموذج الأهم للتدريب على المراسلات الحكومية ومكتب العمل والتأمين.", "highlights": ["استمارات حكومية", "رسائل لـ Jobcenter"], "parts": {"lesen": 45, "hoeren": 30, "bausteine": 15, "schreiben": 30, "sprechen": 15}}
];
