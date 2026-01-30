/**
 * Full NFT collection type with game attributes (server-side only)
 */
export interface Nft {
  id: string;
  name: string;
  contractAddress: string;
  chain: "ethereum" | "polygon" | "solana" | "base" | "arbitrum";
  category: "pfp" | "art" | "gaming" | "collectibles" | "utility";
  launchYear: number;
  imageUrl: string;
}

/**
 * Public NFT type for client-side search
 */
export interface PublicNft {
  id: string;
  name: string;
  imageUrl: string;
}
