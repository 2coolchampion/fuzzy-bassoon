import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export type Layout = "layout1" | "layout2";
