import Image from "next/image";

interface NftSplashViewProps {
  imageUrl: string;
  isRevealed?: boolean;
  className?: string;
}

export default function NftSplashView({
  imageUrl,
  isRevealed = false,
  className = "",
}: NftSplashViewProps) {
  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800 ${className}`}
    >
      <Image
        src={imageUrl}
        alt="NFT of the Day"
        fill
        className="object-cover"
        unoptimized
      />
      {isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="text-4xl">🎉</span>
        </div>
      )}
    </div>
  );
}
