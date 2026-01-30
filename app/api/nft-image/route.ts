import { NextRequest, NextResponse } from "next/server";
import { getNftOfTheDay } from "@/data/nfts.server";
import sharp from "sharp";

const OUTPUT_SIZE = 400;

const FOCAL_POINT: [number, number] = [0.45, 0.4];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zoom = parseInt(searchParams.get("zoom") || "800", 10);

    const nft = getNftOfTheDay();
    const imageUrl = nft.imageUrl;

    if (!imageUrl) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.statusText}`);
      return new NextResponse("Failed to fetch image", { status: 502 });
    }

    const imageBuffer = await response.arrayBuffer();
    const sharpImage = sharp(Buffer.from(imageBuffer));
    const metadata = await sharpImage.metadata();

    const width = metadata.width || 500;
    const height = metadata.height || 500;

    let processedImage: Buffer;

    if (zoom <= 100) {
      processedImage = await sharpImage
        .resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: "cover" })
        .png()
        .toBuffer();
    } else {
      const cropRatio = 100 / zoom;
      const cropWidth = Math.floor(width * cropRatio);
      const cropHeight = Math.floor(height * cropRatio);

      const [xRatio, yRatio] = FOCAL_POINT;

      let left = Math.floor(width * xRatio - cropWidth / 2);
      let top = Math.floor(height * yRatio - cropHeight / 2);

      left = Math.max(0, Math.min(left, width - cropWidth));
      top = Math.max(0, Math.min(top, height - cropHeight));

      processedImage = await sharpImage
        .extract({ left, top, width: cropWidth, height: cropHeight })
        .resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: "fill" })
        .png()
        .toBuffer();
    }

    return new NextResponse(processedImage as unknown as BodyInit, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("Error processing NFT image:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
