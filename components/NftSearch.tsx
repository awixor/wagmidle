"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Command } from "lucide-react";
import { PublicNft } from "@/types/Nft";
import { publicNfts } from "@/data/nfts";
import CommandPalette from "@/components/ui/CommandPalette";
import SearchInput from "@/components/ui/SearchInput";
import KeyboardHints from "@/components/ui/KeyboardHints";
import Image from "next/image";

interface NftSearchProps {
  onGuess?: (nftId: string) => void;
  disabled?: boolean;
  guessedIds?: string[];
}

export default function NftSearch({
  onGuess,
  disabled = false,
  guessedIds = [],
}: NftSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredNfts = publicNfts.filter(
    (nft) =>
      !guessedIds.includes(nft.id) &&
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (nft: PublicNft) => {
    if (!disabled) {
      if (onGuess) {
        onGuess(nft.id);
      }
      setIsOpen(false);
      setSearchQuery("");
      setSelectedIndex(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredNfts.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredNfts[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredNfts[selectedIndex]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className="group relative w-full max-w-md mx-auto px-4 py-3 bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-purple-400" />
            <span className="text-gray-400">Search NFT collections...</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-md border border-purple-500/30">
            <Command className="w-3 h-3 text-purple-300" />
            <span className="text-xs text-purple-300">K</span>
          </div>
        </div>
      </button>

      <CommandPalette isOpen={isOpen} onClose={handleClose}>
        <SearchInput
          ref={inputRef}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onClear={handleClose}
          placeholder="Search by collection name..."
        />

        <div
          ref={listRef}
          className="max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent"
        >
          {filteredNfts.length > 0 ? (
            <div className="p-2">
              {filteredNfts.slice(0, 20).map((nft, index) => (
                <button
                  key={nft.id}
                  onClick={() => handleSelect(nft)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  disabled={disabled}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                    index === selectedIndex
                      ? "bg-purple-500/20 text-purple-200"
                      : "hover:bg-gray-800/50 text-gray-300"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    {nft.imageUrl ? (
                      <Image
                        src={nft.imageUrl}
                        alt={nft.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-400">
                        NFT
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{nft.name}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <div className="text-gray-500 text-lg">No collections found</div>
              <div className="text-gray-600 text-sm mt-2">
                Try a different search term
              </div>
            </div>
          )}
        </div>

        <KeyboardHints />
      </CommandPalette>
    </>
  );
}
