import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DailyQuestsWidget extends StatefulWidget {
  const DailyQuestsWidget({super.key});

  @override
  State<DailyQuestsWidget> createState() => _DailyQuestsWidgetState();
}

class _DailyQuestsWidgetState extends State<DailyQuestsWidget> {
  int _quest1Progress = 0;
  int _quest2Progress = 0;
  int _quest3Progress = 0;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadQuests();
  }

  Future<void> _loadQuests() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Simple check: reset if new day
    final lastDateStr = prefs.getString('quests_date');
    final todayStr = DateTime.now().toIso8601String().substring(0, 10);
    
    if (lastDateStr != todayStr) {
      // New day, reset quests
      await prefs.setString('quests_date', todayStr);
      await prefs.setInt('quest1', 0);
      await prefs.setInt('quest2', 0);
      await prefs.setInt('quest3', 0);
      _quest1Progress = 0;
      _quest2Progress = 0;
      _quest3Progress = 0;
    } else {
      _quest1Progress = prefs.getInt('quest1') ?? 0;
      _quest2Progress = prefs.getInt('quest2') ?? 0;
      _quest3Progress = prefs.getInt('quest3') ?? 0;
    }
    
    setState(() {
      _isLoading = false;
    });
  }

  // A method to simulate progress (in real app, this would be triggered from other screens)
  Future<void> _simulateProgress(int questNum) async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      if (questNum == 1 && _quest1Progress < 3) {
        _quest1Progress++;
        prefs.setInt('quest1', _quest1Progress);
      } else if (questNum == 2 && _quest2Progress < 5) {
        _quest2Progress++;
        prefs.setInt('quest2', _quest2Progress);
      } else if (questNum == 3 && _quest3Progress < 1) {
        _quest3Progress++;
        prefs.setInt('quest3', _quest3Progress);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) return const SizedBox.shrink();

    final allCompleted = _quest1Progress >= 3 && _quest2Progress >= 5 && _quest3Progress >= 1;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.orange.shade200, width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.orange.withValues(alpha: 0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          )
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.star, color: Colors.orange),
                  const SizedBox(width: 8),
                  const Text(
                    'التحديات اليومية',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.black87),
                  ),
                ],
              ),
              if (allCompleted)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.green.shade100,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text('أنجزت كلها! 🎉', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold, fontSize: 12)),
                )
            ],
          ),
          const SizedBox(height: 16),
          _buildQuestRow(1, 'راجع 3 بطاقات مفردات', _quest1Progress, 3, Colors.blue),
          const SizedBox(height: 12),
          _buildQuestRow(2, 'أجب على 5 أسئلة قواعد', _quest2Progress, 5, Colors.purple),
          const SizedBox(height: 12),
          _buildQuestRow(3, 'استخدم محاكي الامتحان', _quest3Progress, 1, Colors.red),
        ],
      ),
    );
  }

  Widget _buildQuestRow(int id, String title, int progress, int target, Color color) {
    final isDone = progress >= target;
    return GestureDetector(
      onTap: () => _simulateProgress(id), // For testing/demo purposes
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: isDone ? Colors.green.shade100 : color.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(
              isDone ? Icons.check : Icons.flag,
              color: isDone ? Colors.green : color,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: isDone ? Colors.grey : Colors.black87,
                    decoration: isDone ? TextDecoration.lineThrough : null,
                  ),
                ),
                const SizedBox(height: 4),
                LinearProgressIndicator(
                  value: progress / target,
                  backgroundColor: Colors.grey.shade200,
                  valueColor: AlwaysStoppedAnimation<Color>(isDone ? Colors.green : color),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Text(
            '$progress/$target',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: isDone ? Colors.green : Colors.grey,
            ),
          )
        ],
      ),
    );
  }
}
