import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';
import 'private_chat_room_screen.dart';

class PrivateSessionBookingScreen extends StatefulWidget {
  const PrivateSessionBookingScreen({super.key});

  @override
  State<PrivateSessionBookingScreen> createState() =>
      _PrivateSessionBookingScreenState();
}

class _PrivateSessionBookingScreenState
    extends State<PrivateSessionBookingScreen> {
  final _aliasController = TextEditingController();
  AvailableTimeSlot? _selectedSlot;
  bool _agreedToTerms = false;
  bool _paymentDone = false;

  static const _suggestedAliases = [
    'فاعل خير',
    'أمل',
    'صبر',
    'نور',
    'سلام',
    'رحمة',
    'قوة',
    'حياة',
  ];

  @override
  void dispose() {
    _aliasController.dispose();
    super.dispose();
  }

  List<PrivateSession> get _bookedSessions =>
      AmanRepository.instance.privateSessions
          .where((s) => s.status != PrivateSessionStatus.destroyed)
          .toList();

  Map<String, List<AvailableTimeSlot>> get _slotsByDay {
    final map = <String, List<AvailableTimeSlot>>{};
    for (final slot in AmanRepository.instance.privateSlots) {
      map.putIfAbsent(slot.dayAr, () => []).add(slot);
    }
    return map;
  }

  Future<void> _simulatePayment() async {
    // Payment simulation — in production, integrate PayPal/Google Pay/Apple Pay.
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('تأكيد الدفع', textDirection: TextDirection.rtl),
        content: const Text(
          'سيتم خصم 1 يورو فقط لحجز الجدية.\n\n'
          'طرق الدفع المتاحة:\n'
          '• PayPal\n'
          '• Apple Pay / Google Pay\n'
          '• بطاقة ائتمان\n\n'
          '(هذا محاكاة — سيتم ربط بوابة الدفع الحقيقية لاحقاً)',
          textDirection: TextDirection.rtl,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('إلغاء'),
          ),
          FilledButton.icon(
            onPressed: () => Navigator.pop(ctx, true),
            icon: const Icon(Icons.payment),
            label: const Text('ادفع 1€'),
          ),
        ],
      ),
    );
    if (confirmed == true) {
      setState(() => _paymentDone = true);
    }
  }

  Future<void> _bookSession() async {
    final alias = _aliasController.text.trim();
    if (alias.isEmpty || _selectedSlot == null) return;

    final now = DateTime.now();
    final session = PrivateSession(
      id: 'ps-${now.millisecondsSinceEpoch}',
      alias: alias,
      date: now.toIso8601String().split('T').first,
      timeSlot: _selectedSlot!.time,
      consultantAlias: _selectedSlot!.consultantAlias,
      createdAt: now.toIso8601String(),
    );

    await AmanRepository.instance.bookPrivateSession(session);

    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
          content: Text(
              'تم حجز جلستك بنجاح — الموعد: ${_selectedSlot!.dayAr} '
              '${_selectedSlot!.time}')),
    );
    setState(() {
      _aliasController.clear();
      _selectedSlot = null;
      _agreedToTerms = false;
      _paymentDone = false;
    });
  }

  void _openSession(PrivateSession session) {
    Navigator.of(context).push(MaterialPageRoute<void>(
      builder: (_) => PrivateChatRoomScreen(session: session),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('الجلسة السرية 🛡️'),
        ),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // --- Info card ---
            Card(
              color: cs.primaryContainer,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.shield, color: cs.onPrimaryContainer),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'مساحة آمنة تماماً للحديث عما يقلقك',
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: cs.onPrimaryContainer,
                                ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'مستشارنا يسمعك ويوجهك قانونياً واجتماعياً '
                      'بعيداً عن أعين الجميع.',
                      style: TextStyle(color: cs.onPrimaryContainer),
                    ),
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 8,
                      runSpacing: 4,
                      children: [
                        _InfoChip(
                            icon: Icons.timer, label: '25 دقيقة', cs: cs),
                        _InfoChip(
                            icon: Icons.euro, label: '1€ فقط', cs: cs),
                        _InfoChip(
                            icon: Icons.delete_forever,
                            label: 'تدمير ذاتي',
                            cs: cs),
                        _InfoChip(
                            icon: Icons.no_photography,
                            label: 'منع التصوير',
                            cs: cs),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: cs.onPrimaryContainer.withOpacity(0.08),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        children: [
                          Icon(Icons.lock,
                              size: 16, color: cs.onPrimaryContainer),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text(
                              'نحن لا نسجل الجلسات، ولا نشارك بياناتك مع '
                              'أي جهة رسمية في ألمانيا.',
                              style: TextStyle(
                                  fontSize: 12,
                                  color: cs.onPrimaryContainer),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // --- Existing sessions ---
            if (_bookedSessions.isNotEmpty) ...[
              Text(
                'جلساتك',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 8),
              for (final session in _bookedSessions)
                Card(
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: _statusColor(session.status),
                      child: Icon(
                        _statusIcon(session.status),
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                    title: Text('${session.alias} — ${session.timeSlot}'),
                    subtitle: Text(
                      '${session.date} • ${_statusLabel(session.status)}',
                    ),
                    trailing: session.status == PrivateSessionStatus.booked
                        ? FilledButton(
                            onPressed: () => _openSession(session),
                            child: const Text('ابدأ'),
                          )
                        : session.status == PrivateSessionStatus.active
                            ? OutlinedButton(
                                onPressed: () => _openSession(session),
                                child: const Text('متابعة'),
                              )
                            : null,
                  ),
                ),
              const SizedBox(height: 24),
            ],

            // --- Booking section ---
            Text(
              'احجز جلسة جديدة',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 12),

            // Step 1: Choose alias
            Text('1. اختر اسمك المستعار',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 8),
            TextField(
              controller: _aliasController,
              decoration: const InputDecoration(
                hintText: 'مثال: أمل، فاعل خير...',
                prefixIcon: Icon(Icons.person_outline),
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 6,
              runSpacing: 4,
              children: _suggestedAliases
                  .map((a) => ActionChip(
                        label: Text(a),
                        onPressed: () =>
                            setState(() => _aliasController.text = a),
                      ))
                  .toList(),
            ),

            const SizedBox(height: 20),

            // Step 2: Choose time slot
            Text('2. اختر الموعد',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 8),
            for (final entry in _slotsByDay.entries) ...[
              Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 4),
                child: Text(entry.key,
                    style: const TextStyle(fontWeight: FontWeight.bold)),
              ),
              Wrap(
                spacing: 8,
                runSpacing: 4,
                children: entry.value
                    .map((slot) => ChoiceChip(
                          label: Text(
                              '${slot.time} — ${slot.consultantAlias}'),
                          selected: _selectedSlot?.id == slot.id,
                          onSelected: (_) =>
                              setState(() => _selectedSlot = slot),
                        ))
                    .toList(),
              ),
            ],

            const SizedBox(height: 20),

            // Step 3: Terms + Payment
            Text('3. تأكيد السرية والدفع',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 8),
            CheckboxListTile(
              value: _agreedToTerms,
              onChanged: (v) => setState(() => _agreedToTerms = v ?? false),
              title: const Text(
                'بياناتي مشفرة، لا يتم تسجيل الجلسة، '
                'وهويتي محمية بموجب قانون الخصوصية الألماني (DSGVO).',
                style: TextStyle(fontSize: 13),
              ),
              controlAffinity: ListTileControlAffinity.leading,
              contentPadding: EdgeInsets.zero,
            ),
            const SizedBox(height: 8),
            if (!_paymentDone)
              OutlinedButton.icon(
                onPressed: _agreedToTerms ? _simulatePayment : null,
                icon: const Icon(Icons.payment),
                label: const Text('ادفع 1€ لتأكيد الحجز'),
              )
            else
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.green.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.green),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.check_circle, color: Colors.green, size: 20),
                    SizedBox(width: 8),
                    Text('تم الدفع بنجاح',
                        style: TextStyle(color: Colors.green)),
                  ],
                ),
              ),

            const SizedBox(height: 20),

            // Book button
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: _aliasController.text.trim().isNotEmpty &&
                        _selectedSlot != null &&
                        _agreedToTerms &&
                        _paymentDone
                    ? _bookSession
                    : null,
                icon: const Icon(Icons.event_available),
                label: const Text('احجز موعدك الآن'),
              ),
            ),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Color _statusColor(PrivateSessionStatus status) {
    switch (status) {
      case PrivateSessionStatus.booked:
        return Colors.blue;
      case PrivateSessionStatus.active:
        return Colors.green;
      case PrivateSessionStatus.ended:
        return Colors.grey;
      case PrivateSessionStatus.destroyed:
        return Colors.red;
    }
  }

  IconData _statusIcon(PrivateSessionStatus status) {
    switch (status) {
      case PrivateSessionStatus.booked:
        return Icons.event;
      case PrivateSessionStatus.active:
        return Icons.chat;
      case PrivateSessionStatus.ended:
        return Icons.check;
      case PrivateSessionStatus.destroyed:
        return Icons.delete_forever;
    }
  }

  String _statusLabel(PrivateSessionStatus status) {
    switch (status) {
      case PrivateSessionStatus.booked:
        return 'محجوزة';
      case PrivateSessionStatus.active:
        return 'نشطة';
      case PrivateSessionStatus.ended:
        return 'منتهية';
      case PrivateSessionStatus.destroyed:
        return 'محذوفة';
    }
  }
}

class _InfoChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final ColorScheme cs;

  const _InfoChip({required this.icon, required this.label, required this.cs});

  @override
  Widget build(BuildContext context) {
    return Chip(
      avatar: Icon(icon, size: 16, color: cs.onPrimaryContainer),
      label: Text(label, style: const TextStyle(fontSize: 12)),
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      visualDensity: VisualDensity.compact,
    );
  }
}
