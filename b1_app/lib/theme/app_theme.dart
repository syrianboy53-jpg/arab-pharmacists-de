import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Vibrant Duolingo-inspired colors
  static const _primaryColor = Color(0xFF58CC02); // Vibrant Green
  static const _secondaryColor = Color(0xFF1CB0F6); // Cyan
  static const _surfaceColor = Color(0xFFF7F7F7); // Very light grey
  static const _textColor = Color(0xFF4B4B4B); // Soft black for text

  static ThemeData get lightTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: _primaryColor,
      secondary: _secondaryColor,
      brightness: Brightness.light,
      surface: _surfaceColor,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      textTheme: GoogleFonts.cairoTextTheme().apply(
        bodyColor: _textColor,
        displayColor: _textColor,
      ),
      scaffoldBackgroundColor: _surfaceColor,
      appBarTheme: AppBarTheme(
        centerTitle: true,
        backgroundColor: Colors.white,
        foregroundColor: _textColor,
        elevation: 1,
        shadowColor: Colors.black12,
        iconTheme: IconThemeData(color: _textColor),
        actionsIconTheme: IconThemeData(color: _textColor),
        titleTextStyle: GoogleFonts.cairo(
          color: _textColor,
          fontWeight: FontWeight.bold,
          fontSize: 20,
        ),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 2,
        shadowColor: Colors.black12,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: Color(0xFFE5E5E5), width: 2.0),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: _primaryColor,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: const BorderSide(color: Color(0xFF46A302), width: 2), // Simulate depth
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: _secondaryColor,
          side: const BorderSide(color: Color(0xFFE5E5E5), width: 2),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        indicatorColor: const Color(0xFFDDF4C7),
        backgroundColor: Colors.white,
        elevation: 10,
        labelTextStyle: WidgetStatePropertyAll(
          GoogleFonts.cairo(fontSize: 13, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: _primaryColor,
      secondary: _secondaryColor,
      brightness: Brightness.dark,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme.copyWith(
        surface: const Color(0xFF131F24), // Deep slate blue
      ),
      scaffoldBackgroundColor: const Color(0xFF0B1416),
      textTheme: GoogleFonts.cairoTextTheme(ThemeData.dark().textTheme),
      appBarTheme: AppBarTheme(
        centerTitle: true,
        backgroundColor: const Color(0xFF131F24),
        foregroundColor: Colors.white,
        elevation: 1,
        shadowColor: Colors.black54,
        iconTheme: const IconThemeData(color: Colors.white),
        actionsIconTheme: const IconThemeData(color: Colors.white),
        titleTextStyle: GoogleFonts.cairo(
          color: Colors.white,
          fontWeight: FontWeight.bold,
          fontSize: 20,
        ),
      ),
      cardTheme: CardThemeData(
        color: const Color(0xFF131F24),
        elevation: 4,
        shadowColor: Colors.black54,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: Color(0xFF2A3A40), width: 2.0),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: _primaryColor,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: const BorderSide(color: Color(0xFF46A302), width: 2),
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: _secondaryColor,
          side: const BorderSide(color: Color(0xFF2A3A40), width: 2),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.cairo(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        indicatorColor: const Color(0xFF2A3A40),
        backgroundColor: const Color(0xFF131F24),
        elevation: 10,
        labelTextStyle: WidgetStatePropertyAll(
          GoogleFonts.cairo(fontSize: 13, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
