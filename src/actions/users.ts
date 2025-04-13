"use server"

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  return await db.selectFrom('users').select(['id', 'username', 'role', 'team_id']).execute()
}

export async function postUser(values: { username: string, password: string }) {
  const result = await db.insertInto('users')
    .values({ username: values.username, password: values.password, role: "USER" })
    .executeTakeFirstOrThrow()
  if (!result) return { errors: "something went wrong" }
  revalidatePath("/admin/dashboard");
  return result
}
