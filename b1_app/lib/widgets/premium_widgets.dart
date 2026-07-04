import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ═══════════════════════════════════════════════════════════════════════════════
// ملف الودجات المميزة - Premium Reusable Widgets
// ═══════════════════════════════════════════════════════════════════════════════
//
// يحتوي هذا الملف على مجموعة من الودجات الحديثة والقابلة لإعادة الاستخدام
// تدعم الوضع الداكن والفاتح، خطوط Cairo، وتأثيرات الزجاج والتدرجات اللونية
// ═══════════════════════════════════════════════════════════════════════════════

/// ── لوحة الألوان المميزة ──
class PremiumColors {
  PremiumColors._();

  static const Color primary = Color(0xFF00B894);
  static const Color secondary = Color(0xFF0984E3);
  static const Color accent = Color(0xFF6C5CE7);
  static const Color warm = Color(0xFFFDAA5E);

  /// تدرج أساسي أخضر ← أزرق
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, secondary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// تدرج بنفسجي
  static const LinearGradient accentGradient = LinearGradient(
    colors: [accent, Color(0xFFA29BFE)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// تدرج دافئ برتقالي
  static const LinearGradient warmGradient = LinearGradient(
    colors: [warm, Color(0xFFE17055)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// تدرج ليلي داكن
  static const LinearGradient nightGradient = LinearGradient(
    colors: [Color(0xFF0E0E24), Color(0xFF1A1A3E)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  1) GlassContainer – حاوية بتأثير الزجاج المطفي
// ═══════════════════════════════════════════════════════════════════════════════

/// حاوية بتأثير الزجاج المطفي (Glassmorphism)
///
/// تعمل في الوضعين الفاتح والداكن وتتكيف تلقائياً.
/// يمكن تمرير [borderRadius] و [padding] و [blur] حسب الحاجة.
///
/// ```dart
/// GlassContainer(
///   child: Text('مرحباً'),
/// )
/// ```
class GlassContainer extends StatelessWidget {
  const GlassContainer({
    super.key,
    required this.child,
    this.borderRadius = 20,
    this.padding = const EdgeInsets.all(16),
    this.margin,
    this.blur = 12,
    this.opacity,
    this.border = true,
    this.gradient,
    this.width,
    this.height,
  });

  /// المحتوى الداخلي
  final Widget child;

  /// نصف قطر الزوايا
  final double borderRadius;

  /// الحشو الداخلي
  final EdgeInsetsGeometry padding;

  /// الهوامش الخارجية
  final EdgeInsetsGeometry? margin;

  /// قوة التمويه
  final double blur;

  /// شفافية الخلفية (يتم حسابها تلقائياً إن لم تُحدد)
  final double? opacity;

  /// إظهار الحدود
  final bool border;

  /// تدرج لوني اختياري فوق الزجاج
  final Gradient? gradient;

  /// العرض الثابت
  final double? width;

  /// الارتفاع الثابت
  final double? height;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bgOpacity = opacity ?? (isDark ? 0.25 : 0.65);
    final borderColor = isDark
        ? Colors.white.withValues(alpha: 0.08)
        : Colors.white.withValues(alpha: 0.6);

    return Container(
      width: width,
      height: height,
      margin: margin,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: Container(
            padding: padding,
            decoration: BoxDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: bgOpacity * 0.3)
                  : Colors.white.withValues(alpha: bgOpacity),
              borderRadius: BorderRadius.circular(borderRadius),
              gradient: gradient,
              border: border
                  ? Border.all(color: borderColor, width: 1.2)
                  : null,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.3 : 0.06),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: child,
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  2) GradientCard – بطاقة بتدرج لوني مع أنيميشن
// ═══════════════════════════════════════════════════════════════════════════════

/// بطاقة مميزة بتدرج لوني اختياري مع تأثير ضغط متحرك
///
/// تدعم أيقونة، عنوان، وصف فرعي، وعلامة (badge) اختيارية.
/// عند الضغط يتم تصغير البطاقة بمقدار 0.97 بأنيميشن سلس.
///
/// ```dart
/// GradientCard(
///   icon: Icons.school,
///   title: 'القواعد',
///   subtitle: '45 درس',
///   gradient: PremiumColors.primaryGradient,
///   badgeText: 'جديد',
///   onTap: () {},
/// )
/// ```
class GradientCard extends StatefulWidget {
  const GradientCard({
    super.key,
    this.icon,
    this.iconWidget,
    required this.title,
    this.subtitle,
    this.gradient,
    this.backgroundColor,
    this.onTap,
    this.isDark = false,
    this.badgeText,
    this.badgeColor,
    this.trailing,
    this.padding = const EdgeInsets.all(20),
    this.borderRadius = 20,
    this.elevation = 0,
    this.child,
  });

  /// أيقونة البطاقة
  final IconData? icon;

  /// ودجة أيقونة مخصصة (تأخذ الأولوية على [icon])
  final Widget? iconWidget;

  /// العنوان الرئيسي
  final String title;

  /// النص الفرعي
  final String? subtitle;

  /// التدرج اللوني للخلفية
  final Gradient? gradient;

  /// لون الخلفية (يُستخدم عند عدم تحديد [gradient])
  final Color? backgroundColor;

  /// دالة الضغط
  final VoidCallback? onTap;

  /// هل الخلفية داكنة (يؤثر على لون النصوص)
  final bool isDark;

  /// نص العلامة التمييزية (badge)
  final String? badgeText;

  /// لون العلامة التمييزية
  final Color? badgeColor;

  /// ودجة في الطرف الآخر (trailing)
  final Widget? trailing;

  /// الحشو الداخلي
  final EdgeInsetsGeometry padding;

  /// نصف قطر الزوايا
  final double borderRadius;

  /// ارتفاع الظل
  final double elevation;

  /// محتوى إضافي يُعرض أسفل العنوان والوصف
  final Widget? child;

  @override
  State<GradientCard> createState() => _GradientCardState();
}

class _GradientCardState extends State<GradientCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 120),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails _) => _controller.forward();
  void _onTapUp(TapUpDetails _) => _controller.reverse();
  void _onTapCancel() => _controller.reverse();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDarkMode = theme.brightness == Brightness.dark;
    final useWhiteText = widget.isDark || widget.gradient != null;

    final textColor = useWhiteText ? Colors.white : theme.textTheme.bodyLarge?.color ?? Colors.black;
    final subtextColor = useWhiteText
        ? Colors.white.withValues(alpha: 0.8)
        : theme.textTheme.bodySmall?.color ?? Colors.grey;

    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: child,
        );
      },
      child: GestureDetector(
        onTapDown: widget.onTap != null ? _onTapDown : null,
        onTapUp: widget.onTap != null ? _onTapUp : null,
        onTapCancel: widget.onTap != null ? _onTapCancel : null,
        onTap: widget.onTap,
        child: Container(
          padding: widget.padding,
          decoration: BoxDecoration(
            gradient: widget.gradient,
            color: widget.gradient == null
                ? (widget.backgroundColor ??
                    (isDarkMode
                        ? const Color(0xFF0E0E24)
                        : Colors.white))
                : null,
            borderRadius: BorderRadius.circular(widget.borderRadius),
            border: widget.gradient == null
                ? Border.all(
                    color: isDarkMode
                        ? Colors.white.withValues(alpha: 0.06)
                        : Colors.grey.shade200,
                    width: 1,
                  )
                : null,
            boxShadow: [
              if (widget.elevation > 0 || widget.gradient != null)
                BoxShadow(
                  color: (widget.gradient != null
                          ? PremiumColors.primary
                          : Colors.black)
                      .withValues(alpha: 0.12),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
            ],
          ),
          child: Stack(
            children: [
              Row(
                children: [
                  if (widget.iconWidget != null || widget.icon != null) ...[
                    widget.iconWidget ??
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: useWhiteText
                                ? Colors.white.withValues(alpha: 0.2)
                                : PremiumColors.primary.withValues(alpha: 0.12),
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: Icon(
                            widget.icon,
                            color: useWhiteText
                                ? Colors.white
                                : PremiumColors.primary,
                            size: 24,
                          ),
                        ),
                    const SizedBox(width: 16),
                  ],
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          widget.title,
                          style: GoogleFonts.cairo(
                            fontWeight: FontWeight.w800,
                            fontSize: 16,
                            color: textColor,
                            height: 1.3,
                          ),
                        ),
                        if (widget.subtitle != null) ...[
                          const SizedBox(height: 4),
                          Text(
                            widget.subtitle!,
                            style: GoogleFonts.cairo(
                              fontWeight: FontWeight.w500,
                              fontSize: 13,
                              color: subtextColor,
                              height: 1.4,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                        if (widget.child != null) ...[
                          const SizedBox(height: 12),
                          widget.child!,
                        ],
                      ],
                    ),
                  ),
                  if (widget.trailing != null) ...[
                    const SizedBox(width: 12),
                    widget.trailing!,
                  ] else if (widget.onTap != null) ...[
                    const SizedBox(width: 8),
                    Icon(
                      Icons.arrow_forward_ios_rounded,
                      size: 16,
                      color: subtextColor,
                    ),
                  ],
                ],
              ),
              // العلامة التمييزية (Badge)
              if (widget.badgeText != null)
                Positioned(
                  top: 0,
                  left: 0,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 3,
                    ),
                    decoration: BoxDecoration(
                      color: widget.badgeColor ?? PremiumColors.warm,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      widget.badgeText!,
                      style: GoogleFonts.cairo(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// دالة مساعدة لبناء الأنيميشن - لتجنب استخدام AnimatedBuilder المحجوز
class AnimatedBuilder extends StatelessWidget {
  const AnimatedBuilder({
    super.key,
    required this.animation,
    required this.builder,
    this.child,
  });

  final Animation<double> animation;
  final Widget Function(BuildContext context, Widget? child) builder;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder._build(animation, builder, child);
  }

  static Widget _build(
    Animation<double> animation,
    Widget Function(BuildContext, Widget?) builder,
    Widget? child,
  ) {
    return _AnimatedBuilderInternal(
      listenable: animation,
      builder: builder,
      child: child,
    );
  }
}

class _AnimatedBuilderInternal extends AnimatedWidget {
  const _AnimatedBuilderInternal({
    required super.listenable,
    required this.builder,
    this.child,
  }) : super();

  // ignore: annotate_overrides
  Animation<double> get animation => listenable as Animation<double>;
  final Widget Function(BuildContext context, Widget? child) builder;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return builder(context, child);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  3) StatsRow – صف إحصائيات بتأثير زجاجي
// ═══════════════════════════════════════════════════════════════════════════════

/// صف إحصائيات يعرض عدة عناصر إحصائية بجانب بعض
///
/// كل عنصر يحتوي أيقونة، تسمية، وقيمة.
/// يستخدم حاوية بتأثير زجاجي خفيف.
///
/// ```dart
/// StatsRow(
///   items: [
///     StatItem(icon: Icons.star, label: 'النقاط', value: '1,250'),
///     StatItem(icon: Icons.local_fire_department, label: 'السلسلة', value: '7 أيام'),
///   ],
/// )
/// ```
class StatsRow extends StatelessWidget {
  const StatsRow({
    super.key,
    required this.items,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    this.borderRadius = 20,
    this.showDividers = true,
  });

  /// عناصر الإحصائيات
  final List<StatItem> items;

  /// الحشو الداخلي
  final EdgeInsetsGeometry padding;

  /// نصف قطر الزوايا
  final double borderRadius;

  /// إظهار الفواصل بين العناصر
  final bool showDividers;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GlassContainer(
      borderRadius: borderRadius,
      padding: padding,
      child: Row(
        children: [
          for (int i = 0; i < items.length; i++) ...[
            Expanded(child: _buildStatItem(context, items[i], isDark)),
            if (showDividers && i < items.length - 1)
              Container(
                width: 1,
                height: 36,
                color: isDark
                    ? Colors.white.withValues(alpha: 0.08)
                    : Colors.grey.shade300,
              ),
          ],
        ],
      ),
    );
  }

  Widget _buildStatItem(BuildContext context, StatItem item, bool isDark) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          item.icon,
          size: 22,
          color: item.iconColor ?? PremiumColors.primary,
        ),
        const SizedBox(height: 6),
        Text(
          item.value,
          style: GoogleFonts.cairo(
            fontWeight: FontWeight.w800,
            fontSize: 17,
            color: isDark ? Colors.white : const Color(0xFF2D3436),
          ),
        ),
        const SizedBox(height: 2),
        Text(
          item.label,
          style: GoogleFonts.cairo(
            fontWeight: FontWeight.w500,
            fontSize: 11,
            color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF636E72),
          ),
        ),
      ],
    );
  }
}

/// عنصر إحصائي واحد لاستخدامه داخل [StatsRow]
class StatItem {
  const StatItem({
    required this.icon,
    required this.label,
    required this.value,
    this.iconColor,
  });

  /// أيقونة العنصر
  final IconData icon;

  /// تسمية العنصر
  final String label;

  /// القيمة المعروضة
  final String value;

  /// لون الأيقونة (اختياري، الافتراضي هو اللون الأساسي)
  final Color? iconColor;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  4) SectionHeader – عنوان قسم مع إجراء اختياري
// ═══════════════════════════════════════════════════════════════════════════════

/// عنوان قسم مع وصف فرعي اختياري وزر إجراء
///
/// يستخدم خط Cairo بوزن عريض (Bold) مع دعم RTL.
///
/// ```dart
/// SectionHeader(
///   title: 'الدروس',
///   subtitle: 'تعلّم القواعد خطوة بخطوة',
///   actionLabel: 'عرض الكل',
///   onAction: () {},
/// )
/// ```
class SectionHeader extends StatelessWidget {
  const SectionHeader({
    super.key,
    required this.title,
    this.subtitle,
    this.actionLabel,
    this.onAction,
    this.actionIcon,
    this.padding = const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
    this.titleSize = 20,
  });

  /// العنوان الرئيسي
  final String title;

  /// الوصف الفرعي
  final String? subtitle;

  /// نص زر الإجراء
  final String? actionLabel;

  /// دالة زر الإجراء
  final VoidCallback? onAction;

  /// أيقونة زر الإجراء
  final IconData? actionIcon;

  /// الحشو الخارجي
  final EdgeInsetsGeometry padding;

  /// حجم خط العنوان
  final double titleSize;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: padding,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.cairo(
                    fontWeight: FontWeight.w800,
                    fontSize: titleSize,
                    color: isDark ? Colors.white : const Color(0xFF2D3436),
                    height: 1.3,
                  ),
                ),
                if (subtitle != null) ...[
                  const SizedBox(height: 2),
                  Text(
                    subtitle!,
                    style: GoogleFonts.cairo(
                      fontWeight: FontWeight.w500,
                      fontSize: 13,
                      color: isDark
                          ? const Color(0xFF9CA3AF)
                          : const Color(0xFF636E72),
                      height: 1.4,
                    ),
                  ),
                ],
              ],
            ),
          ),
          if (actionLabel != null || onAction != null)
            TextButton.icon(
              onPressed: onAction,
              style: TextButton.styleFrom(
                foregroundColor: PremiumColors.primary,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                textStyle: GoogleFonts.cairo(
                  fontWeight: FontWeight.w700,
                  fontSize: 13,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              icon: actionIcon != null
                  ? Icon(actionIcon, size: 16)
                  : null,
              label: Text(actionLabel ?? ''),
            ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  5) AnimatedProgressBar – شريط تقدم بتدرج لوني متحرك
// ═══════════════════════════════════════════════════════════════════════════════

/// شريط تقدم مخصص بتدرج لوني وأنيميشن سلس
///
/// يعرض النسبة المئوية كنص اختياري.
/// يدعم تغيير الألوان والارتفاع والزوايا.
///
/// ```dart
/// AnimatedProgressBar(
///   progress: 0.75,
///   gradient: PremiumColors.primaryGradient,
///   showPercentage: true,
/// )
/// ```
class AnimatedProgressBar extends StatelessWidget {
  const AnimatedProgressBar({
    super.key,
    required this.progress,
    this.gradient,
    this.backgroundColor,
    this.height = 10,
    this.borderRadius = 20,
    this.showPercentage = true,
    this.percentageStyle,
    this.label,
    this.duration = const Duration(milliseconds: 600),
    this.curve = Curves.easeOutCubic,
  });

  /// القيمة بين 0.0 و 1.0
  final double progress;

  /// تدرج لوني لشريط التقدم
  final Gradient? gradient;

  /// لون الخلفية
  final Color? backgroundColor;

  /// ارتفاع الشريط
  final double height;

  /// نصف قطر الزوايا
  final double borderRadius;

  /// إظهار النسبة المئوية
  final bool showPercentage;

  /// نمط نص النسبة المئوية
  final TextStyle? percentageStyle;

  /// تسمية اختيارية على يمين الشريط
  final String? label;

  /// مدة الأنيميشن
  final Duration duration;

  /// منحنى الأنيميشن
  final Curve curve;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final clampedProgress = progress.clamp(0.0, 1.0);
    final percentage = (clampedProgress * 100).round();

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null || showPercentage)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (label != null)
                  Text(
                    label!,
                    style: GoogleFonts.cairo(
                      fontWeight: FontWeight.w600,
                      fontSize: 13,
                      color: isDark
                          ? const Color(0xFF9CA3AF)
                          : const Color(0xFF636E72),
                    ),
                  ),
                if (showPercentage)
                  Text(
                    '%$percentage',
                    style: percentageStyle ??
                        GoogleFonts.cairo(
                          fontWeight: FontWeight.w800,
                          fontSize: 14,
                          color: PremiumColors.primary,
                        ),
                  ),
              ],
            ),
          ),
        Container(
          height: height,
          decoration: BoxDecoration(
            color: backgroundColor ??
                (isDark
                    ? Colors.white.withValues(alpha: 0.08)
                    : Colors.grey.shade200),
            borderRadius: BorderRadius.circular(borderRadius),
          ),
          child: LayoutBuilder(
            builder: (context, constraints) {
              return Stack(
                children: [
                  AnimatedContainer(
                    duration: duration,
                    curve: curve,
                    width: constraints.maxWidth * clampedProgress,
                    height: height,
                    decoration: BoxDecoration(
                      gradient: gradient ?? PremiumColors.primaryGradient,
                      borderRadius: BorderRadius.circular(borderRadius),
                      boxShadow: clampedProgress > 0
                          ? [
                              BoxShadow(
                                color: PremiumColors.primary
                                    .withValues(alpha: 0.35),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ]
                          : null,
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  6) FeatureChip – شريحة ميزة بتدرج لوني
// ═══════════════════════════════════════════════════════════════════════════════

/// شريحة صغيرة لعرض ميزة أو علامة مثل 'جديد 🆕' أو 'مميز ⭐'
///
/// تدعم تدرج لوني للخلفية وحجم مخصص.
///
/// ```dart
/// FeatureChip(label: 'جديد 🆕')
/// FeatureChip(label: 'مميز ⭐', gradient: PremiumColors.accentGradient)
/// FeatureChip.warm(label: 'حصري 🔥')
/// ```
class FeatureChip extends StatelessWidget {
  const FeatureChip({
    super.key,
    required this.label,
    this.gradient,
    this.backgroundColor,
    this.textColor = Colors.white,
    this.fontSize = 11,
    this.borderRadius = 10,
    this.padding = const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    this.icon,
  });

  /// شريحة بتدرج دافئ (برتقالي)
  const FeatureChip.warm({
    super.key,
    required this.label,
    this.textColor = Colors.white,
    this.fontSize = 11,
    this.borderRadius = 10,
    this.padding = const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    this.icon,
  })  : gradient = PremiumColors.warmGradient,
        backgroundColor = null;

  /// شريحة بتدرج بنفسجي
  const FeatureChip.accent({
    super.key,
    required this.label,
    this.textColor = Colors.white,
    this.fontSize = 11,
    this.borderRadius = 10,
    this.padding = const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    this.icon,
  })  : gradient = PremiumColors.accentGradient,
        backgroundColor = null;

  /// شريحة بتدرج أساسي (أخضر ← أزرق)
  const FeatureChip.primary({
    super.key,
    required this.label,
    this.textColor = Colors.white,
    this.fontSize = 11,
    this.borderRadius = 10,
    this.padding = const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    this.icon,
  })  : gradient = PremiumColors.primaryGradient,
        backgroundColor = null;

  /// النص المعروض
  final String label;

  /// تدرج لوني للخلفية
  final Gradient? gradient;

  /// لون الخلفية (يُستخدم عند عدم تحديد [gradient])
  final Color? backgroundColor;

  /// لون النص
  final Color textColor;

  /// حجم الخط
  final double fontSize;

  /// نصف قطر الزوايا
  final double borderRadius;

  /// الحشو الداخلي
  final EdgeInsetsGeometry padding;

  /// أيقونة اختيارية قبل النص
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        gradient: gradient ?? PremiumColors.primaryGradient,
        color: gradient == null ? backgroundColor : null,
        borderRadius: BorderRadius.circular(borderRadius),
        boxShadow: [
          BoxShadow(
            color: (gradient != null ? PremiumColors.primary : (backgroundColor ?? PremiumColors.primary))
                .withValues(alpha: 0.3),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: fontSize + 2, color: textColor),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: GoogleFonts.cairo(
              fontWeight: FontWeight.w800,
              fontSize: fontSize,
              color: textColor,
              height: 1.3,
            ),
          ),
        ],
      ),
    );
  }
}
