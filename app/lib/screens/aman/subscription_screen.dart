import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  late final List<AmanPlan> _plans;

  @override
  void initState() {
    super.initState();
    _plans = AmanRepository.instance.plans;
  }

  AmanSubscription get _sub => AmanRepository.instance.activeSubscription;

  Future<void> _selectPlan(AmanPlan plan) async {
    if (plan.id == 'plan-free') {
      await AmanRepository.instance.updateSubscription(
        const AmanSubscription(tier: AmanTier.free),
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('تم التبديل إلى الخطة المجانية')),
      );
    } else {
      // Simulate premium activation (payment integration placeholder).
      await AmanRepository.instance.updateSubscription(
        AmanSubscription(
          tier: AmanTier.premium,
          activePlanId: plan.id,
          expiresAt: DateTime.now()
              .add(plan.duration == 'yearly'
                  ? const Duration(days: 365)
                  : const Duration(days: 30))
              .toIso8601String()
              .split('T')
              .first,
        ),
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('تم تفعيل ${plan.nameAr} بنجاح!')),
      );
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('خطط الاشتراك')),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              color: cs.primaryContainer,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(
                      _sub.isPremium ? Icons.star : Icons.star_border,
                      color: cs.onPrimaryContainer,
                      size: 32,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _sub.isPremium
                                ? 'عضوية مميزة نشطة'
                                : 'الخطة المجانية',
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: cs.onPrimaryContainer,
                                ),
                          ),
                          if (_sub.expiresAt != null)
                            Text(
                              'تنتهي: ${_sub.expiresAt}',
                              style: TextStyle(
                                  color: cs.onPrimaryContainer, fontSize: 13),
                            ),
                          if (!_sub.isPremium)
                            Text(
                              'أسئلة مستخدمة: ${_sub.questionsUsedThisMonth}'
                              '/${_sub.maxQuestionsPerMonth} هذا الشهر',
                              style: TextStyle(
                                  color: cs.onPrimaryContainer, fontSize: 13),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'اختر خطتك',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 16),
            for (final plan in _plans) ...[
              _PlanCard(
                plan: plan,
                isActive:
                    (plan.id == 'plan-free' && !_sub.isPremium) ||
                    (plan.id == _sub.activePlanId),
                onSelect: () => _selectPlan(plan),
              ),
              const SizedBox(height: 12),
            ],
            const SizedBox(height: 24),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.payment, color: cs.primary),
                        const SizedBox(width: 8),
                        Text(
                          'وسائل الدفع المتاحة',
                          style:
                              Theme.of(context).textTheme.titleSmall?.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const _PaymentMethodRow(
                        icon: Icons.account_balance_wallet,
                        label: 'PayPal'),
                    const _PaymentMethodRow(
                        icon: Icons.credit_card, label: 'Klarna'),
                    const _PaymentMethodRow(
                        icon: Icons.credit_card,
                        label: 'Kreditkarte / بطاقة ائتمان'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'ملاحظة: بوابة الدفع قيد التطوير. يتم تفعيل '
              'الاشتراك تجريبياً في هذه النسخة.',
              style: TextStyle(
                color: cs.onSurfaceVariant,
                fontStyle: FontStyle.italic,
                fontSize: 12,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _PlanCard extends StatelessWidget {
  final AmanPlan plan;
  final bool isActive;
  final VoidCallback onSelect;

  const _PlanCard({
    required this.plan,
    required this.isActive,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isFree = plan.priceEur == 0;
    final recommended = plan.duration == 'yearly';

    return Card(
      elevation: recommended ? 4 : 1,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: recommended
            ? BorderSide(color: cs.primary, width: 2)
            : BorderSide.none,
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    plan.nameAr,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                ),
                if (recommended)
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: cs.primary,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'مُوصى به',
                      style: TextStyle(
                          color: cs.onPrimary,
                          fontSize: 12,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 4),
            Text(plan.descriptionAr,
                style: TextStyle(color: cs.onSurfaceVariant)),
            const SizedBox(height: 12),
            Text(
              isFree ? 'مجاني' : '${plan.priceEur.toStringAsFixed(0)}€',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: cs.primary,
                  ),
            ),
            if (!isFree)
              Text(
                plan.duration == 'monthly' ? 'شهرياً' : 'سنوياً',
                style: TextStyle(color: cs.onSurfaceVariant),
              ),
            const SizedBox(height: 12),
            ...plan.features.map((f) => Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Row(
                    children: [
                      Icon(Icons.check, color: cs.primary, size: 18),
                      const SizedBox(width: 8),
                      Expanded(child: Text(f, style: const TextStyle(fontSize: 14))),
                    ],
                  ),
                )),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: isActive
                  ? const OutlinedButton(
                      onPressed: null,
                      child: Text('الخطة الحالية'),
                    )
                  : FilledButton(
                      onPressed: onSelect,
                      child: Text(isFree ? 'التبديل للمجاني' : 'اشترك الآن'),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PaymentMethodRow extends StatelessWidget {
  final IconData icon;
  final String label;
  const _PaymentMethodRow({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        children: [
          Icon(icon, size: 20, color: Theme.of(context).colorScheme.primary),
          const SizedBox(width: 8),
          Text(label),
        ],
      ),
    );
  }
}
