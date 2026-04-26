import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models.dart';
import '../repository.dart';

class TermDetailScreen extends StatelessWidget {
  const TermDetailScreen({super.key, required this.term});
  final Term term;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final cat = Repository.instance.categoryById(term.category);
    return Scaffold(
      appBar: AppBar(
        title: Text(term.de),
        actions: [
          IconButton(
            icon: const Icon(Icons.copy),
            tooltip: 'Copy',
            onPressed: () {
              Clipboard.setData(
                ClipboardData(text: '${term.en} · ${term.de} · ${term.ar}'),
              );
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Copied to clipboard')),
              );
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          if (cat != null)
            Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: scheme.primaryContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                '${cat.de} · ${cat.en} · ${cat.ar}',
                style: TextStyle(color: scheme.onPrimaryContainer),
              ),
            ),
          const SizedBox(height: 16),
          _LangRow(label: 'EN', value: term.en, definition: term.definitionEn),
          const SizedBox(height: 12),
          _LangRow(label: 'DE', value: term.de, definition: term.definitionDe),
          const SizedBox(height: 12),
          _LangRow(
            label: 'AR',
            value: term.ar,
            definition: term.definitionAr,
            rtl: true,
          ),
          if (term.exampleDe != null) ...[
            const SizedBox(height: 24),
            Text('Beispiel · مثال',
                style: Theme.of(context).textTheme.titleSmall),
            const SizedBox(height: 4),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: scheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(term.exampleDe!),
            ),
          ],
        ],
      ),
    );
  }
}

class _LangRow extends StatelessWidget {
  const _LangRow({
    required this.label,
    required this.value,
    this.definition,
    this.rtl = false,
  });

  final String label;
  final String value;
  final String? definition;
  final bool rtl;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 40,
          height: 40,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: scheme.primary,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: scheme.onPrimary,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Directionality(
            textDirection: rtl ? TextDirection.rtl : TextDirection.ltr,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  value,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                ),
                if (definition != null && definition!.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(
                    definition!,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }
}
