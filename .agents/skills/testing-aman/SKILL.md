# Testing the Aman (أمان) App

## Overview
Aman is a Flutter web app providing community support for Arab families in Germany. It includes consulting, legal guides, private sessions, and more.

## Setup

### Prerequisites
- Flutter SDK (3.24.5+) at `/home/ubuntu/flutter/bin`
- Chrome browser running

### Running the App Locally
```bash
export PATH="/home/ubuntu/flutter/bin:$PATH"
cd /home/ubuntu/repos/arab-pharmacists-de/app
flutter pub get
flutter run -d web-server --web-port=8080
```
Then open `http://localhost:8080` in Chrome.

**Important**: Use `-d web-server` (not `-d chrome`). The `-d chrome` option may fail because it tries to launch a new Chrome instance with a temp profile, which conflicts with the existing running Chrome.

### Lint & Tests
```bash
export PATH="/home/ubuntu/flutter/bin:$PATH"
cd /home/ubuntu/repos/arab-pharmacists-de/app
flutter analyze   # Should show 0 issues
flutter test      # Should pass all tests (31+)
```

## Navigation

### Known Issue: Drawer Not Accessible
The main app uses nested Scaffolds — inner page Scaffolds (e.g. TermsScreen) have their own AppBars which hide the outer Scaffold's drawer hamburger icon. To reach the Aman section:

**Workaround for testing**: Temporarily change `main.dart` line `home: const HomeScreen()` to `home: const AmanHomeScreen()` (add `import 'screens/aman/aman_home_screen.dart';`). **Remember to revert after testing.**

### Navigation Path (when drawer works)
Hamburger menu → "أمان - الدعم المجتمعي" → Aman home screen → scroll to sections

### Key Screens
- **Aman Home**: `app/lib/screens/aman/aman_home_screen.dart` — main hub with all section cards
- **Private Session Booking**: `app/lib/screens/aman/private_session_booking_screen.dart` — alias + slot + payment → book
- **Private Chat Room**: `app/lib/screens/aman/private_chat_room_screen.dart` — 25-min timer + messages + self-destruct
- **Legal Compliance**: `app/lib/screens/aman/legal_compliance_screen.dart` — DSGVO/AGB/Impressum

## Testing the Private Session Flow

### Booking Flow
1. Open الجلسة السرية card on Aman home
2. Enter alias (type or pick chip)
3. Select time slot
4. Check terms checkbox
5. Tap "ادفع 1€ لتأكيد الحجز" → confirm in dialog
6. Tap "احجز موعدك الآن" (should be enabled)
7. Session card appears in "جلساتك" section

### Chat Room
1. Tap "ابدأ" on session card
2. Timer starts at 25:00, counts down every second
3. Consultant auto-reply appears after ~2 seconds
4. Send a message → second auto-reply appears after ~3 seconds
5. Messages show with user alias and consultant alias

### Self-Destruct
1. Tap red delete icon in AppBar
2. Confirmation dialog: "تدمير الجلسة"
3. Tap "تدمير نهائي" → navigates back, SnackBar confirms
4. Session removed from SharedPreferences

**Note**: After destroying, the booking screen may still show the session card until you navigate away and back (minor UI refresh issue — data IS deleted).

## Data Storage
- All data stored locally via SharedPreferences (no backend)
- Session data persists across app restarts
- Destroy removes data permanently

## Devin Secrets Needed
None — the app is fully offline/local with no external API integrations.
