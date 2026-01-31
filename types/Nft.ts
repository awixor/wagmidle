/**
 * Full NFT collection type with game attributes (server-side only)
 */
export interface Nft {
  id: string;
  name: string;
  contractAddress: string;
  chain:
    | "ethereum"
    | "polygon"
    | "solana"
    | "base"
    | "arbitrum"
    | "ronin"
    | "abstract"
    | "monad"
    | "ink"
    | "hyperevm"
    | "ape_chain";
  category: "pfp" | "art" | "gaming" | "collectibles" | "utility";
  collectionName: string;
  launchYear: number;
  imageUrl: string;
}

/**
 * NFT collection type for client-side search
 */
export interface NftCollection {
  id: string;
  name: string;
  imageUrl: string;
}
