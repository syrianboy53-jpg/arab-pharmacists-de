# Arab Pharmacists in Germany

Multilingual (English / Deutsch / العربية) terminology, dialogue, and exam-prep app
for Arabic-speaking pharmacists working or training in Germany.

> ⚠️ **Disclaimer.** This project is for educational purposes only and does **not**
> constitute medical advice. Always confirm dosages and indications with current
> sources (Fachinformation, ABDA, Rote Liste, Lauer-Taxe) and a qualified
> healthcare professional before clinical use.

---

## Repository layout

```
.
├── app/        # Flutter mobile app (Android / iOS / web)
├── data/       # Curated seed datasets (terms, dialogues, drugs, quizzes)
├── backend/    # PostgreSQL schema (DDL)
├── scripts/    # Data seed / import scripts (Node.js)
└── docs/       # Plans, design notes, and Arabic walkthrough
```

## Datasets (`data/`)

| File              | Records | Description                                                                  |
| ----------------- | ------- | ---------------------------------------------------------------------------- |
| `categories.json` | 10      | Term categories (disease, symptom, drug class, …).                           |
| `terms.json`      | 300     | Curated EN / DE / AR pharmacy & medical terms with optional definitions.     |
| `drugs.json`      | 30      | Drugs with active ingredient, class, indication, adult dose, Rx/OTC, warnings. |
| `dialogues.json`  | 30      | Pharmacy dialogue scenarios (counselling, OTC, prescriptions, BtM, …).       |
| `quizzes.json`    | 12      | Multiple-choice questions with explanations.                                 |

The datasets are intentionally a **high-quality seed**, not the 10 000+ terms
mentioned in long-term plans. They are designed so a pharmacist can review and
extend them via plain JSON. See [`docs/plan.md`](docs/plan.md) for the growth
roadmap.

## Flutter app (`app/`)

A Material 3 app with five tabs:

1. **Terms** — browse 300 multilingual terms with category filters and search.
2. **Dialogues** — read 30 real-world EN / DE / AR pharmacy conversations,
   tap any bubble to reveal the other languages.
3. **Drugs** — browse drugs with active ingredient, indication, dose, Rx/OTC
   filter, warnings.
4. **Quiz** — randomized multiple-choice questions with explanations.
5. **Search** — global multilingual search across terms and drugs.

### Run locally

```bash
cd app
flutter pub get
flutter run            # device / emulator
flutter run -d chrome  # web preview
flutter test           # unit tests for data validation & search
flutter analyze        # lints
```

## Backend / database

The schema in [`backend/schema.sql`](backend/schema.sql) creates PostgreSQL
tables for `categories`, `terms`, `drugs`, `dialogues`, `quizzes`, and
`user_progress` (Leitner spaced-repetition).

```bash
psql "$PGURL" -f backend/schema.sql

cd scripts
npm install pg
PGURL="postgres://user:pass@host:5432/db" node seed.js
```

## Roadmap

- [x] Phase 1 — Curated seed dataset, Flutter app skeleton, Postgres schema.
- [ ] Phase 2 — Expand to 2 000+ terms via MeSH / WHO ATC / Wikidata import,
      richer dialogues, full FSP simulation cases, spaced-repetition flashcards.
- [ ] Phase 3 — AI-assisted patient simulator, voice search, native Android /
      iOS releases.

## License

This repository's code is released under the MIT license. The dataset content
is provided under CC BY-SA 4.0 for educational use.
