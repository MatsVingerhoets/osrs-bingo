-- migrate:up
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    duration_minutes INTEGER NOT NULL
);

-- Add event_id column to teams table
ALTER TABLE teams
ADD COLUMN event_id INTEGER REFERENCES events(id) ON DELETE SET NULL;

-- migrate:down
DROP TABLE events;

ALTER TABLE teams 
DROP CONSTRAINT IF EXISTS fk_teams_event;

ALTER TABLE teams 
DROP COLUMN IF EXISTS event_id;
