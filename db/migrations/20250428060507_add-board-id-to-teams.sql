-- migrate:up
ALTER TABLE teams 
ADD COLUMN board_id INTEGER;

ALTER TABLE teams 
ADD CONSTRAINT fk_teams_board
FOREIGN KEY (board_id)
REFERENCES boards(id)
ON DELETE SET NULL;

-- migrate:down
ALTER TABLE teams 
DROP CONSTRAINT IF EXISTS fk_teams_board;

ALTER TABLE teams 
DROP COLUMN IF EXISTS board_id;
