import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FoodItem {
  id: number;
  german: string;
  arabic: string;
  emoji: string;
  category: string;
  description: string;
}

interface RestaurantPhrase {
  german: string;
  arabic: string;
}

const categories = ['الكل', 'الإفطار', 'الغداء', 'العشاء', 'المشروبات', 'الحلويات', 'في المطعم'];

const foodItems: FoodItem[] = [
  // الإفطار
  { id: 1, german: 'Brötchen', arabic: 'خبز صغير مستدير', emoji: '🥖', category: 'الإفطار', description: 'خبز صغير مقرمش يؤكل في وجبة الإفطار مع الزبدة أو المربى' },
  { id: 2, german: 'Butter', arabic: 'زبدة', emoji: '🧈', category: 'الإفطار', description: 'زبدة طازجة تُدهن على الخبز في وجبة الصباح' },
  { id: 3, german: 'Marmelade', arabic: 'مربى', emoji: '🍓', category: 'الإفطار', description: 'مربى الفراولة أو التوت شائعة جداً في الإفطار الألماني' },
  { id: 4, german: 'Müsli', arabic: 'موسلي - حبوب الإفطار', emoji: '🥣', category: 'الإفطار', description: 'خليط من الشوفان والمكسرات والفواكه المجففة مع الحليب' },
  { id: 5, german: 'Rührei', arabic: 'بيض مخفوق', emoji: '🍳', category: 'الإفطار', description: 'بيض مخفوق مطهو في المقلاة مع الزبدة' },
  { id: 6, german: 'Spiegelei', arabic: 'بيض مقلي', emoji: '🍳', category: 'الإفطار', description: 'بيضة مقلية كاملة دون خلط الصفار' },
  { id: 7, german: 'Weisswurst', arabic: 'نقانق بيضاء بافارية', emoji: '🌭', category: 'الإفطار', description: 'نقانق بيضاء بافارية تقليدية تُؤكل في الإفطار مع خردل حلو' },
  { id: 8, german: 'Schwarzbrot', arabic: 'خبز أسمر داكن', emoji: '🍞', category: 'الإفطار', description: 'خبز الجاودار الداكن الكثيف والمغذي، أساس الإفطار الألماني' },
  { id: 9, german: 'Käse', arabic: 'جبن', emoji: '🧀', category: 'الإفطار', description: 'تشكيلة واسعة من الجبن الألماني تُقدَّم مع الخبز في الإفطار' },
  { id: 10, german: 'Aufschnitt', arabic: 'شرائح اللحم المقطعة', emoji: '🥩', category: 'الإفطار', description: 'شرائح رقيقة من اللحم المطهو تُقدَّم مع الخبز في الإفطار' },
  { id: 11, german: 'Joghurt', arabic: 'زبادي', emoji: '🥛', category: 'الإفطار', description: 'زبادي طازج يُقدَّم أحياناً مع الفاكهة في وجبة الإفطار' },
  { id: 12, german: 'Honig', arabic: 'عسل', emoji: '🍯', category: 'الإفطار', description: 'عسل طبيعي يُدهن على الخبز بديلاً عن المربى' },
  // الغداء
  { id: 13, german: 'Schnitzel', arabic: 'شنيتزل - قطعة لحم مقلية', emoji: '🥩', category: 'الغداء', description: 'شريحة لحم عجل أو دجاج مغطاة ببقسماط ومقلية حتى الذهبي' },
  { id: 14, german: 'Bratwurst', arabic: 'نقانق مشوية', emoji: '🌭', category: 'الغداء', description: 'نقانق لحم مشوية على الفحم، من أشهر الأكلات الألمانية في المهرجانات' },
  { id: 15, german: 'Sauerkraut', arabic: 'ملفوف مخلل', emoji: '🥬', category: 'الغداء', description: 'ملفوف أبيض مخمر بالملح، يُقدَّم مع النقانق واللحوم كطبق جانبي' },
  { id: 16, german: 'Kartoffeln', arabic: 'بطاطا', emoji: '🥔', category: 'الغداء', description: 'البطاطا أساس المطبخ الألماني وتُقدَّم بأشكال عديدة: مسلوقة، مهروسة، مقلية' },
  { id: 17, german: 'Kartoffelsalat', arabic: 'سلطة البطاطا', emoji: '🥗', category: 'الغداء', description: 'سلطة بطاطا مسلوقة مع خل أو مايونيز وبصل، طبق مرافق شهير' },
  { id: 18, german: 'Sauerbraten', arabic: 'لحم منقوع في الخل', emoji: '🍖', category: 'الغداء', description: 'لحم بقري منقوع في محلول الخل لأيام ثم مطهو ببطء، طبق تقليدي' },
  { id: 19, german: 'Leberkäse', arabic: 'كيكة الكبدة', emoji: '🍖', category: 'الغداء', description: 'خليط من اللحم المفروم المطهو على شكل رغيف، يُقدَّم في الشارع في برقر صغير' },
  { id: 20, german: 'Döner Kebab', arabic: 'دونر كباب', emoji: '🥙', category: 'الغداء', description: 'لحم مشوي على سيخ دوار يُقدَّم في خبز مع خضروات وصلصة، شائع جداً في ألمانيا' },
  { id: 21, german: 'Currywurst', arabic: 'نقانق بصلصة الكاري', emoji: '🌭', category: 'الغداء', description: 'نقانق مقطعة تُغطى بصلصة الطماطم مع مسحوق الكاري، أيقونة برلين' },
  { id: 22, german: 'Gulasch', arabic: 'جولاش - يخنة اللحم بالبهارات', emoji: '🍲', category: 'الغداء', description: 'يخنة لحم بقري مع بصل وفلفل حلو وبهارات، أصلها هنغاري وشائعة في ألمانيا' },
  { id: 23, german: 'Eintopf', arabic: 'طاجن الخضروات واللحم', emoji: '🥘', category: 'الغداء', description: 'طبق شتوي يُطهى فيه اللحم والخضروات والبقوليات معاً في وعاء واحد' },
  { id: 24, german: 'Erbsensuppe', arabic: 'حساء البازلاء', emoji: '🍵', category: 'الغداء', description: 'حساء البازلاء الأخضر الكثيف مع لحم مدخن، طبق شتوي دافئ' },
  { id: 25, german: 'Rindfleisch', arabic: 'لحم البقر', emoji: '🥩', category: 'الغداء', description: 'لحم بقري يُستخدم في أطباق متنوعة كالجولاش والشواء والحساء' },
  { id: 26, german: 'Flammkuchen', arabic: 'فطيرة ألزاسية', emoji: '🍕', category: 'الغداء', description: 'عجينة رفيعة مغطاة بكريمة وبصل ولحم مدخن، أصلها من منطقة ألزاس' },
  { id: 27, german: 'Maultaschen', arabic: 'معكرونة محشوة ألمانية', emoji: '🥟', category: 'الغداء', description: 'معكرونة كبيرة محشوة باللحم أو السبانخ أو الجبن، تخصص شوابي' },
  { id: 28, german: 'Linsensuppe', arabic: 'حساء العدس', emoji: '🍜', category: 'الغداء', description: 'حساء العدس البني الكثيف مع الخضروات والتوابل، محبوب في الشتاء' },
  // العشاء
  { id: 29, german: 'Brezel', arabic: 'بريتسل - خبز على شكل عقدة', emoji: '🥨', category: 'العشاء', description: 'خبز مقرمش على شكل عقدة مرشوش بالملح الخشن، رمز ألمانيا الشهير' },
  { id: 30, german: 'Abendbrot', arabic: 'عشاء الخبز', emoji: '🥪', category: 'العشاء', description: 'وجبة عشاء ألمانية تقليدية تتكون من الخبز مع الجبن والشرائح الباردة' },
  { id: 31, german: 'Brotzeit', arabic: 'وقت الخبز - وجبة خفيفة بافارية', emoji: '🧀', category: 'العشاء', description: 'وجبة خفيفة بافارية مؤلفة من خبز وجبن ونقانق وفجل ومخللات' },
  { id: 32, german: 'Käsespätzle', arabic: 'معكرونة بالجبن الألماني', emoji: '🍝', category: 'العشاء', description: 'شعيرية دقيقة تقليدية مع جبن ممزوج وبصل مقلي فوقها' },
  { id: 33, german: 'Fischstäbchen', arabic: 'أصابع السمك', emoji: '🐟', category: 'العشاء', description: 'قطع سمك مغطاة ببقسماط ومقلية، شائعة كعشاء خفيف خاصة للأطفال' },
  { id: 34, german: 'Würstchen', arabic: 'نقانق صغيرة مسلوقة', emoji: '🌭', category: 'العشاء', description: 'نقانق صغيرة مسلوقة تُقدَّم مع خردل وخبز في العشاء' },
  { id: 35, german: 'Matjes', arabic: 'رنجة مملحة', emoji: '🐟', category: 'العشاء', description: 'سمك الرنجة الأبيض المملح يُقدَّم مع بصل وخيار في شمال ألمانيا' },
  { id: 36, german: 'Blutwurst', arabic: 'نقانق الدم', emoji: '🥩', category: 'العشاء', description: 'نقانق تقليدية مصنوعة من الدم والدهون تُؤكل باردة أو مقلية' },
  // المشروبات
  { id: 37, german: 'Bier', arabic: 'بيرة', emoji: '🍺', category: 'المشروبات', description: 'المشروب الوطني الألماني، ألمانيا من أكبر منتجي البيرة في العالم' },
  { id: 38, german: 'Wasser', arabic: 'ماء', emoji: '💧', category: 'المشروبات', description: 'ماء عادي أو غازي (Mineralwasser)، لا تتفاجأ من فاتورة الماء في المطعم' },
  { id: 39, german: 'Kaffee', arabic: 'قهوة', emoji: '☕', category: 'المشروبات', description: 'القهوة مشروب أساسي في ألمانيا، ويُقدَّم بأنواع متعددة في المقاهي' },
  { id: 40, german: 'Tee', arabic: 'شاي', emoji: '🫖', category: 'المشروبات', description: 'الشاي محبوب في ألمانيا خاصة في الشتاء، يُقدَّم بأنواع كثيرة' },
  { id: 41, german: 'Saft', arabic: 'عصير فاكهة', emoji: '🍊', category: 'المشروبات', description: 'عصير فاكهة طازج أو معبأ، الأكثر شيوعاً هو عصير التفاح (Apfelsaft)' },
  { id: 42, german: 'Apfelschorle', arabic: 'عصير تفاح غازي', emoji: '🍎', category: 'المشروبات', description: 'خليط من عصير التفاح ومياه غازية، من أكثر المشروبات شعبية في ألمانيا' },
  { id: 43, german: 'Milch', arabic: 'حليب', emoji: '🥛', category: 'المشروبات', description: 'حليب طازج متوفر بأنواع مختلفة من حيث نسبة الدسم' },
  { id: 44, german: 'Wein', arabic: 'نبيذ', emoji: '🍷', category: 'المشروبات', description: 'ألمانيا من دول النبيذ المشهورة، خاصة منطقتا الراين والموزيل' },
  { id: 45, german: 'Sprudel', arabic: 'ماء غازي', emoji: '🫧', category: 'المشروبات', description: 'مياه معدنية غازية شائعة جداً في ألمانيا على عكس كثير من الدول' },
  { id: 46, german: 'Limonade', arabic: 'ليمونادة غازية', emoji: '🍋', category: 'المشروبات', description: 'مشروب غازي بنكهة الليمون أو الفاكهة، مشروب شعبي خاصة في الصيف' },
  { id: 47, german: 'Kakao', arabic: 'كاكاو بالحليب', emoji: '🍫', category: 'المشروبات', description: 'مشروب الشوكولاتة الساخنة المحبوب خاصة في أيام الشتاء الباردة' },
  { id: 48, german: 'Glühwein', arabic: 'نبيذ ساخن بالبهارات', emoji: '🍵', category: 'المشروبات', description: 'نبيذ ساخن بالقرفة والفانيليا والبهارات، من مشروبات أسواق عيد الميلاد' },
  // الحلويات
  { id: 49, german: 'Apfelstrudel', arabic: 'فطيرة التفاح', emoji: '🥧', category: 'الحلويات', description: 'فطيرة تفاح لفافة بعجينة رقيقة مع قرفة وزبيب، حلوى جنوب ألمانيا الشهيرة' },
  { id: 50, german: 'Schwarzwälder Kirschtorte', arabic: 'تورتة الغابة السوداء', emoji: '🎂', category: 'الحلويات', description: 'تورتة شوكولاتة مشهورة مع كريمة الشانتيه وكرز مخلل، من منطقة الغابة السوداء' },
  { id: 51, german: 'Lebkuchen', arabic: 'كعك التوابل الألماني', emoji: '🍪', category: 'الحلويات', description: 'كعك ناعم بالعسل والتوابل والمكسرات، أيقونة أسواق عيد الميلاد الألمانية' },
  { id: 52, german: 'Stollen', arabic: 'كعكة عيد الميلاد', emoji: '🍞', category: 'الحلويات', description: 'خبز حلو تقليدي بالفواكه المجففة والمكسرات، يُصنع في عيد الميلاد' },
  { id: 53, german: 'Bienenstich', arabic: 'تورتة لسعة النحلة', emoji: '🍰', category: 'الحلويات', description: 'كعكة بالكريمة الفانيليا وطبقة علوية من اللوز المكرمل والعسل' },
  { id: 54, german: 'Mohnkuchen', arabic: 'كعكة الخشخاش', emoji: '🫘', category: 'الحلويات', description: 'كعكة بحشوة الخشخاش الطازجة مع السكر والليمون، شائعة في أنحاء ألمانيا' },
  { id: 55, german: 'Pfannkuchen', arabic: 'فطائر رقيقة', emoji: '🥞', category: 'الحلويات', description: 'فطائر رقيقة تُقدَّم مع مربى أو شوكولاتة أو مع لحم مدخن وجبن' },
  { id: 56, german: 'Waffel', arabic: 'وافل', emoji: '🧇', category: 'الحلويات', description: 'وافل طازج بالكريمة والفراولة شائع في الشوارع والمقاهي' },
  { id: 57, german: 'Eis', arabic: 'آيس كريم', emoji: '🍦', category: 'الحلويات', description: 'المثلجات الإيطالية (Gelato) شائعة جداً في ألمانيا في الصيف' },
  { id: 58, german: 'Marzipan', arabic: 'مرزبان - حلوى اللوز', emoji: '🍬', category: 'الحلويات', description: 'حلوى ناعمة مصنوعة من عجينة اللوز والسكر، مشهورة في مدينة لوبيك' },
  { id: 59, german: 'Spekulatius', arabic: 'بسكويت التوابل الهولندي', emoji: '🍪', category: 'الحلويات', description: 'بسكويت رقيق بالتوابل والقرفة، محبوب في موسم الكريسماس' },
  { id: 60, german: 'Donut', arabic: 'دونات', emoji: '🍩', category: 'الحلويات', description: 'حلوى مقلية مع سكر ناعم أو شوكولاتة، شائعة في المخابز' },
  // في المطعم
  { id: 61, german: 'Vorspeise', arabic: 'مقبلات - طبق البداية', emoji: '🥗', category: 'في المطعم', description: 'أطباق خفيفة تُقدَّم قبل الطبق الرئيسي كالسلطة والحساء' },
  { id: 62, german: 'Hauptgericht', arabic: 'الطبق الرئيسي', emoji: '🍽️', category: 'في المطعم', description: 'الطبق الرئيسي في الوجبة والأكثر أهمية، يحتوي عادة على لحم أو سمك' },
  { id: 63, german: 'Nachspeise', arabic: 'حلوى - تحلية', emoji: '🍮', category: 'في المطعم', description: 'الطبق الأخير في الوجبة ويتضمن الحلويات والمثلجات' },
  { id: 64, german: 'Speisekarte', arabic: 'قائمة الطعام', emoji: '📋', category: 'في المطعم', description: 'قائمة بجميع الأطباق والأسعار المتاحة في المطعم' },
  { id: 65, german: 'Tagesgericht', arabic: 'طبق اليوم', emoji: '📅', category: 'في المطعم', description: 'طبق خاص يُقدَّم كل يوم بسعر مخفض، غالباً يكون أرخص من الطبق العادي' },
  { id: 66, german: 'Mittagsmenü', arabic: 'قائمة الغداء', emoji: '🌞', category: 'في المطعم', description: 'قائمة غداء تتضمن حساء وطبق رئيسي وحلوى بسعر موحد أقل' },
  { id: 67, german: 'Kellner / Kellnerin', arabic: 'نادل / نادلة', emoji: '🧑‍🍳', category: 'في المطعم', description: 'العامل أو العاملة في تقديم الطعام في المطعم' },
  { id: 68, german: 'Trinkgeld', arabic: 'إكرامية - بقشيش', emoji: '💰', category: 'في المطعم', description: 'مبلغ إضافي يُعطى للنادل تقديراً لخدمته، عادة 5-10% من الفاتورة' },
  { id: 69, german: 'Rechnung', arabic: 'فاتورة - حساب', emoji: '🧾', category: 'في المطعم', description: 'الفاتورة الإجمالية للطعام والمشروبات في نهاية الوجبة' },
  { id: 70, german: 'Reservierung', arabic: 'حجز طاولة', emoji: '📞', category: 'في المطعم', description: 'حجز مسبق لطاولة في المطعم، ضروري في أوقات الذروة والمطاعم المشهورة' },
  { id: 71, german: 'vegetarisch', arabic: 'نباتي', emoji: '🥦', category: 'في المطعم', description: 'طبق لا يحتوي على لحوم، مناسب للنباتيين' },
  { id: 72, german: 'vegan', arabic: 'نباتي صرف خالٍ من المنتجات الحيوانية', emoji: '🌱', category: 'في المطعم', description: 'طبق خالٍ من أي منتجات حيوانية بما في ذلك البيض والحليب' },
  { id: 73, german: 'glutenfrei', arabic: 'خالٍ من الغلوتين', emoji: '🌾', category: 'في المطعم', description: 'طبق لا يحتوي على القمح أو الشعير، مناسب لمرضى حساسية الغلوتين' },
  { id: 74, german: 'Portion', arabic: 'حصة - كمية الطبق', emoji: '⚖️', category: 'في المطعم', description: 'الكمية المقدمة من الطعام في الطبق، الحصص الألمانية عادة كبيرة' },
  { id: 75, german: 'zum Mitnehmen', arabic: 'للأخذ خارجاً', emoji: '📦', category: 'في المطعم', description: 'طلب الطعام للأخذ معك خارج المطعم بدلاً من الأكل داخله' },
  { id: 76, german: 'Besteck', arabic: 'أدوات المائدة', emoji: '🍴', category: 'في المطعم', description: 'مجموعة الشوكة والسكين والملعقة المستخدمة في الأكل' },
  { id: 77, german: 'Serviette', arabic: 'منديل المائدة', emoji: '🧻', category: 'في المطعم', description: 'منديل ورقي أو قماشي يُستخدم أثناء تناول الطعام' },
  { id: 78, german: 'Empfehlung', arabic: 'توصية - اقتراح من النادل', emoji: '👍', category: 'في المطعم', description: 'ما يوصي به النادل أو الطاهي من أطباق مميزة في المطعم' },
  { id: 79, german: 'Allergien', arabic: 'حساسية غذائية', emoji: '⚠️', category: 'في المطعم', description: 'الحساسية تجاه مكونات معينة في الطعام كالمكسرات أو الألبان' },
  { id: 80, german: 'Suppe', arabic: 'حساء', emoji: '🍜', category: 'في المطعم', description: 'طبق سائل دافئ يُقدَّم كمقبلات أو طبق رئيسي في المطاعم' },
  { id: 81, german: 'Beilage', arabic: 'طبق جانبي مرافق', emoji: '🥗', category: 'في المطعم', description: 'طبق صغير يُقدَّم مع الطبق الرئيسي كالسلطة أو الخضروات أو البطاطا' },
  { id: 82, german: 'Stammgericht', arabic: 'الطبق الأساسي الشعبي للمطعم', emoji: '⭐', category: 'في المطعم', description: 'الطبق الأساسي الذي يُعرَف به المطعم والأكثر طلباً من الزبائن' },
];

const restaurantPhrases: RestaurantPhrase[] = [
  { german: 'Einen Tisch für zwei Personen, bitte.', arabic: 'طاولة لشخصين، من فضلك.' },
  { german: 'Haben Sie einen Tisch frei?', arabic: 'هل لديكم طاولة شاغرة؟' },
  { german: 'Ich möchte bestellen, bitte.', arabic: 'أريد أن أطلب، من فضلك.' },
  { german: 'Was empfehlen Sie?', arabic: 'ماذا تنصحني؟ / ماذا توصون بـ؟' },
  { german: 'Ich bin Vegetarier / Vegetarierin.', arabic: 'أنا نباتي / نباتية.' },
  { german: 'Ich habe eine Allergie gegen Nüsse.', arabic: 'لدي حساسية من المكسرات.' },
  { german: 'Bitte ohne Fleisch.', arabic: 'من فضلك بدون لحم.' },
  { german: 'Das schmeckt sehr gut!', arabic: 'هذا لذيذ جداً!' },
  { german: 'Die Rechnung, bitte.', arabic: 'الفاتورة من فضلك.' },
  { german: 'Getrennt oder zusammen?', arabic: 'منفصل أم معاً؟ (للفاتورة)' },
  { german: 'Stimmt so.', arabic: 'احتفظ بالباقي. (الإكرامية)' },
  { german: 'Kann ich mit Karte zahlen?', arabic: 'هل يمكنني الدفع بالبطاقة؟' },
  { german: 'Ist der Tisch noch frei?', arabic: 'هل هذه الطاولة شاغرة؟' },
  { german: 'Bitte noch ein Wasser.', arabic: 'ماء آخر من فضلك.' },
  { german: 'Entschuldigung! Herr Ober!', arabic: 'عفواً! يا نادل!' },
];

export default function FoodPage() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState<'browse' | 'quiz' | 'phrases'>('browse');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizChoices, setQuizChoices] = useState<FoodItem[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showXpBurst, setShowXpBurst] = useState(false);
  const [quizFood, setQuizFood] = useState<FoodItem | null>(null);
  const [shuffledFoods] = useState(() => [...foodItems].sort(() => Math.random() - 0.5));

  const filteredFoods = foodItems.filter(f => {
    const matchesCategory = selectedCategory === 'الكل' || f.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      f.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.arabic.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const generateQuiz = (food: FoodItem) => {
    const others = foodItems.filter(f => f.id !== food.id);
    const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const choices = [...shuffled, food].sort(() => Math.random() - 0.5);
    setQuizChoices(choices);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (mode === 'quiz') {
      const food = shuffledFoods[quizIndex % shuffledFoods.length];
      setQuizFood(food);
      generateQuiz(food);
    }
  }, [mode, quizIndex]);

  const handleAnswer = (choice: FoodItem) => {
    if (selectedAnswer !== null || !quizFood) return;
    setSelectedAnswer(choice.id);
    if (choice.id === quizFood.id) {
      setXp(prev => prev + 10);
      setStreak(prev => prev + 1);
      setShowXpBurst(true);
      setTimeout(() => setShowXpBurst(false), 1200);
    } else {
      setStreak(0);
    }
  };

  const nextQuiz = () => setQuizIndex(prev => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-950 dark:to-gray-900" dir="rtl">

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-800 dark:via-amber-800 dark:to-yellow-800 text-white py-10 px-4 shadow-2xl">
        <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-around pointer-events-none select-none">
          <span>🍽️</span><span>🥨</span><span>🌭</span><span>🥩</span><span>🍺</span>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
            ← العودة للرئيسية
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-2 drop-shadow">قاموس المطبخ الألماني 🍽️</h1>
          <p className="text-orange-100 text-lg">تعلّم أسماء الأطعمة والمشروبات الألمانية باللغة العربية</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center backdrop-blur-sm">
              <div className="text-2xl font-black">{foodItems.length}</div>
              <div className="text-xs text-orange-100">كلمة غذائية</div>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center backdrop-blur-sm">
              <div className="text-2xl font-black">{xp}</div>
              <div className="text-xs text-orange-100">نقطة XP</div>
            </div>
            {streak > 1 && (
              <div className="bg-yellow-300/30 rounded-xl px-4 py-2 text-center animate-pulse backdrop-blur-sm">
                <div className="text-2xl font-black">🔥 {streak}</div>
                <div className="text-xs text-orange-100">إجابات صحيحة متتالية</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-md w-fit mx-auto mb-6">
          {[
            { key: 'browse', label: '📖 تصفح' },
            { key: 'quiz', label: '🧠 اختبار' },
            { key: 'phrases', label: '🗣️ عبارات المطعم' },
          ].map(m => (
            <button
              key={m.key}
              onClick={() => setMode(m.key as 'browse' | 'quiz' | 'phrases')}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${mode === m.key
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                : 'text-gray-500 dark:text-gray-400 hover:text-orange-500'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* ============ BROWSE MODE ============ */}
        {mode === 'browse' && (
          <>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="🔍 ابحث بالعربية أو الألمانية..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl border-2 border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-orange-400 text-right shadow-sm text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all border-2 ${selectedCategory === cat
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 border-orange-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-orange-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-left">
              {filteredFoods.length} نتيجة
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFoods.map(food => (
                <div
                  key={food.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-100 dark:border-gray-700 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-4xl group-hover:scale-125 transition-transform duration-300 flex-shrink-0">{food.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-xl text-orange-600 dark:text-orange-400 truncate">{food.german}</div>
                      <div className="font-bold text-gray-800 dark:text-gray-200 mt-0.5 text-sm">{food.arabic}</div>
                      <div className="inline-block bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs rounded-full px-2 py-0.5 mt-1">
                        {food.category}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-orange-50 dark:border-gray-700 pt-2">
                    {food.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ============ QUIZ MODE ============ */}
        {mode === 'quiz' && (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                نقاط XP: <span className="font-black text-orange-500">{xp}</span>
                {' | '}سلسلة صحيحة: <span className="font-black text-green-500">🔥 {streak}</span>
              </div>
            </div>

            {quizFood && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center border-4 border-orange-200 dark:border-orange-700 relative overflow-hidden">
                {showXpBurst && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-green-500/10 rounded-3xl">
                    <div className="text-5xl font-black text-green-500 animate-bounce">+10 XP! 🎉</div>
                  </div>
                )}
                <div className="text-8xl mb-4">{quizFood.emoji}</div>
                <div className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-2">{quizFood.german}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-6">ما معنى هذه الكلمة الألمانية بالعربي؟</div>

                <div className="grid grid-cols-2 gap-3">
                  {quizChoices.map(choice => {
                    let btnClass = 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30';
                    if (selectedAnswer !== null) {
                      if (choice.id === quizFood.id) {
                        btnClass = 'bg-green-100 dark:bg-green-900/50 border-2 border-green-500 text-green-700 dark:text-green-300';
                      } else if (choice.id === selectedAnswer) {
                        btnClass = 'bg-red-100 dark:bg-red-900/50 border-2 border-red-500 text-red-700 dark:text-red-300';
                      } else {
                        btnClass = 'opacity-40 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600';
                      }
                    }
                    return (
                      <button
                        key={choice.id}
                        onClick={() => handleAnswer(choice)}
                        className={`p-3 rounded-2xl font-bold text-xs text-right transition-all ${btnClass}`}
                      >
                        <span className="ml-1">{choice.emoji}</span> {choice.arabic}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-6">
                    <div className={`text-lg font-black mb-1 ${selectedAnswer === quizFood.id ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedAnswer === quizFood.id ? '✅ ممتاز! إجابة صحيحة' : `❌ إجابة خاطئة - الصحيح: ${quizFood.arabic}`}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{quizFood.description}</p>
                    <button
                      onClick={nextQuiz}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      السؤال التالي ←
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
              سؤال #{quizIndex + 1} • تحصل على 10 XP لكل إجابة صحيحة 🌟
            </div>
          </div>
        )}

        {/* ============ PHRASES MODE ============ */}
        {mode === 'phrases' && (
          <div>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🗣️</div>
              <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">عبارات مفيدة في المطعم</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">تعلّم كيف تطلب الطعام وتتعامل مع النادل بالألمانية</p>
            </div>
            <div className="grid gap-4 max-w-3xl mx-auto">
              {restaurantPhrases.map((phrase, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border-r-4 border-orange-400 hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-black text-sm rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-base text-orange-600 dark:text-orange-400 mb-1" dir="ltr">{phrase.german}</div>
                      <div className="text-gray-700 dark:text-gray-300 font-medium">{phrase.arabic}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
