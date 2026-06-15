import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class LeaderboardScreen extends StatefulWidget {
  final bool isDark;
  final Color textMain;
  final Color borderCol;

  const LeaderboardScreen({
    super.key,
    required this.isDark,
    required this.textMain,
    required this.borderCol,
  });

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  List<dynamic> _leaderboard = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchLeaderboard();
  }

  Future<void> _fetchLeaderboard() async {
    try {
      final provider = Provider.of<AppProvider>(context, listen: false);
      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 5);
      final request = await client.getUrl(Uri.parse('${provider.apiBaseUrl}/api/v1/leaderboard'));
      final response = await request.close();
      
      if (response.statusCode == 200) {
        final responseBody = await response.transform(utf8.decoder).join();
        final data = json.decode(responseBody);
        if (data['success'] == true) {
          setState(() {
            _leaderboard = data['leaderboard'] ?? [];
            _isLoading = false;
          });
          return;
        }
      }
    } catch (e) {
      debugPrint('Failed to fetch leaderboard: $e');
    }
    
    // Fallback if failed
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);
    final currentUserId = provider.userId;

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 12),
                Text(
                  'لوحة المتصدّرين 🏆',
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: widget.textMain),
                ),
                const SizedBox(height: 6),
                const Text(
                  'تنافس مع زملائك في ألمانيا للوصول للصدارة!',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
                const SizedBox(height: 16),
                if (!provider.isLoggedIn)
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.orange.shade50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.orange.shade200),
                    ),
                    child: const Text(
                      'قم بتسجيل الدخول لحفظ نقاطك وظهور اسمك في قائمة المتصدرين.',
                      style: TextStyle(color: Colors.orange),
                    ),
                  ),
              ],
            ),
          ),
        ),
        if (_isLoading)
          const SliverToBoxAdapter(
            child: Center(child: Padding(padding: EdgeInsets.all(32), child: CircularProgressIndicator())),
          )
        else if (_leaderboard.isEmpty)
          const SliverToBoxAdapter(
            child: Center(child: Padding(padding: EdgeInsets.all(32), child: Text('لا توجد بيانات حالياً.'))),
          )
        else
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final user = _leaderboard[index];
                  final isMe = user['id']?.toString() == currentUserId;
                  return _leaderboardRow(
                    (index + 1).toString(),
                    user['display_name'] ?? 'مستخدم',
                    '${user['xp'] ?? 0} XP',
                    isMe,
                  );
                },
                childCount: _leaderboard.length,
              ),
            ),
          ),
        const SliverToBoxAdapter(child: SizedBox(height: 40)),
      ],
    );
  }

  Widget _leaderboardRow(String rank, String name, String score, bool isMe) {
    Color rankColor;
    if (rank == '1') {
      rankColor = const Color(0xFFF59E0B);
    } else if (rank == '2') {
      rankColor = const Color(0xFF94A3B8);
    } else if (rank == '3') {
      rankColor = const Color(0xFFD97706);
    } else {
      rankColor = Colors.transparent;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: isMe ? const Color(0xFF1E3A8A).withValues(alpha: 0.1) : (widget.isDark ? const Color(0xFF1E293B) : Colors.white),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isMe ? const Color(0xFF1E3A8A) : widget.borderCol,
          width: isMe ? 2 : 1,
        ),
      ),
      child: ListTile(
        leading: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: rankColor,
            shape: BoxShape.circle,
            border: rankColor == Colors.transparent ? Border.all(color: Colors.grey) : null,
          ),
          child: Center(
            child: Text(
              rank,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: rankColor == Colors.transparent ? Colors.grey : Colors.white,
              ),
            ),
          ),
        ),
        title: Text(
          name,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: widget.textMain,
          ),
        ),
        trailing: Text(
          score,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: Color(0xFF16A34A),
          ),
        ),
      ),
    );
  }
}
