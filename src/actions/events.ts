"use server"

import db, { Database } from "@/lib/db";
import { Transaction } from "kysely";

export async function getBoards() {
  return await db.selectFrom('boards').selectAll().execute()
}

export async function getEventById(id: number) {
  return await db
    .selectFrom('events')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function createEvent(trx: Transaction<Database>) {
  // 44640 minutes is 21 days
  const result = await trx.insertInto('events')
    .values({ name: "KnS first bingo", start_time: new Date(), duration_minutes: 44640 })
    .returningAll()
    .executeTakeFirstOrThrow();
  return result
}
