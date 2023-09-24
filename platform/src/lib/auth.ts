import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { encode, decode } from "next-auth/jwt";

import { prisma } from "@/lib/prisma";
import { ROUTE } from "@/config/route";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: ROUTE.APP.AUTH.LOGIN,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Digite seu nome de usuario",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          include: {
            supervisor: {
              select: {
                id: true,
              },
            },
          },
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        const userType = user.supervisor !== null ? "USER" : "SUPERVISOR";
        return !isValidPassword
          ? null
          : {
              id: user.id,
              email: user.email,
              name: user.name,
              type: userType,
              theme: "light",
            };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id as number;
        token.email = user.email;
        token.name = user.name;
        token.type = user.type;
        token.theme = user.theme;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.type = token.type;
        session.user.id = token.id;
        session.user.theme = token.theme;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },
};
