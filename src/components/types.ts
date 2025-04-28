export type Tile = {
  id: number;
  label: string;
  url: string;
  value: number;
  color: string;
  hidden: boolean;
  adjacentTiles: number[];
  completed: boolean
  completedBy?: string
  points: number
};

export type RowConfig = {
  rowIndex: number;
  shift: number;
  tiles: Tile[];
};

export type BoardConfig = RowConfig[];
