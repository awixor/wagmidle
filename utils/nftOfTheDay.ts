import { nfts } from "@/data/nfts.server";

export function getNftById(id: string) {
  return nfts.find((nft) => nft.id === id);
}

export function getNftOfTheDay() {
  const today = new Date().toISOString().slice(0, 10);
  const seed = Array.from(today).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );

  // Use a simple seeded random number generator
  const seededRandom = (s: number) => {
    const x = Math.sin(s++) * 10000;

    return x - Math.floor(x);
  };

  const randomIndex = Math.floor(seededRandom(seed) * nfts.length);

  return nfts[randomIndex];
}
