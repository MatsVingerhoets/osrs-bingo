'use client'

import { useState } from 'react';
import { TILESIZE } from './config';
import Tile from './Tile';
import { Board as BoardType } from "@/models/Board"
import { User } from '@/models/User';
import { updateTileVisibility } from '@/app/util';
import { QueryTile, RowConfigWithHidden, TileWithHiddenProp } from './types';

type Props = {
  playedBoard: BoardType
  user: Omit<User, 'password'>
  tiles: QueryTile[]
}

const Board = ({ tiles, user, playedBoard }: Props) => {
  const initialBoardConfig = updateTileVisibility(
    playedBoard.config.map(row => ({
      ...row,
      tiles: row.tiles.map(tileId => tiles.find((tile: QueryTile) => tile.tile_id === tileId)),
    })) as unknown as { rowIndex: number, tiles: TileWithHiddenProp[], shift: number }[]
  );
  const gap = 8;

  // also save completed tiles to db
  const [boardConfig, setBoardConfig] = useState<RowConfigWithHidden[]>(initialBoardConfig);
  // Calculated values
  const rowHeight = TILESIZE * 0.75 + gap; // vertical offset per row
  const colOffset = TILESIZE / 2 + gap / 2; // left shift for odd rows

  return (
    <div
      className="flex-1 relative"
      style={{ "--tile-size": `${TILESIZE}px` } as React.CSSProperties}
    >
      {boardConfig.map(({ rowIndex, tiles, shift }) => {
        const leftShift = colOffset * shift;
        return (
          <div
            key={rowIndex}
            className="flex gap-[8px] absolute"
            style={{
              top: `${rowHeight * rowIndex}px`,
              left: `${leftShift}px`,
            }}
          >
            {tiles.map(({ points, completed_at, completed, completed_by, tile_id, color, url, hidden, label }) => (
              <Tile points={points} completedAt={completed_at} completedBy={completed_by} user={user} completed={completed} setBoardConfig={setBoardConfig} hidden={hidden} key={tile_id} id={tile_id} color={color} url={url} label={label} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
