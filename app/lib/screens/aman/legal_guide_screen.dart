import 'package:flutter/material.dart';

import '../../aman_models.dart';
import '../../aman_repository.dart';

class LegalGuideScreen extends StatelessWidget {
  const LegalGuideScreen({super.key});

  static const _categoryLabels = {
    'jugendamt': 'اليوجند امت',
    'rights': 'حقوقك وواجباتك',
    'prevention': 'خطوات وقائية',
    'general': 'معلومات عامة',
  };

  static const _categoryIcons = {
    'jugendamt': Icons.account_balance,
    'rights': Icons.shield,
    'prevention': Icons.health_and_safety,
    'general': Icons.info,
  };

  @override
  Widget build(BuildContext context) {
    final articles = AmanRepository.instance.legalArticles;
    final categories =
        articles.map((a) => a.category).toSet().toList();

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('دليل القانون والتعامل'),
        ),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _buildInfoBanner(context),
            const SizedBox(height: 16),
            for (final cat in categories) ...[
              _buildCategoryHeader(context, cat),
              const SizedBox(height: 8),
              ...articles
                  .where((a) => a.category == cat)
                  .map((a) => _ArticleTile(article: a)),
              const SizedBox(height: 16),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildInfoBanner(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      color: cs.primaryContainer,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Icon(Icons.info, color: cs.onPrimaryContainer, size: 32),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'معلومات موثوقة بعيداً عن الإشاعات',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: cs.onPrimaryContainer,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'هذا الدليل يوضح حقوقك وواجباتك بناءً على القانون الألماني الفعلي.',
                    style: TextStyle(
                      color: cs.onPrimaryContainer,
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryHeader(BuildContext context, String category) {
    final cs = Theme.of(context).colorScheme;
    return Row(
      children: [
        Icon(
          _categoryIcons[category] ?? Icons.article,
          color: cs.primary,
        ),
        const SizedBox(width: 8),
        Text(
          _categoryLabels[category] ?? category,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: cs.primary,
              ),
        ),
      ],
    );
  }
}

class _ArticleTile extends StatelessWidget {
  const _ArticleTile({required this.article});
  final LegalArticle article;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        title: Text(article.titleAr,
            style: const TextStyle(fontWeight: FontWeight.bold)),
        trailing: const Icon(Icons.chevron_left),
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute<void>(
            builder: (_) => _ArticleDetailScreen(article: article),
          ),
        ),
      ),
    );
  }
}

class _ArticleDetailScreen extends StatelessWidget {
  const _ArticleDetailScreen({required this.article});
  final LegalArticle article;

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(title: Text(article.titleAr)),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Text(
            article.bodyAr,
            style: const TextStyle(fontSize: 16, height: 1.8),
          ),
        ),
      ),
    );
  }
}
