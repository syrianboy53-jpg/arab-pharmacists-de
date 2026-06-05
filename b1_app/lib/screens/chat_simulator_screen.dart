import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../data/speaking_colloquial_data.dart';

class ChatSimulatorScreen extends StatefulWidget {
  const ChatSimulatorScreen({super.key});

  @override
  State<ChatSimulatorScreen> createState() => _ChatSimulatorScreenState();
}

class _ChatSimulatorScreenState extends State<ChatSimulatorScreen> {
  late final AudioPlayer _audioPlayer;
  
  // Selection
  String _selectedScenarioId = '';
  Map<String, dynamic>? _scenario;
  
  // Chat progress state
  int _currentStepId = 1;
  final List<Map<String, dynamic>> _chatHistory = [];
  int _score = 0;
  int _maxScore = 0;
  bool _isFinished = false;
  final Map<String, bool> _showTranslations = {};
  final ScrollController _scrollController = ScrollController();
  String? _currentlyPlayingId;

  late final List<dynamic> _scenarios;

  @override
  void initState() {
    super.initState();
    _audioPlayer = AudioPlayer();
    _scenarios = speakingColloquialData['chatScenarios'] as List<dynamic>;
    if (_scenarios.isNotEmpty) {
      _selectedScenarioId = _scenarios[0]['id'] as String;
      _loadScenario(_selectedScenarioId);
    }
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _loadScenario(String id) {
    final sc = _scenarios.firstWhere((s) => s['id'] == id) as Map<String, dynamic>;
    setState(() {
      _scenario = sc;
      _selectedScenarioId = id;
      _resetChat();
    });
  }

  void _resetChat() {
    if (_scenario == null) return;
    
    final steps = _scenario!['steps'] as List<dynamic>;
    final firstStep = steps.firstWhere((s) => s['id'] == 1, orElse: () => null);
    if (firstStep == null) return;

    // Calculate max potential score
    int calculatedMax = 0;
    for (final s in steps) {
      final step = s as Map<String, dynamic>;
      final options = step['options'] as List<dynamic>;
      int stepMax = 0;
      for (final o in options) {
        final opt = o as Map<String, dynamic>;
        final pts = opt['points'] as int? ?? 0;
        if (pts > stepMax) stepMax = pts;
      }
      calculatedMax += stepMax;
    }

    _chatHistory.clear();
    _showTranslations.clear();
    _currentStepId = 1;
    _score = 0;
    _maxScore = calculatedMax;
    _isFinished = false;

    // Add first bot message
    _chatHistory.add({
      'id': 'bot-1',
      'speaker': 'bot',
      'german': firstStep['german'],
      'arabic': firstStep['arabic'],
      'phonetic': firstStep['phonetic']
    });

    _scrollToBottom();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _speak(String text, String messageId) async {
    try {
      setState(() => _currentlyPlayingId = messageId);
      final url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=de-DE&client=tw-ob&q=${Uri.encodeComponent(text)}';
      await _audioPlayer.stop();
      await _audioPlayer.play(UrlSource(url));
    } catch (e) {
      debugPrint('TTS Audio error: $e');
    } finally {
      setState(() => _currentlyPlayingId = null);
    }
  }

  void _selectOption(Map<String, dynamic> option) {
    if (_scenario == null) return;

    final userMsgId = 'user-${DateTime.now().millisecondsSinceEpoch}';
    final feedbackMsgId = 'feedback-${DateTime.now().millisecondsSinceEpoch}';
    
    setState(() {
      // 1. Add user message
      _chatHistory.add({
        'id': userMsgId,
        'speaker': 'user',
        'german': option['textDe'],
        'arabic': option['textAr']
      });

      // 2. Add feedback message
      _chatHistory.add({
        'id': feedbackMsgId,
        'speaker': 'system',
        'feedback': option['feedback'],
        'points': option['points']
      });

      _score += option['points'] as int? ?? 0;

      // 3. Transition
      final nextStepId = option['nextStep'] as int?;
      if (nextStepId == null) {
        _isFinished = true;
        // Add XP to app state
        context.read<AppProvider>().addXP(15);
      } else {
        final steps = _scenario!['steps'] as List<dynamic>;
        final nextStep = steps.firstWhere((s) => s['id'] == nextStepId, orElse: () => null) as Map<String, dynamic>?;
        if (nextStep != null) {
          _currentStepId = nextStepId;
          _chatHistory.add({
            'id': 'bot-$nextStepId-${DateTime.now().millisecondsSinceEpoch}',
            'speaker': 'bot',
            'german': nextStep['german'],
            'arabic': nextStep['arabic'],
            'phonetic': nextStep['phonetic']
          });
        } else {
          _isFinished = true;
          context.read<AppProvider>().addXP(15);
        }
      }
    });

    _scrollToBottom();
  }

  String _getPerformanceBadgeText() {
    final percent = _maxScore > 0 ? (_score / _maxScore) * 100 : 0;
    if (percent >= 90) return 'ألماني فصيح (Profi) 🌟';
    if (percent >= 70) return 'متحدث جيد جداً (Gut) 👍';
    return 'مبتدئ يحتاج للتدريب (Übung) 📚';
  }

  Color _getPerformanceBadgeColor() {
    final percent = _maxScore > 0 ? (_score / _maxScore) * 100 : 0;
    if (percent >= 90) return const Color(0xFF10B981);
    if (percent >= 70) return Colors.orange;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final scaffoldBg = isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFC);
    final cardBg = isDark ? const Color(0xFF1E293B) : Colors.white;
    final textMain = isDark ? Colors.white : const Color(0xFF1E293B);
    final textMuted = isDark ? Colors.white60 : const Color(0xFF64748B);
    final borderCol = isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0);

    if (_scenario == null) {
      return Scaffold(
        backgroundColor: scaffoldBg,
        appBar: AppBar(title: const Text('محاكي المحادثة')),
        body: const Center(child: Text('لا توجد محاكيات محادثة متاحة.')),
      );
    }

    final steps = _scenario!['steps'] as List<dynamic>;
    final currentStep = steps.firstWhere((s) => s['id'] == _currentStepId, orElse: () => null) as Map<String, dynamic>?;

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        backgroundColor: isDark ? const Color(0xFF1E293B) : Colors.white,
        foregroundColor: textMain,
        title: const Text('محاكي المحادثة - Chat Simulator', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        elevation: 0,
        shape: Border(bottom: BorderSide(color: borderCol, width: 1)),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _resetChat,
            tooltip: 'إعادة البدء',
          ),
        ],
      ),
      body: Row(
        children: [
          // Main Chat Layout
          Expanded(
            child: Column(
              children: [
                // Info Banner
                Container(
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF1E293B) : Colors.white,
                    border: Border(bottom: BorderSide(color: borderCol, width: 1)),
                  ),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  child: Row(
                    children: [
                      Text(
                        _scenario!['icon'] as String? ?? '💬',
                        style: const TextStyle(fontSize: 24),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _scenario!['titleAr'] as String? ?? '',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: textMain),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'الصعوبة: ${_scenario!["difficulty"]} | النقاط: $_score',
                              style: TextStyle(fontSize: 10, color: textMuted),
                            ),
                          ],
                        ),
                      ),
                      
                      // Scenario Picker button
                      IconButton(
                        icon: const Icon(Icons.folder_open),
                        onPressed: _showScenarioSelector,
                        tooltip: 'تغيير الموقف',
                      ),
                    ],
                  ),
                ),

                // Chat History
                Expanded(
                  child: ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: _chatHistory.length + (_isFinished ? 1 : 0),
                    itemBuilder: (context, i) {
                      if (i == _chatHistory.length) {
                        return _buildCompletionCard(theme, cardBg, textMain, textMuted);
                      }
                      
                      final msg = _chatHistory[i];
                      final isBot = msg['speaker'] == 'bot';
                      final isUser = msg['speaker'] == 'user';
                      final isSystem = msg['speaker'] == 'system';

                      if (isSystem) {
                        return Center(
                          child: Container(
                            margin: const EdgeInsets.symmetric(vertical: 8),
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(
                              color: Colors.amber.withValues(alpha: 0.08),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: Colors.amber.withValues(alpha: 0.2)),
                            ),
                            child: Column(
                              children: [
                                Text(
                                  'نقاط الاختيار: +${msg["points"]} ⭐',
                                  style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.orange, fontSize: 11),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  msg['feedback'] as String? ?? '',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(fontSize: 11, color: isDark ? Colors.white70 : Colors.black87),
                                ),
                              ],
                            ),
                          ),
                        );
                      }

                      final msgId = msg['id'] as String;
                      final isPlaying = _currentlyPlayingId == msgId;
                      final showTransl = _showTranslations[msgId] ?? false;

                      return Container(
                        margin: const EdgeInsets.only(bottom: 14),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
                          children: [
                            if (!isUser) ...[
                              CircleAvatar(
                                radius: 16,
                                backgroundColor: isDark ? Colors.grey : Colors.grey[200],
                                child: Text(_scenario!['icon'] as String? ?? '🤖', style: const TextStyle(fontSize: 14)),
                              ),
                              const SizedBox(width: 8),
                            ],
                            
                            // Bubble
                            Flexible(
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: isUser
                                      ? const Color(0xFF10B981).withValues(alpha: 0.1)
                                      : (isDark ? const Color(0xFF1E293B) : Colors.grey[100]),
                                  border: Border.all(
                                    color: isUser
                                        ? const Color(0xFF10B981).withValues(alpha: 0.2)
                                        : (isDark ? const Color(0xFF334155) : Colors.grey[300]!),
                                  ),
                                  borderRadius: BorderRadius.only(
                                    topLeft: const Radius.circular(16),
                                    topRight: const Radius.circular(16),
                                    bottomLeft: isUser ? const Radius.circular(16) : Radius.zero,
                                    bottomRight: isUser ? Radius.zero : const Radius.circular(16),
                                  ),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    // Header
                                    Row(
                                      mainAxisSize: MainAxisSize.min,
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Flexible(
                                          child: Text(
                                            msg['german'] as String? ?? '',
                                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: textMain),
                                            textDirection: TextDirection.ltr,
                                          ),
                                        ),
                                        if (isBot) ...[
                                          const SizedBox(width: 12),
                                          IconButton(
                                            constraints: const BoxConstraints(),
                                            padding: EdgeInsets.zero,
                                            icon: isPlaying
                                                ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.green))
                                                : const Icon(Icons.volume_up, size: 16, color: Colors.green),
                                            onPressed: isPlaying ? null : () => _speak(msg['german'] as String, msgId),
                                          ),
                                        ],
                                      ],
                                    ),
                                    
                                    // Phonetic
                                    if (isBot && msg['phonetic'] != null) ...[
                                      const SizedBox(height: 4),
                                      Text(
                                        '🗣️ ${msg["phonetic"]}',
                                        style: TextStyle(fontSize: 10, color: textMuted, fontStyle: FontStyle.italic),
                                      ),
                                    ],
                                    
                                    // Translation
                                    if (msg['arabic'] != null) ...[
                                      const Divider(height: 12),
                                      InkWell(
                                        onTap: () {
                                          setState(() {
                                            _showTranslations[msgId] = !showTransl;
                                          });
                                        },
                                        child: Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Icon(showTransl ? Icons.visibility_off : Icons.visibility, size: 12, color: Colors.orange),
                                            const SizedBox(width: 4),
                                            Text(
                                              showTransl ? 'إخفاء الترجمة' : 'عرض الترجمة',
                                              style: const TextStyle(fontSize: 9, color: Colors.orange, fontWeight: FontWeight.bold),
                                            ),
                                          ],
                                        ),
                                      ),
                                      if (showTransl) ...[
                                        const SizedBox(height: 4),
                                        Text(
                                          msg['arabic'] as String? ?? '',
                                          style: TextStyle(fontSize: 12, color: textMain),
                                        ),
                                      ],
                                    ],
                                  ],
                                ),
                              ),
                            ),
                            
                            if (isUser) ...[
                              const SizedBox(width: 8),
                              CircleAvatar(
                                radius: 16,
                                backgroundColor: const Color(0xFF10B981).withValues(alpha: 0.1),
                                child: const Icon(Icons.person, size: 16, color: Color(0xFF10B981)),
                              ),
                            ],
                          ],
                        ),
                      );
                    },
                  ),
                ),

                // Options Bottom Drawer
                if (!_isFinished && currentStep != null)
                  Container(
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF1E293B) : Colors.white,
                      border: Border(top: BorderSide(color: borderCol, width: 1)),
                    ),
                    padding: const EdgeInsets.all(14),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'اختر الرد المناسب لمتابعة الحوار:',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.orange),
                        ),
                        const SizedBox(height: 8),
                        ...((currentStep['options'] as List<dynamic>).map((opt) {
                          final o = opt as Map<String, dynamic>;
                          return Container(
                            width: double.infinity,
                            margin: const EdgeInsets.only(bottom: 8),
                            child: OutlinedButton(
                              style: OutlinedButton.styleFrom(
                                side: BorderSide(color: borderCol),
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              ),
                              onPressed: () => _selectOption(o),
                              child: Align(
                                alignment: Alignment.centerRight,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Expanded(
                                          child: Text(
                                            o['textDe'] as String? ?? '',
                                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: textMain),
                                            textDirection: TextDirection.ltr,
                                          ),
                                        ),
                                        Text(
                                          '${o["points"]} ن',
                                          style: const TextStyle(fontSize: 10, color: Colors.orange, fontWeight: FontWeight.bold),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      '💡 ${o["textAr"]}',
                                      style: TextStyle(fontSize: 10, color: textMuted),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        })),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCompletionCard(ThemeData theme, Color cardBg, Color textMain, Color textMuted) {
    return Card(
      color: cardBg,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: Colors.orange, width: 1.5),
      ),
      margin: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const Text('🏆', style: TextStyle(fontSize: 40)),
            const SizedBox(height: 8),
            Text(
              'اكتمل الحوار بنجاح!',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: textMain),
            ),
            const SizedBox(height: 4),
            Text(
              'لقد أنجزت المحاكاة وحصلت على التقييم التالي:',
              style: TextStyle(fontSize: 12, color: textMuted),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildScoreBox('نقاطك', '$_score', Colors.orange),
                const SizedBox(width: 14),
                const Text('من أصل', style: TextStyle(fontSize: 12)),
                const SizedBox(width: 14),
                _buildScoreBox('الحد الأقصى', '$_maxScore', textMuted),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: _getPerformanceBadgeColor().withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: _getPerformanceBadgeColor().withValues(alpha: 0.3)),
              ),
              child: Text(
                _getPerformanceBadgeText(),
                style: TextStyle(fontWeight: FontWeight.bold, color: _getPerformanceBadgeColor(), fontSize: 12),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                minimumSize: const Size(double.infinity, 44),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              onPressed: _resetChat,
              child: const Text('🔄 إعادة المحاكاة والتدريب', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildScoreBox(String label, String scoreVal, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.03),
        border: Border.all(color: color.withValues(alpha: 0.3)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(label, style: const TextStyle(fontSize: 10, color: Colors.grey)),
          const SizedBox(height: 2),
          Text(scoreVal, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: color)),
        ],
      ),
    );
  }

  void _showScenarioSelector() {
    final theme = Theme.of(context);
    showModalBottomSheet(
      context: context,
      backgroundColor: theme.brightness == Brightness.dark ? const Color(0xFF1E293B) : Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'اختر موقف المحادثة والتدريب:',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
              ),
              const SizedBox(height: 12),
              Flexible(
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: _scenarios.length,
                  itemBuilder: (ctx, i) {
                    final sc = _scenarios[i];
                    final isSel = sc['id'] == _selectedScenarioId;
                    return Card(
                      color: isSel ? Colors.green.withValues(alpha: 0.08) : Colors.transparent,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: BorderSide(color: isSel ? Colors.green : Colors.grey.withValues(alpha: 0.2)),
                      ),
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: Colors.transparent,
                          child: Text(sc['icon'] as String? ?? '💬', style: const TextStyle(fontSize: 18)),
                        ),
                        title: Text(
                          sc['titleAr'] as String? ?? '',
                          style: TextStyle(fontWeight: isSel ? FontWeight.bold : FontWeight.normal, fontSize: 13),
                        ),
                        subtitle: Text(
                          'مستوى الصعوبة: ${sc["difficulty"]}',
                          style: const TextStyle(fontSize: 10),
                        ),
                        onTap: () {
                          _loadScenario(sc['id'] as String);
                          Navigator.of(ctx).pop();
                        },
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
