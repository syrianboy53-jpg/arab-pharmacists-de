import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';
import '../data/speaking_colloquial_data.dart';

class SlangScreen extends StatefulWidget {
  const SlangScreen({super.key});

  @override
  State<SlangScreen> createState() => _SlangScreenState();
}

class _SlangScreenState extends State<SlangScreen> {
  late final AudioPlayer _audioPlayer;
  String _selectedCatId = 'all';
  String _searchQuery = '';
  final Map<String, bool> _showExplanation = {};
  String? _currentlyPlayingId;

  // Curated lists
  late final List<dynamic> _categories;

  @override
  void initState() {
    super.initState();
    _audioPlayer = AudioPlayer();
    _categories = speakingColloquialData['categories'] as List<dynamic>;
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  Future<void> _speak(String text, String phraseId) async {
    try {
      setState(() => _currentlyPlayingId = phraseId);
      final url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=de-DE&client=tw-ob&q=${Uri.encodeComponent(text)}';
      await _audioPlayer.stop();
      await _audioPlayer.play(UrlSource(url));
    } catch (e) {
      debugPrint('TTS Audio error: $e');
    } finally {
      setState(() => _currentlyPlayingId = null);
    }
  }

  List<Map<String, dynamic>> _getFilteredPhrases() {
    final query = _searchQuery.toLowerCase().trim();
    final list = <Map<String, dynamic>>[];

    for (final cat in _categories) {
      if (_selectedCatId != 'all' && cat['id'] != _selectedCatId) continue;
      final phrases = cat['phrases'] as List<dynamic>;
      for (final p in phrases) {
        final phrase = Map<String, dynamic>.from(p as Map);
        phrase['catId'] = cat['id'];
        phrase['catNameAr'] = cat['nameAr'];
        phrase['catIcon'] = cat['icon'];
        
        final german = (phrase['german'] as String).toLowerCase();
        final hochdeutsch = (phrase['hochdeutsch'] as String).toLowerCase();
        final arabic = (phrase['arabic'] as String).toLowerCase();
        final context = (phrase['context'] as String? ?? '').toLowerCase();

        if (query.isEmpty ||
            german.contains(query) ||
            hochdeutsch.contains(query) ||
            arabic.contains(query) ||
            context.contains(query)) {
          list.add(phrase);
        }
      }
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    // Light-mode soft colors
    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    final filteredPhrases = _getFilteredPhrases();

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
        foregroundColor: textMain,
        title: const Text('قاموس العامية - Umgangssprache', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        shape: Border(bottom: BorderSide(color: borderCol, width: 1)),
      ),
      body: Column(
        children: [
          // Filter Panel
          Container(
            color: isDark ? const Color(0xFF1E293B) : Colors.white,
            padding: const EdgeInsets.all(12),
            child: Column(
              children: [
                // Category Selector
                Row(
                  children: [
                    const Text('الفئة:', style: TextStyle(fontWeight: FontWeight.bold)),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        decoration: BoxDecoration(
                          border: Border.all(color: borderCol),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<String>(
                            value: _selectedCatId,
                            isExpanded: true,
                            dropdownColor: cardBg,
                            style: TextStyle(color: textMain, fontSize: 13),
                            items: [
                              const DropdownMenuItem(value: 'all', child: Text('📦 جميع التصنيفات')),
                              ..._categories.map((cat) => DropdownMenuItem(
                                value: cat['id'] as String,
                                child: Text('${cat["icon"]} ${cat["nameAr"]}'),
                              )),
                            ],
                            onChanged: (val) {
                              if (val != null) {
                                setState(() {
                                  _selectedCatId = val;
                                });
                              }
                            },
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                // Search Input
                TextField(
                  style: TextStyle(color: textMain, fontSize: 13),
                  decoration: InputDecoration(
                    hintText: 'بحث عن كلمات، تعابير، معاني...',
                    hintStyle: TextStyle(color: textMuted),
                    prefixIcon: const Icon(Icons.search, size: 20),
                    contentPadding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(color: borderCol),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(color: borderCol),
                    ),
                  ),
                  onChanged: (val) {
                    setState(() {
                      _searchQuery = val;
                    });
                  },
                ),
              ],
            ),
          ),
          
          // Phrases List
          Expanded(
            child: filteredPhrases.isEmpty
                ? const Center(child: Text('لا توجد تعبيرات تطابق بحثك حالياً.'))
                : ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: filteredPhrases.length,
                    itemBuilder: (context, i) {
                      final phrase = filteredPhrases[i];
                      final phraseId = '${phrase["catId"]}-$i';
                      final isPlaying = _currentlyPlayingId == phraseId;
                      final isExpanded = _showExplanation[phraseId] ?? false;

                      return Card(
                        color: cardBg,
                        surfaceTintColor: Colors.transparent,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                          side: BorderSide(color: borderCol),
                        ),
                        margin: const EdgeInsets.only(bottom: 12),
                        child: Padding(
                          padding: const EdgeInsets.all(14),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Top details
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: theme.colorScheme.primaryContainer,
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: Text(
                                      phrase['difficulty'] as String? ?? 'A1',
                                      style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: theme.colorScheme.onPrimaryContainer),
                                    ),
                                  ),
                                  Text(
                                    '${phrase["catIcon"]} ${phrase["catNameAr"]}',
                                    style: TextStyle(fontSize: 11, color: textMuted),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 10),
                              
                              // German text
                              Text(
                                phrase['german'] as String? ?? '',
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF10B981)),
                                textDirection: TextDirection.ltr,
                              ),
                              const SizedBox(height: 4),
                              
                              // Hochdeutsch
                              Text(
                                'الفصحى (Standard): ${phrase["hochdeutsch"]}',
                                style: TextStyle(fontSize: 11, color: textMuted, fontStyle: FontStyle.italic),
                                textDirection: TextDirection.ltr,
                              ),
                              
                              const Divider(height: 20),
                              
                              // Arabic translation
                              Row(
                                children: [
                                  const Text('💬 ', style: TextStyle(fontSize: 14)),
                                  Expanded(
                                    child: Text(
                                      phrase['arabic'] as String? ?? '',
                                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: textMain),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 4),
                              
                              // Phonetics
                              Text(
                                'النطق: [ ${phrase["phonetic"]} ]',
                                style: TextStyle(fontSize: 11, color: textMuted),
                              ),
                              
                              // Actions bar
                              const SizedBox(height: 10),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  ElevatedButton.icon(
                                    onPressed: isPlaying ? null : () => _speak(phrase['german'] as String, phraseId),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF10B981),
                                      foregroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                    ),
                                    icon: isPlaying
                                        ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                                        : const Icon(Icons.volume_up, size: 16),
                                    label: const Text('استمع للعامية', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                  ),
                                  TextButton.icon(
                                    onPressed: () {
                                      setState(() {
                                        _showExplanation[phraseId] = !isExpanded;
                                      });
                                    },
                                    icon: Icon(isExpanded ? Icons.visibility_off : Icons.help_outline, size: 14, color: Colors.orange),
                                    label: Text(
                                      isExpanded ? 'إخفاء الشرح' : 'سياق الشرح 💡',
                                      style: const TextStyle(fontSize: 11, color: Colors.orange, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              
                              // Context Description
                              if (isExpanded && phrase['context'] != null) ...[
                                const SizedBox(height: 10),
                                Container(
                                  width: double.infinity,
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: Colors.orange.withValues(alpha: 0.08),
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(color: Colors.orange.withValues(alpha: 0.2)),
                                  ),
                                  child: Text(
                                    phrase['context'] as String,
                                    style: TextStyle(fontSize: 12, color: isDark ? Colors.white70 : Colors.black87, height: 1.4),
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
