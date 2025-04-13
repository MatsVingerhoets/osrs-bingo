-- migrate:up
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- migrate:down
DROP TABLE teams;

