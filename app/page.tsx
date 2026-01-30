"use client";

import { useState } from "react";
import CharacterOfTheDay from "@/components/CharacterOfTheDay";
import TokenOfTheDay from "@/components/TokenOfTheDay";
import CategorySwitcher, { GameCategory } from "@/components/CategorySwitcher";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<GameCategory>(
    GameCategory.Characters,
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 px-6 md:px-16">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <CategorySwitcher
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {activeCategory === GameCategory.Characters && <CharacterOfTheDay />}
        {activeCategory === GameCategory.Tokens && <TokenOfTheDay />}
      </div>
    </div>
  );
}
