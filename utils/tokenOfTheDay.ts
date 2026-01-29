import { tokens } from "@/data/tokens.server";
import { Token } from "@/types/Token";

/**
 * Simple hash function to convert a date string into a number
 * @param str - The string to hash (e.g., "2026-01-28")
 * @returns A positive integer
 */
function hashString(str: string): number {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash);
}

/**
 * Gets the current date in YYYY-MM-DD format (UTC)
 * @returns Date string in YYYY-MM-DD format
 */
function getCurrentDateString(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Selects the "Token of the Day" based on the current date.
 * Uses a different hash offset than characters to ensure different selection.
 * @returns The token for today
 */
export function getTokenOfTheDay(): Token {
  const dateString = getCurrentDateString();
  // Add "token" prefix to get a different hash than characters
  const hash = hashString(`token-${dateString}`);
  const index = hash % tokens.length;

  return tokens[index];
}

/**
 * Gets the token of the day for a specific date (useful for testing)
 * @param date - The date to get the token for
 * @returns The token for the specified date
 */
export function getTokenForDate(date: Date): Token {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  const hash = hashString(`token-${dateString}`);
  const index = hash % tokens.length;

  return tokens[index];
}
