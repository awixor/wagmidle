export interface Token {
  name: string;
  ticker: string;
  network:
    | "Ethereum"
    | "Solana"
    | "Bitcoin"
    | "BNB Chain"
    | "Avalanche"
    | "Polygon"
    | "Cardano"
    | "Arbitrum"
    | "Optimism"
    | "Base";
  category:
    | "DeFi"
    | "L1"
    | "L2"
    | "Meme"
    | "NFT"
    | "Gaming"
    | "Infrastructure"
    | "Exchange";
  launchYear: number;
  marketCapRank: number;
}

// Top 10
export const tokens: Token[] = [
  {
    name: "Ethereum",
    ticker: "ETH",
    network: "Ethereum",
    category: "L1",
    launchYear: 2015,
    marketCapRank: 2,
  },
  {
    name: "Solana",
    ticker: "SOL",
    network: "Solana",
    category: "L1",
    launchYear: 2020,
    marketCapRank: 5,
  },
  {
    name: "Uniswap",
    ticker: "UNI",
    network: "Ethereum",
    category: "DeFi",
    launchYear: 2020,
    marketCapRank: 22,
  },
  {
    name: "Aave",
    ticker: "AAVE",
    network: "Ethereum",
    category: "DeFi",
    launchYear: 2020,
    marketCapRank: 35,
  },
  {
    name: "Dogecoin",
    ticker: "DOGE",
    network: "Bitcoin",
    category: "Meme",
    launchYear: 2013,
    marketCapRank: 8,
  },
  {
    name: "Shiba Inu",
    ticker: "SHIB",
    network: "Ethereum",
    category: "Meme",
    launchYear: 2020,
    marketCapRank: 15,
  },
  {
    name: "Arbitrum",
    ticker: "ARB",
    network: "Arbitrum",
    category: "L2",
    launchYear: 2023,
    marketCapRank: 40,
  },
  {
    name: "Chainlink",
    ticker: "LINK",
    network: "Ethereum",
    category: "Infrastructure",
    launchYear: 2017,
    marketCapRank: 12,
  },
  {
    name: "Avalanche",
    ticker: "AVAX",
    network: "Avalanche",
    category: "L1",
    launchYear: 2020,
    marketCapRank: 10,
  },
  {
    name: "Polygon",
    ticker: "POL",
    network: "Polygon",
    category: "L2",
    launchYear: 2017,
    marketCapRank: 18,
  },
];
