export type Role =
  | "Co-Founder"
  | "Politician & Advocate"
  | "CEO"
  | "Executive Chairman & Advocate"
  | "Founder & Former CEO"
  | "Co-Founder & CEO"
  | "Founder"
  | "Investor & Podcaster"
  | "CEO & Investor"
  | "CEO & Influencer"
  | "Venture Capitalist"
  | "Investor & Entrepreneur"
  | "Educator & Author"
  | "Early Advocate"
  | "CEO & Co-Founder"
  | "Investor & Former CTO"
  | "General Partner"
  | "Creator"
  | "Influencer & Educator"
  | "Market Analyst"
  | "Investor"
  | "Analyst"
  | "Influencer"
  | "Educator"
  | "Developer"
  | "Ethereum Foundation Leader"
  | "Futurist & Speaker"
  | "CEO & Crypto Interest"
  | "Thought Leader"
  | "Creator/Influencer"
  | "Executive"
  | "CFO"
  | "CPO"
  | "Influencer/Figure"
  | "Investor & Advisor";

export type PrimaryChain =
  | "LINK"
  | "ETH"
  | "BTC"
  | "BNB"
  | "Various"
  | "SOL"
  | "ADA"
  | "TRX"
  | "DOGE/BTC"
  | "POL"
  | "UNI"
  | "USDT"
  | "LTC"
  | "DOT";

export interface CryptoFigure {
  id: string;
  name: string;
  role: Role;
  primaryChain: PrimaryChain;
  yearJoined: number;
  imageUrl: string;
}
