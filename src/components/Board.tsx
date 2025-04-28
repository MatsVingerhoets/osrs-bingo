'use client'

import { useState } from 'react';
import { TILESIZE } from './config';
import Tile from './Tile';
import { BoardConfig, Tile as TileType } from './types';
import { tiles } from '../../db/tiles';
import { Board as BoardType } from "@/models/Board"

type Props = {
  playedBoard: BoardType
}
const Board = ({ playedBoard }: Props) => {
  const initialBoardConfig = playedBoard.config.map(row => ({
    ...row,
    tiles: row.tiles.map(tileId => tiles.find(tile => tile.id === tileId)),
  })) as unknown as { rowIndex: number, tiles: TileType[], shift: number }[];

  const gap = 8;

  // also save completed tiles to db
  const [boardConfig, setBoardConfig] = useState<BoardConfig>(initialBoardConfig);
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
            {tiles.map(({ completed, id, value, color, url, hidden, label }) => (
              <Tile completed={completed} setBoardConfig={setBoardConfig} hidden={hidden} key={id} id={id} value={value} color={color} url={url} label={label} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
