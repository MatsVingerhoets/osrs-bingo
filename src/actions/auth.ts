"use server"

import { sessionOptions, User } from "@/lib/session";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

// const VALID_CODES = {
//   'test123': { id: 1, name: 'Player 1' },
//   'player2-code': { id: 2, name: 'Player 2' },
// };
//
export async function login(formData: { username: string, password: string }) {

  const session = await getSession();

  const { username, password } = formData;
  const user = await db
    .selectFrom("users")
    .select(["id", "username", "password"]) // password is hashed
    .where("username", "=", username)
    .executeTakeFirst();

  console.log({ user })
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
  };

  console.log("success")
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

