import { NextRequest, NextResponse } from "next/server";
import { getNftOfTheDay, getNftById } from "@/data/nfts.server";

export async function GET() {
  try {
    const nft = getNftOfTheDay();

    return NextResponse.json(nft);
  } catch (error) {
    console.error("Error fetching NFT of the day:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nftId } = await request.json();

    if (!nftId) {
      return NextResponse.json({ error: "Missing nftId" }, { status: 400 });
    }

    const guessedNft = getNftById(nftId);
    if (!guessedNft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    }

    const targetNft = getNftOfTheDay();
    const isCorrect = guessedNft.id === targetNft.id;

    return NextResponse.json({
      guessedNft,
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
