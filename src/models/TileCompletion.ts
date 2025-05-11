import { Generated } from "kysely";

export interface TileCompletionModel {
  id: Generated<number>;
  tile_id: number;
  user_id: number;
  completed_at: Date;
}

export type TileCompletion = Omit<TileCompletionModel, 'id'> & {
  id: number;
}
