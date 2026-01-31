import { NextRequest, NextResponse } from "next/server";
import { getNftOfTheDay } from "@/utils/nftOfTheDay";
import { nftCollections } from "@/data/nft-collections";
import { NftCollection } from "@/types/Nft";

export async function POST(request: NextRequest) {
  try {
    const { collectionId } = await request.json();

    if (!collectionId) {
      return NextResponse.json(
        { error: "Missing collectionId" },
        { status: 400 },
      );
    }

    const guessedCollection = nftCollections.find((c) => c.id === collectionId);
    if (!guessedCollection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }

    const targetNft = getNftOfTheDay();
    const isCorrect = targetNft.collectionName === guessedCollection.name;

    const nftCollection: NftCollection = {
      id: guessedCollection.id,
      name: guessedCollection.name,
      imageUrl: guessedCollection.imageUrl,
    };

    return NextResponse.json({
      nftCollection,
      isCorrect,
    });
  } catch (error) {
    console.error("Error processing NFT guess:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
