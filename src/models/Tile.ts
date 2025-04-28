import { Generated } from "kysely";

export type TileModel = {
  id: Generated<number>;
  label: string
  url: string
  color: string
  hidden: boolean
  adjacent_tiles: number[]
  points: number
  board_id: number
}

export type Tile = Omit<TileModel, 'id'> & {
  id: number;
}
