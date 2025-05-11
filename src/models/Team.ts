import { Generated } from "kysely";

export type TeamModel = {
  id: Generated<number>;
  name: string
  board_id?: number
}

export type Team = Omit<TeamModel, 'id'> & {
  id: number;
}
