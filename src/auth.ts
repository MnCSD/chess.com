import NextAuth, { DefaultSession, User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "./db";
import authConfig from "../auth.config";
import { getUserById } from "./helpers/user";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      country: string;
      level: number;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await db
          .update(users)
          .set({
            emailVerified: new Date(),
          })
          .where(eq(users.id, user.id));
      }
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.country = token.country as string;
        session.user.level = token.level as number;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.country = existingUser.country || "";
      token.level = existingUser.level || 0;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
