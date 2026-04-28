import 'package:flutter/material.dart';

import 'ask_expert_screen.dart';
import 'emergency_support_screen.dart';
import 'help_map_screen.dart';
import 'jugendamt_risk_screen.dart';
import 'legal_guide_screen.dart';
import 'podcast_screen.dart';
import 'private_session_booking_screen.dart';
import 'relationship_quiz_screen.dart';
import 'stories_screen.dart';

/// Home tab — shows the hero banner, privacy notice, and section cards.
class AmanHomeScreen extends StatelessWidget {
  const AmanHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Hero banner
          Card(
            color: cs.primaryContainer,
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Icon(Icons.shield,
                      size: 48, color: cs.onPrimaryContainer),
                  const SizedBox(height: 8),
                  Text(
                    'أمان',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: cs.onPrimaryContainer,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'صديقك الناصح في ألمانيا',
                    style: TextStyle(
                      fontSize: 16,
                      color: cs.onPrimaryContainer,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'استشارات قانونية ونفسية واجتماعية بخصوصية تامة',
                    style: TextStyle(
                      fontSize: 13,
                      color: cs.onPrimaryContainer.withOpacity(0.8),
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 20),

          // Privacy notice
          Card(
            color: cs.surfaceContainerHighest,
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  Icon(Icons.lock, color: cs.primary, size: 20),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'خصوصيتك مشفرة تماماً. نحن لسنا جهة حكومية بل صديق ناصح.',
                      style: TextStyle(
                        fontSize: 13,
                        color: cs.onSurfaceVariant,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 20),

          // Main sections
          Text(
            'الأقسام الرئيسية',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 12),

          _SectionCard(
            icon: Icons.question_answer,
            title: 'اسأل خبيراً',
            subtitle: 'استشارات مجهولة ودليل المختصين العرب',
            color: Colors.blue,
            onTap: () => _navigate(context, const AskExpertScreen()),
          ),

          _SectionCard(
            icon: Icons.gavel,
            title: 'اليوجند امت والقانون',
            subtitle: 'حقوقك وواجباتك - بعيداً عن الإشاعات',
            color: Colors.indigo,
            onTap: () => _navigate(context, const LegalGuideScreen()),
          ),

          _SectionCard(
            icon: Icons.emergency,
            title: 'المرأة والبيت الآمن',
            subtitle: 'أرقام طوارئ وبيوت نساء ومساعدة فورية',
            color: Colors.red,
            onTap: () =>
                _navigate(context, const EmergencySupportScreen()),
          ),

          _SectionCard(
            icon: Icons.auto_stories,
            title: 'قصص وعبر',
            subtitle: 'تجارب حقيقية ومحاكاة نتائج الطلاق',
            color: Colors.orange,
            onTap: () => _navigate(context, const StoriesScreen()),
          ),

          _SectionCard(
            icon: Icons.shield_outlined,
            title: 'كاشف خطر اليوجند أمت',
            subtitle: 'هل تصرفاتي تستدعي تدخل اليوجند أمت؟',
            color: Colors.deepOrange,
            onTap: () =>
                _navigate(context, const JugendamtRiskScreen()),
          ),

          const SizedBox(height: 20),

          // Private session highlight
          Text(
            'الجلسة السرية',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 12),

          Card(
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () => _navigate(
                  context, const PrivateSessionBookingScreen()),
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Colors.teal.shade700,
                      Colors.teal.shade900,
                    ],
                  ),
                ),
                padding: const EdgeInsets.all(20),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.shield,
                          color: Colors.white, size: 32),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'الجلسة السرية',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'مساحة آمنة للحديث مع مستشار — 25 دقيقة بـ 1€ فقط',
                            style: TextStyle(
                                color: Colors.white.withOpacity(0.85)),
                          ),
                          const SizedBox(height: 8),
                          const Wrap(
                            spacing: 8,
                            children: [
                              _MiniTag('تدمير ذاتي'),
                              _MiniTag('منع التصوير'),
                              _MiniTag('اسم مستعار'),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const Icon(Icons.chevron_left, color: Colors.white),
                  ],
                ),
              ),
            ),
          ),

          const SizedBox(height: 20),

          // Creative features
          Text(
            'ميزات إضافية',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(
                child: _SmallCard(
                  icon: Icons.psychology,
                  title: 'هل نحن بخير؟',
                  subtitle: 'اختبار العلاقة',
                  color: Colors.purple,
                  onTap: () =>
                      _navigate(context, const RelationshipQuizScreen()),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _SmallCard(
                  icon: Icons.podcasts,
                  title: 'بودكاست أمان',
                  subtitle: 'حلقات قصيرة',
                  color: Colors.teal,
                  onTap: () => _navigate(context, const PodcastScreen()),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _SectionCard(
            icon: Icons.map,
            title: 'خريطة المساعدة',
            subtitle: 'أقرب مراكز استشارية عربية في مدينتك',
            color: Colors.green,
            onTap: () => _navigate(context, const HelpMapScreen()),
          ),

          const SizedBox(height: 24),
        ],
      ),
    );
  }

  void _navigate(BuildContext context, Widget screen) {
    Navigator.push(
      context,
      MaterialPageRoute<void>(builder: (_) => screen),
    );
  }
}

class _SectionCard extends StatelessWidget {
  const _SectionCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              CircleAvatar(
                radius: 24,
                backgroundColor: color.withOpacity(0.15),
                child: Icon(icon, color: color, size: 28),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 16)),
                    const SizedBox(height: 2),
                    Text(subtitle,
                        style: TextStyle(
                            fontSize: 13,
                            color: Theme.of(context)
                                .colorScheme
                                .onSurfaceVariant)),
                  ],
                ),
              ),
              const Icon(Icons.chevron_left),
            ],
          ),
        ),
      ),
    );
  }
}

class _SmallCard extends StatelessWidget {
  const _SmallCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              CircleAvatar(
                backgroundColor: color.withOpacity(0.15),
                child: Icon(icon, color: color),
              ),
              const SizedBox(height: 8),
              Text(title,
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, fontSize: 14),
                  textAlign: TextAlign.center),
              const SizedBox(height: 2),
              Text(subtitle,
                  style: TextStyle(
                      fontSize: 12,
                      color: Theme.of(context).colorScheme.onSurfaceVariant),
                  textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }
}

class _MiniTag extends StatelessWidget {
  final String label;
  const _MiniTag(this.label);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.2),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(label,
          style: const TextStyle(color: Colors.white, fontSize: 11)),
    );
  }
}
