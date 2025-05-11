"use server"

import db from "@/lib/db";

export async function getBoards() {
  return await db.selectFrom('boards').selectAll().execute()
}

export async function getBoardById(id: number) {
  return await db
    .selectFrom('boards')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

