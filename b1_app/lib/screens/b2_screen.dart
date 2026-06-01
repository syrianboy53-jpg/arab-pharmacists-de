import 'package:flutter/material.dart';
import '../data/b2_data.dart';

class B2Screen extends StatefulWidget {
  const B2Screen({super.key});
  @override
  State<B2Screen> createState() => _B2ScreenState();
}

class _B2ScreenState extends State<B2Screen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
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
        title: const Text('B2 - المستوى المتقدم'),
        centerTitle: true,
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'نماذج telc B2', icon: Icon(Icons.assignment)),
            Tab(text: 'مواضيع كتابة', icon: Icon(Icons.edit_note)),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildTelcModels(),
          _buildEssayTopics(),
        ],
      ),
    );
  }

  Widget _buildTelcModels() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: telcB2Models.length,
      itemBuilder: (ctx, i) {
        final model = telcB2Models[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: ExpansionTile(
            leading: CircleAvatar(child: Text('${i + 1}')),
            title: Text(model['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(model['titleDe'] as String? ?? '', textDirection: TextDirection.ltr),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('⏱ ${model["durationMin"] ?? "-"} دقيقة', style: const TextStyle(fontSize: 14)),
                    Text('المستوى: ${model["level"] ?? "B2"}'),
                    const Divider(height: 16),
                    if (model['readingPassages'] != null) ...[
                      const Text('📖 القراءة:', style: TextStyle(fontWeight: FontWeight.bold)),
                      ...List<Map<String, dynamic>>.from(model['readingPassages'] as List).map((r) => Padding(
                        padding: const EdgeInsets.only(bottom: 4, right: 8),
                        child: Text('• ${r["titleAr"] ?? r["titleDe"] ?? ""}', style: const TextStyle(fontSize: 13)),
                      )),
                    ],
                    if (model['schreiben'] != null) ...[
                      const SizedBox(height: 8),
                      const Text('✍️ الكتابة:', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text((model['schreiben'] as Map)['topicAr'] as String? ?? '', style: const TextStyle(fontSize: 13)),
                    ],
                    if (model['sprechen'] != null) ...[
                      const SizedBox(height: 8),
                      const Text('🗣️ المحادثة:', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(model['sprechenLabel'] as String? ?? model['sprechen'].toString(), style: const TextStyle(fontSize: 13)),
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

  Widget _buildEssayTopics() {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: b2Essays.length,
      itemBuilder: (ctx, i) {
        final essay = b2Essays[i];
        return Card(
          margin: const EdgeInsets.only(bottom: 16),
          child: ExpansionTile(
            title: Text(essay['titleAr'] as String? ?? '', style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(essay['titleDe'] as String? ?? '', textDirection: TextDirection.ltr),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (essay['promptAr'] != null) Text('📋 ${essay["promptAr"]}'),
                    const SizedBox(height: 12),
                    if (essay['pro'] != null) ...[
                      const Text('✅ مع (Pro):', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
                      ...List<Map<String, dynamic>>.from(essay['pro'] as List).map((p) => Padding(
                        padding: const EdgeInsets.only(bottom: 4, right: 8),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('• ${p["de"] ?? ""}', textDirection: TextDirection.ltr, style: const TextStyle(fontSize: 13)),
                            if (p['ar'] != null) Text('  ${p["ar"]}', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
                          ],
                        ),
                      )),
                    ],
                    const SizedBox(height: 12),
                    if (essay['contra'] != null) ...[
                      const Text('❌ ضد (Contra):', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.red)),
                      ...List<Map<String, dynamic>>.from(essay['contra'] as List).map((c) => Padding(
                        padding: const EdgeInsets.only(bottom: 4, right: 8),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('• ${c["de"] ?? ""}', textDirection: TextDirection.ltr, style: const TextStyle(fontSize: 13)),
                            if (c['ar'] != null) Text('  ${c["ar"]}', style: TextStyle(fontSize: 12, color: Colors.grey[600])),
                          ],
                        ),
                      )),
                    ],
                    if (essay['modelEssay'] != null) ...[
                      const Divider(height: 24),
                      const Text('📝 نموذج مقال:', style: TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(color: Theme.of(context).colorScheme.surfaceContainerHighest, borderRadius: BorderRadius.circular(8)),
                        child: Text(essay['modelEssay'] as String, textDirection: TextDirection.ltr, style: const TextStyle(height: 1.6, fontSize: 13)),
                      ),
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
}
