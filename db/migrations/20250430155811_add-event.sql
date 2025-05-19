-- migrate:up
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    duration_minutes INTEGER NOT NULL
);

-- Add event_id column to boards table
ALTER TABLE boards 
ADD COLUMN event_id INTEGER REFERENCES events(id) ON DELETE SET NULL;

ALTER TABLE teams 
ADD COLUMN event_id INTEGER REFERENCES events(id) ON DELETE SET NULL;

-- migrate:down
DROP TABLE events;

ALTER TABLE boards 
DROP CONSTRAINT IF EXISTS fk_boards_event;

ALTER TABLE boards 
DROP COLUMN IF EXISTS event_id;

ALTER TABLE teams 
DROP CONSTRAINT IF EXISTS fk_teams_event;

ALTER TABLE teams 
DROP COLUMN IF EXISTS event_id;
