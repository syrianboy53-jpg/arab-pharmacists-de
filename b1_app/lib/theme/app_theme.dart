import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // ── Premium Color Palette ──
  static const _primaryColor = Color(0xFF00B894);   // Emerald Green
  static const _secondaryColor = Color(0xFF0984E3); // Ocean Blue
  static const _accentColor = Color(0xFF6C5CE7);    // Purple Accent
  static const _errorColor = Color(0xFFE17055);      // Warm Red

  // Light surfaces
  static const _lightBg = Color(0xFFF5F7FA);
  static const _lightCard = Color(0xFFFFFFFF);
  static const _lightText = Color(0xFF2D3436);
  static const _lightSubtext = Color(0xFF636E72);

  // Dark surfaces
  static const _darkBg = Color(0xFF060610);
  static const _darkCard = Color(0xFF0E0E24);
  static const _darkText = Color(0xFFF5F5F5);
  static const _darkSubtext = Color(0xFF9CA3AF);

  static ThemeData get lightTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: _primaryColor,
      secondary: _secondaryColor,
      tertiary: _accentColor,
      error: _errorColor,
      brightness: Brightness.light,
      surface: _lightBg,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      textTheme: GoogleFonts.cairoTextTheme().apply(
        bodyColor: _lightText,
        displayColor: _lightText,
      ),
      scaffoldBackgroundColor: _lightBg,
      appBarTheme: AppBarTheme(
        centerTitle: true,
        backgroundColor: Colors.white.withValues(alpha: 0.85),
        foregroundColor: _lightText,
        elevation: 0,
        scrolledUnderElevation: 1,
        shadowColor: Colors.black12,
        surfaceTintColor: Colors.transparent,
        iconTheme: const IconThemeData(color: _lightText),
        actionsIconTheme: const IconThemeData(color: _lightText),
        titleTextStyle: GoogleFonts.cairo(
          color: _lightText,
          fontWeight: FontWeight.w800,
          fontSize: 19,
        ),
      ),
      cardTheme: CardThemeData(
        color: _lightCard,
        elevation: 0,
        shadowColor: Colors.transparent,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: Colors.grey.shade200, width: 1.0),
        ),
        margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 0),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: _primaryColor,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.w800, fontSize: 15),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: _primaryColor,
          side: BorderSide(color: Colors.grey.shade300, width: 1.5),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.w700, fontSize: 15),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.grey.shade100,
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: _primaryColor, width: 2),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: _primaryColor.withValues(alpha: 0.1),
        labelStyle: GoogleFonts.cairo(fontWeight: FontWeight.w700, fontSize: 12, color: _primaryColor),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        side: BorderSide.none,
      ),
      navigationBarTheme: NavigationBarThemeData(
        indicatorColor: _primaryColor.withValues(alpha: 0.15),
        backgroundColor: Colors.white,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        labelTextStyle: WidgetStatePropertyAll(
          GoogleFonts.cairo(fontSize: 11, fontWeight: FontWeight.w800),
        ),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: _primaryColor, size: 24);
          }
          return IconThemeData(color: _lightSubtext, size: 22);
        }),
      ),
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: _lightCard,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
      ),
      dialogTheme: DialogThemeData(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      ),
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        backgroundColor: _lightText,
      ),
      dividerTheme: DividerThemeData(
        color: Colors.grey.shade200,
        thickness: 1,
        space: 0,
      ),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: _primaryColor,
      ),
    );
  }

  static ThemeData get darkTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: _primaryColor,
      secondary: _secondaryColor,
      tertiary: _accentColor,
      error: _errorColor,
      brightness: Brightness.dark,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme.copyWith(
        surface: _darkCard,
      ),
      scaffoldBackgroundColor: _darkBg,
      textTheme: GoogleFonts.cairoTextTheme(ThemeData.dark().textTheme),
      appBarTheme: AppBarTheme(
        centerTitle: true,
        backgroundColor: _darkCard.withValues(alpha: 0.85),
        foregroundColor: _darkText,
        elevation: 0,
        scrolledUnderElevation: 1,
        shadowColor: Colors.black38,
        surfaceTintColor: Colors.transparent,
        iconTheme: const IconThemeData(color: _darkText),
        actionsIconTheme: const IconThemeData(color: _darkText),
        titleTextStyle: GoogleFonts.cairo(
          color: _darkText,
          fontWeight: FontWeight.w800,
          fontSize: 19,
        ),
      ),
      cardTheme: CardThemeData(
        color: _darkCard,
        elevation: 0,
        shadowColor: Colors.transparent,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: Colors.white.withValues(alpha: 0.06), width: 1.0),
        ),
        margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 0),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: _primaryColor,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.w800, fontSize: 15),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: _primaryColor,
          side: BorderSide(color: Colors.white.withValues(alpha: 0.12), width: 1.5),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.w700, fontSize: 15),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white.withValues(alpha: 0.05),
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: _primaryColor, width: 2),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: _primaryColor.withValues(alpha: 0.15),
        labelStyle: GoogleFonts.cairo(fontWeight: FontWeight.w700, fontSize: 12, color: _primaryColor),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        side: BorderSide.none,
      ),
      navigationBarTheme: NavigationBarThemeData(
        indicatorColor: _primaryColor.withValues(alpha: 0.2),
        backgroundColor: _darkCard,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        labelTextStyle: WidgetStatePropertyAll(
          GoogleFonts.cairo(fontSize: 11, fontWeight: FontWeight.w800),
        ),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: _primaryColor, size: 24);
          }
          return IconThemeData(color: _darkSubtext, size: 22);
        }),
      ),
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: _darkCard,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
      ),
      dialogTheme: DialogThemeData(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        backgroundColor: _darkCard,
      ),
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        backgroundColor: _darkText,
      ),
      dividerTheme: DividerThemeData(
        color: Colors.white.withValues(alpha: 0.06),
        thickness: 1,
        space: 0,
      ),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: _primaryColor,
      ),
    );
  }

  // ── Helper Gradients ──
  static const primaryGradient = LinearGradient(
    colors: [_primaryColor, Color(0xFF0984E3)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const accentGradient = LinearGradient(
    colors: [Color(0xFF6C5CE7), Color(0xFFA29BFE)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const warmGradient = LinearGradient(
    colors: [Color(0xFFFDAA5E), Color(0xFFE17055)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // ── Card Decoration helper ──
  static BoxDecoration glassCard({bool isDark = false}) {
    return BoxDecoration(
      color: isDark ? _darkCard.withValues(alpha: 0.85) : _lightCard.withValues(alpha: 0.85),
      borderRadius: BorderRadius.circular(20),
      border: Border.all(
        color: isDark ? Colors.white.withValues(alpha: 0.06) : Colors.grey.shade200,
      ),
    );
  }
}
