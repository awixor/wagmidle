import { cryptoFigures } from "@/data/figures.server";
import { CryptoFigure } from "@/types/CryptoFigure";

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
 * Selects the "Character of the Day" based on the current date.
 * All users will see the same character on the same day (UTC).
 * @returns The crypto figure for today
 */
export function getCharacterOfTheDay(): CryptoFigure {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  const index = hash % cryptoFigures.length;

  return cryptoFigures[index];
}

/**
 * Gets the character of the day for a specific date (useful for testing)
 * @param date - The date to get the character for
 * @returns The crypto figure for the specified date
 */
export function getCharacterForDate(date: Date): CryptoFigure {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  const hash = hashString(dateString);
  const index = hash % cryptoFigures.length;

  return cryptoFigures[index];
}
