import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Slugify the input title to a clean, URL-safe string
 * @param input - The title or string to convert
 * @returns slug - e.g., "this-is-a-title"
 */
export function slugify(input: string): string {
  if (!input || typeof input !== "string") {
    throw new Error("Please provide a valid string input");
  }

  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")     // remove special chars
    .replace(/\s+/g, "-")             // replace spaces with dashes
    .replace(/-+/g, "-");             // collapse multiple dashes
}

