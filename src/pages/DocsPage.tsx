import { useState } from 'react';
import { Link } from 'react-router-dom';

interface DocCard {
  id: number;
  german: string;
  arabic: string;
  emoji: string;
  category: string;
  what: string;
  when: string;
  where: string;
  phrases: string[];
  color: string;
}

interface ImportantWord {
  german: string;
  arabic: string;
  example: string;
}

const documents: DocCard[] = [
  {
    id: 1,
    german: 'Personalausweis',
    arabic: 'بطاقة الهوية الشخصية',
    emoji: '🪪',
    category: 'هوية',
    what: 'وثيقة هوية رسمية صادرة عن الحكومة الألمانية تُثبت هوية الشخص وجنسيته الألمانية.',
    when: 'عند السفر داخل أوروبا، فتح حساب بنكي، التسجيل في الجهات الحكومية، إبرام العقود.',
    where: 'مكتب البلدية (Bürgeramt / Einwohnermeldeamt) في مدينة إقامتك.',
    phrases: ['Ich möchte einen Personalausweis beantragen.', 'Wie lange ist er gültig?', 'Was kostet das?'],
    color: 'blue',
  },
  {
    id: 2,
    german: 'Reisepass',
    arabic: 'جواز السفر',
    emoji: '📘',
    category: 'هوية',
    what: 'وثيقة سفر رسمية تُستخدم للسفر خارج الاتحاد الأوروبي وتُثبت الجنسية الألمانية.',
    when: 'عند السفر خارج أوروبا، الحصول على تأشيرات لدول أخرى.',
    where: 'مكتب البلدية (Bürgeramt) - يستغرق إصداره عادة 4-6 أسابيع.',
    phrases: ['Ich brauche einen neuen Reisepass.', 'Mein Pass ist abgelaufen.', 'Wie lange dauert die Bearbeitung?'],
    color: 'blue',
  },
  {
    id: 3,
    german: 'Aufenthaltstitel',
    arabic: 'تصريح الإقامة',
    emoji: '📄',
    category: 'إقامة',
    what: 'وثيقة رسمية تمنح غير الألمان حق الإقامة والعمل في ألمانيا لفترة محددة أو غير محددة.',
    when: 'ضروري للعيش والعمل في ألمانيا لغير مواطني الاتحاد الأوروبي.',
    where: 'مكتب الأجانب (Ausländerbehörde) في مدينة إقامتك.',
    phrases: ['Ich möchte meinen Aufenthaltstitel verlängern.', 'Wann läuft mein Aufenthaltstitel ab?', 'Ich beantrage eine Niederlassungserlaubnis.'],
    color: 'green',
  },
  {
    id: 4,
    german: 'Meldebescheinigung',
    arabic: 'شهادة تسجيل مكان الإقامة',
    emoji: '🏠',
    category: 'إقامة',
    what: 'وثيقة تُثبت عنوان إقامتك المسجل رسمياً في ألمانيا، وهي ضرورية لإجراءات كثيرة.',
    when: 'فتح حساب بنكي، التقدم للعمل، الحصول على بطاقة الهوية، التسجيل في الخدمات العامة.',
    where: 'مكتب تسجيل السكان (Einwohnermeldeamt / Bürgeramt) - يجب التسجيل خلال أسبوعين من السكن.',
    phrases: ['Ich möchte mich anmelden.', 'Ich habe eine neue Adresse.', 'Ich brauche eine Meldebescheinigung.'],
    color: 'green',
  },
  {
    id: 5,
    german: 'Lohnsteuerbescheinigung',
    arabic: 'شهادة ضريبة الراتب',
    emoji: '💼',
    category: 'عمل وضرائب',
    what: 'وثيقة سنوية يُصدرها صاحب العمل تُبين دخلك والضرائب المدفوعة خلال العام.',
    when: 'عند تقديم الإقرار الضريبي السنوي (Steuererklärung) في نهاية كل عام.',
    where: 'يُصدرها صاحب العمل (Arbeitgeber) تلقائياً في نهاية كل عام.',
    phrases: ['Wann bekomme ich meine Lohnsteuerbescheinigung?', 'Ich brauche sie für die Steuererklärung.', 'Können Sie mir eine Kopie schicken?'],
    color: 'yellow',
  },
  {
    id: 6,
    german: 'Krankenversicherungskarte',
    arabic: 'بطاقة التأمين الصحي',
    emoji: '💳',
    category: 'صحة',
    what: 'بطاقة إلكترونية تُتيح لك الوصول إلى الرعاية الصحية في ألمانيا وتُثبت تغطيتك التأمينية.',
    when: 'عند زيارة الطبيب أو الذهاب إلى المستشفى أو الصيدلية.',
    where: 'تُصدرها شركة التأمين الصحي (Krankenkasse) تلقائياً عند التسجيل.',
    phrases: ['Ich habe meine Krankenversicherungskarte verloren.', 'Ich bin bei der AOK / TK versichert.', 'Ich brauche eine neue Karte.'],
    color: 'red',
  },
  {
    id: 7,
    german: 'Sozialversicherungsausweis',
    arabic: 'بطاقة الضمان الاجتماعي',
    emoji: '🔖',
    category: 'عمل وضرائب',
    what: 'وثيقة تحتوي على رقم الضمان الاجتماعي (Rentenversicherungsnummer) الذي يبقى معك مدى الحياة.',
    when: 'عند البدء في أي عمل جديد - يجب تسليمه لصاحب العمل.',
    where: 'يُصدره مكتب التأمين على التقاعد (Deutsche Rentenversicherung) - يُرسَل بالبريد.',
    phrases: ['Ich habe meine Sozialversicherungsnummer noch nicht bekommen.', 'Ich brauche meinen Sozialversicherungsausweis für die Arbeit.', 'Wie beantrage ich eine neue Karte?'],
    color: 'purple',
  },
  {
    id: 8,
    german: 'Führerschein',
    arabic: 'رخصة القيادة',
    emoji: '🚗',
    category: 'مركبات',
    what: 'وثيقة رسمية تُجيز قيادة المركبات على الطرق العامة، وللألمان نموذج موحد أوروبي.',
    when: 'عند قيادة السيارة أو أي مركبة آلية على الطرق العامة.',
    where: 'مدرسة تعليم القيادة (Fahrschule) ثم مكتب البلدية لاستبدال رخصتك الأجنبية إن وجدت.',
    phrases: ['Ich möchte meinen ausländischen Führerschein umschreiben.', 'Ich brauche einen deutschen Führerschein.', 'Ist mein Führerschein in Deutschland gültig?'],
    color: 'orange',
  },
  {
    id: 9,
    german: 'Zulassungsbescheinigung',
    arabic: 'وثيقة تسجيل المركبة',
    emoji: '🚙',
    category: 'مركبات',
    what: 'وثيقة رسمية تُثبت ملكية السيارة وبياناتها التقنية وتسجيلها الرسمي.',
    when: 'عند شراء سيارة أو نقل ملكيتها أو تجديد التسجيل السنوي.',
    where: 'مكتب تسجيل المركبات (Kfz-Zulassungsstelle) التابع لبلدية إقامتك.',
    phrases: ['Ich möchte mein Auto zulassen.', 'Ich habe ein Auto gekauft.', 'Ich brauche neue Kennzeichen.'],
    color: 'orange',
  },
  {
    id: 10,
    german: 'Baugenehmigung',
    arabic: 'رخصة البناء',
    emoji: '🏗️',
    category: 'عقارات',
    what: 'تصريح رسمي يسمح ببناء مبنى جديد أو إجراء تعديلات جوهرية على مبنى قائم.',
    when: 'قبل البدء في أي مشروع بناء أو هدم أو تجديد جوهري.',
    where: 'مكتب البناء (Bauordnungsamt / Bauamt) في بلديتك.',
    phrases: ['Ich möchte eine Baugenehmigung beantragen.', 'Welche Unterlagen brauche ich?', 'Wie lange dauert die Genehmigung?'],
    color: 'gray',
  },
  {
    id: 11,
    german: 'Gewerbeanmeldung',
    arabic: 'تسجيل النشاط التجاري',
    emoji: '🏪',
    category: 'عمل وضرائب',
    what: 'وثيقة تُسجّل نشاطك التجاري أو مشروعك الخاص رسمياً لدى السلطات الألمانية.',
    when: 'عند فتح محل تجاري أو بدء نشاط تجاري حر أو مشروع مستقل.',
    where: 'مكتب البلدية (Gewerbeamt / Ordnungsamt) - رسوم حوالي 20-60 يورو.',
    phrases: ['Ich möchte ein Gewerbe anmelden.', 'Was kostet eine Gewerbeanmeldung?', 'Ich bin selbstständig.'],
    color: 'indigo',
  },
  {
    id: 12,
    german: 'Nebenkostenabrechnung',
    arabic: 'فاتورة التكاليف الإضافية للسكن',
    emoji: '🧾',
    category: 'سكن',
    what: 'وثيقة سنوية يُصدرها المالك تُحدد تكاليف الكهرباء والمياه والتدفئة والصيانة للسكن.',
    when: 'تصل سنوياً عادةً في الربع الأول من العام عن العام السابق.',
    where: 'يُصدرها المالك (Vermieter) أو شركة إدارة العقارات (Hausverwaltung).',
    phrases: ['Ich verstehe die Nebenkostenabrechnung nicht.', 'Warum soll ich nachzahlen?', 'Ich glaube, da ist ein Fehler.'],
    color: 'teal',
  },
  {
    id: 13,
    german: 'Steuerbescheid',
    arabic: 'قرار تقدير الضريبة',
    emoji: '📊',
    category: 'عمل وضرائب',
    what: 'وثيقة رسمية من مكتب الضرائب تُبين الضريبة المستحقة عليك أو المبلغ الذي ستسترده.',
    when: 'يصدر بعد تقديم إقرارك الضريبي السنوي (Steuererklärung).',
    where: 'يُرسله مكتب الضرائب (Finanzamt) بالبريد تلقائياً.',
    phrases: ['Ich habe einen Steuerbescheid bekommen.', 'Ich möchte Einspruch einlegen.', 'Ich verstehe den Bescheid nicht.'],
    color: 'yellow',
  },
  {
    id: 14,
    german: 'Rentenbescheid',
    arabic: 'قرار الحصول على المعاش التقاعدي',
    emoji: '👴',
    category: 'ضمان اجتماعي',
    what: 'وثيقة رسمية تُحدد مقدار المعاش التقاعدي الذي ستتلقاه من نظام التأمين التقاعدي الألماني.',
    when: 'عند التقدم بطلب للتقاعد أو الإعاقة أو الاستحقاق بعد وفاة أحد الوالدين.',
    where: 'يُصدره مكتب التأمين على التقاعد (Deutsche Rentenversicherung).',
    phrases: ['Wann kann ich in Rente gehen?', 'Wie hoch ist meine Rente?', 'Ich möchte einen Rentenbescheid beantragen.'],
    color: 'purple',
  },
  {
    id: 15,
    german: 'Geburtsurkunde',
    arabic: 'شهادة الميلاد',
    emoji: '👶',
    category: 'أحوال مدنية',
    what: 'وثيقة رسمية تُثبت تاريخ ومكان الميلاد واسم الطفل وبيانات والديه.',
    when: 'عند التسجيل في المدارس، الزواج، استخراج الهوية، تسجيل الجنسية.',
    where: 'مكتب سجل الأحوال المدنية (Standesamt) في مكان الولادة.',
    phrases: ['Ich brauche eine Geburtsurkunde für mein Kind.', 'Ich möchte meine Geburtsurkunde beglaubigen lassen.', 'Meine Geburtsurkunde ist auf Arabisch - brauche ich eine Übersetzung?'],
    color: 'pink',
  },
  {
    id: 16,
    german: 'Heiratsurkunde',
    arabic: 'شهادة الزواج',
    emoji: '💍',
    category: 'أحوال مدنية',
    what: 'وثيقة رسمية تُثبت إتمام عقد الزواج رسمياً في ألمانيا.',
    when: 'عند تغيير الاسم، استخراج الإقامة للزوج/الزوجة، الإجراءات القانونية.',
    where: 'مكتب سجل الأحوال المدنية (Standesamt) حيث تم عقد الزواج.',
    phrases: ['Wir möchten heiraten.', 'Welche Unterlagen brauchen wir für die Hochzeit?', 'Ich brauche eine beglaubigte Übersetzung meiner Heiratsurkunde.'],
    color: 'pink',
  },
  {
    id: 17,
    german: 'Schulzeugnis',
    arabic: 'شهادة المدرسة / كشف العلامات',
    emoji: '📝',
    category: 'تعليم',
    what: 'وثيقة تُبين نتائج الطالب الدراسية والدرجات في جميع المواد خلال فترة الدراسة.',
    when: 'التقدم للجامعات والمهن المختلفة وطلبات التدريب (Ausbildung).',
    where: 'تُصدرها المدرسة التي يدرس فيها الطالب في نهاية كل فصل دراسي.',
    phrases: ['Ich brauche mein Abschlusszeugnis.', 'Kann ich eine beglaubigte Kopie bekommen?', 'Mein Zeugnis ist auf Arabisch - muss ich es übersetzen lassen?'],
    color: 'cyan',
  },
  {
    id: 18,
    german: 'Berufsausbildungszeugnis',
    arabic: 'شهادة التدريب المهني',
    emoji: '🎓',
    category: 'تعليم',
    what: 'وثيقة تُثبت إتمام برنامج التدريب المهني (Ausbildung) بنجاح في مجال معين.',
    when: 'التقدم للوظائف في المجال المهني، طلبات الهجرة المؤهلة.',
    where: 'تُصدرها غرفة الصناعة والتجارة (IHK) أو غرفة الحرف اليدوية (HWK).',
    phrases: ['Ich habe meine Ausbildung erfolgreich abgeschlossen.', 'Ich möchte meine ausländische Ausbildung anerkennen lassen.', 'Wie bekomme ich eine Anerkennung für meinen Abschluss?'],
    color: 'cyan',
  },
  {
    id: 19,
    german: 'Beschäftigungsnachweis',
    arabic: 'إثبات الوظيفة / شهادة العمل',
    emoji: '🏢',
    category: 'عمل وضرائب',
    what: 'وثيقة تُثبت أنك تعمل لدى صاحب عمل معين وتتضمن وظيفتك وراتبك ومدة العقد.',
    when: 'عند التقدم لاستئجار شقة، الحصول على قرض، تجديد الإقامة.',
    where: 'يُصدرها قسم الموارد البشرية لدى صاحب العمل (Personalabteilung).',
    phrases: ['Ich brauche einen Beschäftigungsnachweis.', 'Kann ich eine Arbeitsbescheinigung bekommen?', 'Ich brauche es für die Wohnungsbewerbung.'],
    color: 'indigo',
  },
  {
    id: 20,
    german: 'Kontoauszug',
    arabic: 'كشف حساب بنكي',
    emoji: '🏦',
    category: 'مالية',
    what: 'وثيقة تُبين تاريخ المعاملات المالية في حسابك البنكي من دخل ومصروف ورصيد.',
    when: 'التقدم لاستئجار شقة، طلب الهجرة المؤهلة، إجراءات الدعم الاجتماعي.',
    where: 'يُصدره البنك الذي لديك حساب فيه - متاح إلكترونياً أو في الفروع.',
    phrases: ['Ich brauche meine Kontoauszüge der letzten 3 Monate.', 'Kann ich meinen Kontoauszug online herunterladen?', 'Ich brauche einen offiziellen Bankbeleg.'],
    color: 'green',
  },
];

const importantWords: ImportantWord[] = [
  { german: 'beantragen', arabic: 'تقديم طلب / استيفاء طلب', example: 'Ich möchte einen Ausweis beantragen.' },
  { german: 'verlängern', arabic: 'تمديد / تجديد', example: 'Ich möchte meine Aufenthaltserlaubnis verlängern.' },
  { german: 'ausstellen', arabic: 'إصدار / منح وثيقة', example: 'Das Amt stellt die Bescheinigung aus.' },
  { german: 'beglaubigen', arabic: 'توثيق / تصديق رسمي', example: 'Ich muss das Dokument beglaubigen lassen.' },
  { german: 'übersetzen', arabic: 'ترجمة', example: 'Das Zeugnis muss ins Deutsche übersetzt werden.' },
  { german: 'einreichen', arabic: 'تسليم / إيداع', example: 'Ich reiche alle Unterlagen ein.' },
  { german: 'gültig', arabic: 'ساري المفعول / صالح', example: 'Ist mein Ausweis noch gültig?' },
  { german: 'abgelaufen', arabic: 'منتهي الصلاحية', example: 'Mein Pass ist abgelaufen.' },
  { german: 'Frist', arabic: 'مهلة / موعد نهائي', example: 'Die Frist ist am 31. Dezember.' },
  { german: 'Termin', arabic: 'موعد', example: 'Ich brauche einen Termin beim Amt.' },
  { german: 'Unterlagen', arabic: 'الوثائق / المستندات', example: 'Welche Unterlagen brauche ich?' },
  { german: 'Formular', arabic: 'نموذج / استمارة', example: 'Ich muss das Formular ausfüllen.' },
  { german: 'Gebühr', arabic: 'رسوم', example: 'Wie hoch ist die Gebühr?' },
  { german: 'Antrag', arabic: 'طلب رسمي', example: 'Ich stelle einen Antrag.' },
  { german: 'Bescheid', arabic: 'قرار رسمي / إشعار', example: 'Ich warte auf den Bescheid.' },
  { german: 'Amt', arabic: 'مكتب حكومي / دائرة', example: 'Ich gehe zum Amt morgen.' },
  { german: 'Behörde', arabic: 'جهة حكومية / سلطة', example: 'Die Behörde bearbeitet meinen Antrag.' },
  { german: 'Widerspruch', arabic: 'اعتراض / طعن', example: 'Ich möchte Widerspruch einlegen.' },
  { german: 'Kopie', arabic: 'نسخة / صورة طبق الأصل', example: 'Ich brauche eine beglaubigte Kopie.' },
  { german: 'Original', arabic: 'النسخة الأصلية', example: 'Bitte das Original mitbringen.' },
];

const colorMap: Record<string, { bg: string; border: string; badge: string; emoji_bg: string }> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-300 dark:border-blue-700', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300', emoji_bg: 'bg-blue-100 dark:bg-blue-900/50' },
  green: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-300 dark:border-green-700', badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300', emoji_bg: 'bg-green-100 dark:bg-green-900/50' },
  yellow: { bg: 'bg-yellow-50 dark:bg-yellow-950/30', border: 'border-yellow-300 dark:border-yellow-700', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300', emoji_bg: 'bg-yellow-100 dark:bg-yellow-900/50' },
  red: { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-300 dark:border-red-700', badge: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300', emoji_bg: 'bg-red-100 dark:bg-red-900/50' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-300 dark:border-purple-700', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300', emoji_bg: 'bg-purple-100 dark:bg-purple-900/50' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-300 dark:border-orange-700', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300', emoji_bg: 'bg-orange-100 dark:bg-orange-900/50' },
  gray: { bg: 'bg-gray-50 dark:bg-gray-800/50', border: 'border-gray-300 dark:border-gray-600', badge: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300', emoji_bg: 'bg-gray-100 dark:bg-gray-700' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/30', border: 'border-indigo-300 dark:border-indigo-700', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300', emoji_bg: 'bg-indigo-100 dark:bg-indigo-900/50' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-teal-300 dark:border-teal-700', badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300', emoji_bg: 'bg-teal-100 dark:bg-teal-900/50' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-950/30', border: 'border-pink-300 dark:border-pink-700', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300', emoji_bg: 'bg-pink-100 dark:bg-pink-900/50' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-950/30', border: 'border-cyan-300 dark:border-cyan-700', badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300', emoji_bg: 'bg-cyan-100 dark:bg-cyan-900/50' },
};

const allCategories = ['الكل', ...Array.from(new Set(documents.map(d => d.category)))];

export default function DocsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [viewedDocs, setViewedDocs] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'docs' | 'words'>('docs');

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
    setViewedDocs(prev => new Set([...prev, id]));
  };

  const filteredDocs = documents.filter(doc => {
    const matchesCat = activeCategory === 'الكل' || doc.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      doc.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.arabic.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const progressPct = Math.round((viewedDocs.size / documents.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950" dir="rtl">

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-blue-800 to-indigo-800 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 text-white py-10 px-4 shadow-2xl">
        <div className="absolute inset-0 opacity-5 text-9xl flex items-center justify-around pointer-events-none select-none">
          <span>📋</span><span>📄</span><span>🗂️</span><span>📁</span><span>🖊️</span>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            ← العودة للرئيسية
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-2 drop-shadow">مركز الوثائق الرسمية 📋</h1>
          <p className="text-blue-200 text-lg">دليلك الشامل للوثائق الرسمية الألمانية - ما هي، متى تحتاجها، وأين تحصل عليها</p>

          {/* Progress Bar */}
          <div className="mt-5 bg-white/10 rounded-2xl p-4 backdrop-blur-sm max-w-md">
            <div className="flex justify-between text-sm text-blue-200 mb-2">
              <span>تقدمك في استكشاف الوثائق</span>
              <span className="font-black text-white">{viewedDocs.size} / {documents.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="text-right mt-1 text-xs text-blue-300">{progressPct}% مكتمل</div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center backdrop-blur-sm">
              <div className="text-2xl font-black">{documents.length}</div>
              <div className="text-xs text-blue-200">وثيقة رسمية</div>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center backdrop-blur-sm">
              <div className="text-2xl font-black">{importantWords.length}</div>
              <div className="text-xs text-blue-200">كلمة مهمة</div>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center backdrop-blur-sm">
              <div className="text-2xl font-black">{viewedDocs.size}</div>
              <div className="text-xs text-blue-200">وثيقة مستكشفة</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Tab Switch */}
        <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-md w-fit mx-auto mb-6">
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'docs'
              ? 'bg-gradient-to-r from-slate-700 to-blue-700 text-white shadow-lg scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600'}`}
          >
            📋 الوثائق الرسمية
          </button>
          <button
            onClick={() => setActiveTab('words')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'words'
              ? 'bg-gradient-to-r from-slate-700 to-blue-700 text-white shadow-lg scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600'}`}
          >
            📖 كلمات مهمة
          </button>
        </div>

        {/* DOCS TAB */}
        {activeTab === 'docs' && (
          <>
            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="🔍 ابحث عن وثيقة..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 text-right shadow-sm text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-5">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all border-2 ${activeCategory === cat
                    ? 'bg-blue-700 border-blue-700 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Doc Cards */}
            <div className="grid gap-4">
              {filteredDocs.map(doc => {
                const colors = colorMap[doc.color] || colorMap['gray'];
                const isExpanded = expandedId === doc.id;
                const isViewed = viewedDocs.has(doc.id);

                return (
                  <div
                    key={doc.id}
                    className={`rounded-2xl border-2 shadow-md transition-all duration-300 overflow-hidden ${colors.bg} ${colors.border} ${isExpanded ? 'shadow-xl' : 'hover:shadow-lg hover:-translate-y-0.5'}`}
                  >
                    {/* Card Header */}
                    <button
                      onClick={() => toggleExpand(doc.id)}
                      className="w-full text-right p-5 flex items-center gap-4"
                    >
                      <div className={`text-4xl rounded-2xl p-2 flex-shrink-0 ${colors.emoji_bg}`}>{doc.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-xl text-gray-900 dark:text-gray-100">{doc.german}</span>
                          {isViewed && <span className="text-green-500 text-sm">✓</span>}
                        </div>
                        <div className="font-bold text-gray-600 dark:text-gray-400 text-sm mt-0.5">{doc.arabic}</div>
                        <div className={`inline-block text-xs rounded-full px-2 py-0.5 mt-1 font-bold ${colors.badge}`}>
                          {doc.category}
                        </div>
                      </div>
                      <div className={`text-2xl transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                        ⌄
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-white/50 dark:border-gray-700/50 mt-1">
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
                            <div className="font-black text-blue-700 dark:text-blue-400 text-sm mb-2 flex items-center gap-1">
                              <span>❓</span> ما هي؟
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{doc.what}</p>
                          </div>
                          <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
                            <div className="font-black text-orange-600 dark:text-orange-400 text-sm mb-2 flex items-center gap-1">
                              <span>📅</span> متى تحتاجها؟
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{doc.when}</p>
                          </div>
                          <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
                            <div className="font-black text-green-700 dark:text-green-400 text-sm mb-2 flex items-center gap-1">
                              <span>🏛️</span> أين تحصل عليها؟
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{doc.where}</p>
                          </div>
                        </div>

                        {/* Useful Phrases */}
                        <div className="mt-4 bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
                          <div className="font-black text-purple-700 dark:text-purple-400 text-sm mb-3 flex items-center gap-1">
                            <span>💬</span> عبارات مفيدة
                          </div>
                          <div className="space-y-2">
                            {doc.phrases.map((phrase, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="text-purple-400 font-black flex-shrink-0 mt-0.5">›</span>
                                <span className="text-gray-800 dark:text-gray-200 text-sm font-medium" dir="ltr">{phrase}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredDocs.length === 0 && (
              <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                <div className="text-5xl mb-3">🔍</div>
                <div className="text-xl font-bold">لا توجد نتائج</div>
                <div className="text-sm mt-1">جرّب كلمة بحث مختلفة</div>
              </div>
            )}
          </>
        )}

        {/* IMPORTANT WORDS TAB */}
        {activeTab === 'words' && (
          <div>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📖</div>
              <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">كلمات مهمة للتعامل مع الدوائر</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                هذه الكلمات ستساعدك في التعامل مع الجهات الحكومية الألمانية
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {importantWords.map((word, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md border border-blue-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-black text-sm rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-lg text-blue-700 dark:text-blue-400">{word.german}</span>
                        <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">= {word.arabic}</span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700/50 rounded-lg px-2 py-1" dir="ltr">
                        {word.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip box */}
            <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
              <div className="text-xl font-black mb-2">💡 نصيحة مهمة</div>
              <p className="text-blue-100 leading-relaxed text-sm">
                عند زيارة أي مكتب حكومي ألماني، احرص دائماً على:
                <br />• <strong>حجز موعد مسبق (Termin)</strong> - معظم المكاتب لا تقبل بدون موعد
                <br />• <strong>إحضار الوثائق الأصلية وصور منها</strong>
                <br />• <strong>طلب مترجم</strong> إن لم تكن تتقن الألمانية: <em>"Ich brauche einen Dolmetscher"</em>
                <br />• <strong>الصبر</strong> - الإجراءات الألمانية قد تأخذ وقتاً
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
