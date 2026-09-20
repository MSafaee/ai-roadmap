CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    owner INTEGER NOT NULL,
    task TEXT NOT NULL,
    attendees INTEGER[] NOT NULL DEFAULT '{}',
    deadline TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'in_progress',
    finished_at TIMESTAMPTZ,
    delayed BOOLEAN NOT NULL DEFAULT FALSE
);

-- CREATE USER schedule_reader
-- WITH PASSWORD 'reader_password';

-- GRANT CONNECT ON DATABASE schedules
-- TO schedule_reader;

-- GRANT USAGE ON SCHEMA public
-- TO schedule_reader;

-- GRANT SELECT ON TABLE schedules
-- TO schedule_reader;