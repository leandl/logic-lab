import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      type: "USER" | "SUPERVISOR";
      theme: "dark" | "light";
    } & DefaultSession;
  }

  interface User {
    id: number;
    name: string;
    email: string;
    type: "USER" | "SUPERVISOR";
    theme: "dark" | "light";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    type: "USER" | "SUPERVISOR";
    theme: "dark" | "light";
  }
}
