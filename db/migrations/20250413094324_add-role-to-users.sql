-- migrate:up
ALTER TABLE users
ADD COLUMN role TEXT NOT NULL DEFAULT 'USER';

-- migrate:down
ALTER TABLE users
DROP COLUMN role;
