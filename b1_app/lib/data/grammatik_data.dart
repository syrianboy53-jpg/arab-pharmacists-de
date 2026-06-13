// Automatically generated from Web data (grammar.ts) on 2026-06-13T11:48:58.565Z
import 'dart:convert';

final List<Map<String, dynamic>> commonMistakes = List<Map<String, dynamic>>.from(json.decode(r'''[{"id":"art-1","category":"artikel","level":"A2","premium":false,"titleAr":"استخدام Artikel خاطئ مع الكلمات المؤنّثة","wrong":"Der Frau ist nett.","right":"Die Frau ist nett.","whyAr":"العربيّة بلا أدوات تعريف ثنائيّة الجنس، فيُسحب المتعلّم لاستعمال \"der\" كأنّه \"ال\" العربيّة العامّة.","ruleAr":"كلّ كلمة ألمانيّة لها جنس ثابت (der/die/das). الكلمات المنتهية بـ‎-ung، -heit، -keit، -schaft، -ion، -tät، -ie، -ei = die دائماً (ما عدا استثناءات نادرة).","tipAr":"احفظ الكلمة دائماً مع Artikel (die Frau، ليس Frau فقط). لوّن: مذكّر أزرق، مؤنّث أحمر، محايد أخضر.","examples":[{"wrong":"Der Universität ist groß.","right":"Die Universität ist groß.","ar":"الجامعة كبيرة."},{"wrong":"Der Lösung ist einfach.","right":"Die Lösung ist einfach.","ar":"الحلّ بسيط."},{"wrong":"Der Information war wichtig.","right":"Die Information war wichtig.","ar":"المعلومة كانت مهمّة."}],"relatedTags":["Genus","die-Wörter"]},{"id":"art-2","category":"artikel","level":"A2","premium":false,"titleAr":"حذف Artikel أمام أسماء الوظائف بدون \"als\"","wrong":"Ich bin der Lehrer.","right":"Ich bin Lehrer.","whyAr":"العربيّة تقول \"أنا المعلّم\"، فيُترجم حرفياً مع الأداة. الألمانيّة تحذف Artikel مع المهن والجنسيّات بعد sein/werden.","ruleAr":"بعد الأفعال sein/werden/bleiben + مهنة/جنسيّة/ديانة → بدون Artikel. (Ich bin Arzt. Sie wird Ingenieurin.) لكن مع صفة → نُعيد الأداة (Ich bin ein guter Arzt).","examples":[{"wrong":"Er ist ein Student.","right":"Er ist Student.","ar":"هو طالب."},{"wrong":"Sie wird die Ärztin.","right":"Sie wird Ärztin.","ar":"ستصبح طبيبة."},{"wrong":"Ich bin der Syrer.","right":"Ich bin Syrer.","ar":"أنا سوريّ."}],"relatedTags":["Beruf","sein"]},{"id":"art-3","category":"artikel","level":"B1","premium":true,"titleAr":"تذكير الكلمات المنتهية بـ‎-chen / ‎-lein","wrong":"Der Mädchen ist süß.","right":"Das Mädchen ist süß.","whyAr":"مع أنّ المعنى مؤنّث (فتاة)، Artikel ألمانيّة تتبع الشكل لا المعنى — كلّ كلمة بـ‎-chen أو ‎-lein = das.","ruleAr":"اللاحقة ‎-chen / ‎-lein تجعل الكلمة محايدة (das) دائماً، حتّى لو معناها مذكّر أو مؤنّث (das Mädchen، das Männlein، das Brötchen).","tipAr":"تذكّر القاعدة: \"الشكل يحكم، لا المعنى\" — Mädchen + ‎chen = das، انتهى.","examples":[{"wrong":"Die Mädchen kommt morgen.","right":"Das Mädchen kommt morgen.","ar":"الفتاة تأتي غداً."},{"wrong":"Der Brötchen ist frisch.","right":"Das Brötchen ist frisch.","ar":"الخبز الصغير طازج."},{"wrong":"Die Häuschen ist klein.","right":"Das Häuschen ist klein.","ar":"البيت الصغير صغير."}],"relatedTags":["Diminutiv","-chen","-lein"]},{"id":"art-4","category":"artikel","level":"B1","premium":true,"titleAr":"استعمال \"die\" بدلاً من \"das\" مع الأسماء المُشتقّة من الأفعال","wrong":"Die Lernen ist wichtig.","right":"Das Lernen ist wichtig.","whyAr":"الفعل المُحوَّل لاسم (Nominalisierung) محايد دائماً، لكن المتعلّم يميل لاستعمال die مع الأسماء المجرّدة.","ruleAr":"كلّ Infinitiv يُستخدَم اسماً → das. (das Lernen، das Essen، das Lesen). ينطبق على كلّ صيغ المصدر بلا استثناء.","examples":[{"wrong":"Die Schwimmen macht Spaß.","right":"Das Schwimmen macht Spaß.","ar":"السباحة ممتعة."},{"wrong":"Die Rauchen ist verboten.","right":"Das Rauchen ist verboten.","ar":"التدخين ممنوع."},{"wrong":"Die Kochen ist einfach.","right":"Das Kochen ist einfach.","ar":"الطبخ سهل."}],"relatedTags":["Nominalisierung","Infinitiv"]},{"id":"art-5","category":"artikel","level":"B1","premium":true,"titleAr":"الخلط بين der/die في الجمع","wrong":"Der Kinder spielen.","right":"Die Kinder spielen.","whyAr":"في الجمع، Artikel \"die\" لكلّ الأجناس بدون استثناء، لكن البعض يُسقِط \"der\" المفرد على الجمع.","ruleAr":"في Plural Nominativ والجمع بشكل عامّ: Artikel = die دائماً (die Männer، die Frauen، die Kinder). فقط في Dativ Plural تتحوّل لـ \"den\" (den Männern).","tipAr":"القاعدة الذهبيّة: جمع Nominativ = die. جمع Dativ = den + n في نهاية الاسم.","examples":[{"wrong":"Der Bücher sind interessant.","right":"Die Bücher sind interessant.","ar":"الكتب مثيرة."},{"wrong":"Das Häuser sind alt.","right":"Die Häuser sind alt.","ar":"البيوت قديمة."},{"wrong":"Der Lehrer arbeiten viel. (جمع)","right":"Die Lehrer arbeiten viel.","ar":"المعلّمون يعملون كثيراً."}],"relatedTags":["Plural","Nominativ"]},{"id":"kas-1","category":"kasus","level":"A2","premium":false,"titleAr":"استعمال Nominativ بعد \"haben\" بدل Akkusativ","wrong":"Ich habe ein Bruder.","right":"Ich habe einen Bruder.","whyAr":"العربيّة لا تميّز بين \"أخي\" كفاعل أو مفعول، لكنّ الألمانيّة تطلب Akkusativ بعد \"haben\".","ruleAr":"الفعل haben يأخذ مفعولاً به مباشراً → Akkusativ. للمذكّر: ein → einen، der → den. الإناث والمحايد لا تتغيّر في Akk.","tipAr":"كلّ مرّة تستخدم haben + اسم مذكّر، اسأل نفسك: هل وضعتُ -en في النهاية؟","examples":[{"wrong":"Ich habe ein Hund.","right":"Ich habe einen Hund.","ar":"عندي كلب."},{"wrong":"Er hat ein Computer.","right":"Er hat einen Computer.","ar":"لديه حاسوب."},{"wrong":"Wir haben kein Tisch.","right":"Wir haben keinen Tisch.","ar":"ليس لدينا طاولة."}],"relatedTags":["Akkusativ","haben"]},{"id":"kas-2","category":"kasus","level":"B1","premium":true,"titleAr":"استخدام Akkusativ بعد أفعال Dativ (helfen / danken / gefallen)","wrong":"Ich helfe meinen Bruder.","right":"Ich helfe meinem Bruder.","whyAr":"الفعل helfen يبدو مفعولاً به مباشراً (نساعد فلاناً) فيُستخدم Akk، لكنّه فعل Dativ في الألمانيّة.","ruleAr":"بعض الأفعال تطلب Dativ دائماً: helfen، danken، gefallen، gehören، antworten، folgen، gratulieren. للمذكّر: einen → einem، meinen → meinem.","tipAr":"احفظهم كأغنية: \"helfen, danken, gehören, gefallen، gratulieren، folgen — كلّها Dativ.\"","examples":[{"wrong":"Ich danke meinen Lehrer.","right":"Ich danke meinem Lehrer.","ar":"أشكر معلّمي."},{"wrong":"Das Auto gehört meinen Vater.","right":"Das Auto gehört meinem Vater.","ar":"السيّارة لأبي."},{"wrong":"Der Film gefällt meinen Freund.","right":"Der Film gefällt meinem Freund.","ar":"الفيلم يعجب صديقي."}],"relatedTags":["Dativ-Verben","helfen","danken"]},{"id":"kas-3","category":"kasus","level":"B1","premium":true,"titleAr":"الخلط بين Akk وDat مع Wechselpräpositionen (in/auf/an...)","wrong":"Ich gehe in die Schule. (للمكان الثابت)","right":"Ich bin in der Schule.","whyAr":"حروف الجرّ المتغيّرة تأخذ Akk عند الحركة (إلى) وDat عند المكان الثابت (في). كثيرون يستعملون Akk دائماً.","ruleAr":"القاعدة الذهبيّة: Wohin? (إلى أين؟) → Akkusativ. Wo? (أين؟) → Dativ. تشمل: in/an/auf/über/unter/vor/hinter/neben/zwischen.","tipAr":"اسأل: حركة أم سكون؟ حركة = Akk، سكون = Dat.","examples":[{"wrong":"Das Buch liegt auf den Tisch.","right":"Das Buch liegt auf dem Tisch.","ar":"الكتاب على الطاولة (سكون)."},{"wrong":"Ich wohne in dem Haus. ❌ (مع حركة)","right":"Ich gehe in das Haus.","ar":"أذهب إلى البيت (حركة)."},{"wrong":"Er steht vor den Computer.","right":"Er steht vor dem Computer.","ar":"يقف أمام الحاسوب (سكون)."}],"relatedTags":["Wechselpräposition","Wohin","Wo"]},{"id":"kas-4","category":"kasus","level":"B1","premium":true,"titleAr":"إضافة \"n\" خاطئة في Dativ Plural","wrong":"Ich spreche mit meinen Freunde.","right":"Ich spreche mit meinen Freunden.","whyAr":"القاعدة: Plural + Dativ → الاسم يأخذ ‎-n في النهاية. كثيرون ينسون هذه الـ‎-n.","ruleAr":"في Dativ Plural، يُضاف ‎-n إلى الاسم نفسه (إذا لم يكن منتهياً بـ‎-n أو ‎-s أصلاً). die Freunde → den Freunden، die Kinder → den Kindern، die Frauen → den Frauen (سبق وانتهت بـn).","tipAr":"كلّ مرّة ترى \"den\" أمام جمع، تأكّد أنّ الاسم ينتهي بـ‎-n.","examples":[{"wrong":"Ich helfe den Kinder.","right":"Ich helfe den Kindern.","ar":"أساعد الأطفال."},{"wrong":"Er fährt mit den Bus. (مفرد ✓)","right":"Er fährt mit den Bussen. (جمع)","ar":"يسافر بالحافلات."},{"wrong":"Wir reden mit den Lehrer. (جمع)","right":"Wir reden mit den Lehrern.","ar":"نتحدّث مع المعلّمين."}],"relatedTags":["Dativ-Plural","n-Endung"]},{"id":"kas-5","category":"kasus","level":"B2","premium":true,"titleAr":"إهمال Genitiv بعد \"wegen / während / trotz\"","wrong":"Wegen das Wetter bleibe ich zu Hause.","right":"Wegen des Wetters bleibe ich zu Hause.","whyAr":"حروف الجرّ wegen/während/trotz/(an)statt تطلب Genitiv في الألمانيّة الرسميّة (B1+). في الكلام اليومي يُستعمَل Dativ، لكن الامتحان الكتابي يفضّل Genitiv.","ruleAr":"بعد wegen/während/trotz/anstatt + Genitiv: der → des + s، die → der، das → des + s. مثال: wegen des Wetters، während der Pause.","tipAr":"في Schreiben B1/B2 استعمل Genitiv. في الكلام اليومي يمكن Dativ.","examples":[{"wrong":"Trotz dem Regen gehen wir spazieren.","right":"Trotz des Regens gehen wir spazieren.","ar":"رغم المطر نتمشّى."},{"wrong":"Während der Unterricht (✗ Akk)","right":"Während des Unterrichts ist Handy verboten.","ar":"أثناء الدرس الجوّال ممنوع."},{"wrong":"Statt das Auto nehme ich den Bus.","right":"Statt des Autos nehme ich den Bus.","ar":"بدل السيّارة آخذ الحافلة."}],"relatedTags":["Genitiv","wegen","trotz"]},{"id":"kas-6","category":"kasus","level":"B1","premium":true,"titleAr":"استخدام \"mich/dich\" بدل \"mir/dir\" مع helfen/gefallen","wrong":"Kannst du mich helfen?","right":"Kannst du mir helfen?","whyAr":"helfen يأخذ Dativ، فالضمير يجب أن يكون mir/dir/ihm/ihr/uns/euch/ihnen — وليس mich/dich.","ruleAr":"مع أفعال Dativ: ich → mir، du → dir، er → ihm، sie → ihr، wir → uns، ihr → euch، sie/Sie → ihnen/Ihnen.","examples":[{"wrong":"Das Buch gefällt mich.","right":"Das Buch gefällt mir.","ar":"الكتاب يعجبني."},{"wrong":"Ich danke dich.","right":"Ich danke dir.","ar":"أشكرك."},{"wrong":"Sie antwortet mich nicht.","right":"Sie antwortet mir nicht.","ar":"لا تجيبني."}],"relatedTags":["Personalpronomen","Dativ"]},{"id":"verb-1","category":"verben","level":"A2","premium":false,"titleAr":"استخدام \"haben\" بدل \"sein\" في Perfekt للأفعال الحركيّة","wrong":"Ich habe gegangen.","right":"Ich bin gegangen.","whyAr":"في العربيّة فعل واحد للماضي. في الألمانيّة Perfekt يحتاج haben أو sein حسب نوع الفعل.","ruleAr":"استعمل sein مع: (1) أفعال الحركة (gehen, fahren, fliegen, laufen, kommen)، (2) تغيير الحالة (aufstehen, einschlafen, sterben)، (3) sein/bleiben/werden. كلّ ما عدا ذلك = haben.","tipAr":"احفظ: \"أفعال الحركة + التغيير = sein. الباقي = haben.\"","examples":[{"wrong":"Er hat nach Berlin gefahren.","right":"Er ist nach Berlin gefahren.","ar":"سافر إلى برلين."},{"wrong":"Wir haben aufgestanden.","right":"Wir sind aufgestanden.","ar":"استيقظنا."},{"wrong":"Ich habe geblieben.","right":"Ich bin geblieben.","ar":"بقيتُ."}],"relatedTags":["Perfekt","haben/sein"]},{"id":"verb-2","category":"verben","level":"A2","premium":false,"titleAr":"عدم فصل الفعل المنفصل (trennbare Verben)","wrong":"Ich aufstehe um 7 Uhr.","right":"Ich stehe um 7 Uhr auf.","whyAr":"الأفعال المنفصلة كـaufstehen/einkaufen/anrufen تنفصل في الجملة الأساسيّة: البادئة في النهاية والفعل في موقعه الثاني.","ruleAr":"في Hauptsatz: البادئة (auf، ein، an، aus، mit) → نهاية الجملة. في Nebensatz (mit weil/dass): الفعل والبادئة معاً في النهاية.","tipAr":"البادئة Trennbar تكون \"مفتوحة\" — auf-stehen، an-rufen. اللصاقة مثل be-/ver-/ent- لا تنفصل.","examples":[{"wrong":"Wir einkaufen am Samstag.","right":"Wir kaufen am Samstag ein.","ar":"نتسوّق السبت."},{"wrong":"Sie anruft mich morgen.","right":"Sie ruft mich morgen an.","ar":"تتّصل بي غداً."},{"wrong":"Er ankommt um 9 Uhr.","right":"Er kommt um 9 Uhr an.","ar":"يصل في 9."}],"relatedTags":["Trennbare Verben","Wortstellung"]},{"id":"verb-3","category":"verben","level":"B1","premium":true,"titleAr":"استخدام \"wissen\" بدل \"kennen\" (والعكس)","wrong":"Ich weiß diesen Mann.","right":"Ich kenne diesen Mann.","whyAr":"العربيّة تستعمل \"أعرف\" للأشخاص والمعلومات. الألمانيّة تفصل: kennen للأشخاص/الأماكن، wissen للحقائق/المعلومات.","ruleAr":"kennen + أشخاص/مدن/كتب/أماكن (تجربة شخصيّة). wissen + حقائق/أرقام/معلومات (غالباً + dass-Satz أو Fragewort). مثال: Ich kenne ihn. / Ich weiß, wo er wohnt.","tipAr":"القاعدة: kennen = \"أعرفه/أعرفها\" (شخص أو شيء). wissen = \"أعرفُ أنّ...\" (معلومة).","examples":[{"wrong":"Weißt du Berlin?","right":"Kennst du Berlin?","ar":"هل تعرف برلين؟"},{"wrong":"Ich kenne, dass er krank ist.","right":"Ich weiß, dass er krank ist.","ar":"أعرف أنّه مريض."},{"wrong":"Kennt ihr die Antwort?","right":"Wisst ihr die Antwort?","ar":"هل تعرفون الجواب؟"}],"relatedTags":["kennen","wissen"]},{"id":"verb-4","category":"verben","level":"B1","premium":true,"titleAr":"حذف \"zu\" قبل Infinitiv بعد \"versuchen / vorhaben / aufhören\"","wrong":"Ich versuche lernen.","right":"Ich versuche zu lernen.","whyAr":"كثير من الأفعال تتطلّب \"zu + Infinitiv\" قبل الفعل التابع، وكثيراً ما يُنسى الـzu.","ruleAr":"بعد versuchen، beginnen، aufhören، vorhaben، anfangen، vergessen، beschließen → \"zu + Infinitiv\" في النهاية. مع الأفعال المنفصلة: zu بين البادئة والجذر (aufzustehen).","tipAr":"الاستثناءات الكبرى: الأفعال الإراديّة (können/müssen/wollen/sollen/dürfen/mögen) + lassen + sehen/hören = بدون zu.","examples":[{"wrong":"Wir haben vor, in Berlin gehen.","right":"Wir haben vor, nach Berlin zu gehen.","ar":"ننوي الذهاب إلى برلين."},{"wrong":"Sie hört auf rauchen.","right":"Sie hört auf zu rauchen.","ar":"تتوقّف عن التدخين."},{"wrong":"Er beginnt arbeiten.","right":"Er beginnt zu arbeiten.","ar":"يبدأ العمل."}],"relatedTags":["zu-Infinitiv"]},{"id":"verb-5","category":"verben","level":"B1","premium":true,"titleAr":"استخدام Infinitiv + zu بعد الأفعال الإراديّة (Modalverben)","wrong":"Ich muss zu arbeiten.","right":"Ich muss arbeiten.","whyAr":"بعض المتعلّمين يبالغون في إضافة zu حتّى مع الأفعال الإراديّة، التي لا تأخذ zu أبداً.","ruleAr":"الأفعال الإراديّة (können/müssen/wollen/sollen/dürfen/mögen/möchten) + Infinitiv فقط (بدون zu). نفس القاعدة لـlassen, sehen, hören, gehen + Infinitiv.","examples":[{"wrong":"Er kann zu lesen.","right":"Er kann lesen.","ar":"يستطيع القراءة."},{"wrong":"Wir wollen zu schlafen.","right":"Wir wollen schlafen.","ar":"نريد النوم."},{"wrong":"Sie lässt mich zu warten.","right":"Sie lässt mich warten.","ar":"تتركني أنتظر."}],"relatedTags":["Modalverben","zu-Infinitiv"]},{"id":"satz-1","category":"satzbau","level":"A2","premium":false,"titleAr":"الفعل ليس في الموقع الثاني","wrong":"Heute ich gehe in die Schule.","right":"Heute gehe ich in die Schule.","whyAr":"العربيّة تسمح بترتيب حرّ. الألمانيّة في الجملة العاديّة (Hauptsatz): الفعل المُصرَّف في الموقع الثاني دائماً.","ruleAr":"القاعدة الذهبيّة (V2): الفعل في الموقع الثاني، بغضّ النظر عمّا في الموقع الأوّل. إذا بدأت بـ\"Heute\"، فالفعل بعدها مباشرة، ثمّ الفاعل.","tipAr":"عُدّ: 1-Heute / 2-gehe / 3-ich / 4-... → الفعل في 2 دائماً.","examples":[{"wrong":"Morgen wir lernen Deutsch.","right":"Morgen lernen wir Deutsch.","ar":"غداً نتعلّم الألمانيّة."},{"wrong":"In Berlin er wohnt.","right":"In Berlin wohnt er.","ar":"في برلين يسكن."},{"wrong":"Manchmal ich gehe ins Kino.","right":"Manchmal gehe ich ins Kino.","ar":"أحياناً أذهب للسينما."}],"relatedTags":["V2","Hauptsatz"]},{"id":"satz-2","category":"satzbau","level":"B1","premium":false,"titleAr":"وضع الفعل في موقع ثانٍ بعد weil/dass/wenn","wrong":"Ich komme nicht, weil ich bin krank.","right":"Ich komme nicht, weil ich krank bin.","whyAr":"في Nebensatz (الجملة الفرعيّة) بعد weil/dass/wenn/obwohl → الفعل في النهاية. كثيرون يعاملون الجملة الفرعيّة كأنّها أساسيّة.","ruleAr":"بعد كلّ من weil، dass، wenn، obwohl، ob، als، falls → الفعل في النهاية. إذا فيه فعلان (Modalverb + Infinitiv) → Modalverb في النهاية.","tipAr":"احفظ: \"weil + ... + Verb\" دائماً. \"weil ich bin\" خطأ شائع — الصحيح \"weil ich ... bin\".","examples":[{"wrong":"Sie sagt, dass sie ist müde.","right":"Sie sagt, dass sie müde ist.","ar":"تقول إنّها متعبة."},{"wrong":"Wenn es regnet morgen, bleibe ich zu Hause.","right":"Wenn es morgen regnet, bleibe ich zu Hause.","ar":"إن أمطرت غداً أبقى في البيت."},{"wrong":"Obwohl er arbeitet viel, ist er arm.","right":"Obwohl er viel arbeitet, ist er arm.","ar":"رغم أنّه يعمل كثيراً، فهو فقير."}],"relatedTags":["Nebensatz","weil","dass"]},{"id":"satz-3","category":"satzbau","level":"B1","premium":true,"titleAr":"ترتيب TeKaMoLo خاطئ (الزمان قبل المكان)","wrong":"Ich gehe in die Schule heute.","right":"Ich gehe heute in die Schule.","whyAr":"الألمانيّة تتبع ترتيب TeKaMoLo: TEmporal (متى) → KAusal (لماذا) → MOdal (كيف) → LOkal (أين). العربيّة أحرّ في ذلك.","ruleAr":"الترتيب: Te=الزمان (heute, morgen) → Ka=السبب (deshalb, wegen) → Mo=الطريقة (mit dem Bus, schnell) → Lo=المكان (in die Schule, nach Berlin).","tipAr":"إذا حفظت TeKaMoLo، تكوَّنت 80% من جملك صحيحة. الزمان دائماً قبل المكان.","examples":[{"wrong":"Wir fahren nach Berlin am Samstag.","right":"Wir fahren am Samstag nach Berlin.","ar":"نسافر إلى برلين السبت."},{"wrong":"Sie geht in den Park jeden Tag.","right":"Sie geht jeden Tag in den Park.","ar":"تذهب للحديقة يومياً."},{"wrong":"Er arbeitet im Büro fleißig.","right":"Er arbeitet fleißig im Büro.","ar":"يعمل بجدّ في المكتب."}],"relatedTags":["TeKaMoLo","Mittelfeld"]},{"id":"satz-4","category":"satzbau","level":"B1","premium":true,"titleAr":"وضع \"nicht\" في الموقع الخطأ","wrong":"Ich nicht arbeite heute.","right":"Ich arbeite heute nicht.","whyAr":"العربيّة تضع النفي قبل الفعل. الألمانيّة تضع \"nicht\" غالباً في النهاية أو قبل ما يُنفى تحديداً.","ruleAr":"القواعد: (1) لنفي الجملة كلّها → nicht في النهاية أو قبل آخر فعل. (2) لنفي شيء محدّد → nicht قبله مباشرة. (3) قبل الصفات والظروف. (4) لنفي اسم نكرة → kein/keine بدل nicht.","tipAr":"مع الأفعال الإراديّة: nicht قبل Infinitiv النهائي. (Ich kann heute nicht kommen.)","examples":[{"wrong":"Sie nicht kommt heute.","right":"Sie kommt heute nicht.","ar":"لا تأتي اليوم."},{"wrong":"Ich habe nicht ein Auto.","right":"Ich habe kein Auto.","ar":"ليس لديّ سيّارة."},{"wrong":"Er nicht ist müde.","right":"Er ist nicht müde.","ar":"ليس متعباً."}],"relatedTags":["Negation","nicht","kein"]},{"id":"praep-1","category":"praeposition","level":"A2","premium":false,"titleAr":"استخدام \"in\" بدل \"nach\" مع المدن والبلدان","wrong":"Ich fahre in Berlin.","right":"Ich fahre nach Berlin.","whyAr":"العربيّة \"إلى\" تترجم حرفياً لـ\"in\"، لكنّ الألمانيّة تستعمل nach مع المدن/البلدان (بلا أداة) وin مع الدول التي لها أداة.","ruleAr":"nach + المدن/الدول بلا أداة (nach Berlin, nach Deutschland, nach Frankreich). in + الدول بأداة (in die Türkei, in die USA, in die Schweiz). الفنادق/الأماكن المغلقة: in (in die Schule).","tipAr":"القاعدة: nach Stadt/Land. in الفنادق والمحلّات.","examples":[{"wrong":"Wir reisen in Italien.","right":"Wir reisen nach Italien.","ar":"نسافر إلى إيطاليا."},{"wrong":"Er fliegt in die Türkei. ✓","right":"Er fliegt nach Türkei. ❌","ar":"يسافر إلى تركيا."},{"wrong":"Sie geht nach Schule.","right":"Sie geht in die Schule.","ar":"تذهب للمدرسة."}],"relatedTags":["nach","in","Länder"]},{"id":"praep-2","category":"praeposition","level":"A2","premium":true,"titleAr":"الخلط بين \"seit\" و \"vor\" للزمن","wrong":"Vor zwei Jahren wohne ich in Berlin.","right":"Seit zwei Jahren wohne ich in Berlin.","whyAr":"seit = منذ (للحدث المستمرّ في الحاضر). vor = قبل (للحدث المنتهي في الماضي).","ruleAr":"seit + Dativ + Präsens (للحدث الذي بدأ ومستمرّ). vor + Dativ + Perfekt/Präteritum (للحدث المنتهي). مثال: Seit 2020 wohne ich hier. / Vor 5 Jahren bin ich gekommen.","tipAr":"سؤال نفسك: هل ما زال يحدث؟ نعم → seit. هل انتهى؟ نعم → vor.","examples":[{"wrong":"Vor drei Stunden warte ich.","right":"Seit drei Stunden warte ich.","ar":"أنتظر منذ 3 ساعات."},{"wrong":"Seit zwei Wochen bin ich angekommen.","right":"Vor zwei Wochen bin ich angekommen.","ar":"وصلتُ قبل أسبوعين."},{"wrong":"Vor einem Monat lerne ich Deutsch.","right":"Seit einem Monat lerne ich Deutsch.","ar":"أتعلّم الألمانيّة منذ شهر."}],"relatedTags":["seit","vor","Zeit"]},{"id":"praep-3","category":"praeposition","level":"B1","premium":true,"titleAr":"استخدام \"auf\" بدل \"an\" مع الجدران والصور","wrong":"Das Bild hängt auf der Wand.","right":"Das Bild hängt an der Wand.","whyAr":"العربيّة \"على الحائط\" تترجم حرفياً لـauf، لكن للأسطح العموديّة المُعلَّق عليها يُستعمَل an.","ruleAr":"an = عند/على (سطح عمودي أو حافّة): an der Wand, an der Tür, am Fenster, am Tisch (sitzen). auf = على (سطح أفقي): auf dem Tisch, auf dem Stuhl.","tipAr":"الصور والساعات والإعلانات → an. الكتب والأطعمة فوق طاولة → auf.","examples":[{"wrong":"Die Uhr hängt auf der Wand.","right":"Die Uhr hängt an der Wand.","ar":"الساعة على الحائط."},{"wrong":"Wir sitzen auf dem Tisch.","right":"Wir sitzen am Tisch.","ar":"نجلس عند الطاولة."},{"wrong":"Das Plakat ist auf der Tür.","right":"Das Plakat ist an der Tür.","ar":"الإعلان على الباب."}],"relatedTags":["an","auf","Wechselpräposition"]},{"id":"praep-4","category":"praeposition","level":"B1","premium":true,"titleAr":"استخدام \"für\" بدل \"seit\" / \"vor\" للمدد الزمنيّة","wrong":"Ich lerne Deutsch für drei Jahre.","right":"Ich lerne Deutsch seit drei Jahren.","whyAr":"الإنجليزيّة \"for three years\" تُترجم خطأً لـ\"für drei Jahre\". الألمانيّة تستعمل seit للمدّة المستمرّة.","ruleAr":"für + Akk = لمدّة محدّدة في المستقبل/المخطّط (Ich fahre für eine Woche nach Berlin). seit + Dat = منذ بداية معيّنة وما زال (Ich bin seit 3 Jahren hier).","tipAr":"تذكّر: \"for three years (لتعلّم)\" بالألمانيّة = seit drei Jahren، لا für.","examples":[{"wrong":"Ich arbeite hier für 5 Jahre.","right":"Ich arbeite hier seit 5 Jahren.","ar":"أعمل هنا منذ 5 سنوات."},{"wrong":"Sie lebt in Köln für 10 Jahre.","right":"Sie lebt in Köln seit 10 Jahren.","ar":"تعيش في كولن منذ 10 سنوات."},{"wrong":"Wir kennen uns für ein Jahr.","right":"Wir kennen uns seit einem Jahr.","ar":"نعرف بعضنا منذ سنة."}],"relatedTags":["für","seit","Zeitdauer"]},{"id":"konj-1","category":"konjunktion","level":"B1","premium":true,"titleAr":"استخدام \"weil\" + ترتيب جملة أساسيّة","wrong":"Ich gehe nicht, weil ich bin krank.","right":"Ich gehe nicht, weil ich krank bin.","whyAr":"weil أداة Subjunktion → الفعل في النهاية. كثيرون يخلطون بينها وبين \"denn\" (التي تُبقي V2).","ruleAr":"weil → Nebensatz → الفعل في النهاية. denn → Hauptsatz → الفعل في الموقع الثاني (V2). مثال: \"Ich bleibe, weil es regnet.\" / \"Ich bleibe, denn es regnet.\"","tipAr":"إن كنت غير متأكّد، استعمل denn (أبسط). لكن weil أكثر استعمالاً في B1.","examples":[{"wrong":"Sie kommt nicht, weil sie hat keine Zeit.","right":"Sie kommt nicht, weil sie keine Zeit hat.","ar":"لا تأتي لأنّ ليس لديها وقت."},{"wrong":"Ich lerne, weil ich will erfolgreich sein.","right":"Ich lerne, weil ich erfolgreich sein will.","ar":"أتعلّم لأنّي أريد النجاح."},{"wrong":"Er ist müde, weil er hat viel gearbeitet.","right":"Er ist müde, weil er viel gearbeitet hat.","ar":"متعب لأنّه عمل كثيراً."}],"relatedTags":["weil","denn","Nebensatz"]},{"id":"konj-2","category":"konjunktion","level":"B1","premium":true,"titleAr":"الخلط بين \"wenn\" و \"wann\" و \"als\"","wrong":"Wann ich klein war, habe ich in Damaskus gewohnt.","right":"Als ich klein war, habe ich in Damaskus gewohnt.","whyAr":"العربيّة \"عندما\" تُترجم بأكثر من كلمة. القاعدة الذهبيّة في الألمانيّة: als = حدث ماضٍ مرّة واحدة. wenn = ماضٍ متكرّر / حاضر / مستقبل. wann = سؤال (متى؟).","ruleAr":"als + Vergangenheit (مرّة واحدة): \"Als ich 18 war, ...\" / wenn + Wiederholung/Zukunft: \"Wenn es regnet, ...\" / wann + Frage: \"Wann kommst du?\"","tipAr":"الذاكرة: A-L-S = Action (حدث مرّة في الماضي). wenn = whenever.","examples":[{"wrong":"Wenn ich in Syrien war, war ich glücklich.","right":"Als ich in Syrien war, war ich glücklich.","ar":"عندما كنتُ في سوريا، كنتُ سعيداً."},{"wrong":"Als ich Zeit habe, lese ich.","right":"Wenn ich Zeit habe, lese ich.","ar":"عندما يكون لديّ وقت، أقرأ."},{"wrong":"Weißt du, wenn er kommt?","right":"Weißt du, wann er kommt?","ar":"هل تعرف متى يأتي؟"}],"relatedTags":["als","wenn","wann"]},{"id":"konj-3","category":"konjunktion","level":"B1","premium":true,"titleAr":"استخدام \"ob\" بدل \"wenn\" في الأسئلة غير المباشرة","wrong":"Ich weiß nicht, wenn er kommt. (هل يأتي)","right":"Ich weiß nicht, ob er kommt.","whyAr":"wenn = \"إذا/عندما\" (شرط)، ob = \"ما إذا/إن كان\" (سؤال غير مباشر بـYes/No).","ruleAr":"إن كان السؤال يجاب بـja/nein → ob. إن كان السؤال بأداة استفهام → نُبقي الأداة (was, wo, wann, warum). بعد ob → الفعل في النهاية.","tipAr":"القاعدة: تستطيع إجابة السؤال بـyes/no؟ → ob. لا → استعمل أداة الاستفهام نفسها.","examples":[{"wrong":"Sie fragt, wenn ich Zeit habe.","right":"Sie fragt, ob ich Zeit habe.","ar":"تسأل إن كان لديّ وقت."},{"wrong":"Ich bin nicht sicher, wenn er kommt.","right":"Ich bin nicht sicher, ob er kommt.","ar":"لستُ متأكّداً إن كان سيأتي."},{"wrong":"Weißt du, wenn das richtig ist?","right":"Weißt du, ob das richtig ist?","ar":"هل تعرف إن كان هذا صحيحاً؟"}],"relatedTags":["ob","wenn","indirekte Frage"]},{"id":"adj-1","category":"adjektiv","level":"B1","premium":true,"titleAr":"إهمال نهاية الصفة قبل الاسم","wrong":"Ein groß Haus.","right":"Ein großes Haus.","whyAr":"الصفة في الألمانيّة قبل الاسم تأخذ نهاية تختلف حسب Artikel وKasus وGenus. في العربيّة الصفة لا تتأثّر هكذا.","ruleAr":"القاعدة المبسّطة: بعد ein/kein/mein → الصفة تأخذ نهاية der/die/das (-er/-e/-es). بعد der/die/das → كلّها -e أو -en. بدون أداة → نهايات قويّة.","tipAr":"احفظ جدول الـ3 أنواع: starke (بدون أداة)، schwache (بعد der/die/das)، gemischte (بعد ein/kein/mein).","examples":[{"wrong":"Ein gut Buch.","right":"Ein gutes Buch.","ar":"كتاب جيّد."},{"wrong":"Mit ein nett Mann.","right":"Mit einem netten Mann.","ar":"مع رجل لطيف."},{"wrong":"Die schön Frau.","right":"Die schöne Frau.","ar":"المرأة الجميلة."}],"relatedTags":["Adjektivendung"]},{"id":"adj-2","category":"adjektiv","level":"B1","premium":true,"titleAr":"استخدام Komparativ خطأ مع \"wie / als\"","wrong":"Er ist größer wie ich.","right":"Er ist größer als ich.","whyAr":"كثيرون يستعملون \"wie\" مع المقارنة. القاعدة: als للمقارنة (أكبر مِن)، wie للتساوي (مثل).","ruleAr":"als = (أكبر/أصغر/أفضل) من. wie = (مثل/كـ). مثال: größer als / so groß wie. كذلك \"anders als\" (مختلف عن).","tipAr":"بالعربيّة: \"أكبر من\" → als. \"مثل\" → wie. لا تخلط بينهما.","examples":[{"wrong":"Berlin ist größer wie Damaskus.","right":"Berlin ist größer als Damaskus.","ar":"برلين أكبر من دمشق."},{"wrong":"Er läuft so schnell als ich.","right":"Er läuft so schnell wie ich.","ar":"يركض بسرعتي."},{"wrong":"Ich bin älter wie mein Bruder.","right":"Ich bin älter als mein Bruder.","ar":"أنا أكبر من أخي."}],"relatedTags":["Komparativ","als","wie"]},{"id":"adj-3","category":"adjektiv","level":"B2","premium":true,"titleAr":"الصفة المُسنَدة لا تُصرَّف (predikative Adjektive)","wrong":"Das Wetter ist heutes schön.","right":"Das Wetter ist heute schön.","whyAr":"الصفة بعد sein/werden/bleiben (predikativ) لا تأخذ أيّ نهاية. الكثير يضيف نهايات بالخطأ.","ruleAr":"الصفة المُسنَدة (أي بعد sein/werden/bleiben/finden) = شكلها الأساسي بدون أيّ نهاية. الصفة قبل الاسم فقط هي التي تُصرَّف.","examples":[{"wrong":"Ich finde das Buch interessantes.","right":"Ich finde das Buch interessant.","ar":"أجد الكتاب ممتعاً."},{"wrong":"Sie wird müdes.","right":"Sie wird müde.","ar":"تتعب."},{"wrong":"Er bleibt ruhiges.","right":"Er bleibt ruhig.","ar":"يبقى هادئاً."}],"relatedTags":["Prädikativ","sein + Adjektiv"]}]'''));

final List<Map<String, dynamic>> trennbareVerben = List<Map<String, dynamic>>.from(json.decode(r'''[{"id":"trennbar-haeufig","titleAr":"أفعال مركّبة منفصلة (الأكثر استعمالاً)","titleDe":"Trennbare Verben","intro":"الأفعال المنفصلة: في الحاضر والماضي البسيط (Präteritum) **تنفصل البادئة** وتذهب إلى نهاية الجملة. في Perfekt و Infinitiv تبقى موصولة. مثال: anrufen → ich rufe an / ich habe angerufen.","verbs":[{"infinitiv":"anrufen","praeteritum":"rief … an","partizip2":"angerufen","hilfsverb":"haben","ar":"يتّصل (تلفونياً)","type":"trennbar","examples":[{"context":"Präsens","de":"Ich rufe meinen Vater jeden Tag an.","ar":"أتّصل بأبي كل يوم."},{"context":"Perfekt","de":"Hast du den Arzt schon angerufen?","ar":"هل اتّصلت بالطبيب؟"},{"context":"Konjunktiv II","de":"Würdest du mich später anrufen?","ar":"هل يمكنك الاتصال بي لاحقاً؟"}]},{"infinitiv":"aufstehen","praeteritum":"stand … auf","partizip2":"aufgestanden","hilfsverb":"sein","ar":"ينهض / يستيقظ","type":"trennbar","examples":[{"context":"Präsens","de":"Ich stehe um 6 Uhr auf.","ar":"أستيقظ الساعة 6."},{"context":"Perfekt","de":"Heute bin ich sehr früh aufgestanden.","ar":"استيقظت اليوم باكراً جداً."},{"context":"Modal","de":"Morgen muss ich um 5 Uhr aufstehen.","ar":"غداً يجب أن أستيقظ الساعة 5."}]},{"infinitiv":"einkaufen","praeteritum":"kaufte … ein","partizip2":"eingekauft","hilfsverb":"haben","ar":"يتسوّق / يشتري","type":"trennbar","examples":[{"context":"Präsens","de":"Ich kaufe samstags im Supermarkt ein.","ar":"أتسوّق يوم السبت في السوبرماركت."},{"context":"Perfekt","de":"Hast du schon eingekauft?","ar":"هل تسوّقت بعد؟"},{"context":"Modal","de":"Wir müssen für die Woche einkaufen.","ar":"علينا أن نتسوّق للأسبوع."}]},{"infinitiv":"einladen","praeteritum":"lud … ein","partizip2":"eingeladen","hilfsverb":"haben","ar":"يدعو","type":"trennbar","examples":[{"context":"Präsens","de":"Ich lade dich zu meinem Geburtstag ein.","ar":"أدعوك إلى عيد ميلادي."},{"context":"Perfekt","de":"Wir haben alle Freunde eingeladen.","ar":"دعونا كل الأصدقاء."},{"context":"Passiv","de":"Er wurde nicht eingeladen.","ar":"هو لم يُدعَ."}]},{"infinitiv":"mitkommen","praeteritum":"kam … mit","partizip2":"mitgekommen","hilfsverb":"sein","ar":"يأتي مع (شخص)","type":"trennbar","examples":[{"context":"Präsens","de":"Kommst du mit ins Kino?","ar":"هل ستأتي معي إلى السينما؟"},{"context":"Perfekt","de":"Sie ist mit uns mitgekommen.","ar":"هي أتت معنا."},{"context":"Modal","de":"Ich möchte gern mitkommen.","ar":"أحبّ أن آتي معك."}]},{"infinitiv":"mitnehmen","praeteritum":"nahm … mit","partizip2":"mitgenommen","hilfsverb":"haben","ar":"يأخذ معه","type":"trennbar","examples":[{"context":"Präsens","de":"Ich nehme den Regenschirm mit.","ar":"آخذ المظلّة معي."},{"context":"Perfekt","de":"Hast du dein Buch mitgenommen?","ar":"هل أخذت كتابك معك؟"},{"context":"Imperativ","de":"Nimm bitte deinen Pass mit!","ar":"خذ جواز سفرك معك!"}]},{"infinitiv":"aufmachen / zumachen","praeteritum":"machte … auf / zu","partizip2":"aufgemacht / zugemacht","hilfsverb":"haben","ar":"يفتح / يغلق","type":"trennbar","examples":[{"context":"Präsens","de":"Mach bitte das Fenster auf!","ar":"افتح النافذة من فضلك!"},{"context":"Imperativ","de":"Mach die Tür zu, es ist kalt.","ar":"أغلق الباب، الجو بارد."},{"context":"Perfekt","de":"Wer hat den Brief aufgemacht?","ar":"من فتح الرسالة؟"}]},{"infinitiv":"anziehen / ausziehen","praeteritum":"zog … an / aus","partizip2":"angezogen / ausgezogen","hilfsverb":"haben","ar":"يلبس / يخلع","type":"trennbar","examples":[{"context":"Präsens","de":"Sie zieht sich elegant an.","ar":"هي ترتدي أناقة."},{"context":"Imperativ","de":"Zieh deine Jacke aus!","ar":"اخلع جاكيتك!"},{"context":"Perfekt","de":"Ich habe meinen Mantel angezogen.","ar":"لبست معطفي."}]},{"infinitiv":"fernsehen","praeteritum":"sah … fern","partizip2":"ferngesehen","hilfsverb":"haben","ar":"يشاهد التلفاز","type":"trennbar","examples":[{"context":"Präsens","de":"Wir sehen abends fern.","ar":"نشاهد التلفاز في المساء."},{"context":"Perfekt","de":"Er hat den ganzen Abend ferngesehen.","ar":"هو شاهد التلفاز طوال المساء."},{"context":"Negation","de":"Heute sehe ich nicht fern.","ar":"اليوم لن أشاهد التلفاز."}]},{"infinitiv":"umziehen","praeteritum":"zog … um","partizip2":"umgezogen","hilfsverb":"sein","ar":"ينتقل (بيت) / يبدّل ملابسه","type":"trennbar","examples":[{"context":"Wohnung wechseln","de":"Wir ziehen nächsten Monat nach München um.","ar":"سننتقل الشهر القادم إلى ميونخ."},{"context":"Perfekt (Wohnung)","de":"Sie ist letztes Jahr umgezogen.","ar":"هي انتقلت السنة الماضية."},{"context":"Kleidung wechseln","de":"Ich muss mich noch umziehen.","ar":"لا يزال عليّ أن أبدّل ملابسي."}]},{"infinitiv":"ankommen","praeteritum":"kam … an","partizip2":"angekommen","hilfsverb":"sein","ar":"يصل","type":"trennbar","examples":[{"context":"Präsens","de":"Der Zug kommt um 17 Uhr an.","ar":"القطار يصل الساعة 17."},{"context":"Perfekt","de":"Wann bist du in Berlin angekommen?","ar":"متى وصلت إلى برلين؟"},{"context":"Frage","de":"Ist das Paket schon angekommen?","ar":"هل وصل الطرد؟"}]},{"infinitiv":"abfahren","praeteritum":"fuhr … ab","partizip2":"abgefahren","hilfsverb":"sein","ar":"يغادر (سيارة/قطار)","type":"trennbar","examples":[{"context":"Präsens","de":"Der Bus fährt in 5 Minuten ab.","ar":"الباص يغادر بعد 5 دقائق."},{"context":"Perfekt","de":"Der Zug ist pünktlich abgefahren.","ar":"القطار غادر في موعده."},{"context":"Frage","de":"Wann fährt dein Flugzeug ab?","ar":"متى تغادر طائرتك؟"}]},{"infinitiv":"aufpassen","praeteritum":"passte … auf","partizip2":"aufgepasst","hilfsverb":"haben","ar":"يحذر / يهتمّ بـ","type":"trennbar","examples":[{"context":"Imperativ","de":"Pass auf! Da kommt ein Auto!","ar":"انتبه! هناك سيارة قادمة!"},{"context":"Präsens + auf","de":"Sie passt auf die Kinder auf.","ar":"هي تعتني بالأطفال."},{"context":"Perfekt","de":"Hast du gut aufgepasst?","ar":"هل انتبهت جيداً؟"}]},{"infinitiv":"ausgehen","praeteritum":"ging … aus","partizip2":"ausgegangen","hilfsverb":"sein","ar":"يخرج (سهرة)","type":"trennbar","examples":[{"context":"Präsens","de":"Heute Abend gehen wir aus.","ar":"الليلة سنخرج."},{"context":"Perfekt","de":"Am Wochenende sind wir oft ausgegangen.","ar":"كنا نخرج كثيراً في عطلة الأسبوع."},{"context":"Modal","de":"Ich möchte heute ausgehen.","ar":"أودّ الخروج اليوم."}]},{"infinitiv":"ausmachen","praeteritum":"machte … aus","partizip2":"ausgemacht","hilfsverb":"haben","ar":"يطفئ (جهاز) / يتّفق","type":"trennbar","examples":[{"context":"Gerät","de":"Mach bitte das Licht aus!","ar":"أطفئ الضوء من فضلك!"},{"context":"Termin","de":"Wir haben für Samstag was ausgemacht.","ar":"اتفقنا على شيء يوم السبت."},{"context":"Perfekt","de":"Hast du das Licht ausgemacht?","ar":"هل أطفأت الضوء؟"}]},{"infinitiv":"aussehen","praeteritum":"sah … aus","partizip2":"ausgesehen","hilfsverb":"haben","ar":"يبدو","type":"trennbar","examples":[{"context":"Präsens","de":"Du siehst heute müde aus.","ar":"تبدو متعباً اليوم."},{"context":"Perfekt","de":"Sie hat sehr glücklich ausgesehen.","ar":"بدت سعيدة جداً."},{"context":"Frage","de":"Wie sieht es draußen aus?","ar":"كيف يبدو الطقس بالخارج؟"}]},{"infinitiv":"mitmachen","praeteritum":"machte … mit","partizip2":"mitgemacht","hilfsverb":"haben","ar":"يشارك","type":"trennbar","examples":[{"context":"Präsens","de":"Machst du beim Sport mit?","ar":"هل تشارك في الرياضة؟"},{"context":"Perfekt","de":"Ich habe beim Wettbewerb mitgemacht.","ar":"شاركت في المسابقة."},{"context":"Modal","de":"Möchtest du mitmachen?","ar":"هل تودّ المشاركة؟"}]},{"infinitiv":"vorbereiten","praeteritum":"bereitete … vor","partizip2":"vorbereitet","hilfsverb":"haben","ar":"يحضّر / يجهّز","type":"trennbar","examples":[{"context":"Reflexiv","de":"Ich bereite mich auf die Prüfung vor.","ar":"أحضّر نفسي للامتحان."},{"context":"Perfekt","de":"Hast du das Essen vorbereitet?","ar":"هل حضّرت الطعام؟"},{"context":"Modal","de":"Wir müssen alles vorbereiten.","ar":"علينا أن نحضّر كل شيء."}]},{"infinitiv":"vorhaben","praeteritum":"hatte … vor","partizip2":"vorgehabt","hilfsverb":"haben","ar":"ينوي / يخطّط لـ","type":"trennbar","examples":[{"context":"Frage","de":"Was hast du am Wochenende vor?","ar":"ماذا تنوي في عطلة الأسبوع؟"},{"context":"Antwort","de":"Ich habe vor, ins Kino zu gehen.","ar":"أنوي الذهاب إلى السينما."},{"context":"Perfekt","de":"Wir haben das schon lange vorgehabt.","ar":"كنا ننوي ذلك منذ زمن."}]},{"infinitiv":"zurückkommen","praeteritum":"kam … zurück","partizip2":"zurückgekommen","hilfsverb":"sein","ar":"يعود","type":"trennbar","examples":[{"context":"Präsens","de":"Ich komme um 18 Uhr zurück.","ar":"أعود الساعة 18."},{"context":"Perfekt","de":"Wann seid ihr zurückgekommen?","ar":"متى عدتم؟"},{"context":"Frage","de":"Kommst du heute Abend zurück?","ar":"هل ستعود الليلة؟"}]}]},{"id":"untrennbar","titleAr":"أفعال مركّبة لا تنفصل (Untrennbare Verben)","titleDe":"Untrennbare Verben","intro":"الأفعال غير المنفصلة لا تتجزّأ أبداً. بادئاتها: **be-, ge-, er-, ver-, zer-, ent-, emp-, miss-**. مهم جداً: في Perfekt **بدون -ge-**! مثال: verstehen → verstanden (وليس geverstanden).","verbs":[{"infinitiv":"verstehen","praeteritum":"verstand","partizip2":"verstanden","hilfsverb":"haben","ar":"يفهم","type":"untrennbar","examples":[{"context":"Präsens","de":"Ich verstehe dich nicht.","ar":"لا أفهمك."},{"context":"Perfekt","de":"Hast du das verstanden?","ar":"هل فهمت ذلك؟"},{"context":"Konj. II","de":"Würdest du das verstehen?","ar":"هل ستفهم ذلك؟"}]},{"infinitiv":"bekommen","praeteritum":"bekam","partizip2":"bekommen","hilfsverb":"haben","ar":"يحصل على / يستلم","type":"untrennbar","examples":[{"context":"Präsens","de":"Ich bekomme jeden Monat ein Gehalt.","ar":"أتقاضى راتباً كل شهر."},{"context":"Perfekt","de":"Hast du meine E-Mail bekommen?","ar":"هل وصلتك رسالتي؟"},{"context":"ATTN","de":"\"bekommen\" ≠ \"werden\"! \"Ich bekomme einen Brief\" = أستلم رسالة.","ar":"⚠️ خطأ شائع."}]},{"infinitiv":"beginnen","praeteritum":"begann","partizip2":"begonnen","hilfsverb":"haben","ar":"يبدأ","type":"untrennbar","examples":[{"context":"Präsens","de":"Der Kurs beginnt um 9 Uhr.","ar":"الدورة تبدأ الساعة 9."},{"context":"Perfekt","de":"Wann hat der Film begonnen?","ar":"متى بدأ الفيلم؟"},{"context":"Modal","de":"Wir wollen morgen mit der Arbeit beginnen.","ar":"نريد البدء بالعمل غداً."}]},{"infinitiv":"erklären","praeteritum":"erklärte","partizip2":"erklärt","hilfsverb":"haben","ar":"يشرح","type":"untrennbar","examples":[{"context":"Präsens","de":"Der Lehrer erklärt die Regel.","ar":"المدرّس يشرح القاعدة."},{"context":"Perfekt","de":"Er hat mir das genau erklärt.","ar":"هو شرح لي ذلك بدقّة."},{"context":"Bitte","de":"Können Sie mir das bitte erklären?","ar":"هل يمكنكم شرح ذلك لي؟"}]},{"infinitiv":"vergessen","praeteritum":"vergaß","partizip2":"vergessen","hilfsverb":"haben","ar":"ينسى","type":"untrennbar","examples":[{"context":"Präsens","de":"Ich vergesse oft meine Schlüssel.","ar":"أنسى مفاتيحي كثيراً."},{"context":"Perfekt","de":"Ich habe deinen Geburtstag vergessen!","ar":"نسيت عيد ميلادك!"},{"context":"Modal","de":"Vergiss nicht, mich anzurufen.","ar":"لا تنسَ الاتّصال بي."}]},{"infinitiv":"verlieren","praeteritum":"verlor","partizip2":"verloren","hilfsverb":"haben","ar":"يخسر / يفقد","type":"untrennbar","examples":[{"context":"Präsens","de":"Ich verliere immer meine Brille.","ar":"دائماً أفقد نظارتي."},{"context":"Perfekt","de":"Wir haben das Spiel verloren.","ar":"خسرنا المباراة."},{"context":"Frage","de":"Hast du etwas verloren?","ar":"هل فقدت شيئاً؟"}]},{"infinitiv":"verkaufen","praeteritum":"verkaufte","partizip2":"verkauft","hilfsverb":"haben","ar":"يبيع","type":"untrennbar","examples":[{"context":"Präsens","de":"Sie verkauft ihr altes Auto.","ar":"تبيع سيارتها القديمة."},{"context":"Perfekt","de":"Wir haben das Haus letztes Jahr verkauft.","ar":"بعنا البيت السنة الماضية."},{"context":"Anzeige","de":"Verkaufe Sofa, gut erhalten.","ar":"للبيع: كنبة، حالة جيدة."}]},{"infinitiv":"erzählen","praeteritum":"erzählte","partizip2":"erzählt","hilfsverb":"haben","ar":"يحكي / يقصّ","type":"untrennbar","examples":[{"context":"Präsens","de":"Sie erzählt eine Geschichte.","ar":"هي تحكي قصة."},{"context":"Perfekt","de":"Hat er dir alles erzählt?","ar":"هل قصّ لك كل شيء؟"},{"context":"Bitte","de":"Erzähl mir von deinem Urlaub!","ar":"احكِ لي عن إجازتك!"}]},{"infinitiv":"gewinnen","praeteritum":"gewann","partizip2":"gewonnen","hilfsverb":"haben","ar":"يفوز / يربح","type":"untrennbar","examples":[{"context":"Präsens","de":"Wer gewinnt das Spiel?","ar":"من سيفوز بالمباراة؟"},{"context":"Perfekt","de":"Sie hat den ersten Preis gewonnen!","ar":"فازت بالجائزة الأولى!"},{"context":"Lotto","de":"Wenn ich gewinnen würde, …","ar":"لو ربحت..."}]},{"infinitiv":"empfehlen","praeteritum":"empfahl","partizip2":"empfohlen","hilfsverb":"haben","ar":"ينصح / يوصي","type":"untrennbar","examples":[{"context":"Präsens","de":"Ich empfehle dir dieses Buch.","ar":"أنصحك بهذا الكتاب."},{"context":"Perfekt","de":"Ein Freund hat mir den Arzt empfohlen.","ar":"صديق نصحني بالطبيب."},{"context":"Frage","de":"Was würden Sie empfehlen?","ar":"بماذا تنصح؟"}]},{"infinitiv":"entscheiden","praeteritum":"entschied","partizip2":"entschieden","hilfsverb":"haben","ar":"يقرّر","type":"untrennbar","examples":[{"context":"Reflexiv","de":"Ich habe mich entschieden, zu bleiben.","ar":"قرّرت البقاء."},{"context":"Frage","de":"Hast du dich schon entschieden?","ar":"هل قرّرت بعد؟"},{"context":"Modal","de":"Ich kann mich nicht entscheiden.","ar":"لا أستطيع أن أقرّر."}]},{"infinitiv":"besuchen","praeteritum":"besuchte","partizip2":"besucht","hilfsverb":"haben","ar":"يزور","type":"untrennbar","examples":[{"context":"Präsens","de":"Ich besuche meine Eltern jedes Wochenende.","ar":"أزور أهلي كل عطلة أسبوع."},{"context":"Perfekt","de":"Hast du Berlin schon besucht?","ar":"هل زرت برلين؟"},{"context":"Modal","de":"Ich möchte dich besuchen.","ar":"أودّ زيارتك."}]},{"infinitiv":"bezahlen","praeteritum":"bezahlte","partizip2":"bezahlt","hilfsverb":"haben","ar":"يدفع","type":"untrennbar","examples":[{"context":"Frage","de":"Wie möchten Sie bezahlen?","ar":"كيف تودّون الدفع؟"},{"context":"Perfekt","de":"Ich habe die Rechnung bezahlt.","ar":"دفعت الفاتورة."},{"context":"Modal","de":"Kann ich mit Karte bezahlen?","ar":"هل يمكنني الدفع بالبطاقة؟"}]},{"infinitiv":"gehören","praeteritum":"gehörte","partizip2":"gehört","hilfsverb":"haben","ar":"يخصّ / ملك لـ (+ Dativ)","type":"untrennbar","examples":[{"context":"Frage","de":"Wem gehört das Auto?","ar":"لمن السيارة؟"},{"context":"Antwort","de":"Das Auto gehört mir.","ar":"السيارة لي."},{"context":"Familie","de":"Du gehörst zu unserer Familie.","ar":"أنت من عائلتنا."}]},{"infinitiv":"erlauben","praeteritum":"erlaubte","partizip2":"erlaubt","hilfsverb":"haben","ar":"يسمح","type":"untrennbar","examples":[{"context":"Präsens","de":"Hier ist Rauchen nicht erlaubt.","ar":"التدخين هنا غير مسموح."},{"context":"Perfekt","de":"Mein Vater hat mir das erlaubt.","ar":"سمح لي والدي بذلك."},{"context":"Frage","de":"Darf ich? – Ja, das ist erlaubt.","ar":"هل يسمح لي؟ – نعم، مسموح."}]}]},{"id":"gemischt","titleAr":"أفعال تتغيّر معانيها (نفس الجذر مع بادئات مختلفة)","titleDe":"Gleicher Stamm – andere Bedeutung","intro":"تنبّه: نفس الجذر مع بادئة مختلفة قد يغيّر المعنى تماماً! تعلّم هذه المجموعات سويّاً.","verbs":[{"infinitiv":"kommen / ankommen / mitkommen / wiederkommen","praeteritum":"kam / kam an / kam mit / kam wieder","partizip2":"gekommen / angekommen / mitgekommen / wiedergekommen","hilfsverb":"sein","ar":"يأتي / يصل / يأتي مع / يعود","type":"gemischt","examples":[{"context":"kommen","de":"Komm her!","ar":"تعال إلى هنا!"},{"context":"ankommen","de":"Ich komme um 8 Uhr in Berlin an.","ar":"أصل إلى برلين الساعة 8."},{"context":"mitkommen","de":"Kommst du mit?","ar":"هل ستأتي معي؟"}]},{"infinitiv":"fahren / abfahren / mitfahren / hinfahren","praeteritum":"fuhr / fuhr ab / fuhr mit / fuhr hin","partizip2":"gefahren / abgefahren / mitgefahren / hingefahren","hilfsverb":"sein","ar":"يقود/يسافر / يغادر / يسافر مع / يذهب إلى هناك","type":"gemischt","examples":[{"context":"fahren","de":"Ich fahre nach Hamburg.","ar":"أسافر إلى هامبورغ."},{"context":"abfahren","de":"Der Bus fährt um 9 ab.","ar":"الباص يغادر الساعة 9."},{"context":"mitfahren","de":"Kann ich mit dir mitfahren?","ar":"هل أستطيع السفر معك؟"}]},{"infinitiv":"machen / aufmachen / zumachen / mitmachen / ausmachen","praeteritum":"machte / machte auf / machte zu / machte mit / machte aus","partizip2":"gemacht / aufgemacht / zugemacht / mitgemacht / ausgemacht","hilfsverb":"haben","ar":"يفعل / يفتح / يغلق / يشارك / يطفئ","type":"gemischt","examples":[{"context":"machen","de":"Was machst du?","ar":"ماذا تفعل؟"},{"context":"aufmachen","de":"Mach das Fenster auf!","ar":"افتح النافذة!"},{"context":"mitmachen","de":"Ich mache mit.","ar":"سأشارك."}]},{"infinitiv":"stehen / aufstehen / verstehen / bestehen","praeteritum":"stand / stand auf / verstand / bestand","partizip2":"gestanden / aufgestanden / verstanden / bestanden","hilfsverb":"haben","ar":"يقف / يستيقظ / يفهم / ينجح بـ (امتحان)","type":"gemischt","examples":[{"context":"aufstehen","de":"Ich stehe um 6 auf.","ar":"أستيقظ الساعة 6."},{"context":"verstehen","de":"Ich verstehe alles.","ar":"أفهم كل شيء."},{"context":"bestehen","de":"Sie hat die Prüfung bestanden!","ar":"نجحت في الامتحان!"}]}]}]'''));


final List<Map<String, dynamic>> satzbau = [{'id': 'l1-1', 'level': 1, 'tokens': ['Ich', 'lerne', 'jeden', 'Tag', 'Deutsch', '.'], 'ar': 'أتعلّم الألمانية كل يوم.', 'tipAr': 'في الجملة البسيطة: الفاعل (Ich) ثم الفعل المصرّف (lerne) ثم بقيّة المعلومات.'}, {'id': 'l1-2', 'level': 1, 'tokens': ['Mein', 'Bruder', 'wohnt', 'in', 'Berlin', '.'], 'ar': 'أخي يسكن في برلين.'}, {'id': 'l1-3', 'level': 1, 'tokens': ['Wir', 'gehen', 'morgen', 'ins', 'Kino', '.'], 'ar': 'نحن نذهب غداً إلى السينما.', 'tipAr': 'الزمن (morgen) يأتي عادة بعد الفعل وقبل المكان.'}, {'id': 'l1-4', 'level': 1, 'tokens': ['Sie', 'kauft', 'ein', 'neues', 'Auto', '.'], 'ar': 'هي تشتري سيّارة جديدة.'}, {'id': 'l1-5', 'level': 1, 'tokens': ['Heute', 'ist', 'das', 'Wetter', 'sehr', 'schön', '.'], 'ar': 'اليوم الطقس جميل جداً.', 'tipAr': 'لو بدأت بظرف زمان (Heute)، الفعل يبقى في الموقع الثاني.'}, {'id': 'l1-6', 'level': 1, 'tokens': ['Mein', 'Sohn', 'spielt', 'gern', 'Fußball', '.'], 'ar': 'ابني يحبّ لعب كرة القدم.'}, {'id': 'l1-7', 'level': 1, 'tokens': ['Am', 'Wochenende', 'besuche', 'ich', 'meine', 'Freunde', '.'], 'ar': 'في عطلة الأسبوع أزور أصدقائي.', 'tipAr': 'بعد ظرف الزمان (Am Wochenende) يأتي الفعل ثم الفاعل (انعكاس).'}, {'id': 'l2-1', 'level': 2, 'tokens': ['Ich', 'muss', 'heute', 'früh', 'aufstehen', '.'], 'ar': 'يجب أن أستيقظ مبكراً اليوم.', 'tipAr': 'مع الأفعال الناقصة (muss, will, kann …)، المصدر يذهب لآخر الجملة.'}, {'id': 'l2-2', 'level': 2, 'tokens': ['Er', 'kann', 'sehr', 'gut', 'Deutsch', 'sprechen', '.'], 'ar': 'هو يستطيع التحدّث بالألمانية جيّداً.'}, {'id': 'l2-3', 'level': 2, 'tokens': ['Wir', 'wollen', 'am', 'Sonntag', 'einen', 'Ausflug', 'machen', '.'], 'ar': 'نريد القيام برحلة يوم الأحد.'}, {'id': 'l2-4', 'level': 2, 'tokens': ['Ich', 'rufe', 'dich', 'morgen', 'an', '.'], 'ar': 'سأتّصل بك غداً.', 'tipAr': 'الفعل المنفصل (anrufen): تصرّفه (rufe) في الموقع الثاني، والبادئة (an) لآخر الجملة.'}, {'id': 'l2-5', 'level': 2, 'tokens': ['Der', 'Zug', 'fährt', 'um', '8', 'Uhr', 'ab', '.'], 'ar': 'القطار ينطلق الساعة الثامنة.', 'tipAr': 'abfahren فعل منفصل: ab تذهب لآخر الجملة.'}, {'id': 'l2-6', 'level': 2, 'tokens': ['Du', 'sollst', 'mehr', 'Wasser', 'trinken', '.'], 'ar': 'يجب أن تشرب ماءً أكثر.'}, {'id': 'l2-7', 'level': 2, 'tokens': ['Sie', 'darf', 'hier', 'nicht', 'rauchen', '.'], 'ar': 'لا يحقّ لها أن تدخّن هنا.'}, {'id': 'l2-8', 'level': 2, 'tokens': ['Wir', 'haben', 'gestern', 'einen', 'Film', 'gesehen', '.'], 'ar': 'شاهدنا فيلماً البارحة.', 'tipAr': 'في Perfekt: المساعد (haben/sein) في الموقع الثاني، Partizip II (gesehen) لآخر الجملة.'}, {'id': 'l2-9', 'level': 2, 'tokens': ['Ich', 'bin', 'um', '7', 'Uhr', 'aufgestanden', '.'], 'ar': 'استيقظت الساعة السابعة.', 'tipAr': 'aufstehen → بـ sein في Perfekt (يدلّ على حركة/تغيّر حالة).'}, {'id': 'l3-1', 'level': 3, 'tokens': ['Ich', 'lerne', 'Deutsch', ',', 'weil', 'ich', 'in', 'Deutschland', 'leben', 'will', '.'], 'ar': 'أتعلّم الألمانية لأنّي أريد العيش في ألمانيا.', 'tipAr': 'بعد weil: الفعل المصرّف يذهب لآخر الجملة الفرعيّة.'}, {'id': 'l3-2', 'level': 3, 'tokens': ['Sie', 'sagt', ',', 'dass', 'sie', 'müde', 'ist', '.'], 'ar': 'هي تقول إنّها متعبة.', 'tipAr': 'بعد dass: الفعل المصرّف (ist) في آخر الجملة.'}, {'id': 'l3-3', 'level': 3, 'tokens': ['Obwohl', 'es', 'regnet', ',', 'gehen', 'wir', 'spazieren', '.'], 'ar': 'رغم أنّها تمطر، نذهب للنزهة.', 'tipAr': 'لمّا تبدأ الجملة بـ obwohl، الفعل في الجملة الرئيسيّة (gehen) يأتي مباشرة بعد الفاصلة.'}, {'id': 'l3-4', 'level': 3, 'tokens': ['Ich', 'weiß', ',', 'dass', 'du', 'fleißig', 'arbeitest', '.'], 'ar': 'أعرف أنّك تعمل بجدّ.'}, {'id': 'l3-5', 'level': 3, 'tokens': ['Wenn', 'ich', 'Zeit', 'habe', ',', 'besuche', 'ich', 'meine', 'Eltern', '.'], 'ar': 'عندما يكون لديّ وقت، أزور والديّ.', 'tipAr': 'بعد wenn الفعل لآخر الجملة، وفي الرئيسيّة الفعل يأتي مباشرة بعد الفاصلة.'}, {'id': 'l3-6', 'level': 3, 'tokens': ['Er', 'hofft', ',', 'dass', 'er', 'die', 'Prüfung', 'besteht', '.'], 'ar': 'يأمل أن ينجح في الامتحان.'}, {'id': 'l3-7', 'level': 3, 'tokens': ['Ich', 'gehe', 'nicht', 'mit', ',', 'weil', 'ich', 'krank', 'bin', '.'], 'ar': 'لن أذهب معكم لأنّي مريض.'}, {'id': 'l3-8', 'level': 3, 'tokens': ['Bevor', 'ich', 'schlafe', ',', 'lese', 'ich', 'ein', 'Buch', '.'], 'ar': 'قبل أن أنام، أقرأ كتاباً.'}, {'id': 'l4-1', 'level': 4, 'tokens': ['Das', 'ist', 'der', 'Mann', ',', 'der', 'gestern', 'angerufen', 'hat', '.'], 'ar': 'هذا هو الرجل الذي اتّصل البارحة.', 'tipAr': 'في Relativsatz: الضمير (der) يطابق جنس وعدد الكلمة المرجعيّة، والفعل لآخر الجملة الفرعيّة.'}, {'id': 'l4-2', 'level': 4, 'tokens': ['Die', 'Frau', ',', 'die', 'ich', 'gesehen', 'habe', ',', 'ist', 'meine', 'Lehrerin', '.'], 'ar': 'المرأة التي رأيتها هي معلّمتي.', 'tipAr': 'die في الـ Akkusativ هنا (ich → habe gesehen → die Frau).'}, {'id': 'l4-3', 'level': 4, 'tokens': ['Das', 'Auto', ',', 'das', 'ich', 'gekauft', 'habe', ',', 'ist', 'sehr', 'schnell', '.'], 'ar': 'السيّارة التي اشتريتها سريعة جداً.'}, {'id': 'l4-4', 'level': 4, 'tokens': ['Wenn', 'ich', 'Geld', 'hätte', ',', 'würde', 'ich', 'eine', 'Reise', 'machen', '.'], 'ar': 'لو كان لديّ مال، لسافرت رحلة.', 'tipAr': 'Konjunktiv II: hätte + würde … machen — للتعبير عن المستحيل/الافتراضي.'}, {'id': 'l4-5', 'level': 4, 'tokens': ['Ich', 'freue', 'mich', ',', 'dass', 'du', 'gekommen', 'bist', '.'], 'ar': 'أنا سعيد لأنّك جئت.', 'tipAr': 'sich freuen + dass-Satz: الفعل المركّب (gekommen bist) لآخر الجملة الفرعيّة.'}, {'id': 'l4-6', 'level': 4, 'tokens': ['Er', 'arbeitet', 'in', 'der', 'Firma', ',', 'in', 'der', 'auch', 'sein', 'Vater', 'arbeitet', '.'], 'ar': 'يعمل في الشركة التي يعمل فيها أبوه أيضاً.', 'tipAr': 'مع حرف جرّ + Relativpronomen (in der …)، الفعل لآخر الجملة الفرعيّة.'}];

final List<Map<String, dynamic>> grammarLessons = [
  {
    'id': 1,
    'title': 'Akkusativ vs. Dativ',
    'titleAr': 'المفعول به مقابل المجرور',
    'explanation': 'الـAkkusativ يُجيب عن: wen? was? (مَن؟ ماذا؟) — المفعول به المباشر.\nالـDativ يُجيب عن: wem? (لمَن؟) — المفعول به غير المباشر.\n\nأدوات التعريف:\n• Akkusativ: den (m), die (f), das (n), die (pl)\n• Dativ: dem (m), der (f), dem (n), den+n (pl)\n\nأفعال مع Akkusativ: haben, brauchen, sehen, finden, kaufen\nأفعال مع Dativ: helfen, danken, gehören, gefallen, folgen',
    'examples': [
      {
        'de': 'Ich sehe den Mann. (Akkusativ)',
        'ar': 'أرى الرجل — مفعول به مباشر'
      },
      {
        'de': 'Ich helfe dem Mann. (Dativ)',
        'ar': 'أساعد الرجل — مفعول به غير مباشر'
      },
      {
        'de': 'Sie kauft einen Laptop.',
        'ar': 'هي تشتري لابتوب (Akk)'
      },
      {
        'de': 'Das Buch gehört dem Kind.',
        'ar': 'الكتاب يخصّ الطفل (Dat)'
      }
    ],
    'exercises': [
      {
        'question': 'Ich brauche ___ neuen Computer.',
        'options': [
          'einen (Akk)',
          'einem (Dat)'
        ],
        'correct': 0
      },
      {
        'question': 'Kannst du ___ Frau helfen?',
        'options': [
          'die (Akk)',
          'der (Dat)'
        ],
        'correct': 1
      },
      {
        'question': 'Ich schenke ___ Kind ein Buch.',
        'options': [
          'das (Akk)',
          'dem (Dat)'
        ],
        'correct': 1
      },
      {
        'question': 'Hast du ___ Schlüssel gefunden?',
        'options': [
          'den (Akk)',
          'dem (Dat)'
        ],
        'correct': 0
      }
    ]
  },
  {
    'id': 2,
    'title': 'Nebensätze mit weil, dass, obwohl',
    'titleAr': 'الجمل الثانوية',
    'explanation': 'في الجمل الثانوية (Nebensatz) الفعل يذهب للنهاية!\n\n• weil = لأنّ (سبب)\n• dass = أنّ (محتوى)\n• obwohl = بالرغم من (تناقض)\n• wenn = لو/عندما (شرط/زمن)\n• als = عندما (ماضي مرّة واحدة)\n\nالهيكل: Hauptsatz + Konnektor + ... + VERB',
    'examples': [
      {
        'de': 'Ich bleibe zu Hause, weil ich krank bin.',
        'ar': 'أبقى في البيت لأنّي مريض.'
      },
      {
        'de': 'Ich glaube, dass er recht hat.',
        'ar': 'أعتقد أنّه محقّ.'
      },
      {
        'de': 'Obwohl es regnet, gehe ich spazieren.',
        'ar': 'بالرغم من المطر، أمشي.'
      },
      {
        'de': 'Wenn ich Zeit habe, lese ich ein Buch.',
        'ar': 'لو عندي وقت، أقرأ كتاب.'
      }
    ],
    'exercises': [
      {
        'question': 'Ich lerne Deutsch, weil ich in Deutschland ___.',
        'options': [
          'lebe',
          'leben'
        ],
        'correct': 0
      },
      {
        'question': 'Er sagt, dass er morgen ___.',
        'options': [
          'kommt',
          'kommt er'
        ],
        'correct': 0
      },
      {
        'question': 'Obwohl sie müde ___, geht sie arbeiten.',
        'options': [
          'ist',
          'ist sie'
        ],
        'correct': 0
      }
    ]
  },
  {
    'id': 3,
    'title': 'Perfekt (Partizip II)',
    'titleAr': 'الماضي التام',
    'explanation': 'الـPerfekt هو الزمن الأكثر استخداماً للماضي في المحادثة.\n\nالهيكل: haben/sein + Partizip II\n\n• ge...t (أفعال منتظمة): machen → gemacht, kaufen → gekauft\n• ge...en (أفعال شاذّة): fahren → gefahren, schreiben → geschrieben\n• بدون ge-: أفعال بـbe-, er-, ver-, ent-: besuchen → besucht\n\nsein مع أفعال الحركة والتغيير:\ngehen → ist gegangen, fahren → ist gefahren, kommen → ist gekommen',
    'examples': [
      {
        'de': 'Ich habe gestern viel gearbeitet.',
        'ar': 'عملت كثيراً البارحة.'
      },
      {
        'de': 'Wir sind nach Berlin gefahren.',
        'ar': 'سافرنا إلى برلين.'
      },
      {
        'de': 'Er hat ein Buch gelesen.',
        'ar': 'قرأ كتاباً.'
      },
      {
        'de': 'Sie ist um 7 Uhr aufgestanden.',
        'ar': 'استيقظت الساعة 7.'
      }
    ],
    'exercises': [
      {
        'question': 'Ich ___ gestern ins Kino gegangen.',
        'options': [
          'habe',
          'bin'
        ],
        'correct': 1
      },
      {
        'question': 'Er ___ einen Brief geschrieben.',
        'options': [
          'hat',
          'ist'
        ],
        'correct': 0
      },
      {
        'question': 'Wir ___ Pizza bestellt. (bestellen → bestellt)',
        'options': [
          'haben',
          'sind'
        ],
        'correct': 0
      }
    ]
  },
  {
    'id': 4,
    'title': 'Modalverben im Präteritum',
    'titleAr': 'الأفعال الناقصة في الماضي البسيط',
    'explanation': 'الماضي البسيط للأفعال الناقصة (Präteritum der Modalverben) يُستخدم بكثرة في الحديث والكتابة لتسهيل صياغة الماضي مقارنة بالـ Perfekt.\n\nتصريف الأفعال في الماضي البسيط:\n• müssen → musste (وجب)\n• können → konnte (استطاع)\n• wollen → wollte (أراد)\n• sollen → sollte (ينبغي)\n• dürfen → durfte (سُمح له)\n• mögen → mochte (أحبّ)\n\nتنبيه: صيغة المفرد للغائب والمتكلم متشابهة تماماً: ich musste / er musste / sie musste.',
    'examples': [
      {
        'de': 'Gestern musste ich sehr lange arbeiten.',
        'ar': 'البارحة وجب عليّ العمل لوقت طويل جداً.'
      },
      {
        'de': 'Als Kind konnte ich nicht gut schwimmen.',
        'ar': 'عندما كنت طفلاً لم أكن أستطيع السباحة بشكل جيد.'
      },
      {
        'de': 'Wir wollten ins Kino gehen, aber es gab keine Tickets.',
        'ar': 'أردنا الذهاب إلى السينما، لكن لم تكن هناك تذاكر.'
      },
      {
        'de': 'Du solltest deinen Arzt anrufen.',
        'ar': 'كان ينبغي عليك الاتصال بطبيبك.'
      }
    ],
    'exercises': [
      {
        'question': 'Gestern ___ ich zum Arzt gehen, weil ich krank war.',
        'options': [
          'musste',
          'kannst',
          'wollte'
        ],
        'correct': 0
      },
      {
        'question': 'Als wir Kinder waren, ___ wir hier nicht spielen.',
        'options': [
          'durften',
          'sollen',
          'konnte'
        ],
        'correct': 0
      },
      {
        'question': '___ du gestern das Auto reparieren?',
        'options': [
          'Konntest',
          'Konnte',
          'Wolltest'
        ],
        'correct': 0
      }
    ]
  },
  {
    'id': 5,
    'title': 'Passiv im Präsens und Präteritum',
    'titleAr': 'المبني للمجهول',
    'explanation': 'يُركز المبني للمجهول (Passiv) على الحدث أو المفعول به بدلاً من الفاعل (من قام بالحدث).\n\nالهيكل في الحاضر (Präsens Passiv):\n• werden + Partizip II\nمثال: Das Auto wird repariert. (يتم إصلاح السيارة)\n\nالهيكل في الماضي البسيط (Präteritum Passiv):\n• wurden + Partizip II\nمثال: Das Auto wurde repariert. (تم إصلاح السيارة)\n\nإذا أردنا ذكر الفاعل الذي قام بالحدث، نستخدم حرف الجر von + Dativ:\n• Das Auto wird von dem Mechaniker repariert.',
    'examples': [
      {
        'de': 'Das Essen wird frisch gekocht.',
        'ar': 'الطعام يتم طهيه طازجاً.'
      },
      {
        'de': 'Die Hausaufgabe wurde gestern geschrieben.',
        'ar': 'الواجب كُتب البارحة.'
      },
      {
        'de': 'Hier wird viel Deutsch gesprochen.',
        'ar': 'هنا يُتحدث الكثير من الألمانية.'
      },
      {
        'de': 'Das Haus wurde im Jahr 2020 gebaut.',
        'ar': 'البيت بُني في عام 2020.'
      }
    ],
    'exercises': [
      {
        'question': 'Das Fahrrad ___ heute repariert.',
        'options': [
          'wird',
          'ist',
          'wurde'
        ],
        'correct': 0
      },
      {
        'question': 'Die Briefe ___ gestern geschickt.',
        'options': [
          'wurden',
          'werden',
          'war'
        ],
        'correct': 0
      },
      {
        'question': 'Der Kuchen wird ___ meiner Mutter gebacken.',
        'options': [
          'von',
          'durch',
          'mit'
        ],
        'correct': 0
      }
    ]
  },
  {
    'id': 6,
    'title': 'Relativsätze im Nominativ, Akkusativ und Dativ',
    'titleAr': 'الجمل الموصولة',
    'explanation': 'تُستخدم الجمل الموصولة (Relativsätze) لوصف اسم معين بدقة وتفصيل دون تكراره، وهي جمل فرعية يذهب الفعل المصرّف فيها للنهاية.\n\nتعتمد أداة الوصل (Relativpronomen) على جنس الكلمة الموصوفة وحالتها الإعرابية:\n• Nominativ (فاعل الوصل): der (m), die (f), das (n), die (pl)\n• Akkusativ (مفعول الوصل): den (m), die (f), das (n), die (pl)\n• Dativ (مجرور الوصل): dem (m), der (f), dem (n), denen (pl)\n\nأمثلة:\n• der Mann, der hier wohnt (الرجل الذي يسكن هنا)\n• der Mann, den ich kenne (الرجل الذي أعرفه)\n• der Mann, dem ich helfe (الرجل الذي أساعده)',
    'examples': [
      {
        'de': 'Das ist die Frau, die neben mir wohnt.',
        'ar': 'هذه هي المرأة التي تسكن بجانبي.'
      },
      {
        'de': 'Das Buch, das ich gekauft habe, ist sehr gut.',
        'ar': 'الكتاب الذي اشتريته جيد جداً.'
      },
      {
        'de': 'Das sind die Kinder, denen ich geholfen habe.',
        'ar': 'هؤلاء هم الأطفال الذين ساعدتهم.'
      },
      {
        'de': 'Der Kollege, den ich gestern angerufen habe, kommt heute.',
        'ar': 'الزميل الذي اتصلت به البارحة يأتي اليوم.'
      }
    ],
    'exercises': [
      {
        'question': 'Die Frau, ___ dort steht, ist meine Lehrerin.',
        'options': [
          'die',
          'der',
          'den'
        ],
        'correct': 0
      },
      {
        'question': 'Das Auto, ___ ich fahre, ist sehr schnell.',
        'options': [
          'das',
          'dem',
          'den'
        ],
        'correct': 0
      },
      {
        'question': 'Der Freund, ___ ich geholfen habe, wohnt in Berlin.',
        'options': [
          'dem',
          'den',
          'der'
        ],
        'correct': 0
      }
    ]
  },
  {
    'id': 7,
    'title': 'Konjunktiv II (Wunsch, Bitte, Hypothese)',
    'titleAr': 'صيغة التمني والطلب المهذب والافتراض',
    'explanation': 'تُستخدم صيغة Konjunktiv II للتعبير عن الأشياء غير الحقيقية، التمنيات، الفرضيات، أو لصياغة طلب مهذب جداً.\n\nالتركيب الأكثر شيوعاً للأفعال العادية:\n• würde + Infinitiv (في نهاية الجملة)\nمثال: Ich würde reisen. (كنت سأسافر)\n\nالأفعال haben و sein والأفعال الناقصة لها أشكالها الخاصة:\n• haben → hätte (لو كان عندي)\n• sein → wäre (لو كنت)\n• können → könnte (لو كان بإمكاني)',
    'examples': [
      {
        'de': 'Wenn ich Zeit hätte, würde ich Deutsch lernen.',
        'ar': 'لو كان لديّ وقت، لكنت تعلّمت الألمانية.'
      },
      {
        'de': 'Wenn ich reich wäre, würde ich ein neues Auto kaufen.',
        'ar': 'لو كنت غنياً، لكنت اشتريت سيارة جديدة.'
      },
      {
        'de': 'Könnten Sie mir bitte helfen?',
        'ar': 'هل كان بإمكانكم مساعدتي من فضلكم؟ (طلب مهذب)'
      },
      {
        'de': 'Ich hätte gern eine Tasse Kaffee.',
        'ar': 'أرغب بفنجان من القهوة من فضلك.'
      }
    ],
    'exercises': [
      {
        'question': 'Wenn ich mehr Geld ___ , würde ich ein Haus kaufen.',
        'options': [
          'hätte',
          'wäre',
          'habe'
        ],
        'correct': 0
      },
      {
        'question': '___ du mir bitte das Salz geben?',
        'options': [
          'Würdest',
          'Hättest',
          'Wäre'
        ],
        'correct': 0
      },
      {
        'question': 'Ich ___ gern einen Apfelsaft.',
        'options': [
          'hätte',
          'wäre',
          'würde'
        ],
        'correct': 0
      }
    ]
  },
  {
    'id': 8,
    'title': 'Präpositionen mit Akkusativ und Dativ',
    'titleAr': 'حروف الجر مع النصب والمجرور',
    'explanation': 'تنقسم حروف الجر في اللغة الألمانية إلى ثلاثة أقسام رئيسية:\n\n1. حروف جر مع Akkusativ دائماً: für, gegen, ohne, durch, um, bis.\n2. حروف جر مع Dativ دائماً: mit, nach, von, zu, aus, bei, seit, gegenüber.\n3. حروف الجر المشتركة (Wechselpräpositionen) التي تأخذ Dativ عند السكون (Wo?) و Akkusativ عند الحركة (Wohin?):\n• in, an, auf, unter, über, vor, hinter, neben, zwischen.',
    'examples': [
      {
        'de': 'Ich fahre mit dem Auto. (Dativ)',
        'ar': 'أنا أسافر بالسيارة.'
      },
      {
        'de': 'Das Geschenk ist für meinen Freund. (Akkusativ)',
        'ar': 'الهدية من أجل صديقي.'
      },
      {
        'de': 'Ich lege das Buch auf den Tisch. (Wohin? -> Akkusativ)',
        'ar': 'أنا أضع الكتاب على الطاولة (حركة).'
      },
      {
        'de': 'Das Buch liegt auf dem Tisch. (Wo? -> Dativ)',
        'ar': 'الكتاب يقع على الطاولة (سكون).'
      }
    ],
    'exercises': [
      {
        'question': 'Ich gehe ohne ___ Freund ins Kino.',
        'options': [
          'meinen (Akk)',
          'meinem (Dat)',
          'mein (Nom)'
        ],
        'correct': 0
      },
      {
        'question': 'Er sitzt an ___ Tisch. (der Tisch - Wo?)',
        'options': [
          'dem',
          'den',
          'das'
        ],
        'correct': 0
      },
      {
        'question': 'Wir fahren nach ___ Schule nach Hause.',
        'options': [
          'der',
          'die',
          'den'
        ],
        'correct': 0
      }
    ]
  }
,
  {
  'id': 9,
  'title': 'Verben mit Präpositionen',
  'titleAr': 'الأفعال مع حروف الجر',
  'explanation': 'في اللغة الألمانية، ترتبط العديد من الأفعال بحروف جر معينة، وتأتي بعدها إما حالة النصب (Akkusativ) أو المجرور (Dativ). من المهم جداً حفظ الفعل مع حرف الجر والحالة الإعرابية الخاصة به.\n\nأشهر الأفعال وحروف الجر:\n• warten auf + Akkusativ (ينتظر)\n• sich freuen auf + Akkusativ (يتطلع بشوق لشيء في المستقبل)\n• sich freuen über + Akkusativ (يسعد بشيء حدث في الحاضر/الماضي)\n• denken an + Akkusativ (يفكر في)\n• sprechen mit + Dativ / über + Akkusativ (يتحدث مع / عن)\n• träumen von + Dativ (يحلم بـ)',
  'examples': [
    {
      'de': 'Ich warte auf den Bus. (Akkusativ)',
      'ar': 'أنا أنتظر الباص.'
    },
    {
      'de': 'Ich freue mich auf die Ferien. (Akkusativ)',
      'ar': 'أنا أتطلع بشوق إلى العطلة.'
    },
    {
      'de': 'Wir sprechen mit dem Lehrer. (Dativ)',
      'ar': 'نحن نتحدث مع المعلم.'
    },
    {
      'de': 'Er träumt von einem großen Haus. (Dativ)',
      'ar': 'هو يحلم ببيت كبير.'
    }
  ],
  'exercises': [
    {
      'question': 'Ich freue mich ___ das Geschenk. (das Geschenk - Akk)',
      'options': [
        'über',
        'von',
        'an'
      ],
      'correct': 0
    },
    {
      'question': 'Träumst du ___ einem neuen Auto? (Dativ)',
      'options': [
        'von',
        'auf',
        'über'
      ],
      'correct': 0
    },
    {
      'question': 'Denkst du an ___ Vater? (der Vater - Akk)',
      'options': [
        'deinen',
        'deinem',
        'dein'
      ],
      'correct': 0
    }
  ]
},
  {
  'id': 10,
  'title': 'Infinitiv mit zu',
  'titleAr': 'المصدر مع zu',
  'explanation': 'تُستخدم صيغة المصدر مع zu عندما تعتمد الجملة الثانية على فعل أو صفة أو اسم في الجملة الأولى. يأتي تركيب zu + Infinitiv دائماً في نهاية الجملة.\n\nملاحظات هامة:\n• إذا كان الفعل منفصلاً، تدخل zu بين البادئة والجذر: aufstehen → aufzustehen.\n• أفعال لا تأخذ zu أبداً: الأفعال الناقصة (Modalverben)، الفعل bleiben، gehen، sehen، hören.',
  'examples': [
    {
      'de': 'Es ist wichtig, jeden Tag Deutsch zu lernen.',
      'ar': 'من المهم تعلم الألمانية كل يوم.'
    },
    {
      'de': 'Ich habe keine Lust, heute einkaufen zu gehen.',
      'ar': 'ليس لدي رغبة في الذهاب للتسوق اليوم.'
    },
    {
      'de': 'Er versucht, heute früher aufzustehen.',
      'ar': 'هو يحاول الاستيقاظ باكراً اليوم.'
    },
    {
      'de': 'Ich muss heute viel arbeiten. (بدون zu لأن muss فعل ناقص)',
      'ar': 'يجب أن أعمل كثيراً اليوم.'
    }
  ],
  'exercises': [
    {
      'question': 'Ich habe vor, ein neues Auto ___ kaufen.',
      'options': [
        'zu',
        'um',
        'ohne'
      ],
      'correct': 0
    },
    {
      'question': 'Es macht Spaß, Deutsch ___ sprechen.',
      'options': [
        'zu',
        'für',
        'um'
      ],
      'correct': 0
    },
    {
      'question': 'Ich kann heute nicht ___ kommen.',
      'options': [
        'بدون zu',
        'zu',
        'zu kommen'
      ],
      'correct': 0
    }
  ]
},
  {
  'id': 11,
  'title': 'Adjektivdeklination',
  'titleAr': 'تصريف الصفات قبل الأسماء',
  'explanation': 'عندما تأتي الصفة قبل الاسم مباشرة، يجب تصريف نهايتها لتطابق جنس الاسم (مذكر، مؤنث، محايد، جمع) وحالته الإعرابية ونوع الأداة المسبوقة.\n\nالقاعدة بعد أداة التنكير (ein/kein/mein) في حالة الرفع (Nominativ):\n• المذكر: -er (ein guter Mann)\n• المؤنث: -e (eine nette Frau)\n• المحايد: -es (ein schönes Kind)\n\nتنبيه: في حالة المجرور (Dativ) وحالة النصب للمذكر (Akkusativ)، تنتهي الصفة دائماً بـ -en.',
  'examples': [
    {
      'de': 'Das ist ein schöner Tag. (Nominativ Masculine)',
      'ar': 'هذا يوم جميل.'
    },
    {
      'de': 'Ich habe eine nette Nachbarin. (Nominativ Feminine)',
      'ar': 'لدي جارة لطيفة.'
    },
    {
      'de': 'Wir wohnen in einem kleinen Haus. (Dativ)',
      'ar': 'نحن نسكن في بيت صغير.'
    },
    {
      'de': 'Er tr一杯 einen heißen Kaffee. (Akkusativ Masculine)',
      'ar': 'هو يشرب قهوة ساخنة.'
    }
  ],
  'exercises': [
    {
      'question': 'Ich trinke einen ___ Tee. (der Tee - Akk)',
      'options': [
        'heißen',
        'heißer',
        'heiße'
      ],
      'correct': 0
    },
    {
      'question': 'Sie ist eine ___ Frau.',
      'options': [
        'schöne',
        'schöner',
        'schönes'
      ],
      'correct': 0
    },
    {
      'question': 'Das ist ein ___ Auto. (das Auto - Nom)',
      'options': [
        'schnelles',
        'schnelle',
        'schneller'
      ],
      'correct': 0
    }
  ]
},
  {
  'id': 12,
  'title': 'Zweiteilige Konjunktionen',
  'titleAr': 'حروف العطف المزدوجة',
  'explanation': 'تُستخدم روابط العطف المزدوجة لربط الأفكار والجمل بطريقة متطورة:\n\n• nicht nur ... sondern auch: ليس فقط ... بل وأيضاً (للجمع بين أمرين إيجابيين).\n• entweder ... oder: إما ... أو (للاختيار بين أمرين).\n• sowohl ... als auch: كلاهما معاً (الجمع التام).\n• weder ... noch: لا هذا ولا ذاك (النفي المزدوج).\n• einerseits ... andererseits: من ناحية ... ومن ناحية أخرى (المقارنة والتناقض).',
  'examples': [
    {
      'de': 'Er spricht nicht nur Deutsch, sondern auch Englisch.',
      'ar': 'هو لا يتحدث الألمانية فقط، بل والإنجليزية أيضاً.'
    },
    {
      'de': 'Entweder wir gehen ins Kino oder wir bleiben zu Hause.',
      'ar': 'إما أن نذهب إلى السينما أو نبقى في البيت.'
    },
    {
      'de': 'Das Kleid ist weder schön noch billig.',
      'ar': 'الفستان ليس جميلاً ولا رخيصاً.'
    },
    {
      'de': 'Ich trinke sowohl Tee als auch Kaffee.',
      'ar': 'أنا أشرب الشاي والقهوة كلاهما.'
    }
  ],
  'exercises': [
    {
      'question': 'Ich möchte ___ Pizza oder Pasta essen.',
      'options': [
        'entweder',
        'weder',
        'nicht nur'
      ],
      'correct': 0
    },
    {
      'question': 'Sie lernt ___ Deutsch als auch Englisch.',
      'options': [
        'sowohl',
        'nicht nur',
        'entweder'
      ],
      'correct': 0
    },
    {
      'question': 'Er ist ___ nett noch hilfsbereit.',
      'options': [
        'weder',
        'entweder',
        'sowohl'
      ],
      'correct': 0
    }
  ]
},
  {
  'id': 13,
  'title': 'n-Deklination',
  'titleAr': 'تصريف الأسماء المذكرة بـ n',
  'explanation': 'هناك مجموعة خاصة من الأسماء المذكرة (ومعظمها ينتهي بـ -e أو يدل على أشخاص/مهن) تأخذ نهاية -n أو -en في جميع الحالات الإعرابية (Akkusativ, Dativ, Genitiv) ما عدا حالة الرفع (Nominativ).\n\nأمثلة على هذه الأسماء:\n• der Name (الاسم) → des Namens\n• der Kollege (الزميل) → den Kollegen\n• der Kunde (الزبون) → dem Kunden\n• der Junge (الولد) → den Jungen\n• der Mensch (الإنسان) → dem Menschen',
  'examples': [
    {
      'de': 'Der Kollege kommt heute. (Nominativ)',
      'ar': 'الزميل يأتي اليوم.'
    },
    {
      'de': 'Ich rufe den Kollegen an. (Akkusativ)',
      'ar': 'أنا أتصل بالزميل.'
    },
    {
      'de': 'Ich helfe dem Jungen. (Dativ)',
      'ar': 'أنا أساعد الولد.'
    },
    {
      'de': 'Das هو اسم الرجل: der Name des Menschen. (Genitiv)',
      'ar': 'هذا هو اسم الشخص.'
    }
  ],
  'exercises': [
    {
      'question': 'Ich kenne diesen ___ . (der Kunde)',
      'options': [
        'Kunden',
        'Kunde',
        'Kundes'
      ],
      'correct': 0
    },
    {
      'question': 'Wie ist der Name des ___ ? (der Junge)',
      'options': [
        'Jungen',
        'Junge',
        'Junges'
      ],
      'correct': 0
    },
    {
      'question': 'Er spricht mit dem ___ . (der Kollege)',
      'options': [
        'Kollegen',
        'Kollege',
        'Kollegis'
      ],
      'correct': 0
    }
  ]
},
  {
  'id': 14,
  'title': 'Futur I',
  'titleAr': 'زمن المستقبل البسيط',
  'explanation': 'يُستخدم زمن المستقبل البسيط (Futur I) للتعبير عن أحداث ستقع في المستقبل، أو للتعبير عن وعود (Versprechen)، أو توقعات (Vermutung).\n\nصياغة الزمن:\n• werden (مصرّف في الموقع الثاني) + Infinitiv (فعل المصدر في نهاية الجملة).\n\nتصريف werden:\n• ich werde / du wirst / er wird / wir werden / ihr werdet / sie werden.',
  'examples': [
    {
      'de': 'Nächstes Jahr werde ich nach Deutschland reisen.',
      'ar': 'السنة القادمة سأسافر إلى ألمانيا.'
    },
    {
      'de': 'Morgen wird es regnen.',
      'ar': 'غداً سوف تمطر (توقع).'
    },
    {
      'de': 'Ich werde dir bei den Hausaufgaben helfen.',
      'ar': 'سأساعدك في الواجبات المنزلية (وعد).'
    }
  ],
  'exercises': [
    {
      'question': 'Morgen ___ wir eine Prüfung schreiben.',
      'options': [
        'werden',
        'wirst',
        'wird'
      ],
      'correct': 0
    },
    {
      'question': 'Er ___ nächstes Jahr eine Ausbildung machen.',
      'options': [
        'wird',
        'werde',
        'werden'
      ],
      'correct': 0
    },
    {
      'question': 'Du wirst das ___ . (schaffen)',
      'options': [
        'schaffen',
        'geschafft',
        'zu schaffen'
      ],
      'correct': 0
    }
  ]
}
];
