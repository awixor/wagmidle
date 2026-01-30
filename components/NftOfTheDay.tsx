"use client";

import { useState, useEffect } from "react";
import NftSplashView, { RevealState } from "@/components/game/NftSplashView";

// Demo NFT for testing - BAYC #1
const DEMO_NFT = {
  contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: "1",
};

interface NftData {
  image: string;
  collectionName: string;
  rarityScore: number | null;
  traits: { trait_type: string; value: string }[];
}

export default function NftOfTheDay() {
  const [nftData, setNftData] = useState<NftData | null>(null);
  const [revealState, setRevealState] = useState<RevealState>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNft() {
      try {
        const res = await fetch(
          `/api/nft?contractAddress=${DEMO_NFT.contractAddress}&tokenId=${DEMO_NFT.tokenId}`,
        );
        if (!res.ok) throw new Error("Failed to fetch NFT");
        const data = await res.json();
        setNftData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchNft();
  }, []);

  const handleReveal = () => {
    if (revealState < 5) {
      setRevealState((prev) => (prev + 1) as RevealState);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    );
  }

  if (error || !nftData) {
    return (
      <div className="text-center text-red-500">
        Failed to load NFT: {error}
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 flex flex-col justify-center items-center">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">NFT of the Day</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Guess the NFT collection!
        </p>
      </div>

      <div className="w-full max-w-md">
        <NftSplashView imageUrl={nftData.image} revealState={revealState} />
      </div>

      {revealState < 5 && (
        <button
          onClick={handleReveal}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-xl transition-colors"
        >
          Reveal More ({5 - revealState} left)
        </button>
      )}

      {revealState === 5 && (
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {nftData.collectionName}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {nftData.traits.slice(0, 5).map((trait, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-full"
              >
                {trait.trait_type}: {trait.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
