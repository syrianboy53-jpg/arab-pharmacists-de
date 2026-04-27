import 'package:flutter/material.dart';

import '../ammaar_models.dart';
import '../ammaar_repository.dart';

class AdminSubscriptionsScreen extends StatefulWidget {
  const AdminSubscriptionsScreen({super.key});

  @override
  State<AdminSubscriptionsScreen> createState() =>
      _AdminSubscriptionsScreenState();
}

class _AdminSubscriptionsScreenState extends State<AdminSubscriptionsScreen> {
  List<UserProfile> get _profiles => AmmaarRepository.instance.userProfiles;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('إدارة الاشتراكات')),
        body: _profiles.isEmpty
            ? Center(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.people_outline, size: 64, color: cs.outline),
                      const SizedBox(height: 16),
                      const Text(
                        'لا يوجد مستخدمون مسجلون بعد',
                        style: TextStyle(fontSize: 16),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'عندما يسجل المستخدمون في التطبيق ستظهر حساباتهم هنا',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                ),
              )
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: _profiles.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (context, i) {
                  final p = _profiles[i];
                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              CircleAvatar(
                                backgroundColor: cs.primaryContainer,
                                child: Text(
                                  p.name.isNotEmpty ? p.name[0] : '?',
                                  style: TextStyle(color: cs.onPrimaryContainer),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(p.name,
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 15)),
                                    Text(
                                      p.role == UserRole.worker
                                          ? 'صنايعي${p.specialty != null ? " — ${p.specialty}" : ""}'
                                          : 'صاحب عمل',
                                      style: TextStyle(
                                          color: cs.outline, fontSize: 13),
                                    ),
                                  ],
                                ),
                              ),
                              if (p.isVerified)
                                Icon(Icons.verified,
                                    color: cs.primary, size: 20),
                            ],
                          ),
                          const Divider(),
                          Row(
                            children: [
                              const Text('الهاتف: '),
                              Text(p.phone),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              const Text('حالة الاشتراك: '),
                              _statusChip(p.subscriptionStatus, cs),
                            ],
                          ),
                          if (p.subscriptionPlan != null) ...[
                            const SizedBox(height: 4),
                            Row(
                              children: [
                                const Text('الباقة: '),
                                Text(p.subscriptionPlan!),
                              ],
                            ),
                          ],
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              if (p.subscriptionStatus !=
                                  SubscriptionStatus.active)
                                FilledButton.icon(
                                  icon: const Icon(Icons.check_circle, size: 18),
                                  label: const Text('تفعيل'),
                                  onPressed: () => _activate(p),
                                ),
                              if (p.subscriptionStatus ==
                                  SubscriptionStatus.active) ...[
                                FilledButton.tonalIcon(
                                  icon: const Icon(Icons.cancel, size: 18),
                                  label: const Text('تعطيل'),
                                  onPressed: () => _deactivate(p),
                                ),
                              ],
                              const SizedBox(width: 8),
                              OutlinedButton.icon(
                                icon: Icon(
                                  p.isVerified
                                      ? Icons.verified
                                      : Icons.verified_outlined,
                                  size: 18,
                                ),
                                label: Text(
                                    p.isVerified ? 'إلغاء التوثيق' : 'توثيق'),
                                onPressed: () => _toggleVerified(p),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }

  Widget _statusChip(SubscriptionStatus status, ColorScheme cs) {
    String label;
    Color bg;
    switch (status) {
      case SubscriptionStatus.free:
        label = 'مجاني';
        bg = cs.surfaceContainerHighest;
      case SubscriptionStatus.pending:
        label = 'بانتظار التفعيل';
        bg = Colors.orange.shade100;
      case SubscriptionStatus.active:
        label = 'فعّال';
        bg = Colors.green.shade100;
      case SubscriptionStatus.expired:
        label = 'منتهي';
        bg = Colors.red.shade100;
    }
    return Chip(
      label: Text(label, style: const TextStyle(fontSize: 12)),
      backgroundColor: bg,
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      visualDensity: VisualDensity.compact,
    );
  }

  Future<void> _activate(UserProfile p) async {
    final plans = AmmaarRepository.instance.subscriptionPlans;
    String? selectedPlan;
    if (plans.isNotEmpty) {
      selectedPlan = await showDialog<String>(
        context: context,
        builder: (ctx) => Directionality(
          textDirection: TextDirection.rtl,
          child: SimpleDialog(
            title: const Text('اختر الباقة'),
            children: plans
                .map((pl) => SimpleDialogOption(
                      onPressed: () => Navigator.pop(ctx, pl.nameAr),
                      child: Text(pl.nameAr),
                    ))
                .toList(),
          ),
        ),
      );
      if (selectedPlan == null) return;
    }
    await AmmaarRepository.instance.updateSubscriptionStatus(
      p.id,
      SubscriptionStatus.active,
      plan: selectedPlan,
    );
    setState(() {});
  }

  Future<void> _deactivate(UserProfile p) async {
    await AmmaarRepository.instance.updateSubscriptionStatus(
      p.id,
      SubscriptionStatus.expired,
    );
    setState(() {});
  }

  Future<void> _toggleVerified(UserProfile p) async {
    setState(() => p.isVerified = !p.isVerified);
    await AmmaarRepository.instance.saveUserProfiles();
  }
}
