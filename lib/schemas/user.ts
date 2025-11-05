import * as z from "zod";

export const ZUserLogin = z.object({
  name: z.string().optional(),
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const ZUserRegister = z.object({
  name: z.string("Username is required"),
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password is too short"),
});
