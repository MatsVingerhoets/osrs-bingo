-- migrate:up
CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    config JSONB[] NOT NULL
);

-- migrate:down
DROP TABLE boards;

