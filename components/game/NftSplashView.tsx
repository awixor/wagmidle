import Image from "next/image";

interface NftSplashViewProps {
  imageUrl: string;
  className?: string;
}

export default function NftSplashView({
  imageUrl,
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
    </div>
  );
}
