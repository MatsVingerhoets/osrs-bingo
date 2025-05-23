"use server"

import { sessionOptions, User } from "@/lib/session";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function login(formData: { username: string, password: string }) {
  const session = await getSession();

  const { username, password } = formData;
  const user = await db
    .selectFrom("users")
    .select(["id", "username", "password", "role", 'team_id'])
    .where("username", "=", username)
    .executeTakeFirst();

  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return { error: "Invalid credentials" };
  }

  session.user = {
    id: user.id,
    username: user.username,
    role: user.role,
    'team_id': user.team_id
  };

  // Save the session before redirecting
  await session.save();

  // Perform the redirect
  redirect('/');
}

export async function getSession(): Promise<IronSession<{ user?: User }>> {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);

  return session;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/")
}

