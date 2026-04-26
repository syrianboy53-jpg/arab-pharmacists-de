-- ============================================================
-- Arab Pharmacists in Germany — PostgreSQL schema
-- All tables use lowercase snake_case per Postgres conventions.
-- Multilingual fields are stored as plain TEXT columns.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Lookup table for term categories (disease, drug_class, ...).
CREATE TABLE IF NOT EXISTS categories (
    id   TEXT PRIMARY KEY,
    en   TEXT NOT NULL,
    de   TEXT NOT NULL,
    ar   TEXT NOT NULL
);

-- Core multilingual terminology table.
CREATE TABLE IF NOT EXISTS terms (
    id            TEXT PRIMARY KEY,
    category      TEXT NOT NULL REFERENCES categories(id),
    en            TEXT NOT NULL,
    de            TEXT NOT NULL,
    ar            TEXT NOT NULL,
    definition_en TEXT,
    definition_de TEXT,
    definition_ar TEXT,
    example_de    TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigram indexes for fast multilingual fuzzy search.
CREATE INDEX IF NOT EXISTS terms_en_trgm_idx ON terms USING gin (en gin_trgm_ops);
CREATE INDEX IF NOT EXISTS terms_de_trgm_idx ON terms USING gin (de gin_trgm_ops);
CREATE INDEX IF NOT EXISTS terms_ar_trgm_idx ON terms USING gin (ar gin_trgm_ops);
CREATE INDEX IF NOT EXISTS terms_category_idx ON terms (category);

-- Drugs (trade name + active ingredient + class + dosing).
CREATE TABLE IF NOT EXISTS drugs (
    id                  TEXT PRIMARY KEY,
    trade_name          TEXT NOT NULL,
    active_ingredient   TEXT NOT NULL,
    drug_class          TEXT,
    indications_de      TEXT,
    indications_ar      TEXT,
    dosage_adult_de     TEXT,
    rx                  BOOLEAN NOT NULL DEFAULT FALSE,
    warnings_de         TEXT
);

CREATE INDEX IF NOT EXISTS drugs_trade_trgm_idx       ON drugs USING gin (trade_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS drugs_active_trgm_idx      ON drugs USING gin (active_ingredient gin_trgm_ops);
CREATE INDEX IF NOT EXISTS drugs_class_idx            ON drugs (drug_class);
CREATE INDEX IF NOT EXISTS drugs_rx_idx               ON drugs (rx);

-- Pharmacy dialogues. Turns are stored as a JSONB array.
CREATE TABLE IF NOT EXISTS dialogues (
    id            TEXT PRIMARY KEY,
    scenario_en   TEXT NOT NULL,
    scenario_de   TEXT NOT NULL,
    scenario_ar   TEXT NOT NULL,
    tags          TEXT[] NOT NULL DEFAULT '{}',
    turns         JSONB NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS dialogues_tags_idx ON dialogues USING gin (tags);

-- Multiple-choice quiz items.
CREATE TABLE IF NOT EXISTS quizzes (
    id              TEXT PRIMARY KEY,
    category        TEXT NOT NULL,
    question_de     TEXT NOT NULL,
    question_ar     TEXT NOT NULL,
    options         JSONB NOT NULL,         -- array of strings
    answer_index    INTEGER NOT NULL,
    explanation_de  TEXT
);

-- ============================================================
-- Per-user learning progress (the app sends user_id as TEXT;
-- swap to UUID + auth.users(id) if you wire up Supabase/Auth).
-- ============================================================

CREATE TABLE IF NOT EXISTS user_progress (
    user_id     TEXT NOT NULL,
    term_id     TEXT NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
    box         INTEGER NOT NULL DEFAULT 1,    -- Leitner spaced-repetition box (1..5)
    next_due    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    correct     INTEGER NOT NULL DEFAULT 0,
    incorrect   INTEGER NOT NULL DEFAULT 0,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, term_id)
);

CREATE INDEX IF NOT EXISTS user_progress_due_idx ON user_progress (user_id, next_due);
