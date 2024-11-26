"use server";

import { addRow } from "@/db";

export async function addUser() {
  try {
    await addRow("dummy-user@example.com", "dummy-user");
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
}
