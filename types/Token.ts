export type TokenCategory =
  | "Layer 1"
  | "Layer 2"
  | "DeFi"
  | "Meme"
  | "Meme AI"
  | "Stablecoin"
  | "Stablecoin Prot"
  | "Gaming"
  | "AI"
  | "Privacy"
  | "Oracle"
  | "Infrastructure"
  | "Exchange"
  | "Utility"
  | "Interoperability"
  | "Metaverse"
  | "NFT Ecosystem"
  | "Storage"
  | "RWA"
  | "Modular BLC"
  | "Video"
  | "Identity"
  | "IoT"
  | "DEX"
  | "DEX Aggregator"
  | "Liquid Staking"
  | "DePIN"
  | "Ordinals"
  | "Payment"
  | "Cloud Computing"
  | "Computing"
  | "Restaking"
  | "Advertising"
  | "Social"
  | "Wallet"
  | "Supply Chain"
  | "Governance";

export type TokenNetwork =
  | "Native"
  | "Ethereum"
  | "Solana"
  | "BSC"
  | "Polygon"
  | "Arbitrum"
  | "Base"
  | "Avalanche"
  | "Multi-chain"
  | "Optimism"
  | "Starknet"
  | "Bitcoin"
  | "Cosmos"
  | "Polkadot"
  | "TON"
  | "TRON"
  | "Theta"
  | "NEO"
  | "Mantle"
  | "Aevo";

/**
 * Full token data - for server-side game logic
 */
export interface Token {
  id: string;
  name: string;
  ticker: string;
  network: TokenNetwork;
  category: TokenCategory;
  launchYear: number;
  marketCapRank: number;
  imageUrl: string;
}

/**
 * Public token data - for client-side search UI
 */
export interface PublicToken {
  id: string;
  name: string;
  ticker: string;
  imageUrl: string;
}
