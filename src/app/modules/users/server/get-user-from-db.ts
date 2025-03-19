"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserFromDb(email: string, password: string) {
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (existingUser.password !== password) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    return {
      success: true,
      data: existingUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
