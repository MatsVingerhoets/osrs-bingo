"use server"

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  return await db.selectFrom('users').select(['id', 'username', 'role', 'team_id']).execute()
}

export async function postUser(values: { username: string, password: string }) {
  const hashedPass = await bcrypt.hash(values.password, 10)
  const result = await db.insertInto('users')
    .values({ username: values.username, password: hashedPass, role: "USER" })
    .executeTakeFirstOrThrow()
  if (!result) return { errors: "something went wrong" }
  revalidatePath("/admin/dashboard");
  return result
}
