export type QueryTile = {
  tile_id: number;
  label: string;
  url: string;
  color: string;
  adjacent_tiles: number[];
  completed: boolean
  completed_by: string | null
  completed_at: Date | null
  points: number
}

export type TileWithHiddenProp = QueryTile & { hidden: boolean }

export type RowConfigWithHidden = {
  rowIndex: number;
  shift: number;
  tiles: TileWithHiddenProp[];
};

export type RowConfig = {
  rowIndex: number;
  shift: number;
  tiles: QueryTile[];
};

