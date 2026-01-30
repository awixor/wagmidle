import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-6xl mx-auto flex items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo1.png"
            alt="Wagmidle Logo"
            width={180}
            height={45}
            className="object-contain w-auto h-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
