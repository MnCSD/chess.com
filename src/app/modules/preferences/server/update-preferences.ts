"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updatePreferences = async (country: string, level: number) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "User not found",
    };
  }

  if (!session.user.id) {
    return {
      error: "User ID not found",
    };
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  const [updatedUser] = await db
    .update(users)
    .set({
      country,
      level,
    })
    .where(eq(users.id, session.user.id))
    .returning();

  return {
    success: "Preferences updated",
    user: updatedUser,
  };
};
