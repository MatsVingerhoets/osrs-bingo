-- migrate:up
CREATE TABLE boards (
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE tiles (
  id SERIAL PRIMARY KEY,
  value INTEGER NOT NULL,
  color TEXT NOT NULL,
  position INTEGER NOT NULL -- You can change this to row/col structure if needed
);

CREATE TABLE board_tiles (
  id SERIAL PRIMARY KEY,
  board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  tile_id INTEGER NOT NULL REFERENCES tiles(id),
  completed_by_user_id INTEGER REFERENCES users(id),
  completed_at TIMESTAMP
);

-- migrate:down
DROP TABLE IF EXISTS board_tiles;
DROP TABLE IF EXISTS tiles;
DROP TABLE IF EXISTS boards;
