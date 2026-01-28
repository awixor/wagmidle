import Image from "next/image";
import { CryptoFigure } from "@/types/CryptoFigure";

interface CharacterListItemProps {
  character: CryptoFigure;
  isSelected: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  disabled?: boolean;
}

export default function CharacterListItem({
  character,
  isSelected,
  onSelect,
  onMouseEnter,
  disabled = false,
}: CharacterListItemProps) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      disabled={disabled}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
        isSelected
          ? "bg-linear-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40"
          : "hover:bg-purple-500/10 border border-transparent"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-purple-500/30">
        <Image
          src={character.imageUrl}
          alt={character.name}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 text-left">
        <div className="font-semibold text-white">{character.name}</div>
      </div>
    </button>
  );
}
