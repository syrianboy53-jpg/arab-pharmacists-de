import 'package:flutter/material.dart';

import '../ammaar_models.dart';
import '../ammaar_repository.dart';

class SubscriptionScreen extends StatelessWidget {
  const SubscriptionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final plans = AmmaarRepository.instance.subscriptionPlans;
    final accounts = AmmaarRepository.instance.paymentAccounts
        .where((a) => a.enabled)
        .toList();
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('اشتراك VIP — عمّار')),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header
              Card(
                color: cs.primaryContainer,
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      Icon(Icons.star, size: 48, color: cs.onPrimaryContainer),
                      const SizedBox(height: 8),
                      Text(
                        'شريك الإعمار',
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: cs.onPrimaryContainer,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'اشترك الآن واحصل على جميع الميزات المميزة',
                        style: TextStyle(color: cs.onPrimaryContainer),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // VIP features
              const Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('مميزات الاشتراك',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 16)),
                      SizedBox(height: 12),
                      _FeatureRow(
                          icon: Icons.visibility,
                          text: 'ظهور مميز في نتائج البحث'),
                      _FeatureRow(
                          icon: Icons.notifications_active,
                          text: 'إشعارات فورية بطلبات العمل القريبة'),
                      _FeatureRow(
                          icon: Icons.verified,
                          text: 'شارة التوثيق على الملف الشخصي'),
                      _FeatureRow(
                          icon: Icons.message,
                          text: 'تواصل مباشر مع أصحاب العمل'),
                      _FeatureRow(
                          icon: Icons.analytics,
                          text: 'إحصائيات مشاهدة الملف الشخصي'),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Plans
              const Text('اختر الباقة المناسبة',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              const SizedBox(height: 8),
              ...plans.map((plan) => Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: _PlanCard(plan: plan),
                  )),
              const SizedBox(height: 16),

              // Payment methods
              if (accounts.isNotEmpty) ...[
                const Text('طرق الدفع المتاحة',
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 8),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      children: accounts
                          .map((a) => Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 6),
                                child: Row(
                                  children: [
                                    Icon(_methodIcon(a.method),
                                        color: cs.primary),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(a.label,
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold)),
                                          Text(
                                            '${a.accountNumber} — ${a.holderName}',
                                            style: TextStyle(
                                                fontSize: 13,
                                                color: cs.outline),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ))
                          .toList(),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
              ],

              // Request activation button
              FilledButton.icon(
                icon: const Icon(Icons.send),
                label: const Text('لقد قمت بالدفع — تفعيل حسابي'),
                onPressed: () => _showActivationForm(context),
                style: FilledButton.styleFrom(
                  minimumSize: const Size.fromHeight(48),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'بعد إرسال طلبك، سيتم مراجعته وتفعيل حسابك خلال ساعات',
                style: TextStyle(fontSize: 12, color: cs.outline),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  IconData _methodIcon(String method) {
    switch (method) {
      case 'syriatel_cash':
        return Icons.phone_android;
      case 'sham_cash':
        return Icons.phone_iphone;
      case 'al_haram':
        return Icons.send;
      default:
        return Icons.account_balance;
    }
  }

  void _showActivationForm(BuildContext context) {
    final phoneCtrl = TextEditingController();
    String paymentMethod = 'syriatel_cash';

    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (ctx) => Directionality(
        textDirection: TextDirection.rtl,
        child: Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(ctx).viewInsets.bottom,
            right: 16,
            left: 16,
            top: 24,
          ),
          child: StatefulBuilder(
            builder: (ctx, setSheetState) => Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'طلب تفعيل الاشتراك',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: paymentMethod,
                  decoration: const InputDecoration(labelText: 'وسيلة الدفع'),
                  items: const [
                    DropdownMenuItem(
                        value: 'syriatel_cash', child: Text('سيريتل كاش')),
                    DropdownMenuItem(
                        value: 'sham_cash', child: Text('شام كاش')),
                    DropdownMenuItem(
                        value: 'al_haram', child: Text('الهرم للحوالات')),
                  ],
                  onChanged: (v) => setSheetState(
                      () => paymentMethod = v ?? paymentMethod),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: phoneCtrl,
                  decoration: const InputDecoration(
                    labelText: 'رقم الموبايل الذي حوّلت منه',
                    prefixIcon: Icon(Icons.phone),
                  ),
                  keyboardType: TextInputType.phone,
                ),
                const SizedBox(height: 12),
                OutlinedButton.icon(
                  icon: const Icon(Icons.upload_file),
                  label: const Text('إرفاق صورة وصل الدفع'),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                          content:
                              Text('ميزة رفع الصور ستكون متاحة قريباً')),
                    );
                  },
                ),
                const SizedBox(height: 16),
                FilledButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    // Mark the user's subscription as pending
                    final profiles =
                        AmmaarRepository.instance.userProfiles;
                    if (profiles.isNotEmpty) {
                      AmmaarRepository.instance.updateSubscriptionStatus(
                        profiles.first.id,
                        SubscriptionStatus.pending,
                      );
                    }
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text(
                            'تم إرسال طلبك بنجاح! سنراجعه ونفعّل حسابك قريباً'),
                      ),
                    );
                  },
                  child: const Text('إرسال الطلب'),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _FeatureRow extends StatelessWidget {
  final IconData icon;
  final String text;

  const _FeatureRow({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(icon, size: 20, color: Theme.of(context).colorScheme.primary),
          const SizedBox(width: 8),
          Expanded(child: Text(text)),
        ],
      ),
    );
  }
}

class _PlanCard extends StatelessWidget {
  final SubscriptionPlan plan;

  const _PlanCard({required this.plan});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final isLifetime = plan.duration == 'lifetime';
    return Card(
      color: isLifetime ? cs.primaryContainer : null,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Icon(
              isLifetime ? Icons.diamond : Icons.card_membership,
              color: isLifetime ? cs.onPrimaryContainer : cs.primary,
              size: 32,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(plan.nameAr,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 15)),
                  Text(plan.descriptionAr,
                      style: TextStyle(fontSize: 13, color: cs.outline)),
                ],
              ),
            ),
            Text(
              _formatPrice(plan.priceSyp),
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 15,
                color: cs.primary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatPrice(double price) {
    if (price >= 1000000) {
      final m = price / 1000000;
      return '${m.toStringAsFixed(m.truncateToDouble() == m ? 0 : 1)} مليون ل.س';
    }
    if (price >= 1000) {
      final k = price / 1000;
      return '${k.toStringAsFixed(k.truncateToDouble() == k ? 0 : 1)} ألف ل.س';
    }
    return '${price.toStringAsFixed(0)} ل.س';
  }
}
