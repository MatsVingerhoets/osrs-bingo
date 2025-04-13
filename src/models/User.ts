import { Generated } from "kysely";

export type UserModel = {
  id: Generated<number>;
  username: string;
  password: string;
  role: "USER" | "ADMIN"
  team_id?: number
}

export type User = Omit<UserModel, 'id'> & {
  id: number;
}
