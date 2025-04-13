-- migrate:up
ALTER TABLE users
ADD COLUMN team_id INTEGER;

ALTER TABLE users
ADD CONSTRAINT fk_users_team
FOREIGN KEY (team_id)
REFERENCES teams(id)
ON DELETE SET NULL;

-- migrate:down
ALTER TABLE users
DROP CONSTRAINT IF EXISTS fk_users_team;

ALTER TABLE users
DROP COLUMN IF EXISTS team_id;
