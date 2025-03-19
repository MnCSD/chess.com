import NextAuth, { User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

import { db } from "./db";
import { getUserFromDb } from "./app/modules/users/server/get-user-from-db";
import authConfig from "../auth.config";
import { getUserById } from "./helpers/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.secNameTest = existingUser.name;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
