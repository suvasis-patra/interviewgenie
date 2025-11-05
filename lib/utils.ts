import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZUserLogin, ZUserRegister } from "./schemas/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authSchema = (action: "sign-in" | "sign-up") => {
  return action === "sign-in" ? ZUserLogin : ZUserRegister;
};
