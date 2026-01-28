export type Role = "Founder" | "VC" | "Influencer" | "Dev";
export type PrimaryChain =
  | "ETH"
  | "SOL"
  | "BTC"
  | "AVAX"
  | "MATIC"
  | "ARB"
  | "OP"
  | "BASE";

export interface CryptoFigure {
  id: string;
  name: string;
  role: Role;
  primaryChain: PrimaryChain;
  yearJoined: number;
  imageUrl: string;
}
