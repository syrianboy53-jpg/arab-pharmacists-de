import 'package:flutter/material.dart';
import '../data/vocab_data.dart';

class WortschatzScreen extends StatefulWidget {
  const WortschatzScreen({super.key});
  @override
  State<WortschatzScreen> createState() => _WortschatzScreenState();
}

class _WortschatzScreenState extends State<WortschatzScreen> {
  int? _selectedCategory;
  String _search = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('المفردات - Wortschatz'),
        centerTitle: true,
      ),
      body: _selectedCategory == null ? _buildCategoryList() : _buildWordList(),
    );
  }

  Widget _buildCategoryList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: vocabCategories.length,
      itemBuilder: (ctx, i) {
        final cat = vocabCategories[i];
        final words = List.from(cat['words'] as List? ?? []);
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
              child: Text('${words.length}', style: const TextStyle(fontSize: 12)),
            ),
            title: Text(cat['titleAr'] as String? ?? cat['id'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(cat['titleDe'] as String? ?? ''),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () => setState(() => _selectedCategory = i),
          ),
        );
      },
    );
  }

  Widget _buildWordList() {
    final cat = vocabCategories[_selectedCategory!];
    final allWords = List<Map<String, dynamic>>.from(cat['words'] as List? ?? []);
    final words = _search.isEmpty ? allWords : allWords.where((w) {
      final de = (w['de'] ?? '').toString().toLowerCase();
      final ar = (w['ar'] ?? '').toString().toLowerCase();
      return de.contains(_search.toLowerCase()) || ar.contains(_search.toLowerCase());
    }).toList();

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => setState(() { _selectedCategory = null; _search = ''; })),
              Expanded(child: Text(cat['titleAr'] as String? ?? '', style: Theme.of(context).textTheme.titleLarge)),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: TextField(
            decoration: InputDecoration(
              hintText: 'بحث...',
              prefixIcon: const Icon(Icons.search),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            ),
            onChanged: (v) => setState(() => _search = v),
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: words.length,
            itemBuilder: (ctx, i) {
              final w = words[i];
              return Card(
                margin: const EdgeInsets.only(bottom: 8),
                child: ListTile(
                  title: Text(w['de'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold), textDirection: TextDirection.ltr),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(w['ar'] as String? ?? ''),
                      if (w['example'] != null) Text(w['example'] as String, style: TextStyle(fontSize: 12, color: Colors.grey[600], fontStyle: FontStyle.italic), textDirection: TextDirection.ltr),
                    ],
                  ),
                  isThreeLine: w['example'] != null,
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
