import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/vocab_data.dart';
import '../providers/app_provider.dart';

class WortschatzScreen extends StatefulWidget {
  const WortschatzScreen({super.key});
  @override
  State<WortschatzScreen> createState() => _WortschatzScreenState();
}

class _WortschatzScreenState extends State<WortschatzScreen> {
  int? _selectedCategory;
  String _search = '';

  IconData _getCategoryIcon(String id) {
    switch (id) {
      case 'apotheke-medizin':
        return Icons.local_hospital_rounded;
      case 'alltag':
        return Icons.wb_sunny_rounded;
      case 'arbeit':
        return Icons.work_rounded;
      case 'wohnen':
        return Icons.home_rounded;
      case 'gesundheit':
        return Icons.healing_rounded;
      case 'behoerden':
        return Icons.gavel_rounded;
      case 'schule':
        return Icons.school_rounded;
      case 'verkehr':
        return Icons.directions_bus_rounded;
      case 'einkaufen':
        return Icons.shopping_bag_rounded;
      case 'freizeit':
        return Icons.sports_esports_rounded;
      case 'konnektoren':
        return Icons.link_rounded;
      case 'meinung':
        return Icons.forum_rounded;
      case 'koerper':
        return Icons.accessibility_new_rounded;
      case 'geld':
        return Icons.monetization_on_rounded;
      case 'amt':
        return Icons.account_balance_rounded;
      case 'shopping':
        return Icons.shopping_cart_rounded;
      case 'gefuehle':
        return Icons.sentiment_satisfied_alt_rounded;
      case 'haushalt':
        return Icons.kitchen_rounded;
      case 'umwelt':
        return Icons.eco_rounded;
      case 'zeit':
        return Icons.access_time_filled_rounded;
      case 'essen2':
        return Icons.restaurant_rounded;
      case 'arzt':
        return Icons.medication_rounded;
      case 'auto-verkehr':
        return Icons.directions_car_rounded;
      case 'bank-finanzen':
        return Icons.account_balance_wallet_rounded;
      case 'post-amt':
        return Icons.local_post_office_rounded;
      case 'medien-internet':
        return Icons.language_rounded;
      case 'reisen-urlaub':
        return Icons.flight_takeoff_rounded;
      case 'arbeit-bewerbung':
        return Icons.description_rounded;
      case 'umwelt-natur':
        return Icons.forest_rounded;
      default:
        return Icons.translate_rounded;
    }
  }

  Color _getCategoryColor(String id) {
    switch (id) {
      case 'apotheke-medizin':
        return Colors.teal;
      case 'alltag':
        return Colors.orange;
      case 'arbeit':
        return Colors.blue;
      case 'wohnen':
        return Colors.brown;
      case 'gesundheit':
        return Colors.red;
      case 'behoerden':
        return Colors.purple;
      case 'schule':
        return Colors.indigo;
      case 'verkehr':
        return Colors.amber;
      case 'einkaufen':
        return Colors.pink;
      case 'freizeit':
        return Colors.green;
      case 'konnektoren':
        return Colors.deepPurple;
      case 'meinung':
        return Colors.cyan;
      case 'koerper':
        return Colors.blueGrey;
      case 'geld':
        return Colors.green;
      case 'amt':
        return Colors.teal;
      case 'shopping':
        return Colors.deepOrange;
      case 'gefuehle':
        return Colors.pinkAccent;
      case 'haushalt':
        return Colors.blueGrey;
      case 'umwelt':
        return Colors.teal;
      default:
        return Colors.blue;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('شبكة الكلمات - Wortschatz', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: _selectedCategory == null ? _buildCategoryGrid() : _buildWordList(),
    );
  }

  Widget _buildCategoryGrid() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        childAspectRatio: 0.95,
      ),
      itemCount: vocabCategories.length,
      itemBuilder: (ctx, i) {
        final cat = vocabCategories[i];
        final words = List.from(cat['words'] as List? ?? []);
        final catId = cat['id'] as String? ?? '';
        final col = _getCategoryColor(catId);
        
        return Card(
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: InkWell(
            onTap: () => setState(() => _selectedCategory = i),
            borderRadius: BorderRadius.circular(16),
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: col.withValues(alpha: 0.15),
                      shape: BoxShape.circle,
                      border: Border.all(color: col, width: 1.5),
                    ),
                    child: Icon(_getCategoryIcon(catId), color: col, size: 26),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    cat['titleAr'] as String? ?? catId,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    textAlign: TextAlign.center,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    cat['titleDe'] as String? ?? '',
                    style: TextStyle(
                      fontSize: 12, 
                      color: isDark ? Colors.white60 : Colors.grey[600],
                      fontStyle: FontStyle.italic
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(
                      color: isDark ? Colors.white10 : Colors.black12,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '${words.length} كلمة',
                      style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),
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

    final isDark = Theme.of(context).brightness == Brightness.dark;
    final provider = Provider.of<AppProvider>(context, listen: false);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              IconButton(
                icon: const Icon(Icons.arrow_back_ios_rounded), 
                onPressed: () => setState(() { _selectedCategory = null; _search = ''; })
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  cat['titleAr'] as String? ?? '', 
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)
                )
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: TextField(
            decoration: InputDecoration(
              hintText: 'بحث عن كلمة...',
              prefixIcon: const Icon(Icons.search),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            ),
            onChanged: (v) => setState(() => _search = v),
          ),
        ),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: words.length,
            itemBuilder: (ctx, i) {
              final w = words[i];
              return Card(
                margin: const EdgeInsets.only(bottom: 10),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  onTap: () => provider.speak(w['de'] as String),
                  title: Text(
                    w['de'] as String? ?? '', 
                    style: TextStyle(
                      fontWeight: FontWeight.bold, 
                      fontSize: 16, 
                      color: Theme.of(context).colorScheme.primary
                    ), 
                    textDirection: TextDirection.ltr
                  ),
                  subtitle: Padding(
                    padding: const EdgeInsets.only(top: 6.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          w['ar'] as String? ?? '',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white70 : Colors.black87
                          ),
                        ),
                        if (w['example'] != null) ...[
                          const SizedBox(height: 6),
                          GestureDetector(
                            onTap: () => provider.speak(w['example'] as String),
                            child: Text(
                              w['example'] as String, 
                              style: TextStyle(
                                fontSize: 13, 
                                color: isDark ? Colors.tealAccent : Colors.teal[700], 
                                fontStyle: FontStyle.italic
                              ), 
                              textDirection: TextDirection.ltr
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  trailing: Container(
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.volume_up_rounded),
                      color: Theme.of(context).colorScheme.primary,
                      onPressed: () => provider.speak(w['de'] as String),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
