"use server";

import { signIn } from "@/auth";

export async function googleSignIn() {
  signIn("google");
}
