# Project plan & growth roadmap

## Why a curated seed (not 10 000 terms on day one)

Auto-generating thousands of EN/DE/AR pharmacy terms in a single pass is
**not safe**: medical translation errors can cause real harm (wrong dose,
wrong indication, missed contraindication). Every term in this repo has been
written by hand and is reviewable line-by-line in the JSON files.

The dataset is therefore designed to **grow over time**, not to be complete
on day one.

## How to grow the dataset to 10 000+ terms safely

1. **MeSH (Medical Subject Headings)** — public, multilingual (DE/EN), good
   for diseases, anatomy, symptoms.
   - Source: <https://www.nlm.nih.gov/mesh/meshhome.html>
   - Pipeline idea: download `desc<year>.xml`, filter to relevant tree
     branches (C/A/D), translate to AR via reviewed glossary.

2. **WHO ATC index** — gold standard for drug classes.
   - Source: <https://www.whocc.no/atc_ddd_index/>

3. **Wikidata** — gives multilingual labels (including AR) for drugs and
   diseases via SPARQL queries (`wdt:P31 wd:Q12140` for medications).

4. **ABDA / Lauer-Taxe** — German national drug directory. Requires a
   commercial license, but is the source of truth for German trade names,
   PZN codes, and Rx/OTC status.

5. **Pharmacist review queue** — every batch import should land in a
   `pending_review` table and be promoted only after a real pharmacist signs
   off. The `terms` JSON can grow to a backing database without changing the
   app.

## Phased delivery

### Phase 1 — Done (this PR)
- 10 categories, 300 terms, 30 dialogues, 30 drugs, 12 quizzes.
- Flutter app: 5 tabs, multilingual search, term detail, dialogue viewer
  with per-turn language toggle, quiz with explanations.
- PostgreSQL schema + Node.js seed script.

### Phase 2 — Next 4–6 weeks (suggested)
- [ ] Import ATC drug classes from WHO (~6 000 drugs).
- [ ] Add ~2 000 disease/symptom terms from MeSH (machine-extracted, then
      Arabic-reviewed).
- [ ] Expand dialogues to ~100 scenarios covering all FSP topic areas.
- [ ] Add user accounts + Leitner spaced-repetition flashcards (`user_progress`
      table is already in the schema).
- [ ] Add example sentences in DE for every term (for FSP listening prep).

### Phase 3 — 3–6 months
- [ ] AI-assisted patient simulator (LLM with strict safety guardrails:
      always declines diagnosis / dosing without disclaimer).
- [ ] Voice search (DE & AR).
- [ ] Bilingual Anwendungshinweise printer for patient handouts.
- [ ] Play Store / App Store releases.

## Legal / safety guardrails (non-negotiable)

- The app must always show the educational disclaimer on first run.
- Drug dosing strings must include the source (e.g. "ABDA 2024", "Fachinfo")
  before the app is ever used clinically.
- The "AI patient simulator" must NEVER give real diagnostic advice. Use a
  hard system prompt that refuses, plus client-side safety checks.
- Translations of drug warnings must be reviewed by a German-licensed
  pharmacist (Approbierter Apotheker) before release to end users.
