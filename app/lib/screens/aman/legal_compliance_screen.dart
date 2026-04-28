import 'package:flutter/material.dart';

class LegalComplianceScreen extends StatelessWidget {
  const LegalComplianceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('الشروط القانونية')),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: const [
            _LegalSection(
              icon: Icons.gavel,
              titleAr: 'Impressum (البصمة القانونية)',
              titleDe: 'Impressum gemäß § 5 TMG',
              content: _impressumContent,
            ),
            SizedBox(height: 16),
            _LegalSection(
              icon: Icons.privacy_tip,
              titleAr: 'سياسة الخصوصية (DSGVO)',
              titleDe: 'Datenschutzerklärung gemäß DSGVO',
              content: _dsgvoContent,
            ),
            SizedBox(height: 16),
            _LegalSection(
              icon: Icons.description,
              titleAr: 'الشروط والأحكام (AGB)',
              titleDe: 'Allgemeine Geschäftsbedingungen',
              content: _agbContent,
            ),
            SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _LegalSection extends StatelessWidget {
  final IconData icon;
  final String titleAr;
  final String titleDe;
  final String content;

  const _LegalSection({
    required this.icon,
    required this.titleAr,
    required this.titleDe,
    required this.content,
  });

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      child: ExpansionTile(
        leading: Icon(icon, color: cs.primary),
        title: Text(titleAr,
            style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(titleDe,
            style: TextStyle(fontSize: 12, color: cs.onSurfaceVariant)),
        childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        children: [
          Text(content, style: const TextStyle(height: 1.6)),
        ],
      ),
    );
  }
}

const _impressumContent = '''
أمان — تطبيق دعم مجتمعي للعائلات العربية في ألمانيا

Aman — Gemeinschaftliche Unterstützungs-App für arabische Familien in Deutschland

المسؤول: [اسم المسؤول / Verantwortlicher]
العنوان: [عنوان في ألمانيا / Anschrift]
البريد الإلكتروني: kontakt@aman-app.de
الهاتف: [رقم الهاتف / Telefon]

ملاحظة: هذا التطبيق ليس جهة حكومية ولا يقدم استشارات قانونية ملزمة. جميع المعلومات المقدمة هي لأغراض التوعية فقط.

Hinweis: Diese App ist keine Behörde und bietet keine rechtsverbindliche Beratung. Alle bereitgestellten Informationen dienen ausschließlich der Aufklärung.

تنبيه المسؤولية (Haftungshinweis):
نحن نبذل جهدنا لضمان دقة المعلومات في هذا التطبيق، لكننا لا نتحمل المسؤولية عن أي أضرار ناجمة عن استخدام المعلومات المقدمة. للحصول على مشورة قانونية ملزمة، يرجى استشارة محامٍ مرخص.
''';

const _dsgvoContent = '''
سياسة الخصوصية — Datenschutzerklärung

1. جمع البيانات (Datenerhebung):
لا يقوم تطبيق أمان بجمع أو إرسال أي بيانات شخصية إلى خوادم خارجية. جميع البيانات (الأسئلة المجهولة، نتائج الاختبارات) تُحفظ محلياً على جهازك فقط.

Aman erhebt und überträgt keine personenbezogenen Daten an externe Server. Alle Daten werden ausschließlich lokal auf Ihrem Gerät gespeichert.

2. البيانات المحفوظة محلياً (Lokal gespeicherte Daten):
• الأسئلة المجهولة التي ترسلها
• حالة الاشتراك
• نتائج الاختبارات (كاشف الخطر، اختبار العلاقة)

3. مشاركة البيانات (Datenweitergabe):
لا نشارك أي بيانات مع أطراف ثالثة. التطبيق يعمل بشكل كامل دون اتصال بالإنترنت (offline-first).

4. حقوقك (Ihre Rechte nach DSGVO):
• حق الوصول (Auskunftsrecht): يمكنك الاطلاع على بياناتك المحفوظة في أي وقت
• حق المحو (Recht auf Löschung): يمكنك حذف جميع بياناتك بمسح بيانات التطبيق من إعدادات جهازك
• حق النقل (Recht auf Datenübertragbarkeit): بياناتك محفوظة على جهازك ويمكنك نسخها

5. ملفات تعريف الارتباط (Cookies):
لا يستخدم التطبيق أي ملفات تعريف ارتباط أو أدوات تتبع.

6. الجلسة السرية (Vertrauliche Sitzung):
بيانات الجلسة السرية (الاسم المستعار، الرسائل) تُحفظ محلياً فقط أثناء الجلسة وتُحذف نهائياً عند التدمير الذاتي. لا يتم نقل أي بيانات إلى خوادم خارجية.

Die Daten der vertraulichen Sitzung werden nur lokal gespeichert und nach der Selbstzerstörung vollständig gelöscht.

7. الاتصال بنا:
للاستفسارات المتعلقة بالخصوصية: datenschutz@aman-app.de
''';

const _agbContent = '''
الشروط والأحكام — Allgemeine Geschäftsbedingungen (AGB)

1. نطاق الخدمة (Leistungsumfang):
يقدم تطبيق أمان معلومات توعوية واستشارات غير ملزمة قانونياً في المجالات القانونية والنفسية والاجتماعية للعائلات العربية في ألمانيا.

2. خطط الاشتراك (Abonnement):
• الخطة المجانية: وصول محدود للمحتوى الأساسي
• الخطة المميزة: 4 يورو شهرياً أو 40 يورو سنوياً
• الجلسة السرية: 1 يورو لكل جلسة (25 دقيقة)
• يمكن إلغاء الاشتراك في أي وقت

3. حق الانسحاب (Widerrufsrecht):
وفقاً للقانون الألماني (§ 355 BGB)، يحق لك الانسحاب من الاشتراك خلال 14 يوماً من تاريخ الاشتراك دون إبداء أسباب.

4. إخلاء المسؤولية (Haftungsausschluss):
• المعلومات المقدمة في التطبيق لأغراض التوعية فقط
• لا تُعد بديلاً عن الاستشارة القانونية أو النفسية المتخصصة
• لا نتحمل المسؤولية عن القرارات المتخذة بناءً على محتوى التطبيق
• في حالات الطوارئ، يرجى الاتصال بالشرطة (110) أو الإسعاف (112)

5. حقوق الملكية الفكرية (Urheberrecht):
جميع المحتويات محمية بموجب قانون حقوق الطبع والنشر الألماني (UrhG).

6. التعديلات (Änderungen):
نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم إعلام المستخدمين بأي تغييرات جوهرية.

7. القانون الساري (Anwendbares Recht):
تخضع هذه الشروط للقانون الألماني. مكان الاختصاص القضائي هو [المدينة].

8. الجلسة السرية (Vertrauliche Sitzung):
• مدة الجلسة 25 دقيقة بتكلفة 1 يورو لكل جلسة
• جميع المحادثات مشفرة ولا يتم تسجيلها
• يتم حذف المحادثة نهائياً بعد انتهاء الجلسة أو بطلب المستخدم
• لا يتم الكشف عن الهوية الحقيقية للمستخدم للمستشار
• Alle Gespräche sind verschlüsselt und werden nicht aufgezeichnet
• Der Chat wird nach Beendigung der Sitzung automatisch gelöscht

9. الاتصال (Kontakt):
agb@aman-app.de
''';
