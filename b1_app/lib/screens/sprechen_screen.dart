import 'package:flutter/material.dart';
import '../data/sprechen_data.dart';

class SprechenScreen extends StatefulWidget {
  const SprechenScreen({super.key});
  @override
  State<SprechenScreen> createState() => _SprechenScreenState();
}

class _SprechenScreenState extends State<SprechenScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('المحادثة - Sprechen'),
        centerTitle: true,
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'حوارات', icon: Icon(Icons.chat)),
            Tab(text: 'عبارات', icon: Icon(Icons.format_quote)),
            Tab(text: 'Redemittel', icon: Icon(Icons.lightbulb)),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildDialogues(),
          _buildPhrases(),
          _buildRedemittel(),
        ],
      ),
    );
  }

  Widget _buildDialogues() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: sprechenDialogues.length,
      itemBuilder: (ctx, i) {
        final d = sprechenDialogues[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: ExpansionTile(
            leading: Text(d['emoji'] as String? ?? '🗣️', style: const TextStyle(fontSize: 24)),
            title: Text(d['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(d['titleDe'] as String? ?? '', textDirection: TextDirection.ltr),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (d['contextAr'] != null) Text(d['contextAr'] as String, style: TextStyle(color: Colors.grey[700])),
                    const Divider(height: 16),
                    if (d['lines'] != null) ...List<Map<String, dynamic>>.from(d['lines'] as List).map((line) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(line['speaker'] == 'A' ? '👤 ' : '👥 '),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(line['de'] as String? ?? '', textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.w500)),
                                if (line['ar'] != null) Text(line['ar'] as String, style: TextStyle(fontSize: 13, color: Colors.grey[600])),
                              ],
                            ),
                          ),
                        ],
                      ),
                    )),
                    if (d['tips'] != null) ...[
                      const Divider(height: 16),
                      const Text('💡 نصائح:', style: TextStyle(fontWeight: FontWeight.bold)),
                      ...List<String>.from(d['tips'] as List).map((t) => Text('• $t', style: const TextStyle(fontSize: 13))),
                    ],
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPhrases() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: sprechenPhrases.length,
      itemBuilder: (ctx, i) {
        final p = sprechenPhrases[i];
        final phrases = List<Map<String, dynamic>>.from(p['phrases'] as List? ?? []);
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(p['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text(p['titleDe'] as String? ?? '', style: TextStyle(color: Colors.grey[600]), textDirection: TextDirection.ltr),
                if (p['intro'] != null) ...[const SizedBox(height: 8), Text(p['intro'] as String, style: const TextStyle(fontSize: 13))],
                const Divider(height: 16),
                ...phrases.map((ph) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('📝 '),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(ph['de'] as String? ?? '', textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.w500)),
                            if (ph['ar'] != null) Text(ph['ar'] as String, style: TextStyle(fontSize: 13, color: Colors.grey[600])),
                          ],
                        ),
                      ),
                    ],
                  ),
                )),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildRedemittel() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: redemittel.length,
      itemBuilder: (ctx, i) {
        final r = redemittel[i];
        final phrases = List<Map<String, dynamic>>.from(r['phrases'] as List? ?? []);
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: ExpansionTile(
            leading: Text(r['emoji'] as String? ?? '💬', style: const TextStyle(fontSize: 24)),
            title: Text(r['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(r['titleDe'] as String? ?? '', textDirection: TextDirection.ltr),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (r['whenAr'] != null) Text('⏰ ${r["whenAr"]}', style: const TextStyle(fontSize: 13)),
                    const SizedBox(height: 8),
                    ...phrases.map((ph) => Padding(
                      padding: const EdgeInsets.only(bottom: 6),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(ph['de'] as String? ?? '', textDirection: TextDirection.ltr, style: const TextStyle(fontWeight: FontWeight.w500)),
                          if (ph['ar'] != null) Text(ph['ar'] as String, style: TextStyle(fontSize: 13, color: Colors.grey[600])),
                        ],
                      ),
                    )),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
