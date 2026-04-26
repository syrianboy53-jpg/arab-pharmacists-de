import 'package:flutter/material.dart';

import '../models.dart';
import '../repository.dart';
import 'term_detail_screen.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  String _query = '';

  @override
  Widget build(BuildContext context) {
    final repo = Repository.instance;
    final terms = _query.isEmpty ? <Term>[] : repo.searchTerms(_query);
    final drugs =
        _query.isEmpty ? <Drug>[] : repo.drugs.where((d) => d.matches(_query)).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Search · بحث')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: TextField(
              autofocus: true,
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search),
                hintText: 'EN / DE / عربي / drug name',
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
          Expanded(
            child: _query.isEmpty
                ? const _Hint()
                : ListView(
                    padding: const EdgeInsets.fromLTRB(12, 4, 12, 24),
                    children: [
                      if (terms.isNotEmpty) ...[
                        _SectionHeader(
                          title: 'Terms · مصطلحات',
                          count: terms.length,
                        ),
                        for (final t in terms.take(40))
                          _TermResult(term: t),
                      ],
                      if (drugs.isNotEmpty) ...[
                        const SizedBox(height: 16),
                        _SectionHeader(
                          title: 'Drugs · أدوية',
                          count: drugs.length,
                        ),
                        for (final d in drugs.take(40))
                          _DrugResult(drug: d),
                      ],
                      if (terms.isEmpty && drugs.isEmpty) ...[
                        const SizedBox(height: 32),
                        Center(
                          child: Text(
                            'No matches.\nلا توجد نتائج.',
                            textAlign: TextAlign.center,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ),
                      ],
                    ],
                  ),
          ),
        ],
      ),
    );
  }
}

class _Hint extends StatelessWidget {
  const _Hint();
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.search,
                size: 64,
                color: Theme.of(context).colorScheme.outline),
            const SizedBox(height: 12),
            Text(
              'Search across terms and drugs in EN, DE, or Arabic.\nابحث في المصطلحات والأدوية بأي لغة.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({required this.title, required this.count});
  final String title;
  final int count;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 8, 4, 8),
      child: Row(
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
          ),
          const SizedBox(width: 8),
          Text('($count)', style: Theme.of(context).textTheme.bodySmall),
        ],
      ),
    );
  }
}

class _TermResult extends StatelessWidget {
  const _TermResult({required this.term});
  final Term term;
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        title: Text(term.de,
            style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Directionality(
          textDirection: TextDirection.rtl,
          child: Text(term.ar),
        ),
        trailing: Text(term.en,
            style: Theme.of(context).textTheme.bodySmall),
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => TermDetailScreen(term: term)),
        ),
      ),
    );
  }
}

class _DrugResult extends StatelessWidget {
  const _DrugResult({required this.drug});
  final Drug drug;
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: const Icon(Icons.medication),
        title: Text(drug.tradeName,
            style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(drug.activeIngredient),
        trailing: Text(drug.rx ? 'Rx' : 'OTC'),
      ),
    );
  }
}
