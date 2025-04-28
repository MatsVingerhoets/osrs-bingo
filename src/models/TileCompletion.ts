import { Generated } from "kysely";

export interface TileCompletionModel {
  id: Generated<number>;
  tileId: string;
  teamId: string;
  completedByUserId: string;
  completedAt: Date;
}

export type TileCompletion = Omit<TileCompletionModel, 'id'> & {
  id: number;
}
