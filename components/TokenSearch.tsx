"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Command } from "lucide-react";
import { PublicToken } from "@/types/Token";
import { publicTokens } from "@/data/tokens";
import CommandPalette from "@/components/ui/CommandPalette";
import SearchInput from "@/components/ui/SearchInput";
import KeyboardHints from "@/components/ui/KeyboardHints";
import Image from "next/image";

interface TokenSearchProps {
  onGuess?: (tokenId: string) => void;
  disabled?: boolean;
  guessedIds?: string[];
}

export default function TokenSearch({
  onGuess,
  disabled = false,
  guessedIds = [],
}: TokenSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredTokens = publicTokens.filter(
    (token) =>
      !guessedIds.includes(token.id) &&
      (token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.ticker.toLowerCase().includes(searchQuery.toLowerCase())),
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

  const handleSelect = (token: PublicToken) => {
    if (!disabled) {
      if (onGuess) {
        onGuess(token.id);
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
        prev < filteredTokens.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredTokens[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredTokens[selectedIndex]);
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
        className="group relative w-full max-w-md mx-auto px-4 py-3 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400">Search tokens...</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 rounded-md border border-cyan-500/30">
            <Command className="w-3 h-3 text-cyan-300" />
            <span className="text-xs text-cyan-300">K</span>
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
          placeholder="Search by name or ticker..."
        />

        <div
          ref={listRef}
          className="max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
        >
          {filteredTokens.length > 0 ? (
            <div className="p-2">
              {filteredTokens.map((token, index) => (
                <button
                  key={token.id}
                  onClick={() => handleSelect(token)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  disabled={disabled}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                    index === selectedIndex
                      ? "bg-cyan-500/20 text-cyan-200"
                      : "hover:bg-gray-800/50 text-gray-300"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    {token.imageUrl ? (
                      <Image
                        src={token.imageUrl}
                        alt={token.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-400">
                        {token.ticker.slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{token.name}</div>
                    <div className="text-xs text-gray-500">{token.ticker}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <div className="text-gray-500 text-lg">No tokens found</div>
              <div className="text-gray-600 text-sm mt-2">
                Try searching by name or ticker
              </div>
            </div>
          )}
        </div>

        <KeyboardHints />
      </CommandPalette>
    </>
  );
}
