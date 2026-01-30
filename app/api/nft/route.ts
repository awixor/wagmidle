import { NextRequest, NextResponse } from "next/server";
import { alchemy } from "@/lib/alchemy";

export interface NftData {
  image: string;
  collectionName: string;
  rarityScore: number | null;
  traits: { trait_type: string; value: string }[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contractAddress = searchParams.get("contractAddress");
  const tokenId = searchParams.get("tokenId");

  if (!contractAddress || !tokenId) {
    return NextResponse.json(
      { error: "Missing contractAddress or tokenId" },
      { status: 400 },
    );
  }

  try {
    const nftMetadata = await alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId,
    );

    // Extract and clean the data
    const nftData: NftData = {
      image:
        nftMetadata.image?.cachedUrl ||
        nftMetadata.image?.originalUrl ||
        nftMetadata.image?.thumbnailUrl ||
        "",
      collectionName:
        nftMetadata.contract?.openSeaMetadata?.collectionName ||
        nftMetadata.contract?.name ||
        "Unknown Collection",
      rarityScore: nftMetadata.raw?.metadata?.rarity_score ?? null,
      traits:
        nftMetadata.raw?.metadata?.attributes?.map(
          (attr: { trait_type?: string; value?: string }) => ({
            trait_type: attr.trait_type || "Unknown",
            value: String(attr.value ?? ""),
          }),
        ) || [],
    };

    // Console log for verification
    console.log("📦 NFT Data fetched:", JSON.stringify(nftData, null, 2));

    return NextResponse.json(nftData);
  } catch (error) {
    console.error("❌ Error fetching NFT metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch NFT metadata" },
      { status: 500 },
    );
  }
}
