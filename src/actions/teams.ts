"use server"

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTeams() {
  const teams = await db.selectFrom('teams').selectAll('teams').execute()
  return teams
}

export async function postTeam(name: string) {
  const result = await db.insertInto('teams')
    .values({ name })
    .executeTakeFirstOrThrow()
  if (!result) return { errors: "something went wrong" }
  revalidatePath("/admin/dashboard");
  return result
}

export async function assignUserToTeam(userId: number, teamId: number) {
  await db
    .updateTable('users')
    .set({ team_id: teamId })
    .where('id', '=', userId)
    .executeTakeFirstOrThrow()

  revalidatePath('/admin/dashboard')
}

export async function assignBoardToTeam(boardId: number, teamId: number) {
  await db
    .updateTable('teams')
    .set({ board_id: boardId })
    .where('id', '=', teamId)
    .executeTakeFirstOrThrow()

  revalidatePath('/admin/dashboard')
}

export async function getTeamById(id: number) {
  return await db
    .selectFrom('teams')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}
