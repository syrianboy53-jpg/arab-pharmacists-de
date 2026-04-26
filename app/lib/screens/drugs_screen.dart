import 'package:flutter/material.dart';

import '../models.dart';
import '../repository.dart';

class DrugsScreen extends StatefulWidget {
  const DrugsScreen({super.key});

  @override
  State<DrugsScreen> createState() => _DrugsScreenState();
}

class _DrugsScreenState extends State<DrugsScreen> {
  String _query = '';
  bool _onlyRx = false;
  bool _onlyOtc = false;

  @override
  Widget build(BuildContext context) {
    final all = Repository.instance.drugs;
    final filtered = all.where((d) {
      if (_onlyRx && !d.rx) return false;
      if (_onlyOtc && d.rx) return false;
      return d.matches(_query);
    }).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Drugs · الأدوية')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: TextField(
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search),
                hintText: 'Trade name or active ingredient',
                filled: true,
                fillColor: Theme.of(context).colorScheme.surfaceContainerHighest,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: BorderSide.none,
                ),
              ),
              onChanged: (v) => setState(() => _query = v),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Row(
              children: [
                FilterChip(
                  label: const Text('Rx · بوصفة'),
                  selected: _onlyRx,
                  onSelected: (v) => setState(() {
                    _onlyRx = v;
                    if (v) _onlyOtc = false;
                  }),
                ),
                const SizedBox(width: 8),
                FilterChip(
                  label: const Text('OTC · بدون وصفة'),
                  selected: _onlyOtc,
                  onSelected: (v) => setState(() {
                    _onlyOtc = v;
                    if (v) _onlyRx = false;
                  }),
                ),
                const Spacer(),
                Text('${filtered.length}',
                    style: Theme.of(context).textTheme.bodySmall),
              ],
            ),
          ),
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(12, 4, 12, 24),
              itemCount: filtered.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (_, i) => _DrugCard(drug: filtered[i]),
            ),
          ),
        ],
      ),
    );
  }
}

class _DrugCard extends StatelessWidget {
  const _DrugCard({required this.drug});
  final Drug drug;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Card(
      child: ExpansionTile(
        shape: const Border(),
        title: Row(
          children: [
            Expanded(
              child: Text(
                drug.tradeName,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: drug.rx ? scheme.errorContainer : scheme.primaryContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                drug.rx ? 'Rx' : 'OTC',
                style: TextStyle(
                  color: drug.rx
                      ? scheme.onErrorContainer
                      : scheme.onPrimaryContainer,
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(
            '${drug.activeIngredient}${drug.drugClass != null ? ' · ${drug.drugClass}' : ''}',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ),
        childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        children: [
          if (drug.indicationsDe != null)
            _Field(
              label: 'Indikation · DE',
              value: drug.indicationsDe!,
            ),
          if (drug.indicationsAr != null)
            _Field(
              label: 'الاستطباب · AR',
              value: drug.indicationsAr!,
              rtl: true,
            ),
          if (drug.dosageAdultDe != null)
            _Field(
              label: 'Dosierung (Erwachsene)',
              value: drug.dosageAdultDe!,
            ),
          if (drug.warningsDe != null)
            _Field(
              label: 'Hinweise',
              value: drug.warningsDe!,
              warning: true,
            ),
        ],
      ),
    );
  }
}

class _Field extends StatelessWidget {
  const _Field({
    required this.label,
    required this.value,
    this.rtl = false,
    this.warning = false,
  });
  final String label;
  final String value;
  final bool rtl;
  final bool warning;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(top: 8),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: warning ? scheme.errorContainer : scheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: warning ? scheme.onErrorContainer : scheme.onSurface,
            ),
          ),
          const SizedBox(height: 4),
          Directionality(
            textDirection: rtl ? TextDirection.rtl : TextDirection.ltr,
            child: Text(
              value,
              style: TextStyle(
                color: warning ? scheme.onErrorContainer : scheme.onSurface,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
