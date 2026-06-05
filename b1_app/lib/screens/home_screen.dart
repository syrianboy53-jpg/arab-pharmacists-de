import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final WebViewController _controller;
  bool _isLoading = true;
  double _loadingProgress = 0;

  @override
  void initState() {
    super.initState();
    
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF0F172A)) // obsidian slate dark theme color
      ..setUserAgent("Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 B1DeutschAPK/53")
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              _loadingProgress = progress / 100.0;
            });
          },
          onPageStarted: (String url) {
            setState(() {
              _isLoading = true;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('WebResourceError: ${error.description}');
          },
          onNavigationRequest: (NavigationRequest request) async {
            final url = request.url;
            
            // Check if it is a known external utility or website that should open in the browser
            final isExternal = url.startsWith('mailto:') || 
                               url.startsWith('tel:') || 
                               url.contains('t.me') || 
                               url.contains('stripe.com') || 
                               url.contains('buymeacoffee.com') ||
                               url.contains('jotform.com') ||
                               url.contains('jotfor.ms');
                               
            if (isExternal) {
              // Open in external browser/application (Telegram, email, stripe, etc.)
              try {
                final uri = Uri.parse(url);
                if (await canLaunchUrl(uri)) {
                  await launchUrl(uri, mode: LaunchMode.externalApplication);
                }
              } catch (e) {
                debugPrint('Error launching external URL: $e');
              }
              return NavigationDecision.prevent;
            }
            
            // Otherwise, let it load INSIDE the WebView (e.g. app pages, assets, local files, etc.)
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse('https://www.b1-syrer.de/app/'));
  }

  @override
  Widget build(BuildContext context) {
    // Handle Android system back button press: go back in web history if possible, else minimize app
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (bool didPop, dynamic result) async {
        if (didPop) return;
        if (await _controller.canGoBack()) {
          await _controller.goBack();
        } else {
          // If no history in webview, minimize the app native way
          await SystemNavigator.pop();
        }
      },
      child: Scaffold(
        backgroundColor: const Color(0xFF0F172A), // Dark Slate matching app theme
        body: SafeArea(
          child: Stack(
            children: [
              // Full-screen WebViewWidget loading the responsive web app
              WebViewWidget(controller: _controller),
              
              // Loading indicator
              if (_isLoading)
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const CircularProgressIndicator(
                        valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF059669)), // Syrian Green
                        strokeWidth: 4,
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        'جاري تحميل B1 Deutsch...',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                
              // Top progress bar indicator
              if (_isLoading && _loadingProgress > 0 && _loadingProgress < 1.0)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  child: LinearProgressIndicator(
                    value: _loadingProgress,
                    backgroundColor: Colors.transparent,
                    valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)), // Emerald Accent
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
