/**
 * Extract X handle from unavatar.io URL
 * e.g., "https://unavatar.io/x/aeyakovenko" => "aeyakovenko"
 */
export function extractXHandle(imageUrl: string): string | undefined {
  if (!imageUrl) return undefined;
  const match = imageUrl.match(/unavatar\.io\/x\/(.+)$/);

  return match?.[1];
}
