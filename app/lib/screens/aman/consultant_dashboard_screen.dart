import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class ConsultantDashboardScreen extends StatefulWidget {
  const ConsultantDashboardScreen({super.key});

  @override
  State<ConsultantDashboardScreen> createState() =>
      _ConsultantDashboardScreenState();
}

class _ConsultantDashboardScreenState extends State<ConsultantDashboardScreen> {
  String _filterStatus = 'all';

  static const _statusLabels = {
    'all': 'الكل',
    'open': 'جديدة',
    'pending': 'قيد الرد',
    'answered': 'تم الرد',
    'closed': 'مغلقة',
  };

  static const _categoryLabels = {
    'legal': 'قانوني',
    'psychological': 'نفسي',
    'social': 'اجتماعي',
  };

  List<AnonQuestion> get _filteredTickets {
    final all = AmanRepository.instance.anonQuestions;
    if (_filterStatus == 'all') return all;
    return all.where((q) => q.status.name == _filterStatus).toList();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final tickets = _filteredTickets;
    final allTickets = AmanRepository.instance.anonQuestions;

    final openCount =
        allTickets.where((q) => q.status == TicketStatus.open).length;
    final pendingCount =
        allTickets.where((q) => q.status == TicketStatus.pending).length;
    final answeredCount =
        allTickets.where((q) => q.status == TicketStatus.answered).length;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: const Text('لوحة تحكم المستشار')),
        body: Column(
          children: [
            // Stats row
            Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  _StatChip(
                      label: 'جديدة',
                      count: openCount,
                      color: Colors.blue),
                  const SizedBox(width: 8),
                  _StatChip(
                      label: 'قيد الرد',
                      count: pendingCount,
                      color: Colors.orange),
                  const SizedBox(width: 8),
                  _StatChip(
                      label: 'تم الرد',
                      count: answeredCount,
                      color: Colors.green),
                  const SizedBox(width: 8),
                  _StatChip(
                      label: 'الكل',
                      count: allTickets.length,
                      color: cs.primary),
                ],
              ),
            ),
            // Filter chips
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                children: _statusLabels.entries
                    .map((e) => Padding(
                          padding: const EdgeInsetsDirectional.only(end: 8),
                          child: FilterChip(
                            selected: _filterStatus == e.key,
                            label: Text(e.value),
                            onSelected: (_) =>
                                setState(() => _filterStatus = e.key),
                          ),
                        ))
                    .toList(),
              ),
            ),
            const SizedBox(height: 8),
            // Ticket list
            Expanded(
              child: tickets.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.inbox,
                              size: 64, color: cs.onSurfaceVariant),
                          const SizedBox(height: 8),
                          Text('لا توجد استشارات',
                              style:
                                  TextStyle(color: cs.onSurfaceVariant)),
                        ],
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(12),
                      itemCount: tickets.length,
                      itemBuilder: (context, i) {
                        final q = tickets[tickets.length - 1 - i];
                        return _TicketCard(
                          ticket: q,
                          categoryLabel:
                              _categoryLabels[q.category] ?? q.category,
                          cs: cs,
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  final String label;
  final int count;
  final Color color;

  const _StatChip({
    required this.label,
    required this.count,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Text(
              '$count',
              style: TextStyle(
                  fontSize: 20, fontWeight: FontWeight.bold, color: color),
            ),
            Text(label, style: TextStyle(fontSize: 11, color: color)),
          ],
        ),
      ),
    );
  }
}

class _TicketCard extends StatelessWidget {
  final AnonQuestion ticket;
  final String categoryLabel;
  final ColorScheme cs;

  const _TicketCard({
    required this.ticket,
    required this.categoryLabel,
    required this.cs,
  });

  Color get _statusColor => switch (ticket.status) {
        TicketStatus.open => Colors.blue,
        TicketStatus.pending => Colors.orange,
        TicketStatus.answered => Colors.green,
        TicketStatus.closed => Colors.grey,
      };

  String get _statusLabel => switch (ticket.status) {
        TicketStatus.open => 'جديدة',
        TicketStatus.pending => 'قيد الرد',
        TicketStatus.answered => 'تم الرد',
        TicketStatus.closed => 'مغلقة',
      };

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: cs.primaryContainer,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '#${ticket.ticketNumber}',
                    style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: cs.onPrimaryContainer),
                  ),
                ),
                const SizedBox(width: 6),
                if (ticket.isPremium)
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: Colors.amber.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.star, size: 12, color: Colors.amber),
                        SizedBox(width: 2),
                        Text('مميز',
                            style:
                                TextStyle(fontSize: 10, color: Colors.amber)),
                      ],
                    ),
                  ),
                const Spacer(),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: _statusColor.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(_statusLabel,
                      style: TextStyle(
                          fontSize: 11,
                          color: _statusColor,
                          fontWeight: FontWeight.w600)),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Chip(
                  label:
                      Text(categoryLabel, style: const TextStyle(fontSize: 11)),
                  visualDensity: VisualDensity.compact,
                ),
                const Spacer(),
                Text(ticket.date,
                    style:
                        TextStyle(fontSize: 11, color: cs.onSurfaceVariant)),
              ],
            ),
            const SizedBox(height: 8),
            Text(ticket.questionAr),
            if (ticket.attachmentNames.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Wrap(
                  spacing: 4,
                  children: ticket.attachmentNames
                      .map((n) => Chip(
                            avatar: const Icon(Icons.attach_file, size: 14),
                            label:
                                Text(n, style: const TextStyle(fontSize: 11)),
                            visualDensity: VisualDensity.compact,
                          ))
                      .toList(),
                ),
              ),
            if (ticket.answerAr != null) ...[
              const Divider(),
              Row(
                children: [
                  Icon(Icons.reply, color: cs.primary, size: 16),
                  const SizedBox(width: 4),
                  Text('الرد (${ticket.answeredBy ?? "مستشار"}):',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: cs.primary,
                          fontSize: 13)),
                ],
              ),
              const SizedBox(height: 4),
              Text(ticket.answerAr!),
            ],
          ],
        ),
      ),
    );
  }
}
