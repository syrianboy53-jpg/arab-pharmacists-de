#!/usr/bin/env node
/**
 * Seed script: imports JSON datasets into a PostgreSQL database
 * defined by backend/schema.sql.
 *
 *   npm install pg
 *   PGURL=postgres://user:pass@host:5432/db node scripts/seed.js
 *
 * Run schema.sql first:
 *   psql "$PGURL" -f backend/schema.sql
 */
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const ROOT = path.resolve(__dirname, '..');
const DATA = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', file), 'utf8'));

async function main() {
  const url = process.env.PGURL;
  if (!url) {
    console.error('PGURL env var is required');
    process.exit(1);
  }
  const client = new Client({ connectionString: url });
  await client.connect();

  try {
    await client.query('BEGIN');

    const categories = DATA('categories.json');
    for (const c of categories) {
      await client.query(
        `INSERT INTO categories (id, en, de, ar) VALUES ($1,$2,$3,$4)
         ON CONFLICT (id) DO UPDATE SET en=EXCLUDED.en, de=EXCLUDED.de, ar=EXCLUDED.ar`,
        [c.id, c.en, c.de, c.ar]
      );
    }
    console.log(`Seeded ${categories.length} categories`);

    const terms = DATA('terms.json');
    for (const t of terms) {
      await client.query(
        `INSERT INTO terms (id, category, en, de, ar, definition_en, definition_de, definition_ar, example_de)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (id) DO UPDATE SET
           category=EXCLUDED.category, en=EXCLUDED.en, de=EXCLUDED.de, ar=EXCLUDED.ar,
           definition_en=EXCLUDED.definition_en, definition_de=EXCLUDED.definition_de,
           definition_ar=EXCLUDED.definition_ar, example_de=EXCLUDED.example_de`,
        [t.id, t.category, t.en, t.de, t.ar,
         t.definition_en ?? null, t.definition_de ?? null, t.definition_ar ?? null,
         t.example_de ?? null]
      );
    }
    console.log(`Seeded ${terms.length} terms`);

    const drugs = DATA('drugs.json');
    for (const d of drugs) {
      await client.query(
        `INSERT INTO drugs (id, trade_name, active_ingredient, drug_class, indications_de, indications_ar, dosage_adult_de, rx, warnings_de)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (id) DO UPDATE SET
           trade_name=EXCLUDED.trade_name, active_ingredient=EXCLUDED.active_ingredient,
           drug_class=EXCLUDED.drug_class, indications_de=EXCLUDED.indications_de,
           indications_ar=EXCLUDED.indications_ar, dosage_adult_de=EXCLUDED.dosage_adult_de,
           rx=EXCLUDED.rx, warnings_de=EXCLUDED.warnings_de`,
        [d.id, d.trade_name, d.active_ingredient, d.drug_class ?? null,
         d.indications_de ?? null, d.indications_ar ?? null,
         d.dosage_adult_de ?? null, !!d.rx, d.warnings_de ?? null]
      );
    }
    console.log(`Seeded ${drugs.length} drugs`);

    const dialogues = DATA('dialogues.json');
    for (const dlg of dialogues) {
      await client.query(
        `INSERT INTO dialogues (id, scenario_en, scenario_de, scenario_ar, tags, turns)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (id) DO UPDATE SET
           scenario_en=EXCLUDED.scenario_en, scenario_de=EXCLUDED.scenario_de,
           scenario_ar=EXCLUDED.scenario_ar, tags=EXCLUDED.tags, turns=EXCLUDED.turns`,
        [dlg.id, dlg.scenario_en, dlg.scenario_de, dlg.scenario_ar,
         dlg.tags ?? [], JSON.stringify(dlg.turns)]
      );
    }
    console.log(`Seeded ${dialogues.length} dialogues`);

    const quizzes = DATA('quizzes.json');
    for (const q of quizzes) {
      await client.query(
        `INSERT INTO quizzes (id, category, question_de, question_ar, options, answer_index, explanation_de)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id) DO UPDATE SET
           category=EXCLUDED.category, question_de=EXCLUDED.question_de,
           question_ar=EXCLUDED.question_ar, options=EXCLUDED.options,
           answer_index=EXCLUDED.answer_index, explanation_de=EXCLUDED.explanation_de`,
        [q.id, q.category, q.question_de, q.question_ar,
         JSON.stringify(q.options), q.answer_index, q.explanation_de ?? null]
      );
    }
    console.log(`Seeded ${quizzes.length} quizzes`);

    await client.query('COMMIT');
    console.log('OK');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
