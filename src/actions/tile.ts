'use server'

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { sql } from "kysely";

export async function postTileCompletion(values: { proof: string, user_id: number, tile_id: number }) {
  const result = await db.insertInto('tile_completions')
    .values({ ...values, completed_at: new Date() })
    .executeTakeFirstOrThrow()
  console.log({ result })
  if (!result) return { errors: "something went wrong" }

  revalidatePath("/");
}
export async function getTilesWithCompletions(boardId: number, teamId: number) {
  return await db
    .selectFrom('users')
    .innerJoin('teams', 'users.team_id', 'teams.id')
    .innerJoin('boards', 'teams.board_id', 'boards.id')
    .innerJoin('tiles', 'tiles.board_id', 'boards.id')
    .leftJoin('tile_completions', (join) =>
      join
        .onRef('tile_completions.tile_id', '=', 'tiles.id')
        .onRef('tile_completions.user_id', '=', 'users.id')
    )
    .leftJoin('users as completion_user', 'tile_completions.user_id', 'completion_user.id')
    .select([
      'boards.name as board_name',
      'tiles.label as label',
      'tiles.url as url',
      'tiles.points as points',
      'tiles.color as color',
      'tiles.adjacent_tiles as adjacent_tiles',
      'tiles.id as tile_id',
      sql<boolean>`tile_completions.id IS NOT NULL`.as('completed'),
      'tile_completions.completed_at',
      'completion_user.username as completed_by',
    ])
    .where('boards.id', '=', boardId)
    .where('teams.id', '=', teamId)
    .execute();
}
