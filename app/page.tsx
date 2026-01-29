import CharacterOfTheDay from "@/components/CharacterOfTheDay";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8 px-6 md:px-16">
      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        <CharacterOfTheDay />
      </div>
    </div>
  );
}
