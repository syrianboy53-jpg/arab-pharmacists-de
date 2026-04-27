-- ============================================================
-- Ammaar (عمّار) — Construction Marketplace PostgreSQL schema
-- Extends the existing database with tables for admin settings,
-- user profiles, subscriptions, and material prices.
-- ============================================================

-- Admin-managed payment accounts (shown on VIP subscription page).
CREATE TABLE IF NOT EXISTS payment_accounts (
    id              TEXT PRIMARY KEY,
    method          TEXT NOT NULL,           -- syriatel_cash, sham_cash, al_haram, other
    label           TEXT NOT NULL,           -- Arabic display name
    account_number  TEXT NOT NULL,
    holder_name     TEXT NOT NULL,
    enabled         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin-managed contact / social media channels.
CREATE TABLE IF NOT EXISTS contact_info (
    id      TEXT PRIMARY KEY,
    type    TEXT NOT NULL,                   -- phone, whatsapp, telegram, facebook, email, other
    label   TEXT NOT NULL,
    value   TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- Subscription plan definitions.
CREATE TABLE IF NOT EXISTS subscription_plans (
    id              TEXT PRIMARY KEY,
    name_ar         TEXT NOT NULL,
    description_ar  TEXT NOT NULL,
    price_syp       NUMERIC NOT NULL,
    duration        TEXT NOT NULL            -- monthly, yearly, lifetime
);

-- User profiles for workers and employers.
CREATE TABLE IF NOT EXISTS user_profiles (
    id                  TEXT PRIMARY KEY,
    name                TEXT NOT NULL,
    role                TEXT NOT NULL CHECK (role IN ('worker', 'employer')),
    phone               TEXT NOT NULL,
    city                TEXT,
    address             TEXT,
    bio                 TEXT,
    photo_url           TEXT,
    specialty           TEXT,               -- for workers only
    is_available        BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified         BOOLEAN NOT NULL DEFAULT FALSE,
    subscription_status TEXT NOT NULL DEFAULT 'free'
                        CHECK (subscription_status IN ('free', 'pending', 'active', 'expired')),
    subscription_plan   TEXT REFERENCES subscription_plans(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS user_profiles_role_idx   ON user_profiles (role);
CREATE INDEX IF NOT EXISTS user_profiles_city_idx   ON user_profiles (city);
CREATE INDEX IF NOT EXISTS user_profiles_avail_idx  ON user_profiles (is_available) WHERE role = 'worker';

-- Construction material prices (updated manually or via cron).
CREATE TABLE IF NOT EXISTS material_prices (
    id              TEXT PRIMARY KEY,
    name_ar         TEXT NOT NULL,
    unit            TEXT NOT NULL,           -- طن، كيس، متر...
    price           NUMERIC NOT NULL,        -- in SYP
    last_updated    DATE,
    source          TEXT DEFAULT 'manual',   -- manual | online
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscription activation requests (user submits, admin reviews).
CREATE TABLE IF NOT EXISTS subscription_requests (
    id              SERIAL PRIMARY KEY,
    user_id         TEXT NOT NULL REFERENCES user_profiles(id),
    plan_id         TEXT NOT NULL REFERENCES subscription_plans(id),
    payment_method  TEXT NOT NULL,
    sender_phone    TEXT NOT NULL,
    receipt_url     TEXT,
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at     TIMESTAMPTZ
);
