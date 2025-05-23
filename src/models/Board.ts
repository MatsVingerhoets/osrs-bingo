import { Generated } from "kysely";

export type BoardModel = {
  id: Generated<number>;
  name: string;
  config: { rowIndex: number, tiles: number[], shift: number }[];
  event_id?: number
}

export type Board = Omit<BoardModel, 'id'> & {
  id: number;
}
