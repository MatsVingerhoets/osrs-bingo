import { SessionOptions } from "iron-session";

export type User = {
  id: number;
  username: string;
  role: "USER" | "ADMIN"
  team_id?: number
};

// Extend the session to include `user`
declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: "OsOMhCtJTn72PmntuxxmgGCRReQEC+89eMFO3fHZIE0=",
  cookieName: "osrs-session",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    secure: process.env.NODE_ENV === "production",
  }
}

