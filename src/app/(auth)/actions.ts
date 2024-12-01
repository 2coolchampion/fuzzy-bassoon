"use server";

import { addRow } from "@/db";
import { signIn } from "../../../auth";

export async function addUser() {
  try {
    await addRow("dummy-user@example.com", "dummy-user");
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
}

export async function login() {
  await signIn("google");
}
