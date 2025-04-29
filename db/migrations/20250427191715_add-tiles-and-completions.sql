-- migrate:up
CREATE TABLE tiles (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    color TEXT NOT NULL,
    adjacent_tiles INTEGER[] NOT NULL,
    points INTEGER NOT NULL,
    board_id INT REFERENCES boards(id)
);

CREATE TABLE tile_completions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  tile_id INT REFERENCES tiles(id),
  proof TEXT NOT NULL, 
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE tile;
DROP TABLE tile_completions
