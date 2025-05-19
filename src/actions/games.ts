'use server'

import { createBoard } from "./boards";
import { createTiles } from "./tiles";
import { createEvent } from './events'
import db from "@/lib/db";

export async function createGame() {
  const result = await db.transaction().execute(async (trx) => {
    const event = await createEvent(trx)
    const board = await createBoard(trx, event.id)
    await createTiles(trx, board.id)
    return { success: true }
  })
  if (result.success) return result
  else return { success: false }
}

