"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByEmail } from "@/helpers/user";
import bcrypt from "bcryptjs";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "User email already exists",
    };
  }

  await db.insert(users).values({
    email,
    name,
    password: hashedPassword,
  });

  // TODO: Send email verification

  return {
    success: "User created",
  };
};
