import { Generated } from "kysely";

export type TeamModel = {
  id: Generated<number>;
  name: string
}

export type Team = Omit<TeamModel, 'id'> & {
  id: number;
}
