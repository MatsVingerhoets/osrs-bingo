import { Generated } from "kysely";

export type EventModel = {
  id: Generated<number>;
  name: string;
  start_time: Date;
  duration_minutes: number;
}

export type Board = Omit<EventModel, 'id'> & {
  id: number;
}
